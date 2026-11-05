// config.js
// UPDATED: 2026-11-05 — [K64] 입력 중 창이 닫히는 문제 방지(전 플랫폼 공통 가드) 추가

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
    if (window._kacAppCheckDone) return;            // 중복 활성화 방지(옵저버+안전망 이중 호출 대비)
    try {
        if (firebase.appCheck) {
            firebase.appCheck().activate('6LcAu2ItAAAAAAqwjmZ0DbxUkPwrn5ExWqCOTEtf', true);
            window._kacAppCheckDone = true;
        }
    } catch (e) { try { console.warn('[App Check] 활성화 실패', e); } catch (_) {} }
}
//  ★★ 타이밍 중요: DOMContentLoaded는 '너무 늦다' — 그 전에 각 페이지 초기 스크립트가 DB 요청을
//    토큰 없이 먼저 내보내 '오래된 클라이언트'로 집계되고, 강화(Enforce) 시 그 초기 요청이 막힌다.
//    → body가 '생기는 즉시'(=body 파싱되어 <html>의 자식으로 추가되는 순간, body 내부 스크립트가
//      실행되기 직전) 활성화한다. 이때 body는 존재하므로 reCAPTCHA 배지 appendChild도 안전.
if (document.body) {
    _kacActivateAppCheck();                       // 이미 body 있음(예: 지연 로드) → 즉시
} else if (typeof MutationObserver !== 'undefined') {
    var _kacBodyObs = new MutationObserver(function () {
        if (document.body) { try { _kacBodyObs.disconnect(); } catch (e) {} _kacActivateAppCheck(); }
    });
    try { _kacBodyObs.observe(document.documentElement, { childList: true }); }
    catch (e) { document.addEventListener('DOMContentLoaded', _kacActivateAppCheck); }
    // 안전망: 옵저버가 어떤 이유로든 놓쳐도 DOMContentLoaded에 한 번 더 시도(이미 됐으면 무해)
    document.addEventListener('DOMContentLoaded', _kacActivateAppCheck);
} else {
    document.addEventListener('DOMContentLoaded', _kacActivateAppCheck);
}

/* [K41] 공통 '명단(66)' 기준 — 지원부(생활관, system/dorm/rosters) 명단을 '과정명'으로 매칭해 제공.
   운영부·차량지원 등 여러 플랫폼이 예정명단이 비어도 이 명단으로 실제 입교자만 세도록(명단 외 모니터링 입교자 제외) 공유한다.
   구독은 '필요한 플랫폼이 호출할 때만'(lazy) 시작해 불필요한 Firebase 부하를 막는다. */
window._kacDormRostersAll = null;
window._kacDormSubscribed = false;
window.kacEnsureDormCache = function () {
    if (window._kacDormSubscribed) return;
    window._kacDormSubscribed = true;
    try {
        firebase.database().ref('system/dorm/rosters').on('value', function (s) {
            window._kacDormRostersAll = s.val() || {};
            try { document.dispatchEvent(new Event('kac-dorm-updated')); } catch (e) {}
        });
    } catch (e) { window._kacDormSubscribed = false; }
};
window.kacDormNamesForCourse = function (courseName) {
    var out = []; var cn = String(courseName || '').trim(); var all = window._kacDormRostersAll;
    if (!cn || !all) return out;
    var best = null;
    for (var k in all) { var dv = all[k]; if (dv && Array.isArray(dv.list) && dv.list.length && String(dv.courseName || '').trim() === cn) { if (!best || (dv.updatedAt || 0) > (best.updatedAt || 0)) best = dv; } }
    if (best) best.list.forEach(function (x) { if (x && x.name) out.push(String(x.name).trim()); });
    return out;
};

// [K42] 조사(은/는) 자동 선택 — 마지막 글자 받침 유무로 판단. 한글이 아니면 '은(는)' 그대로.
window.kacEun = function (w) {
    w = String(w || '').trim(); if (!w) return '은(는)';
    var c = w.charCodeAt(w.length - 1);
    if (c >= 0xAC00 && c <= 0xD7A3) { return ((c - 0xAC00) % 28 !== 0) ? '은' : '는'; }
    return '은(는)';
};

// [K43] 차주 자동배치 '단일 실행' 락 — 어느 플랫폼이든 열리면 배치를 '시도'하되,
//  Firebase 트랜잭션으로 '오직 한 클라이언트'만 실제 배치를 실행하게 해 중복 방 생성 충돌을 막는다.
//  weekKey(대상 주 월요일)별로 관리하며, 최근 60초 내 다른 곳이 이미 잡았으면 이번엔 양보(false).
//  → 반환 true 인 곳만 배치 실행. (강사·운영부 둘 다 켜져 있어도 동시 실행 충돌 없음)
window.kacClaimAutoPlace = function (weekKey) {
    try {
        if (!weekKey || typeof firebase === 'undefined' || !firebase.database) return Promise.resolve(false);
        var safe = String(weekKey).replace(/[.#$\[\]\/]/g, '_');
        var ref = firebase.database().ref('system/autoPlaceRun/' + safe);
        var now = Date.now();
        return ref.transaction(function (cur) {
            if (cur && cur.ts && (now - Number(cur.ts)) < 60000) return;   // 최근 60초 내 누군가 실행 중/실행함 → 중단(양보)
            return { ts: now, by: (window._kacPlatformName || (location && location.pathname) || '?') };
        }).then(function (res) {
            // committed=true → 내가 락 획득(배치 실행). committed=false → 다른 곳이 이미 잡음(양보).
            return !!(res && res.committed);
        }).catch(function () {
            // 권한/네트워크 오류 등 락 자체 실패 → 교착 방지 위해 fail-open(배치 진행). 알고리즘 내 중복가드가 보완.
            return true;
        });
    } catch (e) { return Promise.resolve(true); }
};

/* ══════════════════════════════════════════════════════════════════════════
   [K60] 공휴일 자동 계산 — 대체공휴일 포함
   ──────────────────────────────────────────────────────────────────────────
   왜 직접 계산하나:
     외부 공휴일 API(nager.at 등)는 한국 대체공휴일 처리가 부정확하다.
     (예: 2027년 근로자의날을 5/3으로 이동 — 근로자의날은 대체 대상이 아님,
          2028년 추석·개천절 중복 대체 누락, 설날 연휴 중 일요일 누락)
     → 법령(관공서의 공휴일에 관한 규정 제3조) 규칙을 코드로 구현해 계산한다.
        인터넷·CORS·API 중단에 영향받지 않고, 몇 년치를 한 번에 생성할 수 있다.

   대체공휴일 규칙:
     ① 3·1절·광복절·개천절·한글날·제헌절·부처님오신날·성탄절
        → 토요일 또는 일요일과 겹치면 다음 비공휴일 평일로 대체
          (다른 공휴일과 겹치는 것만으로는 대체 없음 — 예: 2028년 개천절·추석 중복)
     ② 어린이날 → 토·일 또는 다른 공휴일과 겹치면 대체
     ③ 설날·추석 연휴 → 일요일 또는 다른 공휴일과 겹치면 겹친 일수만큼 대체
     ④ 신정·현충일·근로자의날 → 대체 없음

   ※ 음력 공휴일(설날·추석·부처님오신날)은 음력 변환이 필요해 표로 관리한다.
     2026~2028은 공공 데이터와 교차검증 완료. 표에 없는 해는 양력 공휴일만 생성된다.
     임시공휴일·선거일은 법령이 아닌 그때그때 지정이므로 '공휴일 관리'에서 수동 추가한다.
   ══════════════════════════════════════════════════════════════════════════ */
window.KAC_LUNAR_HOLIDAYS = {
    2026: { seol: '2026-02-17', chuseok: '2026-09-25', buddha: '2026-05-24' },
    2027: { seol: '2027-02-07', chuseok: '2027-09-15', buddha: '2027-05-13' },
    2028: { seol: '2028-01-27', chuseok: '2028-10-03', buddha: '2028-05-02' },
    2029: { seol: '2029-02-13', chuseok: '2029-09-22', buddha: '2029-05-20' },
    2030: { seol: '2030-02-03', chuseok: '2030-09-12', buddha: '2030-05-09' },
    2031: { seol: '2031-01-23', chuseok: '2031-10-01', buddha: '2031-05-28' },
    2032: { seol: '2032-02-11', chuseok: '2032-09-19', buddha: '2032-05-16' },
    2033: { seol: '2033-01-31', chuseok: '2033-09-08', buddha: '2033-05-06' },
    2034: { seol: '2034-02-19', chuseok: '2034-09-27', buddha: '2034-05-25' },
    2035: { seol: '2035-02-08', chuseok: '2035-09-16', buddha: '2035-05-15' }
};

window.kacComputeHolidays = function (year) {
    year = Number(year); if (!year) return {};
    var z = function (n) { return (n < 10 ? '0' : '') + n; };
    var ymd = function (d) { return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate()); };
    var parse = function (s) { return new Date(s + 'T00:00:00'); };
    var shift = function (s, days) { var d = parse(s); d.setDate(d.getDate() + days); return ymd(d); };
    var dow = function (s) { return parse(s).getDay(); };            // 0=일 … 6=토
    var isWeekend = function (s) { var w = dow(s); return w === 0 || w === 6; };

    // 1) 기본 공휴일 수집
    //    sub: 'we'(토·일만) / 'wed'(토·일 또는 중복=어린이날) / 'sun'(일요일 또는 중복=설날·추석) / null(대체 없음)
    var base = [];
    var push = function (date, name, sub) { base.push({ date: date, name: name, sub: sub || null }); };
    push(year + '-01-01', '신정', null);
    push(year + '-03-01', '3·1절', 'we');
    push(year + '-05-01', '근로자의날', null);
    push(year + '-05-05', '어린이날', 'wed');
    push(year + '-06-06', '현충일', null);
    push(year + '-07-17', '제헌절', 'we');
    push(year + '-08-15', '광복절', 'we');
    push(year + '-10-03', '개천절', 'we');
    push(year + '-10-09', '한글날', 'we');
    push(year + '-12-25', '성탄절', 'we');
    var L = window.KAC_LUNAR_HOLIDAYS[year];
    if (L) {
        if (L.buddha) push(L.buddha, '부처님오신날', 'we');
        if (L.seol)    [-1, 0, 1].forEach(function (o) { push(shift(L.seol, o), '설날 연휴', 'sun'); });
        if (L.chuseok) [-1, 0, 1].forEach(function (o) { push(shift(L.chuseok, o), '추석 연휴', 'sun'); });
    }

    // 2) 날짜별 집계 — 같은 날 둘 이상이면 '중복'으로 본다(설날·추석 대체 판정에 사용)
    var cnt = {}, out = {};
    base.forEach(function (h) { cnt[h.date] = (cnt[h.date] || 0) + 1; });
    base.forEach(function (h) { if (!out[h.date]) out[h.date] = h.name; });

    // 3) 대체공휴일 — 겹친 날마다 '다음 비공휴일 평일' 하나씩 부여
    var nextOpen = function (from) {
        var d = shift(from, 1), guard = 0;
        while (guard++ < 40 && (isWeekend(d) || out[d])) d = shift(d, 1);
        return d;
    };
    base.slice().sort(function (a, b) { return a.date.localeCompare(b.date); }).forEach(function (h) {
        if (!h.sub) return;
        var need = false;
        if (h.sub === 'we')  need = isWeekend(h.date);                        // 국경일 등 — 토·일만
        if (h.sub === 'wed') need = isWeekend(h.date) || cnt[h.date] > 1;     // 어린이날 — 토·일 또는 중복
        if (h.sub === 'sun') need = (dow(h.date) === 0) || cnt[h.date] > 1;   // 설날·추석 — 일요일 또는 중복
        if (!need) return;
        var t = nextOpen(h.date);
        if (t && !out[t]) out[t] = '대체공휴일(' + h.name.replace(' 연휴', '') + ')';
    });
    return out;
};

/* [K60] 계산된 공휴일을 system/holidays 에 자동 반영.
   · 이미 있는 날짜는 건드리지 않는다 → 수동 등록(임시공휴일·선거일)과 수정본이 항상 우선.
   · 기본 올해~2년 뒤까지. 중복 실행해도 안전(이미 있으면 건너뜀). */
window.kacHolidayAutoFill = async function (fromYear, toYear) {
    if (typeof firebase === 'undefined' || !firebase.database) return { added: 0, skipped: 0 };
    var y0 = Number(fromYear) || new Date().getFullYear();
    var y1 = Number(toYear) || (y0 + 2);
    var ref = firebase.database().ref('system/holidays');
    var cur = {};
    try { cur = (await ref.once('value')).val() || {}; } catch (e) { return { added: 0, skipped: 0, error: true }; }
    var upd = {}, added = 0, skipped = 0;
    for (var y = y0; y <= y1; y++) {
        var h = window.kacComputeHolidays(y);
        Object.keys(h).forEach(function (d) {
            if (cur[d] != null) { skipped++; return; }   // 수동 등록·수정분 보존
            upd[d] = h[d]; added++;
        });
    }
    if (added) { try { await ref.update(upd); } catch (e) { return { added: 0, skipped: skipped, error: true }; } }
    return { added: added, skipped: skipped };
};

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
/* ══════════════════════════════════════════════════════════════════════
   [K64] 입력 중이던 창이 멋대로 닫히는 문제 방지 — 전 플랫폼 공통
   ────────────────────────────────────────────────────────────────────
   증상: 팝업/드롭다운에 내용을 입력하다가 마우스가 창 밖으로 나가거나
         드래그로 글자를 선택하고 손을 떼면, '바깥 클릭 = 닫기' 처리가
         실행돼 저장하기 전에 창이 사라진다.
   원인: 누를 때는 창 안이었는데 뗄 때 밖이면, 브라우저는 두 지점의
         공통 조상(대개 body)에서 click 을 발생시킨다. 기존 바깥클릭
         닫기 로직은 이걸 '바깥을 눌렀다'로 오인한다.
   처리: ① 드래그로 끝난 클릭 · ② 화면(스크롤바 등) 밖에서 끝난 클릭은
            캡처 단계에서 전파를 끊어 닫기 로직에 전달하지 않는다.
         ③ 입력값을 고친 팝업이 열려 있으면, 바깥을 눌러도 1차는 닫지 않고
            안내만 띄운다. 6초 안에 한 번 더 누르면 그때는 닫는다
            (실수로 날리는 건 막고, 정말 나가려는 건 막지 않는다).
   ※ 개별 화면 코드는 하나도 고치지 않는다. ESC·닫기·저장 버튼은 그대로.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  if (window.__kacCloseGuard) return;
  window.__kacCloseGuard = true;

  var MOVE_PX = 10;          // 이 이상 움직였으면 '클릭'이 아니라 '드래그'로 본다
  var REPEAT_MS = 6000;      // 같은 창을 다시 누르면 닫아주는 유예 시간
  var _down = null;
  var _warnEl = null, _warnAt = 0;

  /* 입력칸이 들어있는 '떠 있는 창'을 찾는다(fixed/absolute 조상) */
  function floatBox(el) {
    for (var p = el; p && p !== document.body; p = p.parentElement) {
      var cs;
      try { cs = getComputedStyle(p); } catch (e) { return null; }
      if (cs.position === 'fixed' || cs.position === 'absolute') return p;
    }
    return null;
  }
  function visible(el) {
    try {
      var cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    } catch (e) { return false; }
  }
  /* 값을 고친 채 열려 있는 창(없으면 null) — 닫힌 창의 표시는 스스로 정리 */
  function dirtyBox() {
    var list = document.querySelectorAll('[data-kac-dirty="1"]');
    for (var i = 0; i < list.length; i++) {
      if (!visible(list[i])) { list[i].removeAttribute('data-kac-dirty'); continue; }
      return list[i];
    }
    return null;
  }

  /* 사용자가 입력칸을 건드리면 그 창에 '편집 중' 표시 */
  function markDirty(e) {
    var t = e && e.target;
    if (!t || !t.tagName) return;
    if (!/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    if (/^(button|submit|reset|checkbox|radio|file|image)$/i.test(t.type || '')) return;
    var box = floatBox(t);
    if (box) box.setAttribute('data-kac-dirty', '1');
  }
  document.addEventListener('input',  markDirty, true);
  document.addEventListener('change', markDirty, true);

  /* 저장/닫기/취소 같은 버튼을 누르면 편집 표시 해제 — 정상 종료는 막지 않는다 */
  document.addEventListener('mousedown', function (e) {
    _down = { t: e.target, x: e.clientX, y: e.clientY };
    try {
      var b = e.target && e.target.closest && e.target.closest('button,[role="button"],a');
      if (b) {
        var txt = (b.innerText || b.textContent || '') + ' ' + (b.title || '') + ' ' + (b.id || '');
        if (/저장|확인|등록|제출|적용|닫기|취소|완료|삭제/.test(txt)) {
          var box = floatBox(b);
          if (box) box.removeAttribute('data-kac-dirty');
        }
      }
    } catch (_) {}
  }, true);

  function hint(msg) {
    try {
      var id = '__kacCloseHint';
      var d = document.getElementById(id);
      if (!d) {
        d = document.createElement('div'); d.id = id;
        d.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);' +
          'top:calc(env(safe-area-inset-top,0px) + 18px);z-index:2147483600;' +
          'max-width:min(92vw,460px);box-sizing:border-box;padding:12px 18px;' +
          'background:rgba(15,23,42,.93);color:#fff;border-radius:999px;' +
          'font-size:13px;font-weight:800;line-height:1.45;text-align:center;' +
          'box-shadow:0 10px 30px rgba(15,23,42,.35);opacity:0;transition:opacity .2s;' +
          'pointer-events:none;word-break:keep-all;';
        document.body.appendChild(d);
      }
      d.textContent = msg;
      requestAnimationFrame(function () { d.style.opacity = '1'; });
      clearTimeout(d.__t);
      d.__t = setTimeout(function () { d.style.opacity = '0'; }, 2600);
    } catch (_) {}
  }

  /* 버튼·링크·입력칸 등 '진짜 누른 것'은 절대 막지 않는다.
     막는 대상은 빈 배경처럼 아무 동작도 없는 곳에서 끝난 클릭뿐이다. */
  function interactive(el) {
    try {
      return !!(el && el.closest && el.closest(
        'button,a,input,select,textarea,label,summary,[onclick],[role="button"],[tabindex]'));
    } catch (e) { return false; }
  }

  document.addEventListener('click', function (e) {
    var cw = document.documentElement.clientWidth;
    var ch = document.documentElement.clientHeight;

    // ① 화면 밖(스크롤바 등)에서 끝난 클릭 — 사용자가 의도한 '바깥 클릭'이 아니다
    if (e.clientX < 0 || e.clientY < 0 || e.clientX > cw || e.clientY > ch) {
      e.stopPropagation(); return;
    }
    // ② 드래그(글자 선택 등)로 끝난 클릭 — 누른 곳과 뗀 곳이 다르고 많이 움직였다
    if (_down && _down.t !== e.target && !interactive(e.target) &&
        (Math.abs(e.clientX - _down.x) + Math.abs(e.clientY - _down.y)) > MOVE_PX) {
      e.stopPropagation(); return;
    }
    // ③ 입력 중인 창이 열려 있으면, 빈 배경을 눌렀을 때 1차는 닫지 않는다
    var box = dirtyBox();
    if (box && !box.contains(e.target) && !interactive(e.target)) {
      var now = Date.now();
      if (_warnEl === box && (now - _warnAt) < REPEAT_MS) {
        box.removeAttribute('data-kac-dirty');   // 두 번째 = 정말 나가려는 것 → 통과
        _warnEl = null;
        return;
      }
      _warnEl = box; _warnAt = now;
      e.stopPropagation();
      hint('입력 중인 내용이 있어 창을 닫지 않았습니다. 저장 또는 닫기를 눌러 주세요.');
    }
  }, true);
})();

/* ══════════════════════════════════════════════════════════════════════
   [K68] 교재 자료실 — 전 플랫폼 공통
   ────────────────────────────────────────────────────────────────────
   · 파일 실체는 Cloudflare R2 에 보관하고, Firebase 에는 '주소'만 기록한다.
     → Firebase 용량·이그레스와 무관하고, 개인정보도 섞이지 않는다.
   · 저장 구조
       system/materials/{id}          교재 자체(영구 보관 — 과정이 끝나도 남음)
         { title, fileName, size, url, key, uploader, uploadedAt }
       courses/{room}/materials/{id}  이번 과정에 '연결'된 교재
         { linkedAt, linkedBy }
     → 과정이 끝나면 연결만 끊기고 파일은 자료실에 남아, 다음 기수에서 다시 쓴다.
   · 업로드 암호(UPLOAD_KEY)는 코드에 넣지 않는다. 강사가 올릴 때 1회 입력받아
     그 탭에서만(sessionStorage) 보관한다.
   ══════════════════════════════════════════════════════════════════════ */
window.KAC_MATERIALS_API = 'https://catcmaterials.jds0616.workers.dev';

window.kacMaterials = (function () {
  'use strict';
  var API = window.KAC_MATERIALS_API;
  var SKEY = 'kac_mat_key';

  /* 업로드 암호 — 이 탭에서만 기억(창을 닫으면 사라짐) */
  function getKey() { try { return sessionStorage.getItem(SKEY) || ''; } catch (e) { return ''; } }
  function setKey(v) { try { sessionStorage.setItem(SKEY, v || ''); } catch (e) {} }
  function clearKey() { try { sessionStorage.removeItem(SKEY); } catch (e) {} }

  function fmtSize(n) {
    n = Number(n) || 0;
    if (n >= 1048576) return (n / 1048576).toFixed(1) + 'MB';
    if (n >= 1024) return Math.round(n / 1024) + 'KB';
    return n + 'B';
  }

  /* 설치 상태 확인 */
  function ping() {
    return fetch(API + '/ping').then(function (r) { return r.json(); }).catch(function () { return { ok: false }; });
  }

  /* 파일 1개 올리기 → R2 저장 후 system/materials 에 기록, id 반환 */
  function upload(file, uploader) {
    var key = getKey();
    if (!key) return Promise.reject(new Error('NO_KEY'));
    return fetch(API + '/upload?name=' + encodeURIComponent(file.name), {
      method: 'POST',
      headers: { 'X-Upload-Key': key, 'Content-Type': file.type || 'application/octet-stream' },
      body: file
    })
    .then(function (r) { return r.json().then(function (j) { j._status = r.status; return j; }); })
    .then(function (j) {
      if (!j.ok) {
        if (j._status === 401) { clearKey(); throw new Error('관리자 암호가 올바르지 않습니다. 다시 시도해 주세요.'); }
        throw new Error(j.error || '업로드에 실패했습니다.');
      }
      var ref = firebase.database().ref('system/materials').push();
      var rec = {
        title: String(file.name || '').replace(/\.[^.]+$/, ''),   // 확장자 뺀 이름을 기본 제목으로
        fileName: j.name,
        size: Number(j.size || file.size || 0),
        url: j.url,
        key: j.key,
        uploader: String(uploader || '미상'),
        uploadedAt: Date.now()
      };
      return ref.set(rec).then(function () { return Object.assign({ id: ref.key }, rec); });
    });
  }

  /* 자료실 전체 목록 (최신순) */
  function listAll() {
    return firebase.database().ref('system/materials').once('value').then(function (s) {
      var v = s.val() || {}, out = [];
      Object.keys(v).forEach(function (k) { out.push(Object.assign({ id: k }, v[k])); });
      out.sort(function (a, b) { return (b.uploadedAt || 0) - (a.uploadedAt || 0); });
      return out;
    });
  }

  /* 과정에 연결 / 연결 해제 — 파일은 그대로 두고 연결만 바꾼다 */
  function link(room, id, who) {
    return firebase.database().ref('courses/' + room + '/materials/' + id)
      .set({ linkedAt: Date.now(), linkedBy: String(who || '') });
  }
  function unlink(room, id) {
    return firebase.database().ref('courses/' + room + '/materials/' + id).remove();
  }

  /* 자료실에서 영구 삭제 — R2 파일까지 지운다(되돌릴 수 없음) */
  function destroy(mat) {
    var key = getKey();
    if (!key) return Promise.reject(new Error('NO_KEY'));
    return fetch(API + '/f/' + mat.key, { method: 'DELETE', headers: { 'X-Upload-Key': key } })
      .then(function () { return firebase.database().ref('system/materials/' + mat.id).remove(); });
  }

  return { API: API, getKey: getKey, setKey: setKey, clearKey: clearKey,
           fmtSize: fmtSize, ping: ping, upload: upload, listAll: listAll,
           link: link, unlink: unlink, destroy: destroy };
})();
