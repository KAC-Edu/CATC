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

// [App Check] reCAPTCHA v3 — 외부 무단 접근(스크래핑) 차단용. 각 페이지가 firebase-app-check.js 를
//  먼저 로드해야 firebase.appCheck 가 존재한다. 활성화만 하고, 실제 차단은 Firebase 콘솔에서
//  '적용(Enforce)'을 켜야 시작된다(그 전에는 모니터링만 — 아무도 안 막힘). 사이트키는 공개키라 코드에 둠.
//  ★ reCAPTCHA는 화면(document.body)에 배지를 붙이므로, body가 준비된 뒤에 활성화해야 한다.
//    (head에서 즉시 실행하면 appendChild 대상이 null → TypeError로 App Check가 반쯤 깨지고 DB 연결이 멈춘다.)
function _kacActivateAppCheck() {
    try {
        if (firebase.appCheck) {
            firebase.appCheck().activate('6LcAu2ItAAAAAAqwjmZ0DbxUkPwrn5ExWqCOTEtf', true);
        }
    } catch (e) { try { console.warn('[App Check] 활성화 실패', e); } catch (_) {} }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _kacActivateAppCheck);
} else {
    _kacActivateAppCheck();
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
/* ══════════════════════════════════════════════════════════════════════
   [K20] 교육기간 표기 통일 — 화면마다 제각각이던 것을 한 가지로 맞춘다.
   ──────────────────────────────────────────────────────────────────────
   저장값(파이어베이스)은 손대지 않는다. 화면에 '보여줄 때'만 바꾼다.
     저장:  2026-07-13 ~ 2026-07-24   (이 형식 유지 — 날짜 비교·정렬에 쓰인다)
     표시:  2026.07.13~2026.07.24
   하이픈(-)은 점(.)으로, 물결 앞뒤 공백은 없앤다.
   ══════════════════════════════════════════════════════════════════════ */
try {
  window.kacPeriod = function (s) {
    var t = String(s == null ? '' : s).trim();
    if (!t) return '-';
    t = t.replace(/(\d{4})-(\d{2})-(\d{2})/g, '$1.$2.$3');   // 날짜 부분만 정확히 바꾼다
    t = t.replace(/\s*[~∼〜]\s*/g, '~');                      // 물결 앞뒤 공백 제거
    return t;
  };
} catch (e) {}

(function () {
  if (window.__kacHeadShrink) return;
  window.__kacHeadShrink = true;

  var SHRINK_AT = 64;   // 이만큼 내려가면 접는다
  var EXPAND_AT = 16;   // 이만큼 위로 돌아오면 다시 편다

  /* ══ [K16] 상단바 아래로 지나가는 글을 흐리게 지운다 ═══════════════════
     상단바가 불투명해서 글이 딱 잘려 들어가는 게 지저분했다.
     상단바 바로 밑에 '흐림 띠'를 깔아, 아래 내용이 상단바로 들어갈수록
     뿌옇게 흐려지며 사라지게 한다.
     문제: 상단바 높이가 접힘/펼침으로 계속 변한다 → 고정값을 쓸 수 없다.
     → 실제 높이를 재서 CSS 변수(--kacHeadH)로 알려주고, 띠가 그 높이에 붙게 한다.
     스타일과 띠 요소를 여기서 만들어 넣으므로 모바일 6개 화면에 한 번에 적용된다.
     ═══════════════════════════════════════════════════════════════════ */
  function syncHeadH(heads, scope) {
    try {
      for (var i = 0; i < heads.length; i++) {
        if (heads[i].offsetParent !== null) {
          (scope || document.documentElement).style.setProperty('--kacHeadH', heads[i].offsetHeight + 'px');
          return;
        }
      }
    } catch (e) {}
  }

  function ensureFade() {
    if (!document.querySelector('.mhead, .ov-head')) return;      // PC 화면이면 아무 것도 안 한다
    if (!document.getElementById('kacHeadFadeCss')) {
      var st = document.createElement('style');
      st.id = 'kacHeadFadeCss';
      st.textContent =
        '.kac-head-fade{position:sticky; top:var(--kacHeadH, 92px); z-index:40;'
        + ' height:26px; margin-bottom:-26px; pointer-events:none;'
        + ' backdrop-filter:blur(7px); -webkit-backdrop-filter:blur(7px);'
        + ' -webkit-mask-image:linear-gradient(to bottom,#000 0%,rgba(0,0,0,.5) 55%,transparent 100%);'
        + ' mask-image:linear-gradient(to bottom,#000 0%,rgba(0,0,0,.5) 55%,transparent 100%);}'
        // [K18] 높이를 잴 때만 애니메이션을 잠시 끈다 (재는 동안 화면이 움찔하지 않게)
        + '.kac-notrans, .kac-notrans *{transition:none !important;}';
      document.head.appendChild(st);
    }
    var heads = document.querySelectorAll('.mhead, .ov-head');
    for (var i = 0; i < heads.length; i++) {
      var hd = heads[i];
      var nx = hd.nextElementSibling;
      if (nx && nx.className === 'kac-head-fade') continue;        // 이미 있음
      var f = document.createElement('div');
      f.className = 'kac-head-fade';
      if (hd.parentNode) hd.parentNode.insertBefore(f, hd.nextSibling);
    }
  }

  /* 지금 보이는 상단바 */
  function visHead(heads) {
    for (var i = 0; i < heads.length; i++) {
      if (heads[i].offsetParent !== null) return heads[i];
    }
    return null;
  }
  function headH(heads) { var h = visHead(heads); return h ? h.offsetHeight : 0; }

  /* [K18] '접히면 몇 px 줄어드는지'를 미리 재둔다.
     이 값이 있어야 '접어도 스크롤이 남는 화면인지'를 판단할 수 있다.
     애니메이션을 잠깐 끄고 접었다 폈다 하며 재므로 화면에는 보이지 않는다. */
  function measureGap(heads) {
    var h = visHead(heads);
    if (!h) return 0;
    try {
      var wasShrunk = h.classList.contains('shrink');
      h.classList.add('kac-notrans');            // 애니메이션 잠시 끔
      h.classList.remove('shrink');
      var expanded = h.offsetHeight;             // 강제 재계산
      h.classList.add('shrink');
      var collapsed = h.offsetHeight;
      if (!wasShrunk) h.classList.remove('shrink');
      h.offsetHeight;                            // 반영 강제
      h.classList.remove('kac-notrans');
      return Math.max(0, expanded - collapsed);
    } catch (e) {
      try { h.classList.remove('kac-notrans'); } catch (_) {}
      return 0;
    }
  }

  function bind(scroller, heads, scope) {
    if (!heads || !heads.length) return;
    var shrunk = false, ticking = false, gapPx = null;
    var posOf = function () {
      return (scroller === window)
        ? (window.scrollY || document.documentElement.scrollTop || 0)
        : (scroller.scrollTop || 0);
    };
    /* 지금 이 화면에서 '더 스크롤할 수 있는 여유'가 얼마나 되는지 */
    var roomOf = function () {
      try {
        if (scroller === window) {
          var de = document.documentElement;
          return Math.max(0, de.scrollHeight - de.clientHeight);
        }
        return Math.max(0, scroller.scrollHeight - scroller.clientHeight);
      } catch (e) { return 0; }
    };
    var apply = function () {
      ticking = false;
      var y = posOf(), want = shrunk;

      /* ══ [K18] 펄럭임(접혔다 펴졌다 반복) 방지 ═══════════════════════════
         [증상] 스크롤을 조금 올리면 상단바가 접혔다 펴졌다를 계속 반복한다.
         [원인] 접을 만큼 내용이 길지 않은 화면에서 생긴다.
                상단바가 접히면 내용이 위로 올라가 '더 스크롤할 여유'가 줄어든다.
                여유가 바닥나면 브라우저가 스크롤을 맨 위(0)로 강제로 되돌린다.
                → 맨 위 = '펼침' 조건 → 다시 펴진다
                → 펴지면 여유가 생겨 또 접히고 … 무한 반복.
                (실제로 홈 화면에서 재현됨: 여유 0px인데 접으니 스크롤이 0으로 튕김)
         [해결] '접고 나서도 스크롤이 넉넉히 남는 화면'에서만 접는다.
                필요 여유 = 접히며 줄어드는 높이 + 접기 기준(64px) + 안전 여유(80px)
                짧은 화면은 어차피 접어봐야 얻을 공간도 없으니 그냥 펼쳐 둔다.          */
      if (gapPx == null) gapPx = measureGap(heads);        // 접히며 줄어드는 높이(한 번만 잰다)
      var NEED = gapPx + SHRINK_AT + 80;

      if (!shrunk && y > SHRINK_AT && roomOf() >= NEED) want = true;
      else if (shrunk && y < EXPAND_AT) want = false;

      if (want === shrunk) return;                 // 바뀐 게 없으면 DOM 건드리지 않는다
      shrunk = want;
      for (var i = 0; i < heads.length; i++) heads[i].classList.toggle('shrink', shrunk);

      // 흐림 띠는 상단바 높이에 붙어야 하므로 애니메이션 뒤에 한 번 더 맞춘다
      syncHeadH(heads, scope);
      setTimeout(function () { syncHeadH(heads, scope); }, 260);
    };
    scroller.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(apply); }
    }, { passive: true });
    syncHeadH(heads, scope);
    setTimeout(function () { syncHeadH(heads, scope); }, 600);   // 첫 렌더 후 실제 높이 반영
  }

  function init() {
    try {
      ensureFade();                                 // [K16] 흐림 띠 설치 (모바일 화면에만)
      // ① 본문(창) 스크롤 → 화면 상단바
      bind(window, document.querySelectorAll('.mhead'), document.documentElement);
      // ② 상세 화면이 오버레이(.ov) 안에서 따로 스크롤되는 경우(교육운영부 모바일)
      var ovs = document.querySelectorAll('.ov');
      for (var i = 0; i < ovs.length; i++) bind(ovs[i], ovs[i].querySelectorAll('.ov-head'), ovs[i]);
      // 화면 회전·글자크기 변경 등으로 높이가 달라질 수 있다
      window.addEventListener('resize', function () {
        syncHeadH(document.querySelectorAll('.mhead'), document.documentElement);
        var o = document.querySelectorAll('.ov');
        for (var k = 0; k < o.length; k++) syncHeadH(o[k].querySelectorAll('.ov-head'), o[k]);
      }, { passive: true });
    } catch (e) { try { console.warn('[K4] 상단바 접힘 설치 실패', e); } catch (_) {} }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();