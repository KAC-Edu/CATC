// config.js

const firebaseConfig = {
  apiKey: "AIzaSyDo3BPMV8qayQ3MdKBglYNtsvii0ZtCHHs",
  authDomain: "catcqna.firebaseapp.com",
  databaseURL: "https://catcqna-default-rtdb.firebaseio.com",
  projectId: "catcqna",
  storageBucket: "catcqna.firebasestorage.app",
  messagingSenderId: "327047828064",
  appId: "1:327047828064:web:a2e26fea9f276764412905",
  measurementId: "G-TBGD8F1V2M"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// [중요] 비동기 코드 조회 함수
async function resolveRoomFromCode(code) {
    try {
        const db = firebase.database();
        const snap = await db.ref(`public_codes/${code}`).get();
        if (snap.exists()) {
            return snap.val(); // "A", "B" 등 방 ID 반환
        } else {
            console.error("Code not found in DB:", code);
            return null;
        }
    } catch (e) {
        console.error("Code resolution failed", e);
        return null;
    }
}

/* --- config.js 추가분 (행정 로직용) --- */

// 석식 마감 시간 설정 (16시)
const DINNER_DEADLINE_HOUR = 16;

// 현재 날짜를 YYYY-MM-DD 형식으로 반환하는 함수 (서버/행정용)
function getTodayString() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

// 어제 날짜를 YYYY-MM-DD 형식으로 반환하는 함수 (복귀 확인용)
function getYesterdayString() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

// 오프라인 상태에서도 데이터를 임시로 저장하여 앱이 멈추지 않게 함
firebase.database().goOnline();


/* ══════════════════════════════════════════════════════════════════════════
   [팝업 오작동 방지] "글자를 드래그하다 팝업 밖에서 손을 떼면 팝업이 닫히는" 문제

   원인 — 팝업 배경(어두운 오버레이)에는 보통 이렇게 걸려 있다:
       onclick="if(event.target === this) 닫기()"      ← 배경을 클릭하면 닫기
   그런데 브라우저는 '누른 곳'과 '뗀 곳'이 다르면, 그 둘의 공통 부모를 click 대상으로
   잡는다. 그래서 팝업 안 글자를 드래그하다가 팝업 밖(배경)에서 손을 떼면
   click 대상이 '배경'이 되어 버려 → 팝업이 닫혀 버린다. (본문 입력 중 특히 잦음)

   해결 — 누르기 시작한 곳이 팝업 '안쪽'이었다면, 배경에서 손을 떼도 닫지 않는다.
          (배경을 제대로 눌렀다 뗀 '진짜 배경 클릭'은 지금처럼 그대로 닫힌다)

   이 파일은 모든 플랫폼(강사·교육운영부·교육지원부·영양사·기사·교육생 등)이
   공통으로 불러오므로, 여기 한 번만 넣으면 전 화면에 동일하게 적용된다.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  if (window.__kacPopupDragGuard) return;   // 중복 설치 방지
  window.__kacPopupDragGuard = true;

  var pressedOn = null;

  // 화면을 거의 다 덮는 fixed 요소 = 팝업 배경(오버레이)으로 본다
  function isBackdrop(el) {
    if (!el || el.nodeType !== 1) return false;
    var cs;
    try { cs = window.getComputedStyle(el); } catch (e) { return false; }
    if (!cs || cs.position !== 'fixed') return false;
    var r = el.getBoundingClientRect();
    return r.width >= window.innerWidth * 0.9 && r.height >= window.innerHeight * 0.9;
  }

  document.addEventListener('mousedown', function (e) { pressedOn = e.target; }, true);
  document.addEventListener('touchstart', function (e) { pressedOn = e.target; }, true);

  document.addEventListener('click', function (e) {
    var startedInside = pressedOn && pressedOn !== e.target &&
                        e.target.contains && e.target.contains(pressedOn);
    pressedOn = null;
    // 배경에서 손을 뗐지만, 누르기는 팝업 안쪽에서 시작했다 → 닫기 취소
    if (startedInside && isBackdrop(e.target)) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }, true);   // capture 단계 — 배경의 onclick 보다 먼저 가로챈다
})();

/* ══════════════════════════════════════════════════════════════════════
   [K4] 모바일 상단바 — 내용을 위로 올리면(아래로 스크롤하면) 살짝 접힌다
   ──────────────────────────────────────────────────────────────────────
   둥근 상단바가 보기는 좋은데 늘 자리를 크게 차지해, 폰에서 볼 수 있는
   내용이 그만큼 줄어든다. 그래서:
     · 아래로 내리면  → 둘째 줄(통계·주차·과정 요약)이 접히고 제목줄만 얇게 남는다
     · 맨 위로 돌리면 → 원래 크기로 다시 펼쳐진다
   PC 화면에는 .mhead 가 없으므로 아무 일도 하지 않는다(안전).

   흔들림(깜빡임) 방지: 접는 기준(64px)과 펴는 기준(16px)을 다르게 둬서,
   경계에서 스크롤을 미세하게 움직여도 접혔다 펴졌다 하지 않는다.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  if (window.__kacHeadShrink) return;
  window.__kacHeadShrink = true;

  var SHRINK_AT = 64;   // 이만큼 내려가면 접는다
  var EXPAND_AT = 16;   // 이만큼 위로 돌아오면 다시 편다

  function bind(scroller, heads) {
    if (!heads || !heads.length) return;
    var shrunk = false, ticking = false;
    var posOf = function () {
      return (scroller === window)
        ? (window.scrollY || document.documentElement.scrollTop || 0)
        : (scroller.scrollTop || 0);
    };
    var apply = function () {
      ticking = false;
      var y = posOf(), want = shrunk;
      if (!shrunk && y > SHRINK_AT) want = true;
      else if (shrunk && y < EXPAND_AT) want = false;
      if (want === shrunk) return;                 // 바뀐 게 없으면 DOM 건드리지 않는다
      shrunk = want;
      for (var i = 0; i < heads.length; i++) heads[i].classList.toggle('shrink', shrunk);
    };
    scroller.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    }, { passive: true });
  }

  function init() {
    try {
      // ① 본문(창) 스크롤 → 화면 상단바
      bind(window, document.querySelectorAll('.mhead'));
      // ② 상세 화면이 오버레이(.ov) 안에서 따로 스크롤되는 경우(교육운영부 모바일)
      var ovs = document.querySelectorAll('.ov');
      for (var i = 0; i < ovs.length; i++) bind(ovs[i], ovs[i].querySelectorAll('.ov-head'));
    } catch (e) { try { console.warn('[K4] 상단바 접힘 설치 실패', e); } catch (_) {} }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();