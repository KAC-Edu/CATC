/* PLATFORM_EDIT_STATUS: 수정완료 | VERSION: N9 | 2026-07-05 */
/* [복구 2026-07-03] 파일 말단 184줄이 저장 중 잘림 → J8(260702Z40) 보관본의 동일 블록(리모컨 위젯·더보기 패널·ZOOM 표시 IIFE)으로 접합 복구. J8 이후 해당 말단 블록을 수정한 이력이 있다면 편집기 원본(L9)으로 재저장 권장. */
/* ============================================================
   PLATFORM_EDIT_STATUS: 수정완료 | VERSION: J14 | 2026-07-04 (J14: 수료 기념사진 버튼 위치·노출 규칙 변경 — 출결 화면 버튼 제거, 대시보드 히어로의 강의장소 배지 옆에 노란색(앰버 그라데이션·펄스) pill로 이동. 노출 = 과정 수료일 '당일' KST 06:00부터(새벽에 열어둔 화면도 06시에 자동 노출, settings 실시간 리스너 연동, 방 전환 시 초기화). (J13.1: 기념사진 모달 한 화면 수납 — 캔버스 높이를 화면에 맞춰 제한(max-height calc)해 미리보기·안내·버튼 3종이 스크롤 없이 항상 보임(드래그 레이어는 캔버스 표시 박스에 정확히 일치하도록 fit-content). 텍스트는 각 칸 오른쪽 경계(액자 실측 %)를 넘지 않도록 measureText 기반 자동 축소 — 긴 과정명/기간도 칸 안에 정렬. (J13: 수료 기념사진 신설 — 출결 관리 화면 '📸 수료 기념사진' 버튼(수료일 당일 금색 펄스). 강사가 폰으로 촬영 후 QR(grad_photo.html)로 업로드(긴변 1600·JPEG 0.8 압축, courses/{room}/gradPhoto 저장) 또는 PC에서 직접 선택. 액자(grad_frame.png, 가운데 투명)에 사진 cover-fit 합성 + 하단 4칸(과정명/교육기간/교육장소/담임교수) 자동 기입 — 각 글자 3초 드래그 보정(system/sharedGuide/gradPhotoPos, 액자 % 기준 전 과정 공통). 미리보기·PNG 다운로드·사진 교체·삭제 지원, PDF 전체화면 중에도 모달 표시. 유효기간 = 수료일(endDate) 자정까지: 종료 다음날 kacExpire 자동정리 및 수동 리셋·연간계획 삭제에서 gradPhoto 제거, 교육생 다운로드 버튼도 함께 사라짐. (J12.3: 입교안내 과정 전환 잔상 제거 — 다른 과정(또는 같은 방의 대면↔비대면 변형 변경)으로 이동 시 공용 캔버스·가상페이지·오버레이·버튼을 즉시 비우고 로딩 배지를 표시, 이전 과정 PDF가 잠깐 보이던 문제 해소. (J12.2: ①교육개요 오버레이 글자를 PDF 라벨과 동급 크기로(메인 2.6%·서브 2.25%) ②'회의참가 ID/PW' 항목 클릭 → 회의정보 입력 모달(PDF 전체화면 중에도 표시, 저장 시 오버레이 즉시 갱신·courses/{room}/zoomMeeting 단일 저장소라 ZOOM 모니터링 등 연동 화면 전체 적용, 드래그 직후 오클릭 방지) ③홈 검색카드 장소가 온라인(Zoom)이면 Zoom 블루(#0B5CFF) 블록+비디오 아이콘으로 강조(드롭다운 변경 시 즉시 반영). (J12.1: 교육개요 오버레이 수정 — ①값을 slot 캐시가 아닌 Firebase(settings/students/zoomMeeting)에서 직접 조회(진입 경로·타이밍 무관하게 과정명/기간 정확 표기, 늦은 응답 무시 토큰) ②글자 크기를 vw가 아닌 PDF 래퍼 폭 비례(메인 2.15%·서브 1.85%)로 — PDF와 같은 비율로 확대/축소되어 전체화면에서도 또렷 ③기본 좌표를 실측 기준(콜론 라인 중심)으로 보정. (J12: 비대면(온라인 Zoom) 입교안내 지원 — 과정 장소가 온라인(Zoom)이면 '입교안내(비대면).pdf' 자동 로드(장소 변경 시 재로드). 가상페이지(1p 뒤 교수소개→카카오 오픈톡방→입교등록절차→목차) 흐름은 대면과 동일, 대면용 '교육과정 안내' 가상페이지는 비대면에서 숨김. 비대면 PDF 4p 교육개요에 과정명·교육인원(입교등록수)·교육기간·교육구분·교육평가(대면과 동일 직무일반/법정 표기)·ZOOM 회의 ID/PW 오버레이 — 항목별 3초 롱프레스 드래그 이동, 윈도우/전체화면 좌표 개별 저장(system/sharedGuide/overviewPos, 전 과정 공통·실시간 동기). 교육시간표 버튼 페이지를 변형별로(대면 13p·비대면 7p) — 비대면은 지원부 판독본이 없으므로 기존 QR 사진 업로드/보기 버튼 그대로 동작. (J11: 입교안내 13p '교육시간표 보기' 신설 — 지원부가 한글 명단 업로드 시 자동 판독·저장되는 표 그리드(courses/{room}/schedule/grid, 셀좌표·병합정보 포함)를 실시간 구독. grid 있으면 녹색 버튼 노출→클릭 시 아래→위 슬라이드 시트에 원본 표 그대로 렌더(연속 강의 rowspan 줄합침+과정명·강사명 센터정렬, X로 슬라이드 다운). grid 없으면 기존 사진 보기/QR 업로드 흐름 유지. 녹색 버튼도 3초 롱프레스 위치보정(별도 그룹 parsedSchedule, 윈도우/전체화면 좌표 개별 저장). (J10: ①OTP 재사용 가드 — 강사 화면 새로고침/출결탭 재진입 시 잔여 15초 이상 유효 OTP를 서버에서 재사용, 매번 새 코드로 교체되어 입력 중이던 교육생이 만료 판정받던 문제 해소 ②담임(coordinatorName) 수동수정 보호 — status/coordManual 플래그 도입(professorManual과 동일 패턴), 강사가 담임을 바꿔도 연간계획 자동동기화가 계획값으로 되돌리던 버그 수정. 방 비움/신규 배치 시 플래그 해제 ③퇴교차량 자동판정 표시 — 지원부가 한글 시간표 업로드 시 기록되는 courses/{room}/shuttle/autoDeparture를 실시간 구독, 1차/2차 구분 없이 '이 과정 출발시간' 단일 표시(대시보드 인라인·셔틀 파란박스·도착 ETA 모두), 자동판정 없으면 기존 1차/2차 표기 유지. (J9: 지원부 생활관 명단(system/dorm/rosters) 오삭제 방지 — 리셋·명단비우기·연간계획삭제·종료과정자동정리 4개 경로 전부 '명단의 과정명이 해당 방 과정명과 일치할 때만' 삭제하도록 가드. 다른 과정 명단은 보존하고 console에 보존 사유 기록. (J8: ZOOM 진입 요소를 CSS !important 규칙으로 원천 차단 — 오프라인이면 어떤 코드가 표시해도 절대 안 보임(body.zoom-room-online 클래스 게이트). (J7: ZOOM 진입 요소 표시를 [onclick*=openZoomMonitor] 전체 선택으로 통일 + 2초 하트비트 — 오프라인에서 pill 잔존 완전 차단. (J6: ①장소 수동지정 보호(roomDetailManual) — 연간계획 동기화가 온라인 설정 되돌리는 문제 차단 ②ZOOM 버튼 표시를 장소 배지 텍스트와 상시 동기(MutationObserver) — 오프라인인데 버튼 남는 문제 해소 ③저장알림 확인 후 회의정보 모달 순차 표시(동시 팝업 제거) ④회의번호 000 0000 0000 자동 포맷 전용 모달. (J5: ①ZOOM 버튼 과정현황 장소 옆으로+오프라인 완전숨김(방전환 기본숨김·온라인 가드) ②iframe 사이징 실측기반 재작성 ③온라인 장소 저장 시 회의번호/암호 과정별 저장(askZoomMeetingInfo) ④홈검색 카카오등록 교수 노란배지 ⑤퇴교차량 칩 인라인 펼침. (J4: ZOOM 모니터링 iframe 높이를 body zoom 배율 보정해 실제 화면에 맞춤 — 설정 패널 잘림 해소, 리사이즈 대응. (J3: ui.openZoomMonitor 추가 — ZOOM 모니터링을 내장 뷰(iframe)로 열고 과정 전환 시 확인 후 재로딩, 온라인 판별 토글에 더보기 메뉴 항목 포함) (J2: ①ZOOM 모니터링 버튼 표시로직 재적용(온라인 과정 판별) ②강의실 초기화 confirm에 삭제범위 안내 추가 ③QR 요소없음 개발자문구 교체 ④toggleNightMode/addSubject 널가드 — 구버전 잔재 안전화)
   CATC · 강사 플랫폼 로직  (admin.js)
   STATUS    수정완료
   @version  N9
   @build    20260705-012631
   ------------------------------------------------------------
   [코드 수정 규칙 · AI/개발자 공통]
   이 파일을 고치면 @version 을 A -> B -> ... -> Z -> A1 -> B1 ...
   순으로 1단계 올리고, @build 를 수정 시각으로 갱신할 것.
   적용 여부는 브라우저 콘솔 로그(vA)로 확인한다.
============================================================ */
try{console.log('%cCATC%c 강사 플랫폼 로직 (admin.js) %cvN9%c build 20260705-012631','background:#0ea5e9;color:#fff;font-weight:800;padding:1px 5px;border-radius:3px','color:#64748b','color:#f59e0b;font-weight:800','color:#94a3b8');}catch(e){}
/* --- admin.js (Final Integrated Version - Fixed Syntax & Logic) --- */

// --- [기본 데이터] 20문항 ---
const DEFAULT_QUIZ_DATA = [
    { text: "[상식] 사람의 뼈는 성인이 되면서 뼈의 개수가 줄어든다.", options: ["O (줄어든다)", "X (늘어난다)"], correct: 1, isSurvey: false, isOX: true, checked: true },
    { text: "[건강] 식사 후 바로 눕는 습관은 소화에 도움이 된다.", options: ["O", "X"], correct: 2, isSurvey: false, isOX: true, checked: true },
    { text: "[상식] 세계에서 가장 넓은 바다(대양)는 어디일까요?", options: ["대서양", "인도양", "태평양", "북극해"], correct: 3, isSurvey: false, isOX: false, checked: true },
    { text: "[설문] 현재 강의실의 실내 온도는 어떠신가요?", options: ["너무 추워요", "적당해요", "조금 더워요", "많이 더워요"], correct: 0, isSurvey: true, isOX: false, checked: true },
    { text: "[상식] 북극곰은 펭귄을 사냥해서 잡아먹는다.", options: ["O (먹는다)", "X (만날 수 없다)"], correct: 2, isSurvey: false, isOX: true, checked: true },
    { text: "[건강] 햇빛을 쬘 때 우리 몸에서 생성되는 비타민은?", options: ["비타민 A", "비타민 B", "비타민 C", "비타민 D"], correct: 4, isSurvey: false, isOX: false, checked: true },
    { text: "[상식] 올림픽 오륜기(파랑,노랑,검정,초록,빨강)에 포함되지 않는 색은?", options: ["검정", "초록", "보라", "빨강"], correct: 3, isSurvey: false, isOX: false, checked: true },
    { text: "[설문] 오늘 점심 메뉴로 가장 당기는 종류는?", options: ["한식 (찌개/밥)", "중식 (짜장/짬뽕)", "일식 (돈까스/초밥)", "양식/분식"], correct: 0, isSurvey: true, isOX: false, checked: true },
    { text: "[동물] 문어의 심장은 1개가 아니라 3개다.", options: ["O", "X"], correct: 1, isSurvey: false, isOX: true, checked: true },
    { text: "[상식] 커피의 원산지로 알려진 '이 나라'는 어디일까요?", options: ["브라질", "에티오피아", "콜롬비아", "베트남"], correct: 2, isSurvey: false, isOX: false, checked: true },
    { text: "[설문] 현재 강사님의 수업 진행 속도는 어떤가요?", options: ["너무 빨라요", "적당해요", "조금 느려요"], correct: 0, isSurvey: true, isOX: false, checked: true },
    { text: "[건강] 땀을 많이 흘리면 지방이 연소되어 살이 빠진다.", options: ["O (살 빠짐)", "X (수분만 빠짐)"], correct: 2, isSurvey: false, isOX: true, checked: true },
    { text: "[지리] 호주(Australia)의 수도는 시드니이다.", options: ["O", "X (캔버라)"], correct: 2, isSurvey: false, isOX: true, checked: true },
    { text: "[설문] 강의 자료나 화면의 글씨 크기는 잘 보이시나요?", options: ["잘 보입니다", "조금 작아요", "너무 작아서 안 보여요"], correct: 0, isSurvey: true, isOX: false, checked: true },
    { text: "[인물] 세계적인 화가 '파블로 피카소'의 국적은?", options: ["프랑스", "이탈리아", "스페인", "네덜란드"], correct: 3, isSurvey: false, isOX: false, checked: true },
    { text: "[건강] 목이 뻐근할 때 고개를 세게 돌려 '우두둑' 소리를 내는 것은 좋다.", options: ["O (시원하다)", "X (관절에 위험하다)"], correct: 2, isSurvey: false, isOX: true, checked: true },
    { text: "[설문] 만약 지금 당장 여행을 떠난다면 선호하는 곳은?", options: ["시원한 바다", "조용한 산/계곡", "화려한 도시", "집이 최고"], correct: 0, isSurvey: true, isOX: false, checked: true },
    { text: "[식물] 바나나는 나무가 아니라 거대한 '풀'의 열매다.", options: ["O", "X"], correct: 1, isSurvey: false, isOX: true, checked: true },
    { text: "[설문] 다음 쉬는 시간은 언제쯤 가지면 좋을까요?", options: ["지금 당장", "10분 뒤", "30분 뒤", "수업 끝까지 달린다"], correct: 0, isSurvey: true, isOX: false, checked: true },
    { text: "[설문] 마지막으로, 오늘 교육에 대한 전반적인 만족도는?", options: ["매우 만족", "만족", "보통", "아쉬움"], correct: 0, isSurvey: true, isOX: false, checked: true }
];

// --- 날짜 유틸리티 함수 ---
function getTodayString() {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
}

function getYesterdayString() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return `${yesterday.getFullYear()}-${String(yesterday.getMonth()+1).padStart(2,'0')}-${String(yesterday.getDate()).padStart(2,'0')}`;
}

// [외출/외박 운영일 윈도우] 한국시간(KST) 09:00 ~ 익일 09:00.
//  외출/외박은 자정이 아니라 '익일 오전 09:00'에 초기화되어야 하므로,
//  교육운영부 플랫폼과 동일하게 timestamp가 이 윈도우에 드는 신청만 '금일'로 본다.
function getOutingWindowKST() {
    const KST_OFFSET = 9 * 60 * 60 * 1000;
    const nowKst = new Date(Date.now() + KST_OFFSET);
    const y = nowKst.getUTCFullYear(), m = nowKst.getUTCMonth(), d = nowKst.getUTCDate(), h = nowKst.getUTCHours();
    let start = Date.UTC(y, m, d, 9, 0, 0) - KST_OFFSET;      // 오늘 09:00(KST)의 UTC ms
    if (h < 9) start -= 24 * 60 * 60 * 1000;                  // 09:00 이전이면 어제 09:00부터
    return { start: start, end: start + 24 * 60 * 60 * 1000 };// [start, start+24h) = 익일 09:00
}

const state = {
    sessionId: (function() {
        let id = sessionStorage.getItem('kac_admin_sid');
        if (!id) {
            id = Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('kac_admin_sid', id);
        }
        return id;
    })(),
    room: null,
    isObserver: false,
    isTestMode: false,
    quizList: [],
    isExternalFileLoaded: false, 
    currentQuizIdx: 0,
    activeQaKey: null,
    qaData: {},
    currentQaFilter: 'all', // 이 줄을 추가하여 기본 필터값 보장
    timerInterval: null,
    pendingRoom: null,
    timerAudio: null,
    noticeSeen: {}, // 공지 읽음 메모리 (탭 이동해도 유지, 새로고침은 리셋)
    newBadgeTimer: null,
    remainingTime: 8,
    ansListener: null,
    adminActionRef: null // 추가됨
};

let dbRef = { qa: null, quiz: null, ans: null, settings: null, status: null, connections: null };

// --- 1. Auth ---
const authMgr = {
    ADMIN_EMAIL: "admin@kac.com", 
 
    tryLogin: async function() {
        const inputPw = document.getElementById('loginPwInput').value;
        const msgDiv = document.getElementById('loginMsg');

        if(!inputPw) { alert("비밀번호를 입력해주세요."); return; }

        try {
            await firebase.auth().signInWithEmailAndPassword(this.ADMIN_EMAIL, inputPw);
            if(msgDiv) {
                msgDiv.innerText = "로그인 되었습니다. 잠시만 기다려주세요...";
                msgDiv.style.color = "#10b981";
            }
            // onAuthStateChanged가 자동으로 loginOverlay 숨기고 loadInitialData 호출
            // 여기서 중복 호출 안 함
        } catch (error) {
            console.error("로그인 오류:", error.code, error.message);
            let msg = "비밀번호가 올바르지 않습니다.";
            if(error.code === 'auth/unauthorized-domain') {
                msg = "⛔ 도메인 인증 오류\n\nFirebase 콘솔 → Authentication → Settings → Authorized domains에\n현재 사이트 주소를 추가해주세요.\n\n현재 도메인: " + location.hostname;
                alert(msg);
            } else if(error.code === 'auth/network-request-failed') {
                msg = "⛔ 네트워크 오류 - 인터넷 연결을 확인해주세요.";
            } else if(error.code === 'auth/too-many-requests') {
                msg = "⛔ 로그인 시도 초과 - 잠시 후 다시 시도해주세요.";
            } else {
                msg = "⛔ 오류: " + (error.code || error.message);
            }
            if(msgDiv) {
                msgDiv.innerText = msg;
                msgDiv.style.color = "#ef4444";
            }
            document.getElementById('loginPwInput').value = "";
            document.getElementById('loginPwInput').focus();
        }
    },

logout: async function() {
        if (confirm("로그아웃 하시겠습니까?")) {
            try {
                // 로그아웃 시 내가 사용 중이던 방이 있다면 서버의 세션 점유 해제
                if(state.room) {
                    const snap = await firebase.database().ref(`courses/${state.room}/status`).get();
                    const st = snap.val() || {};
                    // 서버에 등록된 주인이 나(내 세션ID)라면 점유 정보만 삭제
                    if(st.ownerSessionId === state.sessionId) {
                        await firebase.database().ref(`courses/${state.room}/status/ownerSessionId`).set(null);
                    }
                }
                await firebase.auth().signOut();
                localStorage.removeItem('last_owned_room');
                localStorage.removeItem('kac_last_room');
                dataMgr.clearOwnedRooms();
                location.reload(); 
            } catch (error) {
                console.error("Logout Error:", error);
                alert("로그아웃 중 오류가 발생했습니다.");
            }
        }
    },

    executeChangePw: async function() {
        const user = firebase.auth().currentUser;
        const newPw = document.getElementById('cp-new').value;
        const confirmPw = document.getElementById('cp-confirm').value;
        if(!user) return ui.showAlert("로그인 상태가 아닙니다.");
        if(!newPw || !confirmPw) return ui.showAlert("모든 필드를 입력해주세요.");
        if(newPw !== confirmPw) return ui.showAlert("새 비밀번호가 일치하지 않습니다.");
        try { 
            await user.updatePassword(newPw); 
            ui.showAlert("비밀번호가 변경되었습니다."); 
            ui.closePwModal(); 
        } catch (e) { 
            ui.showAlert("변경 실패: " + e.message); 
        }
    }
};

// --- 2. Data & Room Logic ---
const dataMgr = {
    // ── 강의 안내 보드 저장/불러오기 ──
    saveBoardNotice: function() {
        if(state.isObserver) return ui.showAlert("👁️ 옵저버 모드에서는 수정할 수 없습니다.");
        if(!state.room) return ui.showAlert("강의실을 먼저 선택해 주세요.");
        const editor = document.getElementById('boardEditor');
        if(!editor) return;
        const html = editor.innerHTML;
        // 보이는 텍스트가 없으면(빈 줄/<br>/&nbsp;만 남은 경우 포함) 게시하지 않고 내용을 비움
        const visible = (editor.innerText || '').replace(/[\s\u00a0\u200b]/g, '');
        const isEmpty = visible.length === 0;
        const payload = {
            html: isEmpty ? '' : html,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        firebase.database().ref(`courses/${state.room}/boardNotice`).set(payload).then(() => {
            const now = new Date();
            const ts = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
            const el = document.getElementById('boardLastSaved');
            if(el) el.textContent = `오늘 ${ts}`;
            ui.showAlert(isEmpty
                ? "🧹 내용이 비어 있어 강의 안내 보드 게시를 내렸습니다.\n(교육생 앱에 표시되지 않습니다)"
                : "✅ 강의 안내 보드가 저장되어 교육생 앱에 게시되었습니다.");
        });
    },

    loadBoardNotice: function() {
        if(!state.room) return;
        const roomAtBind = state.room;
        // 이전 방의 boardNotice 리스너 제거 후, 현재 방에 새로 연결
        try { firebase.database().ref(`courses/${roomAtBind}/boardNotice`).off(); } catch(e){}
        firebase.database().ref(`courses/${roomAtBind}/boardNotice`).on('value', snap => {
            // 콜백이 늦게 도착해 방이 이미 바뀐 경우엔 무시 (이전 방 데이터 잔류 방지)
            if (state.room !== roomAtBind) return;
            const editor = document.getElementById('boardEditor');
            if(!editor) return;
            const val = snap.val();
            const html = (val && typeof val === 'object') ? (val.html || '') : (val || '');
            // [버그수정] 값이 없으면 반드시 비운다 — 이전 방 공지가 새 방에 남아 보이던 문제 해결
            editor.innerHTML = html || "";
            const el = document.getElementById('boardLastSaved');
            if(el) el.textContent = html ? '저장된 내용 불러옴' : '';
        });
    },

    checkAdminSecret: async function(input) {
        const snap = await firebase.database().ref('system/adminSecret').get();
        const dbSecret = snap.val() || btoa("kac123!@#"); 
        return btoa(input) === dbSecret;
    },
    
    updateAdminSecret: async function() {
        const curr = document.getElementById('secret-current').value;
        const next = document.getElementById('secret-new').value;
        const isRight = await this.checkAdminSecret(curr);
        if(!isRight) return ui.showAlert("현재 관리자 암호가 틀립니다.");
        if(next.length < 4) return ui.showAlert("새 암호는 4자리 이상이어야 합니다.");
        await firebase.database().ref('system/adminSecret').set(btoa(next));
        ui.showAlert("시스템 관리자 암호가 변경되었습니다.");
        ui.closeSecretModal();
    },
    
    checkMobile: function() {
        const ua = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        if (isMobile) {
            document.getElementById('mobileRestrictOverlay').style.display = 'flex';
        }
    },
    
// dataMgr 객체 내부의 initSystem과 loadInitialData를 아래로 교체
initSystem: function() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) { 
                document.getElementById('loginOverlay').style.display = 'none'; 
                // 로그인이 확인되면 즉시 데이터 로드 및 방 복구 프로세스 시작
                this.loadInitialData(); 
            } else { 
                document.getElementById('loginOverlay').style.display = 'flex'; 
            }
        });
    },
    


















// [수정 완료] 초기 데이터 로드 및 보안 검증 자동화 버전
loadInitialData: function() {
    // 1. 방 선택창(Dropdown) 및 실시간 강의실 현황판 초기화
    ui.initRoomSelect();

    // 2. [보안 핵심] 새로고침 시 자동 복구 로직 수정
    const lastRoom = localStorage.getItem('kac_last_room');

    // 항상 현황판 먼저 표시 (새로고침 시 "확인 중..." 화면 방지)
    ui.showWaitingRoom();

    if (lastRoom && lastRoom !== "null" && lastRoom !== "") {
        // 현황판 표시 후 백그라운드에서 방 복구 시도 (새로고침 시 비밀번호창 안 띄움)
        setTimeout(() => {
            this.switchRoomAttempt(lastRoom.toUpperCase(), true); // silent=true
        }, 100);
    }

    // 3. 기본 퀴즈 데이터셋 설정
    state.quizList = DEFAULT_QUIZ_DATA;
    state.isExternalFileLoaded = false;
    quizMgr.renderMiniList();

    // 4. 강의실 선택 드롭다운 이벤트 바인딩 (보안 검증 로직 연결)
    const roomSel = document.getElementById('roomSelect');
    if(roomSel) {
        roomSel.onchange = (e) => { 
            if(e.target.value) {
                // 사용자가 방을 클릭할 때마다 보안 검증(switchRoomAttempt) 실행
                this.switchRoomAttempt(e.target.value.toUpperCase()); 
            }
        };
    }

    // 5. 사이드바 작은 QR 코드를 클릭하면 크게 띄우기
    const qrEl = document.getElementById('qrcode'); 
    if(qrEl) {
        qrEl.style.cursor = "pointer";
        qrEl.onclick = function() { 
            ui.openQrModal(); 
        };
    }
},





















    
// [수정 완료] 보안 검증 강화 및 데이터 유출 차단 로직
switchRoomAttempt: async function(newRoom, silent = false) {
    // [방 이동 시] 메인 통합 현황 팝업이 열려 있으면 닫는다
    const _hsm = document.getElementById('homeStatModal');
    if (_hsm) _hsm.style.display = 'none';
    // [방 이동 시 QR UI 강제 초기화]
    if (typeof ui !== 'undefined' && ui.closeQrModal) ui.closeQrModal();
    const _fqr = document.getElementById('floatingQR');
    if (_fqr) _fqr.style.display = 'none';
    const _mqr = document.getElementById('miniQRElement');
    if (_mqr) _mqr.innerHTML = '';

    // 1. 시각적 즉시 차단 + 대시보드/헤더 초기화 (이전 방 정보 잔류 방지)
    const overlay = document.getElementById('statusOverlay');
    if (overlay && !silent) overlay.style.display = 'flex'; // silent(새로고침)일 때는 잠금화면 안 띄움
    ui.clearDashboard();
    const dtEl = document.getElementById('displayCourseTitle');
    if (dtEl) dtEl.innerText = '';
    const drEl = document.getElementById('displayRoomName');
    if (drEl) drEl.innerText = `Room #${newRoom}`;
    // select room 드롭다운 즉시 동기화
    const selEl = document.getElementById('roomSelect');
    if(selEl) selEl.value = newRoom;

    localStorage.setItem('kac_last_mode', 'dashboard');
    
    // 해당 방에 대한 옵저버 모드 여부 확인
    state.isObserver = (sessionStorage.getItem('kac_observer_room') === newRoom);

    // 2. 서버의 실시간 상태 + 비밀번호 설정 여부 동시 조회
    //  [수정] 기존엔 ownerSessionId 유무만으로 차단 여부를 판단해
    //  자동배치 후 ownerSessionId=null 인 방은 비밀번호가 있어도 누구나 자유입장됐음.
    //  이제 비밀번호가 설정된 방은 주인 없어도 반드시 인증 요구.
    const [snapshot, pwSnap] = await Promise.all([
        firebase.database().ref(`courses/${newRoom}/status`).get(),
        firebase.database().ref(`courses/${newRoom}/settings/password`).get()
    ]);
    const st = snapshot.val() || {};
    const roomHasPassword = !!(pwSnap.val()); // 비밀번호가 설정돼 있으면 true

    const isActive = (st.roomStatus === 'active');
    const isOwner = (st.ownerSessionId === state.sessionId);
    // [오탐 방지] 강사가 로그아웃 없이 브라우저/탭만 닫으면 ownerSessionId가 남아
    //  실제로 아무도 없는데 '운영 중'으로 보일 수 있다. 생존신호(ownerLastSeen, 20초마다 갱신)가
    //  60초 이상 끊긴 방은 주인이 없는 빈 방으로 간주한다.
    const OWNER_STALE_MS = 60000;
    const ownerLastSeen0 = Number(st.ownerLastSeen || 0);
    const ownerIsStale = !ownerLastSeen0 || (Date.now() - ownerLastSeen0 > OWNER_STALE_MS);
    const hasOwnerRecord = !!st.ownerSessionId && !ownerIsStale; // 생존신호가 살아있는 주인만 유효
    // 살아있는 주인이 있으면 '옵저버/강사' 선택을 먼저 띄운다. (끊긴 주인은 빈 방 취급)
    // [비번 옵션화] 비밀번호가 설정된 방만 인증을 요구. 비번 없는 방은 자유 입장/퇴장.
    const blocked = isActive && hasOwnerRecord && !isOwner && !state.isObserver;
    const needsPasswordOnly = roomHasPassword && isActive && !hasOwnerRecord && !isOwner && !state.isObserver;

    // 3. [보안 핵심] 인증 전 버튼 및 기능 물리적 잠금
    const setupBtn = document.getElementById('btnSetupModal');
    if (setupBtn) {
        if (blocked) {
            // 권한이 없는 사용자가 접속했을 때 버튼 상태
            setupBtn.style.setProperty('background', '#64748b', 'important');
            setupBtn.style.setProperty('opacity', '0.6', 'important');
            setupBtn.style.pointerEvents = 'none'; 
            setupBtn.disabled = true;
            setupBtn.innerHTML = '<i class="fa-solid fa-lock"></i> 과정 잠김 (인증 필요)';
        } else {
            // 본인 소유이거나 비어있는 방일 때 버튼 상태 복구
            setupBtn.style.setProperty('background', '', '');
            setupBtn.style.setProperty('opacity', '1', '');
            setupBtn.style.pointerEvents = 'auto';
            setupBtn.disabled = false;
            // 통합 현황판(홈)=교수님 프로필 수정(노란색) / 과정 화면=교육과정 환경 설정(파란색)
            if (!state.room) {
                setupBtn.innerHTML = '<i class="fa-solid fa-user-pen"></i> 교수님 프로필 수정';
                setupBtn.classList.add('btn-prof-mode');
                setupBtn.title = '교수님별 프로필(사진·연락처·약력 등)을 수정합니다';
            } else {
                setupBtn.innerHTML = '<i class="fa-solid fa-gears"></i> 교육과정 환경 설정 (통합)';
                setupBtn.classList.remove('btn-prof-mode');
                setupBtn.title = '';
            }
        }
    }

    // 4. [분기 처리] 권한 여부에 따른 입장 통제
    
    // (A) 방이 사용 중이고 '실제 소유자'가 있는데 내가 주인이 아니고 옵저버도 아님 -> 차단
    if (blocked || needsPasswordOnly) {
        console.log(`[권한 차단] Room #${newRoom}에 대한 소유권이 없습니다.`);

        // 새로고침 복구 시(silent)에는 비밀번호창 없이 현황판으로 복귀
        if (silent) {
            localStorage.removeItem('kac_last_room');
            ui.showWaitingRoom();
            const sel = document.getElementById('roomSelect');
            if(sel) sel.value = '';
            return;
        }

        state.pendingRoom = newRoom;

        if (blocked) {
            const lbl1 = document.getElementById('roleChoiceRoomLabel');
            if (lbl1) lbl1.innerText = `Room #${newRoom}`;
            const roleMsg = document.getElementById('roleChoiceStatusText');
            if (roleMsg) roleMsg.innerText = '이 강의실은 현재 다른 기기에서 강사가 운영 중입니다.';
            document.getElementById('roleChoiceModal').style.display = 'flex';
        } else {
            this.openRoomPasswordModal(newRoom);
        }
        return;
    }

    // (B) 내가 주인이거나, 옵저버이거나, 혹은 방이 비어있는 경우 -> 입장 허용
    // silent(새로고침)일 때는 자동 입장 안 하고 현황판 유지
    if (silent) {
        ui.showWaitingRoom();
        const sel = document.getElementById('roomSelect');
        if(sel) sel.value = '';
        localStorage.removeItem('kac_last_room');
        return;
    }
    console.log(`[인증 성공] Room #${newRoom} 데이터 로드를 시작합니다.`);
    this.forceEnterRoom(newRoom);
    
    // [참고] forceEnterRoom 내부 리스너에서 소유권이 최종 확인되면 
    // 그 때 overlay를 none으로 바꿔 화면을 보여주게 됩니다.
},










    
     // [수정] 인증 성공 시에만 세션 ID를 서버에 등록하여 '정식 주인'으로 인정
verifyTakeover: async function() {
        const newRoom = state.pendingRoom;
        let input = document.getElementById('takeoverPwInput').value;
        if(input) input = input.trim(); 
        if (!newRoom) return;

        const settingSnap = await firebase.database().ref(`courses/${newRoom}/settings`).get();
        const settings = settingSnap.val() || {};
        const hasPw = !!settings.password;
        if (hasPw && !input) return;

        if (!hasPw || btoa(input) === settings.password) {
            // [수정] 강사 입장 시 해당 방의 옵저버 기록만 정밀 삭제
            state.isObserver = false; 
            sessionStorage.removeItem('kac_observer_room');
            const micConsent = !!document.getElementById('entryMicConsent')?.checked;

            await firebase.database().ref(`courses/${newRoom}/status`).update({ 
                ownerSessionId: state.sessionId,
                ownerLastSeen: firebase.database.ServerValue.TIMESTAMP,
                roomStatus: 'active'
            });
            if (micConsent) {
                lectureMonitor._consentRoomAsked = newRoom;
                lectureMonitor._rememberSessionConsent();
                await lectureMonitor.requestMic();
            } else {
                lectureMonitor._consentRoomAsked = newRoom;
                lectureMonitor.stopMic(true);
            }
            localStorage.setItem(`last_owned_room`, newRoom);
            dataMgr.addOwnedRoom(newRoom);
            document.getElementById('takeoverModal').style.display = 'none';
            this.forceEnterRoom(newRoom);
            ui.showAlert("✅ 제어권을 획득했습니다.");
        } else {
            ui.showAlert("⛔ 비밀번호가 올바르지 않습니다.");
            document.getElementById('takeoverPwInput').value = "";
            document.getElementById('takeoverPwInput').focus();
        }
    },




// [최종] 강사 <-> 옵저버 통합 토글 핸들러
    handleModeToggle: function() {
        if (!state.room) return ui.showAlert("강의실을 먼저 선택하세요.");

        if (state.isObserver) {
            // [비번 폐지] 옵저버 → 강사: 비밀번호 창 없이 바로 강사 모드로 전환(오픈 접근)
            dataMgr._directTeacherEnter(state.room);
        } else {
            // 강사 → 옵저버 전환
            this.switchToObserverMode();
        }
    },

    switchToObserverMode: async function() {
        if(confirm("제어권을 내려놓고 '옵저버 모드'로 전환하시겠습니까?")) {
            // 서버 점유권 삭제
            await firebase.database().ref(`courses/${state.room}/status/ownerSessionId`).set(null);
            // 옵저버 메모 저장
            sessionStorage.setItem('kac_observer_room', state.room);
            state.isObserver = true;
            // 화면 갱신
            this.forceEnterRoom(state.room);
            ui.updateObserverButton(); // 버튼 모양 즉시 변경
            ui.showAlert("👁️ 옵저버 모드로 전환되었습니다.");
        }
    },




    // 빈 강의실 첫 입장: 권한 선택 없이 비밀번호만 확인
    openRoomPasswordModal: function(newRoom) {
        state.entryIntent = 'teacher';
        state.pendingRoom = newRoom;
        const roleModal = document.getElementById('roleChoiceModal');
        if (roleModal) roleModal.style.display = 'none';
        const input = document.getElementById('takeoverPwInput');
        if (input) input.value = "";
        const lbl = document.getElementById('takeoverRoomLabel');
        if (lbl) lbl.innerText = `Room #${newRoom}`;
        const hdr = document.querySelector('#takeoverModal .modal-header h3');
        if (hdr) hdr.innerHTML = '<i class="fa-solid fa-door-open"></i> 강의실 입장 인증';
        const btT = document.getElementById('btnTakeoverTeacher');
        const btO = document.getElementById('btnTakeoverObserver');
        if (btT) { btT.style.display = 'flex'; btT.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> 강사모드로 입장'; }
        if (btO) btO.style.display = 'none';
        const micWrap = document.getElementById('entryMicConsentWrap');
        const micChk = document.getElementById('entryMicConsent');
        if (micWrap) micWrap.style.display = 'none';
        if (micChk) micChk.checked = false;
        const modal = document.getElementById('takeoverModal');
        if (modal) modal.style.display = 'flex';
        setTimeout(() => input && input.focus(), 50);
    },

    // [비번 옵션화] 비번 없는 방에 인증 없이 강사로 직접 입장
    _directTeacherEnter: async function(newRoom) {
        if (!newRoom) return;
        state.isObserver = false;
        sessionStorage.removeItem('kac_observer_room');
        await firebase.database().ref(`courses/${newRoom}/status`).update({
            ownerSessionId: state.sessionId,
            ownerLastSeen: firebase.database.ServerValue.TIMESTAMP,
            roomStatus: 'active'
        });
        localStorage.setItem('last_owned_room', newRoom);
        dataMgr.addOwnedRoom(newRoom);
        const tm = document.getElementById('takeoverModal');
        if (tm) tm.style.display = 'none';
        dataMgr.forceEnterRoom(newRoom);
    },

    // [입장 방식 선택] 강사 권한 가져오기 → 비밀번호 입력창으로
    chooseTakeover: async function() {
        document.getElementById('roleChoiceModal').style.display = 'none';
        state.entryIntent = 'teacher';
        const newRoom = state.pendingRoom;
        // [비번 옵션화] 비번 없는 방이면 인증 없이 바로 강사 입장
        try { const _ps = await firebase.database().ref(`courses/${newRoom}/settings/password`).get(); if (!_ps.val()) { await dataMgr._directTeacherEnter(newRoom); return; } } catch(e){}
        document.getElementById('takeoverPwInput').value = "";
        const lbl = document.getElementById('takeoverRoomLabel');
        if (lbl) lbl.innerText = `Room #${newRoom}`;
        const hdr = document.querySelector('#takeoverModal .modal-header h3');
        if (hdr) hdr.innerHTML = '<i class="fa-solid fa-chalkboard-user"></i> 강사 권한 인증';
        // 버튼: 강사 획득만 노출
        const btT = document.getElementById('btnTakeoverTeacher');
        const btO = document.getElementById('btnTakeoverObserver');
        if (btT) { btT.style.display = 'flex'; btT.innerHTML = '<i class="fa-solid fa-chalkboard-user"></i> 강사 권한 가져오기'; }
        if (btO) btO.style.display = 'none';
        const micWrap = document.getElementById('entryMicConsentWrap');
        const micChk = document.getElementById('entryMicConsent');
        if (micWrap) micWrap.style.display = 'none';
        if (micChk) micChk.checked = false;
        document.getElementById('takeoverModal').style.display = 'flex';
        setTimeout(() => document.getElementById('takeoverPwInput').focus(), 50);
    },

    // [입장 방식 선택] 옵저버 → 비밀번호 입력창으로(옵저버 의도 유지)
    chooseObserver: async function() {
        document.getElementById('roleChoiceModal').style.display = 'none';
        state.entryIntent = 'observer';
        const newRoom = state.pendingRoom;
        // [비번 옵션화] 비번 없는 방이면 인증 없이 바로 옵저버 입장
        try { const _ps = await firebase.database().ref(`courses/${newRoom}/settings/password`).get(); if (!_ps.val()) { state.isObserver = true; sessionStorage.setItem('kac_observer_room', newRoom); const _tm=document.getElementById('takeoverModal'); if(_tm) _tm.style.display='none'; dataMgr.forceEnterRoom(newRoom); return; } } catch(e){}
        document.getElementById('takeoverPwInput').value = "";
        const lbl = document.getElementById('takeoverRoomLabel');
        if (lbl) lbl.innerText = `Room #${newRoom}`;
        const hdr = document.querySelector('#takeoverModal .modal-header h3');
        if (hdr) hdr.innerHTML = '<i class="fa-solid fa-binoculars"></i> 옵저버 입장 인증';
        // 버튼: 옵저버 입장만 노출
        const btT = document.getElementById('btnTakeoverTeacher');
        const btO = document.getElementById('btnTakeoverObserver');
        if (btT) btT.style.display = 'none';
        if (btO) { btO.style.display = 'flex'; }
        const micWrap = document.getElementById('entryMicConsentWrap');
        const micChk = document.getElementById('entryMicConsent');
        if (micWrap) micWrap.style.display = 'none';
        if (micChk) micChk.checked = false;
        document.getElementById('takeoverModal').style.display = 'flex';
        setTimeout(() => document.getElementById('takeoverPwInput').focus(), 50);
    },

    // 비밀번호 모달 엔터/제출 → 의도에 따라 분기
    submitTakeover: function() {
        if (state.entryIntent === 'observer') {
            this.enterAsObserver();
        } else {
            this.verifyTakeover();
        }
    },

    cancelRoleChoice: function() {
        document.getElementById('roleChoiceModal').style.display = 'none';
        const overlay = document.getElementById('statusOverlay');
        if (overlay) overlay.style.display = 'none';
        state.pendingRoom = null;
        state.room = null;
        ui.showWaitingRoom();
    },

enterAsObserver: async function() {
        const newRoom = state.pendingRoom;
        if (!newRoom) return;

        const settingSnap = await firebase.database().ref(`courses/${newRoom}/settings`).get();
        const settings = settingSnap.val() || {};
        const hasPw = !!settings.password;
        let input = document.getElementById('takeoverPwInput').value;
        if (input) input = input.trim();
        if (hasPw) {
            if (!input) {
                ui.showAlert("👁️ 이 강의실은 비밀번호가 설정돼 있습니다.\n비밀번호를 입력해주세요.");
                document.getElementById('takeoverPwInput').focus();
                return;
            }
            if (btoa(input) !== settings.password) {
                ui.showAlert("⛔ 비밀번호가 올바르지 않습니다.");
                document.getElementById('takeoverPwInput').value = "";
                document.getElementById('takeoverPwInput').focus();
                return;
            }
        }

        // 인증 성공 → 옵저버로 입장 (제어권은 가져오지 않음)
        state.isObserver = true; 
        sessionStorage.setItem('kac_observer_room', newRoom);
        
        document.getElementById('takeoverModal').style.display = 'none';
        this.forceEnterRoom(newRoom);
        ui.showAlert(`👁️ Room #${newRoom} 옵저버 모드로 입장했습니다.`);
    },










    cancelTakeover: function() {
        document.getElementById('takeoverModal').style.display = 'none';
        const overlay = document.getElementById('statusOverlay');
        if (overlay) overlay.style.display = 'none'; // 블러 레이어 즉시 제거
        state.pendingRoom = null;
        state.room = null;
        ui.showWaitingRoom(); // 무조건 현황판 초기화면으로 복귀
    },


















// last_owned_rooms: 내가 비번치고 들어간 방 목록 관리
getOwnedRooms: function() {
    try { return JSON.parse(localStorage.getItem('kac_owned_rooms') || '[]'); } catch(e) { return []; }
},
addOwnedRoom: function(room) {
    const r = (room || '').toString().toUpperCase();   // [수정] isMyOwnedRoom 과 동일하게 대문자 정규화
    if (!r) return;
    const rooms = this.getOwnedRooms();
    if (!rooms.includes(r)) rooms.push(r);
    localStorage.setItem('kac_owned_rooms', JSON.stringify(rooms));
},
isMyOwnedRoom: function(room) {
    return this.getOwnedRooms().includes((room || '').toString().toUpperCase());
},
clearOwnedRooms: function() {
    localStorage.removeItem('kac_owned_rooms');
    localStorage.removeItem('last_owned_room');
},

// [수정] 진입 시 잠금을 기본값으로 설정하고 권한에 따라 해제하는 버전
forceEnterRoom: async function(room) {
    const cleanRoom = room.toUpperCase();

    const overlay = document.getElementById('statusOverlay');
    // 항상 잠금 상태로 시작 - status 리스너에서 소유권 확인 후 해제
    if (overlay) overlay.style.display = 'flex';
    // 방 전환 즉시 대시보드 초기화 (이전 방 데이터 잔류 방지)
    ui.clearDashboard();
    // PDF 상태는 _roomCache가 강의실별로 독립 관리하므로 별도 리셋 불필요

    if (window.dbRef) {
        Object.values(window.dbRef).forEach(ref => {
            if (ref && typeof ref.off === 'function') ref.off();
        });
    }

    // 대시보드 리스너도 함께 정리 (방 전환 시 이전 방 데이터 잔류 방지)
    if (window.dashRefs) {
        Object.values(window.dashRefs).forEach(ref => {
            if (ref && typeof ref.off === 'function') ref.off();
        });
        window.dashRefs = null;
    }

    firebase.database().ref(`courses/${cleanRoom}/questions`).off();
    firebase.database().ref(`courses/${cleanRoom}/status`).off();
    firebase.database().ref(`courses/${cleanRoom}/settings`).off();
    firebase.database().ref(`courses/${cleanRoom}/boardNotice`).off(); // 안내 보드 리스너도 분리 (방 전환 시 잔류 방지)

    if (lectureMonitor && lectureMonitor.currentRoom && lectureMonitor.currentRoom !== cleanRoom) {
        lectureMonitor.stopMic(false);
    }

    state.room = cleanRoom;
    state.qaData = {};
    state.activeQaKey = null;

    // [복귀확인 팝업] 과정 입장 즉시 점검 (07:00~08:59 + 어제 미복귀 대기자 있을 때만 노출)
    setTimeout(() => { try { outingReturnCheck.maybeShow(); } catch (e) {} }, 1200);
    state._ownedSessionRoom = null; // [핸드오버] 방 전환 시 소유 추적 초기화
    localStorage.setItem('kac_last_room', cleanRoom); 
    state.isObserver = (sessionStorage.getItem('kac_observer_room') === cleanRoom);

    const qaListEl = document.getElementById('qaList');
    if (qaListEl) qaListEl.innerHTML = "<div style='text-align:center; padding:20px; color:#94a3b8;'>실시간 엔진 연결 중...</div>";

    const rPath = `courses/${cleanRoom}`;
    window.dbRef = {
        settings: firebase.database().ref(`${rPath}/settings`),
        qa: firebase.database().ref(`${rPath}/questions`),
        quiz: firebase.database().ref(`${rPath}/activeQuiz`),
        ans: firebase.database().ref(`${rPath}/quizAnswers`),
        status: firebase.database().ref(`${rPath}/status`)
    };
    dbRef = window.dbRef; 

    ui.updateHeaderRoom(cleanRoom);
    ui.updateObserverButton();

    dbRef.qa.on('value', snap => { 
        if (state.room !== cleanRoom) return; 
        try {
            const rawData = snap.val() || {};
            state.qaData = rawData; 
            ui.renderQaList(); 
            if (document.getElementById('view-dashboard').style.display !== 'none') {
                ui.updateQaCountBadge(); 
            }
        } catch (e) {
            console.error("Q&A 실시간 엔진 오류:", e);
        }
    });

    dbRef.settings.on('value', s => {
        if (state.room !== cleanRoom) return;
        const _sv = s.val() || {};
        ui.renderSettings(_sv);
        ui.applyQuickTabs(_sv);   // [퀵 탭] 과정별 3·4번 버튼 적용
        if (ui.applyRemoteMenu) ui.applyRemoteMenu(_sv);   // [육각 리모컨] 과정별 메뉴 적용
        // [교육장소 실시간] 검색카드/과정현황에서 강의실을 바꾸면 입교안내 '교육장소' 오버레이도 즉시 반영
        try {
            if (typeof guideMgr !== 'undefined' && guideMgr._slot) {
                const _sl = guideMgr._slot();
                if (_sl) { _sl.venuePick = _sv.venuePick || {}; _sl.roomDetailName = _sv.roomDetailName || ''; }
                const _ov = document.getElementById('guideVenueOverlay');
                if (_ov && _ov.style.display !== 'none' && ui.renderVenueOverlay) ui.renderVenueOverlay();
            }
        } catch (e) {}
    });

    dbRef.status.on('value', s => {
        if (state.room !== cleanRoom) return;
        const statusData = s.val() || {};
        ui.renderRoomStatus(statusData.roomStatus || 'idle'); 

        const isOwner = (statusData.ownerSessionId === state.sessionId);
        const isActive = (statusData.roomStatus === 'active');
        const ownerLastSeen = Number(statusData.ownerLastSeen || 0);
        // [오탐 방지] 생존신호(20초마다 갱신)가 60초 이상 끊긴 주인은 자리를 떠난 것으로 보고 빈 방 취급
        const OWNER_STALE_MS = 60000;
        const ownerIsStale = !ownerLastSeen || (Date.now() - ownerLastSeen > OWNER_STALE_MS);
        const hasOtherOwnerRecord = !!statusData.ownerSessionId && statusData.ownerSessionId !== state.sessionId && !ownerIsStale;

        // [강의 모니터링] 이 기기가 소유자 + 강의중일 때만 마이크 송출(live)
        try { lectureMonitor.syncStatus(cleanRoom, statusData, isOwner, isActive); } catch (e) { /* 무시 */ }

        // [세션 핸드오버] 내가 직전까지 이 방의 강사(소유자)였는데, 다른 기기가 제어권을 가져가
        //  ownerSessionId 가 '다른 값'으로 바뀐 순간을 감지 → 자동으로 옵저버 모드로 전환 + 알림.
        if (!state.isObserver
            && state._ownedSessionRoom === cleanRoom        // 직전 스냅샷에서 내가 소유자였음
            && isActive
            && hasOtherOwnerRecord                          // 다른 강사 소유 기록이 있음
            && statusData.ownerSessionId !== state.sessionId) {
            state._ownedSessionRoom = null;
            state.isObserver = true;
            sessionStorage.setItem('kac_observer_room', cleanRoom);
            if (overlay) overlay.style.display = 'none';
            const tm0 = document.getElementById('takeoverModal');
            if (tm0) tm0.style.display = 'none';
            ui.updateObserverButton();
            ui.updateHeaderRoom(cleanRoom);   // 상단바 '보기 전용' 배지 즉시 반영
            ui.showAlert("다른 기기에서 강사 권한을 획득하였습니다.\n현재 기기는 옵저버 모드로 전환됩니다.");
            // 옵저버 상태로 화면 권한만 갱신 (데이터 리스너는 유지)
            const sb0 = document.getElementById('btnSetupModal');
            if (sb0) {
                sb0.style.setProperty('background', '#64748b', 'important');
                sb0.style.setProperty('opacity', '0.6', 'important');
                sb0.innerHTML = '<i class="fa-solid fa-eye"></i> 옵저버 모드 (보기 전용)';
                sb0.style.pointerEvents = 'none';
                sb0.disabled = true;
            }
            return;
        }
        // 내가 현재 소유자이면 '소유 중이던 방'으로 기록 (핸드오버 감지 기준점)
        if (isOwner) {
            state._ownedSessionRoom = cleanRoom;
            if (!ownerLastSeen || (Date.now() - ownerLastSeen > 20000)) {
                firebase.database().ref(`courses/${cleanRoom}/status/ownerLastSeen`).set(firebase.database.ServerValue.TIMESTAMP);
            }
        }

        // [중요] 권한 검증 로직 및 모달 트리거
        // 내가 직접 비번치고 들어갔던 방 목록에 있으면 wasMyRoom=true
        const wasMyRoom = dataMgr.isMyOwnedRoom(cleanRoom);

        if (!state.isObserver) {
            // 상황에 맞는 overlay 메시지 설정
            const overlayMsg = document.getElementById('statusOverlayMsg');
            
            if (isOwner) {
                // ① 내가 DB상 현재 주인 → 즉시 입장 + 소유 목록 추가
                dataMgr.addOwnedRoom(cleanRoom);
                overlay.style.display = 'none';
                const tm = document.getElementById('takeoverModal');
                if (tm) tm.style.display = 'none';

            } else if (!isActive) {
                // ② 미개설 빈 방 → overlay 유지, 과정현황 완전히 차단
                overlay.style.display = 'flex';
                if (overlayMsg) overlayMsg.innerHTML = '미개설 강의실입니다.<br><br>좌측 <b>👆 교육과정 환경 설정 (통합)</b> 버튼을<br>눌러 과정을 개설해주세요.';
                const sb = document.getElementById('btnSetupModal');
                if (sb) {
                    sb.classList.add('btn-pulse');
                    setTimeout(() => sb.classList.remove('btn-pulse'), 10000);
                }

            } else if (isActive && wasMyRoom) {
                // ③ 내가 비번치고 들어갔던 방 (세션 만료 후 재진입)
                // → ownerSessionId 갱신 후 입장
                firebase.database().ref(`courses/${cleanRoom}/status`).update({ ownerSessionId: state.sessionId, ownerLastSeen: firebase.database.ServerValue.TIMESTAMP });
                dataMgr.addOwnedRoom(cleanRoom);
                overlay.style.display = 'none';
                const tm = document.getElementById('takeoverModal');
                if (tm) tm.style.display = 'none';

            } else if (isActive && !isOwner && (!statusData.ownerSessionId || ownerIsStale)) {
                // ④-a 주인이 아직 없거나(자동배치 등) 생존신호가 끊긴 빈 방 → 입장하는 강사가 소유권 획득
                firebase.database().ref(`courses/${cleanRoom}/status`).update({ ownerSessionId: state.sessionId, ownerLastSeen: firebase.database.ServerValue.TIMESTAMP });
                dataMgr.addOwnedRoom(cleanRoom);
                overlay.style.display = 'none';
                const tm = document.getElementById('takeoverModal');
                if (tm) tm.style.display = 'none';

            } else if (isActive && !isOwner && hasOtherOwnerRecord) {
                // ④-b 실제 다른 강사가 소유 중인 방 → 입장 방식 선택(강사/옵저버) 먼저
                overlay.style.display = 'flex';
                if (overlayMsg) overlayMsg.innerHTML = '현재 다른 기기에서 강의가 진행 중입니다.<br><br>입장 방식을 선택하세요.';
                state.pendingRoom = cleanRoom;
                const rcl = document.getElementById('roleChoiceRoomLabel');
                if (rcl) rcl.innerText = `Room #${cleanRoom}`;
                const roleMsg = document.getElementById('roleChoiceStatusText');
                if (roleMsg) roleMsg.innerText = '이 강의실은 현재 다른 기기에서 강사가 운영 중입니다.';
                document.getElementById('roleChoiceModal').style.display = 'flex';
            }
        } else {
            // 옵저버 모드
            overlay.style.display = 'none';
        }

        // 설정 버튼 상태 제어
        const setupBtn = document.getElementById('btnSetupModal');
        if (setupBtn) {
            if (isActive && !isOwner && !state.isObserver && hasOtherOwnerRecord) {
                setupBtn.style.setProperty('background', '#64748b', 'important');
                setupBtn.style.setProperty('opacity', '0.6', 'important');
                setupBtn.innerHTML = '<i class="fa-solid fa-lock"></i> 과정 잠김 (인증 필요)';
                setupBtn.style.pointerEvents = 'none';
                setupBtn.disabled = true;
            } else if (!state.room) {
                // 통합 현황판(홈) → 교수님 프로필 수정(노란색). 인라인 배경 제거 후 CSS(btn-prof-mode)에 위임
                setupBtn.style.setProperty('background', '', '');
                setupBtn.style.setProperty('opacity', '1', '');
                setupBtn.classList.add('btn-prof-mode');
                setupBtn.innerHTML = '<i class="fa-solid fa-user-pen"></i> 교수님 프로필 수정';
                setupBtn.title = '교수님별 프로필(사진·연락처·약력 등)을 수정합니다';
                setupBtn.style.pointerEvents = 'auto';
                setupBtn.disabled = false;
            } else {
                setupBtn.classList.remove('btn-prof-mode');
                setupBtn.style.setProperty('background', 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', 'important');
                setupBtn.style.setProperty('opacity', '1', 'important');
                setupBtn.innerHTML = '<i class="fa-solid fa-gears"></i> 교육과정 환경 설정 (통합)';
                setupBtn.style.pointerEvents = 'auto';
                setupBtn.disabled = false;
            }
        }
    });

    this.fetchCodeAndRenderQr(cleanRoom);
    // [추가] 입장 시 학생 입장 QR 자동 표시 (처음 오는 분도 바로 보이게)
    setTimeout(() => { try { ui.showMiniQR(); } catch(e) {} }, 500);

    // 퀴즈 mode 자동복구는 강사가 직접 퀴즈 탭에서 나갈 때만 처리 (forceEnterRoom에서 제거)

    // [수정] 방 입장 시엔 항상 과정 대시보드로 — lastMode가 전역 보드(현황판/홈/발표)면 dashboard로 강제
    //  (연간계획·현황판·홈을 쓴 뒤 방에 들어가면 상단 과정명/뒤로가기가 사라지던 문제 방지)
    let lastMode = localStorage.getItem('kac_last_mode') || 'dashboard';
    if (lastMode === 'waiting' || lastMode === 'home' || lastMode === 'prof-presentation' || !lastMode) lastMode = 'dashboard';
    if (ui._pendingEnterMode) { lastMode = ui._pendingEnterMode; ui._pendingEnterMode = null; }  // [홈 검색] 진입 시 지정한 메뉴(입교안내 등)로 바로 이동
    ui.setMode(lastMode);
    subjectMgr.init();
    guideMgr.init();
    // [홈 검색] 입교안내 진입 시 PDF 전체화면 직행 (클릭 후 5초 내 = 사용자 제스처 유효)
    if (lastMode === 'guide' && ui._pendingGuideFullscreen) {
        ui._pendingGuideFullscreen = false;
        setTimeout(function(){
            try { if (guideMgr && guideMgr.toggleFullScreen) guideMgr.toggleFullScreen(); } catch(e){}
            // 전체화면이 실제로 켜졌으면, 끄는 순간(ESC 등) 통합 현황판(홈)으로 복귀
            setTimeout(function(){
                if (document.fullscreenElement || document.webkitFullscreenElement) {
                    var backHome = function(){
                        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                            document.removeEventListener('fullscreenchange', backHome);
                            document.removeEventListener('webkitfullscreenchange', backHome);
                            // 시간표 사진/QR을 보던 중 크롬 전체화면 종료 UI를 잘못 눌러도
                            // 현황판으로 이동하지 않고 시간표 레이어만 닫은 뒤 입교안내에 남는다.
                            if (document.getElementById('guideScheduleModal') || document.getElementById('guideScheduleUploadModal')) {
                                try { if(ui.closeScheduleGuide) ui.closeScheduleGuide(); } catch(e){}
                                return;
                            }
                            setTimeout(function(){ try { ui.goHomePortal(); } catch(e){} }, 120);
                        }
                    };
                    document.addEventListener('fullscreenchange', backHome);
                    document.addEventListener('webkitfullscreenchange', backHome);
                }
            }, 500);
        }, 800);
    }

    // ── 공지 실시간 리스너 ──
    // 항상 재등록 (off → on), state.noticeSeen으로 중복 팝업만 방지
    // ── 공지 실시간 리스너 (대시보드 피드 + 팝업 통합 처리) ──
    // 방 이동 시 현재 공지값을 먼저 로드해 noticeSeen에 저장 (이후 변경분만 팝업)
    const coordKey = `coord_${cleanRoom}`;
    firebase.database().ref(`courses/${cleanRoom}/coordNotice`).once('value', initSnap => {
        // 현재 시점의 공지값을 "기준값"으로 저장
        if (!(coordKey in state.noticeSeen)) {
            state.noticeSeen[coordKey] = initSnap.val() || '';
        }

        firebase.database().ref(`courses/${cleanRoom}/coordNotice`).off();
        firebase.database().ref(`courses/${cleanRoom}/coordNotice`).on('value', snap => {
            if (state.room !== cleanRoom) return;
            const newMsg = snap.val() || '';
            // 대시보드 피드 즉시 업데이트 (항상) — <br>/줄바꿈 실제 렌더
            const el = document.getElementById('dashNoticeAdmin');
            if (el) {
                if (newMsg) { el.innerHTML = ui._noticeToHtml ? ui._noticeToHtml(newMsg) : String(newMsg); }
                else { el.innerText = '등록된 운영부 공지가 없습니다.'; }
            }
            // 팝업 처리
            if (!newMsg) return;
            const prev = state.noticeSeen[coordKey];
            state.noticeSeen[coordKey] = newMsg;
            if (prev === undefined) return;
            if (newMsg !== prev && state.currentMode !== 'notice') {
                guideMgr.showCoordNoticeAlert(newMsg, '📋 운영부 과정 공지');
            }
        });
    });

    // [입교안내 공지] 영구(system/globalNotice) + 이번주(system/weeklyNotice{html,weekKey}) 통합 처리.
    //  기존엔 globalNotice만 들어서, 운영부가 '이번 주 과정만'으로 올린 공지가 강사에게 안 뜨던 문제 수정.
    const _noticeMondayStr = function(){ var x=new Date(); var dow=(x.getDay()+6)%7; x.setDate(x.getDate()-dow); var z=function(n){return String(n).padStart(2,'0');}; return x.getFullYear()+'-'+z(x.getMonth()+1)+'-'+z(x.getDate()); };
    const _weeklyMsgOf = function(v){
        if (v && typeof v === 'object') { return (!v.weekKey || v.weekKey === _noticeMondayStr()) ? String(v.html || '') : ''; }   // 이번 주 유효분만
        return (typeof v === 'string') ? v : '';
    };
    const _renderEffGlobal = function(){
        if (state.room !== cleanRoom) return;
        // 이번주 공지가 있으면 우선, 없으면 영구 공지
        const eff = (state._noticeWeeklyVal && String(state._noticeWeeklyVal).trim()) ? state._noticeWeeklyVal : (state._noticeGlobalVal || '');
        const el = document.getElementById('dashNoticeGlobal');
        if (el) {
            if (eff) { el.innerHTML = ui._noticeToHtml ? ui._noticeToHtml(eff) : String(eff); }
            else { el.innerText = '현재 게시된 센터 전체 공지가 없습니다.'; }
        }
        // [입교안내 센터공지 페이지] 슬롯 갱신(+ 그 페이지 보고 있으면 재렌더)
        try {
            var _gslot = (typeof guideMgr !== 'undefined' && guideMgr._slot) ? guideMgr._slot() : null;
            if (_gslot) {
                _gslot.centerNotice = String(eff || '').trim();
                if (state.currentMode === 'guide' && _gslot.pdfDoc && guideMgr._isCenterNoticePage && guideMgr._isCenterNoticePage(_gslot.pageNum)) {
                    guideMgr.renderPage(_gslot.pageNum);
                }
            }
        } catch (e) {}
        // 팝업 (변경분만)
        const prev = state.noticeSeen['effglobal'];
        state.noticeSeen['effglobal'] = eff;
        if (prev === undefined) return;
        if (eff && eff !== prev && state.currentMode !== 'notice') {
            guideMgr.showCoordNoticeAlert(eff, '📢 입교안내 공지');
        }
    };
    // 진입 시 현재값 먼저 로드해 기준값 저장(이후 변경분만 팝업) → 실시간 리스너 등록
    Promise.all([
        firebase.database().ref('system/globalNotice').once('value'),
        firebase.database().ref('system/weeklyNotice').once('value')
    ]).then(function(res){
        if (state.room !== cleanRoom) return;
        state._noticeGlobalVal = res[0].val() || '';
        state._noticeWeeklyVal = _weeklyMsgOf(res[1].val());
        const eff0 = (state._noticeWeeklyVal && String(state._noticeWeeklyVal).trim()) ? state._noticeWeeklyVal : (state._noticeGlobalVal || '');
        if (!('effglobal' in state.noticeSeen)) state.noticeSeen['effglobal'] = eff0;   // 진입 기준값(팝업 억제)
        _renderEffGlobal();
        firebase.database().ref('system/globalNotice').off();
        firebase.database().ref('system/globalNotice').on('value', function(snap){
            if (state.room !== cleanRoom) return;
            state._noticeGlobalVal = snap.val() || '';
            _renderEffGlobal();
        });
        firebase.database().ref('system/weeklyNotice').off();
        firebase.database().ref('system/weeklyNotice').on('value', function(snap){
            if (state.room !== cleanRoom) return;
            state._noticeWeeklyVal = _weeklyMsgOf(snap.val());
            _renderEffGlobal();
        });
    }).catch(function(){});

    // [연동] 교육운영부(admin_coord)가 설정한 청렴교육/노조교육 강의장 → 대시보드 피드에 한 줄로 표시
    firebase.database().ref('system/eduLocations').off();
    firebase.database().ref('system/eduLocations').on('value', snap => {
        const ed = snap.val() || {};
        const txt = v => { v = String(v == null ? '' : v).trim(); return v || '미정'; };
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = txt(val); };
        set('feedEduIntegrity', ed.integrity);
        set('feedEduUnion', ed.union);
    });

    ui.autoResetShuttleIfNeeded(cleanRoom);

    if (window.adminQaRefreshInterval) clearInterval(window.adminQaRefreshInterval);
    window.adminQaRefreshInterval = setInterval(() => {
        if (state.room === cleanRoom) ui.renderQaList(); 
    }, 60000); 

    ui.initRoomSelect(); 
},


























fetchCodeAndRenderQr: function(room) {
    if (!room) return;
    
    // 1. 현재 접속한 주소에서 파일명(admin.html)만 떼어내고 기본 경로(Base URL) 잡기
    const path = window.location.pathname;
    const directory = path.substring(0, path.lastIndexOf('/'));  // ← 인자 순서 수정 (0, lastIndexOf)
    const baseUrl = window.location.origin + directory + "/"; // 끝에 / 를 강제로 붙임

    firebase.database().ref('public_codes').orderByValue().equalTo(room).once('value', s => {
        const d = s.val();
        let finalUrl = "";
        
        if (d) {
            // 단축 코드가 있는 경우
            const shortCode = Object.keys(d)[0];
            finalUrl = `${baseUrl}index.html?code=${shortCode}`;
        } else {
            // 단축 코드가 없는 경우 (기본 방식)
            finalUrl = `${baseUrl}index.html?room=${room}`;
        }
        
        ui.renderQr(finalUrl);
    });
},





 saveSettings: function() {
        if (!state.room) {
            ui.showAlert("⚠️ 강의실을 먼저 선택해 주세요.");
            return;
        }

        const rawPw = document.getElementById('roomPw').value;
        const newName = document.getElementById('courseNameInput').value;
        const statusVal = document.getElementById('roomStatusSelect').value;
        const selectedProf = document.getElementById('profSelect').value;
        const encryptedPw = rawPw ? btoa(rawPw) : null;

        // 설정을 저장하면서 내 세션ID를 다시 한 번 서버에 등록
        const updates = {};
        updates[`courses/${state.room}/settings/courseName`] = newName;
        updates[`courses/${state.room}/settings/password`] = encryptedPw;
        updates[`courses/${state.room}/status/roomStatus`] = statusVal;
        updates[`courses/${state.room}/status/professorName`] = (statusVal === 'active' ? selectedProf : "");
        updates[`courses/${state.room}/status/professorManual`] = (statusVal === 'active' ? true : null);   // 설정에서 교수 지정 시 보존
        // 사용중으로 저장할 때만 세션ID 등록
        updates[`courses/${state.room}/status/ownerSessionId`] = (statusVal === 'active' ? state.sessionId : null);
        updates[`courses/${state.room}/status/ownerLastSeen`] = (statusVal === 'active' ? firebase.database.ServerValue.TIMESTAMP : null);

        firebase.database().ref().update(updates).then(() => {
            localStorage.setItem('last_owned_room', state.room);
            ui.showAlert("✅ 설정이 저장되었습니다.");
        });

        document.getElementById('displayCourseTitle').innerText = newName;
    },





// All Idle - 마스터키 확인 후 실행
allIdleWithMasterKey: function() {
    const MASTER_KEY = "13281";
    const input = prompt("🔐 All Idle 실행을 위해 마스터키를 입력하세요:");
    if (!input) return;
    if (input !== MASTER_KEY) {
        ui.showAlert("❌ 마스터키가 올바르지 않습니다.");
        return;
    }
    this.deactivateAllRooms();
},

deactivateAllRooms: async function() {
        if(state.isObserver) return ui.showAlert("👁️ 옵저버는 시스템 설정을 변경할 수 없습니다.");
        if(!confirm("⚠️ 경고: 모든 강의실을 비활성화하시겠습니까?")) return;
        const updates = {};
        for(let i=65; i<=90; i++) {
            const char = String.fromCharCode(i);
            updates[`courses/${char}/status/roomStatus`] = 'idle';
            updates[`courses/${char}/status/ownerSessionId`] = null;
        }
        await firebase.database().ref().update(updates);
        ui.showAlert("모든 강의실이 비활성화되었습니다.");
        if(state.room) this.forceEnterRoom(state.room);
    },
    







// 현황판 잠금 토글 - 자동배치 시 해당 방 제외 ([수정] 강의실 비밀번호 확인 후에만 동작)
    toggleRoomLock: async function(room, currentLocked) {
        if (state.isObserver) return ui.showAlert("👁️ 옵저버 모드에서는 설정을 변경할 수 없습니다.");

        // [보안] 누구나 임의로 잠금 상태를 바꾸지 못하도록, 해당 강의실의 4자리 비밀번호를 확인한 뒤에만 허용
        const settingSnap = await firebase.database().ref(`courses/${room}/settings`).get();
        const settings = settingSnap.val() || {};
        // [비번 옵션화] 비번이 설정된 방만 확인. 없으면 바로 토글.
        if (settings.password) {
            const input = await showPasswordPrompt(`🔐 Room #${room}의 잠금 상태를 변경하려면\n강의실 비밀번호를 입력하세요.`);
            if (input === null) return;                       // 취소 시 아무 동작 안 함
            if (btoa(input.trim()) !== settings.password) {
                return ui.showAlert("❌ 비밀번호가 일치하지 않습니다.");
            }
        }

        const nextLocked = !currentLocked;
        await firebase.database().ref(`courses/${room}/settings/autoAssignLocked`).set(nextLocked || null);
        ui.showAlert(nextLocked
            ? `🔒 Room #${room} 잠금 설정\n연간계획 자동배치 시 이 방은 건드리지 않습니다.`
            : `🔓 Room #${room} 잠금 해제\n연간계획 자동배치 시 이 방도 배치 대상이 됩니다.`
        );
    },

    updateQa: function(action) {
    const activeRoom = state.room;
    if (state.isObserver) return ui.showAlert("👁️ 옵저버 모드에서는 질문을 관리할 수 없습니다.");
    if (!state.activeQaKey || !activeRoom) {
        ui.showAlert("⚠️ 대상을 찾을 수 없습니다.");
        return;
    }

    const targetRef = firebase.database().ref(`courses/${activeRoom}/questions/${state.activeQaKey}`);

    if (action === 'delete') { 
        if (confirm("이 질문을 완전히 삭제하시겠습니까?")) { 
            targetRef.remove()
            .then(() => {
                ui.closeQaModal();
                // [실시간 보정] 삭제 즉시 로컬 데이터에서 제거하고 화면 갱신
                if (state.qaData) delete state.qaData[state.activeQaKey];
                ui.renderQaList();
            })
            .catch(err => ui.showAlert("삭제 실패: " + err.message));
        }
    } else {
        const currentItem = state.qaData[state.activeQaKey] || {};
        const currentStatus = currentItem.status || 'normal';
        let nextStatus = action;

        if (currentStatus === action) nextStatus = 'normal';
        else if (action === 'done' && currentStatus === 'pin') nextStatus = 'pin-done';
        
        targetRef.update({ status: nextStatus })
        .then(() => {
            ui.closeQaModal();
            // [실시간 보정] 서버 응답을 기다리지 않고 로컬 데이터를 즉시 수정 후 화면 갱신
            if (state.qaData && state.qaData[state.activeQaKey]) {
                state.qaData[state.activeQaKey].status = nextStatus;
                ui.renderQaList(); 
            }
        })
        .catch(err => ui.showAlert("상태 변경 실패: " + err.message));
    }
},
















// [수정] 리셋 실행 전 항상 비밀번호 확인 (소유자도 예외 없이)
resetCourse: function() {
    if (!state.room) {
        ui.showAlert("⚠️ 초기화할 강의실을 먼저 선택해야 합니다.");
        return;
    }
    ui.openResetAuthModal();
},

// [분리] 인증 완료 후 실제 초기화 실행 (ui.confirmResetAuth 에서 호출)
_executeReset: function() {
    if (!state.room) return;
    const rPath = `courses/${state.room}`;
    const newResetKey = "reset_" + Date.now();

    // 소유권 자동 복구: 초기화 직전 이 세션을 소유자로 등록해 쓰기 권한 충돌 예방
    dataMgr.addOwnedRoom(state.room);
    localStorage.setItem('last_owned_room', state.room);

    // [중요] 수동 리셋한 과정은 이번 '대상 주' 자동배치에서 제외(되살아나지 않도록).
    //  현재 방에 들어있던 과정명+기간을 system/dismissedCourses/{weekKey} 에 기록한다.
    const _curName   = (document.getElementById('setup-course-name')?.value || '').trim();
    let _dismissPromise = Promise.resolve();
    try {
        const _rmRoom = state.room;
        _dismissPromise = firebase.database().ref(`${rPath}/settings`).once('value').then(s => {
            const st = s.val() || {};
            const nm = (st.courseName || '').trim();
            const pd = (st.period || '').trim();
            const upd = {};
            const _weekKeys = [];
            // [리셋 정합성/J9] 지원부 생활관 명단(주차__방)은 '이 방의 과정명과 일치할 때만' 제거
            //  — 같은 방·주차 슬롯의 "다른 과정" 명단을 리셋이 오삭제하던 사고 방지 (복구버튼 의존 제거)
            const _rosterKeyCands = [];
            try {
                const start = pd.includes(' ~ ') ? pd.split(' ~ ')[0].trim() : (pd.split('~')[0] || '').trim();
                if (start) {
                    const d = new Date(start + 'T00:00:00');
                    if (!isNaN(d)) {
                        const dow = (d.getDay() + 6) % 7;
                        const mon = new Date(d); mon.setDate(d.getDate() - dow);
                        const utc = mon.toISOString().slice(0, 10);
                        const local = mon.getFullYear() + '-' + String(mon.getMonth()+1).padStart(2,'0') + '-' + String(mon.getDate()).padStart(2,'0');
                        [local, utc].forEach(wk => { _weekKeys.push(wk); _rosterKeyCands.push(`system/dorm/rosters/${wk}__${_rmRoom}`); });
                    }
                }
            } catch(e) {}
            if (nm) {
                let weekKey = '';
                try { weekKey = annualPlanMgr._getTargetMonday(annualPlanMgr._today()); } catch(e) {}
                const key = `${nm}|${pd}`.replace(/[.#$/\[\]]/g, '_');
                upd[`system/dismissedCourses/${weekKey}/${key}`] = { name: nm, period: pd, at: Date.now() };
            }
            // [고스트 방지] 같은 주차의 생활관 '배정(assignments)'에서 이 과정(courseName) 배정도 함께 제거.
            //  (명단 rosters만 지우고 배정은 남아, 같은 방/주차에 새 과정 개설 시 옛 배정이 끌려오던 문제)
            const _nnm = String(nm||'').replace(/\s+/g,'').trim();
            const _assignReads = (_nnm && _weekKeys.length)
              ? _weekKeys.map(function(wk){
                  return firebase.database().ref('system/dorm/assignments/'+wk+'/students').once('value').then(function(as){
                    var students = as.val() || {};
                    Object.keys(students).forEach(function(k){
                      var stu = students[k];
                      if (stu && String(stu.course||'').replace(/\s+/g,'').trim() === _nnm) {
                        upd['system/dorm/assignments/'+wk+'/students/'+k] = null;   // 이 과정 배정만 제거(다른 과정은 보존)
                      }
                    });
                  }).catch(function(){});
                })
              : [];
            // [J9] 명단 노드를 실제로 읽어 courseName이 이 방 과정명과 일치할 때만 삭제 목록에 추가
            const _rosterReads = _rosterKeyCands.map(function(p){
                return firebase.database().ref(p).once('value').then(function(rs){
                    const rv = rs.val(); if (!rv) return;
                    const rn = String(rv.courseName || '').replace(/\s+/g, '').trim();
                    if (rn && _nnm && rn === _nnm) upd[p] = null;
                    else console.warn('[리셋/J9] 지원부 명단 보존(과정명 불일치):', p, '(명단 과정:', rv.courseName, ')');
                }).catch(function(){});
            });
            return Promise.all(_assignReads.concat(_rosterReads)).then(function(){
                if (Object.keys(upd).length) return firebase.database().ref().update(upd);
            });
        });
    } catch(e) {}

    const freshRoom = {
        settings: {
            courseName: "", roomDetailName: "", period: null,
            coordinatorName: null, subjects: null, password: null
        },
        status: {
            professorName: "", roomStatus: "idle",
            ownerSessionId: null, resetKey: newResetKey,
            mode: 'qa', quizStep: 'none'
        },
        boardNotice: "", notice: "", coordNotice: ""
    };

    const _boardEditor = document.getElementById('boardEditor');
    if (_boardEditor) _boardEditor.innerHTML = "";

    // 보안 규칙 호환: 루트 set() 대신 하위 노드별 multi-path update
    const resetUpdates = {
        [`${rPath}/settings`]: freshRoom.settings,
        [`${rPath}/status`]:   freshRoom.status,
        [`${rPath}/boardNotice`]:        "",
        [`${rPath}/notice`]:             "",
        [`${rPath}/coordNotice`]:        "",
        [`${rPath}/coordNoticeHistory`]: null,
        [`${rPath}/students`]:            null,
        [`${rPath}/internal_attendance`]: null,
        [`${rPath}/questions`]:           null,
        [`${rPath}/admin_actions`]:       null,
        [`${rPath}/shuttle`]:             null,
        [`${rPath}/dinner_skips`]:        null,
        [`${rPath}/tablet_loans`]:        null,
        [`${rPath}/connections`]:         null,
        [`${rPath}/quizAnswers`]:         null,
        [`${rPath}/expectedStudents`]:    null,
        [`${rPath}/coordRoster`]:         null,
        [`${rPath}/activeQuiz`]:          null,
        [`${rPath}/quizFinalResults`]:    null,
        [`${rPath}/quizBank`]:            null,
        [`${rPath}/attendanceQR`]:        null,
        [`${rPath}/activeSurvey`]:        null,   // [리셋] 즉석 설문조사 진행중 데이터
        [`${rPath}/surveyAnswers`]:       null,   // [리셋] 설문 응답
        [`${rPath}/lastSurveyResult`]:    null,   // [리셋] 직전 설문 결과
        [`${rPath}/scheduleImage`]:       null,   // [리셋] 교육 시간표 사진
        [`${rPath}/gradPhoto`]:           null,   // [J13 리셋] 수료 기념사진
        [`${rPath}/venuePick`]:           null    // [리셋] (settings 밖 잔여 대비) — 실제 venuePick은 settings 초기화로 함께 정리됨
    };

    firebase.database().ref(rPath).once('value').then(function(_cs){ var _c=_cs.val()||{}; var _aa=_c.admin_actions||{}, _ia=_c.internal_attendance||{}, _stu=_c.students||{}; if(!Object.keys(_aa).length && !Object.keys(_ia).length && !Object.keys(_stu).length) return null; var _st=_c.settings||{}, _stt=_c.status||{}; return firebase.database().ref('system/course_archive/'+state.room+'_'+Date.now()).set({ room: state.room, courseName:_st.courseName||'', period:_st.period||'', prof:_stt.professorName||'', coord:_st.coordinatorName||'', admin_actions:_aa, internal_attendance:_ia, students:_stu, expectedStudents:(_c.expectedStudents||null), archivedAt: firebase.database.ServerValue.TIMESTAMP }); }).catch(function(){}).then(() => firebase.database().ref().update(resetUpdates)).then(() => {
        return _dismissPromise;
    }).then(() => {
        ui.showAlert(`✅ Room #${state.room}이 성공적으로 초기화되었습니다.`);
        setTimeout(() => location.reload(), 800);
    }).catch(err => {
        ui.showAlert("초기화 실패: " + err.message);
    });
},

    // [추가] 출결 QR 보기
    openAttendanceQr: async function() {
        if(!state.room) return ui.showAlert("강의실을 선택하세요.");
        const snap = await firebase.database().ref(`courses/${state.room}/attendanceQR`).once('value');
        const img = document.getElementById('attendanceQrImg');
        const msg = document.getElementById('noAttendanceQrMsg');
        if(snap.exists()) {
            img.src = snap.val(); img.style.display = 'block'; msg.style.display = 'none';
        } else {
            img.style.display = 'none'; msg.style.display = 'block';
        }
        document.getElementById('attendanceQrModal').style.display = 'flex';
    },

// [최종 수정] 학생장 지정 및 해제 (옵저버 차단 포함)
toggleLeader: function(token, currentName) {
        if(state.isObserver) return ui.showAlert("👁️ 옵저버는 권한을 수정할 수 없습니다.");
        if(!state.room) return;

        firebase.database().ref(`courses/${state.room}/students/${token}`).once('value', snap => {
            const student = snap.val();
            if(!student) return;

            if(!student.isLeader) {
                // 학생장 지정 — 연락처는 선택사항(비워도 됨)
                const phone = prompt(`[${currentName}] 교육생을 학생장으로 지정합니다.\n비상 연락망(선택) — 없으면 비워두고 확인하세요.\n나중에 다시 눌러 입력할 수 있습니다.`, (student.leaderPhone||""));
                if(phone===null) return; // 취소
                const up = { isLeader: true };
                if(phone.trim()) up.leaderPhone = phone.trim();
                firebase.database().ref(`courses/${state.room}/students/${token}`).update(up);
                ui.showAlert(`👑 [${currentName}] 교육생이 학생장으로 지정되었습니다.` + (phone.trim() ? "" : "\n(연락처는 나중에 다시 눌러 입력할 수 있어요)"));
            } else {
                // 이미 학생장 — 연락처 입력/수정 또는 해제('X' 입력)
                const phone = prompt(`[${currentName}] 학생장 연락처를 입력/수정하세요.(선택)\n\n· 학생장을 해제하려면 X 를 입력하고 확인`, (student.leaderPhone||""));
                if(phone===null) return; // 취소
                if(phone.trim().toUpperCase()==='X'){
                    firebase.database().ref(`courses/${state.room}/students/${token}`).update({ isLeader: false, leaderPhone: null });
                    ui.showAlert(`[${currentName}] 학생장 권한이 해제되었습니다.`);
                } else {
                    firebase.database().ref(`courses/${state.room}/students/${token}`).update({ leaderPhone: phone.trim() || null });
                    ui.showAlert(`📞 [${currentName}] 학생장 연락처가 저장되었습니다.`);
                }
            }
        });
    },



// [최종 수정] 수강생 삭제 (개편된 차량신청/출석부 포함 완벽삭제 + 옵저버 차단)
    deleteStudent: function(token) {
        // 1. 옵저버 권한 체크
        if(state.isObserver) {
            ui.showAlert("👁️ 옵저버 모드에서는 수강생 정보를 삭제할 수 없습니다.");
            return;
        }

        if(!state.room) return;
        
        firebase.database().ref(`courses/${state.room}/students/${token}`).once('value', snap => {
            const targetStudent = snap.val();
            if(!targetStudent) return;
            const targetName = targetStudent.name;
            const targetPhone = (targetStudent.phone || "0000").trim();
            const attendanceKey = `${targetName.trim()}_${targetPhone}`; // 출석부용 고유 키

            if(confirm(`🚨 [${targetName}] 수강생의 모든 정보(출석부, 차량신청, 행정내역)를 삭제하시겠습니까?`)) {
                const today = getTodayString();
                const updates = {};
                const rPath = `courses/${state.room}`;
                
                // [A] 기본 정보 및 금일 신청 내역 삭제
                updates[`${rPath}/students/${token}`] = null;
                updates[`${rPath}/dinner_skips/${today}/${token}`] = null;
                updates[`${rPath}/admin_actions/${today}/${token}`] = null;
                updates[`${rPath}/shuttle/requests/${token}`] = null; // 개편된 차량 신청 내역

                // [B] 자체 출석부 (모든 날짜 기록) 전수 조사 및 삭제
                firebase.database().ref(`${rPath}/internal_attendance`).once('value', attendSnap => {
                    const allAttendData = attendSnap.val() || {};
                    Object.keys(allAttendData).forEach(date => {
                        if(allAttendData[date][attendanceKey]) {
                            updates[`${rPath}/internal_attendance/${date}/${attendanceKey}`] = null;
                        }
                    });

                    // [C] 서버에 최종 명령 전송
                    firebase.database().ref().update(updates).then(() => {
                        ui.showAlert(`✅ [${targetName}]님의 모든 데이터가 정상적으로 삭제되었습니다.`);
                    }).catch(e => {
                        ui.showAlert("삭제 실패: " + e.message);
                    });
                });
            }
        });
    },

    // [오버랩 정리] 같은 이름이 2번 이상 중복 등록(일자 변경 등)된 경우 1개만 남기고 정리
    resolveOverlap: function(encName) {
        if (state.isObserver) { ui.showAlert("👁️ 옵저버 모드에서는 정리할 수 없습니다."); return; }
        if (!state.room) return;
        const name = decodeURIComponent(encName);
        const room = state.room;
        firebase.database().ref(`courses/${room}/students`).once('value').then(snap => {
            const data = snap.val() || {};
            const tokens = Object.keys(data).filter(k => data[k] && data[k].name === name);
            if (tokens.length <= 1) { ui.showAlert(`[${name}] 은(는) 중복이 없습니다. (1명)`); return; }
            // 가장 먼저 입장한 항목 1개만 유지, 나머지 삭제
            tokens.sort((a, b) => (Number(data[a].firstSeen || data[a].joinedAt || data[a].arrivedAt || 0)) - (Number(data[b].firstSeen || data[b].joinedAt || data[b].arrivedAt || 0)));
            const removeTokens = tokens.slice(1);
            if (!confirm(`⚠️ [${name}] 이(가) ${tokens.length}번 중복 등록되어 있습니다.\n(같은 사람이 일자 변경 등으로 여러 번 저장된 상태)\n\n가장 먼저 입교한 1건만 남기고 나머지 ${removeTokens.length}건을 정리할까요?`)) return;
            const updates = {};
            removeTokens.forEach(t => { updates[`courses/${room}/students/${t}`] = null; });
            // 중복 토큰의 자체 출석부 기록도 함께 정리
            firebase.database().ref(`courses/${room}/internal_attendance`).once('value').then(aSnap => {
                const att = aSnap.val() || {};
                Object.keys(att).forEach(dateKey => {
                    removeTokens.forEach(t => { if (att[dateKey] && att[dateKey][t] !== undefined) updates[`courses/${room}/internal_attendance/${dateKey}/${t}`] = null; });
                });
                firebase.database().ref().update(updates)
                    .then(() => ui.showAlert(`✅ [${name}] 중복 ${removeTokens.length}건을 정리했습니다. (1명 유지)`))
                    .catch(e => ui.showAlert("정리 실패: " + (e && e.message || '')));
            });
        });
    },


    // [7.0차 신규] 수강생 예정 명단 업로드 로직 (텍스트 파일 읽기)
    uploadStudentNames: function(input) {
        const file = input.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            // 한 줄에 한 명씩 이름을 분리하여 배열로 저장
            const names = e.target.result.split(/\r?\n/)
                .map(n => n.trim())
                .filter(n => n.length > 0);
            
            if(names.length === 0) {
                ui.showAlert("⚠️ 파일에 유효한 이름이 없습니다.");
                return;
            }

            firebase.database().ref(`courses/${state.room}/expectedStudents`).set(names)
                .then(() => {
                    ui.showAlert(`✅ ${names.length}명의 예정 명단이 등록되었습니다.`);
                    input.value = ""; // 입력창 초기화
                });
        };
        reader.readAsText(file);
    },

    // [7.0차 신규] 등록된 예정 명단 초기화 (운영부·지원부 공유 명단까지 함께 비움)
    clearExpectedList: function() {
        const room = state.room;
        if(!room) { ui.showAlert("강의실을 먼저 선택해주세요."); return; }
        if(!confirm("이 과정의 업로드 명단을 모두 비우시겠습니까?\n\n· 강사 업로드(.txt) 명단\n· 운영부 공유 명단\n· 지원부 생활관 명단\n(실제 입실한 학생 기록은 지워지지 않습니다.)")) return;
        const updates = {
            [`courses/${room}/expectedStudents`]: null,
            [`courses/${room}/coordRoster`]: null
        };
        // [J9] 지원부 생활관 명단: 이 방(__room) 키 중 '현재 과정명과 일치'하는 것만 제거
        //  (같은 방 슬롯에 올라온 다음 주/다른 과정 명단 오삭제 방지)
        const _nmField = String((document.getElementById('setup-course-name') || {}).value || '').replace(/\s+/g, '').trim();
        Promise.all([
            firebase.database().ref('system/dorm/rosters').once('value'),
            firebase.database().ref(`courses/${room}/settings/courseName`).once('value')
        ]).then(function(res){
            const all = res[0].val() || {};
            const nm = (String(res[1].val() || '').replace(/\s+/g, '').trim()) || _nmField;
            Object.keys(all).forEach(function(k){
                if (!k.endsWith('__' + room)) return;
                const rn = String((all[k] || {}).courseName || '').replace(/\s+/g, '').trim();
                if (nm && rn && rn === nm) updates['system/dorm/rosters/' + k] = null;
                else console.warn('[명단비우기/J9] 지원부 명단 보존(과정명 불일치):', k);
            });
            return firebase.database().ref().update(updates);
        }).then(function(){
            ui.showAlert("✅ 명단이 모두 비워졌습니다.");
            if (window.ui && ui.loadStudentList) ui.loadStudentList();
        }).catch(function(){
            // system/dorm/rosters 읽기 실패 시에도 운영부·예정 명단은 비움
            firebase.database().ref().update(updates).then(function(){
                ui.showAlert("✅ 명단이 비워졌습니다.");
                if (window.ui && ui.loadStudentList) ui.loadStudentList();
            }).catch(function(){ ui.showAlert("명단 비우기 중 오류가 발생했습니다."); });
        });
    },

    // [신규] 업로드(예정) 명단에서 개별 이름 삭제
    deleteExpectedName: function(rawName) {
        if(state.isObserver) { ui.showAlert("👁️ 옵저버 모드에서는 삭제할 수 없습니다."); return; }
        if(!state.room) return;
        let name = rawName; try { name = decodeURIComponent(rawName); } catch(e){}
        if(!confirm(`[${name}] 님을 예정 명단에서 삭제하시겠습니까?`)) return;
        const ref = firebase.database().ref(`courses/${state.room}/expectedStudents`);
        ref.once('value', snap => {
            let arr = snap.val();
            if(Array.isArray(arr)) arr = arr.filter(n => String(n).trim() !== String(name).trim());
            else if(arr && typeof arr === 'object') arr = Object.values(arr).filter(n => String(n).trim() !== String(name).trim());
            else arr = [];
            ref.set(arr.length ? arr : null).then(() => ui.showAlert("✅ 예정 명단에서 삭제되었습니다."));
        });
    },

    downloadStudentSample: function() {
        const content = "홍길동\n김철수\n이영희\n박사임";
        const blob = new Blob([content], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "student_sample_list.txt";
        a.click();
        URL.revokeObjectURL(a.href);
    }



}; // <--- dataMgr 객체 진짜 마감

// --- [수정된 profMgr] 교수님 명단 관리 ---
const profMgr = {
    list: [],
    
    init: function() {
        // 교수님 명단 실시간 동기화
        firebase.database().ref('system/professors').on('value', snap => {
            const data = snap.val() || {};
            this.list = Object.keys(data).map(k => ({ key: k, name: data[k] }));
            this.renderSelect();
            if (document.getElementById('profManageModal')?.style.display === 'flex') {
                this.renderManageList();
            }
        });
    },

    renderSelect: function() {
        const sel = document.getElementById('profSelect');
        if(!sel) return;
        const currentVal = sel.value; 
        sel.innerHTML = '<option value="">(선택 안함)</option>';
        this.list.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.name;
            opt.innerText = p.name + " 교수";
            if (p.name === currentVal) opt.selected = true;
            sel.appendChild(opt);
        });
    },
    
    openManageModal: function() {
        this.renderManageList();
        const modal = document.getElementById('profManageModal');
        if(modal) {
            modal.style.display = 'flex';
            const input = document.getElementById('newProfInput');
            if(input) input.focus();
        }
    },
    
    renderManageList: function() {
        const div = document.getElementById('profListContainer');
        if(!div) return;
        div.innerHTML = "";
        if (this.list.length === 0) {
            div.innerHTML = "<div style='padding:20px; text-align:center; color:#94a3b8;'>등록된 교수님이 없습니다.</div>";
            return;
        }
        this.list.forEach(p => {
            const item = document.createElement('div');
            item.className = 'prof-item';
            // 수정된 부분: 이름 옆에 [프로필 등록] 버튼 추가
            item.innerHTML = `
                <div class="prof-name-wrap">
                    <span class="prof-name">${p.name}</span>
                </div>
                <div class="prof-item-btns">
                    <button class="prof-btn-edit" onclick="profMgr.openProfileEditor('${p.name}')">프로필</button>
                    <button class="prof-btn-del" onclick="profMgr.deleteProf('${p.key}')">삭제</button>
                </div>`;
            div.appendChild(item);
        });
        div.scrollTop = div.scrollHeight;
    },
    
    addProf: function() {
        const input = document.getElementById('newProfInput');
        const name = input.value.trim();
        if (!name) { 
            alert("교수님 성함을 입력해주세요."); 
            return; 
        }
        firebase.database().ref('system/professors').push(name).then(() => {
            input.value = ""; 
            input.focus();
        }).catch(err => { 
            alert("저장 실패: " + err.message); 
        });
    },
    
    deleteProf: function(key) {
        if(confirm("정말 삭제하시겠습니까?")) {
            firebase.database().ref(`system/professors/${key}`).remove();
        }
    },


// [리포트 반영] 프로필 편집 창 열 때 영문 성함 포함 기존 데이터 호출
    openProfileEditor: function(name) {
        document.getElementById('pp-name').value = name;
        document.getElementById('pp-phone').value = "";
        document.getElementById('pp-email').value = "";
        document.getElementById('pp-msg').value = "";
        document.getElementById('pp-kakao').value = "";
        document.getElementById('pp-photo-file').value = "";
        if(document.getElementById('pp-bio-rows')) profMgr.renderBioRows([]);
        const previewImg = document.getElementById('pp-photo-preview').querySelector('img');
        if(previewImg) {
            previewImg.removeAttribute('src');
            previewImg.style.display = 'none';
        }

        firebase.database().ref(`system/professorProfiles/${name}`).once('value', snap => {
            const p = snap.val();
            const kakaoEl = document.getElementById('pp-kakao');
            if(p) {
                document.getElementById('pp-phone').value = p.phone || "";
                document.getElementById('pp-email').value = p.email || "";
                if (kakaoEl) kakaoEl.value = p.kakaoLink || "";
                document.getElementById('pp-msg').value = p.msg || "";
                profMgr.renderBioRows(Array.isArray(p.bioList) ? p.bioList : profMgr._parseBio(p.bio || ""));
                if(p.photo && previewImg) {
                    previewImg.src = p.photo;
                    previewImg.style.display = 'block';
                }
            } else if (kakaoEl) {
                kakaoEl.value = "";
            }
        });
        profMgr.bindPhotoPreview();
        document.getElementById('profProfileModal').style.display = 'flex';
    },


// [추가] 사진 용량 최적화 (가로 500px 기준 압축)
    resizeImage: function(file, callback) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                const max_size = 500; // 최대 가로 크기 500px

                if (width > max_size) {
                    height *= max_size / width;
                    width = max_size;
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(img, 0, 0, width, height);
                callback(canvas.toDataURL('image/jpeg', 0.7)); // 70% 품질로 압축
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    },

// [리포트 반영] 상세 프로필 저장 (영문 성함 데이터 포함)
    saveFullProfile: function() {
        const name = document.getElementById('pp-name').value;
        const fileInput = document.getElementById('pp-photo-file');
        
        const doSave = (photoData) => {
            const profileData = {
                photo: photoData || "",
                phone: document.getElementById('pp-phone').value,
                email: document.getElementById('pp-email').value,
                kakaoLink: (document.getElementById('pp-kakao')?.value || '').trim(),
                msg: document.getElementById('pp-msg').value,
                bio: profMgr.collectBioRows().map(r => (r.year ? r.year + " " : "") + r.text).join("\n"),
                bioList: profMgr.collectBioRows()
            };
            firebase.database().ref(`system/professorProfiles/${name}`).set(profileData).then(() => {
                ui.showAlert("✅ 담임 교수 프로필이 성공적으로 저장되었습니다.", () => ui.closeProfProfileModal());
            });
        };

        if (fileInput.files.length > 0) {
            this.resizeImage(fileInput.files[0], (optimizedData) => doSave(optimizedData));
        } else {
            firebase.database().ref(`system/professorProfiles/${name}/photo`).once('value', s => doSave(s.val()));
        }
    } // <--- 함수의 끝
}; // <--- 중요!! profMgr라는 큰 바구니를 여기서 완전히 닫습니다. (콤마 없음)

// [약력 입력] 연도/경력사항 분리 행 관리
profMgr.addBioRow = function(year, text){
    const wrap = document.getElementById('pp-bio-rows'); if(!wrap) return;
    const esc = s => String(s==null?'':s).replace(/"/g,'&quot;');
    const row = document.createElement('div');
    row.className = 'bio-row';
    row.innerHTML = '<input class="bio-year-in" placeholder="연도" aria-label="연도" value="'+esc(year)+'">'
        + '<input class="bio-text-in" placeholder="경력사항을 입력하세요" aria-label="경력사항" value="'+esc(text)+'">'
        + '<button type="button" title="이 줄 삭제" aria-label="이 줄 삭제" onclick="this.closest(\'.bio-row\').remove()"><i class="fa-solid fa-xmark"></i></button>';
    wrap.appendChild(row);
};
profMgr.bindPhotoPreview = function(){
    const fileInput = document.getElementById('pp-photo-file');
    const previewImg = document.querySelector('#pp-photo-preview img');
    if(!fileInput || !previewImg || fileInput.dataset.previewBound === '1') return;
    fileInput.dataset.previewBound = '1';
    fileInput.addEventListener('change', function(){
        const file = this.files && this.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = function(e){
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });
};
profMgr.renderBioRows = function(list){
    const wrap = document.getElementById('pp-bio-rows'); if(!wrap) return;
    wrap.innerHTML = '';
    const arr = Array.isArray(list) ? list : [];
    if(!arr.length){ this.addBioRow('',''); return; }
    arr.forEach(it => this.addBioRow((it&&it.year)||'', (it&&it.text)||''));
};
profMgr.collectBioRows = function(){
    const wrap = document.getElementById('pp-bio-rows'); if(!wrap) return [];
    return Array.from(wrap.querySelectorAll('.bio-row')).map(r => ({
        year: (r.querySelector('.bio-year-in') ? r.querySelector('.bio-year-in').value : '').trim(),
        text: (r.querySelector('.bio-text-in') ? r.querySelector('.bio-text-in').value : '').trim()
    })).filter(o => o.year || o.text);
};
profMgr._parseBio = function(bioStr){

    return String(bioStr||'').split('\n').map(l=>l.trim()).filter(Boolean).map(t=>{
        t = t.replace(/^[•\-•]\s*/,'');
        const m = t.match(/^([`'\d~\-\s]*?)\s*([^`'\d~\-\s].*)$/);
        if(m && m[1] && /\d/.test(m[1])) return { year: m[1].replace(/`/g,"'").replace(/\s+/g,' ').trim(), text: m[2].trim() };
        return { year:'', text:t };
    });
};




















// [최종 최적화] 직급순 정렬 및 실시간 UI 동기화 과정 운영 담당자 관리 객체
const coordMgr = {
    list: [],
    tempSign: "",
    editingKey: null,
    
    // 1. 직급별 우선순위
    rankPriority: {
        "부장": 1,
        "차장": 2,
        "과장": 3,
        "대리": 4,
        "주임": 5,
        "사원": 6
    },

    // 합본 문자열에서 성함/직책 분리 (레거시 마이그레이션용)
    splitNameTitle: function(raw) {
        raw = String(raw == null ? '' : raw).trim();
        const RANK = /\s*(부장|차장|과장|대리|주임|사원|팀장|실장|원장)\s*$/;
        const m = raw.match(RANK);
        if (m) return { name: raw.replace(RANK, '').trim(), title: m[1] };
        return { name: raw, title: "" };
    },

    // 성함 + 직책 합본 (드롭다운 값 / coordinatorName 호환 유지)
    fullName: function(c) { return ((c.name || '') + ' ' + (c.title || '')).trim(); },

    // 직책 기준 우선순위 (객체/문자열 모두 허용)
    getPriority: function(c) {
        const t = (typeof c === 'string') ? c : (c && (c.title || c.name) || '');
        if (!t) return 99;
        for (const rank in coordMgr.rankPriority) {
            if (t.includes(rank)) return coordMgr.rankPriority[rank];
        }
        return 99;
    },

    // [신규] 입력 문자열(엑셀 연간계획값 / Firebase 저장값)을 등록된 담당자 명단의 '정식 이름'과 매칭.
    //  - 공백 차이("장영근  과장"), 붙여쓰기("장영근과장"), 직급 표기 유무("장영근" vs "장영근 과장") 흡수
    //  - 일치 항목이 없으면 null 반환 (동명이인 오매칭 방지를 위해 단일 후보일 때만 채택)
    matchName: function(raw) {
        const list = coordMgr.list || [];
        if (!raw || !list.length) return null;

        const squash = s => (s || '').replace(/\s+/g, '');          // 공백 완전 제거
        const ranks  = Object.keys(coordMgr.rankPriority);          // 차장/과장/대리/주임/사원
        const stripRank = s => {                                    // 직급 제거 후 공백 제거 → 순수 이름
            let t = (s || '');
            ranks.forEach(r => { t = t.split(r).join(''); });
            return squash(t);
        };

        const rawSquash = squash(raw);
        const rawName   = stripRank(raw);

        // 1) 공백 무시 완전 일치 (가장 안전)
        let m = list.find(c => squash(c.name) === rawSquash);
        if (m) return coordMgr.fullName(m);

        // 2) 한쪽이 다른 쪽을 포함 (직급 표기 유무 차이 등)
        m = list.find(c => {
            const cs = squash(c.name);
            return cs.includes(rawSquash) || rawSquash.includes(cs);
        });
        if (m) return coordMgr.fullName(m);

        // 3) 직급을 떼어낸 순수 이름이 '유일하게' 일치하는 경우만 채택 (예: 엑셀 "장영근 차장" vs 명단 "장영근 과장")
        if (rawName) {
            const cands = list.filter(c => stripRank(c.name) === rawName);
            if (cands.length === 1) return coordMgr.fullName(cands[0]);
        }

        return null;
    },

    // 초기화 및 실시간 리스너 설정
    init: function() {
        console.log("운영담당자 리스너 가동...");
        const ref = firebase.database().ref('system/coordinators');
        
        ref.on('value', s => {
            const data = s.val() || {};

            // [마이그레이션] title 없는 레거시 항목은 name에서 직책 분리 후 저장 (교육운영부 양식과 동일 구조)
            const mig = {};
            Object.keys(data).forEach(k => {
                const c = data[k] || {};
                if (c.title === undefined || c.title === null) {
                    const p = coordMgr.splitNameTitle(c.name || '');
                    data[k] = Object.assign({}, c, { name: p.name, title: p.title });
                    mig[k] = { name: p.name, title: p.title };
                }
            });
            if (Object.keys(mig).length) { Object.entries(mig).forEach(([k, v]) => ref.child(k).update(v)); }

            // 데이터를 배열로 변환 (성함/직책 분리 구조)
            let items = Object.keys(data).map(k => ({
                key: k,
                name: data[k].name || "이름 없음",
                title: data[k].title || "",
                sign: data[k].sign || ""
            }));

            // 직급순 정렬 (1순위: 직책 점수, 2순위: 이름 가나다)
            items.sort((a, b) => {
                const pA = coordMgr.getPriority(a);
                const pB = coordMgr.getPriority(b);
                if (pA !== pB) return pA - pB;
                return (a.name || '').localeCompare(b.name || '', 'ko');
            });

            coordMgr.list = items;
            coordMgr.renderSelects();
            coordMgr.renderManageList();
        });
    },

    // 설정창 내 드롭다운(Select) 렌더링
    renderSelects: function() {
        const sel = document.getElementById('setup-coord-select'); 
        if (!sel) return;
        
        const curValue = sel.value; // 현재 선택 값 보관
        sel.innerHTML = '<option value="">--- 담당자 선택 ---</option>';
        
        coordMgr.list.forEach(c => {
            const fn = coordMgr.fullName(c);
            const opt = document.createElement('option');
            opt.value = fn;
            opt.textContent = fn;
            sel.appendChild(opt);
        });

        // 리스트 갱신 후 선택값 복구
        if (curValue) sel.value = curValue;
    },

    // 관리 모달 내 리스트 렌더링
    renderManageList: function() {
        const div = document.getElementById('coordListContainer'); 
        if (!div) return;
        
        if (coordMgr.list.length === 0) {
            div.innerHTML = "<div style='text-align:center; padding:30px; color:#94a3b8;'>등록된 담당자가 없습니다.</div>";
            return;
        }

        div.innerHTML = coordMgr.list.map(c => `
            <div style="display:flex; justify-content:space-between; padding:12px; border-bottom:1px solid #f1f5f9; align-items:center; background:#fff; margin-bottom:5px; border-radius:10px; cursor:pointer; transition:0.2s; border:${coordMgr.editingKey === c.key ? '2px solid #3b82f6' : '1px solid #eee'}" 
                 onclick="coordMgr.startEdit('${c.key}')">
                <div style="display:flex; align-items:center; gap:10px; flex:1;">
                    ${c.title ? `<span style="font-size:11px; font-weight:800; color:#2563eb; background:#eff6ff; border:1px solid #bfdbfe; padding:2px 9px; border-radius:999px; flex-shrink:0;">${c.title}</span>` : ''}
                    <span style="font-weight:800; color:#1e293b;">${c.name}</span>
                    ${c.sign ? `<img src="${c.sign}" style="height:35px; mix-blend-mode:multiply; border:1px solid #f8fafc; border-radius:4px;">` : `<span style="font-size:11px; color:#cbd5e1;">(서명 미등록)</span>`}
                </div>
                <i class="fa-solid fa-circle-xmark" style="color:#ff4d4f; cursor:pointer; font-size:22px; padding:5px;" 
                   onclick="event.stopPropagation(); coordMgr.delete('${c.key}')"></i>
            </div>`).join('');
    },

    // 수정 모드 시작
    startEdit: function(key) {
        const item = coordMgr.list.find(c => c.key === key);
        if (!item) return;

        coordMgr.editingKey = key;
        document.getElementById('newCoordInput').value = item.name;
        const _ts = document.getElementById('newCoordTitle'); if (_ts) _ts.value = item.title || '';

        const regBtn = document.getElementById('coordRegBtn');
        if (regBtn) {
            regBtn.innerHTML = '<i class="fa-solid fa-check"></i> 수정 완료';
            regBtn.style.background = "#10b981";
        }

        const previewImg = document.getElementById('tempSignPreview');
        if (item.sign) {
            coordMgr.tempSign = item.sign;
            if (previewImg) previewImg.src = item.sign;
            document.getElementById('signPreviewArea').style.display = 'block';
        } else {
            coordMgr.tempSign = "";
            if (previewImg) previewImg.src = "";
            document.getElementById('signPreviewArea').style.display = 'none';
        }
        coordMgr.renderManageList();
        document.getElementById('newCoordInput').focus();
    },

    // 필드 초기화 (보강됨)
    resetFields: function() {
        coordMgr.editingKey = null; 
        coordMgr.tempSign = "";
        const input = document.getElementById('newCoordInput');
        if(input) input.value = "";
        const _ts = document.getElementById('newCoordTitle');
        if(_ts) _ts.value = "";

        const regBtn = document.getElementById('coordRegBtn');
        if (regBtn) {
            regBtn.innerHTML = '등록';
            regBtn.style.background = "#3b82f6"; 
        }
        
        // 미리보기 이미지까지 완벽 초기화
        const previewImg = document.getElementById('tempSignPreview');
        if (previewImg) previewImg.src = "";
        document.getElementById('signPreviewArea').style.display = 'none';
        
        const fileInput = document.getElementById('coordSignFile');
        if (fileInput) fileInput.value = "";
        
        coordMgr.renderManageList();
    },

    handleFile: function(input) {
        const file = input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            coordMgr.tempSign = e.target.result;
            const previewImg = document.getElementById('tempSignPreview');
            if (previewImg) previewImg.src = e.target.result;
            document.getElementById('signPreviewArea').style.display = 'block';
        };
        reader.readAsDataURL(file);
    },

    add: async function() {
        const name = document.getElementById('newCoordInput').value.trim();
        const _ts = document.getElementById('newCoordTitle');
        const title = _ts ? _ts.value : "";
        if (!name) return ui.showAlert("성함을 입력하세요.");
        if (!title) return ui.showAlert("직책을 선택하세요.");

        try {
            const data = { name: name, title: title, sign: coordMgr.tempSign };
            const db = firebase.database();
            if (coordMgr.editingKey) {
                await db.ref(`system/coordinators/${coordMgr.editingKey}`).update(data);
            } else {
                await db.ref('system/coordinators').push(data);
            }
            coordMgr.resetFields();
        } catch (e) {
            console.error("Save Error:", e);
            alert("저장 실패");
        }
    },

    delete: async function(k) {
        if (!confirm("해당 담당자를 삭제하시겠습니까?")) return;
        try {
            await firebase.database().ref(`system/coordinators/${k}`).remove();
            if (coordMgr.editingKey === k) coordMgr.resetFields();
        } catch (e) {
            alert("삭제 실패");
        }
    },

    openManage: function() {
        coordMgr.resetFields();
        document.getElementById('coordManageModal').style.display = 'flex';
    }
};




























// --- [신규] 과목(세션) 관리 로직 ---
const subjectMgr = {
    list: [],
    selectedFilter: 'all', 
    
init: function() {
    if (!state.room) return;
    const subjectRef = firebase.database().ref(`courses/${state.room}/settings/subjects`);
    subjectRef.off(); // 이전 방 안테나 제거
    subjectRef.on('value', s => {
        const data = s.val() || {};
        this.list = Object.keys(data).map(k => ({ key: k, name: data[k] }));
        this.renderList();
        this.renderFilters(); 
        if (typeof this.renderListInModal === 'function') {
            this.renderListInModal();
        }
    });
},

// 이름 뒤에 '강사' 직함 붙이기 (이미 직함 있으면 중복 방지)
    _withTitle: function(name) {
        var n = (name || '').trim();
        if (!n) return n;
        // 이미 직함/호칭으로 끝나면 그대로 (부장 강사·강사 강사 중복 방지)
        var titles = ['강사','교수','교수님','부장','과장','차장','대리','주임','사원','원장','팀장','실장','센터장','교관','선생님','선생','님'];
        for (var i = 0; i < titles.length; i++) { if (n.endsWith(titles[i])) return n; }
        return n + ' 강사';
    },

// [리포트 반영] 과목 필터 바 렌더링 (공통질문 필터 추가)
    renderFilters: function() {
        const bar = document.getElementById('subjectFilterBar');
        if(!bar) return;
        
        let html = `<div class="filter-chip ${this.selectedFilter === 'all' ? 'active' : ''}" onclick="subjectMgr.setFilter('all')">전체</div>`;
        
        // 공통질문 전용 필터 칩 추가
        html += `<div class="filter-chip ${this.selectedFilter === '공통질문' ? 'active' : ''}" onclick="subjectMgr.setFilter('공통질문')">공통질문</div>`;
        
        this.list.forEach(item => {
            html += `<div class="filter-chip subject-chip ${this.selectedFilter === item.name ? 'active' : ''}" onclick="subjectMgr.setFilter('${item.name}')"><span>${subjectMgr._withTitle(item.name)}</span><i class="fa-solid fa-xmark chip-del" title="삭제" onclick="event.stopPropagation();subjectMgr.deleteSubject('${item.key}')"></i></div>`;
        });
        bar.innerHTML = html;
    },

    setFilter: function(subName) {
        this.selectedFilter = subName;
        this.renderFilters();
        ui.renderQaList('all'); 
    },
    
    renderList: function() {
        const container = document.getElementById('subjectListContainer');
        if(!container) return;
        container.innerHTML = "";
        
        if(this.list.length === 0) {
            container.innerHTML = '<div style="color: #64748b; font-size: 11px; text-align: center; padding: 10px;">등록된 과목이 없습니다.</div>';
            return;
        }

        this.list.forEach(item => {
            container.innerHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 8px; background: #1e293b; margin-bottom: 3px; border-radius: 4px; font-size: 12px; color: white;">
                    <span>${item.name}</span>
                    <i class="fa-solid fa-xmark" onclick="subjectMgr.deleteSubject('${item.key}')" style="cursor: pointer; color: #ef4444;"></i>
                </div>
            `;
        });
    },
    
    addSubject: function() {
        const input = document.getElementById('newSubjectInput');
        if (!input) return; // [J2] 구버전 잔재 — 요소 없는 화면에서 오류 방지
        const name = input.value.trim();
        if(!name) return;
        
        firebase.database().ref(`courses/${state.room}/settings/subjects`).push(name).then(() => {
            input.value = "";
            input.focus();
        });
    },
    
    deleteSubject: function(key) {
        if(confirm("이 과목을 삭제하시겠습니까?")) {
            firebase.database().ref(`courses/${state.room}/settings/subjects/${key}`).remove();
        }
    },

    // [Q&A 화면 즉석 추가] 출강 강사·과목을 이 화면에서도 바로 등록
    toggleQaAdd: function() {
        const row = document.getElementById('qaAddRow');
        if (!row) return;
        const show = (row.style.display === 'none' || !row.style.display);
        row.style.display = show ? 'flex' : 'none';
        if (show) {
            // 열자마자는 닫지 않는다. 커서를 놓고 입력을 기다린다.
            const i = document.getElementById('qaAddInput');
            if (i) { i.value = ''; setTimeout(function(){ try{ i.focus(); }catch(e){} }, 0); }
            this._qaAddCancelHide();
        } else {
            this._qaAddCancelHide();
        }
    },
    // [닫힘 취소] 입력란에 들어오거나 타이핑 중이면 닫지 않는다
    _qaAddCancelHide: function() {
        if (this._qaIdleT) { clearTimeout(this._qaIdleT); this._qaIdleT = null; }
    },
    // [자동 닫힘] 입력란을 벗어나면(=더 입력 안 함) 3초 뒤 닫는다. 그 사이 다시 들어오면 유지.
    _qaAddScheduleHide: function() {
        if (this._qaIdleT) clearTimeout(this._qaIdleT);
        this._qaIdleT = setTimeout(function() {
            const row = document.getElementById('qaAddRow');
            const i = document.getElementById('qaAddInput');
            if (i && document.activeElement === i) return; // 다시 포커스면 유지
            if (row) row.style.display = 'none';
        }, 3000);
    },
    // 하위호환: 예전 호출부가 남아있어도 안전하게 동작
    _qaAddResetIdle: function() { this._qaAddCancelHide(); },
    quickAddSubject: function() {
        if (!state.room) { alert('먼저 과정을 선택해 주세요.'); return; }
        const input = document.getElementById('qaAddInput');
        if (!input) return;
        const name = input.value.trim();
        if (!name) return;
        firebase.database().ref(`courses/${state.room}/settings/subjects`).push(name).then(() => {
            input.value = "";
            input.focus();
            subjectMgr._qaAddCancelHide();   // 계속 입력 가능하도록 유지, 벗어나면 3초 뒤 닫힘
        });
    }
};







// --- 3. UI ---
// ── 비밀번호 커스텀 프롬프트: 입력값을 **** 로 마스킹 ──────────────
// prompt() 대신 type="password" 입력 모달을 반환
// resolve: 입력된 문자열, 취소 시 null
function showPasswordPrompt(message) {
    return new Promise(resolve => {
        // 기존 모달 있으면 제거
        const old = document.getElementById('_pwPromptOverlay');
        if (old) old.remove();

        const overlay = document.createElement('div');
        overlay.id = '_pwPromptOverlay';
        overlay.style.cssText = `
            position:fixed; inset:0; z-index:99999;
            background:rgba(0,0,0,0.6);
            display:flex; align-items:center; justify-content:center;`;

        overlay.innerHTML = `
        <div style="background:#1e293b; border-radius:14px; padding:28px 28px 22px;
                    min-width:320px; max-width:440px; width:90%; box-shadow:0 20px 60px rgba(0,0,0,0.5);">
            <div style="font-size:14px; color:#e2e8f0; font-weight:600; margin-bottom:16px; line-height:1.5;">
                ${message.replace(/\n/g,'<br>')}
            </div>
            <input id="_pwPromptInput" type="password" maxlength="10" autocomplete="off"
                style="width:100%; box-sizing:border-box; padding:12px 14px; font-size:16px;
                       border:2px solid #3b82f6; border-radius:9px; background:#0f172a;
                       color:#f8fafc; outline:none; letter-spacing:4px;"
                placeholder="••••">
            <div style="display:flex; gap:10px; margin-top:18px; justify-content:flex-end;">
                <button id="_pwPromptCancel"
                    style="padding:10px 20px; border:none; border-radius:9px;
                           background:#334155; color:#94a3b8; font-weight:700; cursor:pointer; font-size:14px;">
                    취소
                </button>
                <button id="_pwPromptOk"
                    style="padding:10px 24px; border:none; border-radius:9px;
                           background:#3b82f6; color:#fff; font-weight:800; cursor:pointer; font-size:14px;">
                    확인
                </button>
            </div>
        </div>`;

        document.body.appendChild(overlay);

        const input = document.getElementById('_pwPromptInput');
        const ok    = document.getElementById('_pwPromptOk');
        const cancel = document.getElementById('_pwPromptCancel');

        const done = (val) => { overlay.remove(); resolve(val); };

        ok.onclick = () => done(input.value);
        cancel.onclick = () => done(null);
        overlay.onclick = (e) => { if (e.target === overlay) done(null); };
        input.onkeydown = (e) => {
            if (e.key === 'Enter') done(input.value);
            if (e.key === 'Escape') done(null);
        };
        setTimeout(() => input.focus(), 50);
    });
}

const ui = {


// [신규] 단체 회식 적용 (전원 석식 제외)
    // 단체회식 모달 열기
    openGroupDinnerModal: function() {
        if(state.isObserver) return ui.showAlert("👁️ 옵저버는 단체회식을 적용할 수 없습니다.");
        if(!state.room) return;
        // 기본값 세팅
        document.getElementById('gd-destination').value = "";
        document.getElementById('gd-phone').value = "";
        document.getElementById('gd-reason').value = "단체 회식";
        document.getElementById('gd-return-date').value = getTodayString();
        this._gdType = 'outing';
        this.selectGdType('outing');
        document.getElementById('groupDinnerModal').style.display = 'flex';
    },

    selectGdType: function(type) {
        this._gdType = type;
        const outBtn = document.getElementById('gd-btn-outing');
        const ovBtn = document.getElementById('gd-btn-overnight');
        const outTime = document.getElementById('gd-outing-time');
        const ovArea = document.getElementById('gd-overnight-area');
        if(type === 'outing') {
            outBtn.style.borderColor = '#3b82f6'; outBtn.style.background = '#eff6ff'; outBtn.style.color = '#1d4ed8';
            ovBtn.style.borderColor = '#e2e8f0'; ovBtn.style.background = '#f8fafc'; ovBtn.style.color = '#64748b';
            outTime.style.display = 'flex'; ovArea.style.display = 'none';
        } else {
            outBtn.style.borderColor = '#e2e8f0'; outBtn.style.background = '#f8fafc'; outBtn.style.color = '#64748b';
            ovBtn.style.borderColor = '#ef4444'; ovBtn.style.background = '#fff1f2'; ovBtn.style.color = '#b91c1c';
            outTime.style.display = 'none'; ovArea.style.display = 'block';
        }
    },

    closeGroupDinnerModal: function() {
        document.getElementById('groupDinnerModal').style.display = 'none';
    },

    applyGroupDinner: function() {
        if(state.isObserver) return ui.showAlert("👁️ 옵저버는 단체회식을 적용할 수 없습니다.");
        if(!state.room) return;

        const destination = document.getElementById('gd-destination')?.value.trim();
        const phone = document.getElementById('gd-phone')?.value.trim();
        const reason = document.getElementById('gd-reason')?.value.trim() || "단체 회식";
        const gdType = this._gdType || 'outing';

        if(!destination) return ui.showAlert("행선지를 입력해주세요.");
        if(!phone) return ui.showAlert("대표 연락처를 입력해주세요.");

        let startTime = '18:00', endTime = '21:00', returnDate = getTodayString();
        if(gdType === 'outing') {
            startTime = document.getElementById('gd-start')?.value || '18:00';
            endTime = document.getElementById('gd-end')?.value || '21:00';
        } else {
            startTime = '18:00'; endTime = '08:00';
            returnDate = document.getElementById('gd-return-date')?.value || getTodayString();
        }

        if(!confirm(`단체 회식을 적용하시겠습니까?\n행선지: ${destination}\n시간: ${startTime} ~ ${endTime}\n\n모든 수강생 석식 제외 + 단체외출 대장 등록`)) return;

        firebase.database().ref(`courses/${state.room}/students`).once('value', async snap => {
            const students = snap.val() || {};
            const today = getTodayString();
            const ts = firebase.database.ServerValue.TIMESTAMP;
            const updates = {};

            const validStudents = Object.keys(students)
                .filter(token => students[token]?.name)
                .map(token => ({ token, ...students[token] }));

            // 자동 서명을 위해 담당자 정보를 루프 전에 미리 조회
            const coordName = (await firebase.database().ref(`courses/${state.room}/settings/coordinatorName`).once('value')).val() || '담당자';
            const coordSnap = await firebase.database().ref('system/coordinators').orderByChild('name').equalTo(coordName).once('value');
            let autoSignImg = '';
            if (coordSnap.exists()) {
                const coordData = Object.values(coordSnap.val())[0];
                autoSignImg = coordData.sign || '';
            }

            validStudents.forEach((s, idx) => {
                const phone4 = s.phone ? s.phone : '0000';
                // 석식 제외 등록
                updates[`courses/${state.room}/dinner_skips/${today}/${s.token}`] = `${s.name}(${phone4})`;
                // 단체외출 행정 대장 등록 (자동 서명 포함)
                updates[`courses/${state.room}/admin_actions/${today}/${s.token}`] = {
                    name: s.name, dept: '', phone: phone,
                    destination: destination, startTime: startTime,
                    endTime: endTime, returnDate: returnDate,
                    reason: reason, type: 'group_outing',
                    timestamp: Date.now() + idx, returned: false,
                    confirmed: true,
                    confirmedBy: coordName,
                    confirmedBySign: autoSignImg
                };
            });

            await firebase.database().ref().update(updates);
            ui.showAlert(`✅ ${validStudents.length}명 석식 제외 및 단체외출 등록 완료\n행선지: ${destination} (${startTime}~${endTime})`);
            this.closeGroupDinnerModal();
        });
    },

    // [신규] 석식 제외 초기화
    resetDinnerSkip: function() {
        if(!confirm("오늘의 모든 석식 제외 신청 내역을 삭제하시겠습니까?")) return;
        const today = getTodayString();
        firebase.database().ref(`courses/${state.room}/dinner_skips/${today}`).set(null).then(() => {
            ui.showAlert("✅ 석식 제외 명단이 초기화되었습니다.");
        });
    },


// [5.9차 수정] "교수 [성함] ([영문])" 형식 및 데이터 주입 로직
    showProfPresentation: function(name) {
        ui._lastProfName = name;
        firebase.database().ref(`system/professorProfiles/${name}`).once('value', snap => {
            const p = snap.val();
            if(!p) return ui.showAlert("상세 프로필을 먼저 등록해주세요.");
            
            // 1. 성함 포맷팅 (교수 성함 (English Name))
            const _EN = (window.KAC_LANG==='en');
            const fullNameEl = document.getElementById('pres-display-full-name');
            if(fullNameEl) {
                if(_EN){
                    fullNameEl.innerHTML = `<span class="rank-txt">Prof.</span> ${p.engName||name}`;
                } else {
                    const engPart = p.engName ? `<span class="eng-txt">(${p.engName})</span>` : "";
                    fullNameEl.innerHTML = `<span class="rank-txt">교수</span> ${name} ${engPart}`;
                }
            }
            
            // 2. 사진 및 텍스트 주입
            const photoImg = document.getElementById('pres-photo');
            if(photoImg) photoImg.src = p.photo || "logo.png";
            
            document.getElementById('pres-phone').innerText = p.phone || "연락처 미등록";
            document.getElementById('pres-email').innerText = p.email || "이메일 미등록";
            const _msgT = _EN ? (p.engMsg||p.msg) : p.msg; document.getElementById('pres-msg').innerText = _msgT ? `"${_msgT}"` : "";
            
            // 3. 약력 리스트 (불렛 로직 포함)
            const bioArea = document.getElementById('pres-bio');
            if(bioArea) {
                const esc = x => String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
let _entries = [];
                let _bioArr=null, _bioStr=null;
                if (_EN){ if (Array.isArray(p.engBioList)&&p.engBioList.length) _bioArr=p.engBioList; else if (p.engBio) _bioStr=p.engBio; }
                if (!_bioArr && !_bioStr){ if (Array.isArray(p.bioList)&&p.bioList.length) _bioArr=p.bioList; else if (p.bio) _bioStr=p.bio; }
                if (_bioArr) {
                    _entries = _bioArr.map(it => ({ year:(it&&it.year)||'', text:(it&&it.text)||'' }));
                } else if (_bioStr) {
                    _entries = String(_bioStr).split('\n').map(l=>l.trim()).filter(Boolean).map(t=>{
                        t = t.replace(/^[•\-•]\s*/,'');
                        const m = t.match(/^([`'\d~\-\s]*?)\s*([^`'\d~\-\s].*)$/);
                        if (m && m[1] && /\d/.test(m[1])) return { year:m[1].replace(/`/g,"'").replace(/\s+/g,' ').trim(), text:m[2].trim() };
                        return { year:'', text:t };
                    });
                }
                if (_entries.length) {
                    bioArea.innerHTML = _entries.map(e => e.year
                        ? '<div class="bio-line"><span class="bio-year">'+esc(e.year)+'</span><span class="bio-text">'+esc(e.text)+'</span></div>'
                        : '<div class="bio-line"><span class="bio-text">'+esc(e.text)+'</span></div>').join('');
                } else {
                    bioArea.innerText = _EN ? "No career registered." : "등록된 약력이 없습니다.";
                }
            }
            
            ui.setMode('prof-presentation');
        });
    },
    closeProfProfileModal: function() { document.getElementById('profProfileModal').style.display = 'none'; },
    refreshProfLang: function(){ try{ if(state.currentMode==='prof-presentation' && ui._lastProfName) ui.showProfPresentation(ui._lastProfName); }catch(e){} },






loadDashboardStats: function() {
    if (!state.room) return;
    const room = state.room;
    const today = getTodayString();
    const yesterday = getYesterdayString();   // 외출/외박 09:00 윈도우용(어제 노드도 함께 읽음)

    // [핵심] 이전 방 리스너 전부 끊기 (방 전환 시 데이터 혼재 방지)
    if (window.dashRefs) {
        Object.values(window.dashRefs).forEach(ref => {
            if (ref && typeof ref.off === 'function') ref.off();
        });
    }

    // 1. 데이터베이스 안테나(참조) 설정 - window에 보관해서 다음 호출 시 정리 가능
    const refs = {
        settings: firebase.database().ref(`courses/${room}/settings`),
        notice: firebase.database().ref(`courses/${room}/notice`),
        status: firebase.database().ref(`courses/${room}/status`),
        expected: firebase.database().ref(`courses/${room}/expectedStudents`),
        actual: firebase.database().ref(`courses/${room}/students`),
        action: firebase.database().ref(`courses/${room}/admin_actions/${today}`),
        actionY: firebase.database().ref(`courses/${room}/admin_actions/${yesterday}`),
        dinner: firebase.database().ref(`courses/${room}/dinner_skips/${today}`),
        tablet: firebase.database().ref(`courses/${room}/tablet_loans`),
        attend: firebase.database().ref(`courses/${room}/internal_attendance/${today}`),
        departure: firebase.database().ref(`courses/${room}/shuttle/departure`),
        autoDep:   firebase.database().ref(`courses/${room}/shuttle/autoDeparture`),   // [J10] 지원부 시간표 기반 자동판정
        shuttleReq: firebase.database().ref(`courses/${room}/shuttle/requests`)
    };
    window.dashRefs = refs; // 전역 보관 → 다음 방 전환 시 off() 가능

    // 2. 과정 정보 및 장소 실시간 업데이트
    // [J7] 방 전환 시 ZOOM 진입 요소는 전부 기본 숨김 — 온라인 확인 시 하트비트/리스너가 표시
    window._zoomRoomOnline = false;
    try { document.querySelectorAll('[onclick*="openZoomMonitor"]').forEach(function(t){ t.style.display='none'; }); } catch(e){}
    refs.settings.on('value', snap => {
        if (state.room !== room) return;
        const s = snap.val() || {};
        // 더보기 '도움이 되는 소식(맛집)' — 항상 노출 (요청에 따라 기본 ON)
        try { var _fsSec=document.getElementById('moreFoodSection'); if(_fsSec) _fsSec.style.display = ''; } catch(e){}
        if (document.getElementById('dashCourseTitle')) document.getElementById('dashCourseTitle').innerText = s.courseName || "과정명을 설정해주세요.";
        var _topT = document.getElementById('displayCourseTitle'); if (_topT) _topT.innerText = s.courseName || "";
        if (document.getElementById('dashPeriod')) document.getElementById('dashPeriod').innerText = s.period || "기간 미설정";
        if (document.getElementById('dashRoomDetail')) document.getElementById('dashRoomDetail').innerText = s.roomDetailName || "장소 미설정";
        try { if (window.gradMgr) gradMgr.refreshHeroBtn(s.period); } catch (e) {}   // [J14] 수료일 06시부터 기념사진 버튼
        // [ZOOM 모니터링 J2] 과정 장소가 온라인(Zoom)일 때만 출결 관리 화면의 ZOOM 모니터링 버튼 노출
        try {
            var _zmOn = (/온라인|zoom/i.test(String(s.roomDetailName || '')));
            window._zoomRoomOnline = _zmOn;
            document.querySelectorAll('[onclick*="openZoomMonitor"]').forEach(function(t){ t.style.display = _zmOn ? '' : 'none'; });
        } catch(e){}
        if (document.getElementById('dashCoordName')) {
            // Firebase 저장값(표기 차이 가능)을 명단의 정식 이름으로 매칭하여 전체 이름 표시
            const savedCoord = s.coordinatorName || '';
            const canonical = coordMgr.matchName(savedCoord);
            document.getElementById('dashCoordName').innerText = canonical || (savedCoord || '미지정');
        }
    });

    // 3. 공지사항 피드 실시간 업데이트
    refs.notice.on('value', s => {
        if (state.room !== room) return;
        const el = document.getElementById('dashNoticeInst');
        if (el) el.innerText = s.val() || "작성된 담임 교수 공지가 없습니다.";
    });
    // coordNotice/globalNotice 실시간 감지는 forceEnterRoom에서 통합 처리
    // 여기서는 대시보드 텍스트 초기값만 표시
    // coordNotice/globalNotice 실시간 업데이트는 forceEnterRoom 리스너에서 처리

    // 4. 교수 성함 실시간 업데이트
    refs.status.on('value', snap => {
        if (state.room !== room) return;
        const st = snap.val() || {};
        const profOnlyEl = document.getElementById('dashProfNameOnly');
        if (profOnlyEl) profOnlyEl.innerText = st.professorName || "미지정";
    });

    // 5. ★핵심 수정★ 실시간 입교 완료 현황 집계 (온라인 여부 상관없이 전체 카운트)
    //  최신 expected 명단을 캐시해 두고, 학생 입장(actual)·명단(expected) 어느 쪽이 바뀌어도 분모를 다시 계산한다.
    let _expectedNamesCache = [];
    const recalcTotal = (actualData) => {
        const actualNames = Object.values(actualData || {})
            .map(s => s && s.name).filter(n => n && n !== "undefined");
        const combined = Array.from(new Set([..._expectedNamesCache, ...actualNames]));
        const totalEl = document.getElementById('dashTotalCount');
        if (totalEl) totalEl.innerText = combined.length;
    };

    refs.actual.on('value', snap => {
        if (state.room !== room) return;
        const data = snap.val() || {};
        
        // 온라인(isOnline) 여부와 상관없이 이름이 등록된 모든 학생 필터링
        const arrivedStudents = Object.values(data).filter(s => s.name && s.name !== "undefined");
        const arrivedCount = arrivedStudents.length;

        // (A) 대시보드 "수강생 입교 현황" 좌측 숫자 업데이트
        const dashArrivedEl = document.getElementById('dashArrivedCount');
        if (dashArrivedEl) dashArrivedEl.innerText = arrivedCount;
        const dashAttendTotalEl = document.getElementById('dashAttendTotal');
        if (dashAttendTotalEl) dashAttendTotalEl.innerText = arrivedCount;

        // (A-2) 분모(총원)도 함께 재계산 — 학생이 새로 들어와도 즉시 반영
        recalcTotal(data);
        
        // (B) 퀴즈 화면 상단 인원 숫자도 함께 업데이트
        const quizJoinCountEl = document.getElementById('currentJoinCount');
        if (quizJoinCountEl) {
            quizJoinCountEl.innerText = arrivedCount;
            
            // 대기자 수 자동 재계산 (전체 입교자 - 퀴즈 제출자)
            const answeredCount = parseInt(document.getElementById('answeredCount').innerText || 0);
            const pendingCountEl = document.getElementById('pendingCount');
            if (pendingCountEl) {
                pendingCountEl.innerText = Math.max(0, arrivedCount - answeredCount);
            }
        }
    });

    // 6. 전체 명단(분모) 계산 — expected 명단 변경 시 캐시 갱신 후 재계산
    refs.expected.on('value', async expSnap => {
        if (state.room !== room) return;
        let _names = expSnap.val() || [];
        // [분모 정합] 지원부 명단(과정명 매칭)도 합산 → 예정명단이 비어 있어도 전체 인원(분모) 정확
        try { const _rn = await ui._gatherRosterNames(room); if (_rn && _rn.length) _names = Array.from(new Set([..._names, ..._rn])); } catch(e){}
        if (state.room !== room) return;
        _expectedNamesCache = _names;
        firebase.database().ref(`courses/${room}/students`).once('value', snap => {
            recalcTotal(snap.val() || {});
        });
    });

    // [본 과정 수강생(예정)] 수강생현황과 100% 동일한 로직을 인라인으로 직접 실행 — 리스너/캐시/메서드 의존 없이 무조건 표시
    const _refreshDashRoster = async (retry) => {
        try {
            if (state.room !== room) return;
            // (수강생현황 gatherRosterNames와 동일) 과정명으로 지원부 명단 매칭
            const _cs = await firebase.database().ref('courses/' + room + '/settings/courseName').once('value');
            const _cn = String(_cs.val() || '').trim();
            const _ds = await firebase.database().ref('system/dorm/rosters').once('value');
            const _all = _ds.val() || {};
            let _best = null;
            for (const k in _all) { const dv = _all[k]; if (dv && Array.isArray(dv.list) && dv.list.length && String(dv.courseName || '').trim() === _cn) { if (!_best || (dv.updatedAt || 0) > (_best.updatedAt || 0)) _best = dv; } }
            const _rn = _best ? _best.list.map(x => x && x.name).filter(Boolean).map(n => String(n).trim()) : [];
            const _aSnap = await firebase.database().ref('courses/' + room + '/students').once('value');
            if (state.room !== room) return;
            const _actNames = Object.values(_aSnap.val() || {}).map(s => s && s.name).filter(n => n && n !== "undefined");
            const _combined = Array.from(new Set([..._rn, ..._actNames]));
            _expectedNamesCache = Array.from(new Set([..._expectedNamesCache, ..._rn]));
            const _el = document.getElementById('dashTotalCount');
            if (_el) _el.innerText = _combined.length;
            // 런타임 증거: 배지에 ·R(명단수) 표기
            try { var _b = document.getElementById('__catcVer'); if (_b) _b.textContent = _b.textContent.replace(/\u00b7R\d+/, '') + '\u00b7R' + _rn.length; } catch(e){}
            if (!_rn.length && !retry) setTimeout(() => _refreshDashRoster(true), 1200);
        } catch(e){ if (!retry) setTimeout(() => _refreshDashRoster(true), 1200); }
    };
    _refreshDashRoster(false);
    // [실시간] 지원부 명단(system/dorm/rosters)이 올라오거나 바뀌면 분모(예정) 즉시 갱신
    refs.dormRosters = firebase.database().ref('system/dorm/rosters');
    refs.dormRosters.on('value', () => { if (state.room === room) _refreshDashRoster(true); });

    // 7. 행정 신청(외출/외박) 실시간 카운트
    //  자정이 아닌 '익일 09:00'에 초기화되도록, 오늘+어제 노드를 읽어 09:00 윈도우(timestamp)로 집계
    refs._outToday = {}; refs._outYest = {};
    function _recountOutings() {
        if (state.room !== room) return;
        const w = getOutingWindowKST();
        let count = 0;
        [refs._outToday, refs._outYest].forEach(obj => {
            Object.keys(obj || {}).forEach(k => {
                const it = obj[k]; const ts = (it && it.timestamp) || 0;
                // 복귀완료(자동 포함) 인원은 차감 → 미복귀 인원만 카운팅
                if (ts >= w.start && ts < w.end && !(it && (it.returned === true || it.returnReportTime))) count++;
            });
        });
        const el = document.getElementById('dashActionCount');
        if (el) el.innerText = count;
    }
    refs.action.on('value', s => { if (state.room !== room) return; refs._outToday = s.val() || {}; _recountOutings(); });
    refs.actionY.on('value', s => { if (state.room !== room) return; refs._outYest = s.val() || {}; _recountOutings(); });
    refs.dinner.on('value', s => {
        if (state.room !== room) return;
        const count = Object.keys(s.val() || {}).length;
        if (document.getElementById('dashDinnerSkipCount')) document.getElementById('dashDinnerSkipCount').innerText = count;
    });
    refs.tablet.on('value', s => {
        if (state.room !== room) return;
        const count = Object.keys(s.val() || {}).length;
        if (document.getElementById('dashTabletLoanCount')) document.getElementById('dashTabletLoanCount').innerText = count;
    });
    refs.attend.on('value', s => {
        if (state.room !== room) return;
        const count = Object.keys(s.val() || {}).length;
        const el = document.getElementById('dashAttendCount');
        if (el) el.innerText = count;
    });






// 8. 셔틀 정보 및 차량 수요 실시간 업데이트
const _renderDashShuttleInline = () => {
    const bar = document.getElementById('dashShuttleNotice');
    if (bar) bar.style.display = "none";   // 노란 박스는 숨기고 제목 옆 시간만
    const inlineEl = document.getElementById('dashShuttleTimeInline');
    if (!inlineEl) return;
    const at = state._autoDep && state._autoDep.departTime;   // [J10] 자동판정 우선: 이 과정 출발시간 단일 표시
    const dep = state._lastDep;
    if (at) inlineEl.innerText = `(${at} 출발)`;
    else if (dep && dep.time) inlineEl.innerText = `(${dep.time2?('1차 '+dep.time+' / 2차 '+dep.time2):dep.time} 출발)`;
    else inlineEl.innerText = '';
};
refs.departure.on('value', snap => {
    if (state.room !== room) return; 
    state._lastDep = snap.val();
    _renderDashShuttleInline();
});
refs.autoDep.on('value', snap => {   // [J10] 지원부 명단 업로드 즉시 반영
    if (state.room !== room) return;
    state._autoDep = snap.val();
    _renderDashShuttleInline();
    if (ui && ui.updateShuttleETA && state._lastShuttleCounts !== undefined) { try { ui.updateShuttleETA(state._lastDepTimeForEta || (state._lastDep && state._lastDep.time) || null, state._lastShuttleCounts); } catch(e){} }
});

refs.shuttleReq.on('value', s => {
    if (state.room !== room) return;
    const data = s.val() || {};
    const items = Object.values(data);
    
    // 카운트 업데이트 (Deep Blue 숫자는 CSS에서 이미 적용됨)
    if (document.getElementById('total-osong')) document.getElementById('total-osong').innerText = items.filter(i => i.type === 'osong').length;
    if (document.getElementById('total-term')) document.getElementById('total-term').innerText = items.filter(i => i.type === 'terminal').length;
    if (document.getElementById('total-air')) document.getElementById('total-air').innerText = items.filter(i => i.type === 'airport').length;
    if (document.getElementById('total-car')) document.getElementById('total-car').innerText = items.filter(i => i.type === 'car').length;
    
    const totalEl = document.getElementById('dashShuttleTotal');
    if (totalEl) {
        totalEl.innerText = items.length + "명";
        totalEl.style.color = "#003366"; // 총원 색상도 남색으로 통일
    }
});

    // 9. 질문 카운트 업데이트
    this.updateQaCountBadge();
},









// 질문 배지만 별도로 업데이트하는 헬퍼 함수 (필요시 호출)
updateQaCountBadge: function() {
    if (state.qaData) {
        const count = Object.values(state.qaData).filter(q => q && q.status !== 'delete').length;
        const el = document.getElementById('dashQaCount');
        if (el) el.innerText = count;
    }
},






























// [완성형 디자인] 운영부 공지사항 출력 (한 줄 정렬 및 가변 높이 적용)
    loadNoticeView: async function() {
        if(!state.room) return;
        
        // 새 공지가 있으면 카드 하이라이트 (연두색 flash)
        const coordKey = `coord_${state.room}`;
        const globalKey = 'global';
        const hasNewCoord = state.noticeSeen[coordKey] !== undefined && 
            state.noticeSeen[coordKey] !== (await firebase.database().ref(`courses/${state.room}/coordNotice`).once('value')).val();
        // 공지 탭 진입 시 flash 예약 (렌더링 후)
        setTimeout(() => ui._flashNewNotices(), 300);
    },

    // 강의 안내 보드 색상 팔레트 초기화 (중복 방지)
    initBoardPalette: function() {
        const palette = document.getElementById('colorPalette');
        if(!palette || palette.dataset.init === '1') return;
        palette.dataset.init = '1';
        const colors = [
            '#000000','#1e293b','#dc2626','#ea580c','#ca8a04',
            '#16a34a','#0284c7','#7c3aed','#db2777','#ffffff'
        ];
        colors.forEach(c => {
            const btn = document.createElement('button');
            btn.title = c;
            btn.style.cssText = `width:22px;height:22px;background:${c};border:2px solid ${c==='#ffffff'?'#ccc':'transparent'};border-radius:50%;cursor:pointer;flex-shrink:0;`;
            btn.onclick = () => {
                document.execCommand('foreColor', false, c);
                // 미리보기 점 색상 업데이트
                const dot = document.getElementById('colorPreviewDot');
                if(dot) dot.style.background = c;
                // 드롭다운 닫기
                const panel = document.getElementById('colorDropdownPanel');
                if(panel) panel.classList.remove('open');
                document.getElementById('boardEditor').focus();
            };
            palette.appendChild(btn);
        });

        // 드롭다운 외부 클릭 시 닫기 (한 번만 등록)
        if(!window._colorDropdownOutsideSet) {
            window._colorDropdownOutsideSet = true;
            document.addEventListener('click', (e) => {
                const wrap = document.getElementById('colorDropdownWrap');
                const panel = document.getElementById('colorDropdownPanel');
                if(wrap && panel && !wrap.contains(e.target)) {
                    panel.classList.remove('open');
                }
            });
        }
    },

    loadNoticeView: async function() {
        if(!state.room) return;
        
        // 새 공지 flash 예약
        setTimeout(() => ui._flashNewNotices(), 300);

        // 2. 우측 영역: 통합 공지 조회
        const globalRef = firebase.database().ref('system/globalNotice');
        const coordRef = firebase.database().ref(`courses/${state.room}/coordNotice`);

        const updateRightNotice = () => {
            Promise.all([globalRef.once('value'), coordRef.once('value')]).then(([gSnap, cSnap]) => {
                const globalMsg = gSnap.val();
                const coordMsg = cSnap.val();
                const display = document.getElementById('globalNoticeDisplay');
                
                let html = "";
                
                // (1) 과정 운영 공지
                if (coordMsg) {
                    html += `
                        <div style="margin-bottom:15px; padding:15px 20px; background:#f0f7ff; border-radius:12px; border:1px solid #dbeafe; border-left:8px solid #3b82f6;">
                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                                <span style="background:#3b82f6; color:white; font-size:10px; font-weight:900; padding:2px 6px; border-radius:4px; line-height:1.2;">ADMIN</span>
                                <span style="color:#3b82f6; font-size:13px; font-weight:800;">과정 운영 공지</span>
                            </div>
                            <div style="font-size:14.5px; color:#1e3a8a; font-weight:600; line-height:1.5; white-space: pre-line;">${coordMsg}</div>
                        </div>`;
                }
                
                // (2) 입교안내 공지
                if (globalMsg) {
                    html += `
                        <div style="margin-bottom:15px; padding:15px 20px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0; border-left:8px solid #64748b;">
                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                                <span style="background:#64748b; color:white; font-size:10px; font-weight:900; padding:2px 6px; border-radius:4px; line-height:1.2;">입교안내 공지</span>
                                <span style="color:#64748b; font-size:13px; font-weight:800;">입교안내 공지</span>
                            </div>
                            <div style="font-size:14.5px; color:#475569; font-weight:600; line-height:1.5; white-space: pre-line;">${globalMsg}</div>
                        </div>`;
                }

                if (!coordMsg && !globalMsg) {
                    display.innerHTML = `
                        <div style="padding:50px 0; text-align:center; color:#cbd5e1;">
                            <i class="fa-solid fa-envelope-open" style="font-size:35px; margin-bottom:12px; opacity:0.5;"></i>
                            <p style="font-size:14px; font-weight:700;">현재 등록된 운영부 공지가 없습니다.</p>
                        </div>`;
                } else {
                    display.innerHTML = html;
                }
            });
        };

        globalRef.on('value', updateRightNotice);
        coordRef.on('value', updateRightNotice);
    },





// [교체 및 추가] 출결 게시판 통합 관리 (공식 QR + 자체 출석부)
loadAttendanceView: function() {
    if(!state.room) return;
    const room = state.room; // 현재 방 번호 고정

    // 1. 공식 QR 이미지 경로 리스너 정리 및 새로 연결
    const qrRef = firebase.database().ref(`courses/${room}/attendanceQR`);
    qrRef.off(); // 이전 방 안테나 제거
    
    qrRef.on('value', snap => {
        if(state.room !== room) return; // 방 번호 검증
        const qrData = snap.val();
        const imgMain = document.getElementById('attendanceQrImgMain');
        const msgMain = document.getElementById('noAttendanceQrMsgMain');
        
        if(qrData) {
            if(imgMain) {
                imgMain.src = qrData;
                imgMain.style.display = 'block';
            }
            if(msgMain) msgMain.style.display = 'none';
        } else {
            if(imgMain) imgMain.style.display = 'none';
            if(msgMain) {
                msgMain.style.display = 'block';
                msgMain.innerText = "등록된 QR 이미지가 없습니다. (운영부 업로드 필요)";
            }
        }
    });

    // 2. 자체 출석체크 실시간 감시 함수 호출
    this.loadInternalAttendance();
},

    // [신규] 출결 모드 전환 (공식 QR <-> 자체 출석체크)
    toggleAttendanceMode: function(mode) {
        const areaOfficial = document.getElementById('area-official-qr');
        const areaInternal = document.getElementById('area-internal-qr');
        const subTitle = document.getElementById('attendanceSubTitle');
        const btnOfficial = document.getElementById('btn-mode-official');
        const btnInternal = document.getElementById('btn-mode-internal');

        if(mode === 'official') {
            if(areaOfficial) areaOfficial.style.display = 'block';
            if(areaInternal) areaInternal.style.display = 'none';
            if(subTitle) subTitle.innerText = "E-HRD 출결 처리를 위한 QR 코드입니다.";
            // 버튼 디자인 변경
            btnOfficial.style.background = "#003366"; btnOfficial.style.color = "white";
            btnInternal.style.background = "#f1f5f9"; btnInternal.style.color = "#64748b";
        } else {
            if(areaOfficial) areaOfficial.style.display = 'none';
            if(areaInternal) areaInternal.style.display = 'block';
            if(subTitle) subTitle.innerText = "항기원 자체 시스템을 통해 실시간 출석을 확인합니다.";
            // 버튼 디자인 변경
            btnOfficial.style.background = "#f1f5f9"; btnOfficial.style.color = "#64748b";
            btnInternal.style.background = "#003366"; btnInternal.style.color = "white";
            // 자체 QR 생성
            this.startInternalOtp();
        }
    },

// [최종 수정] 자체 출석용 QR 코드 생성 (강의실 꼬임 방지 강화)
    startInternalOtp: function() {
        const codeEl = document.getElementById('internalOtpCode');
        const countEl = document.getElementById('internalOtpCountdown');
        if(!codeEl) return;
        const activeRoom = String(state.room || '').trim().replace(/^ROOM\s*/i, '').replace(/^#/, '').trim().toUpperCase();
        if (!activeRoom) {
            codeEl.textContent = '------';
            if(countEl) countEl.textContent = '-';
            return;
        }
        if (this._internalOtpTimer) clearInterval(this._internalOtpTimer);
        // [J10] 서버에 잔여 15초 이상 남은 유효 OTP가 있으면 재사용 — 강사 화면 새로고침/탭 재진입 때마다
        //  코드가 즉시 교체되어 입력 중이던 교육생이 '만료' 판정받던 문제 해소
        const reuseOrPublish = () => {
            firebase.database().ref(`courses/${activeRoom}/attendanceOtp`).once('value').then(s => {
                const v = s.val();
                if (v && v.code && String(v.room || '').toUpperCase() === activeRoom && Number(v.validUntil || 0) - Date.now() > 15000) {
                    codeEl.textContent = String(v.code);
                    codeEl.dataset.validUntil = String(v.validUntil);
                } else publishOtp();
            }).catch(() => publishOtp());
        };
        const publishOtp = () => {
            const code = String(Math.floor(100000 + Math.random() * 900000));
            const now = Date.now();
            const validUntil = now + 60000;
            codeEl.textContent = code;
            codeEl.dataset.validUntil = String(validUntil);
            if(countEl) { countEl.textContent = '60'; countEl.classList.remove('otp-countdown-urgent'); }
            const ringEl0 = document.getElementById('otpCountRing');
            if(ringEl0) { ringEl0.style.transition = 'none'; ringEl0.style.strokeDashoffset = '0'; void ringEl0.getBoundingClientRect(); ringEl0.style.transition = 'stroke-dashoffset 1s linear, stroke .3s'; }
            firebase.database().ref(`courses/${activeRoom}/attendanceOtp`).set({
                code,
                issuedAt: now,
                validUntil,
                room: activeRoom,
                updatedBy: 'instructor',
                serverUpdatedAt: firebase.database.ServerValue.TIMESTAMP
            }).catch(err => {
                console.error('OTP 저장 실패:', err);
                if(countEl) countEl.textContent = '저장오류';
            });
        };
        reuseOrPublish();
        this._internalOtpTimer = setInterval(() => {
            const liveRoom = String(state.room || '').trim().replace(/^ROOM\s*/i, '').replace(/^#/, '').trim().toUpperCase();
            if(liveRoom !== activeRoom) {
                clearInterval(this._internalOtpTimer);
                this._internalOtpTimer = null;
                return;
            }
            const remain = Math.max(0, Math.ceil((Number(codeEl.dataset.validUntil || 0) - Date.now()) / 1000));
            if(countEl) countEl.textContent = String(remain || 60);
            const ringEl = document.getElementById('otpCountRing');
            if(ringEl) {
                const C = 157.08;   // 2π·25 (링 둘레)
                const rr = Math.max(0, Math.min(60, remain));
                ringEl.style.strokeDashoffset = String((C * (1 - rr / 60)).toFixed(2));
            }
            if(countEl) {
                if (remain <= 10 && remain > 0) countEl.classList.add('otp-countdown-urgent');
                else countEl.classList.remove('otp-countdown-urgent');
            }
            if(remain <= 0) publishOtp();
        }, 1000);
    },

    generateInternalQR: function() {
        this.startInternalOtp();
        return;
        const target = document.getElementById('internalQrTarget');
        if(!target) return;

        // 1. 기존 QR 영역 초기화
        target.innerHTML = ""; 

        // 2. 현재 세션에 선택된 방 번호 고정
        const activeRoom = state.room;

        // 3. 방 번호가 없을 경우 생성 중단 (오류 방지)
        if (!activeRoom) {
            target.innerHTML = "<div style='color:#ef4444; font-size:14px; padding:20px;'>강의실 정보가 없습니다.<br>상단에서 강의실을 먼저 선택하세요.</div>";
            return;
        }

        // 4. 기본 접속 경로 계산
        const pathArr = window.location.pathname.split('/'); 
        pathArr.pop();
        const baseUrl = window.location.origin + pathArr.join('/');
        
        // 5. URL 구성: 현재 활성화된 방(activeRoom)을 정확하게 파라미터로 삽입
        // 교육생용 index.html로 보내며, 출석체크 신호(&checkin=true)를 함께 전달
        const internalUrl = `${baseUrl}/index.html?room=${activeRoom}&checkin=true`;

        // 6. QR 코드 생성 실행
        try {
            new QRCode(target, {
                text: internalUrl,
                width: 280,
                height: 280,
                correctLevel: QRCode.CorrectLevel.H // 인식률 향상을 위해 높은 오류 복구 수준 설정
            });
            
            // 디버깅용 (필요 시 주석 해제)
            // console.log(`[QR 생성 완료] 대상 강의실: ${activeRoom}`);
        } catch (error) {
            console.error("QR 생성 중 오류 발생:", error);
            target.innerHTML = "<div style='color:#ef4444;'>QR 생성 실패</div>";
        }
    },




// [최종 수정] 자체 출석부 실시간 리스트 (방 이동 시 데이터 꼬임 방지 강화)
// [최종] 출석 카운팅 매칭 버그 수정본
loadInternalAttendance: function() {
    if(!state.room) return;
    const roomAtInvoke = state.room; 
    const today = getTodayString();
    const listDiv = document.getElementById('internalAttendanceList');
    
    const studentsRef = firebase.database().ref(`courses/${roomAtInvoke}/students`);
    const attendanceRef = firebase.database().ref(`courses/${roomAtInvoke}/internal_attendance/${today}`);
    
    studentsRef.off();
    attendanceRef.off();

    studentsRef.on('value', studentSnap => {
        if (state.room !== roomAtInvoke) return;
        const students = studentSnap.val() || {};
        const uniqueStudentsMap = new Map();
        Object.keys(students).forEach(key => {
            const s = students[key];
            if (s.name && s.name !== "undefined") {
                const tokenId = String(key || '').includes('_') ? String(key).split('_').slice(1).join('_') : '';
                const phoneDigits = String(s.phone || '').replace(/\D/g, '');
                const phoneLooksMobile = /^010\d{7,8}$/.test(phoneDigits);
                const cleanPhone = String(s.empNo || s.employeeNo || s.id || s.studentId || (phoneLooksMobile ? tokenId : s.phone) || tokenId || "0000").trim();
                const identifier = `${s.name.trim()}_${cleanPhone}`;
                uniqueStudentsMap.set(key || identifier, { name: s.name.trim(), phone: cleanPhone, token: key || identifier });
            }
        });
        const sortedList = Array.from(uniqueStudentsMap.values()).sort((a,b) => a.name.localeCompare(b.name));

        attendanceRef.off();
        attendanceRef.on('value', attendSnap => {
            if (state.room !== roomAtInvoke) return;
            const attendees = attendSnap.val() || {};
            let attendCount = 0;
            if(listDiv) listDiv.innerHTML = "";

            sortedList.forEach(s => {
                // [수정 포인트] 학생이 저장한 '이름_번호' 형식과 정확히 일치시켜서 숫자를 올립니다.
                const attendKey = `${s.name}_${s.phone}`;
                const isAttended = !!(attendees[attendKey] || attendees[s.token]);
                if(isAttended) attendCount++;

                const bgColor = isAttended ? "#ecfdf5" : "#ffffff";
                const textColor = isAttended ? "#10b981" : "#94a3b8";
                const borderColor = isAttended ? "#10b981" : "#e2e8f0";
                const icon = isAttended ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-regular fa-circle"></i>';

                if(listDiv) {
                    listDiv.innerHTML += `<div style="background:${bgColor}; color:${textColor}; border:1.5px solid ${borderColor}; padding:10px; border-radius:10px; text-align:center; font-size:14px; font-weight:800;"><div>${icon}</div><div>${s.name}</div></div>`;
                }
            });

            // 상단 카운트 정보 업데이트 (이제 숫자가 올라갑니다)
            const totalEl = document.getElementById('totalMemberCount');
            const checkInEl = document.getElementById('checkInCount');
            if(totalEl) totalEl.innerText = sortedList.length;
            if(checkInEl) checkInEl.innerText = Object.keys(attendees).length;
        });
    });
},











showAlert: function(msg, onConfirm) {
        document.getElementById('customAlertText').innerText = msg;
        var m = document.getElementById('customAlertModal');
        // 알림창 클릭이 뒤 PDF(changePage)로 전파돼 페이지가 넘어가는 것 방지 — 1회만 바인딩
        if (!m._noBubble) {
            ['click','dblclick','pointerdown','mousedown','touchstart'].forEach(function(ev){
                m.addEventListener(ev, function(e){ e.stopPropagation(); });
            });
            m._noBubble = true;
        }
        // [전체화면 top-layer] 전체화면이면 알림창을 전체화면 요소 안으로 옮겨서 위에 보이게 (모니터 전체화면 뒤로 숨는 문제 해결)
        var fs = document.fullscreenElement || document.webkitFullscreenElement;
        try {
            if (fs) { if (m.parentNode !== fs) fs.appendChild(m); }
            else if (m.parentNode !== document.body) { document.body.appendChild(m); }
        } catch(e){}
        m.style.display = 'flex';
        this._alertCallback = (typeof onConfirm === 'function') ? onConfirm : null;
    },

    closeAlert: function() {
        var m = document.getElementById('customAlertModal');
        m.style.display = 'none';
        // 닫으면 다시 body로 복귀 (전체화면 요소가 제거돼도 알림창이 사라지지 않도록)
        try { if (m.parentNode !== document.body) document.body.appendChild(m); } catch(e){}
        const cb = this._alertCallback;
        this._alertCallback = null;
        if (cb) cb();
    },




    
    requestAdminAuth: function(type) {
        if(type === 'pw') state.adminCallback = () => ui.openPwModal();
        else if(type === 'idle') state.adminCallback = () => dataMgr.deactivateAllRooms();
        document.getElementById('adminAuthInput').value = "";
        document.getElementById('adminAuthModal').style.display = 'flex';
        document.getElementById('adminAuthInput').focus();
    },
    
    confirmAdminAuth: async function() {
        const input = document.getElementById('adminAuthInput').value;
        const isSuccess = await dataMgr.checkAdminSecret(input);
        if(isSuccess) {
            document.getElementById('adminAuthModal').style.display = 'none';
            if(state.adminCallback) state.adminCallback();
            state.adminCallback = null;
        } else {
            ui.showAlert("⛔ 관리자 인증 실패!");
            document.getElementById('adminAuthInput').value = "";
        }
    },
    
    closeAdminAuth: function() {
        document.getElementById('adminAuthModal').style.display = 'none';
        state.adminCallback = null;
    },
    
    openSecretModal: function() {
        document.getElementById('secret-current').value = "";
        document.getElementById('secret-new').value = "";
        document.getElementById('changeAdminSecretModal').style.display = 'flex';
    },
    
    closeSecretModal: function() {
        document.getElementById('changeAdminSecretModal').style.display = 'none';
    },










// [강사 플랫폼: 룸 선택 메뉴 렌더링 및 선택 초기화 보강 버전]
    initRoomSelect: function() {
        const sel = document.getElementById('roomSelect');
        const tableBody = document.getElementById('statusTableBody');
        
        // 1. Firebase 실시간 리스너 (한 번만 등록)
        if (!window.isRoomListenerSet) {
            firebase.database().ref('courses').on('value', s => {
                window.latestCoursesData = s.val() || {}; // 전역에 데이터 저장
                window.isRoomListenerSet = true;
                this.initRoomSelect(); // 데이터가 오면 화면을 다시 그림
            });
            return;
        }

        const d = window.latestCoursesData || {};
        // state.room을 변수로 캡처하지 않음 - 루프 안에서 직접 참조 (캡처 시점 불일치 방지)

        // [수정] placeholder에서 disabled를 제거하여 자바스크립트로 선택(리셋)이 가능하게 함
        if(sel) sel.innerHTML = '<option value="">Select Room ▾</option>';
        if(tableBody) tableBody.innerHTML = "";

        let count = 1;
        for(let i=65; i<=90; i++) {
            const c = String.fromCharCode(i);
            const roomData = d[c] || {};
            const st = roomData.status || {};
            const settings = roomData.settings || {};
            const studentObj = roomData.students || {};
            const validStudents = Object.values(studentObj).filter(s => s.name && s.name !== "undefined");
            const uniqueNames = new Set(validStudents.map(s => s.name)); 
            const userCount = uniqueNames.size;
            const isRoomActive = (st.roomStatus === 'active');
            const courseName = settings.courseName ? settings.courseName : "-";
            const profName = st.professorName ? st.professorName : "-";
            // isRealMyRoom: 오직 현재 세션ID 기준 (last_owned_room 제거 - 방 혼동 원인)
            const isRealMyRoom = isRoomActive && st.ownerSessionId === state.sessionId;

            // 사이드바 드롭다운 갱신
            if(sel) {
                const opt = document.createElement('option');
                opt.value = c;
                // 파란 LED: 현재 선택한 방이면서 내가 비번 치고 들어간 방(verifyTakeover 성공)만
                const isVerifiedMyRoom = (c === state.room) && dataMgr.isMyOwnedRoom(c);
                if(isVerifiedMyRoom) {
                    opt.innerText = `Room #${c} (🔵 내 강의실 - ${profName})`;
                    opt.selected = true;
                } else if(c === state.room) {
                    // 선택한 방이지만 비번 미인증 (미개설 진입 등)
                    opt.innerText = `Room #${c} (⚪ 설정 중)`;
                    opt.selected = true;
                } else if(isRoomActive) {
                    opt.innerText = `Room #${c} (🟠 사용중 - ${profName})`;
                } else {
                    opt.innerText = `Room #${c}  (미개설)`;
                    opt.style.color = '#94a3b8';
                }
                sel.appendChild(opt);
            }

            // 우측 현황판 테이블 갱신
            if(tableBody) {
                const hasCourse = !!(settings.courseName && String(settings.courseName).trim());
                // [필터] 운용 중(roomStatus=active + 과정명 존재)인 강의실만 현황판에 표출
                //  단, 환경설정에서 '총괄표 비노출'(hideFromBoard)로 지정한 과정은 제외 (테스트/내부 운용)
                if (isRoomActive && hasCourse && !settings.hideFromBoard) {
                const row = document.createElement('tr');

                const statusBadge = isRoomActive 
                    ? '<span class="badge-status badge-active">🟢 사용 중</span>' 
                    : '<span class="badge-status badge-idle">⚪ 비어 있음</span>';

                const rowNum = count++;
                const roomDetail = settings.roomDetailName || '';
                // 강의실명 2줄 표시 (공백 기준으로 분리, 마지막 단어를 2번째 줄로)
                let roomLine1 = roomDetail, roomLine2 = '';
                if (roomDetail) {
                    const parts = roomDetail.trim().split(/\s+/);
                    if (parts.length >= 2) {
                        roomLine2 = parts.pop();
                        roomLine1 = parts.join(' ');
                    }
                }
                const roomCell = roomDetail
                    ? `<div style="text-align:center; line-height:1.4;">
                           <div style="font-size:11px; font-weight:700; color:#334155;">${roomLine1}</div>
                           <div style="font-size:11px; font-weight:700; color:#334155;">${roomLine2}</div>
                       </div>`
                    : '<span style="color:#cbd5e1;">-</span>';

                const isMyRoom = (c === state.room && dataMgr.isMyOwnedRoom(c));

                const rowNumCell = isMyRoom
                    ? `<span style="display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; background:#3b82f6; border-radius:50%;"><i class="fa-solid fa-check" style="color:#fff; font-size:13px;"></i></span>`
                    : rowNum;

                // 현황판 좌물쇠(잠금 토글) 제거 — '차주 유지'는 교육과정 환경설정 체크박스로 제어
                const lockBtn = '';

                row.innerHTML = `
                    <td>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <div>${rowNumCell}</div>
                            ${lockBtn}
                        </div>
                    </td>
                    <td style="font-weight:900; color:#3b82f6;">
                        Room #${c}
                    </td>
                    <td><div class="td-course-name" title="${courseName}">${courseName}</div></td>
                    <td style="font-weight:600;">${profName}</td>
                    <td>${statusBadge}</td>
                    <td style="font-weight:700;">${userCount}명</td>
                    <td>${roomCell}</td>
                    <td>
                        <button class="btn-table-action" onclick="event.stopPropagation(); dataMgr.switchRoomAttempt('${c}')">입장하기</button>
                    </td>
                `;

                // [행 전체 클릭] 어느 칸을 눌러도 그 과정으로 입장
                row.style.cursor = 'pointer';
                row.title = '클릭하면 이 과정으로 입장합니다';
                (function(rc){ row.addEventListener('click', function(){ dataMgr.switchRoomAttempt(rc); }); })(c);

                // 연한 파란 배경: 현재 방이면서 비번 인증된 방만
                if (isMyRoom) {
                    row.classList.add('is-my-room');
                }

                tableBody.appendChild(row);
                } // [필터] 운용 중 방만 표출 끝
            }
        }

        // [현황판] 운용 중인 강의실이 하나도 없으면 안내 행 표시 (count는 표출된 방에서만 증가)
        if (tableBody && count === 1) {
            tableBody.innerHTML = '<tr><td colspan="8" style="padding:28px; text-align:center; color:#94a3b8; font-weight:700;">현재 운용 중인 강의실이 없습니다.</td></tr>';
        }

        // [핵심 추가] 현재 선택된 방 정보가 없다면(홈 화면) 메뉴를 "Select Room"으로 강제 리셋
        if(!state.room && sel) {
            sel.value = "";
        }
    },









toggleMiniQR: function() {
    const qrBox = document.getElementById('floatingQR');
    if (qrBox) qrBox.style.display = 'none';
    ui._qrUserClosed = true;
    return;
    // [보안] 강의실 선택 확인
    if (!state.room || state.room === 'null') {
        ui.showAlert("⚠️ 좌측 상단에서 강의실(Room)을 먼저 선택해 주세요.");
        return;
    }
    if (qrBox && qrBox.style.display === 'flex') { qrBox.style.display = 'none'; ui._qrUserClosed = true; }
    else { ui.showMiniQR(); }
},

// 플로팅 QR 표시 + 렌더 (자동 표시 / 상단바 버튼 공용)
showMiniQR: function() {
    const qrBox = document.getElementById('floatingQR');
    if (qrBox) qrBox.style.display = 'none';
    ui._qrUserClosed = true;
    return;
    if (!qrBox || !state.room || state.room === 'null') return;
    qrBox.style.display = 'flex';
    ui._qrUserClosed = false;
    const target = document.getElementById('miniQRElement');
    const label = document.querySelector('.qr-label');
    if (!target) return;
    target.innerHTML = "";
    const path = window.location.pathname;
    const directory = path.substring(0, path.lastIndexOf('/'));
    const baseUrl = window.location.origin + directory + "/";
    const forcedUrl = `${baseUrl}index.html?room=${state.room}`;
    if (label) label.innerText = `ROOM ${state.room}`;
    try { new QRCode(target, { text: forcedUrl, width: 140, height: 140, correctLevel: QRCode.CorrectLevel.H }); } catch(e) {}
},





    
checkLockStatus: function(st) {
    const overlay = document.getElementById('statusOverlay');
    const takeoverModal = document.getElementById('takeoverModal');

    // 비번 입력창이 열려있다면 잠금 화면은 무조건 숨김
    if (takeoverModal && takeoverModal.style.display === 'flex') {
        overlay.style.display = 'none';
        return;
    }

    // 방이 비어있을 때만 잠금 화면 표시
    if (st.roomStatus === 'idle') {
        overlay.style.display = 'flex';
    } else {
        overlay.style.display = 'none';
    }
},
    
// [수정] 무서운 눈 이모지를 깔끔한 아이콘으로 교체
updateHeaderRoom: function(r) { 
    // 1. 상단바 텍스트 업데이트
    const elTop = document.getElementById('displayRoomName'); 
    if(elTop) {
        let titleText = `Room #${r}`;
        if (state.isObserver) {
            // 옵저버: 눈에 띄는 앰버 배지 + 쌍안경 아이콘 (보기 전용 강조)
            titleText += ` <span style="display:inline-flex; align-items:center; gap:5px; font-size:12px; margin-left:10px; padding:3px 11px; background:linear-gradient(135deg,#f59e0b,#f97316); color:#fff; font-weight:800; border-radius:20px; vertical-align:middle; box-shadow:0 2px 8px rgba(245,158,11,0.4);"><i class="fa-solid fa-binoculars" style="font-size:11px;"></i> 보기 전용</span>`;
        }
        elTop.innerHTML = titleText;
    }

    // 2. 모든 섹션 제목 옆의 룸 배지 업데이트
    const allBadges = document.querySelectorAll('.room-badge-global');
    allBadges.forEach(badge => {
        badge.innerText = `(Room #${r})`;
    });

    // 3. 대시보드 전용 배지 업데이트
    const elDash = document.getElementById('dashRoomBadge');
    if(elDash) elDash.innerText = `(Room #${r})`;
},





// [수정] 옵저버 버튼 아이콘 보정
updateObserverButton: function() {
    const btn = document.getElementById('observerToggleButton');
    if(!btn) return;

    if (state.isObserver) {
        // 옵저버 상태일 때 -> 강사로 돌아가기
        btn.innerHTML = '<i class="fa-solid fa-user-tie"></i> 강사 모드 전환';
        btn.style.background = "#3b82f6"; 
        btn.style.color = "#ffffff";
    } else {
        // 강사 상태일 때 -> 옵저버로 가기
        btn.innerHTML = '<i class="fa-solid fa-binoculars"></i> 옵저버 모드';
        btn.style.background = "#e2e8f0"; 
        btn.style.color = "#475569";
    }
},


















    
    renderSettings: function(d) {
        document.getElementById('courseNameInput').value = d.courseName || "";
        document.getElementById('roomPw').value = d.password ? atob(d.password) : "";
        document.getElementById('displayCourseTitle').innerText = d.courseName || "";
    },

    // 방 전환/신규방 진입 시 대시보드 데이터 초기화
    clearDashboard: function() {
        const clear = (id, val) => { const el = document.getElementById(id); if(el) el.innerText = val; };
        clear('dashCourseTitle', '과정명을 설정해주세요.');
        clear('dashPeriod', '-');
        clear('dashRoomDetail', '-');
        try { var _gb = document.getElementById('dashGradBtn'); if (_gb) _gb.classList.remove('is-visible'); } catch (e) {}   // [M9]
        clear('dashCoordName', '-');
        clear('dashProfNameOnly', '-');
        clear('dashArrivedCount', '0');
        clear('dashAttendCount', '0');
        clear('dashTotalCount', '0');
        clear('dashOutingCount', '0');
        clear('dashDinnerCount', '0');
        clear('dashQaCount', '0');
        clear('dashNoticeInst', '작성된 담임 교수 공지가 없습니다.');
        clear('dashNoticeAdmin', '등록된 운영부 과정 공지가 없습니다.');
        clear('dashNoticeGlobal', '현재 게시된 센터 전체 공지가 없습니다.');
        ['total-osong','total-term','total-air','total-car'].forEach(id => clear(id, '0'));
    },
    
renderRoomStatus: function(st) { 
        const sel = document.getElementById('roomStatusSelect');
        const isActive = (st === 'active');

        if(sel) {
            sel.value = st || 'idle'; 
            sel.disabled = true;
            sel.style.pointerEvents = 'none';
            sel.style.cursor = 'default';
            sel.style.opacity = '0.85';
            sel.style.color = isActive ? '#10b981' : '#ef4444'; // 활성=초록, 비활성=빨강
        }

        // 강의실 미활성화 시 하단 버튼들 비활성화
        const btnIds = ['btnReset'];
        const btnsToDisable = [
            document.querySelector('.btn-action.btn-print'),           // Report
            document.getElementById('observerToggleButton'),            // 옵저버 모드
            document.querySelector('[onclick*="allIdleWithMasterKey"]'), // All Idle
            document.getElementById('btnReset'),                        // Reset
        ];

        btnsToDisable.forEach(btn => {
            if (!btn) return;
            if (isActive) {
                btn.disabled = false;
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
            } else {
                btn.disabled = true;
                btn.style.opacity = '0.35';
                btn.style.pointerEvents = 'none';
            }
        });

        // All Idle은 항상 활성 (전체 강의실 관리용)
        const allIdleBtn = document.querySelector('[onclick*="allIdleWithMasterKey"]');
        if (allIdleBtn) {
            allIdleBtn.disabled = false;
            allIdleBtn.style.opacity = '1';
            allIdleBtn.style.pointerEvents = 'auto';
        }
    },
    
    renderQr: function(url) {
        document.getElementById('studentLink').value = url;
        const qrDiv = document.getElementById('qrcode'); 
        if(!qrDiv) return;
        qrDiv.innerHTML = "";
        try { 
            new QRCode(qrDiv, { text: url, width: 38, height: 38 }); 
        } catch(e) {}
    },
    








// [6.18차 최종] QR 인식률 향상 및 주소 오류 차단 버전
openQrModal: function() {
    const urlEl = document.getElementById('studentLink');
    const url = urlEl ? urlEl.value : "";

    // [1. 방어 코드] 주소가 비어있거나 'null'이라는 글자가 포함된 경우 차단
    if(!url || url.indexOf('null') !== -1) {
        ui.showAlert("⚠️ 올바른 강의실 주소가 없습니다. 방을 다시 선택해 주세요.");
        return;
    }

    const modal = document.getElementById('qrModal');
    const target = document.getElementById('qrBigTarget');
    
    if(modal && target) {
        modal.style.display = 'flex'; // 팝업창 열기
        target.innerHTML = "";        // 이전 QR 흔적 삭제

        // [추가] 어느 강의실인지 라벨 표시
        const roomLabel = document.getElementById('qrBigRoomLabel');
        if (roomLabel) {
            const ctEl = document.getElementById('displayCourseTitle');
            const courseNm = (ctEl && ctEl.innerText.trim()) ? ctEl.innerText.trim() : '';
            roomLabel.innerHTML = `<i class="fa-solid fa-door-open"></i> ROOM ${state.room}` +
                (courseNm ? ` · ${courseNm}` : '');
        }
        
        // [2. 인식률 최적화] 팝업이 뜨는 애니메이션 시간을 고려해 0.1초 뒤 생성
        setTimeout(() => {
            try {
                new QRCode(target, { 
                    text: url, 
                    width: 350, 
                    height: 350,
                    // [핵심 추가] 인식 성능을 최대(High)로 설정 (카메라가 멀리서 찍어도 잘 인식됨)
                    correctLevel: QRCode.CorrectLevel.H 
                });
            } catch (e) {
                console.error("QR 생성 실패:", e);
            }
        }, 100);
    } else {
        alert("QR 화면을 불러오지 못했습니다. 새로고침(F5) 후 다시 시도해 주세요.");
    }
},






    
    closeQrModal: function() {
        const m = document.getElementById('qrModal');
        if (m) m.style.display = 'none';
    },

    // [추가] 수강생 현황 '명단 관리' 설정 드롭다운 토글 (바깥 클릭 시 자동 닫힘)
    toggleStuSettings: function(e) {
        if (e) e.stopPropagation();
        const m = document.getElementById('stuSettingsMenu');
        if (!m) return;
        const show = (m.style.display === 'none' || !m.style.display);
        m.style.display = show ? 'block' : 'none';
        if (show) {
            const close = function(ev) {
                const btn = document.getElementById('stuSettingsBtn');
                if (!m.contains(ev.target) && !(btn && btn.contains(ev.target))) {
                    m.style.display = 'none';
                    document.removeEventListener('click', close);
                }
            };
            setTimeout(function(){ document.addEventListener('click', close); }, 0);
        }
    },

    // ── [퀵 탭] 상단 메뉴 3·4번 버튼 과정별 커스터마이즈 ──
    _quickTabDefs: {
        'notice':       { icon: 'fa-bullhorn',                   color: '#f59e0b', label: '공지 관리' },
        'students':     { icon: 'fa-users-viewfinder',           color: '#3b82f6', label: '수강생 현황' },
        'admin-action': { icon: 'fa-person-walking-arrow-right', color: '#2563eb', label: '외출/외박' },
        'tablet-loan':  { icon: 'fa-tablet-screen-button',       color: '#6366f1', label: '태블릿 대여' },
        'shuttle':      { icon: 'fa-bus',                        color: '#10b981', label: '차량 수요조사' },
        'dormitory':    { icon: 'fa-bed',                        color: '#0ea5e9', label: '생활관 배치' },
        'qa':           { icon: 'fa-comments',                   color: '#8b5cf6', label: 'Q&A' },
        'quiz':         { icon: 'fa-clipboard-question',         color: '#ec4899', label: '퀴즈 모드' }
    },
    _quickTabPool: ['notice', 'students', 'admin-action', 'tablet-loan', 'shuttle', 'dormitory', 'qa', 'quiz'],
    renderQuickTabs: function(s3, s4) {
        const defs = ui._quickTabDefs;
        s3 = defs[s3] ? s3 : 'notice';
        s4 = defs[s4] ? s4 : 'students';
        [['3', s3], ['4', s4]].forEach(function(pair) {
            const btn = document.querySelector('.quick-slot[data-slot="' + pair[0] + '"]');
            if (!btn) return;
            const mode = pair[1], d = defs[mode];
            btn.id = 'tab-' + mode;
            btn.setAttribute('onclick', "ui.setMode('" + mode + "')");
            const badge = (mode === 'notice') ? ' <span id="coordNoticeBadge" style="display:none; background:#ef4444; color:white; font-size:10px; font-weight:800; padding:2px 5px; border-radius:8px; margin-left:4px; vertical-align:middle;">NEW</span>' : '';
            btn.innerHTML = '<i class="fa-solid ' + d.icon + '" style="color:' + d.color + ';"></i> <span>' + d.label + '</span>' + badge;
        });
        try { const cm = state.currentMode; document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active')); const t = document.getElementById('tab-' + cm); if (t) t.classList.add('active'); } catch (e) {}
    },
    applyQuickTabs: function(settings) {
        const q = (settings && settings.quickTabs) || {};
        ui.renderQuickTabs(q.slot3 || 'notice', q.slot4 || 'students');
    },
    openQuickTabsSettings: function() {
        if (state.isObserver) { ui.showAlert("👁️ 옵저버 모드에서는 변경할 수 없습니다."); return; }
        if (!state.room) { ui.showAlert("강의실을 먼저 선택하세요."); return; }
        const defs = ui._quickTabDefs, pool = ui._quickTabPool;
        const c3 = ((document.querySelector('.quick-slot[data-slot="3"]') || {}).id || 'tab-notice').replace('tab-', '');
        const c4 = ((document.querySelector('.quick-slot[data-slot="4"]') || {}).id || 'tab-students').replace('tab-', '');
        const opts = sel => pool.map(m => '<option value="' + m + '" ' + (m === sel ? 'selected' : '') + '>' + defs[m].label + '</option>').join('');
        const ov = document.createElement('div');
        ov.id = 'quickTabsModal';
        ov.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:21000;display:flex;align-items:center;justify-content:center;';
        ov.innerHTML = '<div style="background:#fff;border-radius:18px;padding:26px 28px;width:420px;max-width:92vw;box-shadow:0 24px 70px rgba(0,0,0,.3);" onclick="event.stopPropagation()">'
            + '<h3 style="margin:0 0 6px;font-size:19px;font-weight:900;color:#0f172a;"><i class="fa-solid fa-gear" style="color:#2563eb;"></i> 퀵 메뉴 설정</h3>'
            + '<p style="margin:0 0 18px;font-size:12.5px;color:#64748b;font-weight:600;line-height:1.5;">과정 현황·입교안내는 고정입니다. 3·4번 버튼을 이 과정에 맞게 선택하세요. <b>이 과정에만</b> 저장됩니다.</p>'
            + '<label style="font-size:12px;font-weight:800;color:#475569;">3번 버튼</label>'
            + '<select id="qt-s3" style="width:100%;padding:11px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:15px;font-weight:700;margin:6px 0 14px;outline:none;">' + opts(c3) + '</select>'
            + '<label style="font-size:12px;font-weight:800;color:#475569;">4번 버튼</label>'
            + '<select id="qt-s4" style="width:100%;padding:11px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:15px;font-weight:700;margin:6px 0 4px;outline:none;">' + opts(c4) + '</select>'
            + '<div id="qt-msg" style="font-size:12px;color:#ef4444;font-weight:700;min-height:16px;margin:6px 0;"></div>'
            + '<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:8px;">'
            + '<button onclick="document.getElementById(\'quickTabsModal\').remove()" style="padding:10px 18px;border:none;border-radius:10px;background:#64748b;color:#fff;font-weight:800;cursor:pointer;">취소</button>'
            + '<button onclick="ui.saveQuickTabs()" style="padding:10px 22px;border:none;border-radius:10px;background:#10b981;color:#fff;font-weight:800;cursor:pointer;">적용</button>'
            + '</div></div>';
        ov.addEventListener('click', function(e) { if (e.target === ov) ov.remove(); });
        document.body.appendChild(ov);
    },
    saveQuickTabs: function() {
        const s3 = (document.getElementById('qt-s3') || {}).value;
        const s4 = (document.getElementById('qt-s4') || {}).value;
        const msg = document.getElementById('qt-msg');
        if (s3 === s4) { if (msg) msg.textContent = '3번과 4번 버튼은 서로 다르게 선택하세요.'; return; }
        if (!state.room) return;
        firebase.database().ref('courses/' + state.room + '/settings/quickTabs').set({ slot3: s3, slot4: s4 })
            .then(function() { ui.renderQuickTabs(s3, s4); const m = document.getElementById('quickTabsModal'); if (m) m.remove(); ui.showAlert('✅ 퀵 메뉴가 이 과정에 저장되었습니다.'); })
            .catch(function() { if (msg) msg.textContent = '저장 중 오류가 발생했습니다.'; });
    },

    openStudentManual: function() {
        const modal = document.getElementById('studentManualModal');
        if (modal) modal.style.display = 'flex';
    },

    closeStudentManual: function() {
        const modal = document.getElementById('studentManualModal');
        if (modal) modal.style.display = 'none';
    },
    
    copyLink: function() {
        const linkInput = document.getElementById('studentLink');
        const url = linkInput.value;
        if (!url) { 
            ui.showAlert("강의실을 먼저 선택하세요!"); 
            return; 
        }
        const ctEl = document.getElementById('displayCourseTitle');
        const courseNm = (ctEl && ctEl.innerText.trim()) ? ctEl.innerText.trim() : '';
        const roomTag = state.room
            ? `ROOM ${state.room}${courseNm ? ' · ' + courseNm : ''}`
            : '강의실';
        const okMsg = `📋 [${roomTag}] 입장 링크가 복사되었습니다!`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
                ui.showAlert(okMsg);
            }).catch(() => {
                linkInput.select(); 
                document.execCommand('copy'); 
                ui.showAlert(okMsg);
            });
        } else {
            linkInput.select(); 
            document.execCommand('copy'); 
            ui.showAlert(okMsg);
        }
    },







// [ZOOM 모니터링 J3] admin 내장 뷰로 열기 — iframe은 한 번 로드 후 메뉴 이동에도 유지(봇 연결 보존)
    // [J4] admin은 body zoom(밀도 보정) 때문에 100vh 기반 iframe이 잘려 보임 → 실제 가용 높이를 계산해 지정
    _sizeZoomFrame: function() {
        try {
            var fr = document.getElementById('zoomMonitorFrame');
            if (!fr || fr.offsetParent === null) return;
            // [J5] zoom/transform 환경에서도 정확하도록 실측: 현재 CSS 높이 대비 화면 렌더 높이 비율(scale)을 직접 측정
            var rect = fr.getBoundingClientRect();
            var cssH = parseFloat(fr.style.height) || fr.clientHeight || 1;
            var scale = (rect.height > 1 && cssH > 1) ? (rect.height / cssH) : 1;
            var availVisual = window.innerHeight - rect.top - 14;   // 화면(visual) 기준 남은 높이
            var minVisual = 420 * scale;
            if (availVisual < minVisual) availVisual = minVisual;
            fr.style.minHeight = '0';
            fr.style.height = (availVisual / scale) + 'px';         // CSS px로 환산해 지정
        } catch(e) {}
    },
    openZoomMonitor: function() {
        try {
            if (!state.room) { ui.showAlert('강의실을 먼저 선택해 주세요.'); return; }
            if (window._zoomRoomOnline === false) { ui.showAlert('이 과정은 온라인(Zoom) 과정이 아닙니다.\n과정현황에서 장소를 온라인(Zoom)으로 설정하면 사용할 수 있습니다.'); return; }
            var fr = document.getElementById('zoomMonitorFrame');
            if (fr) {
                var cur = fr.getAttribute('data-room') || '';
                var want = 'zoom_monitor.html?room=' + encodeURIComponent(state.room) + '&embed=1&v=260704M14';
                if (!cur) { fr.src = want; fr.setAttribute('data-room', String(state.room)); }
                else if (cur !== String(state.room)) {
                    if (confirm('다른 과정(' + cur + ')의 모니터링이 열려 있습니다.\n현재 과정으로 다시 불러올까요?\n(진행 중이던 봇 연결은 끊어집니다)')) {
                        fr.src = want; fr.setAttribute('data-room', String(state.room));
                    }
                }
            }
            ui.setMode('zoom-monitor');
            // [J4] 표시 후 실제 가용 높이로 iframe 크기 보정 (+ 창 크기 변경 대응)
            setTimeout(function(){ ui._sizeZoomFrame(); }, 60);
            setTimeout(function(){ ui._sizeZoomFrame(); }, 400);
            if (!ui._zoomFrameResizeHooked) {
                ui._zoomFrameResizeHooked = true;
                window.addEventListener('resize', function(){ ui._sizeZoomFrame(); });
            }
        } catch (e) { console.error('[openZoomMonitor]', e); }
    },

setMode: function(mode) {
        // [U턴 버튼] 과정(방)에 들어가 있고 현황판/홈이 아닐 때만 표시
        try { document.body.classList.toggle('in-course', !!state.room && mode !== 'waiting' && mode !== 'home' && mode !== 'prof-presentation'); } catch(e){}
        // 마이크 모니터링 버튼도 in-course 상태에 맞춰 표시/숨김 갱신 (현황판에선 숨김)
        try { lectureMonitor._updateToggleButton(); } catch(e){}
        // [QR] 현황판(waiting)에선 입장 QR 숨김, 과정현황(dashboard)에선 표시(사용자가 X로 닫지 않은 경우)
        try {
            var _qr = document.getElementById('floatingQR');
            if (_qr) {
                // 현황판(waiting)·출결화면(attendance)에선 교육생용 입장 QR 숨김(QR 2개 혼동 방지)
                if (mode === 'waiting' || mode === 'attendance') { _qr.style.display = 'none'; }
                else if (mode === 'dashboard') { _qr.style.display = 'none'; ui._qrUserClosed = true; }
            }
        } catch(e) {}
        // [추가] 강의실에 입장한 상태라면 숨겨졌던 메뉴 탭(mode-tabs)을 다시 보여줍니다.
        const tabs = document.querySelector('.mode-tabs');
        if (state.room && tabs) {
            tabs.style.display = 'flex'; 
        }

        // 플로팅 홈 버튼 제어: 홈/대시보드/퀴즈 모드에서 숨김
        const homeBtn = document.getElementById('floatingHomeBtn');
        if (homeBtn) {
            if (mode === 'home' || mode === 'dashboard' || mode === 'quiz') {
                homeBtn.style.display = 'none';
            } else {
                homeBtn.style.display = 'flex';
                // 목적지에 따라 문구 변경: 과정 안이면 '과정현황', 현황판(홈)에서 왔으면 '현황판으로'
                const _hbSpan = homeBtn.querySelector('span');
                if (_hbSpan) _hbSpan.textContent = state.room ? '과정현황' : '현황판으로';
            }
        }

        // [사이드바 버튼] 통합 현황판(홈, 과정 미진입)=교수 프로필 수정(노란색), 과정 화면=교육과정 환경 설정(파란색)
        const _spb = document.getElementById('btnSetupModal');
        if (_spb) {
            if (!state.room) {
                _spb.innerHTML = '<i class="fa-solid fa-user-pen"></i> 교수님 프로필 수정';
                _spb.classList.add('btn-prof-mode');   // 노란색 — 과정 설정이 아님을 색으로 구분
                _spb.title = '교수님별 프로필(사진·연락처·약력 등)을 수정합니다';
            } else {
                _spb.innerHTML = '<i class="fa-solid fa-gears"></i> 교육과정 환경 설정 (통합)';
                _spb.classList.remove('btn-prof-mode');
                _spb.title = '';
            }
        }

        // 1. 모든 view- 로 시작하는 구역을 일단 숨김
        document.querySelectorAll('[id^="view-"]').forEach(v => { 
            v.style.display = 'none'; 
        });

        // [입교안내 영상/배경음] 다른 화면으로 나가면 start.mp4 영상 + start.mp3 노래를 정지 (소리 이어짐 방지)
        try { var _cgvExit = document.getElementById('cgVideo'); if (_cgvExit) { _cgvExit.pause(); } } catch(e){}
        try { if (typeof guideMgr !== 'undefined' && guideMgr._stopChannelAudio) guideMgr._stopChannelAudio(); } catch(e){}

        // [유지] 강사 모드일 때 버튼 비활성화 해제 로직 (교육생 플랫폼 회색 음영 방지 관련 - 절대 수정 금지)
        if (!state.isObserver) {
            const allAdminBtns = document.querySelectorAll('.btn-action, .m-btn-done, .navy-btn, #btnReset, button.btn-danger');
            allAdminBtns.forEach(btn => {
                if (btn.id !== 'quizFile' && btn.id !== 'studentFile') {
                    btn.style.display = ''; 
                    btn.disabled = false;            // 잠금 해제 유지
                    btn.style.opacity = '1';         // 투명도 복구 유지
                    btn.style.cursor = 'pointer';    // 마우스 커서 복구 유지
                }
            });
            const quizCtrl = document.getElementById('quizControls');
            if(quizCtrl) quizCtrl.style.display = 'flex';
        }
        
        // 퀴즈 탭에서 다른 탭으로 이동 시 교육생 화면 qa로 복원
        if (state.currentMode === 'quiz' && mode !== 'quiz' && state.room && !state.isObserver) {
            firebase.database().ref(`courses/${state.room}/status/mode`).set('qa');
        }

        // 2. 현재 선택한 모드에 맞는 구역 ID 결정
        const targetView = (mode === 'admin-action') ? 'view-admin-action' : (mode === 'dinner-skip') ? 'view-dinner-skip' : (mode === 'tablet-loan') ? 'view-tablet-loan' : (mode === 'instant-survey') ? 'view-notice' : `view-${mode}`;
        const targetEl = document.getElementById(targetView);

        // 3. 화면 표시 (전부 flex)
        if(targetEl) targetEl.style.display = 'flex';

        // home 모드: 탭 숨김 / waiting 모드: 현황판 데이터 갱신
        if (mode === 'home') {
            const tabs = document.querySelector('.mode-tabs');
            if (tabs) tabs.style.display = 'none';
            // [홈 통합검색] 홈 진입 시 검색 상태 초기화
            try { var _hsi=document.getElementById('homeSearchInput'); if(_hsi) _hsi.value=''; var _hsr=document.getElementById('homeSearchResults'); if(_hsr) _hsr.innerHTML=''; var _hsw=document.getElementById('homeSearchWrap'); if(_hsw) _hsw.classList.remove('has-text'); var _vh=document.getElementById('view-home'); if(_vh) _vh.classList.remove('home-search-active'); } catch(e){}
            setTimeout(() => { if(typeof ui.loadHomeStats==='function') ui.loadHomeStats(); }, 200);
        } else if (mode === 'waiting') {
            ui.initRoomSelect();
        }
        else if (mode === 'foodnews') { if(typeof ui.loadFoodNews==='function') ui.loadFoodNews(); }

        // 4. 상단 탭 활성화 표시
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        const targetTab = document.getElementById(`tab-${mode}`);
        if(targetTab) targetTab.classList.add('active');

        localStorage.setItem('kac_last_mode', mode);
        state.currentMode = mode; // 현재 탭 추적 (공지 팝업 차단용)
        try { document.body.setAttribute('data-mode', mode); } catch(e){}  // [푸터] 현황판/전체화면 등에서 푸터 숨김 제어용

        // 5. 각 모드별 데이터 로드
        if (state.room) {
            // ── 교육생 화면 모드 설정 (퀴즈는 맨 먼저 처리) ──
            if (!state.isObserver) {
                const safeStudentModes = ['waiting', 'schedule', 'shuttle', 'admin-action', 'dinner-skip', 'tablet-loan', 'students', 'dashboard', 'notice', 'attendance', 'guide', 'dormitory', 'survey-guide', 'exam-timer', 'instant-survey'];
                let studentMode;
                if (mode === 'quiz') {
                    studentMode = 'quiz';
                } else if (mode === 'qa' || safeStudentModes.includes(mode)) {
                    studentMode = 'qa';
                } else if (mode === 'prof-presentation') {
                    studentMode = null;
                } else {
                    studentMode = mode;
                }
                if (studentMode !== null) {
                    firebase.database().ref(`courses/${state.room}/status/mode`).set(studentMode);
                }
            }

            if (mode === 'quiz') {
                // 퀴즈 탭 진입 시 리포트 오버레이(종료화면)가 떠있다면 강제로 닫기
                const summaryOverlay = document.getElementById('quizSummaryOverlay');
                if (summaryOverlay) summaryOverlay.style.display = 'none';

                // [변경] 진입 시 항상 '퀴즈 선택' 화면을 먼저 표시
                //  (저장된 퀴즈가 있으면 선택, 없으면 샘플 문항으로 시작)
                firebase.database().ref(`courses/${state.room}/status/quizStep`).once('value', snap => {
                    if (snap.val() === 'summary') {
                        firebase.database().ref(`courses/${state.room}/status/quizStep`).set('none');
                    }
                    document.getElementById('quizSelectModal').style.display = 'flex';
                    quizMgr.loadSavedQuizList();
                });
            }
            
            if (mode === 'dashboard') ui.loadDashboardStats(); 
            const noticeView = document.getElementById('view-notice');
            if (noticeView) noticeView.classList.toggle('survey-focus-mode', mode === 'instant-survey');

            if (mode === 'notice' || mode === 'instant-survey') { 
                ui.loadNoticeView(); 
                guideMgr.clearCoordNoticeBadge();
                // 안내 보드 기존 내용 불러오기 + 색상 팔레트 초기화
                dataMgr.loadBoardNotice();
                ui.initBoardPalette();
                if (typeof surveyMgr !== 'undefined') surveyMgr.init();
                if (mode === 'instant-survey') {
                    setTimeout(() => document.getElementById('instantSurveyPanel')?.scrollIntoView({ block: 'start', behavior: 'smooth' }), 80);
                }
            }
            if (mode === 'attendance') ui.loadAttendanceView();
            if (mode === 'schedule' && typeof scheduleMgr !== 'undefined') scheduleMgr.load();
            if (mode === 'guide') { setTimeout(() => guideMgr.refresh(), 100); }
            if (mode === 'exam-timer') { setTimeout(() => examTimer.init(), 50); }
            if (mode === 'shuttle') {
                // 날짜 입력창 기본값: 오늘
                const dateEl = document.getElementById('shuttle-depart-date');
                if (dateEl && !dateEl.value) dateEl.value = getTodayString();
                // 기존 설정된 출발시간 불러오기
                if (state.room) {
                    firebase.database().ref(`courses/${state.room}/shuttle/departure`).once('value', snap => {
                        const dep = snap.val();
                        if (dep) {
                            if (dateEl) dateEl.value = dep.date || getTodayString();
                            const timeEl = document.getElementById('shuttle-depart-time');
                            if (timeEl && dep.time) timeEl.value = dep.time;
                        }
                    });
                }
            }

            if (mode === 'shuttle') {
                this.loadShuttleData();
                const badge = document.getElementById('shuttleNewBadge');
                if(badge) badge.style.display = 'none';
                firebase.database().ref(`courses/${state.room}/shuttle/departure`).once('value', snap => {
                    const dep = snap.val();
                    if(dep && dep.time) {
                        localStorage.setItem(`last_seen_shuttle_${state.room}`, `${dep.date} ${dep.time}`);
                    }
                });
            }
            if (mode === 'admin-action') ui.loadAdminActionData();
            if (mode === 'dinner-skip') ui.loadDinnerSkipData();
            if (mode === 'tablet-loan') ui.loadTabletLoanData();
            if (mode === 'students') ui.loadStudentList();
            
            if (mode === 'dormitory') {
                if (typeof ui.loadDormitoryData === 'function') ui.loadDormitoryData();
            }
        }

        // [옵저버 전용 보안 로직 유지]
        if (state.isObserver) {
            const dangerBtns = document.querySelectorAll('#btnReset, .btn-danger, .btn-del-mini');
            dangerBtns.forEach(b => b.style.display = 'none');

            const saveBtns = document.querySelectorAll('.btn-action, .m-btn-done, .navy-btn');
            saveBtns.forEach(b => {
                const t = b.innerText;
                if(t.includes('저장') || t.includes('적용') || t.includes('게시') || t.includes('등록') || t.includes('확인')) {
                    b.style.display = 'none';
                }
            });

            const quizCtrl = document.getElementById('quizControls');
            if(quizCtrl) quizCtrl.style.display = 'none';

            // 옵저버 헤더 배지를 공통 함수로 통일 (주황 '보기 전용' 배지)
            if (state.room) ui.updateHeaderRoom(state.room);
        }
    },

















// [수정] 차량 신청 명단 팝업: 취소 로직 연결 보완
showShuttleListModal: function(waveId, waveName, locName, members) {
    if (members.length === 0) return;
    const modal = document.getElementById('qaModal');
    const mText = document.getElementById('m-text');
    const mActions = document.querySelector('#qaModal .modal-actions');
    if(!modal || !mText) return;

    // 장소 ID 판별 (오송, 터미널, 공항, 자차)
    const locId = locName.includes('오송') ? 'osong' : 
                  locName.includes('터미널') ? 'terminal' : 
                  locName.includes('공항') ? 'airport' : 'car';

    mText.innerHTML = `
        <div style="text-align:left;">
            <div style="font-size:12px; color:#64748b; font-weight:700;">${waveName}</div>
            <div style="font-size:18px; font-weight:900; color:#003366; margin-bottom:15px; border-bottom:2px solid #f1f5f9; padding-bottom:8px;">
                ${locName} 신청 명단 (${members.length}명)
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:8px; max-height:300px; overflow-y:auto; padding:5px;">
                ${members.map(([token, name]) => `
                    <div class="member-tag" style="padding: 8px 12px; font-size:14px; background:#f8fafc; border:1px solid #e2e8f0; display:flex; align-items:center; border-radius:8px; font-weight:700;">
                        ${name} 
                        <i class="fa-solid fa-circle-xmark" 
                           onclick="event.stopPropagation(); ui.cancelIndividualShuttle('${waveId}', '${locId}', '${token}', '${name.split('(')[0]}')" 
                           style="margin-left:10px; color:#ef4444; cursor:pointer; font-size:18px;"></i>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    if(mActions) mActions.style.display = 'none';
    modal.style.display = 'flex';
    
    const closeHandler = (e) => { 
        if (e.target.id === 'qaModal' || e.target.tagName === 'BUTTON') { 
            if(mActions) mActions.style.display = 'flex'; 
            modal.removeEventListener('click', closeHandler); 
        } 
    };
    modal.addEventListener('click', closeHandler);
},






filterQa: function(f, event) { 
    // 1. 모든 필터 칩에서 활성화 색상 제거
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active')); 
    
    // 2. 내가 클릭한 칩에만 활성화 색상 부여
    if(event && event.target) event.target.classList.add('active'); 
    
    // 3. 현재 어떤 필터를 선택했는지 전역 state에 저장 (실시간 갱신용)
    state.currentQaFilter = f;
    
    // 4. 목록 다시 그리기
    this.renderQaList(f); 
},
















    // [6.22차 최종] 실시간 최적화 및 렌더링 안정화 버전
renderQaList: function(f) {
    const list = document.getElementById('qaList'); 
    if (!list) return;

    // 1. 현재 필터 상태 동기화 (전달인자가 있으면 우선 적용)
    if (f) state.currentQaFilter = f;
    const currentFilter = state.currentQaFilter || 'all';

    // 2. 데이터 유무 확인 (데이터가 없거나 null인 경우 대응)
    if (!state.qaData || Object.keys(state.qaData).length === 0) {
        list.innerHTML = `
            <div style="text-align:center; padding:100px 0; color:#94a3b8;">
                <i class="fa-regular fa-comment-dots" style="font-size:40px; margin-bottom:15px; opacity:0.3;"></i>
                <p style="font-weight:700;">아직 도착한 질문이 없습니다.</p>
            </div>`;
        return;
    }

    // 3. 데이터 가공 (필터링 및 정렬 준비)
    let items = Object.keys(state.qaData)
        .map(k => {
            const item = state.qaData[k];
            if (!item || !item.text) return null;
            return { 
                id: k, 
                text: item.text, 
                status: item.status || "normal", 
                likes: parseInt(item.likes || 0),
                timestamp: item.timestamp || Date.now(),
                subject: item.subject || "공통질문"
            };
        })
        .filter(i => i !== null && i.status !== 'delete'); 

    // 4. [필터 1] 과목/강사 필터 (subjectMgr 연동)
    if (subjectMgr.selectedFilter && subjectMgr.selectedFilter !== 'all') {
        items = items.filter(x => x.subject === subjectMgr.selectedFilter);
    }

    // 5. [필터 2] 상단 상태 탭 필터 (All, Pinned, Later)
    if (currentFilter === 'pin') {
        items = items.filter(i => i.status === 'pin' || i.status === 'pin-done');
    } else if (currentFilter === 'later') {
        items = items.filter(i => i.status === 'later');
    }
    
    // 6. 날짜별 그룹핑 + 당일 우선 정렬
    const todayStr = getTodayString();
    const toDateStr = (ts) => {
        const d = new Date(ts);
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    };
    const toDateLabel = (dStr) => {
        if (dStr === todayStr) return '📅 오늘';
        const d = new Date(dStr);
        const days = ['일','월','화','수','목','금','토'];
        return `${d.getMonth()+1}/${d.getDate()}(${days[d.getDay()]})`;
    };

    // 날짜별 그룹 생성
    const groups = {};
    items.forEach(i => {
        const dStr = toDateStr(i.timestamp);
        if (!groups[dStr]) groups[dStr] = [];
        groups[dStr].push(i);
    });

    // 각 그룹 내 정렬: pin > later > 좋아요 > 최신
    const w = s => s==='pin'?3:s==='later'?2:s==='normal'?1:0;
    Object.values(groups).forEach(g => {
        g.sort((a, b) => {
            const wd = w(b.status) - w(a.status);
            if (wd !== 0) return wd;
            if (b.likes !== a.likes) return b.likes - a.likes;
            return b.timestamp - a.timestamp;
        });
    });

    // 날짜 내림차순 (최신 날짜 먼저)
    const sortedDates = Object.keys(groups).sort((a, b) => b.localeCompare(a));

    // 7. HTML 빌드 — 날짜별 섹션으로 구성
    let htmlBuffer = "";
    const now = Date.now();

    const buildCard = (i) => {
        try {
            const s = i.status;
            const isDone = (s === 'done' || s === 'pin-done');
            let cls = "", icon = "";
            if (s === 'pin' || s === 'pin-done') { cls = "status-pin"; icon = "📌 "; }
            else if (s === 'later') { cls = "status-later"; icon = "⚠️ "; }
            else if (isDone) { cls = "status-done"; icon = "✅ "; }

            const isNew = (now - i.timestamp) < 120000;
            const newBadge = isNew ? '<span class="new-badge-icon">NEW</span>' : '';

            let targetName = String(i.subject);
            let displayName = targetName;
            const titles = ["본부장","공항장","센터장","부장","차장","과장","주임","교수","강사"];
            const hasTitle = titles.some(t => targetName.includes(t));
            if (targetName !== '공통질문' && targetName !== '일반' && !hasTitle) {
                displayName = targetName + " 강사님";
            } else if (hasTitle && !targetName.includes("님")) {
                displayName = targetName + "님";
            }

            return `
            <div class="q-card ${cls} ${isNew ? 'is-new' : ''}" onclick="ui.openQaModal('${i.id}')">
                <div class="q-content" style="display:flex; align-items:flex-start; gap:8px; flex:1; min-width:0;">
                    <span style="flex-shrink:0; display:inline-flex; align-items:center; gap:4px;">
                        ${newBadge}
                        <span style="background:#eff6ff; color:#3b82f6; font-size:10px; padding:2px 7px; border-radius:4px; border:1px solid #dbeafe; font-weight:800; white-space:nowrap;">To. ${displayName}</span>
                    </span>
                    <span style="flex:1; min-width:0; word-break:break-word; ${isDone ? 'text-decoration:line-through; opacity:0.6;' : ''}">
                        ${icon}${i.text}
                        <button class="btn-translate" onclick="event.stopPropagation(); ui.translateQa('${i.id}')" title="번역">
                            <i class="fa-solid fa-language"></i> 번역
                        </button>
                    </span>
                </div>
                <div class="q-meta">
                    <div class="q-like-badge">👍 ${i.likes}</div>
                    <div class="q-time">${new Date(i.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
                </div>
            </div>`;
        } catch(err) { return ''; }
    };

    sortedDates.forEach((dStr, idx) => {
        const grp = groups[dStr];
        const isToday = (dStr === todayStr);
        const label = toDateLabel(dStr);
        const cnt = grp.length;
        const doneCnt = grp.filter(i => i.status === 'done' || i.status === 'pin-done').length;

        if (isToday) {
            // 오늘: 머리말 없이 카드만 바로 표시
            grp.forEach(i => { htmlBuffer += buildCard(i); });
        } else {
            // 과거 날짜: 접기/펼치기 아코디언
            const uid = 'qa_grp_' + dStr.replace(/-/g,'');
            htmlBuffer += `
            <div style="margin:8px 0 2px;">
                <button onclick="ui.toggleQaGroup('${uid}')"
                    style="width:100%; display:flex; align-items:center; gap:10px; padding:8px 12px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; cursor:pointer; text-align:left;">
                    <i id="${uid}_icon" class="fa-solid fa-chevron-right" style="color:#94a3b8; font-size:12px; transition:transform 0.2s;"></i>
                    <span style="font-weight:800; color:#475569; font-size:14px;">${label}</span>
                    <span style="font-size:12px; color:#94a3b8; font-weight:600;">${cnt}건</span>
                    ${doneCnt > 0 ? `<span style="font-size:11px; color:#10b981; font-weight:700;">✅ ${doneCnt}건 답변</span>` : ''}
                    <span style="margin-left:auto; font-size:11px; color:#cbd5e1;">클릭하여 펼치기</span>
                </button>
                <div id="${uid}" style="display:none; flex-direction:column; gap:14px; padding-top:10px;">
                    ${grp.map(buildCard).join('')}
                </div>
            </div>`;
        }
    });

    // 8. 최종 반영
    list.innerHTML = htmlBuffer || `
        <div style="text-align:center; padding:80px 0; color:#94a3b8;">
            <p>조건에 맞는 질문이 없습니다.</p>
        </div>`;
},

    // Q&A 날짜 그룹 펼치기/접기
    toggleQaGroup: function(uid) {
        const box = document.getElementById(uid);
        const icon = document.getElementById(uid + '_icon');
        if(!box) return;
        const isOpen = box.style.display !== 'none';
        box.style.display = isOpen ? 'none' : 'flex';
        if(icon) icon.style.transform = isOpen ? '' : 'rotate(90deg)';
    },


















    
    openQaModal: function(k) { 
        state.activeQaKey=k; 
        document.getElementById('m-text').innerText=state.qaData[k].text; 
        document.getElementById('qaModal').style.display='flex'; 
    },
    
    closeQaModal: function(e) { 
        if (!e || e.target.id === 'qaModal' || e.target.tagName === 'BUTTON') {
            document.getElementById('qaModal').style.display = 'none'; 
        }
    },
    
    openPwModal: function() { 
        document.getElementById('changePwModal').style.display='flex'; 
    },
    
    closePwModal: function() { 
        document.getElementById('changePwModal').style.display='none'; 
    },
    
    // 출석 현황 숫자 클릭 → 관리 팝업(미완료자 확인 / 출석부 인쇄) 열기
    openAttendanceActions: function() {
        if(!state.room) return ui.showAlert("강의실을 먼저 선택해주세요.");
        const m=document.getElementById('attendanceActionsModal'); if(m) m.style.display='flex';
    },

    // 전체 출석부 관리/인쇄 (attendance_sheet.html 연결)
    openFullAttendanceSheet: function() {
        if(!state.room) return ui.showAlert("강의실을 먼저 선택해주세요.");
        window.open(`attendance_sheet.html?room=${state.room}`, '_blank');
    },

    openMissingAttendanceModal: async function() {
        if(!state.room) return ui.showAlert("강의실을 먼저 선택해주세요.");
        const modal = document.getElementById('missingAttendanceModal');
        const listEl = document.getElementById('missingAttendanceList');
        const summaryEl = document.getElementById('missingAttendanceSummary');
        if (!modal || !listEl || !summaryEl) return;

        modal.style.display = 'flex';
        summaryEl.innerText = '확인 중...';
        listEl.innerHTML = '<div style="padding:28px; text-align:center; color:#94a3b8; font-weight:800;">데이터를 불러오는 중...</div>';

        const today = getTodayString();
        try {
            const [studentSnap, attendSnap] = await Promise.all([
                firebase.database().ref(`courses/${state.room}/students`).once('value'),
                firebase.database().ref(`courses/${state.room}/internal_attendance/${today}`).once('value')
            ]);
            const students = studentSnap.val() || {};
            const attendees = attendSnap.val() || {};
            const attendedKeys = new Set(Object.keys(attendees));
            const seen = new Set();
            const expected = [];

            Object.entries(students).forEach(([token, s]) => {
                if (!s || !s.name || s.name === 'undefined') return;
                const name = String(s.name || '').trim();
                const tokenId = String(token || '').includes('_') ? String(token).split('_').slice(1).join('_') : '';
                const phoneDigits = String(s.phone || '').replace(/\D/g, '');
                const phoneLooksMobile = /^010\d{7,8}$/.test(phoneDigits);
                const id = String(s.empNo || s.employeeNo || s.id || s.studentId || (phoneLooksMobile ? tokenId : s.phone) || tokenId || '').trim();
                const key = `${name}_${id}`;
                const fallbackKey = token || key;
                if (seen.has(fallbackKey)) return;
                seen.add(fallbackKey);
                expected.push({ name, id: id || '-', key, token: fallbackKey });
            });

            const missing = expected
                .filter(s => !attendedKeys.has(s.key) && !attendedKeys.has(s.token))
                .sort((a,b) => a.name.localeCompare(b.name));

            summaryEl.innerText = `오늘 자체 출결 기준 · 완료 ${expected.length - missing.length}명 / 전체 ${expected.length}명 · 미완료 ${missing.length}명`;
            if (!expected.length) {
                listEl.innerHTML = '<div style="padding:28px; text-align:center; color:#94a3b8; font-weight:800;">수강생 명단이 없습니다.</div>';
                return;
            }
            if (!missing.length) {
                listEl.innerHTML = '<div style="padding:32px; text-align:center; color:#10b981; font-size:18px; font-weight:900;"><i class="fa-solid fa-circle-check"></i><br>모두 출석 완료했습니다.</div>';
                return;
            }
            listEl.innerHTML = missing.map((s, i) => `
                <div style="display:flex; align-items:center; gap:12px; padding:12px 14px; background:#fff; border:1px solid #e2e8f0; border-radius:11px; margin-bottom:8px;">
                    <div style="width:28px; height:28px; border-radius:50%; background:#fffbeb; color:#d97706; display:flex; align-items:center; justify-content:center; font-weight:900; flex-shrink:0;">${i + 1}</div>
                    <div style="flex:1; min-width:0;">
                        <div style="font-size:15px; color:#0f172a; font-weight:900;">${s.name}</div>
                        <div style="font-size:12px; color:#64748b; font-weight:700; margin-top:2px;">식별ID: ${s.id || '-'}</div>
                    </div>
                    <span style="font-size:12px; color:#b45309; background:#fffbeb; border:1px solid #fde68a; padding:5px 9px; border-radius:999px; font-weight:900;">미완료</span>
                </div>
            `).join('');
        } catch(e) {
            console.error('[자체출결 미완료자]', e);
            summaryEl.innerText = '미완료자 확인 실패';
            listEl.innerHTML = `<div style="padding:28px; text-align:center; color:#ef4444; font-weight:800;">데이터를 불러오지 못했습니다.<br>${e.message || e}</div>`;
        }
    },

    toggleNightMode: function() { 
        document.body.classList.toggle('night-mode'); 
        const n = document.body.classList.contains('night-mode');
        // [J2] 아이콘 요소가 없는 화면에서도 오류 없이 동작하도록 널가드 (구버전 잔재 안전화)
        var _iS = document.getElementById('iconSun');  if (_iS) _iS.classList.toggle('active', !n);
        var _iM = document.getElementById('iconMoon'); if (_iM) _iM.classList.toggle('active', n);
    },
    
    toggleRightPanel: function() { 
        document.getElementById('rightPanel').classList.toggle('open'); 
    },
    
    toggleFullScreen: function() {
        const doc = document.documentElement;
        if (!document.fullscreenElement && !document.webkitFullscreenElement) {
            // 전체화면 진입
            if (doc.requestFullscreen) doc.requestFullscreen();
            else if (doc.webkitRequestFullscreen) doc.webkitRequestFullscreen();
            else if (doc.mozRequestFullScreen) doc.mozRequestFullScreen();
            else if (doc.msRequestFullscreen) doc.msRequestFullscreen();
        } else {
            // 전체화면 해제
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
        }
    },
    
    translateQa: function(id) {
        if (!state.qaData[id]) return;
        const text = state.qaData[id].text;
        const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
        const targetLang = hasKorean ? 'en' : 'ko';
        const url = `https://translate.google.com/?sl=auto&tl=${targetLang}&text=${encodeURIComponent(text)}&op=translate`;
        window.open(url, 'googleTranslatePopup', 'width=1000,height=600');
    },
    
// [강사 플랫폼: 초기 대기 화면 설정 - 흐릿한 배경 완벽 제거 버전]
    showWaitingRoom: function() {
        this.hideLoading();
        // 방 미선택 상태 - 하단 버튼 비활성화
        this.renderRoomStatus('idle');
        state.room = null; // 메모리상 방 정보 완전 삭제
        
        // 1. 흐릿한 잠금 화면(overlay) 강제 숨김
        const overlay = document.getElementById('statusOverlay');
        if (overlay) overlay.style.setProperty('display', 'none', 'important');
        
        // 2. 인증 팝업창 닫기
        const takeoverModal = document.getElementById('takeoverModal');
        if (takeoverModal) takeoverModal.style.display = 'none';

        // 3. 상단 바 텍스트 및 배지 초기화
        const roomNameEl = document.getElementById('displayRoomName');
        if(roomNameEl) roomNameEl.innerText = "";
        document.querySelectorAll('.room-badge-global').forEach(b => b.innerText = "");
        
        // 4. 탭 메뉴 숨기기
        const tabs = document.querySelector('.mode-tabs');
        if(tabs) tabs.style.display = 'none'; 
        
        // 5. 모든 뷰 숨기고 홈 화면 표시
        document.querySelectorAll('[id^="view-"]').forEach(v => {
            v.style.display = 'none';
        });
        const viewHome = document.getElementById('view-home');
        if(viewHome) viewHome.style.display = 'flex';
        // [사이드바 버튼] 통합 현황판(홈) 확정: '교수님 프로필 수정'(노란색)
        const _spbHome = document.getElementById('btnSetupModal');
        if (_spbHome) {
            _spbHome.innerHTML = '<i class="fa-solid fa-user-pen"></i> 교수님 프로필 수정';
            _spbHome.classList.add('btn-prof-mode');
            _spbHome.disabled = false;
            _spbHome.style.pointerEvents = 'auto';
            _spbHome.style.setProperty('opacity', '1', '');
            _spbHome.title = '교수님별 프로필(사진·연락처·약력 등)을 수정합니다';
        }
        setTimeout(() => { if(typeof ui.loadHomeStats==='function') ui.loadHomeStats(); }, 200);

        // 6. 왼쪽 룸 선택 메뉴 "Select Room"으로 강제 고정
        const sel = document.getElementById('roomSelect');
        if(sel) sel.value = "";
    },





    loadAdminActionData: function() {
        if(!state.room) return;
        const today = getTodayString();
        const yesterday = getYesterdayString();
        const activeRoom = state.room;

        const tbody = document.getElementById('adminActionTableBody');
        if(!tbody) return;

        if (state.adminActionRef) state.adminActionRef.off();
        if (state.adminActionYesterdayRef) state.adminActionYesterdayRef.off();

        state.adminActionRef = firebase.database().ref(`courses/${activeRoom}/admin_actions/${today}`);
        state.adminActionYesterdayRef = firebase.database().ref(`courses/${activeRoom}/admin_actions/${yesterday}`);
        let todayData = {};
        let yesterdayData = {};

        state.adminActionRef.on('value', snap => {
            if (state.room !== activeRoom) return;
            todayData = snap.val() || {};
            renderAdminList(todayData, yesterdayData);
        });
        // 외출/외박 운영일은 익일 09:00까지이므로 전일 노드도 별도 실시간 감시한다.
        state.adminActionYesterdayRef.on('value', snap => {
            if (state.room !== activeRoom) return;
            yesterdayData = snap.val() || {};
            renderAdminList(todayData, yesterdayData);
        });
   

function renderAdminList(todayData, yesterdayData) {
            tbody.innerHTML = ""; 
            let count = 1;

            // 1. 데이터를 하나로 합쳐서 배열로 변환
            const combinedList = [];
            Object.keys(yesterdayData).forEach(token => {
                combinedList.push({ ...yesterdayData[token], token, isYesterday: true });
            });
            Object.keys(todayData).forEach(token => {
                combinedList.push({ ...todayData[token], token, isYesterday: false });
            });

            // 1-2. [09:00 운영일 윈도우] 자정이 아닌 익일 09:00 기준으로만 '금일' 신청 표시
            const _w = getOutingWindowKST();
            const windowed = combinedList.filter(it => { const ts = it.timestamp || 0; return ts >= _w.start && ts < _w.end; });

            // 2. 가나다순(이름순) 정렬 실행
            windowed.sort((a, b) => a.name.localeCompare(b.name));

            if (windowed.length === 0) {
                tbody.innerHTML = "<tr><td colspan='6' style='padding:50px; color:#94a3b8;'>신청 내역이 없습니다.</td></tr>";
                return;
            }

            // 3. 정렬된 리스트를 화면에 출력
            windowed.forEach(item => {
                appendRow(item, item.isYesterday, item.token);
            });

            function appendRow(item, isYesterday, token) {
                const typeNm = item.type === 'group_outing' ?
                    '<span style="background:#7c3aed; color:white; padding:2px 7px; border-radius:6px; font-size:11px; font-weight:800;">단체외출</span>' :
                    item.type === 'outing' ? 
                    '<span style="color:#f59e0b; font-weight:bold;">외출</span>' : 
                    '<span style="color:#ef4444; font-weight:bold;">외박</span>';
                
                const datePrefix = isYesterday ? '<small style="color:#94a3b8;">[어제]</small> ' : '';
                const timeStr = new Date(item.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
                const targetDate = isYesterday ? getYesterdayString() : getTodayString();

                // 복귀 여부 / 미복귀(held) 표시
                const isHeld = item.held === true;                                  // 미복귀 처리됨(자동복귀 제외)
                const isReturned = !isHeld && (item.returned === true || !!item.returnReportTime);
                let returnedBadge;
                if (isHeld) {
                    returnedBadge = '<span style="color:#dc2626; font-weight:800; font-size:12px;">🚫 미복귀</span>';
                } else if (isReturned && item.autoReturn) {
                    returnedBadge = '<span style="color:#0891b2; font-weight:800; font-size:12px;">✅ 복귀완료(자동)</span>';
                } else if (isReturned) {
                    returnedBadge = '<span style="color:#10b981; font-weight:800; font-size:12px;">✅ 복귀완료</span>';
                } else {
                    returnedBadge = '<span style="color:#f59e0b; font-weight:800; font-size:12px;">⏳ 대기</span>';
                }
                // 미복귀 체크박스: 이미 복귀완료한 사람은 표시하지 않음
                const holdCellHtml = isReturned
                    ? ''
                    : `<div style="margin-top:5px;"><label style="display:inline-flex; align-items:center; gap:4px; cursor:pointer; font-size:11px; color:#dc2626; font-weight:700;"><input type="checkbox" ${isHeld ? 'checked' : ''} data-hold-token="${token}" data-hold-date="${targetDate}" style="cursor:pointer; accent-color:#dc2626; width:15px; height:15px; margin:0;"> 미복귀</label></div>`;

                // tr 생성 (innerHTML 따옴표 충돌 방지 위해 DOM API 사용)
                const returnedStr = isReturned ? 'true' : 'false';
                const tr = document.createElement('tr');
                tr.dataset.token = token;
                tr.dataset.returned = returnedStr;

                tr.innerHTML = `
                    <td>${count++}</td>
                    <td>${datePrefix}${typeNm}</td>
                    <td style="font-weight:bold;">${item.name}</td>
                    <td style="white-space:nowrap;">${item.phone}</td>
                    <td style="color:#94a3b8; font-size:13px; white-space:nowrap;">${timeStr}</td>
                    <td style="text-align:center;">${returnedBadge}${holdCellHtml}</td>
                    <td>
                        <button class="btn-table-action cancel-btn" style="background-color:#64748b; font-size:11px; padding:5px 8px;" data-cancel-token="${token}" data-cancel-date="${targetDate}">
                            취소
                        </button>
                    </td>
                `;

                // 이벤트 바인딩 (onclick 문자열 대신 addEventListener)
                const cancelBtn = tr.querySelector('[data-cancel-token]');
                if (cancelBtn) {
                    cancelBtn.addEventListener('click', () => ui.cancelIndividualAdminAction(targetDate, token));
                }
                // 미복귀 체크박스 이벤트 바인딩
                const holdBox = tr.querySelector('[data-hold-token]');
                if (holdBox) {
                    holdBox.addEventListener('change', () => ui.setOutingHold(targetDate, token, holdBox.checked, holdBox));
                }

                tbody.appendChild(tr);
            }
        } 
    },

loadDinnerSkipData: function() {
        if(!state.room) return;
        const today = getTodayString();
        const activeRoom = state.room;
        if (state.dinnerSkipRef) state.dinnerSkipRef.off();
        state.dinnerSkipRef = firebase.database().ref(`courses/${activeRoom}/dinner_skips/${today}`);
        state.dinnerSkipRef.on('value', snap => {
            if (state.room !== activeRoom) return;
            const data = snap.val() || {};
            const tbody = document.getElementById('dinnerSkipTableBody');
            if(!tbody) return;
            
            const tokens = Object.keys(data);
            const totalEl = document.getElementById('dinnerSkipTotal');
            if(totalEl) totalEl.innerText = tokens.length;

            // [정렬 로직 추가] 데이터를 이름순으로 먼저 정렬합니다.
            const sortedList = tokens.map(token => ({
                token: token,
                nameStr: data[token]
            })).sort((a, b) => a.nameStr.localeCompare(b.nameStr));

            // 정렬된 리스트(sortedList)를 화면에 출력합니다.
            tbody.innerHTML = sortedList.length ? 
                sortedList.map((item, idx) => `
                    <tr>
                        <td>${idx+1}</td>
                        <td style="font-weight:bold;">${item.nameStr}</td>
                        <td style="color:#ef4444; font-weight:800;">석식 미취식</td>
                        <td>
                            <button class="btn-table-action" onclick="ui.cancelIndividualDinnerSkip('${item.token}')" 
                                    style="background-color:#64748b; font-size:11px; padding:5px 8px;">
                                제외 취소
                            </button>
                        </td>
                    </tr>
                `).join('') : 
                "<tr><td colspan='4' style='padding:50px; color:#94a3b8;'>제외 신청자가 없습니다.</td></tr>";
        });
    },

// [신규] 태블릿 대여 신청 현황 로드
loadTabletLoanData: function() {
    if(!state.room) return;
    firebase.database().ref(`courses/${state.room}/tablet_loans`).on('value', snap => {
        const data = snap.val() || {};
        const tbody = document.getElementById('tabletLoanTableBody');
        if(!tbody) return;

        const totalEl = document.getElementById('tabletLoanTotal');
        const tokens = Object.keys(data);
        if(totalEl) totalEl.innerText = tokens.length;

        if(tokens.length === 0) {
            tbody.innerHTML = "<tr><td colspan='5' style='padding:50px; color:#94a3b8;'>태블릿 대여 신청자가 없습니다.</td></tr>";
            return;
        }

        const sorted = tokens.map(token => ({ token, ...data[token] }))
            .sort((a, b) => (a.name || '').localeCompare(b.name || ''));

        tbody.innerHTML = sorted.map((item, idx) => {
            const time = item.timestamp ? new Date(item.timestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) : '-';
            const name = item.name || '-';
            const phone = item.phone || '-';
            return `<tr>
                <td style="text-align:center; color:#94a3b8; font-size:14px;">${idx + 1}</td>
                <td style="text-align:center; font-weight:800; font-size:16px; color:#1e293b;">
                    <span style="display:inline-flex; align-items:center; gap:8px;">
                        <i class="fa-solid fa-tablet-screen-button" style="color:#6366f1; font-size:13px;"></i>
                        ${name}
                    </span>
                </td>
                <td style="text-align:center; font-size:15px; font-weight:700; color:#475569;">${phone}</td>
                <td style="text-align:center; font-size:14px; color:#64748b;">${time}</td>
                <td style="text-align:center;">
                    <button onclick="ui.cancelTabletLoan('${item.token}')"
                        style="background:#ede9fe; color:#6366f1; border:none; border-radius:8px; padding:8px 16px; font-size:13px; font-weight:800; cursor:pointer;">
                        신청 취소
                    </button>
                </td>
            </tr>`;
        }).join('');
    });
},

// [신규] 태블릿 대여 신청 개별 취소
cancelTabletLoan: function(token) {
    if(state.isObserver) return ui.showAlert("👁️ 옵저버는 취소할 수 없습니다.");
    if(!confirm("이 학생의 태블릿 대여 신청을 취소하시겠습니까?")) return;
    firebase.database().ref(`courses/${state.room}/tablet_loans/${token}`).remove()
        .then(() => { ui.showAlert("✅ 태블릿 대여 신청이 취소되었습니다."); });
},

// [신규] 특정 학생 한 명만 석식 제외 명단에서 삭제 (식사 가능 상태로 복구)
cancelIndividualDinnerSkip: function(token) {
        if(state.isObserver) return ui.showAlert("👁️ 옵저버는 석식 제외 신청을 취소할 수 없습니다.");
        if(!confirm("이 학생을 석식 제외 명단에서 삭제하시겠습니까?")) return;
        const today = getTodayString();
        firebase.database().ref(`courses/${state.room}/dinner_skips/${today}/${token}`).remove()
            .then(() => { ui.showAlert("✅ 해당 학생이 제외 명단에서 삭제되었습니다."); });
    },

    // [삭제됨] 복귀호출 기능(callReturnToStudent / callAllNotReturned)은 요청에 따라 제거되었습니다.

    // [신규] 특정 학생의 외출/외박 신청을 관리자가 강제 취소(삭제)
cancelIndividualAdminAction: function(date, token) {
        if(state.isObserver) return ui.showAlert("👁️ 옵저버는 신청 내역을 삭제할 수 없습니다.");
        if(!confirm("해당 외출/외박 신청을 취소하시겠습니까?")) return;
        firebase.database().ref(`courses/${state.room}/admin_actions/${date}/${token}`).remove()
            .then(() => { ui.showAlert("✅ 신청 내역이 삭제되었습니다."); });
    },

    // [신규] 외출/외박 미복귀 처리 — 교육운영부와 동일한 held 플래그 사용
    //  held:true → 자동 복귀완료(다음날 08:59) 제외 + 외출외박일지에 [미복귀] 이력
    setOutingHold: function(date, token, checked, boxEl) {
        if(!state.room) { if(boxEl) boxEl.checked = !checked; return; }
        if(state.isObserver) { if(boxEl) boxEl.checked = !checked; return ui.showAlert("👁️ 옵저버는 미복귀 처리를 할 수 없습니다."); }
        const ref = firebase.database().ref(`courses/${state.room}/admin_actions/${date}/${token}`);
        if(checked) {
            if(!confirm("해당 교육생을 미복귀로 표시할까요?\n\n사고·복귀 미완료 등에 사용합니다.\n표시하면 자동 복귀완료가 적용되지 않고, 외출외박일지에 미복귀로 기록됩니다.")) {
                if(boxEl) boxEl.checked = false;   // 취소 시 체크 원복
                return;
            }
            ref.update({ held:true, returned:null, autoReturn:null });
        } else {
            ref.update({ held:null });
        }
    },


// [수정] 차량 신청 개별 취소: 취소 후 즉시 팝업 닫고 화면 갱신
cancelIndividualShuttle: function(waveId, locId, token, name) {
    if(!confirm(`[${name}]님의 차량 신청을 취소하시겠습니까?`)) return;
    
    const rPath = `courses/${state.room}/shuttle/out`;
    
    // 만약 waveId가 'both'(자차)라면 wave1, wave2 양쪽 다 확인해서 삭제
    if(waveId === 'both') {
        firebase.database().ref(`${rPath}/wave1/${locId}/${token}`).remove();
        firebase.database().ref(`${rPath}/wave2/${locId}/${token}`).remove();
    } else {
        firebase.database().ref(`${rPath}/${waveId}/${locId}/${token}`).remove();
    }

    ui.showAlert("✅ 취소되었습니다.");
    
    // [핵심] 팝업창을 닫아버려서 데이터가 남은것처럼 보이는 현상 해결
    document.getElementById('qaModal').style.display = 'none';
    
    // 배경 화면 데이터 갱신 (이미 리스너가 작동중이겠지만 확실히 하기 위해 호출)
    ui.loadShuttleData();
},






// [JDS260613] 운영부(로컬)·지원부(UTC) 주차키 후보 계산 — 지원부 명단(system/dorm/rosters/{wk}__{room}) 직접 조회용
    _weekKeyCandidates: function(startStr) {
        if (!startStr) return [];
        const d = new Date(startStr + 'T00:00:00');
        if (isNaN(d)) return [];
        const dow = (d.getDay() + 6) % 7;
        const mon = new Date(d); mon.setDate(d.getDate() - dow);
        const utc = mon.toISOString().slice(0, 10);
        const local = `${mon.getFullYear()}-${String(mon.getMonth()+1).padStart(2,'0')}-${String(mon.getDate()).padStart(2,'0')}`;
        return Array.from(new Set([local, utc]));
    },

    // [JDS260613] 운영부(coordRoster)·지원부(system/dorm/rosters) 명단 이름을 직접 수집 — 재저장 없이도 명단 표시
    _gatherRosterNames: async function(room) {
        const names = [];
        // [명단 통일] 지원부 명단(system/dorm/rosters)을 '과정명'으로 매칭 — 주차·방 키 차이와 무관하게 정확히 조회.
        try {
            const cs = await firebase.database().ref(`courses/${room}/settings/courseName`).once('value');
            const cn = String(cs.val() || '').trim();
            if (!cn) return names;
            const ds = await firebase.database().ref('system/dorm/rosters').once('value');
            const all = ds.val() || {};
            let best = null;
            for (const k in all) { const dv = all[k]; if (dv && Array.isArray(dv.list) && dv.list.length && String(dv.courseName||'').trim() === cn) { if (!best || (dv.updatedAt||0) > (best.updatedAt||0)) best = dv; } }
            if (best) best.list.forEach(s => { if (s && s.name) names.push(String(s.name).trim()); });
        } catch (e) { /* 무시 */ }
        return names;
    },

    loadStudentList: function() {
        if(!state.room) return;
        const room = state.room;
        const self = this;
        const expectedRef = firebase.database().ref(`courses/${room}/expectedStudents`);
        const actualRef = firebase.database().ref(`courses/${room}/students`);
        expectedRef.off(); actualRef.off();

        let lastExpected = [];
        let lastActual = {};

        // [JDS260613] 운영부(coursRoster)·지원부(system/dorm/rosters) 명단 이름을 직접 읽어 '예정' 명단에 병합.
        //  → 강사가 별도 .txt 업로드/재저장을 하지 않아도, 운영부·지원부에서 올린 명단이 바로 '미입교'로 표시됨.
        async function gatherRosterNames() {
            const names = [];
            // [명단 통일] 지원부 명단을 '과정명'으로 매칭 (주차·방 키 차이 무관)
            try {
                const cs = await firebase.database().ref(`courses/${room}/settings/courseName`).once('value');
                const cn = String(cs.val() || '').trim();
                if (!cn) return names;
                const ds = await firebase.database().ref('system/dorm/rosters').once('value');
                const all = ds.val() || {};
                let best = null;
                for (const k in all) { const dv = all[k]; if (dv && Array.isArray(dv.list) && dv.list.length && String(dv.courseName||'').trim() === cn) { if (!best || (dv.updatedAt||0) > (best.updatedAt||0)) best = dv; } }
                if (best) best.list.forEach(s => { if (s && s.name) names.push(String(s.name).trim()); });
            } catch (e) { /* 무시 */ }
            return names;
        }

        async function render() {
            if (state.room !== room) return;
            const tbody = document.getElementById('studentListTableBody');
            if (!tbody) return;

            const rosterNames = await gatherRosterNames();
            if (state.room !== room) return;

            const expectedNames = Array.from(new Set(
                [...(lastExpected || []), ...rosterNames].map(n => String(n).trim()).filter(Boolean)
            ));
            const data = lastActual || {};

            const actualStudents = Object.keys(data).map(key => ({ token: key, ...data[key] }))
                                         .filter(s => s.name && s.name !== "undefined");
            const actualNames = actualStudents.map(s => s.name);
            const combinedNames = Array.from(new Set([...expectedNames, ...actualNames])).sort((a,b) => a.localeCompare(b));

            tbody.innerHTML = "";
            let arrivedCount = 0;

            combinedNames.forEach((name, idx) => {
                    const sList = actualStudents.filter(student => student.name === name);
                    const isArrived = sList.length > 0;
                    const studentData = isArrived ? sList[0] : null;
                    const isOnline = isArrived && studentData.isOnline === true;
                    const isLeader = isArrived && studentData.isLeader === true;
                    const isExpected = expectedNames.includes(name); // 명단 업로드 여부

                    if(isArrived) arrivedCount++;

                    // 입교 방식 배지
                    let arrivalBadge = '';
                    if (isArrived) {
                        if (isExpected) {
                            // 명단 등록: 노트 아이콘 (fa-book-open)
                            arrivalBadge = '<i class="fa-solid fa-book-open" title="명단 등록 입교" style="font-size:13px; color:#059669; margin-left:5px;"></i>';
                        } else {
                            // QR 신규: QR 아이콘 (fa-qrcode)
                            arrivalBadge = '<i class="fa-solid fa-qrcode" title="QR 신규 입교" style="font-size:13px; color:#059669; margin-left:5px;"></i>';
                        }
                    }

                    const leaderBtnStyle = isLeader 
                        ? 'background: #3b82f6; color: white; border: none; font-weight: 800;'
                        : 'background: #f1f5f9; color: #94a3b8; border: 1px solid #e2e8f0; font-weight: 500;';

                    tbody.innerHTML += `
                        <tr class="${isLeader ? 'is-leader-row' : ''}">
                            <td>${idx + 1}</td>
                            <td style="text-align:center;">
                                <div style="display:inline-flex; align-items:center; gap:8px;">
                                    <span style="color:${isOnline ? '#22c55e' : '#cbd5e1'};">●</span>
                                    <span style="font-weight:800;">${isLeader ? '👑 ' : ''}${name}</span>
                                </div>
                            </td>
                            <td>
                                <span class="status-badge ${isArrived ? 'status-arrived' : 'status-wait'}">${isArrived ? '입교 완료' : '미입교'}</span>
                                ${arrivalBadge}
                            </td>
                            <td style="color:#94a3b8; font-size:13px;">${isArrived ? (isOnline ? '접속 중' : '오프라인') : '-'}</td>
                            <td>
                                ${isArrived ? `
                                    <div style="display:flex; gap:5px; justify-content:center;">
                                        <!-- 클릭 시 toggleLeader 함수 실행 -->
                                        <button class="btn-table-action" onclick="dataMgr.toggleLeader('${studentData.token}', '${name}')" 
                                                style="padding:5px 10px; font-size:11px; border-radius:6px; cursor:pointer; ${leaderBtnStyle}">
                                            학생장
                                        </button>
                                        <button class="btn-table-action" onclick="dataMgr.deleteStudent('${studentData.token}')"
                                                style="background:#ef4444; color:white; padding:5px 10px; border-radius:6px; font-size:11px; border:none; cursor:pointer;">삭제</button>
                                        ${sList.length > 1 ? `<button class="btn-table-action" onclick="dataMgr.resolveOverlap('${encodeURIComponent(name)}')" title="같은 이름이 ${sList.length}번 중복 등록됨(일자 변경 등) — 정리하기" style="background:#f59e0b; color:#fff; padding:5px 10px; border-radius:6px; font-size:11px; border:none; cursor:pointer; font-weight:800;"><i class="fa-solid fa-triangle-exclamation" style="margin-right:3px;"></i>오버랩 ${sList.length}</button>` : ''}
                                    </div>
                                ` : `<button class="btn-table-action" onclick="dataMgr.deleteExpectedName('${encodeURIComponent(name)}')" style="background:#fff; color:#ef4444; border:1px solid #fecaca; padding:5px 10px; border-radius:6px; font-size:11px; cursor:pointer;">명단삭제</button>`}
                            </td>
                        </tr>`;
                });
                const total = combinedNames.length;
                const percent = total > 0 ? Math.round((arrivedCount / total) * 100) : 0;
                const statusEl = document.getElementById('arrivalStatusSmall');
                if(statusEl) statusEl.innerText = `${arrivedCount} / ${total} 명 (${percent}%)`;
                const _plan = expectedNames.length;
                const sb = document.getElementById('stuSummaryBar');
                if (sb) {
                    const cell = (label, val, color, bg, bd) => '<div style="flex:1;background:'+bg+';border:1.5px solid '+bd+';border-radius:14px;padding:14px 10px;text-align:center;box-shadow:0 2px 8px rgba(15,23,42,.06);">'
                        +'<div style="font-size:12px;font-weight:800;color:#475569;margin-bottom:4px;">'+label+'</div>'
                        +'<div style="font-size:30px;font-weight:900;color:'+color+';line-height:1;">'+val+'</div></div>';
                    sb.innerHTML = cell('예정 인원', _plan, '#334155', '#f8fafc', '#e8edf3')
                        + cell('입교 완료', arrivedCount, '#2563eb', '#f8fafc', '#e8edf3')
                        + cell('입교율', percent + '<span style=\'font-size:15px;\'>%</span>', '#2563eb', '#f8fafc', '#e8edf3');
                }
        }

        expectedRef.on('value', snap => { lastExpected = snap.val() || []; render(); });
        actualRef.on('value', snap => { lastActual = snap.val() || {}; render(); });
    },







// [추가 1] 생활관 중복 제거 및 데이터 로드 함수
loadDormitoryData: function() {
        if(!state.room) return;
        const room = state.room;
        const self = this;
        const tbody = document.getElementById('dormitoryTableBody');
        const statusEl = document.getElementById('dormArrivalStatus');
        if(!tbody) return;

        const expectedRef = firebase.database().ref(`courses/${state.room}/expectedStudents`);
        const actualRef = firebase.database().ref(`courses/${state.room}/students`);
        const settingsRef = firebase.database().ref(`courses/${state.room}/settings`);
        const dormRef = firebase.database().ref(`system/dorm/assignments`);

        const norm = v => String(v || '').replace(/\s+/g, '').trim();
        const studentId = s => {
            const tokenId = s && s.token && String(s.token).includes('_') ? String(s.token).split('_').slice(1).join('_') : '';
            return norm(s.empNo || s.employeeNo || s.id || s.studentId || tokenId || s.phone || '');
        };
        const makeDormIndex = (assignData, settings) => {
            const out = {};
            const targetCourse = norm(settings && settings.courseName);
            const put = (key, rec, exactCourse) => {
                if (!key) return;
                if (!out[key] || exactCourse || !out[key]._exactCourse) out[key] = Object.assign({ _exactCourse: exactCourse }, rec);
            };
            Object.values(assignData || {}).forEach(week => {
                Object.values((week && week.students) || {}).forEach(s => {
                    if (!s || !s.name || s.course === '강사') return;
                    const exactCourse = !!(targetCourse && norm(s.course) === targetCourse);
                    const roomNo = s.no || s.roomNo || String(s.room || '').replace(/^.*\s/, '').replace(/호$/, '');
                    const rec = {
                        building: s.building || '-',
                        room: roomNo || '미배정',
                        course: s.course || ''
                    };
                    const nameKey = norm(s.name);
                    const idKey = norm(s.empNo || s.id || s.studentId || '');
                    put(nameKey, rec, exactCourse);
                    if (idKey) put(`${nameKey}_${idKey}`, rec, exactCourse);
                });
            });
            return out;
        };

        const renderAll = async (expData, actData, assignData, settings) => {
            self._dormRenderGen = (self._dormRenderGen || 0) + 1;
            const myGen = self._dormRenderGen;            // [JDS260613] 렌더 세대 토큰
            const rosterNames = await self._gatherRosterNames(room);
            if (state.room !== room) return;
            if (myGen !== self._dormRenderGen) return;       // 더 늦게 시작된 렌더가 있으면 이 렌더는 폐기(빈 배정으로 덮어쓰기 방지)
            const expectedNames = Array.from(new Set(
                [...(expData || []), ...rosterNames].map(n => String(n).trim()).filter(Boolean)
            ));
            const actualStudents = Object.entries(actData || {})
                .map(([token, s]) => ({ token, ...s }))
                .filter(s => s.name && s.name !== "undefined");
            const actualNames = actualStudents.map(s => s.name);
            const combinedNames = Array.from(new Set([...expectedNames, ...actualNames])).sort((a,b) => a.localeCompare(b));
            // await 이후 최신 배정 캐시를 다시 읽음 — 호출 시점에 비어있었어도 그 사이 도착한 배정을 사용
            const assignNow = (self._dormAssignCache && Object.keys(self._dormAssignCache).length) ? self._dormAssignCache : (assignData || {});
            const dormData = makeDormIndex(assignNow, settings || {});
            // [JDS260613] 진단: 매칭 실패가 있을 때만 출력
            try {
                const missNames = combinedNames.filter(n => !dormData[norm(String(n).trim())]);
                if (missNames.length) {
                    const idxNames = Object.keys(dormData).filter(k => !k.includes('_'));
                    console.log(`[생활관배치] 미매칭 ${missNames.length}/${combinedNames.length}명 · 배정색인 ${idxNames.length}명 · 배정주차 ${Object.keys(assignNow||{}).length}개`, missNames);
                }
            } catch (e) {}

            let arrivedCount = 0;
            combinedNames.forEach(name => { if(actualNames.includes(name)) arrivedCount++; });
            const total = combinedNames.length;
            const percent = total > 0 ? Math.round((arrivedCount / total) * 100) : 0;
            if(statusEl) statusEl.innerText = `${arrivedCount} / ${total} 명 (${percent}%)`;

            tbody.innerHTML = "";
            if (combinedNames.length === 0) {
                tbody.innerHTML = "<tr><td colspan='5' style='padding:50px; color:#94a3b8;'>명단이 존재하지 않습니다.</td></tr>";
                return;
            }

            combinedNames.forEach((name, idx) => {
                const isArrived = actualNames.includes(name);
                const sData = actualStudents.find(s => s.name === name) || {};
                const tokenId = sData.token && String(sData.token).includes('_') ? String(sData.token).split('_').slice(1).join('_') : '';
                const phoneLooksLikeMobile = /^010\d{7,8}$/.test(String(sData.phone || '').replace(/\D/g, ''));
                const displayId = sData.empNo || sData.employeeNo || sData.id || sData.studentId || tokenId || sData.phone || "-";
                const phoneSuffix = phoneLooksLikeMobile && tokenId ? tokenId : displayId;

                const cleanName = name.trim();
                const id = studentId(sData);
                const assigned = dormData[`${norm(cleanName)}_${id}`] || dormData[norm(cleanName)] || { building: "-", room: "미배정" };
                
                // [확실한 색상 구분 로직]
                let buildingColor = "#94a3b8"; // 기본 회색 (미배정)
                const bName = assigned.building;
                
                if (bName.includes("청렴")) {
                    buildingColor = "#2563eb"; // 청렴관: 파란색
                } else if (bName.includes("상생")) {
                    buildingColor = "#16a34a"; // 상생관: 초록색
                } else if (bName.includes("국제")) {
                    buildingColor = "#9333ea"; // 국제동: 보라색
                }

                const isAssigned = assigned.building !== "-";
                const statusIcon = isArrived ? '<i class="fa-solid fa-circle-check" style="color:#22c55e; margin-right:5px;"></i>' : '<i class="fa-solid fa-circle" style="color:#e2e8f0; margin-right:5px;"></i>';

                tbody.innerHTML += `
                    <tr onclick="ui.setMode('students')" style="${!isArrived ? 'opacity:0.6;' : ''} cursor:pointer;">
                        <td>${idx + 1}</td>
                        <td style="font-weight:bold; text-align:center;">
                            ${statusIcon} ${name}
                        </td>
                        <td style="color:#64748b;">${phoneSuffix}</td>
                        <!-- 아래 두 칸에 동일한 buildingColor를 강제로 적용합니다 -->
                        <td style="color:${buildingColor} !important; font-weight:800;">${assigned.building}</td>
                        <td style="color:${buildingColor} !important; font-weight:900;">${assigned.room}${isAssigned ? '호' : ''}</td>
                    </tr>`;
            });
        };

        let cacheExp = [], cacheAct = {}, cacheSettings = {};
        // [JDS260613] 배정 데이터는 공유 캐시로 유지 — expected/actual/settings 리스너가 빈 배정으로 덮어쓰는 경합 방지
        if (!self._dormAssignCache) self._dormAssignCache = {};
        expectedRef.on('value', s => { cacheExp = s.val(); renderAll(cacheExp, cacheAct, self._dormAssignCache, cacheSettings); });
        actualRef.on('value', s => { cacheAct = s.val(); renderAll(cacheExp, cacheAct, self._dormAssignCache, cacheSettings); });
        settingsRef.on('value', s => { cacheSettings = s.val() || {}; renderAll(cacheExp, cacheAct, self._dormAssignCache, cacheSettings); });
        dormRef.on('value', s => {
            const v = s.val() || {};
            // 비어있지 않을 때만 갱신(또는 아직 캐시가 비어있을 때만) — 일시적 빈 값이 좋은 배정을 지우지 않도록
            if (Object.keys(v).length || !Object.keys(self._dormAssignCache).length) self._dormAssignCache = v;
            renderAll(cacheExp, cacheAct, self._dormAssignCache, cacheSettings);
        });
    },






// [최종 완결본] 실시간 로드 + 상하단 색상 동기화 + 강제 취소(삭제) 버튼 포함
loadShuttleData: function() {
    if(!state.room) return;
    const activeRoom = state.room;
    if (state.shuttleDepartureRef) state.shuttleDepartureRef.off();
    if (state.shuttleRequestsRef) state.shuttleRequestsRef.off();
    if (state.shuttleAutoRef) state.shuttleAutoRef.off();   // [J10]
    state.shuttleDepartureRef = firebase.database().ref(`courses/${activeRoom}/shuttle/departure`);
    state.shuttleRequestsRef = firebase.database().ref(`courses/${activeRoom}/shuttle/requests`);
    // [J10] 지원부 시간표 기반 자동판정 실시간 구독 — 값이 바뀌면 화면 재로딩(초기 이벤트는 키 비교로 무시)
    state.shuttleAutoRef = firebase.database().ref(`courses/${activeRoom}/shuttle/autoDeparture`);
    state.shuttleAutoRef.on('value', s => {
        if (state.room !== activeRoom) return;
        const v = s.val();
        const key = v ? (String(v.departTime||'') + '|' + String(v.updatedAt||'')) : '';
        state._autoDep = v;
        if (state._autoDepKey === key) return;
        const isFirst = (state._autoDepKey === undefined);
        state._autoDepKey = key;
        if (!isFirst) { try { ui.loadShuttleData(); } catch(e){} }
    });

    // 1. 좌측 파란색 박스: 날짜, 시간, 문구 레이아웃
    state.shuttleDepartureRef.on('value', snap => {
        if (state.room !== activeRoom) return;
        let dep = snap.val();
        state._lastDep = dep;
        const el = document.getElementById('shuttleDepartureTime');
        if(!el) return;
        // [J10] 자동판정(지원부 시간표) 있으면 1차/2차 없이 이 과정 출발시간 단일 표시
        const _at = state._autoDep && state._autoDep.departTime;
        if (_at) dep = { date: (dep && dep.date) || (state._autoDep.endDate || ''), time: _at, time2: '' };

        if (dep && dep.time) {
            el.innerHTML = `
                <div style="font-size:30px; font-weight:900; opacity:0.96; margin-bottom:16px; letter-spacing:.5px;">${dep.date}</div>
                ${(()=>{ const t2=dep.time2||''; const t2t=/^\d{1,2}:\d{2}$/.test(t2); const t1t=/^\d{1,2}:\d{2}$/.test(dep.time||''); if(!t2) return `<div style="font-size:46px; font-weight:900; line-height:1.05;">${dep.time}</div>`; return `<div style="display:inline-grid; grid-template-columns:auto auto auto; column-gap:10px; row-gap:11px; align-items:baseline; text-align:left;"><span style="font-size:20px; font-weight:800; opacity:.85;">1차</span><span style="font-size:20px; font-weight:800; opacity:.55;">:</span><span style="font-size:${t1t?'30px':'23px'}; font-weight:900; ${t1t?'':'opacity:.92;'}">${dep.time}</span><span style="font-size:20px; font-weight:800; opacity:.85;">2차</span><span style="font-size:20px; font-weight:800; opacity:.55;">:</span><span style="font-size:${t2t?'30px':'23px'}; font-weight:900; ${t2t?'':'opacity:.92;'}">${t2}</span></div>`; })()}
                <div style="font-size:19px; margin-top:18px; font-weight:900; background:rgba(255,255,255,0.18); padding:9px 22px; border-radius:50px; display:inline-block;"><i class="fa-solid fa-bus" style="margin-right:7px;"></i> 퇴교차량 출발</div>
            `;
            el.style.color = "white";
            // 입력창에도 현재 설정값 반영
            const dateEl = document.getElementById('shuttle-depart-date');
            const timeEl = document.getElementById('shuttle-depart-time');
            if (dateEl && dep.date) dateEl.value = dep.date;
            if (timeEl && dep.time) timeEl.value = dep.time;
            // ETA 카드 업데이트 (현재 신청 인원 수 함께 전달)
            window._shuttleAdminDepTime = dep.time;
            window._shuttleAdminDepTime2 = dep.time2 || '';
            ui.updateShuttleETA(dep.time, window._shuttleAdminCounts || { osong:0, terminal:0, airport:0 });
        } else {
            el.innerHTML = `<div style="font-size:18px; opacity:0.7;">퇴교 공지 대기 중</div>`;
            el.style.color = "white";
            window._shuttleAdminDepTime = null;
            window._shuttleAdminDepTime2 = '';
            ui.updateShuttleETA(null);
        }
    });





    // 2. 신청 명단 실시간 연동 및 삭제 버튼 생성
    state.shuttleRequestsRef.on('value', snap => {
        if (state.room !== activeRoom) return;
        const requests = snap.val() || {};
        const tbody = document.getElementById('shuttleListTableBody');
        if(!tbody) return;

        tbody.innerHTML = "";
        
        // [수정] 삭제를 위해 token(ID)을 포함하여 리스트 생성
        const items = Object.keys(requests).map(key => ({
            token: key,
            ...requests[key]
        })).sort((a,b) => a.timestamp - b.timestamp);
        
        let counts = { osong: 0, terminal: 0, airport: 0, car: 0 };

        if (items.length === 0) {
            tbody.innerHTML = "<tr><td colspan='6' style='padding:80px 0; color:#94a3b8; text-align:center; font-weight:600;'>차량 신청 내역이 없습니다.</td></tr>";
        } else {
            items.forEach((item, idx) => {
                counts[item.type]++;
                
                let color = "#64748b"; // 기본 회색 (자차)
                const text = item.typeText || "";
                
                if(item.type === 'osong' || text.includes('오송')) {
                    color = "#ef4444"; 
                } else if(item.type === 'terminal' || text.includes('터미널')) {
                    color = "#3b82f6"; 
                } else if(item.type === 'airport' || text.includes('공항')) {
                    color = "#10b981"; 
                }

                const timeStr = new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

                // [핵심] 마지막 열에 삭제(취소) 버튼을 추가했습니다.
                tbody.innerHTML += `
                    <tr>
                        <td>${idx + 1}</td>
                        <td style="font-weight:800; color:#1e293b;">${item.name}</td>
                        <td style="color:#64748b;">${item.phone}</td>
                        <td style="color:${color} !important; font-weight:900; font-size:16px;">${text}</td>
                        <td style="color:#94a3b8; font-size:12px;">${timeStr}</td>
                        <td>
                            <button class="btn-table-action" 
                                    onclick="ui.deleteShuttleByAdmin('${item.token}', '${item.name}')"
                                    style="background:#64748b; font-size:11px; padding:5px 8px; border:none; color:white; border-radius:4px; cursor:pointer;">
                                취소
                            </button>
                        </td>
                    </tr>`;
            });
        }

        // 상단 통계 숫자 업데이트 (기존과 동일)
        if(document.getElementById('cnt-car')) document.getElementById('cnt-car').innerText = counts.car;
        if(document.getElementById('cnt-osong')) document.getElementById('cnt-osong').innerText = counts.osong;
        if(document.getElementById('cnt-terminal')) document.getElementById('cnt-terminal').innerText = counts.terminal;
        if(document.getElementById('cnt-airport')) document.getElementById('cnt-airport').innerText = counts.airport;
        if(document.getElementById('cnt-total')) document.getElementById('cnt-total').innerText = items.length;

        // 신청자 수 변경 시 ETA도 즉시 재계산 (경유지 skip 반영)
        if (window._shuttleAdminDepTime) {
            ui.updateShuttleETA(window._shuttleAdminDepTime, counts);
        }
        window._shuttleAdminCounts = counts; // 최신 counts 캐시
    });
},



    // [추가 4] 차량 신청 명단 팝업 함수
    showShuttleListModal: function(waveId, waveName, locName, members) {
        if (members.length === 0) return;
        const modal = document.getElementById('qaModal');
        const mText = document.getElementById('m-text');
        const mActions = document.querySelector('#qaModal .modal-actions');
        if(!modal || !mText) return;
        mText.innerHTML = `<div style="text-align:left;"><div style="font-size:13px; color:#64748b;">${waveName}</div><div style="font-size:20px; font-weight:900; color:#003366; margin-bottom:20px; border-bottom:2px solid #f1f5f9; padding-bottom:10px;">${locName} 신청 명단 (${members.length}명)</div><div style="display:flex; flex-wrap:wrap; gap:10px; max-height:350px; overflow-y:auto; padding:5px;">${members.map(([token, name]) => `<div class="member-tag" style="padding: 10px 15px; font-size:15px; background:#f8fafc; border:1px solid #e2e8f0; display:flex; align-items:center; border-radius:10px; font-weight:700;">${name} <i class="fa-solid fa-circle-xmark" onclick="event.stopPropagation(); ui.cancelIndividualShuttle('${waveId}', '${locName.includes('오송') ? 'osong' : locName.includes('터미널') ? 'terminal' : locName.includes('공항') ? 'airport' : 'car'}', '${token}', '${name}')" style="margin-left:12px; color:#ef4444; cursor:pointer; font-size:18px;"></i></div>`).join('')}</div></div>`;
        if(mActions) mActions.style.display = 'none';
        modal.style.display = 'flex';
        const closeHandler = (e) => { if (e.target.id === 'qaModal' || e.target.tagName === 'BUTTON') { if(mActions) mActions.style.display = 'flex'; modal.removeEventListener('click', closeHandler); } };
        modal.addEventListener('click', closeHandler);
    },










// [ETA 시스템] 신청자 유무 반영 동적 도착 시간 (교육생 앱과 동일 알고리즘)
updateShuttleETA: function(departureTime, counts) {
    const etaDetail = document.getElementById('shuttleETADetail');
    if (!etaDetail) return;
    state._lastDepTimeForEta = departureTime; state._lastShuttleCounts = counts;   // [J10] autoDep 변경 시 재렌더용
    const _atEta = state._autoDep && state._autoDep.departTime;                    // [J10] 자동판정 우선(단일 라운드)
    if (_atEta) departureTime = _atEta;
    if (!departureTime) {
        etaDetail.innerHTML = `<div style="color:#94a3b8; font-size:13px; padding:4px 0;">출발 시간이 공지되면 표시됩니다.</div>`;
        return;
    }
    const c = counts || { osong: 0, terminal: 0, airport: 0 };
    const t2 = window._shuttleAdminDepTime2 || '';
    function roundHtml(depT, tag){
        const parts = String(depT).split(':');
        const hh = Number(parts[0]), mm = Number(parts[1]);
        if (isNaN(hh) || isNaN(mm)) return '';
        const base = hh*60+mm;
        const fmt = (total)=>{ const h=String(Math.floor(total/60)%24).padStart(2,'0'); const m=String(total%60).padStart(2,'0'); return `${h}:${m}`; };
        let acc = base; let oM=null,tM=null,aM=null;
        if (c.osong>0){ acc+=30; oM=acc; }
        if (c.terminal>0){ acc+=30; tM=acc; }
        if (c.airport>0){ acc+=30; aM=acc; }
        const stops=[{label:'오송역',time:oM!==null?fmt(oM):null,color:'#ef4444'},{label:'청주터미널',time:tM!==null?fmt(tM):null,color:'#3b82f6'},{label:'청주국제공항',time:aM!==null?fmt(aM):null,color:'#10b981'}];
        const tagHtml = tag ? `<span style="display:inline-flex;align-items:center;background:#1e3a8a;color:#fff;font-size:12px;font-weight:900;padding:5px 11px;border-radius:8px;">${tag} ${depT} 출발</span>` : '';
        return `<div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin-bottom:8px;">${tagHtml}${stops.map(s => s.time !== null ? `<div style="display:flex; align-items:center; gap:8px; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:10px; padding:8px 16px;"><span style="font-size:15px; font-weight:900; color:${s.color};">${s.label}</span><span style="font-size:17px; font-weight:900; color:#1e293b;">${s.time}</span><span style="font-size:12px; color:#94a3b8; font-weight:700;">도착</span></div>` : `<div style="display:flex; align-items:center; gap:6px; background:#f1f5f9; border:1.5px dashed #cbd5e1; border-radius:10px; padding:8px 14px; opacity:0.6;"><span style="font-size:13px; font-weight:800; color:#94a3b8; text-decoration:line-through;">${s.label}</span><span style="font-size:11px; color:#94a3b8; font-weight:700;">신청자 없음 · skip</span></div>`).join('')}</div>`;
    }
    const t2IsTime = !_atEta && /^\d{1,2}:\d{2}$/.test(t2);
    let html = roundHtml(departureTime, (_atEta ? '' : (t2 ? '1차' : '')) || (_atEta ? '이 과정' : ''));
    if (t2IsTime) html += roundHtml(t2, '2차');
    else if (t2 && !_atEta) html += `<div style="font-size:13px;font-weight:800;color:#94a3b8;margin-bottom:8px;">🚌 2차 ${t2}</div>`;
    html += `<div style="font-size:11px; color:#94a3b8; margin-top:4px;">※ 신청자 있는 정류장만 정차 · 각 구간 30분 (미신청 정류장은 건너뜀)</div>`;
    etaDetail.innerHTML = html;
},

    toggleMenuDropdown: function() {
        const dropdown = document.getElementById('menuDropdown');
        if(dropdown) dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
    },





// [자동 리셋] 금요일 18시 이후 차량 명단 리셋 체크
autoResetShuttleIfNeeded: function(room) {
    const now = new Date();
    const day = now.getDay(); // 0=일, 5=금
    const hour = now.getHours();
    if(day !== 5 || hour < 18) return; // 금요일 18시 이후만 체크

    const resetKey = `kac_shuttle_reset_${room}_${getTodayString()}`;
    if(localStorage.getItem(resetKey)) return; // 오늘 이미 처리됨

    firebase.database().ref(`courses/${room}/shuttle/requests`).once('value', snap => {
        if(!snap.exists()) return;
        // 금요일 18시 이후에 지난주 명단이 남아있는 경우 자동 초기화
        const reqs = snap.val() || {};
        const anyOld = Object.values(reqs).some(r => {
            const d = new Date(r.timestamp);
            return d.getDay() !== 5 || d < new Date(now.setHours(18,0,0,0));
        });
        if(anyOld && !state.isObserver) {
            ui.showAlert("📢 금요일 18시가 지났습니다.\n차량 신청 명단이 자동으로 초기화되었습니다.");
            firebase.database().ref(`courses/${room}/shuttle/requests`).set(null);
            localStorage.setItem(resetKey, 'done');
        }
    });
},

// 강사가 직접 차량 출발시간 설정
setShutttleDeparture: function() {
    if (state.isObserver) return ui.showAlert("👁️ 옵저버는 출발시간을 설정할 수 없습니다.");
    if (!state.room) return;
    const date = document.getElementById('shuttle-depart-date')?.value;
    const time = document.getElementById('shuttle-depart-time')?.value;
    if (!date || !time) return ui.showAlert("날짜와 시간을 모두 입력해주세요.");
    firebase.database().ref(`courses/${state.room}/shuttle/departure`).set({ date, time })
        .then(() => ui.showAlert(`✅ 출발시간이 설정되었습니다.
${date} [ ${time} ]`));
},

// 출발시간 초기화
clearShuttleDeparture: function() {
    if (state.isObserver) return ui.showAlert("👁️ 옵저버는 출발시간을 초기화할 수 없습니다.");
    if (!state.room) return;
    if (!confirm("출발시간을 초기화하시겠습니까?")) return;
    firebase.database().ref(`courses/${state.room}/shuttle/departure`).set(null)
        .then(() => ui.showAlert("✅ 출발시간이 초기화되었습니다."));
},

// [신규] 차량 신청 명단 전체 초기화 (옵저버 차단 포함)
resetShuttleRequests: function() {
    // 1. 옵저버 권한 체크
    if (state.isObserver) {
        ui.showAlert("👁️ 옵저버 모드에서는 명단을 초기화할 수 없습니다.");
        return;
    }

    if (!state.room) return;

    // 2. 관리자 재확인
    if (confirm("🚨 경고: 현재 등록된 모든 수강생의 차량 신청 내역을 삭제하시겠습니까?\n(다음 주차 조사를 위해 명단을 비웁니다. 이 작업은 되돌릴 수 없습니다.)")) {
        
        firebase.database().ref(`courses/${state.room}/shuttle/requests`).set(null)
            .then(() => {
                ui.showAlert("✅ 차량 신청 명단이 깨끗하게 초기화되었습니다.");
            })
            .catch(e => {
                ui.showAlert("초기화 실패: " + e.message);
            });
    }
},










// [최종 수정] 관리자가 차량 신청 강제 취소 (옵저버 차단 포함)
    deleteShuttleByAdmin: function(token, name) {
        // 1. 옵저버인지 먼저 확인 (이게 없으면 삭제가 됩니다!)
        if (state.isObserver) {
            ui.showAlert("👁️ 옵저버 모드에서는 차량 신청을 취소할 수 없습니다.");
            return;
        }

        // 2. 강사라면 확인 후 삭제 진행
        if (!confirm(`[${name}]님의 차량 신청을 취소하시겠습니까?\n(신청 명단에서만 삭제됩니다.)`)) return;
        
        firebase.database().ref(`courses/${state.room}/shuttle/requests/${token}`).remove()
            .then(() => {
                ui.showAlert("✅ 차량 신청이 취소되었습니다.");
            })
            .catch(e => {
                ui.showAlert("오류 발생: " + e.message);
            });
    },

// [가족 사이트 토글 함수]
    toggleFamilySites: function() {
        const menu    = document.getElementById('familySiteMenu');
        const chevron = document.getElementById('familyChevron');
        if (!menu) return;
        const isOpen = menu.style.display === 'flex';
        if (isOpen) {
            menu.style.display = 'none';
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        } else {
            menu.style.display = 'flex';
            if (chevron) chevron.style.transform = 'rotate(180deg)';
        }
    },

// [플랫폼 개발 이력] GitHub README를 읽어와 팝업으로 표시
    openDevInfo: async function() {
        const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/kac-edu/CATC/main/KAC_%ED%94%8C%EB%9E%AB%ED%8F%BC_%EA%B0%9C%EB%B0%9C%EC%9D%B4%EB%A0%A5.md';
        // 기존 모달 재활용
        const modal = document.getElementById('qaModal');
        const mText = document.getElementById('m-text');
        const mActions = document.querySelector('#qaModal .modal-actions');
        if (!modal || !mText) return;

        mText.innerHTML = `<div style="text-align:center; padding:40px 0; color:#94a3b8; font-size:14px; font-weight:700;"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px; margin-bottom:12px; display:block;"></i>개발 이력을 불러오는 중...</div>`;
        if (mActions) mActions.style.display = 'none';
        modal.style.display = 'flex';

        try {
            const res = await fetch(GITHUB_RAW_URL);
            if (!res.ok) throw new Error('fetch fail');
            const md = await res.text();
            // 마크다운 기본 렌더링 (굵게, 제목, 리스트)
            const html = md
                .replace(/^### (.+)$/gm, '<h4 style="color:#003366;margin:14px 0 6px;">$1</h4>')
                .replace(/^## (.+)$/gm, '<h3 style="color:#003366;border-bottom:2px solid #e2e8f0;padding-bottom:6px;margin:18px 0 8px;">$1</h3>')
                .replace(/^# (.+)$/gm, '<h2 style="color:#003366;margin:0 0 14px;">$1</h2>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/^- (.+)$/gm, '<li style="margin:3px 0;color:#334155;">$1</li>')
                .replace(/(<li.*<\/li>)/gs, '<ul style="padding-left:18px;margin:4px 0;">$1</ul>')
                .replace(/\n\n/g, '<br>');
            mText.innerHTML = `<div style="max-height:60vh; overflow-y:auto; text-align:left; font-size:13px; line-height:1.7; padding:4px 8px;">${html}</div>`;
        } catch(e) {
            mText.innerHTML = `<div style="text-align:center; padding:30px 0; color:#ef4444; font-size:13px; font-weight:700;"><i class="fa-solid fa-triangle-exclamation"></i> 개발 이력을 불러오지 못했습니다.<br><span style="color:#94a3b8; font-size:12px; margin-top:8px; display:block;">GitHub 저장소 또는 네트워크를 확인해 주세요.</span></div>`;
        }

        const closeHandler = (e) => {
            if (e.target.id === 'qaModal') {
                if (mActions) mActions.style.display = 'flex';
                modal.removeEventListener('click', closeHandler);
            }
        };
        modal.addEventListener('click', closeHandler);
    },

// [개발자 문의 / 저작권 안내] 사이드바 버튼에서 호출
    openContactDev: function() {
        const DEV_NAME = '장두석 교수';
        const DEV_EMAIL = 'jds0616@gmail.com';
        const PLAT_FILES = [
            { name: '교육생', file: 'index.html' },
            { name: '강사', file: 'admin.html' },
            { name: '교육운영부', file: 'admin_coord.html' },
            { name: '교육지원부', file: 'dorm_admin.html' },
            { name: '기사(차량)', file: 'driver.html' },
            { name: '영양사', file: 'nutritionist.html' },
            { name: '미화/시설', file: 'facility_admin.html' },
            { name: '자동연결(go)', file: 'go.html' },
            { name: '학생장', file: 'student_leader.html' }
        ];
        const mailSubject = encodeURIComponent('[KAC 항공기술훈련원 플랫폼 문의]');
        const mailUrl = `mailto:${DEV_EMAIL}?subject=${mailSubject}`;

        const modal = document.getElementById('qaModal');
        const mText = document.getElementById('m-text');
        const mActions = document.querySelector('#qaModal .modal-actions');
        if (!modal || !mText) return;
        if (mActions) mActions.style.display = 'none';

        mText.innerHTML = `
            <div style="max-height:65vh; overflow-y:auto; text-align:left; padding:4px 6px;">
                <div style="text-align:center; margin-bottom:18px;">
                    <div style="display:inline-flex; align-items:center; justify-content:center; width:80px; height:80px; border-radius:20px; background:linear-gradient(135deg,#2563eb,#60a5fa); margin-bottom:12px; box-shadow:0 8px 20px rgba(37,99,235,0.3);">
                        <i class="fa-solid fa-graduation-cap" style="font-size:38px; color:#fff;"></i>
                    </div>
                    <div style="font-size:18px; font-weight:900; color:#0f172a;">개발자 문의</div>
                    <div style="font-size:12px; color:#94a3b8; font-weight:600; margin-top:2px;">항공기술훈련원 교육 플랫폼</div>
                </div>

                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; margin-bottom:14px;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                        <i class="fa-solid fa-user-tie" style="color:#64748b; width:18px; text-align:center;"></i>
                        <span style="font-size:14px; font-weight:700; color:#334155;">개발자</span>
                        <span style="margin-left:auto; font-size:15px; font-weight:900; color:#0f172a;">${DEV_NAME}</span>
                    </div>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <i class="fa-solid fa-envelope" style="color:#64748b; width:18px; text-align:center;"></i>
                        <span style="font-size:14px; font-weight:700; color:#334155;">이메일</span>
                        <a href="${mailUrl}" style="margin-left:auto; font-size:14px; font-weight:800; color:#1d4ed8; text-decoration:underline;">${DEV_EMAIL}</a>
                    </div>
                </div>

                <div style="display:flex; gap:8px; margin-bottom:16px;">
                    <a href="${mailUrl}" style="flex:1; text-align:center; padding:12px 0; background:#1d4ed8; color:#fff; border-radius:10px; font-size:14px; font-weight:800; text-decoration:none;">
                        <i class="fa-solid fa-paper-plane"></i> 메일 보내기
                    </a>
                    <button onclick="ui.copyDevEmail('${DEV_EMAIL}')" style="flex:1; padding:12px 0; background:#e2e8f0; color:#475569; border:none; border-radius:10px; font-size:14px; font-weight:800; cursor:pointer;">
                        <i class="fa-solid fa-copy"></i> 주소 복사
                    </button>
                </div>

                <a href="KAC_바로가기_위젯.zip" download="KAC_바로가기_위젯.zip" style="display:flex; align-items:center; justify-content:center; gap:8px; margin-bottom:16px; padding:13px 0; background:linear-gradient(135deg,#059669,#10b981); color:#fff; border-radius:10px; font-size:14px; font-weight:800; text-decoration:none; box-shadow:0 4px 12px rgba(16,185,129,.3);">
                    <i class="fa-solid fa-download"></i> 바로가기 위젯 다운로드 (.zip)
                </a>

                <div style="background:#f0f7ff; border:1px solid #dbeafe; border-radius:12px; padding:14px 16px; margin-bottom:14px;">
                    <div style="font-size:13px; font-weight:900; color:#1d4ed8; margin-bottom:10px;"><i class="fa-solid fa-code-branch"></i> 현재 플랫폼 버전</div>
                    <div id="platVerList" style="display:grid; grid-template-columns:1fr 1fr; gap:6px 14px;">
                        <div style="grid-column:1/-1; color:#94a3b8; font-size:12px;">버전 확인 중…</div>
                    </div>
                    <button onclick="ui.savePlatVersionsBaseline()" style="margin-top:11px; width:100%; padding:9px; border:1px dashed #93c5fd; background:#fff; color:#1d4ed8; border-radius:9px; font-size:12px; font-weight:800; cursor:pointer;"><i class="fa-solid fa-bookmark"></i> 지금 배포본을 '최신 기준'으로 등록</button>
                </div>


                <div style="border-top:1px dashed #cbd5e1; padding-top:14px;">
                    <div style="font-size:13px; font-weight:900; color:#b91c1c; margin-bottom:8px;">
                        <i class="fa-solid fa-shield-halved"></i> 저작권 및 이용 안내
                    </div>
                    <ul style="margin:0; padding-left:18px; font-size:12px; line-height:1.75; color:#475569;">
                        <li>본 플랫폼의 저작권 및 모든 권리는 개발자 <b>${DEV_NAME}</b>에게 있습니다.</li>
                        <li>본 플랫폼은 한국공항공사 항공기술훈련원 교육 운영 목적으로만 사용이 허가됩니다.</li>
                        <li>개발자의 사전 서면 동의 없이 복제·배포·수정·2차적 저작물 작성 및 외부 반출을 금합니다.</li>
                        <li>허가된 목적 외 타 용도로 무단 사용할 경우, 관련 법령에 따라 <b style="color:#b91c1c;">민·형사상 책임 및 제재</b>가 따를 수 있습니다.</li>
                    </ul>
                    <div style="font-size:11px; color:#94a3b8; margin-top:10px; text-align:center;">
                        &copy; ${new Date().getFullYear()} ${DEV_NAME}. All rights reserved.
                    </div>
                </div>
            </div>
        `;
        modal.style.display = 'flex';
        ui._platFiles = PLAT_FILES;
        ui._loadPlatVersions(PLAT_FILES);

        const closeHandler = (e) => {
            if (e.target.id === 'qaModal') {
                if (mActions) mActions.style.display = 'flex';
                modal.removeEventListener('click', closeHandler);
            }
        };
        modal.addEventListener('click', closeHandler);
    },

    copyDevEmail: function(email) {
        const done = () => ui.showAlert('📋 이메일 주소가 복사되었습니다.\n' + email);
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).then(done).catch(() => {
                const t = document.createElement('textarea');
                t.value = email; document.body.appendChild(t); t.select();
                try { document.execCommand('copy'); } catch(e) {}
                document.body.removeChild(t); done();
            });
        } else {
            const t = document.createElement('textarea');
            t.value = email; document.body.appendChild(t); t.select();
            try { document.execCommand('copy'); } catch(e) {}
            document.body.removeChild(t); done();
        }
    },

    // [최신 버전 기준] 개발자가 아는 각 플랫폼의 최신 배지. 새 파일을 올리면 이 값과 같아야 함.
    //  파일을 수정/배포할 때마다 여기 값도 같이 올려주세요(배지값과 동일하게).
    _LATEST_VER: {
        'index.html':'vH14', 'admin.html':'vV0', 'admin_coord.html':'vH1', 'dorm_admin.html':'vK2',
        'driver.html':'vD', 'nutritionist.html':'vE', 'facility_admin.html':'vC', 'go.html':'vI', 'student_leader.html':'vA'
    },
    // [버전 실시간 로드] 각 플랫폼 파일 배지를 읽어 'Firebase 최신 기준'과 비교 (없으면 코드 기본값)
    _loadPlatVersions: function(list){
        const box = document.getElementById('platVerList'); if(!box) return;
        const fbP = firebase.database().ref('system/platformVersions').once('value').then(function(s){ return s.val()||null; }).catch(function(){ return null; });
        const filesP = Promise.all(list.map(function(it){
            return fetch(it.file + '?t=' + Date.now())
                .then(function(r){ return r.ok ? r.text() : ''; })
                .then(function(t){ var m = t.match(/id="__catcVer"[^>]*>([^<·]+)/); return { name: it.name, file: it.file, ver: (m ? m[1].trim() : '-') }; })
                .catch(function(){ return { name: it.name, file: it.file, ver: '-' }; });
        }));
        Promise.all([fbP, filesP]).then(function(res){
            var baseline = res[0];                       // Firebase 등록 기준만 사용(코드 폴백으로 빨강 오표시 방지)
            var hasBase = baseline && Object.keys(baseline).length > 0;
            var arr = res[1]; ui._lastPlatVers = arr;
            var diffN = 0;
            box.innerHTML = arr.map(function(v){
                var base = hasBase ? (baseline[v.file] || null) : null;
                var isDiff = base && v.ver !== '-' && v.ver !== base;
                if (isDiff) diffN++;
                var verBg = isDiff ? '#fee2e2' : '#dbeafe';
                var verCol = isDiff ? '#b91c1c' : '#0f172a';
                var note = isDiff ? '<span style="font-size:10px; color:#b91c1c; font-weight:800; margin-left:5px;">기준 '+base+'</span>' : '';
                return '<div style="display:flex; align-items:center; justify-content:space-between; font-size:12px;"><span style="color:#475569; font-weight:700;">'+v.name+(isDiff?' <i class=\'fa-solid fa-triangle-exclamation\' style=\'color:#f59e0b;\'></i>':'')+'</span><span><span style="font-family:ui-monospace,Menlo,Consolas,monospace; font-weight:800; color:'+verCol+'; background:'+verBg+'; padding:1px 8px; border-radius:6px;">'+v.ver+'</span>'+note+'</span></div>';
            }).join('') + (
                !hasBase ? '<div style="grid-column:1/-1; margin-top:8px; padding:9px 11px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:9px; color:#1d4ed8; font-size:11.5px; font-weight:800; line-height:1.5;"><i class="fa-solid fa-circle-info"></i> 최신 기준이 등록되지 않았습니다. 모든 파일을 올린 뒤 아래 버튼으로 등록하세요.</div>'
                : diffN ? '<div style="grid-column:1/-1; margin-top:8px; padding:9px 11px; background:#fff7ed; border:1px solid #fed7aa; border-radius:9px; color:#b45309; font-size:11.5px; font-weight:800; line-height:1.5;"><i class="fa-solid fa-triangle-exclamation"></i> 기준과 다른 플랫폼 '+diffN+'개 — 빨간 항목을 확인하세요. (새로 배포했다면 아래 버튼으로 기준 갱신)</div>'
                : '<div style="grid-column:1/-1; margin-top:8px; padding:9px 11px; background:#ecfdf5; border:1px solid #a7f3d0; border-radius:9px; color:#047857; font-size:11.5px; font-weight:800;"><i class="fa-solid fa-circle-check"></i> 모든 플랫폼이 기준과 일치합니다.</div>');
        });
    },

    // [버전 기준 등록] 지금 화면에 뜬 배포본 버전을 Firebase에 '최신 기준'으로 저장 → 이후 이 값과 비교
    savePlatVersionsBaseline: function(){
        var arr = ui._lastPlatVers || [];
        if(!arr.length){ ui.showAlert('버전 정보를 아직 불러오는 중입니다. 잠시 후 다시 시도하세요.'); return; }
        var map = {}; arr.forEach(function(v){ if(v.ver && v.ver!=='-') map[v.file]=v.ver; });
        firebase.database().ref('system/platformVersions').set(map).then(function(){
            ui.showAlert('✅ 현재 배포본을 최신 기준으로 등록했습니다.\n이후 이 버전보다 낮으면 빨갛게 표시됩니다.');
            ui._loadPlatVersions(ui._platFiles || []);
        }).catch(function(){ ui.showAlert('저장에 실패했습니다. 네트워크를 확인하세요.'); });
    },

// [강사 플랫폼: 로고 클릭 시 모든 정보를 초기화하고 현황판으로 이동]
    // 사이드바 책갈피 토글
    toggleSidebar: function() {
        const body = document.body;
        const icon = document.getElementById('sidebarToggleIcon');
        body.classList.toggle('sidebar-hidden');
        const isHidden = body.classList.contains('sidebar-hidden');
        // [자동 접힘] 펼친 뒤 10초 비활성 시 접힘. 단, 사이드바를 쓰는 중(마우스 올려둠)에는 대기.
        var self = this;
        if (this._sidebarAutoTimer) { clearTimeout(this._sidebarAutoTimer); this._sidebarAutoTimer = null; }
        if (!isHidden) {
            var collapseSb = function() {
                document.body.classList.add('sidebar-hidden');
            };
            self._sidebarStart = function() { if (self._sidebarAutoTimer) clearTimeout(self._sidebarAutoTimer); self._sidebarAutoTimer = setTimeout(collapseSb, 10000); };
            self._sidebarStop  = function() { if (self._sidebarAutoTimer) { clearTimeout(self._sidebarAutoTimer); self._sidebarAutoTimer = null; } };
            var sb = document.getElementById('mainSidebar');
            if (sb && !sb._autoHideBound) {
                sb._autoHideBound = true;
                // 마우스를 올려 쓰는 중엔 타이머 정지, 벗어나면 10초 재시작
                sb.addEventListener('mouseenter', function(){ self._sidebarStop(); });
                sb.addEventListener('mouseleave', function(){ self._sidebarStart(); });
                sb.addEventListener('mousemove',  function(){ self._sidebarStop(); });
                sb.addEventListener('focusin',    function(){ self._sidebarStop(); });
                sb.addEventListener('focusout',   function(){ self._sidebarStart(); });
            }
            // 펼친 직후: 마우스가 사이드바 위에 없으면 10초 후 접힘(위에 있으면 mouseenter/move가 정지)
            self._sidebarStart();
        }
    },

    // 전역 로딩 스피너
    showLoading: function(msg = '로딩 중...') {
        const el = document.getElementById('globalLoadingOverlay');
        const msgEl = document.getElementById('globalLoadingMsg');
        if (el) { el.style.display = 'flex'; }
        if (msgEl) msgEl.innerText = msg;
    },
    hideLoading: function() {
        const el = document.getElementById('globalLoadingOverlay');
        if (el) el.style.display = 'none';
    },

    goHome: function() {
        location.reload();
    },

    // KAC 로고 → 통합 현황판(포털)로 안전 이동: 방 컨텍스트 해제 + 오버레이 제거(클릭 살리기)
    goHomePortal: function() {
        try { state.room = null; state.isObserver = false; } catch(e) {}
        try { localStorage.removeItem('kac_last_room'); } catch(e) {}
        var ov = document.getElementById('statusOverlay'); if (ov) ov.style.display = 'none';
        var qr = document.getElementById('floatingQR'); if (qr) qr.style.display = 'none';
        try { ui._qrUserClosed = true; } catch(e) {}
        ui.setMode('home');
    },

    // [홈으로] 과정에 들어가 있으면 그 과정 현황(dashboard), 아니면 통합 교육 현황판(home)
    goHomeSmart: function() {
        if (state.room) { ui.setMode('dashboard'); }
        else { ui.goHomePortal(); }
    },

    // [사이드바 파란 버튼] 통합 현황판(홈)=교수 프로필 관리 / 과정 화면=교육과정 환경 설정
    sidebarPrimaryAction: function() {
        if (!state.room) { try { profMgr.openManageModal(); } catch(e){} }
        else { try { setupMgr.openSetupModal(); } catch(e){} }
    },

    // ── 헤더 날짜/시간 실시간 시계 (Pill 위젯, 요일 포함) ──
    startHeaderClock: function() {
        const DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
        const update = () => {
            const el = document.getElementById('headerDateTime');
            if (!el) return;
            const now = new Date();
            const dateStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')}`;
            const dayStr = DAYS[now.getDay()];
            let hh = now.getHours();
            const mm = String(now.getMinutes()).padStart(2, '0');
            const ampm = hh >= 12 ? 'PM' : 'AM';
            hh = hh % 12 || 12;
            el.innerHTML = `
                <span class="clock-date">${dateStr}</span>
                <span class="clock-day">${dayStr}</span>
                <span class="clock-divider"></span>
                <span class="clock-time">${String(hh).padStart(2,'0')}<span class="blink">:</span>${mm}<span class="clock-ampm">${ampm}</span></span>
            `;
        };
        update();
        setInterval(update, 1000);
    },

    // ── 이번 주(월~금) 기간 필터 ──
    _isThisWeek: function(periodStr) {
        if (!periodStr || periodStr.length < 5) return false;
        // 구분자 유연 처리: " ~ ", "~", "-" 등 어떤 형태든 시작/종료일 추출
        const m = periodStr.match(/(\d{4}-\d{2}-\d{2})\s*[~\-]\s*(\d{4}-\d{2}-\d{2})/);
        let s0, s1;
        if (m) { s0 = m[1]; s1 = m[2]; }
        else {
            const parts = periodStr.split('~');
            if (parts.length < 2) return false;
            s0 = parts[0].trim(); s1 = parts[1].trim();
        }
        // [TZ 안전] YYYY-MM-DD 를 로컬 자정 기준으로 파싱 (new Date("YYYY-MM-DD")는 UTC로 해석되어 KST에서 하루 밀림)
        const toLocal = (str, endOfDay) => {
            const p = String(str).split('-');
            if (p.length !== 3) { const d = new Date(str); if (endOfDay) d.setHours(23,59,59,999); return d; }
            return new Date(+p[0], +p[1]-1, +p[2], endOfDay?23:0, endOfDay?59:0, endOfDay?59:0, endOfDay?999:0);
        };
        const cStart = toLocal(s0, false);
        const cEnd   = toLocal(s1, true);
        if (isNaN(cStart) || isNaN(cEnd)) return false;
        const now = new Date();
        const diff = now.getDay() === 0 ? -6 : 1 - now.getDay();
        const wMon = new Date(now); wMon.setDate(now.getDate()+diff); wMon.setHours(0,0,0,0);
        const wFri = new Date(wMon); wFri.setDate(wMon.getDate()+4); wFri.setHours(23,59,59,999);
        return cStart <= wFri && cEnd >= wMon;
    },
    // [종료 판정] 과정 종료일이 '오늘'보다 이전이면 종료된 과정 (리셋 전이라 방이 active여도 카운트 제외)
    _isEnded: function(periodStr) {
        if(!periodStr) return false;
        var parts = String(periodStr).replace(/[\u3010\u3011]/g,'').split('~');
        if(parts.length < 2) return false;
        var e = parts[1].trim().match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
        if(!e) return false;
        var end = new Date(+e[1], +e[2]-1, +e[3], 23,59,59,999);
        if(isNaN(end)) return false;
        var t = new Date(); t.setHours(0,0,0,0);
        return end < t;
    },

    // ── 홈 통계 로드 ── [수정] 실시간 on() 리스너 + '현재 방에 배정된 과정' 기준 집계
    //   기존엔 _isThisWeek(이번 주 월~금)로만 필터해서, 토요일에 SELECT ROOM이 차주 과정을
    //   미리 배정(D-2 오픈)해 둔 경우 그 과정이 "이번 주"가 아니라 0으로 누락됐다.
    //   → 방이 실제로 active(과정 배정됨)이거나, 기간이 이번 주와 겹치면 집계에 포함한다.
    loadHomeStats: function() {
        const computeAndRender = (d) => {
            const today = getTodayString();
            const _ow = getOutingWindowKST(); // 외출/외박: 자정이 아닌 익일 09:00 기준 운영일 윈도우
            let activeCount=0, studentTotal=0, outingTotal=0, plannedTotal=0;
            const dorm = window._dormRosters || {};
            Object.entries(d).forEach(([room, r]) => {
                if (!r) return;
                const st=r.status||{}, settings=r.settings||{}, students=r.students||{};
                const _allActs=r.admin_actions||{};
                const period = settings.period || '';
                const hasCourse = !!(settings.courseName && String(settings.courseName).trim());
                const isActive  = st.roomStatus === 'active';
                // 테스트·내부 운용(총괄표 비노출) 과정은 통합 현황판 집계에서 제외
                if (settings.hideFromBoard) return;
                // 집계 대상: (1) 현재 방에 과정이 배정/운영 중이거나 (2) 기간이 이번 주와 겹치는 과정
                const ended = ui._isEnded(period);
                const include = !ended && ((isActive && hasCourse) || ui._isThisWeek(period));
                if (!include) return;
                if (isActive) activeCount++;
                // 입교(QR 입실) 인원
                const cnt = new Set(Object.values(students).filter(s=>s&&s.name&&s.name!=='undefined').map(s=>s.name)).size;
                studentTotal += cnt;
                // 예정(지원부 업로드) 인원 — 현재 과정 주차의 지원부 명단
                try {
                    const _cn = String(settings.courseName||'').trim(); let _best=null;
                    for (const _k in dorm){ const _dv=dorm[_k]; if(_dv && Array.isArray(_dv.list) && _dv.list.length && String(_dv.courseName||'').trim()===_cn){ if(!_best||(_dv.updatedAt||0)>(_best.updatedAt||0)) _best=_dv; } }
                    if(_best) plannedTotal += _best.list.length;
                } catch(e){}
                Object.keys(_allActs).forEach(_dt=>{
                    Object.values(_allActs[_dt]||{}).forEach(a=>{
                        if(a&&(a.type==='outing'||a.type==='overnight'||a.type==='group_outing')){
                            const _ts=a.timestamp||0;
                            if(_ts>=_ow.start && _ts<_ow.end && !(a.returned===true||a.returnReportTime)) outingTotal++;
                        }
                    });
                });
            });
            ui._setStat('stat-active-count', activeCount);
            ui._setStat('stat-student-count', studentTotal + ' / ' + plannedTotal);
            ui._setStat('stat-outing-count', outingTotal);
            window._homeStatsData=d; window._homeStatsToday=today;
            // [홈 로딩] 실시간 데이터 최초 도착 → 준비완료 표시 + 로딩 배지 숨김 + 대기중 검색 재실행
            if(!window._homeStatsReady){
                window._homeStatsReady=true;
                try{ var _b=document.getElementById('homeSyncBadge'); if(_b) _b.classList.add('done'); }catch(e){}
            }
            try{
                var _inp=document.getElementById('homeSearchInput');
                if(_inp && String(_inp.value||'').trim()!=='') ui.renderHomeSearch(_inp.value);
            }catch(e){}
        };

        // 실시간 리스너는 1회만 등록 (중복 등록 방지). 등록 시 즉시 최초값으로 렌더된다.
        if (!ui._homeStatsBound) {
            ui._homeStatsBound = true;
            // 지원부 명단(예정 인원) 실시간 구독 → 변동 시 카드 재계산
            firebase.database().ref('system/dorm/rosters').on('value', s => {
                window._dormRosters = s.val() || {};
                if (window._homeStatsData) computeAndRender(window._homeStatsData);
            }, () => {});
            // [홈 검색] 기숙사 배정현황 (검색 결과카드에 표시용)
            firebase.database().ref('system/dorm/assignments').on('value', s => {
                window._dormAssignments = s.val() || {};
            }, () => {});
            firebase.database().ref('courses').on('value', snap => {
                computeAndRender(snap.val() || {});
            }, err => {
                console.warn('[loadHomeStats] 실시간 구독 실패, 1회 조회로 대체:', err && err.message);
                firebase.database().ref('courses').once('value', s => computeAndRender(s.val() || {}));
            });
        } else if (window._homeStatsData) {
            // 이미 구독 중이면 보유 데이터로 즉시 재렌더 (화면 재진입 시 빈 값 깜빡임 방지)
            computeAndRender(window._homeStatsData);
        }
    },

    // 통계 숫자 카운트업 (부드러운 증감). 숫자가 아니면 즉시 출력.
    _statTimers: {},
    _setStat: function(id, value) {
        const el = document.getElementById(id);
        if (!el) return;
        const target = Number(value);
        if (!isFinite(target)) { el.textContent = value; return; }
        const start = Number(String(el.textContent).replace(/[^0-9.-]/g,'')) || 0;
        if (start === target) { el.textContent = target; return; }
        if (ui._statTimers[id]) cancelAnimationFrame(ui._statTimers[id]);
        const dur=600, t0=performance.now();
        const step=(now)=>{
            const p=Math.min((now-t0)/dur,1);
            const eased=1-Math.pow(1-p,3);
            el.textContent=Math.round(start+(target-start)*eased);
            if(p<1) ui._statTimers[id]=requestAnimationFrame(step);
            else { el.textContent=target; delete ui._statTimers[id]; }
        };
        ui._statTimers[id]=requestAnimationFrame(step);
    },

    // ── 홈 통계 팝업 ──
    enterHomeCourse: async function(room) {
        const modal = document.getElementById('homeStatModal');
        if (modal) modal.style.display = 'none';
        try {
            await dataMgr.switchRoomAttempt(String(room || '').toUpperCase());
        } catch (e) {
            console.error('[과정 입장]', e);
            const overlay = document.getElementById('statusOverlay');
            if (overlay) overlay.style.display = 'none';
            if (modal) modal.style.display = 'flex';
            if (typeof showKacAlert === 'function') showKacAlert('과정 입장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        }
    },

    // ── [홈 통합검색] 담임교수 이름 → 이번주 과정 바로가기 ──
    _esc: function(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); },
    // 공지 문자열을 안전하게 HTML로: 리터럴 <br>·줄바꿈을 실제 줄바꿈(<br>)으로 렌더 (XSS 방지 위해 escape 후 <br>만 복원)
    _noticeToHtml: function(s){
        var t = String(s==null?'':s).replace(/<br\s*\/?>/gi, '\n');   // 리터럴 <br> → 줄바꿈
        t = t.replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; });
        return t.replace(/\r?\n/g, '<br>');
    },
    // 과정 진입 후 원하는 메뉴로 바로 이동 (guide=입교안내 / students=입교완료 / dashboard=과정현황)
    enterCourseMode: function(room, mode, fs){
        ui._pendingEnterMode = mode || 'dashboard';
        ui._pendingGuideFullscreen = (!!fs && (mode === 'guide'));   // 입교안내는 진입 즉시 PDF 전체화면
        try { dataMgr.switchRoomAttempt(String(room||'').toUpperCase()); }
        catch(e){ ui._pendingEnterMode = null; ui._pendingGuideFullscreen = false; }
    },
    // [대시보드] 교수 블록 옆 버튼 — 이미 방 안이므로 입교안내로 전환 후 즉시 PDF 전체화면 (홈에서 입교안내 누른 것과 동일)
    openGuideFullscreen: function(){
        try{
            if(!state.room){ if(ui.showAlert) ui.showAlert('과정을 먼저 선택해 주세요.'); return; }
            ui.setMode('guide');
            try{ guideMgr.init(); }catch(e){}
            setTimeout(function(){
                try{ if(guideMgr && guideMgr.toggleFullScreen) guideMgr.toggleFullScreen(); }catch(e){}
            }, 350);
        }catch(e){}
    },
    clearHomeSearch: function(event){
        if(event){ event.preventDefault(); event.stopPropagation(); }
        var inp=document.getElementById('homeSearchInput');
        var wrap=document.getElementById('homeSearchWrap');
        var results=document.getElementById('homeSearchResults');
        var view=document.getElementById('view-home');
        if(inp){ inp.value=''; inp.blur(); }
        if(results) results.innerHTML='';
        if(wrap) wrap.classList.remove('has-text','hs-pressing','hs-dragging');
        if(view) view.classList.remove('home-search-active');
    },
    homeSearchFocus: function(on){
        var v=document.getElementById('view-home'); if(!v) return;
        if(on){ v.classList.add('home-search-active'); }
        else {
            setTimeout(function(){
                var inp=document.getElementById('homeSearchInput');
                if(inp && document.activeElement===inp) return;
                if(inp && inp.value.trim()!=='') return;   // 검색어 있으면 계속 숨김 유지
                v.classList.remove('home-search-active');
            },200);
        }
    },
    // [K1] 검색카드 v2 — 조회 메뉴 접기/펼치기 (기본: 펼침)
    toggleHsrMenu: function(room, btn){
        var card=document.querySelector('.hsr-card[data-room="'+room+'"]');
        if(!card) return;
        var closed=card.classList.toggle('menu-closed');
        if(btn){ var ic=btn.querySelector('i'); if(ic) ic.className='fa-solid '+(closed?'fa-chevron-down':'fa-chevron-up'); }
    },
    // [K1] 교육구분 세트 저장 — 직무일반→평가 없음(근태 10%), 직무법정→필기(90%)+근태(10%)
    //      입교안내 PDF '교육과정 안내' 페이지(guideCourseInfo)와 동일 데이터라 양쪽이 자동 동기화됨
    hsrSetJob: function(room, cat){
        if(state.isObserver){ ui.showAlert('👁️ 옵저버 모드에서는 변경할 수 없습니다.'); return; }
        var ev=(cat==='duty-legal')?'written':'none';
        firebase.database().ref('courses/'+room+'/settings/guideCourseInfo').update({category:cat, evaluation:ev}).catch(function(){});
        var seg=document.getElementById('hsrSeg'+room);
        if(seg){ var btns=seg.querySelectorAll('button'); Array.prototype.forEach.call(btns,function(b,i){ b.classList.toggle('on',(cat==='duty-legal')?i===1:i===0); }); }
    },
    // [K1] 강의장소 선택 드롭다운 — settings/roomDetailName 저장 (연간계획·과정현황 등 전 화면 공통)
    hsrVenueMenu: function(room, evt){
        if(evt){ evt.preventDefault(); evt.stopPropagation(); }
        var old=document.getElementById('hsrVenuePop');
        if(old){ var sameBtn=(old.dataset.room===room); old.remove(); if(sameBtn) return; }
        if(state.isObserver){ ui.showAlert('👁️ 옵저버 모드에서는 변경할 수 없습니다.'); return; }
        var anchor=evt&&(evt.currentTarget||evt.target); if(!anchor) return;
        // 옵션: 설정 모달의 장소 목록(공용 추가 강의실 포함) 재사용
        var opts=[];
        try{
            var sel=document.getElementById('setup-room-select');
            if(sel) Array.prototype.forEach.call(sel.options,function(o){
                var v=String(o.value||'').trim();
                if(v && v.indexOf('직접')<0 && opts.indexOf(v)<0) opts.push(v);
            });
        }catch(e){}
        var esc=ui._esc;
        var pop=document.createElement('div');
        pop.id='hsrVenuePop'; pop.dataset.room=room;
        pop.innerHTML='<button data-v=""><i class="fa-regular fa-circle-question" style="opacity:.6;"></i> 미정으로 두기</button>'
            +opts.map(function(v){ return '<button data-v="'+esc(v)+'"><i class="fa-solid fa-location-dot" style="opacity:.5;"></i> '+esc(v)+'</button>'; }).join('');
        document.body.appendChild(pop);
        var r=anchor.getBoundingClientRect();
        pop.style.left=Math.min(r.left, window.innerWidth-pop.offsetWidth-12)+'px';
        pop.style.top=Math.min(r.bottom+6, window.innerHeight-pop.offsetHeight-12)+'px';
        pop.addEventListener('click',function(ev2){
            ev2.stopPropagation();
            var b=ev2.target.closest('button'); if(!b) return;
            var v=b.dataset.v||'';
            // roomDetailName + 수동 지정 플래그를 함께 저장 → 전 화면 공유 + 자동배치가 덮어쓰지 않고 유지(새로고침 안전).
            // 입교안내 교육장소 오버레이는 venuePick을 우선하므로, 검색카드 선택이 반영되도록 venuePick을 비운다(→ roomDetailName로 자동 표시).
            var _vu={};
            _vu['courses/'+room+'/settings/roomDetailName']=v||null;
            _vu['courses/'+room+'/settings/venuePick']=null;
            _vu['courses/'+room+'/status/roomDetailManual']=true;
            firebase.database().ref().update(_vu).catch(function(){});
            var lbl=document.getElementById('hsrVenue'+room); if(lbl) lbl.textContent=v||'장소 미정';
            // [J12.2] 온라인(Zoom) 선택 시 Zoom 블루 블록 + 비디오 아이콘 즉시 반영
            try{
                var _btn = lbl ? lbl.closest('.hsr2-venue') : null;
                if(_btn){
                    var _isZm = /온라인|zoom/i.test(v||'');
                    _btn.classList.toggle('hsr2-venue-zoom', _isZm);
                    var _ic = _btn.querySelector('i');
                    if(_ic) _ic.className = 'fa-solid ' + (_isZm ? 'fa-video' : 'fa-location-dot');
                }
            }catch(e){}
            pop.remove();
        });
        setTimeout(function(){
            var closer=function(ev3){ if(!pop.contains(ev3.target)){ pop.remove(); document.removeEventListener('mousedown',closer); } };
            document.addEventListener('mousedown',closer);
        },0);
    },
    toggleHomeSearchDetail: function(room, type, event){
        if(event){ event.preventDefault(); event.stopPropagation(); }
        room=String(room||'').toUpperCase();
        var panel=document.getElementById('hsrDetail'+room);
        if(!panel) return;
        var card=panel.closest('.hsr-card');
        var same=panel.dataset.type===type && panel.style.display!=='none';
        if(card) card.querySelectorAll('.hsr-btn[data-detail]').forEach(function(btn){
            btn.classList.toggle('is-open', !same && btn.dataset.detail===type);
        });
        if(same){
            panel.style.display='none';
            panel.dataset.type='';
            return;
        }
        panel.innerHTML=ui.buildHomeSearchDetail(room,type);
        panel.dataset.type=type;
        panel.style.display='block';
        setTimeout(function(){ try{ panel.scrollIntoView({behavior:'smooth',block:'nearest'}); }catch(e){} },30);
    },
    buildHomeSearchDetail: function(room, type){
        var src=(window._homeSearchDetailData||{})[room]||{};
        var r=src.roomData||{}, settings=r.settings||{}, status=r.status||{};
        var esc=ui._esc, norm=function(v){return String(v||'').replace(/\s+/g,'').toLowerCase();};
        var registered=Object.values(r.students||{}).filter(function(s){return s&&s.name&&s.name!=='undefined';});
        var roster=Array.isArray(src.roster)?src.roster:[];
        var requests=Object.values((r.shuttle&&r.shuttle.requests)||{}).filter(Boolean);
        var actions=[];
        (function walk(obj,date){
            Object.keys(obj||{}).forEach(function(k){
                var v=obj[k];
                if(!v||typeof v!=='object') return;
                if(v.name&&(v.type||v.destination||v.reason)){ actions.push(Object.assign({__date:date||k},v)); }
                else walk(v,date||k);
            });
        })(r.admin_actions||{},'');
        function empty(msg){return '<div class="hsr-detail-empty"><i class="fa-regular fa-folder-open"></i>'+esc(msg)+'</div>';}
        function go(mode,label){return '<button class="hsr-detail-go" onclick="event.stopPropagation();ui.enterCourseMode(\''+esc(room)+'\',\''+mode+'\')"><i class="fa-solid fa-arrow-up-right-from-square"></i> '+label+' 전체 화면 열기</button>';}
        var title='', body='';
        if(type==='students'){
            title='<i class="fa-solid fa-users-viewfinder"></i> 수강생 현황';
            var regMap={}; registered.forEach(function(s){regMap[norm(s.name)]=s;});
            var list=roster.length?roster:registered;
            if(!list.length) body=empty('등록된 예정·입교 수강생이 없습니다.');
            else body='<div class="hsr-summary-line"><b>입교 '+registered.length+'명</b><span>예정 '+(roster.length||registered.length)+'명</span></div><div class="hsr-table-wrap"><table class="hsr-table"><thead><tr><th>번호</th><th>성명</th><th>사번</th><th>소속</th><th>상태</th></tr></thead><tbody>'
                +list.map(function(s,i){var live=regMap[norm(s.name)]||{}, done=!!regMap[norm(s.name)];return '<tr><td>'+(i+1)+'</td><td><b>'+esc(s.name||live.name||'-')+'</b></td><td>'+esc(s.empNo||s.sabun||live.empNo||live.phone||'-')+'</td><td>'+esc(s.dept||s.department||live.dept||'-')+'</td><td><span class="hsr-state '+(done?'done':'wait')+'">'+(done?'입교완료':'입교예정')+'</span></td></tr>';}).join('')
                +'</tbody></table></div>'+go('students','수강생 현황');
        }else if(type==='dashboard'){
            title='<i class="fa-solid fa-gauge-high"></i> 과정 현황 <span style="font-size:12px;font-weight:700;color:#94a3b8;">(모니터링)</span>';
            var today=(typeof getTodayString==='function')?getTodayString():'';
            var attn   = (r.internal_attendance && r.internal_attendance[today]) ? Object.keys(r.internal_attendance[today]).length : 0;
            var dinner = (r.dinner_skips && r.dinner_skips[today]) ? Object.keys(r.dinner_skips[today]).length : 0;
            var tablet = r.tablet_loans ? Object.keys(r.tablet_loans).length : 0;
            var qaCnt=0; try{ if(r.questions) qaCnt=Object.values(r.questions).filter(function(q){return q&&q.status!=='delete';}).length; }catch(e){}
            var shu=(r.shuttle&&r.shuttle.requests)?Object.values(r.shuttle.requests):[];
            var sOsong=shu.filter(function(i){return i&&i.type==='osong';}).length;
            var sTerm =shu.filter(function(i){return i&&i.type==='terminal';}).length;
            var sAir  =shu.filter(function(i){return i&&i.type==='airport';}).length;
            var sCar  =shu.filter(function(i){return i&&i.type==='car';}).length;
            var activeOut=actions.filter(function(a){return !(a.returned===true||a.returnReportTime);}).length;
            var adminNotice=r.coordNotice||r.notice||'';
            var enter='event.stopPropagation();ui.enterCourseMode(\''+esc(room)+'\',\'dashboard\')';
            body='<div class="hsr-dash-monitor" onclick="'+enter+'" title="클릭하면 실제 과정현황으로 이동">'
                +'<div class="hsr-dash-hint"><i class="fa-solid fa-hand-pointer"></i> 보기 전용 모니터링 · 클릭하면 실제 과정현황으로 들어갑니다</div>'
                +'<div class="modern-white-card dash-hero-container" style="pointer-events:none; width:100%; margin:0;">'
                +'<div class="course-hero-banner">'
                +'<div class="hero-left"><div class="hero-tag">NOW TRAINING</div><h2>'+esc(settings.courseName||'과정명 미정')+'</h2>'
                +'<div class="hero-info-row"><span class="info-pill"><i class="fa-solid fa-calendar-check"></i> <b>'+esc(settings.period||'-')+'</b></span><span class="info-pill"><i class="fa-solid fa-map-location-dot"></i> <b>'+esc(settings.roomDetailName||settings.roomDetail||('Room '+room))+'</b></span></div></div>'
                +'<div class="hero-right"><div class="prof-glass-card" style="position:relative;"><div class="prof-avatar"><i class="fa-solid fa-user-tie"></i></div><div class="prof-details"><span class="prof-label">과정 담임</span><div class="prof-name-row"><strong>'+esc(status.professorName||'-')+'</strong> <span>교수님</span></div></div></div>'
                +'<div class="date-minimal-box" style="color:rgba(255,255,255,0.9)!important; font-weight:800;"><i class="fa-solid fa-user-tie"></i> 과정담당: <span style="margin-left:5px;">'+esc(settings.coordinatorName||'-')+'</span></div></div>'
                +'</div>'
                +'<div class="dash-premium-grid">'
                +'<div class="stat-premium-card card-blue" style="padding:18px;"><div class="card-content combined-stats">'
                +'<div class="stat-row" style="padding:6px 0;"><span class="card-label">본 과정 수강생 <span style="font-size:11px;color:#94a3b8;font-weight:700;">(예정)</span></span><div class="card-value"><b>'+registered.length+'</b><small>명</small></div></div>'
                +'<div class="stat-divider"></div>'
                +'<div class="stat-row" style="padding:8px 0;"><span class="card-label"><i class="fa-solid fa-keyboard" style="color:#0ea5e9; margin-right:5px;"></i>항공기술훈련원 OTP 출결</span><div class="card-value" style="color:#0ea5e9;"><b>'+attn+'</b><small>명</small></div></div>'
                +'<div class="stat-divider" style="border-top:1px dashed #e2e8f0; margin:2px 0;"></div>'
                +'<div class="stat-row" style="padding:6px 0;"><span class="card-label">외출/외박 현황 (금일)</span><div class="card-value color-coral"><b>'+activeOut+'</b><small>명</small></div></div>'
                +'<div class="stat-divider" style="border-top:1px dashed #e2e8f0; margin:2px 0;"></div>'
                +'<div class="stat-row" style="padding:6px 0;"><span class="card-label">금일 석식 제외 신청</span><div class="card-value" style="color:#10b981;"><b>'+dinner+'</b><small>명</small></div></div>'
                +'</div></div>'
                +'<div class="stat-premium-card card-notice-hub"><div class="notice-hub-header"><i class="fa-solid fa-bullhorn"></i> <span>주요 공지 피드</span></div>'
                +'<div class="notice-hub-content"><div class="notice-item admin"><span class="n-tag">운영</span><p>'+esc(adminNotice||'등록된 운영부 공지가 없습니다.')+'</p></div></div></div>'
                +'<div class="stat-premium-card card-mint">'
                +'<div class="stat-row" style="margin-bottom:12px; padding-bottom:12px; border-bottom:1px dashed #e2e8f0;"><span class="card-label-shuttle" style="margin-bottom:0; color:#003366;"><i class="fa-solid fa-tablet-screen-button" style="color:#6366f1; margin-right:5px;"></i>전자기기 대여 신청</span><div class="card-value" style="color:#6366f1;"><b>'+tablet+'</b><small>명</small></div></div>'
                +'<div class="stat-row" style="margin-bottom:12px; padding-bottom:12px; border-bottom:1px dashed #e2e8f0;"><span class="card-label-shuttle" style="margin-bottom:0; color:#003366;">실시간 Q&A 현황</span><div class="card-value" style="color:#3b82f6;"><b>'+qaCnt+'</b><small>건</small></div></div>'
                +'<div class="card-label-shuttle" style="color:#003366; margin-bottom:10px;">셔틀 탑승 수요 현황</div>'
                +'<div style="background:white; padding:15px; border-radius:12px; border:1px solid #e2e8f0;"><div style="font-size:12px; font-weight:800; color:#3b82f6; margin-bottom:12px; display:flex; align-items:center; gap:5px;"><i class="fa-solid fa-bus"></i> 전체 수송 예정 <span style="margin-left:auto; background:#eff6ff; padding:1px 8px; border-radius:4px;">'+shu.length+'명</span></div>'
                +'<div class="shuttle-scoreboard" style="border:none; padding:0; background:transparent;"><div class="sb-item"><span class="sb-val" style="font-size:22px;">'+sOsong+'</span><span class="sb-txt">오송</span></div><div class="sb-divider" style="height:20px;"></div><div class="sb-item"><span class="sb-val" style="font-size:22px;">'+sTerm+'</span><span class="sb-txt">터미널</span></div><div class="sb-divider" style="height:20px;"></div><div class="sb-item"><span class="sb-val" style="font-size:22px;">'+sAir+'</span><span class="sb-txt">공항</span></div><div class="sb-divider" style="height:20px;"></div><div class="sb-item"><span class="sb-val" style="font-size:22px;">'+sCar+'</span><span class="sb-txt">자차</span></div></div></div>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>';
        }else if(type==='outing'){
            title='<i class="fa-solid fa-person-walking-arrow-right"></i> 외출·외박 현황';
            actions.sort(function(a,b){return (b.timestamp||0)-(a.timestamp||0);});
            if(!actions.length) body=empty('외출·외박 신청 내역이 없습니다.');
            else body='<div class="hsr-table-wrap"><table class="hsr-table"><thead><tr><th>성명</th><th>구분</th><th>행선지</th><th>시간</th><th>상태</th></tr></thead><tbody>'
                +actions.slice(0,30).map(function(a){var kind=a.type==='overnight'?'외박':(a.type==='group_outing'?'단체외출':'외출');var done=(a.returned===true||a.returnReportTime);return '<tr><td><b>'+esc(a.name||'-')+'</b></td><td>'+kind+'</td><td>'+esc(a.destination||a.dest||'-')+'</td><td>'+esc(a.startTime||a.time||a.__date||'-')+'</td><td><span class="hsr-state '+(done?'done':'active')+'">'+(done?'복귀완료':'진행중')+'</span></td></tr>';}).join('')
                +'</tbody></table></div>'+go('admin-action','외출·외박 현황');
        }else if(type==='shuttle'){
            title='<i class="fa-solid fa-bus"></i> 차량수요조사 현황';
            if(!requests.length) body=empty('차량수요조사 신청자가 없습니다.');
            else body='<div class="hsr-table-wrap"><table class="hsr-table"><thead><tr><th>번호</th><th>성명</th><th>목적지·이동방법</th><th>연락처</th></tr></thead><tbody>'
                +requests.map(function(s,i){return '<tr><td>'+(i+1)+'</td><td><b>'+esc(s.name||'-')+'</b></td><td>'+esc(s.typeText||s.destination||s.dest||s.type||'-')+'</td><td>'+esc(s.phone||s.contact||'-')+'</td></tr>';}).join('')
                +'</tbody></table></div>'+go('shuttle','차량수요조사 현황');
        }
        return '<div class="hsr-detail-head"><strong>'+title+'</strong><button onclick="event.stopPropagation();ui.toggleHomeSearchDetail(\''+esc(room)+'\',\''+type+'\',event)" aria-label="접기"><i class="fa-solid fa-chevron-up"></i> 접기</button></div><div class="hsr-detail-body">'+body+'</div>';
    },
    // 검색 결과의 교수 배지 클릭 → 해당 교수 프로필 편집 모달(로드+저장 가능)
    _openProfFromSearch: function(name){
        name=(name||'').trim();
        if(!name || name==='-') return;
        try{
            if(typeof profMgr!=='undefined' && typeof profMgr.openProfileEditor==='function'){
                profMgr.openProfileEditor(name);   // 여기서 firebase 로드 + 모달 표시까지 처리
            } else {
                console.error('[프로필 열기 실패] profMgr.openProfileEditor 없음');
                alert('프로필 편집 기능을 찾지 못했습니다. 새로고침(Ctrl+Shift+R) 후 다시 시도해 주세요.');
            }
        }catch(err){ try{ console.error('[프로필 열기 실패]', err); alert('프로필 편집 창을 여는 중 오류: '+(err&&err.message||err)); }catch(_){} }
    },
    // [담임교수 교체] 교수 배지 클릭 → 교수 리스트 팝업(다른 교수 클릭 시 배정 / 옆 프로필 버튼으로 편집)
    _openProfSwap: function(room, currentName, ev){
        try{ if(ev){ ev.stopPropagation(); ev.preventDefault(); } }catch(_){}
        room = String(room||'').trim(); if(!room) return;
        var cur = String(currentName||'').trim();
        var e = ui._esc;
        var list = (typeof profMgr!=='undefined' && Array.isArray(profMgr.list)) ? profMgr.list.slice() : [];
        // 기존 팝업 제거
        var old = document.getElementById('profSwapModal'); if(old) old.remove();
        var modal = document.createElement('div'); modal.id='profSwapModal'; modal.className='prof-swap-overlay';
        var rows = '';
        if(!list.length){
            rows = '<div class="prof-swap-empty">등록된 교수님이 없습니다. 먼저 [교수님 명단 관리]에서 추가하세요.</div>';
        } else {
            list.forEach(function(p){
                var nm = e(p.name);
                var isCur = (String(p.name).trim()===cur);
                rows += '<div class="prof-swap-item'+(isCur?' is-current':'')+'">'
                      + '<button class="prof-swap-pick" onclick="ui._assignProfToRoom(\''+e(room)+'\',\''+nm+'\')" title="이 교수로 담임 배정">'
                      + (isCur?'<i class="fa-solid fa-circle-check"></i>':'<i class="fa-regular fa-circle"></i>')
                      + '<span class="prof-swap-name">'+nm+'</span>'
                      + (isCur?'<span class="prof-swap-badge">현재</span>':'')
                      + '</button>'
                      + '<button class="prof-swap-edit" onclick="var m=document.getElementById(\'profSwapModal\'); if(m) m.remove(); ui._openProfFromSearch(\''+nm+'\');" title="프로필 편집">프로필</button>'
                      + '</div>';
            });
        }
        modal.innerHTML =
            '<div class="prof-swap-box" onclick="event.stopPropagation();">'
          + '<div class="prof-swap-head"><h3><i class="fa-solid fa-user-pen"></i> 담임교수 교체</h3>'
          + '<button class="prof-swap-close" onclick="document.getElementById(\'profSwapModal\').remove();" aria-label="닫기"><i class="fa-solid fa-xmark"></i></button></div>'
          + '<p class="prof-swap-desc">다른 교수님을 누르면 이 과정의 담임으로 배정됩니다. <b>연간교육계획에도 함께 반영</b>됩니다.</p>'
          + '<div class="prof-swap-list">'+rows+'</div>'
          + '</div>';
        modal.addEventListener('click', function(ev2){ if(ev2.target===modal) modal.remove(); });
        document.body.appendChild(modal);
    },
    // [담임교수 배정] 방 status + 연간계획(system/annualPlan) 함께 갱신
    _assignProfToRoom: async function(room, name){
        room=String(room||'').trim(); name=String(name||'').trim();
        if(!room || !name) return;
        var updates={};
        updates['courses/'+room+'/status/professorName']=name;
        updates['courses/'+room+'/status/professorManual']=true;   // 수동 지정 — 연간계획 자동동기화가 덮어쓰지 않도록 보존
        // 오픈톡방 링크 동기화
        try{ var ks=await firebase.database().ref('system/professorProfiles/'+name+'/kakaoLink').get(); updates['courses/'+room+'/settings/kakaoLink']=ks.val()||''; }catch(e){}
        // 연간교육계획도 함께 수정: 이 방의 과정명·기간과 일치하는 계획 항목의 교수(prof) 갱신
        try{
            var cs=await firebase.database().ref('courses/'+room+'/settings').once('value');
            var s=cs.val()||{};
            var courseName=String(s.courseName||'').trim();
            var period=String(s.period||'').replace(/\s+/g,'');
            if(courseName){
                var ps=await firebase.database().ref('system/annualPlan').once('value');
                var pdata=ps.val();
                if(pdata){
                    var keys=Array.isArray(pdata)? pdata.map(function(_,i){return i;}) : Object.keys(pdata);
                    var norm=function(x){ return String(x||'').replace(/\s+/g,'').toLowerCase(); };
                    keys.forEach(function(k){
                        var c=pdata[k]; if(!c) return;
                        if(norm(c.name)!==norm(courseName)) return;
                        var cPeriod=String(c.period || ((c.startDate&&c.endDate)? (c.startDate+' ~ '+c.endDate):'')).replace(/\s+/g,'');
                        // 기간 정보가 양쪽에 있으면 기간까지 일치하는 항목만(같은 과정명 다른 주차 오작동 방지)
                        if(period && cPeriod && cPeriod!==period) return;
                        updates['system/annualPlan/'+k+'/prof']=name;
                    });
                }
            }
        }catch(e){ console.warn('[담임교수 교체] 연간계획 반영 실패:', e); }
        try{
            await firebase.database().ref().update(updates);
            var m=document.getElementById('profSwapModal'); if(m) m.remove();
            if(ui.showAlert) ui.showAlert('✅ 담임교수를 '+name+' 교수로 교체했습니다. (연간계획 반영)');
            // 검색창을 새 교수명으로 자동 갱신 → 교체 후에도 결과가 사라지지 않고 그대로 보이게
            try{ var inp=document.getElementById('homeSearchInput'); if(inp){ inp.value=name; ui.renderHomeSearch(name); } }catch(e){}
        }catch(err){ try{ alert('배정 중 오류: '+(err&&err.message||err)); }catch(_){} }
    },
    // [과정담당 교체] 담당자 목록 팝업 (교수 교체와 동일 UX · 프로필 버튼 없음)
    _openCoordSwap: function(room, currentName, ev){
        try{ if(ev){ ev.stopPropagation(); ev.preventDefault(); } }catch(_){}
        room = String(room||'').trim(); if(!room) return;
        var cur = String(currentName||'').replace(/^과정담당[:：]?\s*/,'').trim();
        var e = ui._esc;
        var list = (typeof coordMgr!=='undefined' && Array.isArray(coordMgr.list)) ? coordMgr.list.slice() : [];
        var old = document.getElementById('coordSwapModal'); if(old) old.remove();
        var modal = document.createElement('div'); modal.id='coordSwapModal'; modal.className='prof-swap-overlay';
        var rows = '<div class="prof-swap-item'+((!cur||cur==='-'||cur==='미지정')?' is-current':'')+'">'
                 + '<button class="prof-swap-pick" onclick="ui._assignCoordToRoom(\''+e(room)+'\',\'\')" title="담당자 미지정">'
                 + ((!cur||cur==='-'||cur==='미지정')?'<i class="fa-solid fa-circle-check"></i>':'<i class="fa-regular fa-circle"></i>')
                 + '<span class="prof-swap-name" style="color:#94a3b8;">(미지정)</span></button></div>';
        if(!list.length){
            rows += '<div class="prof-swap-empty">등록된 과정담당자가 없습니다. 교육운영부에서 담당자를 등록하면 여기에 표시됩니다.</div>';
        } else {
            list.forEach(function(c){
                var nm = e(c.name||'');
                var isCur = (String(c.name||'').trim()===cur);
                rows += '<div class="prof-swap-item'+(isCur?' is-current':'')+'">'
                      + '<button class="prof-swap-pick" onclick="ui._assignCoordToRoom(\''+e(room)+'\',\''+nm+'\')" title="이 담당자로 배정">'
                      + (isCur?'<i class="fa-solid fa-circle-check"></i>':'<i class="fa-regular fa-circle"></i>')
                      + '<span class="prof-swap-name">'+nm+'</span>'
                      + (isCur?'<span class="prof-swap-badge">현재</span>':'')
                      + '</button></div>';
            });
        }
        modal.innerHTML =
            '<div class="prof-swap-box" onclick="event.stopPropagation();">'
          + '<div class="prof-swap-head"><h3><i class="fa-solid fa-user-gear"></i> 과정담당 교체</h3>'
          + '<button class="prof-swap-close" onclick="document.getElementById(\'coordSwapModal\').remove();" aria-label="닫기"><i class="fa-solid fa-xmark"></i></button></div>'
          + '<p class="prof-swap-desc">과정 운영 담당자(행정)를 선택하세요.</p>'
          + '<div class="prof-swap-list">'+rows+'</div>'
          + '</div>';
        modal.addEventListener('click', function(ev2){ if(ev2.target===modal) modal.remove(); });
        document.body.appendChild(modal);
    },
    _assignCoordToRoom: async function(room, name){
        room=String(room||'').trim(); name=String(name||'').trim();
        if(!room) return;
        var updates={};
        updates['courses/'+room+'/settings/coordinatorName']=name;
        updates['courses/'+room+'/status/coordManual']=name?true:null;   // [J10] 수동 지정 보존
        try{
            await firebase.database().ref().update(updates);
            var m=document.getElementById('coordSwapModal'); if(m) m.remove();
            var el=document.getElementById('dashCoordName'); if(el) el.textContent=name||'-';
            if(ui.showAlert) ui.showAlert('✅ 과정담당을 '+(name||'미지정')+'(으)로 변경했습니다.');
        }catch(err){ try{ alert('배정 중 오류: '+(err&&err.message||err)); }catch(_){} }
    },
    renderHomeSearch: function(q){
        var box=document.getElementById('homeSearchResults');
        var v=document.getElementById('view-home');
        var wrap=document.getElementById('homeSearchWrap');
        if(!box) return;
        var raw=String(q==null?'':q).trim();
        if(wrap) wrap.classList.toggle('has-text', raw!=='');
        if(!raw){
            box.innerHTML='';
            var inp=document.getElementById('homeSearchInput');
            if(v && !(inp && document.activeElement===inp)) v.classList.remove('home-search-active');
            return;
        }
        if(v) v.classList.add('home-search-active');
        // [홈 로딩] 실시간 데이터가 아직 안 들어왔으면 빈결과 대신 로딩 안내 → 도착 즉시 자동 재검색됨
        if(!window._homeStatsReady){
            box.innerHTML='<div class="hsr-loading"><span class="hsb-spin"></span> 실시간 데이터를 불러오는 중입니다…<br><span style="font-weight:600;font-size:13px;color:#94a3b8;">잠시 후 검색 결과가 자동으로 표시됩니다.</span></div>';
            return;
        }
        var ql=raw.toLowerCase();
        var data=window._homeStatsData||{};
        var dorm=window._dormRosters||{};
        var assign=window._dormAssignments||{};
        var nn=function(s){ return String(s||'').replace(/\s+/g,'').toLowerCase(); };
        // 기숙사 배정된 이름 집합(건물이 실제 배정된 경우만)
        var assignedSet={}, assignBuild={};
        try{ Object.keys(assign).forEach(function(kk){ var vv=assign[kk]; if(vv&&vv.building&&vv.building!=='-'){ var _ak=nn(String(kk).split('_')[0]); assignedSet[_ak]=1; assignBuild[_ak]=vv.building; } }); }catch(e){}
        var results=[];
        window._homeSearchDetailData={};
        Object.keys(data).forEach(function(room){
            var r=data[room]; if(!r) return;
            var st=r.status||{}, settings=r.settings||{}, students=r.students||{};
            if(settings.hideFromBoard) return;
            var course=String(settings.courseName||'').trim();
            var period=String(settings.period||'');
            var prof=String(st.professorName||'');
            var ended=(ui._isEnded?ui._isEnded(period):false);
            var thisWeek=(ui._isThisWeek?ui._isThisWeek(period):false);
            var isActive=(st.roomStatus==='active');
            var include=!ended && ((isActive && course) || thisWeek);
            if(!include) return;
            if(prof.toLowerCase().indexOf(ql)<0) return;   // 담임교수만 검색
            var stuNames=[]; try{ Object.values(students).forEach(function(s){ if(s&&s.name&&s.name!=='undefined') stuNames.push(String(s.name).trim()); }); }catch(e){}
            var planned=0, rosterNames=[], rosterList=[];
            try{ var best=null; for(var k in dorm){ var dv=dorm[k]; if(dv&&Array.isArray(dv.list)&&dv.list.length&&String(dv.courseName||'').trim()===course){ if(!best||(dv.updatedAt||0)>(best.updatedAt||0)) best=dv; } } if(best){ rosterList=best.list.slice(); planned=best.list.length; best.list.forEach(function(s){ if(s&&s.name) rosterNames.push(String(s.name).trim()); }); } }catch(e){}
            var cnt=new Set(stuNames).size;
            var assigned=0; try{ rosterNames.forEach(function(n){ if(assignedSet[nn(n)]) assigned++; }); }catch(e){}
            var outing=0; try{ var acts=r.admin_actions||{}; Object.keys(acts).forEach(function(dt){ var day=acts[dt]||{}; Object.keys(day).forEach(function(id){ var a=day[id]; if(a&&(a.type==='outing'||a.type==='overnight'||a.type==='group_outing')&&!(a.returned===true||a.returnReportTime)) outing++; }); }); }catch(e){}
            var depart=0; try{ var req=(r.shuttle&&r.shuttle.requests)||{}; depart=Object.keys(req).length; }catch(e){}
            var kakaoOn=false; try{ kakaoOn=!!(settings.kakaoLink&&String(settings.kakaoLink).trim()); }catch(e){}   // [J5] 오픈톡방 등록 여부
            window._homeSearchDetailData[room]={roomData:r,roster:rosterList};
            results.push({room:room, course:course||'(과정명 미정)', period:period, prof:prof, cnt:cnt, planned:planned, assigned:assigned, outing:outing, depart:depart, kakao:kakaoOn,
                venue:String(settings.roomDetailName||'').trim(),                                  // [K1] 강의장소 (연간계획·전 화면 공통 roomDetailName)
                cat:String(((settings.guideCourseInfo||{}).category)||'duty-general')});           // [K1] 교육구분 (입교안내 PDF '교육과정 안내'와 동일 데이터)
        });
        var e=ui._esc;
        if(!results.length){
            box.innerHTML='<div class="hsr-empty">"'+e(raw)+'" 담임교수의 <b>이번주 진행 과정</b>을 찾지 못했습니다.<br><span style="font-weight:600;font-size:13px;">이름 철자 또는 배정 여부를 확인해 주세요.</span></div>';
            return;
        }
        var ichip=function(icon,color,label,val,room,mode){ return '<span class="hsr-chip" onclick="event.stopPropagation();ui.enterCourseMode(\''+room+'\',\''+mode+'\')" title="'+label+' 화면으로 이동"><i class="fa-solid '+icon+'" style="color:'+color+'"></i>'+label+' <b>'+val+'</b></span>'; };
        box.innerHTML=results.map(function(x){
            var studInfo='입교 '+x.cnt+(x.planned?(' / '+x.planned):'')+'명';
            var chips=[];
            if(x.planned) chips.push(ichip('fa-clipboard-user','#0ea5e9','예정',x.planned+'명',e(x.room),'students'));
            if(x.assigned) chips.push(ichip('fa-bed','#9333ea','기숙사',x.assigned+'명',e(x.room),'dormitory'));
            if(x.outing) chips.push(ichip('fa-person-walking-arrow-right','#f43f5e','외출·외박',x.outing+'건',e(x.room),'admin-action'));
            if(x.depart) chips.push('<span class="hsr-chip" onclick="event.stopPropagation();ui.toggleHomeSearchDetail(\''+e(x.room)+'\',\'shuttle\',event)" title="퇴교차량 신청현황 바로 보기"><i class="fa-solid fa-bus" style="color:#16a34a"></i>퇴교차량 <b>'+x.depart+'건</b></span>');   // [J5] 인라인 펼침
            var infoHtml = chips.length ? ('<div class="hsr-info">'+chips.join('')+'</div>') : '';
            // [K1] 검색카드 v2: 요약형 (제목+메타 / 대각선 분할 버튼 / 아이콘 조회 메뉴 즉시 노출)
            return '<div class="hsr-card hsr-v2" data-room="'+e(x.room)+'">'
                +'<div class="hsr2-head">'
                +'<div class="hsr2-info">'
                +'<div class="hsr2-title">'+e(x.course)+'</div>'
                +'<div class="hsr2-meta">'
                +(x.period?'<span>'+e(x.period)+'</span><span class="hsr2-dot">·</span>':'')
                +'<button class="hsr2-venue'+(/온라인|zoom/i.test(x.venue||'')?' hsr2-venue-zoom':'')+'" onclick="ui.hsrVenueMenu(\''+e(x.room)+'\',event)" title="클릭하여 강의장소 선택 (연간계획 등 전 화면 공통 적용)"><i class="fa-solid '+(/온라인|zoom/i.test(x.venue||'')?'fa-video':'fa-location-dot')+'"></i><span id="hsrVenue'+e(x.room)+'">'+(x.venue?e(x.venue):'장소 미정')+'</span><i class="fa-solid fa-chevron-down hsr2-venue-cv"></i></button>'
                +'<span class="hsr2-dot">·</span>'
                +'<span class="hsr2-seg" id="hsrSeg'+e(x.room)+'" onclick="event.stopPropagation();" title="교육구분 — 입교안내 \'교육과정 안내\' 페이지와 연동 (평가 방식도 세트로 설정)">'
                +'<button class="'+(x.cat==='duty-legal'?'':'on')+'" onclick="ui.hsrSetJob(\''+e(x.room)+'\',\'duty-general\')">직무일반</button>'
                +'<button class="'+(x.cat==='duty-legal'?'on':'')+'" onclick="ui.hsrSetJob(\''+e(x.room)+'\',\'duty-legal\')">직무법정</button>'
                +'</span>'
                +'</div>'
                +'</div>'
                +'<div class="hsr2-right" onclick="event.stopPropagation();">'
                +'<div class="hsr2-pill'+(x.kakao?'':' no-kakao')+'">'
                +'<button class="hp-left" onclick="ui.enterCourseMode(\''+e(x.room)+'\',\'guide\',true)" title="입교안내 전체화면"><i class="fa-solid fa-file-pdf"></i> 입교안내 <i class="fa-solid fa-expand hp-x"></i></button>'
                +'<button class="hp-right" onclick="event.stopPropagation();ui._openProfSwap(\''+e(x.room)+'\',\''+e(x.prof||'')+'\',event)" title="'+(x.kakao?'오픈톡방 등록됨 · ':'')+'클릭하여 담임교수 교체 · 프로필 편집"><i class="fa-solid '+(x.kakao?'fa-comment':'fa-user-tie')+'"></i> '+e(x.prof||'-')+' 교수</button>'
                +'</div>'
                +'</div>'
                +'</div>'
                +infoHtml
                +'<div class="hsr2-menu" onclick="event.stopPropagation();">'
                +'<button class="hsr-btn" data-detail="students" onclick="ui.toggleHomeSearchDetail(\''+e(x.room)+'\',\'students\',event)"><i class="fa-solid fa-users-viewfinder hsr2-ico"></i>수강생 현황<i class="fa-solid fa-chevron-down hsr2-hint"></i></button>'
                +'<button class="hsr-btn" data-detail="outing" onclick="ui.toggleHomeSearchDetail(\''+e(x.room)+'\',\'outing\',event)"><i class="fa-solid fa-person-walking-arrow-right hsr2-ico"></i>외출·외박<i class="fa-solid fa-chevron-down hsr2-hint"></i></button>'
                +'<button class="hsr-btn" data-detail="shuttle" onclick="ui.toggleHomeSearchDetail(\''+e(x.room)+'\',\'shuttle\',event)"><i class="fa-solid fa-bus hsr2-ico"></i>차량수요조사<i class="fa-solid fa-chevron-down hsr2-hint"></i></button>'
                +'<button class="hsr-btn" onclick="ui.enterCourseMode(\''+e(x.room)+'\',\'dashboard\')"><i class="fa-solid fa-gauge-high hsr2-ico"></i>과정현황<i class="fa-solid fa-arrow-up-right-from-square hsr2-hint"></i></button>'
                +'</div><div class="hsr-detail" id="hsrDetail'+e(x.room)+'" style="display:none;"></div></div>';
        }).join('');
    },

    openHomeStatModal: async function(type) {
        // 특정 과정(강의실)에 진입한 상태에서는 전 과정 통합 현황 팝업을 띄우지 않음.
        // (이 팝업은 메인/포털 현황판 전용)
        if (state.room) return;
        const modal=document.getElementById('homeStatModal');
        const title=document.getElementById('homeStatModalTitle');
        const body=document.getElementById('homeStatModalBody');
        if(!modal) return;
        const d=window._homeStatsData||{}, today=window._homeStatsToday||getTodayString();
        modal.style.display='flex';
        // 세 통계 팝업은 교육인원 팝업을 기준으로 같은 크기와 여백을 사용한다.
        try{ const _box=modal.querySelector('div'); if(_box){ _box.style.width='92%'; _box.style.maxWidth='1180px'; _box.style.maxHeight='92vh'; _box.style.padding='clamp(20px,3vh,34px) clamp(22px,3vw,40px)'; } if(title){ title.style.fontSize='clamp(20px,2.3vw,28px)'; title.style.textAlign='left'; title.style.marginBottom='clamp(14px,2.2vh,24px)'; title.style.paddingBottom='clamp(10px,1.4vh,16px)'; title.style.borderBottom='1px solid #eef2f7'; } }catch(e){}
        const esc=function(s){return (s==null?'':String(s)).replace(/[&<>"]/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]);});};
        // 이번 주 월~금 정확한 기간(토·일은 차주 월요일 기준)
        const _wkRange=(function(){ var now=new Date(); var dow=now.getDay(); var off=(dow===0)?1:(dow===6)?2:(1-dow); var mon=new Date(now); mon.setDate(now.getDate()+off); mon.setHours(0,0,0,0); var fri=new Date(mon); fri.setDate(mon.getDate()+4); var W=['일','월','화','수','목','금','토']; var f=function(dt){ return (dt.getMonth()+1)+'.'+dt.getDate()+'('+W[dt.getDay()]+')'; }; return f(mon)+' ~ '+f(fri); })();
        // [통일된 제목 구조] 좌측정렬 · 메인 제목("항공기술훈련원 ~ 현황") + 파란 부제목(주차·부속정보) — 3개 팝업 공통
        const _statTitle=function(main, sub){
            return '<div style="text-align:left;font-weight:900;line-height:1.3;">'+main+'</div>'
                +(sub?'<div style="text-align:left;font-size:clamp(13px,1.5vw,18px);color:#2563eb;font-weight:800;margin-top:7px;">'+sub+'</div>':'');
        };
        // 카드 집계와 동일 기준: 현재 과정이 배정된 active 방 OR 이번 주와 겹치는 과정
        const weekRooms=Object.entries(d).filter(([,r])=>{
            const s=(r&&r.settings)||{}, st=(r&&r.status)||{};
            if (s.hideFromBoard) return false;
            const hasCourse=!!(s.courseName && String(s.courseName).trim());
            if (ui._isEnded(s.period||'')) return false;
            return (st.roomStatus==='active' && hasCourse) || ui._isThisWeek(s.period||'');
        });
        if(type==='active'){
            title.innerHTML=_statTitle('🏫 항공기술훈련원 운영 과정 현황', _wkRange+' 주차 <span style="color:#94a3b8;font-weight:700;">(현재 강의 중인 과정)</span>');
            const rows=weekRooms.filter(([,r])=>(r.status||{}).roomStatus==='active').map(([room,r])=>{
                const prof=(r.status||{}).professorName||'-', course=(r.settings||{}).courseName||'-';
                const _isOnline=/온라인|zoom/i.test(String((r.settings||{}).roomDetailName||''));   // 대면/비대면 구분(강의실=온라인/Zoom 이면 비대면)
                const _mode=_isOnline
                    ? '<span title="비대면(온라인·Zoom) 과정" style="display:inline-flex;align-items:center;gap:5px;flex:0 0 auto;padding:5px 12px;border-radius:999px;background:#e0f2fe;color:#0369a1;font-size:clamp(12px,1.2vw,15px);font-weight:900;white-space:nowrap;"><i class="fa-solid fa-video"></i> 비대면</span>'
                    : '<span title="대면(집합) 과정" style="display:inline-flex;align-items:center;gap:5px;flex:0 0 auto;padding:5px 12px;border-radius:999px;background:#eef2ff;color:#4338ca;font-size:clamp(12px,1.2vw,15px);font-weight:900;white-space:nowrap;"><i class="fa-solid fa-chalkboard-user"></i> 대면</span>';
                return `<div role="button" tabindex="0" onclick="ui.enterHomeCourse('${room}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();ui.enterHomeCourse('${room}');}" title="클릭하면 이 과정으로 입장합니다" style="display:flex;justify-content:space-between;align-items:center;gap:18px;min-height:70px;padding:15px 20px;background:#eff6ff;border:1px solid #dbeafe;border-radius:14px;margin-bottom:12px;cursor:pointer;transition:background .15s, transform .15s, box-shadow .15s;" onmouseover="this.style.background='#dbeafe';this.style.transform='translateY(-2px)';this.style.boxShadow='0 10px 26px rgba(37,99,235,.20)';" onmouseout="this.style.background='#eff6ff';this.style.transform='none';this.style.boxShadow='none';">
                    <div style="display:grid;grid-template-columns:auto clamp(230px,27vw,380px) auto;align-items:center;gap:clamp(12px,1.6vw,20px);min-width:0;">
                        <span style="font-weight:900;color:#fff;background:#3b82f6;padding:8px 15px;border-radius:10px;font-size:clamp(14px,1.4vw,18px);white-space:nowrap;">Room #${room}</span>
                        <span style="font-size:clamp(17px,1.8vw,23px);color:#0f172a;font-weight:900;word-break:keep-all;min-width:0;">${course}</span>
                        ${_mode}
                    </div>
                    <span style="font-size:clamp(14px,1.5vw,18px);color:#475569;font-weight:900;white-space:nowrap;">${prof} 교수 <i class="fa-solid fa-arrow-right-to-bracket" style="margin-left:12px;color:#3b82f6;"></i></span></div>`;
            }).join('');
            body.innerHTML=rows?'<div style="display:flex;flex-direction:column;gap:clamp(10px,1.3vh,18px);">'+rows+'</div>':'<p style="color:#94a3b8;text-align:center;padding:36px;font-size:20px;">이번 주 강의 중인 과정이 없습니다.</p>';
        } else if(type==='students'){
            title.innerHTML=_statTitle('👩‍🎓 항공기술훈련원 교육생 현황', _wkRange+' 주차 <span style="color:#94a3b8;font-weight:700;">(소속 분포 · 예정명단 기준)</span>');
            const _legend='';
            let dormAll={};
            try{ dormAll=(await firebase.database().ref('system/dorm/rosters').once('value')).val()||{}; }catch(e){}
            // [이번 주 전체 소속 분포] 모든 과정 예정 명단의 소속(dept)→지역 집계 (우측 지도용)
            const _agg={}; let _aggUnknown=0, _aggTotal=0;
            const rows=weekRooms.map(([room,r])=>{
                const course=(r.settings||{}).courseName||'-';
                const _period=(r.settings||{}).period||'';
                const _start=_period.indexOf('~')>=0?_period.split('~')[0].trim():'';
                let list=[];
                try{ const _cn=String(course).trim(); let _best=null; for(const _k in dormAll){ const _dv=dormAll[_k]; if(_dv && Array.isArray(_dv.list) && _dv.list.length && String(_dv.courseName||'').trim()===_cn){ if(!_best||(_dv.updatedAt||0)>(_best.updatedAt||0)) _best=_dv; } } if(_best) list=_best.list; }catch(e){}
                // 소속 분포 집계 (예정 명단 소속 기준)
                list.forEach(function(pp){ var reg=ui._deptToRegion((pp&&pp.dept)||''); if(reg){ _agg[reg]=(_agg[reg]||0)+1; _aggTotal++; } else { _aggUnknown++; } });
                const _arrivedSet=new Set(Object.values(r.students||{}).filter(s=>s&&s.name&&s.name!=='undefined').map(s=>String(s.name).trim())); const stuCnt=_arrivedSet.size;
                const cnt=list.length;
                const uid='hsR_'+room;
                // 명단(예정)에 없어도 QR로 입교한 교육생은 표에 추가 표시
                const _rosterNm=new Set(list.map(x=>String(x&&x.name||'').trim()).filter(Boolean));
                const _qrOnly=Object.values(r.students||{}).filter(s=>s&&s.name&&s.name!=='undefined'&&!_rosterNm.has(String(s.name).trim())).map(s=>({name:s.name,empNo:(s.empNo||s.employeeNo||''),dept:(s.dept||''),_qr:true}));
                const _disp=list.concat(_qrOnly);
                let detail;
                if(_disp.length){
                    detail='<table style="width:100%;border-collapse:collapse;font-size:13px;margin-top:10px;">'
                      +'<thead><tr style="color:#64748b;background:#f8fafc;">'
                      +'<th style="padding:8px;text-align:center;border-bottom:1px solid #e2e8f0;width:54px;">연번</th>'
                      +'<th style="padding:8px;text-align:center;border-bottom:1px solid #e2e8f0;">사번</th>'
                      +'<th style="padding:8px;text-align:left;border-bottom:1px solid #e2e8f0;">소속</th>'
                      +'<th style="padding:8px;text-align:left;border-bottom:1px solid #e2e8f0;">이름</th>'
                      +'</tr></thead><tbody>'
                      +_disp.map((s,i)=>'<tr>'
                          +'<td style="padding:7px 8px;text-align:center;border-bottom:1px solid #f1f5f9;color:#94a3b8;">'+(_arrivedSet.has(String(s.name||'').trim()) ? '<span title="입교 완료" style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;background:#10b981;color:#fff;font-size:12px;"><i class="fa-solid fa-check"></i></span>' : (s.seq||i+1))+'</td>'
                          +'<td style="padding:7px 8px;text-align:center;border-bottom:1px solid #f1f5f9;color:#64748b;white-space:nowrap;">'+esc(s.empNo||'-')+'</td>'
                          +'<td style="padding:7px 8px;border-bottom:1px solid #f1f5f9;color:#475569;word-break:keep-all;">'+(s._qr&&!s.dept ? '<span style="color:#10b981;font-weight:700;">QR 입교(명단 외)</span>' : esc(s.dept||'-'))+'</td>'
                          +'<td style="padding:7px 8px;border-bottom:1px solid #f1f5f9;font-weight:800;color:#0f172a;">'+esc(s.name||'-')+'</td>'
                      +'</tr>').join('')
                      +'</tbody></table>';
                } else {
                    detail='<p style="color:#94a3b8;text-align:center;padding:18px;font-size:14px;">운영부 명단도, 입교한 교육생도 아직 없습니다.</p>';
                }
                return '<div style="background:#f0fdf4;border:1px solid #dcfce7;border-radius:14px;margin-bottom:12px;overflow:hidden;">'
                  +'<div onclick="ui.toggleHomeDetail(\''+uid+'\')" title="클릭하면 명단을 봅니다" style="display:flex;justify-content:space-between;align-items:center;padding:18px 22px;cursor:pointer;">'
                    +'<div style="display:flex;align-items:center;gap:12px;min-width:0;flex:1;">'
                      +'<span style="flex-shrink:0;font-weight:900;color:#fff;background:#10b981;padding:7px 14px;border-radius:10px;font-size:clamp(14px,1.5vw,19px);white-space:nowrap;">Room #'+room+'</span>'
                      +'<span style="flex:0 1 auto;min-width:0;font-size:clamp(15px,1.6vw,21px);color:#0f172a;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+esc(course)+'</span>'
                      +'<i class="fa-solid fa-chevron-right hs-chev" style="color:#cbd5e1;font-size:13px;transition:transform .2s;margin-left:2px;flex-shrink:0;"></i>'
                    +'</div>'
                    +'<div style="display:flex;align-items:flex-end;gap:8px;white-space:nowrap;">'
                      +'<div style="text-align:center;"><div style="font-size:11px;color:#64748b;font-weight:800;margin-bottom:2px;">입교</div><div style="font-size:clamp(22px,2.4vw,30px);font-weight:900;color:#10b981;line-height:1;">'+stuCnt+'</div></div>'
                      +'<div style="font-size:18px;color:#94a3b8;font-weight:700;padding-bottom:2px;">/</div>'
                      +'<div style="text-align:center;"><div style="font-size:11px;color:#64748b;font-weight:800;margin-bottom:2px;">예정</div><div style="font-size:clamp(22px,2.4vw,30px);font-weight:900;color:#0f172a;line-height:1;">'+cnt+'</div></div>'
                      +'<div style="font-size:13px;color:#64748b;font-weight:800;padding-bottom:2px;">명</div>'
                    +'</div>'
                  +'</div>'
                  +'<div id="'+uid+'" style="display:none;padding:0 22px 18px;">'+detail+'</div>'
                +'</div>';
            }).join('');
            const _listHtml = rows ? (_legend+rows) : '<p style="color:#94a3b8;text-align:center;padding:30px;font-size:16px;">이번 주 교육생 정보가 없습니다.</p>';
            const _sorted=Object.keys(_agg).sort((a,b)=>_agg[b]-_agg[a]);
            const _distGrid = _sorted.length ? _sorted.map(n=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 11px;background:#f8fafc;border:1px solid #eef2f7;border-radius:8px;"><span style="font-weight:700;color:#334155;font-size:13.5px;">${esc(n)}</span><span style="font-weight:900;color:#10b981;font-size:14px;">${_agg[n]}명</span></div>`).join('') : '<div style="grid-column:1/-1;padding:14px;color:#94a3b8;text-align:center;font-size:13px;">예정 명단 소속 정보가 없습니다.</div>';
            const _unknownNote = _aggUnknown ? `<div style="font-size:12px;color:#94a3b8;">· 소속 구분 불가 ${_aggUnknown}명은 지도에서 제외</div>` : '';
            const _mapPanel = `<div style="display:flex;flex-direction:column;gap:10px;">`
                + `<div id="homeStatMapKakao" style="width:100%;height:clamp(360px,58vh,700px);border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;background:#eaf2fb;"></div>`
                + `<div style="display:flex;justify-content:space-between;align-items:center;padding:11px 16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;"><span style="font-weight:900;color:#166534;font-size:clamp(16px,1.8vw,22px);">합계</span><span style="font-weight:900;color:#16a34a;font-size:clamp(16px,1.8vw,22px);">${_aggTotal+_aggUnknown}명</span></div>`
                + _unknownNote
                + `</div>`;
            body.innerHTML = `<div style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap;">`
                + `<div style="flex:1.4 1 330px;min-width:0;"><div style="font-size:clamp(17px,1.9vw,23px);font-weight:900;color:#0f172a;margin-bottom:12px;">👩‍🎓 과정별 교육생 현황</div>${_listHtml}</div>`
                + `<div style="flex:1 1 340px;min-width:0;"><div style="font-size:clamp(17px,1.9vw,23px);font-weight:900;color:#0f172a;margin-bottom:12px;">📊 전체 교육생 소속 분포</div>${_mapPanel}</div>`
                + `</div>`
                + `<div class="screen-hint" style="margin-top:18px;">`
                +   `<i class="fa-solid fa-circle-info"></i>`
                +   `<div class="hint-body">`
                +     `<span class="hint-title">보는 방법</span>`
                +     `<span class="hint-line">• <b>입교</b> — 이번 주 실제 입교완료(QR 입장) 인원.</span>`
                +     `<span class="hint-line">• <b>예정</b> — 배정 명단(예정) 인원.</span>`
                +     `<span class="hint-line">• 왼쪽 <b>과정을 클릭</b>하면 해당 과정 상세로 이동합니다.</span>`
                +     `<span class="hint-line">• 오른쪽 지도는 <b>교육생 소속(근무지) 지역 분포</b>이며, 소속 구분이 안 되는 인원은 지도에서 제외됩니다.</span>`
                +   `</div>`
                + `</div>`;
            // 우측 카카오맵(집계된 전체 분포) — 외부 카카오 API라 Firebase 트래픽 증가 없음
            ui._regionLL = ui._regionLL || { '서울':[37.5586,126.7906],'인천':[37.4602,126.4407],'강원':[37.8813,127.7300],'양양':[38.0613,128.6690],'원주':[37.4416,127.9606],'송탄':[37.0807,127.0353],'청주':[36.7166,127.4990],'예천':[36.6320,128.3549],'군산':[35.9038,126.6158],'대구':[35.8941,128.6586],'포항':[35.9879,129.4204],'울산':[35.5935,129.3517],'부안':[35.7316,126.7330],'광주':[35.1264,126.8089],'무안':[34.9914,126.3828],'여수':[34.8423,127.6168],'사천':[35.0886,128.0703],'김해':[35.1795,128.9382],'부산':[35.1796,129.0756],'제주':[33.5113,126.4930] };
            const _buildHomeMap=function(){
                const el=document.getElementById('homeStatMapKakao'); if(!el||!(window.kakao&&kakao.maps&&kakao.maps.Map)) return;
                const map=new kakao.maps.Map(el,{ center:new kakao.maps.LatLng(36.4,127.9), level:13 });
                try{ map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT); }catch(e){}
                const bounds=new kakao.maps.LatLngBounds(); let any=false;
                Object.keys(_agg).forEach(function(name){ const ll=ui._regionLL[name]; if(!ll) return; const c=_agg[name]; any=true; const pos=new kakao.maps.LatLng(ll[0],ll[1]); bounds.extend(pos); const sz=30+Math.min(c,14)*2; const content='<div style="transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;"><div style="width:'+sz+'px;height:'+sz+'px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;border:2.5px solid #fff;box-shadow:0 4px 12px rgba(5,150,105,.45);">'+c+'</div><div style="margin-top:3px;background:rgba(255,255,255,.95);color:#0f172a;font-size:11px;font-weight:800;padding:1px 7px;border-radius:7px;box-shadow:0 1px 4px rgba(0,0,0,.18);white-space:nowrap;">'+name+'</div></div>'; new kakao.maps.CustomOverlay({ map:map, position:pos, content:content, yAnchor:0.5, zIndex:5 }); });
                // 서울~제주가 위아래로 짤리지 않고 시원하게 보이도록 상·하 여백을 넉넉히 (top,right,bottom,left)
                if(any){ try{ map.setBounds(bounds,80,55,100,55); }catch(e){} }
                setTimeout(function(){ try{ map.relayout(); if(any) map.setBounds(bounds,80,55,100,55); }catch(e){} }, 250);
            };
            if(window.kakao && kakao.maps && kakao.maps.Map){ _buildHomeMap(); }
            else if(window.kakao && kakao.maps && kakao.maps.load){ kakao.maps.load(_buildHomeMap); }
            else { let _t=0; const _iv=setInterval(function(){ _t++; if(window.kakao&&kakao.maps){ clearInterval(_iv); (kakao.maps.load?kakao.maps.load(_buildHomeMap):_buildHomeMap()); } else if(_t>20){ clearInterval(_iv); } }, 300); }
        } else if(type==='outing'){
            title.innerHTML=_statTitle('🚶 항공기술훈련원 외출·외박 신청 현황', '<span style="color:#94a3b8;font-weight:700;">(운영시간 AM 09:00 ~ 익일 AM 09:00)</span>');
            const rows=weekRooms.map(([room,r])=>{
                const course=(r.settings||{}).courseName||'-';
                // [09:00 운영일 윈도우] 자정이 아닌 익일 09:00 기준으로 금일 외출/외박 집계
                const _ow=getOutingWindowKST();
                const _allActs=r.admin_actions||{};
                const outs=[];
                Object.keys(_allActs).forEach(_dt=>{ const _day=_allActs[_dt]||{}; Object.keys(_day).forEach(_tk=>{ const a=_day[_tk]; if(a&&(a.type==='outing'||a.type==='overnight'||a.type==='group_outing')){ const _ts=a.timestamp||0; if(_ts>=_ow.start&&_ts<_ow.end) outs.push(a); } }); });
                if(!outs.length) return '';
                const tbl='<table style="width:100%;table-layout:fixed;border-collapse:collapse;font-size:13px;margin-top:10px;">'
                  +'<colgroup><col style="width:9%"><col style="width:24%"><col style="width:13%"><col style="width:29%"><col style="width:25%"></colgroup>'
                  +'<thead><tr style="color:#92400e;background:#fffbeb;">'
                  +'<th style="padding:8px;text-align:center;border-bottom:1px solid #fde68a;">연번</th>'
                  +'<th style="padding:8px;text-align:left;border-bottom:1px solid #fde68a;">이름</th>'
                  +'<th style="padding:8px;text-align:center;border-bottom:1px solid #fde68a;">구분</th>'
                  +'<th style="padding:8px;text-align:left;border-bottom:1px solid #fde68a;">행선지</th>'
                  +'<th style="padding:8px;text-align:center;border-bottom:1px solid #fde68a;">시간</th>'
                  +'</tr></thead><tbody>'
                  +outs.map((a,i)=>'<tr>'
                      +'<td style="padding:7px 8px;text-align:center;border-bottom:1px solid #fef3c7;color:#a8a29e;">'+(i+1)+'</td>'
                      +'<td style="padding:7px 8px;border-bottom:1px solid #fef3c7;font-weight:800;color:#0f172a;">'+esc(a.name||'-')+(((a.returned===true)||a.returnReportTime)?(' <span style="display:inline-block;margin-left:5px;font-size:10px;font-weight:800;padding:1px 6px;border-radius:6px;'+(a.autoReturn?'background:#cffafe;color:#0891b2;':'background:#dcfce7;color:#16a34a;')+'">복귀완료</span>'):(a.held?' <span style="display:inline-block;margin-left:5px;font-size:10px;font-weight:800;padding:1px 6px;border-radius:6px;background:#fee2e2;color:#dc2626;">미복귀</span>':''))+'</td>'
                      +'<td style="padding:7px 8px;text-align:center;border-bottom:1px solid #fef3c7;"><span style="background:'+(a.type==='overnight'?'#fee2e2;color:#b91c1c':'#fef3c7;color:#92400e')+';padding:2px 9px;border-radius:8px;font-weight:800;font-size:12px;">'+(a.type==='overnight'?'외박':'외출')+'</span></td>'
                      +'<td style="padding:7px 8px;border-bottom:1px solid #fef3c7;color:#475569;word-break:keep-all;">'+esc(a.destination||'-')+'</td>'
                      +'<td style="padding:7px 8px;text-align:center;border-bottom:1px solid #fef3c7;color:#64748b;white-space:nowrap;">'+esc((a.startTime||'')+(a.endTime?(' ~ '+a.endTime):''))+'</td>'
                  +'</tr>').join('')
                  +'</tbody></table>';
                return '<div style="background:#fffbeb;border:1px solid #fef3c7;border-radius:14px;margin-bottom:12px;padding:18px 22px;">'
                  +'<div style="display:flex;justify-content:space-between;align-items:center;">'
                    +'<div style="display:flex;align-items:center;gap:14px;">'
                      +'<span style="font-weight:900;color:#fff;background:#f59e0b;padding:6px 14px;border-radius:10px;font-size:16px;">Room #'+room+'</span>'
                      +'<span style="font-size:18px;color:#0f172a;font-weight:700;">'+esc(course)+'</span>'
                    +'</div>'
                    +'<span style="font-size:28px;font-weight:900;color:#0f172a;">'+outs.length+'<span style="font-size:14px;color:#64748b;font-weight:800;"> 명</span></span>'
                  +'</div>'+tbl
                +'</div>';
            }).filter(Boolean).join('');
            body.innerHTML=rows||'<p style="color:#94a3b8;text-align:center;padding:30px;font-size:16px;">금일 외출/외박 신청자가 없습니다.</p>';
        }
    },


    // 홈 통계 팝업: 과정 행 펼치기/접기
    toggleHomeDetail: function(uid){
        var x=document.getElementById(uid); if(!x) return;
        var open=(x.style.display!=='none');
        x.style.display=open?'none':'block';
        var hdr=x.previousElementSibling;
        var chev=hdr&&hdr.querySelector('.hs-chev');
        if(chev) chev.style.transform=open?'':'rotate(90deg)';
    },

// [강사 플랫폼 전용: 유관 시스템 보안 하이패스 함수]
    // ── 강의실 초기화 인증 모달 ──
    openResetAuthModal: async function() {
        // [비번 옵션화] 비번 없는 방은 비밀번호 입력 없이 확인만으로 초기화
        try {
            const _ps = await firebase.database().ref(`courses/${state.room}/settings/password`).get();
            if (!_ps.val()) {
                if (confirm(`Room #${state.room} 과정을 초기화하시겠습니까?\n(출석·질문·차량/외출외박 신청 등 이 과정의 기록이 삭제됩니다.)\n(이 강의실은 비밀번호가 설정돼 있지 않습니다.)`)) {
                    dataMgr._executeReset();
                }
                return;
            }
        } catch(e) {}
        const label = document.getElementById('resetAuthRoomLabel');
        const input = document.getElementById('resetAuthInput');
        if (label) label.innerText = `Room #${state.room}`;
        if (input) input.value = '';
        const modal = document.getElementById('resetAuthModal');
        if (modal) modal.style.display = 'flex';
        setTimeout(() => { if (input) input.focus(); }, 150);
    },

    closeResetAuthModal: function() {
        const modal = document.getElementById('resetAuthModal');
        if (modal) modal.style.display = 'none';
        const input = document.getElementById('resetAuthInput');
        if (input) input.value = '';
    },

    confirmResetAuth: async function() {
        const MASTER_KEY = "13281";
        const room = state.room;
        if (!room) return;

        const input = document.getElementById('resetAuthInput');
        const inputPw = (input ? input.value : '').trim();
        if (!inputPw) {
            ui.showAlert("비밀번호를 입력해주세요.");
            if (input) input.focus();
            return;
        }

        // (A) 마스터키 일치 → 즉시 초기화
        if (inputPw === MASTER_KEY) {
            ui.closeResetAuthModal();
            dataMgr._executeReset();
            return;
        }

        // (B) DB의 강의실 비밀번호(btoa 인코딩)와 대조
        try {
            const snap = await firebase.database().ref(`courses/${room}/settings`).once('value');
            const settings = snap.val() || {};
            const storedPw = settings.password; // [비번 옵션화] 미설정이면 마스터키만 허용
            if (storedPw && btoa(inputPw) === storedPw) {
                ui.closeResetAuthModal();
                dataMgr._executeReset();
            } else {
                ui.showAlert("❌ 비밀번호가 올바르지 않습니다.\n마스터키 또는 강의실 비밀번호를 확인해주세요.");
                if (input) { input.value = ''; input.focus(); }
            }
        } catch(e) {
            ui.showAlert("권한 확인 중 오류: " + e.message);
        }
    },

    goFamilySite: function(role, url) {
        // 1. 해당 역할의 보안 키를 생성 (포털에서 PIN 친 것과 동일한 효과)
        if(role !== 'none') {
            const sessionKey = 'kac_session_' + role;
            const sessionData = { time: Date.now() };
            localStorage.setItem(sessionKey, JSON.stringify(sessionData));
        }
        
        // 2. 페이지 이동 (새 창)
        window.open(url, '_blank');

        // 3. [핵심 추가] 클릭 후 펼쳐진 메뉴를 자동으로 다시 접기
        this.toggleFamilySites();
    }






}; // <--- ui 객체를 닫아주는 아주 중요한 괄호입니다!




// --- 4. Quiz Logic ---
const quizMgr = {
    // ── 브라우저 줌과 무관하게 퀴즈 화면을 항상 같은 비율로 고정 ──
    //  원리: 브라우저 줌이 바뀌면 window.innerWidth(논리 px)가 변한다.
    //  페이지가 처음 뜬 시점의 줌 상태에서의 기준폭을 100% 기준으로 삼고,
    //  현재 줌으로 인한 폭 변화량만큼 퀴즈 화면을 역(逆)스케일해 항상 동일하게 보이게 한다.
    _zoomFixBound: false,
    _baseInnerWidth: 0,
    applyZoomFix: function() {
        const view = document.getElementById('view-quiz');
        if (!view) return;
        // 기준폭: outerWidth(브라우저 창 실제 픽셀폭)는 줌과 무관하게 거의 일정.
        //  innerWidth/outerWidth 비율로 줌 배율을 추정한다. (스크롤바 오차 ±수십px 무시)
        let zoom = 1;
        if (window.outerWidth && window.innerWidth) {
            // 줌 100%일 때 innerWidth ≈ outerWidth(창 테두리 제외).
            //  줌 ↑ → innerWidth ↓ 이므로 배율 = 기준 / 현재
            zoom = window.outerWidth / window.innerWidth;
        }
        // 보정 배율(역수): 줌이 1.25면 화면을 0.8배로 줄여 100% 기준 유지
        // 단, 창 테두리/스크롤바로 인한 미세 오차 보정을 위해 흔한 줌 단계로 스냅
        const steps = [0.5,0.67,0.75,0.8,0.9,1,1.1,1.25,1.5,1.75,2];
        let snapped = steps.reduce((a,b)=> Math.abs(b-zoom)<Math.abs(a-zoom)?b:a, 1);
        const inv = 1 / snapped;
        if (Math.abs(inv - 1) < 0.03) {
            view.style.zoom = '';     // 100%(±3%)면 보정 안 함
        } else {
            view.style.zoom = inv;
        }
        // 줌 변경(Ctrl +/-) 시 자동 재보정 (1회만 바인딩)
        if (!this._zoomFixBound) {
            this._zoomFixBound = true;
            window.addEventListener('resize', () => {
                const v = document.getElementById('view-quiz');
                if (v && v.style.display !== 'none' && v.offsetParent !== null) {
                    quizMgr.applyZoomFix();
                }
            });
        }
    },

loadFile: function(e) {
        // [수정] 이벤트 객체에서 파일 입력창을 정확히 가져오도록 개선
        const fileInput = e.target; 
        const f = fileInput.files[0]; 
        if (!f) return;

        const r = new FileReader();
        r.onload = (evt) => {
            const b = evt.target.result.trim().split(/\n\s*\n/);
            state.quizList = [];
            b.forEach(bl => {
                const l = bl.split('\n').map(x=>x.trim()).filter(x=>x);
                if (l.length >= 2) {
                    const lastLine = l[l.length - 1].toUpperCase();
                    const isSurvey = (lastLine === 'SURVEY' || lastLine === 'S');
                    const correct = isSurvey ? 0 : parseInt(lastLine);
                    const options = l.slice(1, l.length - 1);
                    state.quizList.push({ 
                        text: l[0], 
                        options: options, 
                        correct: correct, 
                        checked: true, 
                        isSurvey: isSurvey,
                        isOX: (options.length === 2 && options[0].toUpperCase() === 'O')
                    });
                }
            });

            state.isExternalFileLoaded = true;
            
            const now = new Date();
            const defaultTitle = `${f.name.split('.')[0]}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
            const quizTitle = prompt("이 퀴즈 세트의 이름을 입력해주세요:", defaultTitle);
            
            if (!quizTitle) { 
                alert("업로드가 취소되었습니다."); 
                fileInput.value = ""; 
                return; 
            }

            firebase.database().ref(`courses/${state.room}/quizBank`).push().set({
                title: quizTitle, 
                data: state.quizList, 
                timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(() => { 
                ui.showAlert("✅ 퀴즈가 성공적으로 업로드되었습니다."); 
                quizMgr.loadSavedQuizList(); 
                fileInput.value = ""; 
            });

            this.renderMiniList();
            const ctrl = document.getElementById('quizControls');
            if(ctrl) ctrl.style.display = 'flex';
            state.currentQuizIdx = 0;
            this.showQuiz();
        };
        r.readAsText(f);
    },
    
    renderMiniList: function() {
        const d = document.getElementById('miniQuizList'); 
        if(!d) return;
        d.innerHTML = "";
        state.quizList.forEach((q, i) => {
            const typeLabel = q.isSurvey ? '[설문]' : (q.isOX ? '[OX]' : '[4지]');
            d.innerHTML += `<div style="padding:10px; border-bottom:1px solid #eee; font-size:12px; display:flex; gap:10px;"><input type="checkbox" ${q.checked?'checked':''} onchange="state.quizList[${i}].checked=!state.quizList[${i}].checked"><b>${typeLabel} Q${i+1}.</b> ${q.text.substring(0,20)}...</div>`;
        });
    },
    
    downloadSample: function() {
        let content = "";
        DEFAULT_QUIZ_DATA.forEach(q => {
            content += q.text + "\n" + q.options.join('\n') + "\n" + (q.isSurvey ? "SURVEY" : q.correct) + "\n\n";
        });
        const blob = new Blob([content], {type: "text/plain"});
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "kac_quiz_sample.txt";
        a.click();
    },
    
    useDefaultQuiz: function() {
        state.quizList = DEFAULT_QUIZ_DATA; 
        state.isExternalFileLoaded = true;
        this.renderMiniList();
        this.completeQuizLoading();
    },
    
    useSavedQuiz: function() {
        firebase.database().ref(`courses/${state.room}/quizBank`).once('value', snap => {
            if(snap.exists()) {
                const data = snap.val();
                const lastKey = Object.keys(data).pop();
                state.quizList = data[lastKey].data;
                state.isExternalFileLoaded = true;
                this.renderMiniList();
                this.completeQuizLoading();
            }
        });
    },
    
    completeQuizLoading: function() {
        const modal = document.getElementById('quizSelectModal');
        if(modal) modal.style.display = 'none';
        const viewQa = document.getElementById('view-qa');
        if(viewQa) viewQa.style.display = 'none';
        const viewQuiz = document.getElementById('view-quiz');
        if(viewQuiz) viewQuiz.style.display = 'flex';
        state.currentQuizIdx = 0;
        this.showQuiz();
    },
    
    loadSavedQuizList: function() {
        const container = document.getElementById('savedQuizListContainer');
        if(!container) return;
        firebase.database().ref(`courses/${state.room}/quizBank`).on('value', snap => {
            container.innerHTML = "";
            const data = snap.val();
            if (!data) {
                container.innerHTML = `<div style="text-align:center; padding:36px 20px; color:#94a3b8;">
                    <div style="font-size:34px; margin-bottom:10px;">📂</div>
                    <div style="font-weight:700;">저장된 퀴즈가 없습니다.</div>
                    <div style="font-size:12px; margin-top:4px;">아래 '기본 샘플 문항으로 시작'을 누르거나<br>우측 Quiz Editor에서 파일을 업로드하세요.</div>
                </div>`;
                return;
            }
            Object.keys(data).reverse().forEach(key => {
                const quizSet = data[key];
                const item = document.createElement('div');
                item.className = 'saved-quiz-item';
                item.style.cssText = 'display:flex; align-items:center; gap:14px; padding:14px 16px; background:#fff; border:1.5px solid #e2e8f0; border-radius:14px; transition:all .15s;';
                item.onmouseover = () => { item.style.borderColor = '#3b82f6'; item.style.boxShadow = '0 4px 14px rgba(59,130,246,0.15)'; };
                item.onmouseout = () => { item.style.borderColor = '#e2e8f0'; item.style.boxShadow = 'none'; };
                const dateStr = new Date(quizSet.timestamp).toLocaleDateString('ko-KR', {month:'long', day:'numeric'});
                item.innerHTML = `
                    <div onclick="quizMgr.useSavedQuizSet('${key}')" style="flex:1; cursor:pointer; display:flex; align-items:center; gap:14px;">
                        <div style="width:46px; height:46px; flex-shrink:0; border-radius:12px; background:linear-gradient(135deg,#3b82f6,#60a5fa); display:flex; align-items:center; justify-content:center; color:#fff; font-size:20px;"><i class="fa-solid fa-clipboard-question"></i></div>
                        <div style="flex:1; min-width:0;">
                            <div style="font-weight:800; font-size:16px; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${quizSet.title}</div>
                            <div style="font-size:12px; color:#64748b; margin-top:3px;"><span style="background:#eff6ff; color:#2563eb; font-weight:800; padding:1px 8px; border-radius:10px; margin-right:6px;">${quizSet.data.length}문항</span>${dateStr}</div>
                        </div>
                        <i class="fa-solid fa-play" style="color:#3b82f6; font-size:14px; margin-right:6px;"></i>
                    </div>
                    <button class="btn-del-mini" onclick="quizMgr.deleteQuizSet('${key}', '${quizSet.title}')" style="background:none; border:none; color:#cbd5e1; cursor:pointer; font-size:16px; padding:6px;"><i class="fa-solid fa-trash-can"></i></button>`;
                container.appendChild(item);
            });
        });
    },
    
    useSavedQuizSet: function(key) {
        firebase.database().ref(`courses/${state.room}/quizBank/${key}`).once('value', snap => {
            const val = snap.val();
            if (val) { 
                state.quizList = val.data; 
                state.loadedQuizSetKey = key;   // PPT 링크 생성용
                state.isExternalFileLoaded = true; 
                this.renderMiniList(); 
                this.completeQuizLoading(); 
            }
        });
    },

    // 현재 문항의 'PPT용 진행 링크'를 클립보드에 복사 (클릭 가능한 서식 포함)
    copyPresentLink: function() {
        if (!state.loadedQuizSetKey) {
            return ui.showAlert("저장된 퀴즈를 불러온 뒤 사용할 수 있어요.\n좌측 '저장된 퀴즈 목록'에서 선택해 주세요.");
        }
        const base = location.href.replace(/admin\.html.*$/, '').replace(/\/$/, '');
        const url = `${base}/quiz_present.html?room=${encodeURIComponent(state.room)}&set=${encodeURIComponent(state.loadedQuizSetKey)}&q=${state.currentQuizIdx}`;
        const qNo = state.currentQuizIdx + 1;
        const done = () => ui.showAlert(`✅ Q${qNo} 링크가 복사되었습니다.\n\nPPT 슬라이드에서 도형이나 텍스트를 선택하고\n[우클릭 → 링크] 에 붙여넣으세요.\n\n발표 중 그 링크를 누르면 교육생 화면이\n이 퀴즈로 바로 전환됩니다.`);
        // 순수 URL(text)만 복사 → PPT에서 막대로 늘어나지 않음
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(done).catch(() => prompt("아래 링크를 복사하세요:", url));
        } else {
            prompt("아래 링크를 복사하세요:", url);
        }
    },
    
    deleteQuizSet: function(key, title) {
        if (confirm(`'${title}' 퀴즈를 삭제할까요?`)) {
            firebase.database().ref(`courses/${state.room}/quizBank/${key}`).remove();
        }
    },
    
prevNext: function(d) {
        let n = state.currentQuizIdx + d;
        if (n < 0 || n >= state.quizList.length) {
            return ui.showAlert(n < 0 ? "첫 번째 문항입니다." : "마지막 문항입니다.");
        }
        if(!state.quizList[n].checked) { 
            state.currentQuizIdx = n; 
            this.prevNext(d); 
            return; 
        }
        state.currentQuizIdx = n;

        // [추가] 새로고침 대비: 현재 문제 번호를 브라우저에 저장
        if (state.room) {
            localStorage.setItem(`kac_quiz_idx_${state.room}`, state.currentQuizIdx);
        }
        this.showQuiz();
    },








    
    showQuiz: function() {
        const card = document.querySelector('.quiz-card');
        if(card) card.classList.remove('result-mode');
        this.applyZoomFix();
        const q = state.quizList[state.currentQuizIdx];
        this.resetTimerUI(); 
        this.renderScreen(q);
        const pauseBtn = document.getElementById('btnPause');
        if(pauseBtn) pauseBtn.style.display = 'none';
        const smartBtn = document.getElementById('btnSmartNext');
        if(smartBtn) {
            smartBtn.style.display = 'flex';
            smartBtn.innerHTML = '현재 퀴즈 시작 <i class="fa-solid fa-play" style="margin-left:10px;"></i>';
        }
        firebase.database().ref(`courses/${state.room}/status`).update({ quizStep: 'none' });
        firebase.database().ref(`courses/${state.room}/activeQuiz`).set({ 
            id: `Q${state.currentQuizIdx}`, 
            status: 'ready', 
            type: q.isOX?'OX':'MULTIPLE', 
            ...q 
        });
        const ctrl = document.getElementById('quizControls');
        if(ctrl) ctrl.style.display = 'flex';
        state.remainingTime = 8;
        this.startAnswerMonitor();
    },
    




renderScreen: function(q) {
        const qText = document.getElementById('d-qtext');
        const qNum = document.getElementById('quizNumberLabel');
        const startBtn = document.getElementById('btnSmartNext');

        // 1. [유지] 시작 버튼 상태 초기화 (다음 문제 이동 시 파란색으로 복구)
        if(startBtn) {
            startBtn.disabled = false;
            startBtn.style.background = ""; 
            startBtn.style.color = "";
            startBtn.style.cursor = "pointer";
            startBtn.style.boxShadow = "";
            startBtn.innerHTML = '현재 퀴즈 시작 <i class="fa-solid fa-play" style="margin-left:10px;"></i>';
        }

        // 2. [수정] 질문 텍스트 및 상단 Q 번호 레이블 설정
        if(qText) qText.innerText = q.text; // 중복 방지를 위해 Qn. 제거된 순수 텍스트만 표시
        if(qNum) qNum.innerText = `Q${state.currentQuizIdx + 1}`;
        
        // 3. [핵심 수정] 문항 영역 구조 고정 (좌측 텍스트 / 우측 숫자 정렬용)
        const oDiv = document.getElementById('d-options'); 
        if(oDiv) {
            oDiv.style.display = 'flex';
            oDiv.classList.toggle('is-ox', !!q.isOX);
            oDiv.classList.toggle('is-multiple', !q.isOX);
            oDiv.innerHTML = "";
            q.options.forEach((o, i) => {
                // O/X 모드: 맨 앞 O/X 기호는 크게, 괄호 설명은 작게 분리 표시
                let optHtml;
                if (q.isOX) {
                    // "O (Yes, they do)" → mark="O", rest="(Yes, they do)"
                    const m = String(o).match(/^\s*([OXox○✕])\s*(.*)$/);
                    if (m) {
                        const mark = m[1].toUpperCase();
                        const rest = (m[2] || '').trim();
                        optHtml = `<span class="ox-mark">${mark}</span>${rest ? `<span class="ox-rest">${rest}</span>` : ''}`;
                    } else {
                        optHtml = `<span class="ox-mark">${o}</span>`;
                    }
                } else {
                    optHtml = o;
                }
                // opt-text-wrapper에 flex:1을 주어 우측 숫자를 끝으로 밀어내는 구조입니다.
                oDiv.innerHTML += `
                    <div class="quiz-opt ${q.isOX ? 'ox-mode' : ''}" id="opt-${i+1}">
                        <div class="opt-text-wrapper">
                            ${q.isOX ? '' : `<div class="opt-num">${i+1}</div>`}
                            <div class="opt-text">${optHtml}</div>
                        </div>
                        <!-- 결과 숫자가 정렬되어 들어갈 자리 미리 생성 -->
                        <div class="opt-count-label" id="count-${i+1}"></div>
                    </div>`;
            });
        }

        // 4. [유지] 기타 화면 정리
        document.getElementById('d-chart').style.display = 'none';
        const guide = document.getElementById('quizGuideArea');
        if(guide) guide.innerText = ""; 
    },















startAnswerMonitor: function() {
    const id = `Q${state.currentQuizIdx}`;
    const ansCntEl = document.getElementById('answeredCount');
    const pendCntEl = document.getElementById('pendingCount');

    if (state.ansListener) dbRef.ans.child(id).off();
    state.ansListener = dbRef.ans.child(id).on('value', snap => {
        const answers = snap.val() || {};
        const answeredCount = Object.keys(answers).length;
        
        // ★ 현재 화면에 표시된 전체 인원 숫자(currentJoinCount)를 실시간으로 가져와서 계산 ★
        const totalCount = parseInt(document.getElementById('currentJoinCount').innerText || 0);

        // 제출자 수 업데이트
        if(ansCntEl) ansCntEl.innerText = answeredCount;
        
        // 대기자 수 업데이트 (전체 - 제출)
        if(pendCntEl) {
            pendCntEl.innerText = Math.max(0, totalCount - answeredCount);
        }
    });
},






    
// [수정본] 퀴즈 액션 처리 함수
action: function(act) {
        if(state.isObserver) return ui.showAlert("👁️ 옵저버는 상태를 변경할 수 없습니다.");
        
        firebase.database().ref(`courses/${state.room}/activeQuiz`).update({ status: act });
        
        const startBtn = document.getElementById('btnSmartNext');

        if(act === 'open') { 
            this.startTimer(); 
        } else if(act === 'close') { 
            this.stopTimer(); 
        } else if(act === 'result') { 
            this.stopTimer(); 
            
            // ★ [추가] 시작 버튼 비활성화 (회색 처리)
            if(startBtn) {
                startBtn.disabled = true;
                startBtn.style.background = "#cbd5e1"; // 회색
                startBtn.style.color = "#94a3b8";
                startBtn.style.cursor = "default";
                startBtn.style.boxShadow = "none";
                startBtn.innerHTML = '해설 및 결과 모드 <i class="fa-solid fa-lock"></i>';
            }

            const oDiv = document.getElementById('d-options');
            const cDiv = document.getElementById('d-chart');
            if(oDiv) oDiv.style.display = 'flex'; 
            if(cDiv) cDiv.style.display = 'none';
            
            this.renderResultsOnOptions(`Q${state.currentQuizIdx}`, state.quizList[state.currentQuizIdx].correct); 
        }
    },



    
    smartNext: function() { 
        this.action('open'); 
    },
    
    togglePause: function() {
        const pauseBtn = document.getElementById('btnPause');
        if (state.timerInterval) { 
            this.stopTimer();
            firebase.database().ref(`courses/${state.room}/activeQuiz`).update({ 
                status: 'pause', 
                remainingTime: state.remainingTime 
            });
            if(pauseBtn) {
                pauseBtn.innerHTML = '다시 시작 <i class="fa-solid fa-play" style="margin-left:10px;"></i>';
                pauseBtn.style.backgroundColor = '#3b82f6'; 
            }
        } else { 
            this.action('open'); 
            if(pauseBtn) {
                pauseBtn.innerHTML = '일시정지 <i class="fa-solid fa-pause" style="margin-left:10px;"></i>';
                pauseBtn.style.backgroundColor = '#f59e0b'; 
            }
        }
    },

    startTimer: function() {
        this.stopTimer(); 
        const smartBtn = document.getElementById('btnSmartNext');
        const pauseBtn = document.getElementById('btnPause');
        if (smartBtn) smartBtn.style.display = 'none';
        if (pauseBtn) { 
            pauseBtn.style.display = 'flex'; 
            pauseBtn.innerHTML = '일시정지 <i class="fa-solid fa-pause" style="margin-left:15px;"></i>'; 
            pauseBtn.style.background = '#f59e0b'; 
        }
        let t = state.remainingTime;
        const d = document.getElementById('quizTimer'); 
        if (d) {
            d.classList.remove('urgent');
            d.innerText = `00:${t < 10 ? '0' + t : t}`;
        }
        const endTime = Date.now() + (t * 1000);
        if(dbRef.quiz) dbRef.quiz.update({ endTime: endTime });
        if(t <= 5 && d) d.classList.add('urgent');
        let lastPlayedSec = -1;
        if (!state.timerAudio) state.timerAudio = new Audio('timer.mp3');
        state.timerInterval = setInterval(() => {
            const r = Math.ceil((endTime - Date.now()) / 1000);
            const displaySec = r < 0 ? 0 : r;
            state.remainingTime = displaySec; 
            if (d) { 
                d.innerText = `00:${displaySec < 10 ? '0' + displaySec : displaySec}`; 
                if(r <= 5) d.classList.add('urgent'); 
            }
            if (r <= 8 && r > 0 && r !== lastPlayedSec) { 
                state.timerAudio.pause(); 
                state.timerAudio.currentTime = 0; 
                state.timerAudio.play().catch(e => {}); 
                lastPlayedSec = r; 
            }
            if(r <= 0) {
                this.stopTimer(); 
                this.action('close'); 
                setTimeout(() => {
                    this.action('result');
                    if (pauseBtn) pauseBtn.style.display = 'none';
                    if (smartBtn) { 
                        smartBtn.style.display = 'flex'; 
                        smartBtn.innerHTML = '현재 퀴즈 시작 <i class="fa-solid fa-play" style="margin-left:15px;"></i>'; 
                    }
                }, 1500);
            }
        }, 200);
    },
    
    stopTimer: function() { 
        if(state.timerInterval) { 
            clearInterval(state.timerInterval); 
            state.timerInterval = null; 
        } 
        if (state.timerAudio) { 
            state.timerAudio.pause(); 
            state.timerAudio.currentTime = 0; 
        } 
    },
    
    resetTimerUI: function() { 
        this.stopTimer(); 
        const d = document.getElementById('quizTimer');
        if(d) {
            d.innerText = "00:08"; 
            d.classList.remove('urgent'); 
        }
    },
    
showFinalSummary: async function() {
        // [옵저버 종료 차단]
        if(state.isObserver) {
            ui.showAlert("👁️ 옵저버는 퀴즈를 종료하거나 결과를 발표할 수 없습니다.");
            return;
        }

        const snap = await firebase.database().ref(`courses/${state.room}/quizAnswers`).get();
        const allAns = snap.val() || {};
        const totalParticipants = new Set();
        let totalQuestions = 0; 
        let totalCorrect = 0; 
        let totalAnswerCount = 0;
        let questionStats = []; 
        const userScoreMap = {};
        
        state.quizList.forEach((q, idx) => {
            if(!q.checked || q.isSurvey) return; 
            totalQuestions++;
            const id = `Q${idx}`; 
            const answers = allAns[id] || {}; 
            const keys = Object.keys(answers);
            keys.forEach(k => {
                totalParticipants.add(k); 
                totalAnswerCount++;
                if(!userScoreMap[k]) userScoreMap[k] = { score: 0, pCount: 0 };
                userScoreMap[k].pCount++; 
                if(answers[k].choice === q.correct) { 
                    totalCorrect++; 
                    userScoreMap[k].score++; 
                }
            });
            if(keys.length > 0) { 
                const corrCnt = keys.filter(k => answers[k].choice === q.correct).length; 
                questionStats.push({ 
                    title: q.text, 
                    accuracy: (corrCnt / keys.length) * 100 
                }); 
            }
        });
        
        const sortedUsers = Object.keys(userScoreMap)
            .map(t => ({ token: t, ...userScoreMap[t] }))
            .sort((a, b) => (b.score - a.score) || (b.pCount - a.pCount) || a.token.localeCompare(b.token));
        
        const finalRankingData = {}; 
        let rank = 1;
        sortedUsers.forEach((u, i) => { 
            if (i > 0 && u.score < sortedUsers[i - 1].score) rank = i + 1; 
            finalRankingData[u.token] = { 
                score: u.score, 
                rank: rank, 
                total: sortedUsers.length,
                totalQuestions: totalQuestions,
                answered: u.pCount,
                accuracy: totalQuestions > 0 ? Math.round((u.score / totalQuestions) * 100) : 0,
                isWinner: rank === 1
            }; 
        });
        
        await firebase.database().ref(`courses/${state.room}/quizFinalResults`).set(finalRankingData);
        await firebase.database().ref(`courses/${state.room}/status`).update({ quizStep: 'summary' });
        
        const grid = document.getElementById('summaryStats');
        if(grid) {
            const avgAcc = totalAnswerCount > 0 ? Math.round((totalCorrect / totalAnswerCount) * 100) : 0;
            grid.innerHTML = `
                <div class="summary-card"><span>총 인원</span><b>${totalParticipants.size}명</b></div>
                <div class="summary-card"><span>평균 정답률</span><b>${avgAcc}%</b></div>
                <div class="summary-card"><span>문항 수</span><b>${totalQuestions}개</b></div>
                <div class="summary-card"><span>전체 제출</span><b>${totalAnswerCount}건</b></div>
            `;
        }
        
        const summaryOverlay = document.getElementById('quizSummaryOverlay');
        if(summaryOverlay) summaryOverlay.style.display = 'flex';
    },



// [수정본] 퀴즈 리포트 창을 닫고 모든 데이터를 초기화하며 종료하는 함수
closeSummaryAndExit: function() {
        const summaryOverlay = document.getElementById('quizSummaryOverlay');
        if (summaryOverlay) summaryOverlay.style.display = 'none';

        if (state.room) {
            // [추가] 종료 시 문제 번호 기록 삭제
            localStorage.removeItem(`kac_quiz_idx_${state.room}`);
            firebase.database().ref(`courses/${state.room}/activeQuiz`).set(null);
            firebase.database().ref(`courses/${state.room}/status/quizStep`).set('none');
            firebase.database().ref(`courses/${state.room}/quizAnswers`).set(null);
            firebase.database().ref(`courses/${state.room}/quizFinalResults`).set(null);
        }

        state.currentQuizIdx = 0;
        state.isExternalFileLoaded = false;
        state.quizList = [];
        this.stopTimer();
        // 퀴즈 종료 시 교육생 화면을 일반(qa) 모드로 복원
        if (state.room) {
            firebase.database().ref(`courses/${state.room}/status/mode`).set('qa');
        }
        ui.setMode('dashboard');
        alert("퀴즈가 종료되었습니다. 데이터가 초기화되고 과정 현황 화면으로 이동합니다.");
    },







    
    renderChart: function(id, corr) {
        const div = document.getElementById('d-chart'); 
        if(!div) return;
        div.innerHTML = "";
        const q = state.quizList[state.currentQuizIdx];
        firebase.database().ref(`courses/${state.room}/quizAnswers`).child(id).once('value', s => {
            const d = s.val() || {}; 
            const cnt = new Array(q.options.length).fill(0);
            Object.values(d).forEach(v => { 
                if(v.choice >= 1 && v.choice <= q.options.length) cnt[v.choice-1]++; 
            });
            const max = Math.max(...cnt, 1);
            
            if(q.isSurvey) {
                let maxIdx = cnt.indexOf(Math.max(...cnt));
                firebase.database().ref(`courses/${state.room}/activeQuiz`).update({ 
                    surveyResult: `가장 많은 선택: '${q.options[maxIdx]}' (${Math.round((cnt[maxIdx]/Object.values(d).length)*100)}%)` 
                });
            }
            
            for(let i=0; i < q.options.length; i++) {
                const isCorrect = !q.isSurvey && (i + 1) === corr; 
                const h = (cnt[i]/max)*80;
                const crownHtml = isCorrect ? `<div class="crown-icon" style="bottom: ${h > 0 ? h + '%' : '40px'};">👑</div>` : '';
                div.innerHTML += `
                    <div class="bar-wrapper ${isCorrect ? 'correct' : ''}">
                        ${crownHtml}
                        <div class="bar-value">${cnt[i]}</div>
                        <div class="bar-fill" style="height:${h}%"></div>
                        <div class="bar-label">${q.isOX?(i===0?'O':'X'):(i+1)}</div>
                    </div>
                `;
            }
        });
    },
    







// [최종 수정본] 문항별 투표 결과를 우측에 정렬하고 그래프 바를 애니메이션으로 출력하는 함수
    renderResultsOnOptions: function(id, corr) {
        const q = state.quizList[state.currentQuizIdx];
        
        firebase.database().ref(`courses/${state.room}/quizAnswers`).child(id).once('value', s => {
            const d = s.val() || {}; 
            const total = Object.keys(d).length;
            const cnt = new Array(q.options.length).fill(0);
            
            // 1. 제출된 답안 집계
            Object.values(d).forEach(v => { 
                if(v.choice >= 1 && v.choice <= q.options.length) cnt[v.choice-1]++; 
            });

            const answerCounts = {};
            cnt.forEach((count, i) => { answerCounts[i + 1] = count; });
            firebase.database().ref(`courses/${state.room}/activeQuiz`).update({
                answerCounts: answerCounts,
                answerTotal: total
            });

            // 2. 각 문항(Option)별로 결과 데이터 주입
            q.options.forEach((optText, i) => {
                const optEl = document.getElementById(`opt-${i+1}`);
                const countEl = document.getElementById(`count-${i+1}`); // renderScreen에서 생성한 우측 숫자 공간
                
                if (optEl && countEl) {
                    const count = cnt[i];
                    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
                    const isCorrect = (i + 1) === corr && !q.isSurvey;

                    // [정답 표시] 정답 문항인 경우 초록색 테두리 및 배경 강조
                    if (isCorrect) {
                        optEl.classList.add('is-correct');
                    }

                    // [숫자 주입] 우측 끝 고정된 라벨에 "n명 (n%)" 표시
                    countEl.innerHTML = `
                        <span style="font-weight:900;">${count}명</span> 
                        <span style="font-size:18px; opacity:0.6; margin-left:5px;">(${percent}%)</span>
                    `;

                    // [그래프 바 생성 및 갱신] 문항 배경에 차오르는 파란색 막대
                    let bar = optEl.querySelector('.opt-result-bar');
                    if(!bar) {
                        bar = document.createElement('div');
                        bar.className = 'opt-result-bar';
                        optEl.appendChild(bar); // 문항 박스 내부에 삽입
                    }
                    
                    // 자연스러운 애니메이션 효과를 위해 지연 후 너비 적용
                    setTimeout(() => { 
                        bar.style.width = percent + "%"; 
                    }, 50);
                }
            });
        });
    },














// [최종 복구] 퀴즈 모드 종료 시도 (옵저버 여부 체크 포함)
    closeQuizMode: function() { 
        // 옵저버는 데이터에 영향이 없으므로 그냥 나갑니다.
        if(state.isObserver) {
            ui.setMode('dashboard');
            return;
        }
        // 강사는 팝업창을 띄워 선택하게 합니다.
        const exitModal = document.getElementById('quizExitModal');
        if(exitModal) exitModal.style.display = 'flex'; 
    },
    




// [최종 복구] 팝업창 버튼 클릭 시 실행 로직 (이어서 하기 / 초기화)
    confirmExitQuiz: function(type) {
        const exitModal = document.getElementById('quizExitModal');
        if (exitModal) exitModal.style.display = 'none';

        if (type === 'reset') {
            // 1. [완전 초기화] 모든 내부 진행 데이터 삭제
            state.currentQuizIdx = 0; 
            state.isExternalFileLoaded = false; 
            state.quizList = [];
            
            // 2. 브라우저에 저장된 문제 번호 기록 삭제 (새로고침 복구용 데이터 삭제)
            if (state.room) {
                localStorage.removeItem(`kac_quiz_idx_${state.room}`);
                
                // 3. 서버 데이터 싹 비우기 (교육생 화면 리셋용)
                firebase.database().ref(`courses/${state.room}/activeQuiz`).set(null);
                firebase.database().ref(`courses/${state.room}/status/quizStep`).set('none');
                firebase.database().ref(`courses/${state.room}/quizAnswers`).set(null);
                firebase.database().ref(`courses/${state.room}/quizFinalResults`).set(null);
            }
            
            // 4. 강사 화면 UI 리셋
            this.renderMiniList();
            const qTxt = document.getElementById('d-qtext');
            const oDiv = document.getElementById('d-options');
            if (qTxt) qTxt.innerText = "Ready?"; 
            if (oDiv) oDiv.innerHTML = "";
            
            ui.showAlert("✅ 퀴즈 데이터가 완전히 초기화되었습니다.");
        } 
        // 'resume' (이어서 하기)의 경우 데이터를 지우지 않고 메모리와 로컬스토리지에 둔 채 화면만 이동합니다.

        // 5. 공통: 과정 현황(메인)으로 화면 전환
        ui.setMode('dashboard'); 
    }
}; // <--- quizMgr 객체를 닫는 마침표입니다. 절대 지우지 마세요.





/* --- [수정 3차 - 강의실별 완전 독립] 입교안내 가이드 관리 로직 --- */
const scheduleMgr = {
    escapeHtml: function(v) {
        return String(v || '').replace(/[&<>"']/g, ch => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[ch]));
    },
    cleanLine: function(v) {
        return String(v || '')
            .replace(/[\u0000-\u001f]/g, '')
            .replace(/\u00a0/g, ' ')
            .replace(/[�]/g, '')
            .replace(/汤捯/g, '')
            .replace(/氠瑢/g, '')
            .replace(/^[ㄱ-ㅎㅏ-ㅣ]{1,8}(?=[가-힣A-Za-z0-9(])/g, '')
            .replace(/\s+[ㄱ-ㅎㅏ-ㅣ]{1,8}(?=[가-힣A-Za-z0-9(])/g, ' ')
            .replace(/[|]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    },
    // ── 일차별 일정표 전용 파서 (【 6.14(일), 0일차/인천 】 + 시간/내용/비고 형식) ──
    //    '일차' 표기가 있을 때만 동작 → 일반 주간 그리드 과정에는 영향 없음
    parseItinerary: function(lines) {
        const clean = v => this.cleanLine(v);
        const arr = (lines || [])
            .flatMap(v => String(v || '').split('\u241F'))
            .map(clean)
            .filter(Boolean);
        const dateRe = /(\d{1,2})\s*[.\-/]\s*(\d{1,2})/;
        if (!arr.some(v => /일\s*차/.test(v) && dateRe.test(v))) return null;
        const isHead = v => /일\s*차/.test(v) && dateRe.test(v);
        const isTime = v => /^\d{1,2}\s*:\s*\d{2}/.test(v);
        const isDash = v => /^[-–—~∼\s]+$/.test(v);
        const startHour = v => { const m = String(v).match(/(\d{1,2})\s*:\s*(\d{2})/); return m ? Number(m[1]) + Number(m[2]) / 60 : -1; };
        const normTime = v => String(v).replace(/\s*[∼~–—]\s*/g, '~').replace(/\s+/g, '');
        const days = [];
        let cur = null, pend = '', hour = -1, lastBucket = null;
        const pushContent = (raw) => {
            if (!cur) return;
            const parts = String(raw).replace(/^[ㅇoO○•·∙]\s*/, '').split(/\s*\*+\s*/);
            const content = (parts[0] || '').trim();
            if (!content || /^\d{1,2}$/.test(content)) return;   // 페이지번호·빈값 제외
            const label = pend ? `${pend} ${content}` : content;
            const bucket = (hour >= 12) ? cur.afternoon : cur.morning;
            bucket.push(label);
            lastBucket = bucket;
            parts.slice(1).forEach(nt => { nt = nt.trim(); if (nt && !bucket[bucket.length - 1].includes(nt)) bucket[bucket.length - 1] += ' *' + nt; });
            pend = '';
        };
        arr.forEach(v => {
            if (isHead(v)) {
                const title = v.replace(/[【】]/g, '').replace(/(\d)\s*\.\s*(\d)/g, '$1.$2').replace(/\s*,\s*/g, ', ').replace(/\s{2,}/g, ' ').trim();
                cur = { date: title, weekday: '', morning: [], afternoon: [] };
                days.push(cur);
                pend = ''; hour = -1; lastBucket = null;
                return;
            }
            if (!cur) return;
            if (isTime(v)) {
                const tm = v.match(/^(\d{1,2}\s*:\s*\d{2}(?:\s*[∼~–—]\s*\d{1,2}\s*:\s*\d{2})?\s*~?)/);
                pend = normTime(tm ? tm[1] : v);
                hour = startHour(v);
                const rest = (tm ? v.slice(tm[0].length) : '').trim();   // 같은 줄에 내용이 붙은 경우
                if (rest) pushContent(rest);
                return;
            }
            if (isDash(v)) { pend = ''; hour = -1; return; }
            if (/^\*/.test(v)) {   // 비고 단독 줄 → 직전 항목에 덧붙임
                const note = v.replace(/^\*+\s*/, '').trim();
                if (note && lastBucket && lastBucket.length && !lastBucket[lastBucket.length - 1].includes(note)) {
                    lastBucket[lastBucket.length - 1] += ' *' + note;
                }
                return;
            }
            pushContent(v);
        });
        return days.length ? days : null;
    },
    renderItinerary: function(days) {
        const esc = v => this.escapeHtml(v);
        const today = new Date();
        const todayMD = `${today.getMonth() + 1}-${today.getDate()}`;
        const dayMD = d => { const m = String(d.date || '').match(/(\d{1,2})\s*[.\-/]\s*(\d{1,2})/); return m ? `${Number(m[1])}-${Number(m[2])}` : ''; };
        const fmtList = arr => {
            if (!arr || !arr.length) return '<span style="color:#64748b; font-weight:800;">해당없음</span>';
            return arr.map(v => {
                const special = /청렴|체육|노조|입교|수료|설문|만찬|시티투어|친교|환영/.test(v);
                const color = special ? '#b45309' : '#0f172a';
                return `<span style="color:${color}; font-weight:800;">${esc(v)}</span>`;
            }).join('<br>');
        };
        return `
            <div style="display:flex; flex-direction:column; gap:12px; font-family:inherit;">
                ${days.map(day => {
                    const isToday = dayMD(day) === todayMD;
                    return `
                    <div style="box-sizing:border-box; border:1px solid ${isToday ? '#f8cdd6' : '#dbe4f0'}; border-radius:14px; background:${isToday ? '#fff6f8' : '#fff'}; padding:17px 19px;">
                        <div style="font-size:18px; font-weight:900; color:#0f3f73; margin-bottom:10px;">${esc(day.date || '-')}</div>
                        <div style="display:flex; flex-direction:column; gap:8px; color:#0f172a; font-size:15px; line-height:1.6; font-weight:700;">
                            <div><span style="color:#2563eb; font-weight:900;">* 오전 :</span> ${fmtList(day.morning)}</div>
                            <div><span style="color:#16a34a; font-weight:900;">* 오후 :</span> ${fmtList(day.afternoon)}</div>
                        </div>
                    </div>`;
                }).join('')}
            </div>`;
    },
    parseLinearSummary: function(lines) {
        const cellSep = '\u241F';
        if ((lines || []).some(v => String(v || '').includes(cellSep))) return null;
        const arr = (lines || []).map(v => this.cleanLine(v)).filter(Boolean);
        const isDate = v => /\d+\s*월\s*\d+\s*일/.test(v) || /\d+\s*\.\s*\d+\s*\([월화수목금토일]\)/.test(v);
        const isWeekday = v => /^(월|화|수|목|금|토|일)$/.test(v);
        const isPeriod = v => /^\d{1,2}$/.test(v);
        const isTime = v => /^\d{1,2}:\d{2}\s*~?$/.test(v) || /^\d{1,2}:\d{2}\s*~\s*\d{1,2}:\d{2}$/.test(v);
        const isHeader = v => /교육\s*시간표|과정명|담임|교육담당|교수|강의실|교육장소|일\s*자|시\s*간/.test(v);
        const isTeacher = v => /^\((강사|담당|교수|임채택|장두석|노조간부|.*계영수).*\)$/.test(v);
        const isLunch = v => /점\s*심|식\s*사/.test(v);
        const cleanSubject = v => this.cleanLine(v)
            .replace(/^[ㄱ-ㅎㅏ-ㅣ]{1,8}\s*/g, '')
            .replace(/\s*\((강사\s*[^)]*|담당\s*[^)]*|교수\s*[^)]*|장두석|임채택|노조간부)\)\s*/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        const dateToWeekday = date => {
            const m = String(date || '').match(/(\d+)\s*월\s*(\d+)\s*일/) || String(date || '').match(/(\d+)\s*\.\s*(\d+)/);
            if (!m) return '';
            const d = new Date(new Date().getFullYear(), Number(m[1]) - 1, Number(m[2]));
            return ['일','월','화','수','목','금','토'][d.getDay()];
        };

        const dates = arr.filter(isDate).slice(0, 5);
        if (dates.length < 2) return null;
        const firstDate = arr.findIndex(isDate);
        const weekdays = arr.slice(firstDate).filter(isWeekday).slice(0, dates.length);
        const summaries = dates.map((date, i) => ({
            date,
            weekday: weekdays[i] || dateToWeekday(date) || ['월','화','수','목','금'][i] || '',
            morning: [],
            afternoon: []
        }));

        const beforeLunch = [];
        const afterLunch = [];
        let lunchSeen = false;
        let chunk = [];
        const flush = () => {
            const text = cleanSubject(chunk.join(' '));
            chunk = [];
            if (!text || /^[ㄱ-ㅎㅏ-ㅣ]{1,8}$/.test(text) || isLunch(text)) return;
            (lunchSeen ? afterLunch : beforeLunch).push(text);
        };

        for (let i = firstDate + 1; i < arr.length; i++) {
            const v = arr[i];
            if (isLunch(v)) { flush(); lunchSeen = true; continue; }
            if (isHeader(v) || isDate(v) || isWeekday(v) || isPeriod(v) || isTime(v)) { flush(); continue; }
            if (isTeacher(v)) { flush(); continue; }
            chunk.push(v);
        }
        flush();

        const add = (bucket, idx, val) => {
            if (!summaries[idx]) return;
            const v = cleanSubject(val);
            if (v && !bucket.call(summaries[idx]).includes(v)) bucket.call(summaries[idx]).push(v);
        };
        const addMorning = (idx, val) => add(function(){ return this.morning; }, idx, val);
        const addAfternoon = (idx, val) => add(function(){ return this.afternoon; }, idx, val);

        const morningSpecial = beforeLunch.filter(v => /청렴|입교|수료|설문|노조|체육/.test(v));
        const morningMain = beforeLunch.filter(v => !morningSpecial.includes(v));
        if (morningMain.length === summaries.length - 1) morningMain.forEach((v, i) => addMorning(i + 1, v));
        else morningMain.slice(0, summaries.length).forEach((v, i) => addMorning(i, v));
        morningSpecial.forEach(v => {
            if (/청렴/.test(v)) addMorning(3, v);
            else addMorning(0, v);
        });

        afterLunch.slice(0, summaries.length).forEach((v, i) => addAfternoon(i, v));
        afterLunch.slice(summaries.length).forEach(v => {
            if (/네트워크\s*개요|Cisco|패킷트레이서/.test(v)) addAfternoon(0, v);
            else if (/패킷/.test(v)) addAfternoon(2, v);
            else if (/체육/.test(v)) addAfternoon(3, v);
            else if (/설문|수료/.test(v)) addAfternoon(4, v);
            else addAfternoon(Math.max(0, summaries.length - 1), v);
        });
        return summaries;
    },
    parseFlexibleTable: function(lines) {
        const cellSep = '\u241F';
        const clean = v => this.cleanLine(v).replace(/\s+/g, ' ').trim();
        const tableLines = (lines || []).filter(v => String(v || '').includes(cellSep));
        if (!tableLines.length) return null;
        const table = tableLines.map(line => String(line).split(cellSep).map(clean));
        const isDate = v => /(\d{1,2})\s*(?:월|[./-])\s*(\d{1,2})/.test(v || '');
        const isWeekday = v => /^(월|화|수|목|금|토|일|Mon|Tue|Wed|Thu|Fri|Sat|Sun)$/i.test(v || '');
        const isTime = v => /^\d{1,2}:\d{2}\s*~?(\s*\d{1,2}:\d{2})?$/.test(v || '');
        const isPeriod = v => /^\d{1,2}$/.test(v || '');
        const isNoise = v => !v || /교육\s*시간표|교육생\s*명단|과정명|담임|강의실|시간|일\s*자|점\s*심|점심|Lunch|비고/i.test(v);
        const dateRow = table.find(row => row.some(isDate)) || [];
        const dateCells = dateRow.map((v, i) => ({ v, i })).filter(x => isDate(x.v));
        if (!dateCells.length) return null;
        const weekdayRow = table.find(row => row.some(isWeekday)) || [];
        const weekdayOf = (date, fallback) => {
            const m = String(date || '').match(/(\d{1,2})\s*(?:월|[./-])\s*(\d{1,2})/);
            if (!m) return fallback || '';
            const d = new Date(new Date().getFullYear(), Number(m[1]) - 1, Number(m[2]));
            return ['일','월','화','수','목','금','토'][d.getDay()];
        };
        const days = dateCells.slice(0, 7).map((x, idx) => ({ date: x.v, weekday: isWeekday(weekdayRow[x.i] || '') ? weekdayRow[x.i] : weekdayOf(x.v, ['월','화','수','목','금'][idx]) }));
        const rows = [];
        table.forEach(cells => {
            const timeIdx = cells.findIndex(isTime);
            if (timeIdx < 0) return;
            const time = cells[timeIdx];
            let startIdx = timeIdx + 1;
            if (isTime(cells[startIdx] || '')) startIdx++;
            const subjects = days.map((d, i) => {
                const col = dateCells[i] ? dateCells[i].i : startIdx + i;
                const candidates = [cells[col], cells[startIdx + i]].map(clean).filter(Boolean);
                const val = candidates.find(v => !isNoise(v) && !isDate(v) && !isWeekday(v) && !isTime(v) && !isPeriod(v)) || '';
                return val;
            });
            if (subjects.some(Boolean)) rows.push({ time, cells: subjects });
        });
        return rows.length ? { days, rows } : null;
    },
    parseTable: function(lines) {
        const cellSep = '\u241F';
        const cleanCell = v => this.cleanLine(v).replace(/^[ㄱ-ㅎㅏ-ㅣ]{1,8}$/g, '').trim();
        const isDate = v => /\d+\s*월\s*\d+\s*일/.test(v) || /\d+\s*\.\s*\d+\s*\([월화수목금토일]\)/.test(v);
        const isWeekday = v => /^(월|화|수|목|금|토|일)$/.test(v);
        const isPeriod = v => /^\d{1,2}$/.test(v);
        const isTime = v => /^\d{1,2}:\d{2}\s*~?$/.test(v) || /^\d{1,2}:\d{2}\s*~\s*\d{1,2}:\d{2}$/.test(v);
        const isHeader = v => /교육\s*시간표|과정명|담임|교육담당|교수|강의실|교육장소|일\s*자|시\s*간/.test(v);
        const isExclude = v => /점\s*심|식\s*사/.test(v || '');
        const stripNoise = v => cleanCell(v)
            .replace(/\b\d+\s*교시\b/g, '')
            .replace(/^[ㄱ-ㅎㅏ-ㅣ]{1,8}\s*/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        const dateToWeekday = date => {
            const m = String(date || '').match(/(\d+)\s*월\s*(\d+)\s*일/) || String(date || '').match(/(\d+)\s*\.\s*(\d+)/);
            if (!m) return '';
            const year = new Date().getFullYear();
            const d = new Date(year, Number(m[1]) - 1, Number(m[2]));
            return ['일','월','화','수','목','금','토'][d.getDay()];
        };

        const tableLines = (lines || []).filter(v => String(v || '').includes(cellSep));
        if (tableLines.length) {
            const table = tableLines.map(line => String(line).split(cellSep).map(cleanCell));
            const dateRow = table.find(row => row.some(isDate)) || [];
            const weekdayRow = table.find(row => row.some(isWeekday)) || [];
            const dateCells = dateRow.map((v, i) => ({ v, i })).filter(x => isDate(x.v));
            const days = dateCells.map((x, idx) => ({
                date: x.v,
                weekday: (weekdayRow[x.i] && isWeekday(weekdayRow[x.i])) ? weekdayRow[x.i] : (dateToWeekday(x.v) || weekdayRow.filter(isWeekday)[idx] || '')
            })).filter(d => d.date || d.weekday);
            const dayCount = days.length || 5;
            while (days.length < dayCount) days.push({ date: '', weekday: ['월','화','수','목','금'][days.length] || '' });

            const rows = [];
            table.forEach(cells => {
                const pIdx = cells.findIndex(isPeriod);
                const timeIdx = cells.findIndex(isTime);
                if (pIdx < 0 || timeIdx < 0) return;
                let endTimeIdx = timeIdx + 1;
                if (!isTime(cells[endTimeIdx] || '')) endTimeIdx = timeIdx;
                const rawSubjects = cells.slice(endTimeIdx + 1);
                const subjects = Array.from({ length: dayCount }, (_, i) => {
                    const v = stripNoise(rawSubjects[i] || '');
                    if (!v || /^[ㄱ-ㅎㅏ-ㅣ]{1,8}$/.test(v) || isExclude(v) || isHeader(v) || isDate(v) || isWeekday(v) || isPeriod(v) || isTime(v)) return '';
                    return v;
                });
                if (subjects.some(Boolean)) {
                    rows.push({
                        time: [cells[timeIdx], isTime(cells[endTimeIdx]) && endTimeIdx !== timeIdx ? cells[endTimeIdx] : ''].filter(Boolean).join(' '),
                        cells: subjects
                    });
                }
            });
            return { days, rows };
        }

        const arr = (lines || []).map(v => this.cleanLine(v)).filter(Boolean);
        const dates = arr.filter(isDate).slice(0, 7);
        const firstDateIdx = arr.findIndex(isDate);
        const weekdays = firstDateIdx >= 0 ? arr.slice(firstDateIdx).filter(isWeekday).slice(0, dates.length || 7) : arr.filter(isWeekday).slice(0, 7);
        const dayCount = Math.max(dates.length, weekdays.length, 5);
        const days = Array.from({ length: dayCount }, (_, i) => ({
            date: dates[i] || '',
            weekday: weekdays[i] || dateToWeekday(dates[i]) || ['월','화','수','목','금'][i] || ''
        })).slice(0, 5);
        const rows = [];
        let i = Math.max(0, arr.findIndex(v => isWeekday(v)) + 1);
        while (i < arr.length) {
            if (!(isPeriod(arr[i]) && isTime(arr[i + 1] || ''))) { i++; continue; }
            i++;
            const t1 = arr[i++] || '';
            let t2 = '';
            if (isTime(arr[i] || '')) t2 = arr[i++];
            const subjects = [];
            while (i < arr.length) {
                if (isPeriod(arr[i]) && isTime(arr[i + 1] || '')) break;
                const v = stripNoise(arr[i++]);
                if (!v || isExclude(v) || isHeader(v) || isDate(v) || isWeekday(v) || isPeriod(v) || isTime(v)) continue;
                if (!subjects.includes(v)) subjects.push(v);
            }
            if (subjects.length) {
                rows.push({ time: [t1, t2].filter(Boolean).join(' '), cells: days.map((_, idx) => subjects[idx] || '') });
            }
        }
        return { days, rows };
    },
    // ── 교육 시간표 사진 (QR 업로드 / 표시 / 삭제) ──
    _photoRef: null,
    _photoUploadUrl: function() {
        const room = state.room || '';
        try { return new URL('schedule_photo.html', location.href).href + '?room=' + encodeURIComponent(room); }
        catch (e) { return 'schedule_photo.html?room=' + encodeURIComponent(room); }
    },
    // ── IndexedDB 로컬 캐시: 시간표 사진을 이 PC에 1회 저장 후 재사용 (Firebase 반복 다운로드 방지) ──
    _idbOpen: function() {
        return new Promise((resolve, reject) => {
            try {
                const req = indexedDB.open('catcScheduleCache', 1);
                req.onupgradeneeded = () => { const db = req.result; if (!db.objectStoreNames.contains('photos')) db.createObjectStore('photos'); };
                req.onsuccess = () => resolve(req.result);
                req.onerror = () => reject(req.error);
            } catch (e) { reject(e); }
        });
    },
    _idbGet: async function(room) {
        try {
            const db = await this._idbOpen();
            return await new Promise(resolve => {
                const r = db.transaction('photos', 'readonly').objectStore('photos').get(room);
                r.onsuccess = () => resolve(r.result || null);
                r.onerror = () => resolve(null);
            });
        } catch (e) { return null; }
    },
    _idbSet: async function(room, val) {
        try {
            const db = await this._idbOpen();
            await new Promise(resolve => {
                const tx = db.transaction('photos', 'readwrite');
                tx.objectStore('photos').put(val, room);
                tx.oncomplete = () => resolve(); tx.onerror = () => resolve();
            });
        } catch (e) {}
    },
    _idbDelete: async function(room) {
        try {
            const db = await this._idbOpen();
            await new Promise(resolve => {
                const tx = db.transaction('photos', 'readwrite');
                tx.objectStore('photos').delete(room);
                tx.oncomplete = () => resolve(); tx.onerror = () => resolve();
            });
        } catch (e) {}
    },
    loadPhoto: function() {
        const block = document.getElementById('schedulePhotoBlock');
        if (!block) return;
        const room = state.room;
        if (this._photoRef) { try { this._photoRef.off(); } catch (e) {} this._photoRef = null; }
        if (!room) { block.innerHTML = '<div style="height:160px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-weight:800;">먼저 강의실을 선택하세요.</div>'; return; }
        block.innerHTML = '<div style="height:160px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-weight:800;">불러오는 중…</div>';
        // 변경 감지는 아주 작은 updatedAt 값만 구독한다. 큰 이미지(dataUrl)는 로컬 캐시를 우선 사용.
        this._photoRef = firebase.database().ref(`courses/${room}/scheduleImage/updatedAt`);
        this._photoRef.on('value', async snap => {
            if (state.room !== room) return;
            const ts = snap.val();
            // 사진 없음(미업로드/삭제/과정 종료) → 이 PC 캐시도 정리 후 '내용 없음'
            if (!ts) { await this._idbDelete(room); if (state.room === room) this._renderPhoto(null); return; }
            // [30분 자동 만료] 업로드 30분 경과 시 Firebase에서 자동 삭제 (저장 부담 경감)
            if (Date.now() - Number(ts) > 1800000) {
                firebase.database().ref(`courses/${room}/scheduleImage`).remove().catch(function () {});
                await this._idbDelete(room);
                if (state.room === room) this._renderPhoto(null);
                return;
            }
            // 페이지가 열려 있는 동안 30분 시점에 삭제되도록 예약
            if (scheduleMgr._expireTimer) clearTimeout(scheduleMgr._expireTimer);
            scheduleMgr._expireTimer = setTimeout(function () {
                firebase.database().ref(`courses/${room}/scheduleImage`).remove().catch(function () {});
            }, (1800000 - (Date.now() - Number(ts))) + 2000);
            // 1) 이 PC 캐시가 최신이면 → Firebase에서 이미지 다시 받지 않고 캐시로 표시
            const cached = await this._idbGet(room);
            if (cached && cached.updatedAt === ts && cached.dataUrl) {
                if (state.room === room) this._renderPhoto({ dataUrl: cached.dataUrl, updatedAt: ts, _cached: true });
                return;
            }
            // 2) 캐시 없음/오래됨(새 사진) → 큰 이미지를 '1회만' 내려받아 이 PC에 저장
            try {
                const dataSnap = await firebase.database().ref(`courses/${room}/scheduleImage/dataUrl`).once('value');
                const dataUrl = dataSnap.val();
                if (!dataUrl) { if (state.room === room) this._renderPhoto(null); return; }
                await this._idbSet(room, { updatedAt: ts, dataUrl });
                if (state.room === room) this._renderPhoto({ dataUrl, updatedAt: ts });
            } catch (e) { console.warn('[시간표 사진] 다운로드 실패', e); }
        });
    },
    _renderPhoto: function(data) {
        const block = document.getElementById('schedulePhotoBlock');
        if (!block) return;
        if (data && data.dataUrl) {
            this._lastPhotoSrc = data.dataUrl;
            let tsStr = '';
            if (data.updatedAt) { const d = new Date(data.updatedAt), p = n => String(n).padStart(2, '0'); tsStr = `${d.getFullYear()}.${p(d.getMonth()+1)}.${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; }
            if (data._cached) tsStr += ' · 이 PC에 저장됨';
            block.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:14px;">
                    <img src="${data.dataUrl}" alt="교육 시간표 사진" onclick="scheduleMgr.openPhotoFullscreen()" title="클릭하면 전체화면으로 크게 봅니다" style="max-width:100%; border-radius:14px; border:1px solid #e2e8f0; box-shadow:0 6px 18px rgba(15,23,42,.08); cursor:zoom-in;">
                    <div style="font-size:12px; color:#94a3b8; font-weight:700;"><i class="fa-solid fa-magnifying-glass-plus"></i> 사진을 클릭하면 전체화면으로 볼 수 있습니다</div>
                    <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; justify-content:center;">
                        ${tsStr ? `<span style="font-size:13px; color:#94a3b8; font-weight:700;">마지막 업로드: ${tsStr}</span>` : ''}
                        <button onclick="scheduleMgr.showPhotoQr()" style="background:#eef2ff; color:#1e3a8a; border:none; border-radius:10px; padding:9px 14px; font-weight:800; cursor:pointer;"><i class="fa-solid fa-qrcode"></i> QR로 교체</button>
                        <button onclick="scheduleMgr.deletePhoto()" style="background:#fef2f2; color:#dc2626; border:none; border-radius:10px; padding:9px 14px; font-weight:800; cursor:pointer;"><i class="fa-solid fa-trash"></i> 삭제</button>
                    </div>
                </div>`;
        } else {
            block.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; padding:18px 0;">
                    <div style="color:#64748b; font-weight:800; font-size:15px;">등록된 시간표 사진이 없습니다. <span style="color:#94a3b8;">(내용 없음)</span></div>
                    <button onclick="scheduleMgr.showPhotoQr()" style="background:#2563eb; color:#fff; border:none; border-radius:12px; padding:14px 22px; font-weight:900; font-size:16px; cursor:pointer; display:flex; align-items:center; gap:9px;"><i class="fa-solid fa-camera"></i> 사진 업로드</button>
                </div>`;
        }
    },
    showPhotoQr: function() {
        const block = document.getElementById('schedulePhotoBlock');
        if (!block) return;
        if (!state.room) return ui.showAlert("강의실을 먼저 선택해 주세요.");
        const url = this._photoUploadUrl();
        block.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:16px; padding:10px 0;">
                <div id="schedulePhotoQr" style="padding:14px; background:#fff; border:1px solid #e2e8f0; border-radius:14px;"></div>
                <div style="text-align:center; color:#334155; font-weight:800; font-size:15px; line-height:1.75;">
                    📱 <b>휴대폰 카메라로 위 QR을 스캔</b>하세요.<br>
                    <span style="font-weight:700; color:#64748b;">사진 앱이 열리면 시간표를 <b>촬영</b>하거나 <b>앨범에서 선택</b>해 업로드합니다.<br>업로드하면 이 화면에 곧바로 표시됩니다.</span>
                </div>
                <button onclick="scheduleMgr.loadPhoto()" style="background:#f1f5f9; color:#475569; border:none; border-radius:10px; padding:10px 18px; font-weight:800; cursor:pointer;">← 취소 / 새로고침</button>
            </div>`;
        const qrDiv = document.getElementById('schedulePhotoQr');
        if (qrDiv && typeof QRCode !== 'undefined') {
            try { new QRCode(qrDiv, { text: url, width: 200, height: 200, correctLevel: QRCode.CorrectLevel.H }); }
            catch (e) { qrDiv.textContent = url; }
        } else if (qrDiv) { qrDiv.textContent = url; }
    },
    deletePhoto: function() {
        if (state.isObserver) return ui.showAlert("👁️ 옵저버 모드에서는 수정할 수 없습니다.");
        const room = state.room;
        if (!room) return;
        if (!confirm('등록된 시간표 사진을 삭제할까요?')) return;
        firebase.database().ref(`courses/${room}/scheduleImage`).remove()
            .then(() => { this._idbDelete(room); ui.showAlert('🗑️ 시간표 사진을 삭제했습니다.'); })
            .catch(err => ui.showAlert('삭제 실패: ' + (err && err.message ? err.message : '')));
    },
    openPhotoFullscreen: function() {
        const src = this._lastPhotoSrc;
        if (!src) return;
        const exist = document.getElementById('schedulePhotoFs');
        if (exist) exist.remove();
        const ov = document.createElement('div');
        ov.id = 'schedulePhotoFs';
        ov.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,.92); z-index:2147483600; display:flex; align-items:center; justify-content:center; padding:16px; cursor:zoom-out;';
        const img = document.createElement('img');
        img.src = src;
        img.style.cssText = 'max-width:100%; max-height:100%; object-fit:contain; border-radius:8px; box-shadow:0 10px 40px rgba(0,0,0,.5);';
        const close = document.createElement('button');
        close.innerHTML = '✕';
        close.style.cssText = 'position:fixed; top:18px; right:18px; width:46px; height:46px; border-radius:50%; border:none; background:rgba(255,255,255,.92); color:#0f172a; font-size:22px; font-weight:900; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:1;';
        const remove = () => { const e = document.getElementById('schedulePhotoFs'); if (e) e.remove(); document.removeEventListener('keydown', onKey); };
        const onKey = e => { if (e.key === 'Escape') remove(); };
        ov.onclick = remove;
        close.onclick = (e) => { e.stopPropagation(); remove(); };
        img.onclick = (e) => e.stopPropagation();   // 이미지 클릭은 닫기 방지(배경 클릭만 닫힘)
        ov.appendChild(img);
        ov.appendChild(close);
        document.body.appendChild(ov);
        document.addEventListener('keydown', onKey);
    },
    renderSchedule: function(lines) {
        const itinerary = this.parseItinerary(lines);
        if (itinerary && itinerary.length) return this.renderItinerary(itinerary);
        const linearSummaries = this.parseLinearSummary(lines);
        const flexibleParsed = linearSummaries ? null : this.parseFlexibleTable(lines);
        const parsed = linearSummaries ? null : (flexibleParsed || this.parseTable(lines));
        if (!linearSummaries && !parsed.days.length) return '<div style="height:180px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-weight:800;">표시할 교육일정이 없습니다.</div>';
        const startHour = time => {
            const m = String(time || '').match(/(\d{1,2}):(\d{2})/);
            return m ? Number(m[1]) + Number(m[2]) / 60 : 13;
        };
        const cleanSubject = v => this.cleanLine(v)
            .replace(/^[ㄱ-ㅎㅏ-ㅣ]{1,8}\s*/g, '')
            .replace(/\s*\((강사\s*[^)]*|담당\s*[^)]*|교수\s*[^)]*|장두석|임채택|노조간부)\)\s*/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        const add = (arr, val) => {
            const v = cleanSubject(val);
            if (!v || /^[ㄱ-ㅎㅏ-ㅣ]{1,8}$/.test(v) || /점\s*심|식\s*사/.test(v)) return;
            if (!arr.includes(v)) arr.push(v);
        };
        const summaries = linearSummaries || parsed.days.slice(0, 5).map((day, idx) => {
            const item = { ...day, morning: [], afternoon: [] };
            parsed.rows.forEach(row => {
                const v = row.cells[idx];
                if (!v) return;
                if (startHour(row.time) < 12) add(item.morning, v);
                else add(item.afternoon, v);
            });
            return item;
        });
        if (summaries[0] && summaries[0].afternoon.some(v => /입교|과정\s*안내|교육과정안내/.test(v))) {
            summaries[0].morning = [];
        }
        const allSubjectsForCorrection = summaries.flatMap(d => [...(d.morning || []), ...(d.afternoon || [])]);
        const allSummaryText = allSubjectsForCorrection.join(' ');
        if (/공사소송|존중과\s*배려|비전2035|브릿지\s*리더/.test(allSummaryText)) {
            const sourceText = (lines || []).map(v => String(v || '')).join(' ');
            const extract = pattern => {
                const m = sourceText.match(pattern);
                return m ? this.cleanLine(m[0]) : '';
            };
            const find = (...patterns) => {
                return allSubjectsForCorrection.find(v => patterns.some(p => p.test(v))) || '';
            };
            const put = (idx, key, patterns, fallbackPattern) => {
                const v = find(...patterns) || (fallbackPattern ? extract(fallbackPattern) : '');
                if (summaries[idx] && v && !summaries[idx][key].includes(v)) summaries[idx][key].push(v);
            };
            summaries.forEach(d => { d.morning = []; d.afternoon = []; });
            put(0, 'afternoon', [/교육과정안내|교육과정\s*안내/], /교육과정안내\s*\([^)]*\)|교육과정안내/);
            put(0, 'afternoon', [/팀빌딩|협업/]);
            put(0, 'afternoon', [/비전2035/]);
            put(1, 'morning', [/공사소송/]);
            put(1, 'morning', [/인사관리의\s*이해/]);
            put(1, 'afternoon', [/인사관리의\s*이해/]);
            put(1, 'afternoon', [/청렴/]);
            put(1, 'afternoon', [/브릿지\s*리더|AI\s*시뮬레이션/]);
            put(2, 'morning', [/존중과\s*배려|RESPECT/]);
            put(2, 'afternoon', [/노조와의\s*대화/]);
            put(2, 'afternoon', [/주도적\s*몰입|업무실행력/]);
            put(2, 'afternoon', [/액션플랜/]);
            put(3, 'morning', [/조직성과\s*관리/]);
            put(3, 'morning', [/조직내\s*갈등|의사소통/]);
            put(3, 'afternoon', [/조직내\s*갈등|의사소통/]);
            put(3, 'afternoon', [/AI\s*활용보고서|활용보고서/]);
            put(4, 'morning', [/노사관계|보수체계/]);
            put(4, 'morning', [/필기평가/], /필기\s*평가\s*\([^)]*\)|필기평가\s*\([^)]*\)|필기평가/);
            put(4, 'afternoon', [/스마트한\s*재무설계/]);
            put(4, 'afternoon', [/설문|수료/], /설문\s*평가\s*및\s*수료\s*\([^)]*\)|설문\s*평가\s*및\s*수료|설문조사\s*및\s*수료\s*\([^)]*\)|설문조사\s*및\s*수료/);
        }
        const splitSubjectText = v => {
            const text = String(v || '').replace(/\s+/g, ' ').trim();
            if (!text) return [];
            const out = [];
            const re = /(.+?\([^)]{1,30}\))(?=\s*[가-힣A-Za-z0-9])/g;
            let last = 0;
            let m;
            while ((m = re.exec(text)) !== null) {
                const part = m[1].trim();
                if (part) out.push(part);
                last = re.lastIndex;
            }
            const tail = text.slice(last).trim();
            if (tail) out.push(tail);
            return out.length ? out : [text];
        };
        const normalizeSubjects = arr => {
            const flat = [];
            (arr || []).forEach(v => splitSubjectText(v).forEach(part => {
                const item = part.replace(/\s+,/g, ',').replace(/,\s*/g, ', ').trim();
                if (item && !flat.includes(item)) flat.push(item);
            }));
            return flat.sort((a, b) => {
                const as = /설문|수료/.test(a) ? 1 : 0;
                const bs = /설문|수료/.test(b) ? 1 : 0;
                return as - bs;
            });
        };
        const formatSubjects = arr => {
            const subjects = normalizeSubjects(arr);
            if (!subjects.length) return '<span style="color:#64748b; font-weight:800;">해당없음</span>';
            return subjects.map(v => {
                const special = /청렴|체육|노조|입교|수료|설문/.test(v);
                const color = special ? '#b45309' : '#0f172a';
                return `<span style="color:${color}; font-weight:900;">${this.escapeHtml(v)}</span>`;
            }).join(', ');
        };
        const dayTitle = d => {
            const wd = d.weekday ? `${d.weekday}요일` : '';
            return [d.date, wd].filter(Boolean).join(' ');
        };
        const today = new Date();
        const todayMD = `${today.getMonth() + 1}-${today.getDate()}`;
        const dayMD = d => {
            const text = `${d.date || ''} ${d.weekday || ''}`;
            const m = text.match(/(\d{1,2})\s*(?:월|[./-])\s*(\d{1,2})/);
            return m ? `${Number(m[1])}-${Number(m[2])}` : '';
        };
        return `
            <div style="display:flex; flex-direction:column; gap:12px; font-family:inherit;">
                ${summaries.map(day => {
                    const isToday = dayMD(day) === todayMD;
                    return `
                    <div style="box-sizing:border-box; border:1px solid ${isToday ? '#f8cdd6' : '#dbe4f0'}; border-radius:14px; background:${isToday ? '#fff6f8' : '#fff'}; padding:17px 19px;">
                        <div style="font-size:18px; font-weight:900; color:#0f3f73; margin-bottom:10px;">${this.escapeHtml(dayTitle(day) || '-')}</div>
                        <div style="display:flex; flex-direction:column; gap:7px; color:#0f172a; font-size:15px; line-height:1.55; font-weight:700;">
                            <div><span style="color:#2563eb; font-weight:900;">* 오전 과정 :</span> ${formatSubjects(day.morning)}</div>
                            <div><span style="color:#16a34a; font-weight:900;">* 오후 과정 :</span> ${formatSubjects(day.afternoon)}</div>
                        </div>
                    </div>
                `}).join('')}
            </div>`;
    },
    load: async function() {
        const title = document.getElementById('scheduleCourseName');
        const meta = document.getElementById('scheduleMeta');
        const badge = document.getElementById('scheduleRoomBadge');
        if (badge) badge.innerText = `Room #${state.room || '-'}`;
        // 사진 전용 페이지: 헤더(과정명·기간)만 표시하고 사진 블록을 불러온다.
        this.loadPhoto();
        if (!state.room) {
            if (title) title.innerText = '교육 시간표';
            if (meta) meta.innerText = '먼저 강의실을 선택하세요.';
            return;
        }
        try {
            const settingsSnap = await firebase.database().ref(`courses/${state.room}/settings`).once('value');
            const settings = settingsSnap.val() || {};
            if (title) title.innerText = settings.courseName || '교육 시간표';
            if (meta) meta.innerText = settings.period || '기간 미설정';
        } catch (e) {
            console.warn('[교육 시간표] 과정 정보 로드 실패', e);
            if (meta) meta.innerText = '';
        }
        // 참고: 한글파일 파싱 텍스트 요약(renderSchedule/parseItinerary)은 보존되어 있으나
        //       현재 사진 전용 페이지에서는 사용하지 않는다.
    }
};

const guideMgr = {
    // 강의실별 PDF 상태 캐시: { [roomId]: { pdfDoc, pageNum } }
    // getter/setter 없이 직접 참조 — 컨텍스트 문제 완전 차단
    _roomCache: {},
    isRendering: false,

    // 현재 방 ID 반환
    _room: function() { return state.room || '__default__'; },

    // 현재 방 캐시 슬롯 반환 (없으면 초기화)
    _slot: function() {
        const r = guideMgr._room();
        if (!guideMgr._roomCache[r]) {
            guideMgr._roomCache[r] = { pdfDoc: null, pageNum: 1 };
        }
        return guideMgr._roomCache[r];
    },

    // 배포 폴더의 PDF를 우선 사용한다. 외부 raw 주소는 구형 배포본을 위한 예비 경로다.
    GUIDE_PDF_URL: '입교안내.pdf',
    GUIDE_PDF_FALLBACK_URL: 'https://raw.githubusercontent.com/kac-edu/CATC/main/%EC%9E%85%EA%B5%90%EC%95%88%EB%82%B4.pdf',
    // [J12] 온라인(Zoom) 과정 전용 비대면 입교안내
    GUIDE_PDF_ONLINE_URL: '입교안내(비대면).pdf',
    GUIDE_PDF_ONLINE_FALLBACK_URL: 'https://raw.githubusercontent.com/kac-edu/CATC/main/' + encodeURIComponent('입교안내(비대면).pdf'),
    // [J12] 과정 장소가 온라인(Zoom)인지 — ZOOM 모니터링과 동일 기준 (settings.roomDetailName)
    _isOnline: function() { const s = guideMgr._slot(); return /온라인|zoom/i.test(String((s && s.roomDetailName) || '')); },
    // [J12] 교육시간표(사진/QR/판독) 페이지 — 대면 PDF 13p, 비대면 PDF 7p
    _schedulePage: function() { return guideMgr._isOnline() ? 7 : 13; },
    // [J12] 비대면 PDF 교육개요(빈칸 채움) 페이지
    _overviewPage: function() { return 4; },

    // 1. 초기화 — Firebase DB 리스너 없음, 리사이즈 감시만 설정
    //    실제 PDF 로드는 사용자가 '입교안내' 탭을 클릭할 때 refresh()에서 수행
init: function() {
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    }

    // resize 디바운스 (300ms) - 연속 호출 방지
    if (!window._guideResizeSet) {
        window._guideResizeSet = true;
        let resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const slot = guideMgr._slot();
                if (slot.pdfDoc) {
                    guideMgr.isRendering = false;
                    guideMgr.renderPage(slot.pageNum);
                }
            }, 300);
        });
        document.addEventListener('fullscreenchange', () => {
            guideMgr.isRendering = false;
            setTimeout(() => guideMgr.renderPage(guideMgr._slot().pageNum), 350);
            // [추가] 전체화면(ESC 포함)에서 빠져나오면 사이드바를 접힌 상태로 강제
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                document.body.classList.add('sidebar-hidden');
                // [수정] 전체화면에서 나왔으면 '들어가기(fa-expand)' 아이콘이 맞음 (이전엔 반대로 fa-compress로 강제되던 버그)
                const fsIcon = document.querySelector('.control-icon-btn i.fa-expand, .control-icon-btn i.fa-compress');
                if (fsIcon) { fsIcon.classList.remove('fa-compress'); fsIcon.classList.add('fa-expand'); }
            }
        });

        // 휴대용 프레젠터(포인터) 및 키보드 방향키 지원
        // - 입교안내 탭이 활성화된 동안 항상 작동 (전체화면 불필요)
        // - 프레젠터 기기: 다음→ PageDown/ArrowRight, 이전← PageUp/ArrowLeft
        document.addEventListener('keydown', (e) => {
            if (state.currentMode !== 'guide') return;
            if (document.getElementById('guideScheduleModal') || document.getElementById('guideScheduleUploadModal')) return;
            if (['ArrowRight', 'PageDown'].includes(e.key)) {
                e.preventDefault();
                guideMgr.changePage(1);
            } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
                e.preventDefault();
                guideMgr.changePage(-1);
            }
        });
    }
},

    // 코디/센터 공지 배지 업데이트
    updateCoordNoticeBadge: function(newMsg, lastSeen, type) {
        const hasNew = newMsg && newMsg !== lastSeen;
        const badge = document.getElementById('coordNoticeBadge');
        if(badge) badge.style.display = hasNew ? 'inline-block' : 'none';
    },

    // 공지 탭 진입 시 배지 숨기고 읽음 처리 (coord + global 모두)
    // 공지 카드 하이라이트 (새 공지 flash 효과)
    _flashNewNotices: function() {
        // 배지가 켜져 있었으면 (새 공지가 있었으면) 카드 flash
        const badge = document.getElementById('coordNoticeBadge');
        const hasBadge = badge && badge.style.display !== 'none';
        if (!hasBadge) return;
        
        const display = document.getElementById('globalNoticeDisplay');
        if (!display) return;
        
        // 모든 공지 카드에 flash 효과
        const cards = display.querySelectorAll('div[style*="border-radius:12px"]');
        cards.forEach(card => {
            const origBg = card.style.background;
            card.style.transition = 'background 0.3s ease';
            card.style.background = '#d1fae5'; // 연두색
            setTimeout(() => {
                card.style.background = origBg;
                setTimeout(() => {
                    card.style.background = '#d1fae5';
                    setTimeout(() => { card.style.background = origBg; }, 400);
                }, 400);
            }, 400);
        });
    },

    clearCoordNoticeBadge: function() {
        // 배지만 숨김 - state.noticeSeen은 건드리지 않음
        // (seen 업데이트는 리스너에서만 처리)
        const badge = document.getElementById('coordNoticeBadge');
        if(badge) badge.style.display = 'none';
    },

    // 공지 알림 팝업
    showCoordNoticeAlert: function(msg, type) {
        // 배지 표시 (공지탭 NEW 배지)
        const badge = document.getElementById('coordNoticeBadge');
        if(badge) badge.style.display = 'inline-block';

        // 퀴즈 탭 또는 Q&A 탭에서는 팝업 차단
        const blockedModes = ['quiz', 'qa'];
        if(blockedModes.includes(state.currentMode)) return;

        const modal = document.getElementById('coordNoticeAlertModal');
        const titleEl = document.getElementById('coordNoticeAlertTitle');
        const content = document.getElementById('coordNoticeAlertContent');
        if(!modal || !content) return;

        if(titleEl) {
            titleEl.innerText = type === 'global'
                ? '📢 입교안내 공지가 업데이트되었습니다'
                : '📋 운영부 과정 공지가 업데이트되었습니다';
        }
        // <br>(리터럴)·줄바꿈을 실제 줄바꿈으로 렌더
        if (ui._noticeToHtml) content.innerHTML = ui._noticeToHtml(msg);
        else content.innerText = msg;
        modal.style.display = 'flex';
    },

    // 탭 전환 시 PDF 재렌더링 (setMode에서 호출)
    // 현재 방 캐시에 pdfDoc이 있으면 저장된 페이지 그대로 재개,
    // 없으면 GitHub URL에서 on-demand 로드 (첫 진입 시)
    // [J11] 지원부가 명단 업로드 시 자동 판독되는 시간표 그리드(courses/{room}/schedule/grid) 실시간 구독.
    //  값이 생기거나 사라지면 13p 버튼 3종(판독보기/사진보기/QR업로드)을 즉시 토글 — 새로고침 불필요.
    _watchParsedGrid: function() {
        const room = state.room;
        if (!room) return;
        if (guideMgr._gridRefRoom === room && guideMgr._gridRef) return;   // 같은 방이면 유지
        if (guideMgr._gridRef) { try { guideMgr._gridRef.off(); } catch (e) {} }
        guideMgr._gridRefRoom = room;
        guideMgr._gridRef = firebase.database().ref(`courses/${room}/schedule/grid`);
        guideMgr._gridRef.on('value', function (s) {
            if (state.room !== room) return;
            const slot = guideMgr._slot(); if (!slot) return;
            slot.parsedGrid = s.val() || null;
            try { guideMgr._refreshScheduleBtns(); } catch (e) {}
        });
    },
    // [J11] 13p 시간표 버튼 3종 토글 — 판독 grid 있으면 녹색 '교육시간표 보기'만, 없으면 기존 사진/QR 흐름
    _refreshScheduleBtns: function() {
        const slot = guideMgr._slot(); if (!slot) return;
        const _on13 = (guideMgr._toPdfPage(slot.pageNum || 1) === guideMgr._schedulePage());   // [J12] 대면 13p · 비대면 7p
        const _grid = slot.parsedGrid;
        const _hasSched = !!slot.scheduleTs;
        const _pBtn = document.getElementById('guideParsedScheduleBtn');
        if (_pBtn) _pBtn.style.display = (_on13 && _grid) ? 'inline-flex' : 'none';
        const _sBtn = document.getElementById('guideScheduleBtn');
        if (_sBtn) _sBtn.style.display = (_on13 && !_grid && _hasSched) ? 'inline-flex' : 'none';
        const _uBtn = document.getElementById('guideScheduleUploadBtn');
        if (_uBtn) _uBtn.style.display = (_on13 && !_grid && !_hasSched && !state.isObserver) ? 'inline-flex' : 'none';
        if (!_on13 || _grid) { const sh = document.getElementById('parsedScheduleSheet'); if (!_on13 && sh && sh.classList.contains('pss-open')) { try { ui.closeParsedSchedule(); } catch(e){} } }
    },

    // [J12.3] 과정 전환 시 이전 과정 PDF 잔상 제거 — 공용 캔버스/가상페이지/오버레이를 즉시 비움
    _lastRenderedRoom: null,
    _clearStaleView: function() {
        try {
            const c = document.getElementById('guideCanvas');
            if (c) {
                const ctx = c.getContext('2d');
                ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.fillStyle = '#f8fafc';
                ctx.fillRect(0, 0, c.width, c.height);
                ctx.restore();
            }
        } catch (e) {}
        const p = document.getElementById('guideProfile');
        if (p) p.style.setProperty('display', 'none', 'important');
        ['guideRouletteBtn', 'guideScheduleBtn', 'guideScheduleUploadBtn', 'guideParsedScheduleBtn'].forEach(function (id) {
            const e = document.getElementById(id); if (e) e.style.display = 'none';
        });
        const v = document.getElementById('guideVenueOverlay'); if (v) v.style.display = 'none';
        const o = document.getElementById('guideOverviewOverlay'); if (o) o.style.display = 'none';
        try { const sh = document.getElementById('parsedScheduleSheet'); if (sh && sh.classList.contains('pss-open')) ui.closeParsedSchedule(); } catch (e) {}
        const badge = document.getElementById('guideStatusBadge');
        if (badge) { badge.innerText = '⏳ 불러오는 중...'; badge.style.color = '#f59e0b'; }
    },

    refresh: async function() {
        const slot = guideMgr._slot();
        // [J12.3] 다른 과정에서 넘어온 경우: 이전 과정 PDF가 그려진 캔버스를 먼저 지워 잔상 노출 차단
        if (guideMgr._lastRenderedRoom && guideMgr._lastRenderedRoom !== guideMgr._room()) guideMgr._clearStaleView();
        guideMgr._watchParsedGrid();   // [J11] 지원부 판독 시간표(grid) 실시간 구독
        await guideMgr._loadProfile();
        await guideMgr._loadCourseInfo();
        // [J12] 과정 장소가 온라인(Zoom)이면 비대면 입교안내 PDF 사용 (변형이 바뀌었으면 재로드)
        const wantUrl = guideMgr._isOnline() ? guideMgr.GUIDE_PDF_ONLINE_URL : guideMgr.GUIDE_PDF_URL;
        if (slot.pdfDoc && slot.pdfUrl === wantUrl) {
            guideMgr.isRendering = false;
            guideMgr.renderPage(slot.pageNum || 1);
        } else {
            guideMgr._clearStaleView();   // [J12.3] 같은 방에서 대면↔비대면 변형이 바뀐 경우도 즉시 비움
            slot.pdfDoc = null;
            slot.pageNum = 1;
            guideMgr.loadPDF(wantUrl);
        }
    },

    // 담임 교수 프로필 로드 (현재 방의 professorName -> professorProfiles)
    _loadProfile: async function() {
        const slot = guideMgr._slot();
        try {
            const room = guideMgr._room();
            const nameSnap = await firebase.database().ref(`courses/${room}/status/professorName`).once('value');
            const name = (nameSnap.val() || '').trim();
            if (!name) { slot.profile = null; slot.kakaoLink = ''; return; }
            const pSnap = await firebase.database().ref(`system/professorProfiles/${name}`).once('value');
            const pr = pSnap.val();
            slot.kakaoLink = (pr && pr.kakaoLink) ? String(pr.kakaoLink).trim() : '';   // 교수 오픈톡방 주소 (있을 때만 QR 페이지 노출)
            const hasContent = pr && (pr.photo || pr.msg || pr.bio || (Array.isArray(pr.bioList) && pr.bioList.length) || pr.phone || pr.email);
            if (hasContent) { pr._name = name; slot.profile = pr; } else { slot.profile = null; }
        } catch (e) { slot.profile = null; slot.kakaoLink = ''; }
    },

    // [교육과정 안내 가상 페이지] 현재 과정 정보 + 과정별 저장된 교육구분/평가 로드
    _loadCourseInfo: async function() {
        const slot = guideMgr._slot();
        const room = guideMgr._room();
        const ci = { courseName: '', period: '', count: 0, category: 'duty-general', evaluation: 'none' };
        try {
            const cs = await firebase.database().ref(`courses/${room}/settings`).once('value');
            const set = cs.val() || {};
            ci.courseName = set.courseName || '';
            ci.period = set.period || '';
            const gi = set.guideCourseInfo || {};
            if (gi.category) ci.category = gi.category;       // 기본값: 직무 일반
            if (gi.evaluation) ci.evaluation = gi.evaluation; // 기본값: 없음(근태10%)
            slot.pagePos = set.guidePagePos || {};            // 삽입 페이지 수동 위치
            slot.pageEnable = set.guidePageEnable || {};      // 오픈톡방 QR·채널안내 표시 여부(체크박스)
            slot.centerNoticeOnline = (set.centerNoticeOnline === true);   // [온라인 운영부공지] 온라인 과정은 기본 숨김, 이 토글이 켜지면 표시
            slot.venuePick = set.venuePick || {};             // 교육장소 페이지 강의실 선택 (셀 index → 강의실) — 수동/공유
            slot.roomDetailName = set.roomDetailName || '';   // 과정 강의실(연간계획/과정현황 설정값) — 자동 표시용 폴백
            slot.venuePage = Number(set.guideVenuePage) || 14; // 교육장소 오버레이가 뜰 PDF 페이지 (기본 14)
        } catch (e) {}
        // 교육 인원 = 실제 입교완료(QR 입장) 인원 수 (수강생 현황의 '입교 완료'와 동일)
        try {
            const sSnap = await firebase.database().ref(`courses/${room}/students`).once('value');
            const stu = sSnap.val() || {};
            ci.count = new Set(Object.values(stu).filter(x => x && x.name && x.name !== 'undefined').map(x => String(x.name).trim())).size;
        } catch (e) {}
        // 교육 시간표 사진 존재 여부 (+ 업로드 30분 경과 시 자동 삭제로 Firebase 부담 경감)
        slot.scheduleTs = 0;
        try {
            const tsSnap = await firebase.database().ref(`courses/${room}/scheduleImage/updatedAt`).once('value');
            const ts = Number(tsSnap.val() || 0);
            if (ts && (Date.now() - ts > 1800000)) {        // 30분 경과 → 삭제
                firebase.database().ref(`courses/${room}/scheduleImage`).remove().catch(function () {});
            } else {
                slot.scheduleTs = ts;
            }
        } catch (e) {}
        // 센터 전체 공지(system/globalNotice) — 내용이 있으면 PDF 23p 뒤 안내 페이지로 노출
        slot.centerNotice = '';
        try { const _gn = await firebase.database().ref('system/globalNotice').once('value'); slot.centerNotice = String(_gn.val() || '').trim(); } catch (e) {}
        slot.courseInfo = ci;
    },

    // 교육구분/평가 선택 시 과정별로 저장 (Firebase courses/{room}/settings/guideCourseInfo)
    _saveCourseInfo: function(field, value) {
        const slot = guideMgr._slot();
        const room = guideMgr._room();
        if (!room) return;
        slot.courseInfo = slot.courseInfo || {};
        slot.courseInfo[field] = value;
        const upd = {};
        upd[`courses/${room}/settings/guideCourseInfo/${field}`] = value;
        firebase.database().ref().update(upd).catch(function () {});
    },

    // 교육기간 표기 변환: "2026-05-27 ~ 2026-05-29" → "2026. 5. 27 (수) ~ 5. 29 (금)"
    _fmtPeriod: function(period) {
        if (!period || String(period).indexOf('~') < 0) return period || '';
        const W = ['일', '월', '화', '수', '목', '금', '토'];
        const parse = s => { const m = String(s).match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/); return m ? { y: +m[1], mo: +m[2], d: +m[3] } : null; };
        const dow = o => W[new Date(o.y, o.mo - 1, o.d).getDay()];
        const parts = String(period).split('~');
        const pa = parse(parts[0] || ''), pb = parse(parts[1] || '');
        if (!pa) return period;
        const sa = pa.y + '. ' + pa.mo + '. ' + pa.d + ' (' + dow(pa) + ')';
        if (!pb) return sa;
        const sb = (pb.y === pa.y) ? (pb.mo + '. ' + pb.d + ' (' + dow(pb) + ')')
                                   : (pb.y + '. ' + pb.mo + '. ' + pb.d + ' (' + dow(pb) + ')');
        return sa + ' ~ ' + sb;
    },

    _courseInfoHTML: function() {
        const ci = guideMgr._slot().courseInfo || { courseName: '', period: '', count: 0, category: 'duty-general', evaluation: 'none' };
        const esc = s => (s == null ? '' : String(s)).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
        const courseName = esc(ci.courseName) || '과정명 미설정';
        const period = esc(guideMgr._fmtPeriod(ci.period)) || '기간 미설정';
        const count = (ci.count != null ? ci.count : 0);
        const cat = ci.category || 'duty-general';
        const ev = ci.evaluation || 'none';
        const stop = `onclick="event.stopPropagation()" onmousedown="event.stopPropagation()" oncontextmenu="event.stopPropagation();return false;"`;
        const catSel = `<select class="ci-select" ${stop} onchange="guideMgr._saveCourseInfo('category', this.value)">
              <option value="duty-general" ${cat === 'duty-general' ? 'selected' : ''}>직무 일반</option>
              <option value="duty-legal" ${cat === 'duty-legal' ? 'selected' : ''}>직무 법정</option>
            </select>`;
        const evSel = `<select class="ci-select" ${stop} onchange="guideMgr._saveCourseInfo('evaluation', this.value)">
              <option value="none" ${ev === 'none' ? 'selected' : ''}>없음 (근태평가 10%)</option>
              <option value="written" ${ev === 'written' ? 'selected' : ''}>필기평가 (90%) + 근태 (10%)</option>
            </select>`;
        const row = (label, valHtml) =>
            `<div class="ci-row"><span class="ci-bar"></span><span class="ci-label">${label}</span><span class="ci-val">${valHtml}</span></div>`;
        return `<div class="guide-courseinfo-slide">
          <div class="ci-header">
            <div class="ci-head-center"><span class="ci-emblem"><i class="fa-solid fa-plane-up"></i></span><span class="ci-header-title">입교 안내</span></div>
            <div class="ci-head-right"><img src="logo.png" class="ci-logo" alt="KAC" onerror="this.style.display='none'"></div>
          </div>
          <div class="ci-body">
            <div class="ci-section"><span class="ci-section-bar"></span> 2. 교육과정 안내</div>
            <div class="ci-fields">
              ${row('과 정 명 :', `<span class="ci-strong">${courseName}</span>`)}
              ${row('교육 인원 :', `<span class="ci-strong"><b id="ciCount">${count}</b>명</span>`)}
              ${row('교육 기간 :', `<span class="ci-strong">${period}</span>`)}
              ${row('교육 구분 :', catSel)}
              ${row('교육 평가 :', evSel)}
            </div>
          </div>
        </div>`;
    },

    // 센터 전체 공지 안내 페이지 (PDF 23p 뒤) — courseinfo 헤더 재사용 + 라운딩 박스 공지
    _centerNoticeHTML: function() {
        const esc = s => (s == null ? '' : String(s)).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
        const raw = String(guideMgr._slot().centerNotice || '').trim();
        // 운영부가 <br>(리터럴)로 저장하는 경우가 있어, 이스케이프 전에 <br>을 줄바꿈으로 정규화 → 다시 <br>로 변환
        const body = raw ? esc(raw.replace(/<br\s*\/?>/gi, '\n')).replace(/\r?\n/g, '<br>') : '현재 게시된 입교안내 공지가 없습니다.';
        return `<div class="guide-courseinfo-slide guide-centernotice-slide">
          <div class="ci-header">
            <div class="ci-head-center"><span class="ci-emblem"><i class="fa-solid fa-plane-up"></i></span><span class="ci-header-title">입교 안내</span></div>
            <div class="ci-head-right"><img src="logo.png" class="ci-logo" alt="KAC" onerror="this.style.display='none'"></div>
          </div>
          <div class="cn-body">
            <div class="cn-title"><i class="fa-solid fa-bullhorn"></i> 교육운영부 안내 말씀</div>
            <div class="cn-box">${body}</div>
          </div>
        </div>`;
    },

    _kakaoQrHTML: function() {
        return `<div class="guide-kakaoqr-slide">
          <div class="ci-header">
            <div class="ci-head-center"><span class="ci-emblem"><i class="fa-solid fa-plane-up"></i></span><span class="ci-header-title">입교 안내</span></div>
            <div class="ci-head-right"><img src="logo.png" class="ci-logo" alt="KAC" onerror="this.style.display='none'"></div>
          </div>
          <div class="kq-body">
            <div class="kq-qr"><div id="guideKakaoQrBig" class="kq-qr-box"></div></div>
            <div class="kq-right">
              <div class="kt-logo"><span class="kt-bubble">TALK</span></div>
              <div class="kq-guide"><i class="fa-solid fa-camera"></i> 카메라로 <b>QR 스캔</b><br>담임 교수님 <b>오픈채팅방</b> 입장</div>
            </div>
          </div>
        </div>`;
    },

    // [배경음] start.mp3 — 채널 안내 영상(start.mp4)과 함께 동작하는 별도 6분 노래(개별 반복)
    _cgAudio: null,
    _playChannelAudio: function() {
        try {
            if (!this._cgAudio) {
                this._cgAudio = new Audio('start.mp3?t=' + Date.now());
                this._cgAudio.loop = true;          // 노래는 별도로 반복
                this._cgAudio.preload = 'auto';
                this._cgAudio.addEventListener('error', function(){});  // start.mp3 없으면 조용히 무시
            }
            // 초기 음량 = 전체 과정 공통 저장값(system/sharedGuide/channelAudioVolume), 없으면 20%
            var _vol = (ui && ui._cgVol != null && isFinite(ui._cgVol)) ? ui._cgVol : 0.2;
            this._cgAudio.volume = Math.max(0, Math.min(1, _vol));
            this._cgAudio.currentTime = 0;
            var _p = this._cgAudio.play();
            if (_p && _p.catch) _p.catch(function(){});
        } catch(e){}
    },
    _stopChannelAudio: function() {
        try { if (this._cgAudio) { this._cgAudio.pause(); this._cgAudio.currentTime = 0; } } catch(e){}
    },
    // [음량] 현재 재생 음량 설정 + 아이콘/슬라이더 갱신 (저장은 3초 롱프레스에서만)
    _setChannelVolume: function(v) {
        v = Math.max(0, Math.min(1, Number(v)||0));
        try { if (this._cgAudio) this._cgAudio.volume = v; } catch(e){}
        try {
            var ico = document.getElementById('cgVolIco');
            if (ico) ico.className = 'fa-solid ' + (v <= 0 ? 'fa-volume-xmark' : (v < 0.5 ? 'fa-volume-low' : 'fa-volume-high'));
            var sl = document.getElementById('cgVolSlider');
            if (sl && String(Math.round(v*100)) !== sl.value) sl.value = Math.round(v*100);
        } catch(e){}
    },
    _channelGuideHTML: function() {
        // [영상 대체] 카카오채널 입교/출결 등록방법 안내를 GitHub에 올린 start.mp4 영상으로 상영.
        // 전체화면/윈도우 어느 쪽이든 화면을 꽉 채워 재생. 영상 파일이 없으면 안내 문구 표시.
        return `<div class="guide-channel-slide guide-video-slide">
          <video id="cgVideo" class="cg-video" src="start.mp4?t=${Date.now()}" playsinline controls loop preload="auto"
                 onerror="var f=document.getElementById('cgVideoFallback'); if(f) f.style.display='flex'; this.style.display='none';"></video>
          <div id="cgVideoFallback" class="cg-video-fallback" style="display:none;">
            <i class="fa-solid fa-video-slash"></i>
            <p><b>영상(start.mp4)</b>을 불러오지 못했습니다.</p>
            <span>GitHub 저장소에 <b>start.mp4</b> 파일이 업로드되었는지 확인해 주세요.</span>
          </div>
          <div id="cgCountBox" class="cg-count-box" title="3초간 꾹 누르면 위치를 옮길 수 있습니다 (모든 과정 공통)">
            <div class="cg-count-label">현재 입교등록</div>
            <div class="cg-count-num"><b id="cgCountNum">0</b><span class="cg-count-unit">명</span></div>
          </div>
          <div id="cgVolWrap" class="cg-vol-wrap" title="클릭: 음량 조절  ·  3초 꾹: 지금 음량을 모든 과정 초기값으로 저장">
            <button id="cgVolBtn" class="cg-vol-btn" type="button"><i id="cgVolIco" class="fa-solid fa-volume-low"></i></button>
            <input id="cgVolSlider" class="cg-vol-slider" type="range" min="0" max="100" value="20"
                   oninput="try{guideMgr._setChannelVolume(this.value/100);}catch(e){}">
          </div>
        </div>`;
    },

    _hasProfile: function() { const s = guideMgr._slot(); return !!(s && s.profile); },
    _hasQR: function() { return false; },
    _hasManual: function() { return false; },
    _qrPageNum: function() { return -1; },
    _manualPageNum: function() { return -1; },
    _COURSEINFO_AFTER_PDF: 12,   // PDF 12페이지와 13페이지 사이에 '교육과정 안내' 삽입
    // [가상 페이지 구성] PDF 원본 + 삽입 페이지(담임교수 프로필 / 교육과정 안내)를 하나의 순서로 구성
    // 삽입 페이지 기본 위치(해당 PDF 페이지 '뒤'에 삽입). 강사가 설정에서 변경 가능 (settings/guidePagePos)
    _defaultPagePos: { profile: 1, kakaoqr: 1, channelguide: 1, courseinfo: 12 },
    _pagePos: function() {
        const s = guideMgr._slot();
        const saved = (s && s.pagePos) || {};
        const d = guideMgr._defaultPagePos;
        const prof = Number(saved.profile) || d.profile;
        return {
            profile: prof,
            kakaoqr: prof,          // 오픈톡방 QR·채널안내는 프로필 바로 뒤를 따라감(같은 위치)
            channelguide: prof,
            courseinfo: Number(saved.courseinfo) || d.courseinfo
        };
    },
    // 오픈톡방 QR / 채널 입교등록 안내 표시 여부 (체크 해제 시 숨김). 기본 ON
    _pageEnable: function() {
        const s = guideMgr._slot();
        const e = (s && s.pageEnable) || {};
        return { kakaoqr: e.kakaoqr !== false, channelguide: e.channelguide !== false, centernotice: e.centernotice !== false };
    },
    // 교육장소(14p 등) 교육동 4칸 정의. filter = setup-room-select에서 그 건물 강의실 걸러낼 키워드
    _venueCells: [
        { label: '하늘관', filter: '하늘관' },
        { label: '글로벌교육동', filter: '국제동' },
        { label: '관제교육동', filter: '관제교육동' }
    ],
    _venuePage: function() { const s = guideMgr._slot(); return (s && s.venuePage) || 14; },
    _venueOptions: function(filter) {
        const sel = document.getElementById('setup-room-select'); const out = [];
        if (!sel || !filter) return out;
        // value가 아니라 표시명(text) 기준 — 국제동 2층 ILS/VCCS/VOR 실습실이 value는 겹쳐도 이름으로 구분되게
        [].forEach.call(sel.options, function(o) {
            var t = (o.text || o.textContent || '').trim();
            if (t && o.value !== 'direct' && t.indexOf(filter) >= 0 && out.indexOf(t) < 0) out.push(t);
        });
        return out;
    },
    // 배지용 짧은 표기: '하늘관 2층 F강의실' → 'F 강의실', '관제교육동 1층' → '1층'
    // 배지 표기: { main, sub }. 실습실은 main='실습실', sub=시설명(ILS 등)
    _venueShort: function(v) {
        v = String(v || '').trim(); if (!v) return { main: '', sub: '' };
        var fm = v.match(/(\d+)\s*층/); var floor = fm ? (fm[1] + '층') : '';   // 층 추출 → 표기에 포함
        if (/실습실\s*$/.test(v)) {
            var body = v.replace(/실습실\s*$/, '').trim();                 // '국제동 2층 ILS'
            var facil = body.replace(/^\S+\s*/, '').replace(/^\d+\s*층\s*/, '').trim(); // 'ILS'
            return { main: (floor ? floor + ' 실습실' : '실습실'), sub: facil };
        }
        var m = v.match(/([A-Za-z0-9]+)\s*강의실/); if (m) return { main: (floor ? floor + ' ' + m[1] + '강의실' : m[1] + ' 강의실'), sub: '' };
        var p = v.split(/\s+/); return { main: (floor ? floor + ' ' + p[p.length - 1] : p[p.length - 1]), sub: '' };
    },
    _pageList: function() {
        const s = guideMgr._slot();
        const n = (s && s.pdfDoc) ? s.pdfDoc.numPages : 0;
        const list = [];
        if (!n) return list;
        const en = guideMgr._pageEnable();
        // [온라인 운영부공지] 온라인 과정은 운영부(입교안내) 공지 페이지를 기본 숨김. 과정별 토글(centerNoticeOnline)이 켜지면 표시.
        const _showCN = guideMgr._hasCenterNotice() && en.centernotice && (!guideMgr._isOnline() || guideMgr._slot().centerNoticeOnline === true);
        const want = { profile: guideMgr._hasProfile(), kakaoqr: guideMgr._hasKakaoQR() && en.kakaoqr, channelguide: guideMgr._hasKakaoQR() && en.channelguide, courseinfo: !guideMgr._isOnline(), centernotice: _showCN };   // [J12] 비대면은 PDF 4p 교육개요 오버레이가 대체
        const pos = guideMgr._pagePos();
        pos.centernotice = 23;   // 센터 공지는 PDF 23p(학생장 역할) 뒤 고정
        const clamp = v => Math.max(1, Math.min(n, Number(v) || 1));
        // 같은 페이지에 여러 개가 들어갈 때의 순서
        const order = ['profile', 'kakaoqr', 'channelguide', 'courseinfo', 'centernotice'];
        const byPage = {};
        order.forEach(t => { if (!want[t]) return; const pg = clamp(pos[t]); (byPage[pg] = byPage[pg] || []).push(t); });
        for (let p = 1; p <= n; p++) {
            list.push({ t: 'pdf', pdf: p });
            (byPage[p] || []).forEach(t => list.push({ t: t }));
        }
        return list;
    },
    _extras: function() { const s = guideMgr._slot(); const n = (s && s.pdfDoc) ? s.pdfDoc.numPages : 0; return Math.max(0, guideMgr._pageList().length - n); },
    _vtotal: function() { const s = guideMgr._slot(); if (!s.pdfDoc) return 0; return guideMgr._pageList().length; },
    _hasKakaoQR: function() { const s = guideMgr._slot(); return !!(s && s.kakaoLink); },
    _isProfilePage: function(v) { return (guideMgr._pageList()[v - 1] || {}).t === 'profile'; },
    _isCourseInfoPage: function(v) { return (guideMgr._pageList()[v - 1] || {}).t === 'courseinfo'; },
    _hasCenterNotice: function() { const s = guideMgr._slot(); return !!(s && s.centerNotice && String(s.centerNotice).trim()); },
    _isCenterNoticePage: function(v) { return (guideMgr._pageList()[v - 1] || {}).t === 'centernotice'; },
    _isKakaoQRPage: function(v) { return (guideMgr._pageList()[v - 1] || {}).t === 'kakaoqr'; },
    _isChannelGuidePage: function(v) { return (guideMgr._pageList()[v - 1] || {}).t === 'channelguide'; },
    _isQRPage: function(v) { return false; },
    _isManualPage: function(v) { return false; },
    _toPdfPage: function(v) {
        const d = guideMgr._pageList()[v - 1];
        return (d && d.t === 'pdf') ? d.pdf : null;   // 가상→실제 PDF 페이지 (삽입 페이지는 null)
    },
    _profileHTML: function(p) {
        p = p || {};
        const esc = s => (s == null ? '' : String(s)).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
        const name = esc(p._name || '');
        const eng = p.engName ? `<span style="font-size:18px;color:#94a3b8;font-weight:600;margin-left:8px;">(${esc(p.engName)})</span>` : '';
        const photoCss = p.photo
            ? `background:#e8eef6 url('${String(p.photo).replace(/'/g, "%27")}') center/cover no-repeat;`
            : `background:#e8eef6;`;
        const photoInner = p.photo ? '' : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:90px;color:#9fb4d0;"><i class="fa-solid fa-user-tie"></i></div>`;
        const contacts = [];
        if (p.phone) contacts.push(`<span style="display:inline-flex;align-items:center;gap:7px;"><i class="fa-solid fa-phone" style="color:#1e3a8a;"></i> ${esc(p.phone)}</span>`);
        if (p.email) contacts.push(`<span style="display:inline-flex;align-items:center;gap:7px;"><i class="fa-solid fa-envelope" style="color:#1e3a8a;"></i> ${esc(p.email)}</span>`);
        const contactHtml = contacts.length ? `<div class="guide-profile-contact-lines">${contacts.join('')}</div>` : '';
        const quote = p.msg ? `<div class="guide-profile-quote">"${esc(p.msg)}"</div>` : '';
        let bio = (Array.isArray(p.bioList) ? p.bioList : []).filter(r => r && (r.year || r.text));
        if (!bio.length && p.bio) {
            bio = String(p.bio).split(/\r?\n/).map(line => {
                line = line.trim(); if (!line) return null;
                const m = line.match(/^([0-9][0-9.\-~\s]*[0-9]|[0-9]{4})\s+(.*)$/);
                return m ? { year: m[1], text: m[2] } : { year: '', text: line };
            }).filter(Boolean);
        }
        const bioRows = bio.map(r => `<div class="guide-profile-bio-row">
            <span class="guide-profile-year">${esc(r.year || '·')}</span>
            <span class="guide-profile-bio-text">${esc(r.text || '')}</span>
        </div>`).join('');
        const bioHtml = bio.length ? `<div class="guide-profile-bio">
            <div class="guide-profile-bio-title"><i class="fa-solid fa-user-graduate"></i> 주요 약력 및 경력사항</div>
            <div class="guide-profile-bio-list">${bioRows}</div>
        </div>` : '';
        return `<div class="guide-profile-slide">
            <div class="guide-profile-photo" style="${photoCss}">${photoInner}</div>
            <div class="guide-profile-panel">
              <div class="guide-profile-copy">
                <div><span class="guide-profile-role">과정 담임</span></div>
                <div class="guide-profile-namerow">
                  <div class="guide-profile-name">교수 <strong>${name}</strong>${eng}</div>
                  ${contactHtml}
                </div>
                <div class="guide-profile-rule"></div>
                ${quote}
                ${bioHtml}
              </div>
            </div>
        </div>`;
    },

    // QR 안내 가상 페이지 HTML (좌: 안내글 / 우: 큰 QR)
    _qrHTML: function(room, courseNm) {
        const esc = s => (s == null ? '' : String(s)).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
        const course = esc(courseNm && courseNm !== '과정명을 설정해주세요.' ? courseNm : '');
        return `<div style="display:flex;align-items:stretch;background:linear-gradient(135deg,#003366 0%,#0055aa 100%);border-radius:20px;overflow:hidden;min-height:470px;box-shadow:0 18px 44px rgba(15,23,42,.18);color:#fff;">
            <div style="flex:1;min-width:0;padding:48px 46px;display:flex;flex-direction:column;justify-content:center;">
                <div style="font-size:13px;font-weight:800;letter-spacing:.18em;color:#9fc4ff;">COURSE ENTRY</div>
                <div style="font-size:32px;font-weight:900;line-height:1.2;margin-top:14px;white-space:nowrap;">교육 과정 입장 안내</div>
                ${course ? `<div style="font-size:21px;font-weight:800;margin-top:12px;color:#dbeafe;word-break:keep-all;">${course}</div>` : ''}
                <div style="font-size:16px;font-weight:600;margin-top:30px;color:#cbd5e1;line-height:1.6;">휴대폰 카메라로 오른쪽 QR을 스캔하면<br>교육 과정에 바로 입장합니다</div>
                <div style="margin-top:30px;font-size:16px;font-weight:800;color:#9fc4ff;"><i class="fa-solid fa-door-open"></i> Room #${esc(room)}</div>
                <div style="margin-top:24px;display:inline-flex;flex-direction:column;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.18);border-radius:16px;padding:14px 24px;align-self:flex-start;">
                    <div style="display:flex;align-items:flex-end;gap:8px;">
                        <span style="width:58px;text-align:center;font-size:12px;font-weight:800;color:#9fc4ff;letter-spacing:.03em;">입교 (QR)</span>
                        <span style="width:22px;"></span>
                        <span style="width:58px;text-align:center;font-size:12px;font-weight:800;color:#9fc4ff;letter-spacing:.03em;">예정</span>
                        <span style="width:26px;"></span>
                    </div>
                    <div style="display:flex;align-items:baseline;gap:8px;margin-top:6px;">
                        <span id="guideQrEntered" style="width:58px;text-align:center;font-size:44px;font-weight:900;color:#fde047;line-height:1;">0</span>
                        <span style="width:22px;text-align:center;font-size:30px;font-weight:800;color:#9fc4ff;">/</span>
                        <span id="guideQrTotal" style="width:58px;text-align:center;font-size:44px;font-weight:900;color:#fff;line-height:1;">0</span>
                        <span style="width:26px;text-align:left;font-size:16px;font-weight:700;color:#cbd5e1;">명</span>
                    </div>
                </div>
            </div>
            <div style="flex:0 0 48%;background:rgba(255,255,255,0.08);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;gap:14px;">
                <div style="font-size:14px;font-weight:700;color:#dbeafe;">휴대폰으로 스캔 → 바로 입장</div>
                <div id="guideQrBig" style="background:#fff;padding:22px;border-radius:20px;box-shadow:0 12px 30px rgba(0,0,0,.28);line-height:0;"></div>
            </div>
        </div>`;
    },
    // 앱 사용법(매뉴얼) 가상 페이지 HTML
    _manualHTML: function() {
        const card = (bg, fg, icon, t, d) => `<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:26px 26px;">
            <div style="width:50px;height:50px;border-radius:13px;background:${bg};color:${fg};display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:16px;"><i class="fa-solid ${icon}"></i></div>
            <div style="font-size:19px;font-weight:900;color:#0f172a;line-height:1.4;">${t}</div>
            <div style="font-size:15px;color:#475569;margin-top:12px;line-height:1.85;">${d}</div>
        </div>`;
        return `<div style="background:#fff;border-radius:20px;box-shadow:0 18px 44px rgba(15,23,42,.12);padding:40px 44px;min-height:440px;">
            <div style="font-size:13px;font-weight:800;letter-spacing:.16em;color:#2563eb;margin-bottom:10px;">STUDENT PLATFORM GUIDE</div>
            <div style="font-size:28px;font-weight:900;color:#0f172a;line-height:1.35;"><i class="fa-solid fa-mobile-screen-button" style="color:#2563eb;"></i> 교육생 플랫폼 사용법</div>
            <div style="font-size:15px;color:#64748b;margin-top:12px;margin-bottom:28px;line-height:1.7;">QR로 입장한 뒤 교육생이 사용하는 핵심 기능입니다.</div>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:20px;">
                ${card('#FAE100','#3A1D1D','fa-comment','오픈톡방 이동','메인 화면의 말풍선 아이콘을 누르면 과정 오픈톡방으로 이동합니다.')}
                ${card('#3b82f6','#fff','fa-person-walking-arrow-right','외출·외박 신청','외출/외박이 필요할 때 신청 메뉴에서 날짜·시간·사유를 입력합니다.')}
                ${card('#10b981','#fff','fa-bus','퇴교차량 신청','퇴교 차량 수요조사에서 이용할 차량·터미널 이동 여부를 선택합니다.')}
                ${card('#7c3aed','#fff','fa-comments','Q&A 사용','수업 중 질문은 Q&A 메뉴에 입력하면 강사가 확인 후 답변합니다.')}
            </div>
            <div style="margin-top:24px;background:#0f172a;color:#fff;border-radius:12px;padding:16px 20px;font-size:14px;font-weight:700;line-height:1.6;"><i class="fa-solid fa-circle-info"></i> 교육생은 QR 접속 후 이름·사번을 입력하면 해당 과정 플랫폼으로 들어갑니다.</div>
        </div>`;
    },

    // 2. 가이드 업로드 — 정식 버전 출시 전까지 업로드 제한
    uploadGuide: function() {
        ui.showAlert(
            "🚫 정식 버전 출시 전까지 업로드가 제한됩니다.\n\n" +
            "입교안내 PDF를 교체하려면 운영부에 문의해 주세요."
        );
    },

    // 3. PDF 로드 — GitHub raw URL에서 직접 fetch
    loadPDF: async function(url) {
        if (typeof pdfjsLib === 'undefined') {
            console.error("PDF.js 라이브러리가 로드되지 않았습니다.");
            const badge = document.getElementById('guideStatusBadge');
            if (badge) { badge.innerText = "❌ PDF 라이브러리 오류"; badge.style.color = "#ef4444"; }
            return;
        }
        // 로드 시작 시점의 방을 고정 (비동기 완료 전 방이 바뀌어도 안전)
        const targetRoom = guideMgr._room();
        const badge = document.getElementById('guideStatusBadge');
        if (badge) { badge.innerText = "⏳ 불러오는 중..."; badge.style.color = "#f59e0b"; }
        guideMgr.isRendering = false;
        try {
            const _fb = /비대면/.test(String(url || '')) ? guideMgr.GUIDE_PDF_ONLINE_FALLBACK_URL : guideMgr.GUIDE_PDF_FALLBACK_URL;   // [J12]
            const candidates = [url, _fb]
                .filter((candidate, index, list) => candidate && list.indexOf(candidate) === index);
            let pdfDoc = null;
            let lastError = null;
            for (const candidate of candidates) {
                try {
                    const loadingTask = pdfjsLib.getDocument({ url: candidate, withCredentials: false });
                    pdfDoc = await loadingTask.promise;
                    break;
                } catch (candidateError) {
                    lastError = candidateError;
                    console.warn('입교안내 PDF 경로 재시도:', candidate, candidateError);
                }
            }
            if (!pdfDoc) throw lastError || new Error('입교안내 PDF를 불러오지 못했습니다.');
            // 로드 완료 후 해당 방 슬롯에만 저장
            if (!guideMgr._roomCache[targetRoom]) {
                guideMgr._roomCache[targetRoom] = { pdfDoc: null, pageNum: 1 };
            }
            guideMgr._roomCache[targetRoom].pdfDoc = pdfDoc;
            guideMgr._roomCache[targetRoom].pdfUrl = url;   // [J12] 어떤 변형(대면/비대면)이 로드됐는지 기록
            guideMgr._roomCache[targetRoom].pageNum = 1;
            if (badge) { badge.innerText = "✅ 가이드 로드 완료"; badge.style.color = "#10b981"; }
            // 로드 완료 시점에도 같은 방이면 렌더링
            if (guideMgr._room() === targetRoom) {
                guideMgr.renderPage(1);
            }
        } catch (err) {
            console.error("PDF 로딩 실패:", err);
            guideMgr.isRendering = false;
            if (badge) { badge.innerText = "❌ PDF 로드 실패 (운영부 문의)"; badge.style.color = "#ef4444"; }
        }
    },

    // 4. 화면 렌더링
    renderPage: async function(num) {
        const slot = guideMgr._slot();
        if (!slot.pdfDoc) return;
        guideMgr._lastRenderedRoom = guideMgr._room();   // [J12.3] 화면에 그려지는 방 기록

        const _total = guideMgr._vtotal();
        if (num < 1) num = 1;
        if (num > _total) num = _total;

        const _canvasEl = document.getElementById('guideCanvas');
        const _profEl = document.getElementById('guideProfile');
        const _wrapEl = document.getElementById('pdfWrapper');
        const _showGuideLayer = function(kind) {
            if (_wrapEl) {
                _wrapEl.classList.remove('guide-page-pdf', 'guide-page-virtual');
                _wrapEl.classList.add(kind === 'pdf' ? 'guide-page-pdf' : 'guide-page-virtual');
            }
            if (_canvasEl) _canvasEl.style.setProperty('display', kind === 'pdf' ? 'block' : 'none', 'important');
            if (_profEl) _profEl.style.setProperty('display', kind === 'virtual' ? 'block' : 'none', 'important');
            var _rBtn = document.getElementById('guideRouletteBtn');   // 학생장 룰렛 버튼은 PDF 23p에서만 (아래 분기에서 다시 노출)
            if (_rBtn) _rBtn.style.display = 'none';
            var _sBtn = document.getElementById('guideScheduleBtn');   // 교육시간표 버튼은 PDF 13p에서만
            if (_sBtn) _sBtn.style.display = 'none';
            var _uBtn = document.getElementById('guideScheduleUploadBtn');   // 시간표 QR 업로드 버튼도 PDF 13p에서만
            if (_uBtn) _uBtn.style.display = 'none';
            var _pBtn = document.getElementById('guideParsedScheduleBtn');   // [J11] 판독 시간표 보기 버튼도 13p에서만
            if (_pBtn) _pBtn.style.display = 'none';
            try { var _psh = document.getElementById('parsedScheduleSheet'); if (_psh && _psh.classList.contains('pss-open')) ui.closeParsedSchedule(); } catch (e) {}
            var _vOv = document.getElementById('guideVenueOverlay');   // 교육장소 오버레이는 해당 PDF p에서만
            if (_vOv) _vOv.style.display = 'none';
            var _oOv = document.getElementById('guideOverviewOverlay'); // [J12] 교육개요 오버레이도 해당 p에서만
            if (_oOv) _oOv.style.display = 'none';
        };

        // 이전 QR 실시간 명단 리스너 해제 (페이지 이동 시)
        if (guideMgr._qrStuRef) { try { guideMgr._qrStuRef.off(); } catch(e){} guideMgr._qrStuRef = null; }

        // 채널 안내 영상(start.mp4)이 재생 중이면 페이지 이동 시 정지 (다른 페이지로 소리 이어짐 방지)
        try { var _prevV = document.getElementById('cgVideo'); if (_prevV) { _prevV.pause(); } } catch(e){}
        try { guideMgr._stopChannelAudio(); } catch(e){}
        // 교육과정 안내 '교육 인원' 실시간 리스너 해제 (페이지 이동 시)
        try { if (ui._ciRegRef) { ui._ciRegRef.off(); ui._ciRegRef = null; } } catch(e){}

        // 담임 교수 프로필 (가상 2페이지)
        if (guideMgr._isProfilePage(num)) {
            guideMgr.isRendering = false;
            _showGuideLayer('virtual');
            if (_profEl) { _profEl.innerHTML = guideMgr._profileHTML(slot.profile); }
            slot.pageNum = num;
            const _ind = document.getElementById('guidePageInfo');
            if (_ind) _ind.innerText = `${num} / ${_total}`;
            return;
        }

        // 교육과정 안내 (가상 페이지 · PDF 12·13 사이)
        if (guideMgr._isCourseInfoPage(num)) {
            guideMgr.isRendering = false;
            _showGuideLayer('virtual');
            if (_profEl) { _profEl.innerHTML = guideMgr._courseInfoHTML(); }
            // 교육 인원 실시간 반영 (학생 입교 시 새로고침 없이 즉시 갱신)
            try { if (ui._ciRegRef) { ui._ciRegRef.off(); ui._ciRegRef = null; } } catch (e) {}
            try {
                ui._ciRegRef = firebase.database().ref('courses/' + guideMgr._room() + '/students');
                ui._ciRegRef.on('value', function (s) {
                    const _stu = s.val() || {};
                    const _cnt = new Set(Object.values(_stu).filter(x => x && x.name && x.name !== 'undefined').map(x => String(x.name).trim())).size;
                    const _el = document.getElementById('ciCount'); if (_el) _el.textContent = _cnt;
                    // 슬롯 캐시도 동기화(다시 그릴 때 정확한 값 사용)
                    try { if (guideMgr._slot().courseInfo) guideMgr._slot().courseInfo.count = _cnt; } catch (e) {}
                });
            } catch (e) {}
            slot.pageNum = num;
            const _indci = document.getElementById('guidePageInfo');
            if (_indci) _indci.innerText = `${num} / ${_total}`;
            return;
        }

        // 센터 공지 안내 (가상 페이지 · PDF 23p 뒤)
        if (guideMgr._isCenterNoticePage(num)) {
            guideMgr.isRendering = false;
            _showGuideLayer('virtual');
            if (_profEl) { _profEl.innerHTML = guideMgr._centerNoticeHTML(); }
            slot.pageNum = num;
            const _indcn = document.getElementById('guidePageInfo');
            if (_indcn) _indcn.innerText = `${num} / ${_total}`;
            return;
        }

        // 담임 교수 오픈톡방 QR (가상 페이지 · 프로필 다음)
        if (guideMgr._isKakaoQRPage(num)) {
            guideMgr.isRendering = false;
            _showGuideLayer('virtual');
            if (_profEl) {
                _profEl.innerHTML = guideMgr._kakaoQrHTML();
                try {
                    const tgt = document.getElementById('guideKakaoQrBig');
                    const url = (guideMgr._slot().kakaoLink) || '';
                    if (tgt && url && typeof QRCode !== 'undefined') {
                        tgt.innerHTML = '';
                        new QRCode(tgt, { text: url, width: 420, height: 420, correctLevel: QRCode.CorrectLevel.H });
                    }
                } catch (e) { console.warn('오픈톡방 QR 생성 실패:', e); }
            }
            slot.pageNum = num;
            const _indk = document.getElementById('guidePageInfo');
            if (_indk) _indk.innerText = `${num} / ${_total}`;
            return;
        }

        // QR 안내 (가상 페이지)
        if (guideMgr._isQRPage(num)) {
            guideMgr.isRendering = false;
            _showGuideLayer('virtual');
            if (_profEl) {
                const room = guideMgr._room();
                const path = window.location.pathname;
                const directory = path.substring(0, path.lastIndexOf('/'));
                const baseUrl = window.location.origin + directory + '/';
                const url = baseUrl + 'index.html?room=' + room;
                let courseNm = '';
                try { courseNm = (document.getElementById('dashCourseTitle') || {}).innerText || ''; } catch (e) {}
                _profEl.innerHTML = guideMgr._qrHTML(room, courseNm);
                try {
                    const tgt = document.getElementById('guideQrBig');
                    if (tgt && typeof QRCode !== 'undefined') {
                        tgt.innerHTML = '';
                        new QRCode(tgt, { text: url, width: 300, height: 300, correctLevel: QRCode.CorrectLevel.H });
                    }
                } catch (e) { console.warn('QR 생성 실패:', e); }
                // 실시간 입교 인원 카운터 (입교 / 예정)
                (async function(){
                    let names = [];
                    try { names = await ui._gatherRosterNames(room); } catch(e){}
                    const tEl = document.getElementById('guideQrTotal'); if (tEl) tEl.innerText = names.length;
                    if (guideMgr._qrStuRef) { try { guideMgr._qrStuRef.off(); } catch(e){} }
                    guideMgr._qrStuRef = firebase.database().ref('courses/'+room+'/students');
                    guideMgr._qrStuRef.on('value', function(s){
                        const stu = s.val() || {};
                        const cnt = new Set(Object.values(stu).filter(x=>x&&x.name&&x.name!=='undefined').map(x=>String(x.name).trim())).size;
                        const eEl = document.getElementById('guideQrEntered'); if (eEl) eEl.innerText = cnt;
                    });
                })();
            }
            slot.pageNum = num;
            const _ind2 = document.getElementById('guidePageInfo');
            if (_ind2) _ind2.innerText = `${num} / ${_total}`;
            return;
        }

        // 앱 사용법 (가상 페이지)
        if (guideMgr._isManualPage(num)) {
            guideMgr.isRendering = false;
            _showGuideLayer('virtual');
            if (_profEl) { _profEl.innerHTML = guideMgr._manualHTML(); }
            slot.pageNum = num;
            const _indM = document.getElementById('guidePageInfo');
            if (_indM) _indM.innerText = `${num} / ${_total}`;
            return;
        }

        // 카카오 채널 입교/출결 등록방법 안내 (가상 페이지 · 오픈톡방 QR 다음) → start.mp4 영상 상영
        if (guideMgr._isChannelGuidePage(num)) {
            guideMgr.isRendering = false;
            _showGuideLayer('virtual');
            if (_profEl) { _profEl.innerHTML = guideMgr._channelGuideHTML(); }
            // [입교등록 실시간 카운트] 좌측 큰 숫자 — 학생 입교 시 새로고침 없이 즉시 갱신
            try { if (ui._cgRegRef) { ui._cgRegRef.off(); ui._cgRegRef = null; } } catch (e) {}
            ui._cgPrevNames = null;   // 페이지 진입 시점 인원은 애니메이션 대상에서 제외(첫 스냅샷으로 기준만 설정)
            try {
                ui._cgRegRef = firebase.database().ref('courses/' + guideMgr._room() + '/students');
                ui._cgRegRef.on('value', function (s) {
                    const _stu = s.val() || {};
                    const _names = Object.values(_stu).filter(x => x && x.name && x.name !== 'undefined').map(x => String(x.name).trim());
                    const _set = new Set(_names);
                    const _el = document.getElementById('cgCountNum'); if (_el) _el.textContent = _set.size;
                    // 신규 입교자 감지 → "○○○ 입교 완료!" 연기 효과
                    if (ui._cgPrevNames === null) {
                        ui._cgPrevNames = _set;   // 첫 스냅샷: 기준만 저장(효과 없음)
                    } else {
                        _set.forEach(function (nm) {
                            if (!ui._cgPrevNames.has(nm)) { try { if (ui._spawnEnrollFx) ui._spawnEnrollFx(nm); } catch (e) {} }
                        });
                        ui._cgPrevNames = _set;
                    }
                });
            } catch (e) {}
            // 카운트 블록 위치(모든 과정 공통 · 윈도우/전체화면 좌표 개별) 적용 + 3초 롱프레스 드래그 연결
            try { if (ui._applyVideoCountPos) ui._applyVideoCountPos(); } catch (e) {}
            try {
                const _cb = document.getElementById('cgCountBox');
                if (_cb && ui._bindVideoCountDrag) ui._bindVideoCountDrag(_cb);
            } catch (e) {}
            // [음량] 저장된 초기 음량 로드 → 슬라이더/아이콘 반영 + 3초 롱프레스 저장 바인딩
            try { if (ui._initChannelVolUI) ui._initChannelVolUI(); } catch (e) {}
            // 페이지 진입 시 영상 자동 재생 시도(내비게이션 클릭이 사용자 제스처로 인정되어 대부분 재생됨).
            // 차단되면 controls로 직접 재생 가능.
            try {
                const _v = document.getElementById('cgVideo');
                if (_v) {
                    _v.currentTime = 0;
                    const _p = _v.play();
                    if (_p && _p.catch) { _p.catch(function () { try { _v.muted = true; _v.play(); } catch (e) {} }); }
                }
            } catch (e) {}
            // [배경음] start.mp3(별도 6분 노래)를 영상과 함께 반복 재생
            try { guideMgr._playChannelAudio(); } catch (e) {}
            slot.pageNum = num;
            const _indcg = document.getElementById('guidePageInfo');
            if (_indcg) _indcg.innerText = `${num} / ${_total}`;
            return;
        }

        // [잔상 방지] 이전에는 여기서 곧바로 PDF 레이어로 전환해, 새 페이지 렌더가 끝나기 전까지
        // 직전 PDF 페이지(또는 영상 다음 순간의 옛 페이지)가 잠깐 보였다.
        // → 화면 전환·버튼 표시를 새 페이지 렌더 완료 후로 미룬다.
        const _revealPdfLayer = function() {
            _showGuideLayer('pdf');
            // [학생장 룰렛] PDF 23페이지(학생장 선출)에서만 룰렛 버튼 노출
            var _rBtn = document.getElementById('guideRouletteBtn');
            if (_rBtn) _rBtn.style.display = (guideMgr._toPdfPage(num) === 23) ? 'inline-flex' : 'none';
            // [교육 시간표/J11] PDF 13페이지: 판독 grid → 녹색 '교육시간표 보기', 없으면 사진 보기/QR 업로드 (통합 토글)
            guideMgr._slot().pageNum = num;
            try { guideMgr._refreshScheduleBtns(); } catch (e) {}
            // [교육 장소] 교육장소 페이지(기본 14p)에서 교육동별 강의실 ✓ 오버레이 노출
            var _vOv = document.getElementById('guideVenueOverlay');
            if (_vOv) {
                if (guideMgr._toPdfPage(num) === guideMgr._venuePage()) { _vOv.style.display = 'block'; if (ui.renderVenueOverlay) ui.renderVenueOverlay(); }
                else _vOv.style.display = 'none';
            }
            // [J12 교육개요] 비대면 PDF 4p: 과정명·인원·기간·구분·평가·회의 ID/PW 오버레이 (항목별 3초 드래그 이동)
            var _oOv = document.getElementById('guideOverviewOverlay');
            if (_oOv) {
                if (guideMgr._isOnline() && guideMgr._toPdfPage(num) === guideMgr._overviewPage()) { _oOv.style.display = 'block'; if (ui.renderOverviewOverlay) ui.renderOverviewOverlay(); }
                else _oOv.style.display = 'none';
            }
        };
        if (guideMgr.isRendering) return;
        guideMgr.isRendering = true;

        try {
            const page = await slot.pdfDoc.getPage(guideMgr._toPdfPage(num));
            const canvas = document.getElementById('guideCanvas');
            if (!canvas) { guideMgr.isRendering = false; return; }

            // 스케일 계산
            const unscaledViewport = page.getViewport({scale: 1.0});
            const wrapper = document.getElementById('pdfWrapper');
            const fullscreenTarget = document.fullscreenElement || document.webkitFullscreenElement;
            const isGuideFullscreen = fullscreenTarget === wrapper;
            const rect = wrapper ? wrapper.getBoundingClientRect() : null;
            const availableW = Math.max(1, isGuideFullscreen ? (rect.width || window.innerWidth) : ((rect && rect.width) || window.innerWidth) - 2);
            const availableH = Math.max(1, isGuideFullscreen ? (rect.height || window.innerHeight) : window.innerHeight);
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            // 일반 화면은 가로 맞춤, 전체화면은 화면을 빈틈없이 덮는 cover 방식이다.
            // PDF 비율과 모니터 비율이 다르면 가장자리만 최소한으로 잘리고 검은 여백은 생기지 않는다.
            let cssScale = availableW / unscaledViewport.width;
            if (isGuideFullscreen) {
                cssScale = Math.max(
                    availableW / unscaledViewport.width,
                    availableH / unscaledViewport.height
                );
            }
            const cssWidth = Math.ceil(unscaledViewport.width * cssScale);
            const cssHeight = Math.ceil(unscaledViewport.height * cssScale);
            const renderScale = cssScale * dpr;
            const viewport = page.getViewport({scale: renderScale});

            // 오프스크린 캔버스에 먼저 렌더링 (번쩍임 방지)
            const offscreen = document.createElement('canvas');
            offscreen.width  = viewport.width;
            offscreen.height = viewport.height;
            const offCtx = offscreen.getContext('2d');
            offCtx.setTransform(1, 0, 0, 1, 0, 0);

            const renderTask = page.render({canvasContext: offCtx, viewport: viewport});
            await renderTask.promise;

            // 렌더링 완료 후 한 번에 교체 (깜빡임 없음)
            canvas.width  = viewport.width;
            canvas.height = viewport.height;
            canvas.style.setProperty('--guide-render-width', cssWidth + 'px');
            canvas.style.setProperty('--guide-render-height', cssHeight + 'px');
            canvas.style.width  = cssWidth + 'px';
            canvas.style.height = cssHeight + 'px';
            const ctx = canvas.getContext('2d');
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.drawImage(offscreen, 0, 0);

            // 새 페이지 렌더가 끝난 지금 화면을 PDF로 전환 → 직전 페이지 잔상 없이 곧바로 새 페이지가 보인다.
            _revealPdfLayer();

            guideMgr.isRendering = false;
            // 렌더링 완료 후 현재 방 슬롯에 페이지 번호 저장
            guideMgr._slot().pageNum = num;

            const indicator = document.getElementById('guidePageInfo');
            if (indicator) indicator.innerText = `${num} / ${guideMgr._vtotal()}`;

        } catch (err) {
            if (err && err.name !== 'RenderingCancelledException') {
                console.error("PDF 렌더링 오류:", err);
            }
            guideMgr.isRendering = false;
        }
    },

    // 5. 페이지 이동
    changePage: function(offset) {
        const slot = guideMgr._slot();
        if (!slot.pdfDoc || guideMgr.isRendering) return;
        const newPage = (slot.pageNum || 1) + offset;
        if (newPage > 0 && newPage <= guideMgr._vtotal()) {
            guideMgr.renderPage(newPage);
        }
    },

    // 첫 페이지로 이동
    goFirst: function() {
        const slot = guideMgr._slot();
        if (!slot.pdfDoc || guideMgr.isRendering) return;
        guideMgr.renderPage(1);
    },

    // 6. PDF 영역만 전체화면
    toggleFullScreen: function() {
        const wrapper = document.getElementById('pdfWrapper');
        if (!wrapper) return;
        if (document.fullscreenElement !== wrapper) {
            wrapper.requestFullscreen().catch(err => {
                console.warn("전체화면 실패:", err);
            });
        } else {
            document.exitFullscreen();
        }
    },

    // 퀴즈 수동 문항 추가 (텍스트 입력)
    addManualQuiz: function() {
        const text = prompt("문항 텍스트를 입력하세요:");
        if(!text) return;
        const opts = [];
        for(let i=1; i<=4; i++) {
            const o = prompt(`보기 ${i} 입력 (빈칸이면 완료):`);
            if(!o) break;
            opts.push(o);
        }
        if(opts.length < 2) return ui.showAlert("보기는 최소 2개 이상 입력해야 합니다.");
        const corr = parseInt(prompt("정답 번호 입력 (1~" + opts.length + "):"));
        if(isNaN(corr) || corr < 1 || corr > opts.length) return ui.showAlert("올바른 정답 번호를 입력하세요.");
        state.quizList.push({ text, options: opts, correct: corr, checked: true, isSurvey: false, isOX: false });
        this.renderMiniList();
        ui.showAlert("✅ 문항이 추가되었습니다.");
    },

    // 퀴즈 기록 리셋
    executeReset: function(type) {
        if(state.isObserver) return ui.showAlert("👁️ 옵저버는 리셋할 수 없습니다.");
        if(!state.room) return;
        if(!confirm(type === 'all' ? "전체 문항 기록을 초기화하시겠습니까?" : "현재 문항 기록만 초기화하시겠습니까?")) return;
        if(type === 'all') {
            firebase.database().ref(`courses/${state.room}/quizAnswers`).set(null)
                .then(() => ui.showAlert("✅ 전체 기록이 초기화되었습니다."));
        } else {
            const id = `Q${state.currentQuizIdx}`;
            firebase.database().ref(`courses/${state.room}/quizAnswers/${id}`).set(null)
                .then(() => ui.showAlert("✅ 현재 문항 기록이 초기화되었습니다."));
        }
    }
};




// --- 5. Print & Report (최종 보강 버전) ---
// [최종 고도화] 교육과정 종합 결과 보고서 생성 및 인쇄 매니저
const printMgr = {
    openInputModal: function() { 
        if(!state.room) return ui.showAlert("강의실을 먼저 선택해주세요.");
        const today = new Date();
        const dateIn = document.getElementById('printDateInput');
        const profIn = document.getElementById('printProfInput');
        const modal = document.getElementById('printInputModal');
        
        if(modal) {
            if(dateIn) dateIn.value = document.getElementById('dashPeriod')?.innerText || "";
            if(profIn) profIn.value = document.getElementById('dashProfNameOnly')?.innerText || ""; 
            modal.style.display = 'flex'; 
        }
    },
    
    confirmPrint: function() { 
        this.closeInputModal(); 
        const date = document.getElementById('printDateInput')?.value || "-";
        const prof = document.getElementById('printProfInput')?.value || "-";
        this.openPreview(date, prof); 
    },
    
    closeInputModal: function() { 
        document.getElementById('printInputModal').style.display = 'none'; 
    },
    







// [수정] 결재란이 삭제된 종합 결과 보고서 렌더링 로직
    openPreview: async function(date, prof) { 
        const cname = document.getElementById('dashCourseTitle')?.innerText || "과정명 미설정";
        const coord = document.getElementById('dashCoordName')?.innerText || "-";
        const roomLoc = document.getElementById('dashRoomDetail')?.innerText || "-";
        
        // --- [종합 데이터 집계] ---
        const arrivedCount = document.getElementById('dashArrivedCount')?.innerText || "0";
        const totalCount = document.getElementById('dashTotalCount')?.innerText || "0";
        const qaTotal = document.getElementById('dashQaCount')?.innerText || "0";
        const actionTotal = document.getElementById('dashActionCount')?.innerText || "0";
        const shuttleTotal = document.getElementById('dashShuttleTotal')?.innerText || "0";
        
        const previewModal = document.getElementById('printPreviewModal');

        // 1. Q&A 리스트 생성 (공감순 정렬)
        let qaHtml = "";
        const qaItems = Object.values(state.qaData || {}).filter(q => q.status !== 'delete');
        if (qaItems.length === 0) {
            qaHtml = "<tr><td colspan='3' style='text-align:center; padding:30px; color:#94a3b8;'>수집된 질문이 없습니다.</td></tr>";
        } else { 
            qaItems.sort((a, b) => (b.likes || 0) - (a.likes || 0)).forEach((item, idx) => { 
                qaHtml += `<tr><td style='text-align:center; border:1px solid #000; padding:8px;'>${idx + 1}</td><td style='text-align:left; border:1px solid #000; padding:8px;'>${item.text}</td><td style='text-align:center; border:1px solid #000; padding:8px;'>❤️ ${item.likes || 0}</td></tr>`; 
            }); 
        }

        // 2. 보고서 본문(HTML) 조립 - [결재란 삭제 버전]
        document.getElementById('official-document').innerHTML = `
            <div style="text-align:center; padding-top:20px; margin-bottom:50px;">
                <h2 style="font-size:35px; font-weight:900; margin:0; letter-spacing:2px;">교육과정 운영 결과 보고서</h2>
                <div style="width:100px; height:4px; background:#003366; margin:15px auto;"></div>
            </div>
            
            <h4 style="border-left:6px solid #003366; padding-left:12px; margin-bottom:15px; font-size:19px; color:#333;">1. 교육 개요</h4>
            <table style="width:100%; border-collapse:collapse; margin-bottom:40px; border:2px solid #000;">
                <tr style="height:45px;"><th style="width:150px; background:#f1f5f9; border:1px solid #000; text-align:center;">교 육 과 정 명</th><td colspan="3" style="padding-left:15px; border:1px solid #000; font-weight:bold; font-size:16px;">${cname}</td></tr>
                <tr style="height:45px;"><th style="background:#f1f5f9; border:1px solid #000; text-align:center;">교 육 기 간</th><td style="padding-left:15px; border:1px solid #000; width:35%;">${date}</td><th style="width:120px; background:#f1f5f9; border:1px solid #000; text-align:center;">강 의 장</th><td style="padding-left:15px; border:1px solid #000;">${roomLoc}</td></tr>
                <tr style="height:45px;"><th style="background:#f1f5f9; border:1px solid #000; text-align:center;">담 임 교 수</th><td style="padding-left:15px; border:1px solid #000;">${prof} 교수</td><th style="background:#f1f5f9; border:1px solid #000; text-align:center;">과 정 담 당</th><td style="padding-left:15px; border:1px solid #000;">${coord}</td></tr>
            </table>

            <h4 style="border-left:6px solid #003366; padding-left:12px; margin-bottom:15px; font-size:19px; color:#333;">2. 운영 및 참여 현황</h4>
            <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:15px; margin-bottom:40px; text-align:center;">
                <div style="padding:20px; border:1px solid #000; background:#fff;"><span style="font-size:13px; color:#64748b; font-weight:bold;">입교/접속</span><br><b style="font-size:22px; color:#003366;">${arrivedCount}</b> <small>/ ${totalCount}명</small></div>
                <div style="padding:20px; border:1px solid #000; background:#fff;"><span style="font-size:13px; color:#64748b; font-weight:bold;">학습질문 건수</span><br><b style="font-size:22px; color:#003366;">${qaTotal}</b> <small>건</small></div>
                <div style="padding:20px; border:1px solid #000; background:#fff;"><span style="font-size:13px; color:#64748b; font-weight:bold;">외출/외박 신청</span><br><b style="font-size:22px; color:#003366;">${actionTotal}</b> <small>건</small></div>
                <div style="padding:20px; border:1px solid #000; background:#fff;"><span style="font-size:13px; color:#64748b; font-weight:bold;">차량 지원 수요</span><br><b style="font-size:22px; color:#003366;">${shuttleTotal}</b> <small>건</small></div>
            </div>

            <h4 style="border-left:6px solid #003366; padding-left:12px; margin-bottom:15px; font-size:19px; color:#333;">3. 학습 소통 현황 (Q&A)</h4>
            <table style="width:100%; border-collapse:collapse; border:1px solid #000;">
                <thead style="background:#f1f5f9;">
                    <tr style="height:40px;">
                        <th style="width:60px; border:1px solid #000; text-align:center;">순번</th>
                        <th style="border:1px solid #000; text-align:center;">질 문 내 용 (교육생 공감순 정렬)</th>
                        <th style="width:80px; border:1px solid #000; text-align:center;">공감</th>
                    </tr>
                </thead>
                <tbody>${qaHtml}</tbody>
            </table>
            
            <div style="margin-top:70px; text-align:center; font-size:15px; color:#333; font-weight:bold;">위와 같이 교육과정 운영 결과를 보고합니다.</div>
            <div style="margin-top:10px; text-align:center; font-size:14px; color:#666;">${new Date().toLocaleDateString('ko-KR', {year: 'numeric', month: 'long', day: 'numeric'})}</div>
        `;
        
        if(previewModal) previewModal.style.display = 'flex'; 
    },
    










    closePreview: function() { 
        document.getElementById('printPreviewModal').style.display = 'none'; 
    },
    
    executePrint: function() { 
        const content = document.getElementById('official-document').innerHTML;
        const printWindow = window.open('', '', 'height=900,width=900');
        printWindow.document.write('<html><head><title>KAC Report</title>');
        printWindow.document.write('<style>@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"); * { box-sizing: border-box; } body { font-family: "Pretendard", sans-serif; padding: 40px; } table { width:100%; border-collapse:collapse; } th, td { border:1px solid #000; padding:8px; font-size:13px; } </style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(content);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
    }
};





// [최종] 통합 설정 관리 매니저 (직접 입력 대응 버전)
const setupMgr = {
// [최종] 환경 설정 진입 로직: 비어있는 방은 즉시 오픈, 사용 중인 방은 비번 확인
occupiedLocations: [], // 이 줄을 추가하세요













// 담임 교수 선택 즉시 → 그 교수의 오픈톡방 링크를 입력칸에 자동 채움
onProfChange: function() {
    const profName = (document.getElementById('setup-prof-select')?.value || '').trim();
    const kakaoInput = document.getElementById('setup-kakao-link');
    if (!kakaoInput) return;
    // 교수를 바꾸면 항상 그 교수의 카카오링크로 덮어쓴다 (수동 입력값/이전 교수 링크 잔존 방지)
    if (!profName) { kakaoInput.value = ''; return; }
    if (this._profKakaoCache && Object.prototype.hasOwnProperty.call(this._profKakaoCache, profName)) {
        kakaoInput.value = (this._profKakaoCache[profName] || '').trim();
        return;
    }
    firebase.database().ref(`system/professorProfiles/${profName}/kakaoLink`).once('value', s => {
        const link = (s.val() || '').trim();
        if (!this._profKakaoCache) this._profKakaoCache = {};
        this._profKakaoCache[profName] = link;
        kakaoInput.value = link;
    });
},

// [최종 수정] 권한 체크 + 호텔 예약 방식(Range) 달력이 적용된 설정 모달 오픈 함수
openSetupModal: async function() {
    if(!state.room) return ui.showAlert("강의실을 먼저 선택하세요.");
    
    // 1. 보안 체크: 인증되지 않은 사용자는 실행 중단
    const statusSnap = await firebase.database().ref(`courses/${state.room}/status`).get();
    const st = statusSnap.val() || {};

    if (st.roomStatus === 'active' && st.ownerSessionId !== state.sessionId && !state.isObserver) {
        // 소유권이 없으면 다시 인증 시도 유도
        dataMgr.switchRoomAttempt(state.room); 
        return;
    }

    // 2. 권한 확인된 경우만 모달 데이터 로드
    const allCoursesSnap = await firebase.database().ref('courses').get();
    const allCourses = allCoursesSnap.val() || {};
    this.occupiedLocations = [];
    Object.keys(allCourses).forEach(r => {
        if (r !== state.room && allCourses[r].status?.roomStatus === 'active') {
            const loc = allCourses[r].settings?.roomDetailName;
            if (loc) this.occupiedLocations.push(loc);
        }
    });

    // 교수님 선택지 구성
    let profOptions = '<option value="">(선택 안함)</option>';
    profMgr.list.forEach(p => { profOptions += `<option value="${p.name}">${p.name} 교수</option>`; });
    document.getElementById('setup-prof-select').innerHTML = profOptions;

    // 교수별 오픈톡방 링크 미리 캐시 (선택 즉시 채우기 위해)
    this._profKakaoCache = {};
    firebase.database().ref('system/professorProfiles').once('value', snap => {
        const all = snap.val() || {};
        Object.keys(all).forEach(name => {
            this._profKakaoCache[name] = (all[name] && all[name].kakaoLink) ? all[name].kakaoLink : '';
        });
    });

    // 담당자 상태 로드
    firebase.database().ref('system/coordinators').once('value', snap => {
        const coords = snap.val() || {};
        let coordOptions = '<option value="">--- 담당자 선택 ---</option>';
        Object.values(coords).forEach(c => { coordOptions += `<option value="${c.name}">${c.name}</option>`; });
        document.getElementById('setup-coord-select').innerHTML = coordOptions;
        
        // 가이드 PDF는 GitHub 정적 파일로 운영 중 (DB 저장 방식 미사용)
        const el = document.getElementById('modalGuideStatus');
        if(el) {
            el.innerHTML = '<i class="fa-solid fa-circle-check"></i> 가이드 PDF는 GitHub에서 운영 중입니다.';
            el.style.color = "#10b981";
        }

        // flatpickr를 먼저 초기화한 뒤, onReady 콜백에서 loadCurrentSettings 호출
        // → _flatpickr 인스턴스가 확실히 존재하는 시점에 setDate가 실행됨
        const existingFp = document.getElementById('setup-period-range')._flatpickr;
        if (existingFp) existingFp.destroy(); // 모달 재오픈 시 중복 인스턴스 방지

        flatpickr("#setup-period-range", {
            mode: "range",
            locale: "ko",
            dateFormat: "Y-m-d",
            showMonths: 2,
            closeOnSelect: false,
            disableMobile: "true",
            onReady: (selectedDates, dateStr, instance) => {
                instance.calendarContainer.style.width = "820px";
                // 달력 하단에 [적용] 버튼 추가 (중복 추가 방지)
                if (!instance.calendarContainer.querySelector('.fp-apply-bar')) {
                    const bar = document.createElement('div');
                    bar.className = 'fp-apply-bar';
                    bar.style.cssText = 'display:flex; gap:8px; justify-content:flex-end; padding:10px 14px; border-top:1px solid #e2e8f0; background:#f8fafc;';
                    bar.innerHTML = '<button type="button" class="fp-apply-btn" style="padding:8px 22px; background:#2563eb; color:#fff; border:none; border-radius:9px; font-size:14px; font-weight:800; cursor:pointer;"><i class="fa-solid fa-check"></i> 적용</button>';
                    bar.querySelector('.fp-apply-btn').addEventListener('click', () => instance.close());
                    instance.calendarContainer.appendChild(bar);
                }
                // 인스턴스 준비 완료 후 기존 저장 데이터 주입
                this.loadCurrentSettings();
            },
            onChange: function(selectedDates, dateStr, instance) {
                instance.calendarContainer.style.width = "820px";
            }
        });
    });
},














// [최종 수정] 통합 날짜(Range) 입력 방식에 맞춘 설정 데이터 로드 함수
loadCurrentSettings: function() {
    firebase.database().ref(`courses/${state.room}`).once('value', snap => {
        const data = snap.val() || {};
        const s = data.settings || {};
        const st = data.status || {};
        
        // 1. 기본 정보 세팅
        document.getElementById('setup-course-name').value = s.courseName || "";
        document.getElementById('setup-room-pw').value = s.password ? atob(s.password) : "";
        const kakaoInput = document.getElementById('setup-kakao-link');
        if (kakaoInput) kakaoInput.value = s.kakaoLink || "";
        const showBoardInput = document.getElementById('setup-show-on-board');
        // hideFromBoard가 true면 체크 해제, 아니면(기본) 체크
        if (showBoardInput) showBoardInput.checked = !s.hideFromBoard;
        // 차주 전환 시 자동 삭제 안 함 (autoAssignLocked)
        const keepInput = document.getElementById('setup-keep-next-week');
        if (keepInput) keepInput.checked = !!s.autoAssignLocked;
        document.getElementById('setup-prof-select').value = st.professorName || "";
        // coordinatorName 매칭: 저장값("백유민"/"백유민 과장"/"백유민과장" 등)을 명단의 정식 이름으로 정규화해 드롭다운 자동 선택
        const savedCoordName = s.coordinatorName || '';
        const coordSel = document.getElementById('setup-coord-select');
        if (coordSel) {
            // 1순위: 완전 일치
            coordSel.value = savedCoordName;
            // 2순위: 표기 차이(공백/직급) 흡수 매칭
            if (!coordSel.value && savedCoordName) {
                const canonical = coordMgr.matchName(savedCoordName);
                if (canonical) coordSel.value = canonical;
            }
        }

        // 2. 강의실 선택 및 중복 체크 로직
        this._injectCustomRooms();
        const roomSelect = document.getElementById('setup-room-select');
        Array.from(roomSelect.options).forEach(opt => {
            if (!opt.dataset.originalText) opt.dataset.originalText = opt.text;
            
            if (this.occupiedLocations.includes(opt.value)) {
                opt.text = opt.dataset.originalText + " (이미 사용 중)";
                opt.disabled = true;
                opt.style.color = "#cbd5e1"; 
            } else {
                opt.text = opt.dataset.originalText;
                opt.disabled = false;
                opt.style.color = ""; 
            }
        });

        // 3. 강의실 상세 위치 (직접 입력 대응)
        const roomDirect = document.getElementById('setup-room-direct');
        const currentRoomValue = s.roomDetailName || "";
        let found = false;
        for (let i = 0; i < roomSelect.options.length; i++) {
            if (roomSelect.options[i].value === currentRoomValue) {
                roomSelect.value = currentRoomValue;
                found = true;
                break;
            }
        }
        if (!found && currentRoomValue) {
            roomSelect.value = "direct";
            roomDirect.value = currentRoomValue;
            roomDirect.style.display = "block";
        } else {
            roomDirect.style.display = "none";
        }

        // 4. 날짜 범위 로직 (Range Picker 대응)
        // flatpickr가 onReady 이후 호출되므로 _flatpickr 인스턴스는 반드시 존재함
        // requestAnimationFrame으로 한 프레임 더 보장
        const rangeInput = document.getElementById('setup-period-range');
        const today = new Date();
        const todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

        const applyFpDate = () => {
            const fp = rangeInput._flatpickr;
            if (fp) {
                if (s.period && s.period.length > 5) {
                    fp.setDate(s.period.split(' ~ '), true);
                } else {
                    fp.setDate([today, today], true);
                    rangeInput.value = `${todayStr} ~ ${todayStr}`;
                }
            } else {
                // 혹시 인스턴스가 아직 없으면 50ms 후 재시도 (이중 방어)
                setTimeout(applyFpDate, 50);
            }
        };
        requestAnimationFrame(applyFpDate);
        
        // 5. menuFeatures 체크박스 상태 로드
        // [디폴트=전부 ON] 교육생 앱은 '명시적으로 false인 메뉴만 숨김'이 기본이므로,
        // 저장된 설정이 없을 때 체크박스도 전부 ON으로 맞춘다(앱 기본=전부 표시와 일치).
        // 강사는 끄고 싶은 메뉴만 체크 해제하면 됨.
        const features = s.menuFeatures || {};
        // [첫 개설 디폴트] 차량(shuttle)·외출외박(adminAction)·오픈톡방(kakao)만 체크, 나머지는 강사가 추가
        const defaultOn = ['shuttle','adminAction','kakao'];
        const featureKeys = ['facility','shuttle','adminAction','meal','attendanceQr','cns','tabletLoan','kakao','hrd','foodspots'];
        featureKeys.forEach(key => {
            const el = document.getElementById(`feat-${key}`);
            if (!el) return;
            if (key === 'foodspots') { el.checked = (features.foodspots !== false); return; } // 맛집: 기본 ON (항상 노출)
            if (Object.keys(features).length === 0) {
                el.checked = defaultOn.includes(key);
            } else {
                el.checked = (features[key] !== false);
            }
        });

        // 6. 모달 표시 및 과목 리스트 출력
        subjectMgr.renderListInModal();
        document.getElementById('courseSetupModal').style.display = 'flex';
    });
},







    // 선택창 값 변경 감지 함수
    checkDirectInput: function(val) {
        const directInput = document.getElementById('setup-room-direct');
        if (val === "direct") {
            directInput.style.display = "block";
            directInput.focus();
        } else {
            directInput.style.display = "none";
        }
    },

    // [공용 강의실] system/classrooms 의 사용자 추가 강의실을 setup-room-select 에 주입
    _injectCustomRooms: function() {
        const sel = document.getElementById('setup-room-select');
        if (!sel) return;
        let grp = document.getElementById('custom-rooms-grp');
        if (!grp) {
            grp = document.createElement('optgroup');
            grp.id = 'custom-rooms-grp';
            grp.label = '추가된 강의실';
            const direct = Array.from(sel.options).find(o => o.value === 'direct');
            sel.insertBefore(grp, direct ? direct : null);
        }
        grp.innerHTML = '';
        const by = window.__customRooms || {};
        Object.keys(by).forEach(b => {
            (by[b] || []).forEach(n => {
                if (Array.from(sel.options).some(o => o.value === n)) return; // 정적 목록 중복 방지
                const o = document.createElement('option');
                o.value = n; o.text = (b && b !== '기타' ? ('[' + b + '] ') : '') + n;
                grp.appendChild(o);
            });
        });
        grp.style.display = grp.children.length ? '' : 'none';
    },
    openAddRoom: function() {
        const bsel = document.getElementById('addRoomBuilding');
        if (bsel) {
            let opts = '';
            (window.CLASSROOM_DETAIL_GROUPS_SHARED || []).forEach(g => { if (g.label === '비대면') return; opts += '<option value="' + g.label + '">' + g.label + '</option>'; });
            Object.keys(window.__customRooms || {}).forEach(b => { if (!(window.CLASSROOM_DETAIL_GROUPS_SHARED || []).some(g => g.label === b)) opts += '<option value="' + b + '">' + b + '</option>'; });
            bsel.innerHTML = opts;
        }
        const nm = document.getElementById('addRoomName'); if (nm) nm.value = '';
        const m = document.getElementById('addRoomModal'); if (m) m.style.display = 'flex';
    },
    saveAddRoom: async function() {
        const b = (document.getElementById('addRoomBuilding').value || '').trim();
        const n = (document.getElementById('addRoomName').value || '').trim();
        if (!b || !n) { ui.showAlert('건물과 강의실명을 모두 입력하세요.'); return; }
        try {
            await firebase.database().ref('system/classrooms').push({ building: b, name: n, ts: Date.now() });
            const m = document.getElementById('addRoomModal'); if (m) m.style.display = 'none';
            ui.showAlert('✅ 강의실이 추가되었습니다.\n모든 플랫폼 장소 목록에 반영됩니다.');
        } catch (e) { ui.showAlert('저장 실패: ' + e.message); }
    },
    closeAddRoom: function() {
        const m = document.getElementById('addRoomModal'); if (m) m.style.display = 'none';
    },

    closeSetupModal: function() {
        document.getElementById('courseSetupModal').style.display = 'none';
    },




saveAll: function() {
        // [옵저버 제한]
        if(state.isObserver) return ui.showAlert("👁️ 옵저버 모드에서는 환경설정을 변경할 수 없습니다.");

        const name = document.getElementById('setup-course-name').value.trim();
        const rawPw = document.getElementById('setup-room-pw').value.trim();
        
        // ★ 수정: 두 개의 날짜 대신 통합된 범위 입력창에서 값을 가져옵니다.
        const periodRange = document.getElementById('setup-period-range').value.trim();
        
        const profName = document.getElementById('setup-prof-select').value;
        const coordName = document.getElementById('setup-coord-select').value;

        const roomSelectVal = document.getElementById('setup-room-select').value;
        const roomName = (roomSelectVal === "direct") ? document.getElementById('setup-room-direct').value.trim() : roomSelectVal;

        // ★ 유효성 검사: 빈 필수 항목을 빨간 테두리로 표시
        const reqChecks = [
            { val: name,        id: 'setup-course-name',  label: '과정명' },
            { val: periodRange, id: 'setup-period-range',  label: '교육기간' },
            { val: roomName,    id: (roomSelectVal === 'direct' ? 'setup-room-direct' : 'setup-room-select'), label: '장소' }
        ];
        // 먼저 모든 표시 초기화
        reqChecks.forEach(c => {
            const el = document.getElementById(c.id);
            if (el) { el.style.border = ''; el.style.background = ''; el.style.boxShadow = ''; }
        });
        const missing = reqChecks.filter(c => !c.val);
        if (missing.length) {
            missing.forEach(c => {
                const el = document.getElementById(c.id);
                if (el) {
                    el.style.border = '2px solid #ef4444';
                    el.style.background = '#fef2f2';
                    el.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
                    // 입력 시작하면 빨간 표시 자동 해제
                    const clear = () => { el.style.border=''; el.style.background=''; el.style.boxShadow=''; el.removeEventListener('input', clear); el.removeEventListener('change', clear); };
                    el.addEventListener('input', clear);
                    el.addEventListener('change', clear);
                }
            });
            // 첫 미입력 항목으로 스크롤·포커스
            const firstEl = document.getElementById(missing[0].id);
            if (firstEl) { firstEl.scrollIntoView({ block:'center', behavior:'smooth' }); setTimeout(()=>firstEl.focus(), 200); }
            ui.showAlert(`❌ 다음 항목을 입력해주세요:\n\n· ${missing.map(m=>m.label).join('\n· ')}\n\n(빨간색으로 표시된 칸을 확인하세요)`);
            return;
        }

        if (this.occupiedLocations.includes(roomName)) {
            ui.showAlert(`🚫 '${roomName}'은(는) 이미 사용 중인 장소입니다.`);
            return;
        }

        const updates = {};
        updates[`courses/${state.room}/settings/courseName`] = name;
        // 새 과정은 같은 주차의 과거 생활관 잠금보다 우선해 '열림'으로 시작한다.
        updates[`courses/${state.room}/settings/courseCreatedAt`] = firebase.database.ServerValue.TIMESTAMP;
        updates[`courses/${state.room}/settings/password`] = rawPw ? btoa(rawPw) : null;
        // 카카오톡 오픈톡방 링크 (선택) — 입력값 정리 후 저장
        const kakaoLinkVal = (document.getElementById('setup-kakao-link')?.value || '').trim();
        updates[`courses/${state.room}/settings/kakaoLink`] = kakaoLinkVal;
        // 전면 현황판 총괄표 노출 여부 — 체크 해제 시 hideFromBoard=true (총괄표에서 숨김)
        const showOnBoard = document.getElementById('setup-show-on-board');
        updates[`courses/${state.room}/settings/hideFromBoard`] = showOnBoard ? !showOnBoard.checked : false;
        // 차주 전환 시 자동 삭제 안 함 — 체크 시 autoAssignLocked=true (연간계획 자동배치에서 이 방 보존)
        const keepNextWeek = document.getElementById('setup-keep-next-week');
        updates[`courses/${state.room}/settings/autoAssignLocked`] = (keepNextWeek && keepNextWeek.checked) ? true : null;
        
        // ★ 수정: 호텔 예약 방식으로 선택된 날짜 범위 ("시작일 ~ 종료일")를 그대로 저장합니다.
        updates[`courses/${state.room}/settings/period`] = periodRange;
        
        updates[`courses/${state.room}/settings/roomDetailName`] = roomName;
        updates[`courses/${state.room}/status/roomDetailManual`] = (roomName && String(roomName).trim()) ? true : null;   // 강사가 강의실 수동 지정 → 자동동기화가 덮어쓰지 않게 보존
        updates[`courses/${state.room}/settings/coordinatorName`] = coordName;
        updates[`courses/${state.room}/status/coordManual`] = (coordName && String(coordName).trim()) ? true : null;   // [J10] 강사가 담임 수동 지정 → 연간계획 자동동기화가 덮어쓰지 않게 보존
        updates[`courses/${state.room}/status/professorName`] = profName;
        updates[`courses/${state.room}/status/roomStatus`] = 'active';
        updates[`courses/${state.room}/status/ownerSessionId`] = state.sessionId;

        // menuFeatures: 체크박스 상태 저장 (false일 때만 명시, true는 기본값)
        const featureKeys = ['facility','shuttle','adminAction','meal','attendanceQr','cns','tabletLoan','kakao','hrd','foodspots'];
        const menuFeatures = {};
        featureKeys.forEach(key => {
            const el = document.getElementById(`feat-${key}`);
            menuFeatures[key] = el ? el.checked : true;
        });
        updates[`courses/${state.room}/settings/menuFeatures`] = menuFeatures;

        const self = this;
        const commitUpdates = () => {
            const _room = state.room;
            const _newKey = () => 'rk_' + Date.now() + '_' + Math.random().toString(36).slice(2,7);
            // [차수 구분/리셋] 미개설→개설 이거나 과정명이 바뀌면 '새 과정' →
            //   ① resetKey 새로 발급(옛 교육생 자동입장 차단)
            //   ② 옛 과정 데이터(수강생·명단·생활관 명단·출결·신청 등) 비움 — "리셋 후 개설"
            //   ③ 비우기 전 출결·외출외박은 보관소(course_archive)에 3개월 보존용으로 아카이브
            //   (진행 중인 같은 과정의 설정만 수정할 때는 그대로 둬서 현재 교육생이 안 튕김)
            firebase.database().ref(`courses/${_room}`).once('value').then(function(snap){
                const _c = snap.val() || {};
                const prevActive = ((_c.status || {}).roomStatus === 'active');
                const prevName = (((_c.settings || {}).courseName) || '').trim();
                const prevPeriod = (((_c.settings || {}).period) || '').trim();
                const isNewCourse = (!prevActive) || (prevName && prevName !== name);
                let pre = Promise.resolve();
                if (isNewCourse) {
                    updates[`courses/${_room}/status/resetKey`] = _newKey();
                    // 아카이브 (출결·외출외박·수강생 3개월 보존)
                    const _aa = _c.admin_actions || {}, _ia = _c.internal_attendance || {}, _stu = _c.students || {};
                    if (Object.keys(_aa).length || Object.keys(_ia).length || Object.keys(_stu).length) {
                        pre = firebase.database().ref('system/course_archive/' + _room + '_' + Date.now()).set({
                            room: _room, courseName: prevName, period: prevPeriod,
                            prof: ((_c.status || {}).professorName) || '', coord: ((_c.settings || {}).coordinatorName) || '',
                            admin_actions: _aa, internal_attendance: _ia, students: _stu,
                            expectedStudents: (_c.expectedStudents || null), archivedAt: firebase.database.ServerValue.TIMESTAMP
                        }).catch(function(){});
                    }
                    // 데이터 노드 비움 (settings/status 는 새 값으로 이미 updates 에 들어있어 제외)
                    ['students','internal_attendance','admin_actions','dinner_skips','shuttle','tablet_loans','quizAnswers','questions','activeQuiz','quizFinalResults','attendanceQR','scheduleImage','coordNoticeHistory','connections','gradPhoto'].forEach(function(k){ updates[`courses/${_room}/${k}`] = null; });
                    updates[`courses/${_room}/boardNotice`] = "";
                    updates[`courses/${_room}/coordNotice`] = "";
                    // [명단 보존] 신규 개설 시에도 지원부·운영부 미리 올린 명단은 보존 (삭제는 과정 종료 expire/수동 리셋만)
                }
                return pre;
            }).catch(function(){ updates[`courses/${_room}/status/resetKey`] = _newKey(); })
              .then(function(){ return firebase.database().ref().update(updates); })
              .then(() => {
                document.getElementById('courseNameInput').value = name;
                document.getElementById('roomPw').value = rawPw;
                document.getElementById('displayCourseTitle').innerText = name;
                localStorage.setItem('last_owned_room', state.room);
                ui.showAlert("✅ 설정이 저장되었습니다. (미리 올린 교육생 명단은 보존됩니다)");
                self.closeSetupModal();
                dataMgr.forceEnterRoom(state.room);
            });
        };

        // [자동 적용] 톡방 칸이 비어있고 담임 교수가 지정돼 있으면,
        //  그 교수 프로필의 오픈톡방 링크를 자동으로 채워서 저장한다.
        if (!kakaoLinkVal && profName) {
            firebase.database().ref(`system/professorProfiles/${profName}/kakaoLink`).once('value', s => {
                const profLink = (s.val() || '').trim();
                if (profLink) updates[`courses/${state.room}/settings/kakaoLink`] = profLink;
                commitUpdates();
            }, () => commitUpdates());
        } else {
            commitUpdates();
        }
    }
}; // <--- setupMgr 객체를 닫아주는 아주 중요한 마침표입니다.











// [신규] 팝업 내부 전용 과목 관리 기능 (이 함수들이 점선 아래로 들어가야 합니다)
subjectMgr.renderListInModal = function() {
    const container = document.getElementById('setup-subject-list');
    if(!container) return;
    container.innerHTML = "";
    if(this.list.length === 0) {
        container.innerHTML = '<div style="color: #94a3b8; font-size: 11px; text-align: center;">등록된 과목이 없습니다.</div>';
        return;
    }
    this.list.forEach(item => {
        container.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: #f1f5f9; margin-bottom: 4px; border-radius: 6px; font-size: 12px; color: #1e293b; border: 1px solid #e2e8f0;">
                <span>${item.name}</span>
                <i class="fa-solid fa-trash-can" onclick="subjectMgr.deleteSubject('${item.key}')" style="cursor: pointer; color: #ef4444;"></i>
            </div>`;
    });
};



subjectMgr.addSubjectInModal = function() {
    const input = document.getElementById('setup-new-subject');
    const name = input.value.trim();
    if(!name) return;
    firebase.database().ref(`courses/${state.room}/settings/subjects`).push(name).then(() => {
        input.value = "";
    });
};





// ════════════════════════════════════════════════════════════
//  강의 실시간 모니터링 — 방송측 (이 PC 마이크 → 모니터링 페이지로 송출)
//  · 강의가 active 이고 이 기기가 소유자(owner)일 때만 'live' 송출
//  · WebRTC: 리스너(모니터 페이지)가 offer, 이쪽(방송)이 answer + 마이크 트랙 제공
// ════════════════════════════════════════════════════════════
const lectureMonitor = {
    stream: null,
    micReady: false,
    micAsked: false,
    currentRoom: null,
    statusRef: null,
    callsRef: null,
    peers: {},          // listenerId -> { pc, candRef }
    hbTimer: null,
    _info: {},
    ICE: { iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun.cloudflare.com:3478' },
        { urls: 'stun:stun.nextcloud.com:443' }
    ] },

    // 마이크 자동 요청 (최초 1회 브라우저 권한 팝업 → HTTPS에선 이후 기억됨)
    requestMic: async function() {
        this.micAsked = true;
        if (this.micReady && this.stream) return true;
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.warn('[강의모니터링] getUserMedia 미지원 (HTTPS 필요)');
            this._setBanner('unsupported');
            return false;
        }
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    channelCount: 1,
                    sampleRate: 48000
                },
                video: false
            });
            this.micReady = true;
            this._setBanner(null);
            this._updateToggleButton();
            console.log('[강의모니터링] 🎙️ 마이크 활성화 — 모니터링 송출 준비됨');
            if (this.currentRoom) this._publishStatus();
            return true;
        } catch (e) {
            this.micReady = false;
            this._updateToggleButton();
            console.warn('[강의모니터링] 마이크 권한 거부/실패:', e && e.name);
            this._setBanner('blocked');
            if (this.currentRoom) this._publishStatus(); // micOn:false 라도 live 표시
            return false;
        }
    },
    toggleMic: async function() {
        if (this.micReady || this.stream) {
            // 마이크 끄기
            this.stopMic(true);
            ui.showAlert('강의 음성 모니터링 마이크를 껐습니다.');
        } else {
            // 버튼 클릭 시: 항상 동의 모달 표시 (자동 켜짐 방지)
            this._askConsent(this.currentRoom);
        }
    },
    stopMic: function(keepRoom) {
        Object.keys(this.peers || {}).forEach(id => this._closePeer(id));
        if (this.stream) {
            try { this.stream.getTracks().forEach(t => t.stop()); } catch (e) {}
        }
        this.stream = null;
        this.micReady = false;
        this._updateToggleButton();
        if (this.currentRoom) this._publishStatus();
        if (!keepRoom) this._teardownRoom();
    },
    _updateToggleButton: function() {
        const btn = document.getElementById('micMonitorToggleBtn');
        if (!btn) return;
        // 개별 강의실에 입장했을 때(body.in-course)만 노출 — 통합 현황판/홈에선 숨김
        const inCourse = document.body.classList.contains('in-course');
        const shouldShow = !!(this.currentRoom && !state.isObserver && inCourse);
        btn.style.display = shouldShow ? 'flex' : 'none';
        btn.classList.toggle('is-off', !this.micReady);
        btn.title = this.micReady ? '강의 음성 모니터링 끄기' : '강의 음성 모니터링 켜기';
        btn.innerHTML = this.micReady
            ? '<i class="fa-solid fa-microphone"></i>'
            : '<i class="fa-solid fa-microphone-slash"></i>';
    },

    _setBanner: function(kind) {
        const el = document.getElementById('micMonitorBanner');
        if (!el) return;
        el.style.display = 'none';
    },
    _rememberSessionConsent: function() {
        try { sessionStorage.setItem('kac_mic_monitor_consent', '1'); } catch (e) {}
    },
    _hasSessionConsent: function() {
        try { return sessionStorage.getItem('kac_mic_monitor_consent') === '1'; } catch (e) { return false; }
    },

    // status 구독 콜백에서 호출 — 방송 여부 결정
    syncStatus: function(room, statusData, isOwner, isActive) {
        const shouldBroadcast = isOwner && isActive && !state.isObserver;
        if (shouldBroadcast) {
            this._info = {
                courseName: (statusData && statusData.courseName) || '',
                professorName: (statusData && statusData.professorName) || ''
            };
            if (this.currentRoom && this.currentRoom !== room) this._teardownRoom();
            this.currentRoom = room;
            this._publishStatus();
            this._listenForCalls(room);
            if (!this.hbTimer) this.hbTimer = setInterval(() => this._publishStatus(), 20000);
            this._updateToggleButton();
            // [수정] 마이크는 버튼 클릭 시에만 활성화 - 자동 활성화 제거
        } else {
            if (this.currentRoom || this.stream || this.micReady) this.stopMic(false);
            else this._updateToggleButton();
        }
    },

    // 강의실 입장(강의 시작) 시 마이크 모니터링 동의 모달 — 방이 바뀔 때마다 1회
    _askConsent: function(room) {
        if (this.micReady) return;
        if (this._consentRoomAsked === room) return;   // 이 방은 이미 물어봄
        this._consentRoomAsked = room;
        const modal = document.getElementById('micConsentModal');
        if (!modal) { this.requestMic(); return; }   // 모달 없으면 바로 요청(하위호환)
        const info = document.getElementById('micConsentRoomInfo');
        if (info) {
            const cn = (this._info && this._info.courseName) ? this._info.courseName : '';
            info.textContent = `ROOM ${room}` + (cn ? ` · ${cn}` : '');
        }
        modal.style.display = 'flex';
    },
    acceptConsent: async function() {
        const modal = document.getElementById('micConsentModal');
        if (modal) modal.style.display = 'none';
        this._rememberSessionConsent();
        await this.requestMic();   // 동의 클릭(사용자 제스처) 직후 브라우저 권한 요청
    },
    dismissConsent: function() {
        const modal = document.getElementById('micConsentModal');
        if (modal) modal.style.display = 'none';
        // 하단 배너는 중복 안내가 되므로 표시하지 않는다.
        this._setBanner(null);
    },

    _publishStatus: function() {
        if (!this.currentRoom) return;
        try {
            this.statusRef = firebase.database().ref(`system/monitoring/status/${this.currentRoom}`);
            this.statusRef.set({
                live: true,
                micOn: !!this.micReady,
                sessionId: state.sessionId,
                ts: firebase.database.ServerValue.TIMESTAMP
            });
            this.statusRef.onDisconnect().remove();  // 탭/PC 종료 시 자동 해제
        } catch (e) { console.warn('[강의모니터링] 상태 송출 실패', e); }
    },

    _listenForCalls: function(room) {
        if (this.callsRef) this.callsRef.off();
        this.callsRef = firebase.database().ref(`system/monitoring/calls/${room}`);
        this.callsRef.on('child_added', snap => this._handleListener(room, snap.key, snap.val()));
        this.callsRef.on('child_changed', snap => this._handleListener(room, snap.key, snap.val()));
        this.callsRef.on('child_removed', snap => this._closePeer(snap.key));
    },

    _handleListener: async function(room, listenerId, data) {
        if (!data || !data.offer || this.peers[listenerId]) return;  // offer 있고, 아직 처리 안 한 것만

        const callBase = firebase.database().ref(`system/monitoring/calls/${room}/${listenerId}`);

        // 마이크가 없으면 오류 플래그만 남기고 종료
        if (!this.stream || !this.micReady) {
            await this.requestMic();
            if (!this.stream || !this.micReady) {
                callBase.child('error').set('no-mic');
                return;
            }
        }

        const pc = new RTCPeerConnection(this.ICE);
        const peer = { pc, callBase, remoteSet: false, pendCand: [] };
        this.peers[listenerId] = peer;

        // 이 PC 마이크 트랙 추가
        this.stream.getTracks().forEach(t => pc.addTrack(t, this.stream));

        pc.onicecandidate = ev => {
            if (ev.candidate) callBase.child('broadcasterCandidates').push(ev.candidate.toJSON());
        };
        pc.oniceconnectionstatechange = () => {
            console.log('[강의모니터링] ICE 상태:', pc.iceConnectionState);
            if (['failed', 'disconnected'].includes(pc.iceConnectionState)) this._closePeer(listenerId);
        };
        pc.onconnectionstatechange = () => {
            console.log('[강의모니터링] 연결 상태:', pc.connectionState);
            if (['failed', 'closed'].includes(pc.connectionState)) this._closePeer(listenerId);
        };
        // 리스너 ICE 수신 — 원격설명(offer) 적용 전이면 큐에 보관
        callBase.child('listenerCandidates').on('child_added', async s => {
            const c = s.val(); if (!c) return;
            if (!peer.remoteSet) { peer.pendCand.push(c); return; }
            try { await pc.addIceCandidate(new RTCIceCandidate(c)); } catch (e) { console.warn('[강의모니터링] ICE 추가 실패', e); }
        });

        try {
            await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
            peer.remoteSet = true;
            for (const c of peer.pendCand) { try { await pc.addIceCandidate(new RTCIceCandidate(c)); } catch (e) {} }
            peer.pendCand = [];
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            await callBase.child('answer').set({ type: answer.type, sdp: answer.sdp });
        } catch (e) {
            console.error('[강의모니터링] answer 생성 실패', e);
            this._closePeer(listenerId);
        }
    },

    _closePeer: function(listenerId) {
        const p = this.peers[listenerId];
        if (!p) return;
        try { if (p.callBase) p.callBase.child('listenerCandidates').off(); } catch (e) {}
        try { if (p.pc) p.pc.close(); } catch (e) {}
        delete this.peers[listenerId];
    },

    _teardownRoom: function() {
        Object.keys(this.peers).forEach(id => this._closePeer(id));
        if (this.callsRef) { try { this.callsRef.off(); } catch (e) {} this.callsRef = null; }
        if (this.statusRef) { try { this.statusRef.onDisconnect().cancel(); this.statusRef.remove(); } catch (e) {} this.statusRef = null; }
        if (this.hbTimer) { clearInterval(this.hbTimer); this.hbTimer = null; }
        this.currentRoom = null;
        this._updateToggleButton();
    }
};

// 파일 맨 아래 window.onload 부분도 이렇게 깔끔하게 바꿔야 실시간이 작동합니다!
// ──────────────────────────────────────────────────────────────
// [외출·외박 복귀 확인 팝업]
//  다음날 08:50~08:59 사이에만, 어제 외출/외박자 중 '복귀완료를 누르지 않은(대기)' 인원을
//  강사에게 정중히 확인. 미복귀 체크 시 held 처리(자동복귀 제외 + 일지 기록).
//  09:00 이후에는 더 이상 노출하지 않으며, 미응답 인원은 기존 자동 복귀완료가 적용됨.
// ──────────────────────────────────────────────────────────────
const outingReturnCheck = {
    _timer: null,
    init: function() {
        if (this._timer) clearInterval(this._timer);
        // 1분마다 점검 (08:50~08:59 구간 진입 감지)
        this._timer = setInterval(() => { try { this.maybeShow(); } catch (e) {} }, 60000);
        setTimeout(() => { try { this.maybeShow(); } catch (e) {} }, 4000);
    },
    _inWindow: function() {
        const n = new Date();
        const mins = n.getHours() * 60 + n.getMinutes();
        return mins >= (7 * 60) && mins < (9 * 60); // 07:00 ~ 08:59
    },
    maybeShow: async function() {
        if (typeof firebase === 'undefined') return;
        if (!state.room || state.isObserver) return;
        if (!this._inWindow()) return;                      // 09:00 넘으면 노출 안 함
        const modal = document.getElementById('outingReturnCheckModal');
        if (!modal || modal.style.display === 'flex') return; // 이미 떠 있으면 중복 방지
        const room = state.room;
        const date = getYesterdayString();
        try {
            const ackSnap = await firebase.database().ref(`courses/${room}/returnCheckAck/${date}`).once('value');
            if (ackSnap.val()) return;                      // 이미 확인 완료
            const snap = await firebase.database().ref(`courses/${room}/admin_actions/${date}`).once('value');
            const data = snap.val() || {};
            // '복귀완료를 누르지 않은' 대기 인원만 (이미 복귀/미복귀 제외)
            const pending = Object.keys(data)
                .map(token => Object.assign({}, data[token], { token }))
                .filter(a => a && a.name && !a.returned && !a.returnReportTime && a.held !== true);
            if (!pending.length) return;                    // 대상 없으면 팝업 안 띄움
            this._render(room, date, pending);
        } catch (e) { /* 무시 */ }
    },
    _render: function(room, date, pending) {
        const modal = document.getElementById('outingReturnCheckModal');
        const listEl = document.getElementById('outingReturnCheckList');
        if (!modal || !listEl) return;
        modal.dataset.room = room;
        modal.dataset.date = date;
        const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
        listEl.innerHTML = pending.map(a => {
            const kind = a.type === 'overnight' ? '외박' : (a.type === 'group_outing' ? '단체외출' : '외출');
            return `<label style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 12px; border:1px solid #fde68a; background:#fffbeb; border-radius:10px; cursor:pointer;">
                <span style="font-weight:800; color:#92400e;">${esc(a.name)} <small style="color:#b45309; font-weight:600;">(${kind})</small></span>
                <span style="display:inline-flex; align-items:center; gap:6px; font-size:12px; color:#dc2626; font-weight:800; white-space:nowrap;">
                    <input type="checkbox" data-rc-token="${esc(a.token)}" style="width:17px; height:17px; accent-color:#dc2626; cursor:pointer;"> 미복귀
                </span>
            </label>`;
        }).join('');
        modal.style.display = 'flex';
    },
    confirm: async function() {
        const modal = document.getElementById('outingReturnCheckModal');
        if (!modal) return;
        const room = modal.dataset.room, date = modal.dataset.date;
        if (!room || !date) { modal.style.display = 'none'; return; }
        const boxes = modal.querySelectorAll('[data-rc-token]');
        const updates = {};
        let heldCount = 0;
        boxes.forEach(b => {
            if (b.checked) {
                const t = b.getAttribute('data-rc-token');
                updates[`courses/${room}/admin_actions/${date}/${t}/held`] = true;
                updates[`courses/${room}/admin_actions/${date}/${t}/returned`] = null;
                updates[`courses/${room}/admin_actions/${date}/${t}/autoReturn`] = null;
                heldCount++;
            }
        });
        updates[`courses/${room}/returnCheckAck/${date}`] = { at: firebase.database.ServerValue.TIMESTAMP, by: state.sessionId || '', held: heldCount };
        try { await firebase.database().ref().update(updates); } catch (e) {}
        modal.style.display = 'none';
        if (typeof ui !== 'undefined' && ui.showAlert) {
            ui.showAlert(heldCount > 0
                ? `✅ 확인 완료.\n미복귀 ${heldCount}명은 자동 복귀완료에서 제외되고 외출외박일지에 기록됩니다.`
                : '✅ 확인 완료. 모두 정상 복귀로 처리되었습니다.');
        }
    },
    dismiss: function() {
        const modal = document.getElementById('outingReturnCheckModal');
        if (modal) modal.style.display = 'none';
    }
};
window.outingReturnCheck = outingReturnCheck;

// ──────────────────────────────────────────────────────────────
// [외출·외박 자동 복귀완료 sweep] (교육운영부와 동일 로직)
//  교육운영부 화면이 닫혀 있어도 강사 플랫폼(통합 현황판)이 열려 있으면 자동복귀가 찍히도록 이중화.
//  다음날 08:59까지 복귀완료/미복귀(held) 표시가 없는 외출/외박 건을 22:00(외출)·익일08:00(외박) 복귀완료(자동) 처리.
//  통합 현황판이 구독 중인 전체 방 데이터(window._homeStatsData)를 사용하므로 모든 방을 커버한다.
//  같은 Firebase 데이터를 갱신하므로 교육운영부 sweep과 충돌 없이 멱등하게 동작.
// ──────────────────────────────────────────────────────────────
const outingAutoReturn = {
    _timer: null,
    init: function() {
        if (this._timer) clearInterval(this._timer);
        this._timer = setInterval(() => { try { this.sweep(); } catch (e) {} }, 300000); // 5분마다
        setTimeout(() => { try { this.sweep(); } catch (e) {} }, 8000);                   // 로딩 8초 후 1회
    },
    sweep: function() {
        if (typeof firebase === 'undefined') return;
        const data = window._homeStatsData;       // 통합 현황판이 구독 중인 전체 courses 데이터
        if (!data) return;
        const now = new Date();
        const updates = {};
        Object.keys(data).forEach(rid => {
            const room = data[rid];
            if (!room || !room.admin_actions) return;
            Object.keys(room.admin_actions).forEach(date => {
                if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
                const day = room.admin_actions[date]; if (!day) return;
                Object.keys(day).forEach(key => {
                    const a = day[key]; if (!a || !a.name) return;
                    if (a.returned || a.held) return;                 // 이미 복귀 / 미복귀(held) 제외
                    const cutoff = new Date(date + 'T08:59:00'); cutoff.setDate(cutoff.getDate() + 1);
                    if (now < cutoff) return;                          // 다음날 08:59 이전이면 대기
                    const isOut = (a.type === 'outing');
                    const rtd = new Date(date + 'T' + (isOut ? '22:00:00' : '08:00:00'));
                    if (!isOut) rtd.setDate(rtd.getDate() + 1);        // 외출:당일22시 · 외박:익일08시
                    updates[`courses/${rid}/admin_actions/${date}/${key}/returned`]   = true;
                    updates[`courses/${rid}/admin_actions/${date}/${key}/autoReturn`]  = true;
                    updates[`courses/${rid}/admin_actions/${date}/${key}/returnedAt`]  = rtd.getTime();
                });
            });
        });
        if (Object.keys(updates).length) firebase.database().ref().update(updates).catch(() => {});
    }
};
window.outingAutoReturn = outingAutoReturn;

// ──────────────────────────────────────────────────────────────
// [키오스크 모드] 비행기 아이콘 3초 롱프레스 → 현재 진행 과정 표를 모니터 전체화면으로.
//  X 버튼(마우스 호버 시 회전)을 3초 롱프레스 → 현황판으로 복귀.
//  데이터는 통합 현황판이 이미 구독 중인 window._homeStatsData 재사용 → Firebase 트래픽 증가 없음.
// ──────────────────────────────────────────────────────────────
const kiosk = {
    _timer:null, _raf:null, _clock:null, _refresh:null, _active:false,
    init: function() {
        const plane=document.getElementById('kioskPlaneBtn');
        if(plane) this._bindLongPress(plane, 5000, ()=>this.open(), 'kioskEnterBar');   // 비행기 5초 → 키오스크 진입(하단 진행바)
        const clock=document.getElementById('kioskClock');
        if(clock) this._bindLongPress(clock, 5000, ()=>this.close(), 'kioskExitBar');   // 시계 5초 → 종료(상단 진행바)
        // 키오스크 활성 중에는 ESC(및 F11) 무력화 → 시계 5초로만 종료
        document.addEventListener('keydown', (e)=>{
            if(!this._active) return;
            if(e.key==='Escape' || e.key==='F11'){ e.preventDefault(); e.stopPropagation(); }
        }, true);
        // ESC 등으로 전체화면이 풀려도 키오스크가 켜져 있으면 즉시 전체화면 재진입
        const onFsChange=()=>{ if(this._active && !this._isFs()) this._enterFs(); };
        ['fullscreenchange','webkitfullscreenchange','msfullscreenchange'].forEach(ev=>document.addEventListener(ev,onFsChange));
    },
    _isFs: function(){ return !!(document.fullscreenElement||document.webkitFullscreenElement||document.msFullscreenElement); },
    _enterFs: function(){ try{ const de=document.documentElement; const fn=de.requestFullscreen||de.webkitRequestFullscreen||de.msRequestFullscreen; if(fn) fn.call(de); }catch(e){} },
    _bindLongPress: function(el, dur, cb, barId) {
        const self=this; let start=0; let reached=false;
        const begin=function(e){ if(e.cancelable) e.preventDefault(); start=Date.now(); reached=false; self._bar(barId,0.001);
            // dur 만큼 누르면 '완료' 표시(자동 실행 X). 손을 떼는 순간(사용자 제스처) 실행 → 전체화면 진입 허용
            self._timer=setTimeout(function(){ reached=true; self._bar(barId,1); }, dur);
            self._raf=setInterval(function(){ self._bar(barId, Math.min((Date.now()-start)/dur,1)); }, 50);
        };
        const finish=function(){ const was=reached; reached=false; self._cancel(barId); if(was){ cb(); } };
        el.addEventListener('mousedown', begin);
        el.addEventListener('touchstart', begin, {passive:false});
        el.addEventListener('mouseup', finish);
        el.addEventListener('touchend', finish);
        ['mouseleave','touchcancel'].forEach(ev=>el.addEventListener(ev, ()=>self._cancel(barId)));
    },
    _cancel: function(barId){ if(this._timer){clearTimeout(this._timer);this._timer=null;} if(this._raf){clearInterval(this._raf);this._raf=null;} this._bar(barId,0); },
    _bar: function(barId,p){ const b=document.getElementById(barId); if(b){ b.style.display=p>0?'block':'none'; b.style.width=(p*100)+'%'; } },
    open: function() {
        this.render();
        const m=document.getElementById('kioskModal'); if(m) m.style.display='flex';
        this._bar('kioskEnterBar',0);
        this._active=true;
        this._enterFs();
        this._tick(); this._clock=setInterval(()=>this._tick(), 1000);
        this._refresh=setInterval(()=>this.render(), 30000);
        kiosk._bindSearch();
        if(typeof kiosk.closeSearch==='function') kiosk.closeSearch();
    },
    close: function() {
        this._active=false;
        if(this._searchTimer){ clearTimeout(this._searchTimer); this._searchTimer=null; }
        try{ if(typeof this.closeSearch==='function') this.closeSearch(); }catch(e){}
        const m=document.getElementById('kioskModal'); if(m) m.style.display='none';
        this._bar('kioskExitBar',0);
        try{ if(this._isFs()){ const fn=document.exitFullscreen||document.webkitExitFullscreen||document.msExitFullscreen; if(fn) fn.call(document); } }catch(e){}
        if(this._clock){clearInterval(this._clock);this._clock=null;}
        if(this._refresh){clearInterval(this._refresh);this._refresh=null;}
    },
    _tick: function() {
        const n=new Date(), p=x=>String(x).padStart(2,'0');
        const c=document.getElementById('kioskClock'); if(c) c.textContent=p(n.getHours())+':'+p(n.getMinutes())+':'+p(n.getSeconds());
        const d=document.getElementById('kioskDate'); if(d){ const w=['일','월','화','수','목','금','토'][n.getDay()]; d.textContent=n.getFullYear()+'.'+p(n.getMonth()+1)+'.'+p(n.getDate())+' ('+w+')'; }
    },
    render: function() {
        const tb=document.getElementById('kioskTableBody'); if(!tb) return;
        const d=window._homeStatsData||{};
        const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
        const rooms=Object.entries(d).filter(([,r])=>{ const s=(r&&r.settings)||{}, st=(r&&r.status)||{}; if(s.hideFromBoard) return false; const hasCourse=!!(s.courseName&&String(s.courseName).trim()); return (st.roomStatus==='active'&&hasCourse)||ui._isThisWeek(s.period||''); }).sort((a,b)=>a[0].localeCompare(b[0]));
        if(!rooms.length){ tb.innerHTML='<tr><td colspan="8" style="text-align:center;padding:60px;color:#94a3b8;font-size:26px;background:transparent;">현재 진행 중인 과정이 없습니다.</td></tr>'; return; }
        const dormAll=window._dormRosters||{};
        const _status=function(period){
            const parts=String(period||'').split('~');
            const parse=x=>{ const dt=new Date(String(x).trim()); return isNaN(dt.getTime())?null:(dt.setHours(0,0,0,0),dt); };
            const today=new Date(); today.setHours(0,0,0,0);
            const sd=parse(parts[0]), ed=parse(parts[1]||parts[0]);
            if(!sd) return {t:'-',c:'#94a3b8'};
            if(today<sd) return {t:'예정',c:'#fbbf24'};
            if(ed && today>ed) return {t:'종료',c:'#94a3b8'};
            return {t:'진행중',c:'#34d399'};
        };
        kiosk._idx={}; kiosk._people=[];
        tb.innerHTML=rooms.map(([room,r],_i)=>{
            const s=r.settings||{}, st=r.status||{};
            // 교육생수 = 예정 인원 (지원부 명단/dorm rosters에서 과정명 매칭)
            let planned=0; const _cn=String(s.courseName||'').trim(); let _best=null;
            for(const _k in dormAll){ const _dv=dormAll[_k]; if(_dv&&Array.isArray(_dv.list)&&_dv.list.length&&String(_dv.courseName||'').trim()===_cn){ if(!_best||(_dv.updatedAt||0)>(_best.updatedAt||0)) _best=_dv; } }
            if(_best) planned=_best.list.length;
            try{ var _place=String(s.roomDetailName||'').trim();
                var _nm=[]; if(_best&&_best.list) _best.list.forEach(function(pp){ if(pp&&pp.name) _nm.push(String(pp.name).trim()); });
                var _stu=r.students||{}; for(var _tk in _stu){ if(_stu[_tk]&&_stu[_tk].name) _nm.push(String(_stu[_tk].name).trim()); }
                _nm.forEach(function(nn){ var _kk=nn.replace(/\s+/g,''); if(_kk && !kiosk._idx[_kk]){ var _o={room:room, course:(s.courseName||'-'), place:_place, num:(_i+1), type:'student', name:nn}; kiosk._idx[_kk]=_o; kiosk._people.push(_o); } });
                var _pf=String(st.professorName||'').trim(); if(_pf){ var _pk=_pf.replace(/\s+/g,''); if(_pk && !kiosk._idx[_pk]){ var _po={room:room, course:(s.courseName||'-'), place:_place, num:(_i+1), type:'prof', name:_pf}; kiosk._idx[_pk]=_po; kiosk._people.push(_po); } }
            }catch(e){}
            const prof=(st.professorName||'').trim();
            const coordRaw=(s.coordinatorName||'').trim();
            // 과정담당: 직책까지 합본 표시 (등록 명단과 매칭)
            const coord=(typeof coordMgr!=='undefined'&&coordMgr.matchName)?(coordMgr.matchName(coordRaw)||coordRaw):coordRaw;
            const stt=_status(s.period);
            return '<tr data-room="'+esc(room)+'">'
                +'<td style="font-weight:900;color:#60a5fa;white-space:nowrap;">'+(_i+1)+'</td>'
                +'<td style="font-weight:800;">'+esc(s.courseName||'-')+'</td>'
                +'<td style="white-space:nowrap;color:#cbd5e1;">'+esc(s.period||'-')+'</td>'
                +'<td style="color:#cbd5e1;">'+esc(s.roomDetailName||'-')+'</td>'
                +'<td style="font-weight:900;color:#34d399;">'+planned+'명</td>'
                +'<td style="white-space:nowrap;">'+(prof?esc(prof)+' 교수':'-')+'</td>'
                +'<td style="white-space:nowrap;color:#cbd5e1;">'+esc(coord||'-')+'</td>'
                +'<td><span style="display:inline-block;padding:5px 16px;border-radius:999px;font-weight:800;font-size:0.78em;color:'+stt.c+';background:'+stt.c+'22;border:1px solid '+stt.c+'66;">'+stt.t+'</span></td>'
            +'</tr>';
        }).join('');
    }
};
window.kiosk = kiosk;
// ===== [키오스크] 이름 검색 (교육지원부 방식: 표 슬라이드 + 온스크린 한글자판 + 물리키보드) =====
kiosk._idx = kiosk._idx || {};
kiosk._people = kiosk._people || [];
(function(){
  var CHO=['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  var JUNG=['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
  var JONG=['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  var BASE=0xAC00;
  var JUNG_COMB={'ㅗㅏ':'ㅘ','ㅗㅐ':'ㅙ','ㅗㅣ':'ㅚ','ㅜㅓ':'ㅝ','ㅜㅔ':'ㅞ','ㅜㅣ':'ㅟ','ㅡㅣ':'ㅢ'};
  var JONG_COMB={'ㄱㅅ':'ㄳ','ㄴㅈ':'ㄵ','ㄴㅎ':'ㄶ','ㄹㄱ':'ㄺ','ㄹㅁ':'ㄻ','ㄹㅂ':'ㄼ','ㄹㅅ':'ㄽ','ㄹㅌ':'ㄾ','ㄹㅍ':'ㄿ','ㄹㅎ':'ㅀ','ㅂㅅ':'ㅄ'};
  var JONG_SPLIT={'ㄳ':['ㄱ','ㅅ'],'ㄵ':['ㄴ','ㅈ'],'ㄶ':['ㄴ','ㅎ'],'ㄺ':['ㄹ','ㄱ'],'ㄻ':['ㄹ','ㅁ'],'ㄼ':['ㄹ','ㅂ'],'ㄽ':['ㄹ','ㅅ'],'ㄾ':['ㄹ','ㅌ'],'ㄿ':['ㄹ','ㅍ'],'ㅀ':['ㄹ','ㅎ'],'ㅄ':['ㅂ','ㅅ']};
  var JUNG_SPLIT={'ㅘ':'ㅗ','ㅙ':'ㅗ','ㅚ':'ㅗ','ㅝ':'ㅜ','ㅞ':'ㅜ','ㅟ':'ㅜ','ㅢ':'ㅡ'};
  function _isJung(j){ return JUNG.indexOf(j)>=0; }
  function _isCho(j){ return CHO.indexOf(j)>=0; }
  function _dec(ch){ var c=ch.charCodeAt(0)-BASE; if(c<0||c>11171) return null; return {cho:Math.floor(c/588),jung:Math.floor((c%588)/28),jong:c%28}; }
  function _cmp(ci,ji,ki){ return String.fromCharCode(BASE+(ci*21+ji)*28+ki); }
  kiosk._haInput=function(str,j){
    var last=str.slice(-1), rest=str.slice(0,-1), d=last?_dec(last):null;
    if(_isJung(j)){
      if(d){
        if(d.jong===0){ var comb=JUNG_COMB[JUNG[d.jung]+j]; if(comb) return rest+_cmp(d.cho,JUNG.indexOf(comb),0); return str+j; }
        var jc=JONG[d.jong];
        if(JONG_SPLIT[jc]){ var sp=JONG_SPLIT[jc], mc=CHO.indexOf(sp[1]); if(mc>=0) return rest+_cmp(d.cho,d.jung,JONG.indexOf(sp[0]))+_cmp(mc,JUNG.indexOf(j),0); }
        else { var mc2=CHO.indexOf(jc); if(mc2>=0) return rest+_cmp(d.cho,d.jung,0)+_cmp(mc2,JUNG.indexOf(j),0); }
        return str+j;
      } else if(last && _isCho(last)){ return rest+_cmp(CHO.indexOf(last),JUNG.indexOf(j),0); }
      return str+j;
    } else {
      if(d){
        if(d.jong===0){ var ji=JONG.indexOf(j); if(ji>0) return rest+_cmp(d.cho,d.jung,ji); return str+j; }
        var comb2=JONG_COMB[JONG[d.jong]+j]; if(comb2) return rest+_cmp(d.cho,d.jung,JONG.indexOf(comb2));
        return str+j;
      }
      return str+j;
    }
  };
  kiosk._haBackspace=function(str){
    if(!str) return str;
    var last=str.slice(-1), rest=str.slice(0,-1), d=_dec(last);
    if(!d) return rest;
    if(d.jong!==0){ var jc=JONG[d.jong]; if(JONG_SPLIT[jc]) return rest+_cmp(d.cho,d.jung,JONG.indexOf(JONG_SPLIT[jc][0])); return rest+_cmp(d.cho,d.jung,0); }
    if(d.jung!==0){ var ju=JUNG[d.jung]; if(JUNG_SPLIT[ju]) return rest+_cmp(d.cho,JUNG.indexOf(JUNG_SPLIT[ju]),0); return rest+CHO[d.cho]; }
    return rest;
  };
  kiosk._KB_ROWS=[
    [['ㅂ','ㅃ'],['ㅈ','ㅉ'],['ㄷ','ㄸ'],['ㄱ','ㄲ'],['ㅅ','ㅆ'],['ㅛ','ㅛ'],['ㅕ','ㅕ'],['ㅑ','ㅑ'],['ㅐ','ㅒ'],['ㅔ','ㅖ']],
    [['ㅁ','ㅁ'],['ㄴ','ㄴ'],['ㅇ','ㅇ'],['ㄹ','ㄹ'],['ㅎ','ㅎ'],['ㅗ','ㅗ'],['ㅓ','ㅓ'],['ㅏ','ㅏ'],['ㅣ','ㅣ']],
    [['ㅋ','ㅋ'],['ㅌ','ㅌ'],['ㅊ','ㅊ'],['ㅍ','ㅍ'],['ㅠ','ㅠ'],['ㅜ','ㅜ'],['ㅡ','ㅡ']]
  ];
})();

// ══ [N9] 과정현황 2안 — 표시 버튼을 전 과정 공통으로 설정 ══
ui._dashActionPath = 'system/sharedGuide/dashboardActionVisibility';
ui._dashActionMeta = [
  { key:'students',   label:'수강생 현황',       icon:'fa-user-graduate' },
  { key:'attendance', label:'OTP 출결',           icon:'fa-keyboard' },
  { key:'outing',     label:'외출·외박',          icon:'fa-person-walking-arrow-right' },
  { key:'dinner',     label:'석식 제외',           icon:'fa-utensils' },
  { key:'qa',         label:'실시간 Q&A',          icon:'fa-comments' },
  { key:'tablet',     label:'전자기기 대여',       icon:'fa-tablet-screen-button' },
  { key:'shuttle',    label:'셔틀 탑승 수요',      icon:'fa-bus' }
];
ui._dashActionConfig = {};
ui._dashActionMeta.forEach(function(item){ ui._dashActionConfig[item.key] = true; });

ui.applyDashActionConfig = function(raw){
  raw = (raw && raw.items) ? raw.items : (raw || {});
  var cfg = {};
  ui._dashActionMeta.forEach(function(item){
    cfg[item.key] = raw[item.key] !== false;
    document.querySelectorAll('[data-dash-action="'+item.key+'"]').forEach(function(el){
      el.classList.toggle('dash-action-hidden', !cfg[item.key]);
      el.setAttribute('aria-hidden', cfg[item.key] ? 'false' : 'true');
    });
  });
  ui._dashActionConfig = cfg;
  var list = document.querySelector('.dash-action-list');
  if(list){
    var hasVisibleRow = ui._dashActionMeta.some(function(item){
      return cfg[item.key] && !!list.querySelector('[data-dash-action="'+item.key+'"]');
    });
    list.classList.toggle('is-empty', !hasVisibleRow);
  }
};

ui._renderDashActionSettings = function(){
  var host = document.getElementById('dashActionSettingsList');
  if(!host) return;
  host.innerHTML = ui._dashActionMeta.map(function(item){
    var checked = ui._dashActionConfig[item.key] !== false ? ' checked' : '';
    return '<label class="dash-action-setting">'
      +'<span class="dash-setting-icon"><i class="fa-solid '+item.icon+'"></i></span>'
      +'<span class="dash-setting-label">'+item.label+'</span>'
      +'<input type="checkbox" data-dash-setting="'+item.key+'"'+checked+'>'
      +'<span class="dash-setting-switch" aria-hidden="true"></span>'
      +'</label>';
  }).join('');
};

ui.openDashActionSettings = function(){
  if(typeof state!=='undefined' && state.isObserver){
    ui.showAlert('👁️ 옵저버 모드에서는 버튼 구성을 변경할 수 없습니다.');
    return;
  }
  ui._renderDashActionSettings();
  var modal = document.getElementById('dashActionSettingsModal');
  if(modal) modal.style.display = 'flex';
};

ui.closeDashActionSettings = function(){
  var modal = document.getElementById('dashActionSettingsModal');
  if(modal) modal.style.display = 'none';
};

ui.resetDashActionSettings = function(){
  document.querySelectorAll('#dashActionSettingsList input[data-dash-setting]').forEach(function(input){
    input.checked = true;
  });
};

ui.saveDashActionSettings = async function(){
  var next = {};
  ui._dashActionMeta.forEach(function(item){
    var input = document.querySelector('#dashActionSettingsList input[data-dash-setting="'+item.key+'"]');
    next[item.key] = !input || input.checked;
  });
  try{
    await firebase.database().ref(ui._dashActionPath).set({
      items: next,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    });
    ui.applyDashActionConfig(next);
    ui.closeDashActionSettings();
    ui.showAlert('✅ 과정현황 버튼 구성을 저장했습니다.\n모든 과정과 강의실에 동일하게 적용됩니다.');
  }catch(err){
    ui.showAlert('❌ 버튼 구성 저장에 실패했습니다.\n'+(err&&err.message||err));
  }
};

ui.initDashActionSettings = function(){
  if(ui._dashActionRef) return;
  if(!(window.firebase && firebase.database)){
    setTimeout(ui.initDashActionSettings, 700);
    return;
  }
  try{
    ui._dashActionRef = firebase.database().ref(ui._dashActionPath);
    ui._dashActionRef.on('value', function(snap){
      ui.applyDashActionConfig(snap.val() || {});
    }, function(){
      ui.applyDashActionConfig({});
    });
  }catch(e){
    ui._dashActionRef = null;
    ui.applyDashActionConfig({});
  }
};
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', ui.initDashActionSettings);
}else{
  ui.initDashActionSettings();
}
kiosk._escK=function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); };
kiosk._bindSearch=function(){
  var self=this; if(this._searchBound) return; this._searchBound=true;
  var inp=document.getElementById('kioskSearch');
  if(inp){
    inp.addEventListener('focus', function(){ self.openSearchMode(); });
    inp.addEventListener('input', function(){ self._updateSearch(); });   // 물리 키보드 대응
  }
  var modal=document.getElementById('kioskModal');
  if(modal){ modal.addEventListener('click', function(e){
    if(!modal.classList.contains('search-on')) return;
    var t=e.target;
    if(t===inp || (t.closest && (t.closest('#kioskKbd')||t.closest('#kioskSearch')||t.closest('.kbhit')))) return;
    self.closeSearch();
  }); }
};
kiosk.openSearchMode=function(){
  var m=document.getElementById('kioskModal'); if(!m) return;
  this._buildKbd();
  m.classList.add('search-on');
  this._updateSearch();
};
kiosk.closeSearch=function(){
  if(this._searchTimer){ clearTimeout(this._searchTimer); this._searchTimer=null; }
  var m=document.getElementById('kioskModal'); if(m) m.classList.remove('search-on');
  var inp=document.getElementById('kioskSearch'); if(inp){ inp.value=''; try{ inp.blur(); }catch(e){} }
  this._kbShift=false; this._reflectShift();
};
kiosk._buildKbd=function(){
  var host=document.getElementById('kioskKbd'); if(!host||this._kbBuilt) return; this._kbBuilt=true;
  var self=this, rows='';
  this._KB_ROWS.forEach(function(row,ri){
    rows+='<div class="kbrow">';
    if(ri===2) rows+='<button class="kbk kbk-fn kbk-shift" data-act="shift">⇧</button>';
    row.forEach(function(k){ rows+='<button class="kbk" data-n="'+k[0]+'" data-s="'+k[1]+'">'+k[0]+'</button>'; });
    if(ri===0) rows+='<button class="kbk kbk-fn kbk-bs" data-act="bs">⌫</button>';
    rows+='</div>';
  });
  host.innerHTML='<div class="kbpanel">'+rows+'</div>';
  host.querySelectorAll('.kbk').forEach(function(b){
    b.addEventListener('mousedown', function(e){ e.preventDefault(); });
    b.addEventListener('click', function(e){ e.preventDefault();
      var act=b.getAttribute('data-act');
      if(act){ self.kbd(act); }
      else { self.kbd('j', self._kbShift? b.getAttribute('data-s') : b.getAttribute('data-n')); }
    });
  });
};
kiosk._reflectShift=function(){
  var host=document.getElementById('kioskKbd'); if(!host) return; var sh=this._kbShift;
  host.querySelectorAll('.kbk[data-n]').forEach(function(b){ b.textContent = sh? b.getAttribute('data-s') : b.getAttribute('data-n'); });
  var sk=host.querySelector('.kbk-shift'); if(sk) sk.classList.toggle('on', sh);
};
kiosk.kbd=function(type,val){
  var inp=document.getElementById('kioskSearch'); if(!inp) return;
  if(type==='shift'){ this._kbShift=!this._kbShift; this._reflectShift(); return; }
  if(type==='j'){ inp.value=this._haInput(inp.value,val); if(this._kbShift){ this._kbShift=false; this._reflectShift(); } }
  else if(type==='bs'){ inp.value=this._haBackspace(inp.value); }
  this._updateSearch();
};
kiosk._updateSearch=function(){
  var inp=document.getElementById('kioskSearch'), rEl=document.getElementById('kioskResult');
  if(!inp||!rEl) return;
  var self=this;
  if(this._searchTimer){ clearTimeout(this._searchTimer); this._searchTimer=null; }
  var q=(inp.value||'').trim();
  if(q){ this._searchTimer=setTimeout(function(){ self._searchTimer=null; self.closeSearch(); }, 5000); }
  if(!q){ rEl.innerHTML='<span class="kbhit-empty">이름을 입력하세요.</span>'; return; }
  var ql=q.replace(/\s+/g,'');
  var people=this._people||[]; var contains=[], exact=[];
  people.forEach(function(p){ var nm=String(p.name||'').replace(/\s+/g,''); if(nm===ql) exact.push(p); else if(nm.indexOf(ql)>=0) contains.push(p); });
  var show;
  if(exact.length){ show=exact; }
  else if(contains.length>1){ rEl.innerHTML='<span class="kbhit-empty">'+kiosk._escK(q)+' … 이름을 끝까지 입력해 주세요 <small style="opacity:.7;">('+contains.length+'명 검색됨)</small></span>'; return; }
  else if(contains.length===1){ show=contains; }
  else { rEl.innerHTML='<span class="kbhit-empty">'+kiosk._escK(q)+' 검색 결과가 없습니다.</span>'; return; }
  rEl.innerHTML='<div class="kbhit-wrap">'+show.slice(0,4).map(function(p){
    if(p.type==='prof'){
      return '<div class="kbhit prof">'
        +'<div class="kbhit-name">'+kiosk._escK(p.name)+' <span class="nim">강사님</span></div>'
        +(p.course?('<div class="kbhit-course">'+kiosk._escK(p.course)+'</div>'):'')
        +(p.place?('<div class="kbhit-room">'+kiosk._escK(p.place)+'</div>'):'')
        +'<div class="kbhit-guide">'+(p.place?'위 강의실로 ':'')+'방문해 주시면 감사드리겠습니다 🙇</div>'
        +'</div>';
    }
    return '<div class="kbhit"><div class="kbhit-name">'+kiosk._escK(p.name)+' <span class="nim">님</span></div>'
      +'<div class="kbhit-course">'+kiosk._escK(p.course)+'</div>'
      +(p.place?('<div class="kbhit-room">'+kiosk._escK(p.place)+'</div>'):'')+'</div>';
  }).join('')+'</div>';
};

// [공통] 모달 닫기(X) 버튼에 통일 hover 효과(.x-close: 90도 회전 + 빨강) 자동 적용
function _unifyXClose(root) {
    try {
        (root || document).querySelectorAll('button, i, span').forEach(el => {
            const cls = (typeof el.className === 'string') ? el.className : '';
            const isFaX = cls.indexOf('fa-xmark') >= 0 || cls.indexOf('fa-times') >= 0;
            const t = (el.childElementCount === 0 ? (el.textContent || '') : '').trim();
            const isTxtX = (t === '✕' || t === '×' || t === '✖' || t === '╳');
            if (!isFaX && !isTxtX) return;
            const target = (el.tagName === 'I' || el.tagName === 'SPAN') ? (el.closest('button') || el) : el;
            target.classList.add('x-close');
        });
    } catch (e) {}
}
window._unifyXClose = _unifyXClose;

window.onload = function() {
    dataMgr.checkMobile();
    profMgr.init();
    coordMgr.init();
    guideMgr.init();
    ui.startHeaderClock(); // 헤더 날짜/시간 시계 시작
    dataMgr.initSystem();
    outingReturnCheck.init();  // 외출·외박 복귀 확인 팝업(07:00~08:59) 점검 시작
    outingAutoReturn.init();   // 외출·외박 자동 복귀완료 sweep(다음날 08:59) — 교육운영부 닫혀 있어도 동작
    kiosk.init();              // 키오스크 모드(비행기 아이콘 3초 롱프레스) 활성화
    /* [J11] 판독 시간표 시트는 ui.openParsedSchedule/closeParsedSchedule로 동작 (아래 전역 정의) */
    setTimeout(_unifyXClose, 500); // 모달 X 닫기 버튼 hover 효과 통일
    // [강의 모니터링] 마이크는 강의실에 입장(강의 시작)할 때 동의받아 켭니다. (lectureMonitor.syncStatus)
};







// [최종 수정] 바깥 영역 클릭 시 모든 드롭다운 및 모달 자동 닫기 기능
window.onclick = function(event) {
    // 1. 교육 관리 드롭다운 메뉴 외 클릭 시 닫기
    if (!event.target.matches('.dropdown-trigger') && !event.target.closest('.dropdown-trigger')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].style.display === "block") {
                dropdowns[i].style.display = "none";
            }
        }
    }

    // 2. [추가된 로직] 유관 시스템 바로가기 메뉴 외 클릭 시 접기
    const familyMenu = document.getElementById('familySiteMenu');
    const familyChevron = document.getElementById('familyChevron');
    
    // 메뉴가 열려있는 상태인지 확인
    if (familyMenu && familyMenu.style.display === 'flex') {
        // 클릭한 대상이 '메뉴 버튼'도 아니고 '메뉴 내부'도 아니라면 닫기 실행
        const isClickInsideButton = event.target.closest('button[onclick*="toggleFamilySites"]');
        const isClickInsideMenu = familyMenu.contains(event.target);

        if (!isClickInsideButton && !isClickInsideMenu) {
            familyMenu.style.display = 'none';
            if (familyChevron) {
                familyChevron.classList.replace('fa-chevron-down', 'fa-chevron-up');
            }
        }
    }

    // 3. 알림창 배경 클릭 시 닫기
    const alertModal = document.getElementById('customAlertModal');
    if (event.target === alertModal) {
        ui.closeAlert();
    }
    
    // 4. Q&A 상세창 배경 클릭 시 닫기
    const qaModal = document.getElementById('qaModal');
    if (event.target === qaModal) {
        ui.closeQaModal();
    }
};
/* ===== [사이드바 수동 토글 고정 방식] ===== */
// 호버(mouseenter/mouseleave) 자동 개폐 완전 제거.
// 토글은 ui.toggleSidebar() 버튼 클릭으로만 동작하며, 열리면 고정 유지됨.

/* ══ 시험 타이머 (Time Timer 방식) ══ */
const examTimer = {
    maxSec: 60 * 60,   // 기본 60분 (초 단위)
    remainSec: 60 * 60,
    _interval: null,
    _running: false,

    // 원 둘레: 2π × 140 ≈ 879.65
    _circumference: 2 * Math.PI * 140,

    _arc: function() { return document.getElementById('timerArc'); },
    _display: function() { return document.getElementById('timerDisplay'); },
    _status: function() { return document.getElementById('timerStatus'); },
    _maxDisp: function() { return document.getElementById('timerMaxDisplay'); },

    _fmt: function(sec) {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2,'0')}<span id="timerColon" style="animation:blink-animation 1s steps(2,start) infinite;">:</span>${String(s).padStart(2,'0')}`;
    },

    _render: function() {
        const arc = this._arc();
        const disp = this._display();
        if (!arc || !disp) return;
        // 남은 비율만큼 원호 표시 (1 = 꽉 참, 0 = 비어있음)
        const ratio = this.remainSec / this.maxSec;
        const offset = this._circumference * (1 - ratio);
        arc.style.strokeDashoffset = offset;
        // 30% 이하 주황, 10% 이하 회색 (종료 임박 표시)
        arc.style.stroke = ratio > 0.3 ? '#ef4444' : ratio > 0.1 ? '#f97316' : '#94a3b8';
        disp.innerHTML = this._fmt(this.remainSec);
    },

    start: function() {
        if (this._running) return;
        if (this.remainSec <= 0) this.reset();
        this._running = true;
        const s = this._status();
        const btn = document.getElementById('timerStartBtn');
        if (s) s.innerText = '시험 진행 중';
        if (btn) btn.style.background = '#94a3b8';
        this._interval = setInterval(() => {
            if (this.remainSec <= 0) {
                this.stop();
                const s2 = this._status();
                if (s2) s2.innerText = '⏰ 시험 종료!';
                const arc = this._arc();
                if (arc) arc.style.stroke = '#94a3b8';
                return;
            }
            this.remainSec--;
            this._render();
        }, 1000);
    },

    pause: function() {
        if (!this._running) return;
        this._running = false;
        clearInterval(this._interval);
        const s = this._status();
        if (s) s.innerText = '일시정지';
        const btn = document.getElementById('timerStartBtn');
        if (btn) btn.style.background = '#ef4444';
    },

    stop: function() {
        this._running = false;
        clearInterval(this._interval);
    },

    reset: function() {
        this.stop();
        this.remainSec = this.maxSec;
        this._render();
        const s = this._status();
        const btn = document.getElementById('timerStartBtn');
        if (s) s.innerText = '대기 중';
        if (btn) btn.style.background = '#ef4444';
    },

    adjustMax: function(deltaMin) {
        this.stop();
        const newMin = Math.max(5, Math.round(this.maxSec / 60) + deltaMin);
        this.maxSec = newMin * 60;
        this.remainSec = this.maxSec;
        const d = this._maxDisp();
        if (d) d.innerText = `${newMin}분`;
        this._render();
        const s = this._status();
        if (s) s.innerText = '대기 중';
        const btn = document.getElementById('timerStartBtn');
        if (btn) btn.style.background = '#ef4444';
    },

    // 탭 진입 시 호출 (렌더 초기화)
    init: function() {
        this._render();
    }
};

/* ══ 배경음악 플레이어 (BGM Player) ══
   음원: GitHub 저장소(kac-edu/CATC)에 올라온 "배경음N" 음원을 모두 자동 인식.
   → 깃허브에 배경음16, 17 … 을 추가만 하면 코드 수정 없이 곧바로 재생됩니다.
   https://raw.githubusercontent.com/kac-edu/CATC/main/
*/
const bgmPlayer = {
    _audio: null,
    _currentNum: -1,   // 현재 재생 중인 트랙 번호
    _prevNum: -1,       // 중복 방지용 이전 번호
    _panelOpen: false,
    _isPlaying: false,

    // GitHub 저장소 정보 (음원 목록 자동 조회용)
    _OWNER: 'kac-edu',
    _REPO: 'CATC',
    _BRANCH: 'main',
    _BASE_URL: 'https://raw.githubusercontent.com/kac-edu/CATC/main/',
    _LS_VOL: 'kac_bgm_vol',
    _SS_STATE: 'kac_bgm_state',     // sessionStorage: 새로고침 시 이어듣기용
    _LS_TRACKS: 'kac_bgm_tracks',   // localStorage: 음원 목록 캐시
    _TRACKS_TTL: 6 * 60 * 60 * 1000,// 캐시 유효시간 6시간
    _AUDIO_EXT: ['mp3','m4a','aac','ogg','oga','wav','opus','flac'],

    _nums: [],          // 재생 가능한 트랙 번호 목록 (예: [1,2,...,15,16,17])
    _fileByNum: {},     // 번호 → 실제 파일명 (확장자 보존: 배경음7.m4a 등)

    // (1) 캐시(localStorage)에서 목록 즉시 로드. 없으면 기본 1~15로 시작.
    _loadTracks: function() {
        try {
            const raw = localStorage.getItem(this._LS_TRACKS);
            if (raw) {
                const c = JSON.parse(raw);
                if (c && Array.isArray(c.nums) && c.nums.length) {
                    this._nums = c.nums.slice();
                    this._fileByNum = c.files || {};
                    return;
                }
            }
        } catch (e) {}
        this._nums = Array.from({ length: 15 }, (_, i) => i + 1);  // 폴백(조회 성공 시 즉시 갱신)
        this._fileByNum = {};
    },

    // (2) 음원 목록 자동 조회: ① GitHub API → 실패 시 ② raw 직접 탐색(probe). 결과 캐시.
    _discover: async function() {
        try {  // 캐시가 충분히 최신이면 재조회 생략
            const raw = localStorage.getItem(this._LS_TRACKS);
            if (raw) {
                const c = JSON.parse(raw);
                if (c && c.ts && (Date.now() - c.ts) < this._TRACKS_TTL && Array.isArray(c.nums) && c.nums.length) {
                    this._nums = c.nums.slice();
                    this._fileByNum = c.files || {};
                    return;
                }
            }
        } catch (e) {}

        let result = null;
        // ① GitHub Contents API (확장자·중간 누락까지 정확히 인식)
        try {
            const api = `https://api.github.com/repos/${this._OWNER}/${this._REPO}/contents?ref=${this._BRANCH}`;
            const res = await fetch(api, { headers: { 'Accept': 'application/vnd.github.v3+json' } });
            if (res.ok) {
                const list = await res.json();
                if (Array.isArray(list)) {
                    const re = new RegExp(`^배경음(\\d+)\\.(${this._AUDIO_EXT.join('|')})$`, 'i');
                    const nums = [], files = {};
                    list.forEach(it => {
                        if (!it || it.type !== 'file' || !it.name) return;
                        const m = it.name.match(re);
                        if (m) { const n = parseInt(m[1], 10); nums.push(n); files[n] = it.name; }
                    });
                    if (nums.length) { nums.sort((a, b) => a - b); result = { nums, files }; }
                }
            }
        } catch (e) {}

        // ② API 실패(레이트리밋 등) → raw 경로 직접 탐색으로 대체 (GitHub API 한도와 무관)
        if (!result) result = await this._probe();

        if (result && result.nums.length) {
            this._nums = result.nums;
            this._fileByNum = result.files;
            try { localStorage.setItem(this._LS_TRACKS, JSON.stringify({ ts: Date.now(), nums: result.nums, files: result.files })); } catch (e) {}
            this._syncBadge();
        }
    },

    // raw.githubusercontent 에서 배경음N.mp3 를 1번부터 순차 확인 (API 한도 영향 없음)
    _probe: async function() {
        const nums = [], files = {};
        let miss = 0;
        for (let n = 1; n <= 80 && miss < 3; n++) {     // 연속 3개 비면 종료(중간 누락 일부 허용)
            const url = this._BASE_URL + encodeURIComponent(`배경음${n}.mp3`);
            let ok = false;
            try { const r = await fetch(url, { method: 'HEAD', cache: 'no-store' }); ok = r.ok; } catch (e) { ok = false; }
            if (ok) { nums.push(n); files[n] = `배경음${n}.mp3`; miss = 0; }
            else { miss++; }
        }
        return nums.length ? { nums, files } : null;
    },

    // 트랙 번호 → URL (실제 파일명 우선, 없으면 배경음N.mp3)
    _url: function(num) {
        const fname = this._fileByNum[num] || `배경음${num}.mp3`;
        return this._BASE_URL + encodeURIComponent(fname);
    },

    // 현재 재생 상태를 sessionStorage에 저장 (새로고침 후 이어듣기)
    _saveState: function() {
        try {
            if (this._currentNum > 0 && this._isPlaying && this._audio) {
                sessionStorage.setItem(this._SS_STATE, JSON.stringify({
                    num: this._currentNum,
                    time: this._audio.currentTime || 0,
                    playing: true
                }));
            } else {
                sessionStorage.removeItem(this._SS_STATE);
            }
        } catch (e) {}
    },

    init: function() {
        this._loadTracks();   // 캐시/기본 음원 목록 즉시 로드
        this._discover();     // GitHub에서 최신 음원 목록 자동 갱신(비동기, 실패해도 무방)
        this._audio = new Audio();
        this._audio.loop = false;  // 곡이 끝나면 onended로 다음 랜덤 곡 재생

        // 볼륨 복원
        const savedVol = parseFloat(localStorage.getItem(this._LS_VOL) ?? '0.4');
        this._audio.volume = savedVol;
        const volSlider = document.getElementById('bgmVolume');
        if (volSlider) volSlider.value = Math.round(savedVol * 100);

        // 곡 종료 시 자동으로 다음 랜덤 곡 재생
        this._audio.onended = () => {
            if (this._isPlaying) this.playRandom();
        };

        // 재생 위치를 주기적으로 저장 (새로고침 이어듣기)
        this._audio.addEventListener('timeupdate', () => {
            if (this._isPlaying) this._saveState();
        });
        // 페이지 떠나기 직전에도 저장
        window.addEventListener('beforeunload', () => this._saveState());

        // ── Ctrl+Shift+R(하드 리로드) 감지 → 음악 상태 완전 리셋 ──
        //   (일반 새로고침/플랫폼 제목 클릭 시에는 아래 복원 로직으로 이어듣기)
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'R' || e.key === 'r')) {
                try { sessionStorage.removeItem(this._SS_STATE); } catch (err) {}
                // 기본 동작(하드 리로드)은 그대로 진행됨 → 음악 리셋
            }
        });

        // ── 저장된 상태가 있으면 이어듣기 복원 ──
        let restored = false;
        try {
            const raw = sessionStorage.getItem(this._SS_STATE);
            if (raw) {
                const st = JSON.parse(raw);
                if (st && st.num > 0 && st.playing) {
                    this._currentNum = st.num;
                    this._audio.src = this._url(st.num);
                    this._audio.load();
                    const resumeAt = st.time || 0;
                    const tryResume = () => {
                        try { this._audio.currentTime = resumeAt; } catch (e) {}
                        this._audio.play().then(() => {
                            this._isPlaying = true;
                            this._syncBadge();
                        }).catch(() => {
                            // 브라우저 자동재생 차단 시: 사용자가 한 번 클릭하면 이어재생
                            const resumeOnce = () => {
                                this._audio.play().then(() => { this._isPlaying = true; this._syncBadge(); }).catch(()=>{});
                                document.removeEventListener('click', resumeOnce);
                            };
                            document.addEventListener('click', resumeOnce);
                        });
                    };
                    if (this._audio.readyState >= 1) tryResume();
                    else this._audio.addEventListener('loadedmetadata', tryResume, { once: true });
                    restored = true;
                }
            }
        } catch (e) {}

        this._renderPanel();
        this._syncBadge();

        // 창 크기 변경 시 위치 재계산
        window.addEventListener('resize', () => this._syncBadge());
    },

    // 중복 방지 랜덤 트랙 번호 (방금 재생한 곡 제외) — 실제 보유 목록(_nums)에서 추출
    _randomNum: function() {
        const pool = (this._nums && this._nums.length) ? this._nums : [1];
        if (pool.length === 1) return pool[0];
        let num;
        do {
            num = pool[Math.floor(Math.random() * pool.length)];
        } while (num === this._currentNum);   // 현재(방금) 곡과 다르게 → 연속 중복 방지
        return num;
    },

    // 배경음 켜기/끄기 토글 (켜면 무작위로 끊김없이 계속 재생)
    toggleBgm: function() {
        if (!this._audio) this.init();
        if (this._isPlaying) {
            this.stop();
        } else if (this._currentNum > 0) {
            this.play();        // 이어듣기
        } else {
            this.playRandom();  // 처음 켜기 → 무작위 시작
        }
    },

    // 랜덤 트랙 재생
    playRandom: function() {
        if (!this._audio) this.init();
        const num = this._randomNum();
        this._prevNum = this._currentNum;
        this._currentNum = num;
        this._audio.src = this._url(num);
        this._audio.load();
        this._audio.play().then(() => {
            this._isPlaying = true;
            this._renderPanel();
            this._syncBadge();
            this._saveState();
        }).catch(() => {});
    },

    _syncBadge: function() {
        const iconBtn = document.getElementById('bgmIconBtn');
        // 음악 아이콘: 재생 중이면 주황으로 빛남
        if (iconBtn) {
            if (this._isPlaying && this._currentNum > 0) {
                iconBtn.style.color = '#f97316';
                iconBtn.classList.add('bgm-playing');
            } else {
                iconBtn.style.color = '';
                iconBtn.classList.remove('bgm-playing');
            }
        }
        // 통합 주황 바: 재생 시작되면 자동으로 띄움, 상태 텍스트/애니메이션 갱신
        const bar = document.getElementById('bgmNowBubble');
        const barText = document.getElementById('bgmNowBubbleText');
        if (bar) {
            if (this._isPlaying && this._currentNum > 0) {
                if (barText) barText.innerText = `배경음 ${this._currentNum}번 재생 중`;
                bar.style.display = 'flex';
                bar.classList.add('playing');   // 재생 중 → 이퀄라이저 움직임
                this._panelOpen = true;
            } else {
                // 일시정지/정지/대기 → 막대 정지
                bar.classList.remove('playing');
                if (this._currentNum > 0) {
                    if (barText) barText.innerText = `배경음 ${this._currentNum}번 (일시정지)`;
                } else {
                    if (barText) barText.innerText = '배경음악';
                }
            }
        }
        // 켜기/끄기 토글 버튼 라벨·아이콘 동기화
        const tLabel = document.getElementById('bgmToggleLabel');
        const tIcon  = document.getElementById('bgmToggleIcon');
        if (tLabel) tLabel.innerText = this._isPlaying ? '배경음 끄기' : '배경음 켜기';
        if (tIcon)  tIcon.className  = this._isPlaying ? 'fa-solid fa-stop' : 'fa-solid fa-music';
    },

    _renderPanel: function() {
        this._syncBadge();
    },

    play: function() {
        if (!this._audio) this.init();
        if (this._currentNum < 0) {
            this.playRandom();
            return;
        }
        this._audio.play().then(() => {
            this._isPlaying = true;
            this._syncBadge();
            this._saveState();
        }).catch(() => {});
    },

    pause: function() {
        if (!this._audio) return;
        this._audio.pause();
        this._isPlaying = false;
        this._syncBadge();
        this._saveState();
    },

    stop: function() {
        if (!this._audio) return;
        this._audio.pause();
        this._audio.currentTime = 0;
        this._isPlaying = false;
        this._currentNum = -1;
        this._prevNum = -1;
        this._syncBadge();
        try { sessionStorage.removeItem(this._SS_STATE); } catch (e) {}
        // 정지 시 주황 바 닫기
        const bar = document.getElementById('bgmNowBubble');
        if (bar) bar.style.display = 'none';
        this._panelOpen = false;
    },

    setVolume: function(val) {
        if (!this._audio) return;
        this._audio.volume = val / 100;
        localStorage.setItem(this._LS_VOL, val / 100);
    },

    togglePanel: function() {
        if (!this._audio) this.init();
        const bar = document.getElementById('bgmNowBubble');
        if (!bar) return;
        this._panelOpen = !this._panelOpen;
        bar.style.display = this._panelOpen ? 'flex' : 'none';
        if (this._panelOpen) {
            const txt = document.getElementById('bgmNowBubbleText');
            if (txt) txt.innerText = (this._isPlaying && this._currentNum > 0)
                ? `배경음 ${this._currentNum}번 재생 중` : '배경음악';
        }
    }
};

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => bgmPlayer.init());

/* ══════════════════════════════════════════════════════════════
   연간 교육운영계획 일괄 업로드 & Room 자동 배치 v3 (최종)
   - sheet_to_json 대신 셀 직접 접근 방식으로 파싱 안정화
   - 날짜: 문자열/숫자/serial 모두 처리
   ══════════════════════════════════════════════════════════════ */

const CLASSROOM_DETAIL_GROUPS_SHARED = window.CLASSROOM_DETAIL_GROUPS_SHARED || [
    { label: '비대면', items: ['온라인(Zoom)'] },
    { label: '하늘관', items: ['하늘관 1층 대강당','하늘관 1층 소회의실','하늘관 2층 A강의실','하늘관 2층 B강의실 (전산실)','하늘관 2층 C강의실','하늘관 2층 D강의실','하늘관 2층 E강의실','하늘관 2층 F강의실','하늘관 2층 G강의실','하늘관 3층 회의실'] },
    { label: '국제동', items: ['국제동 1층 세미나홀','국제동 1층 A강의실','국제동 1층 B강의실','국제동 2층 ILS 실습실','국제동 2층 VCCS/RADIO/ATIS 실습실','국제동 2층 VOR/DME/TACAN 실습실','국제동 2층 종합실습실'] },
    { label: '관제교육동', items: ['관제교육동 1층','관제교육동 2층'] },
    { label: '서울', items: ['항공보안교육센터','항공훈련센터'] }
];
window.CLASSROOM_DETAIL_GROUPS_SHARED = CLASSROOM_DETAIL_GROUPS_SHARED;
// [공용 강의실] 강사 플랫폼 '강의실 추가'로 system/classrooms 에 저장된 사용자 정의 강의실을 그룹에 병합
window.__customRooms = window.__customRooms || {};
function _effectiveGroupsShared(){
    const out = CLASSROOM_DETAIL_GROUPS_SHARED.map(g => ({label:g.label, items:g.items.slice()}));
    const by = window.__customRooms || {};
    Object.keys(by).forEach(b => {
        let grp = out.find(g => g.label === b);
        if (!grp) { grp = {label:b, items:[]}; out.push(grp); }
        (by[b]||[]).forEach(n => { if (n && grp.items.indexOf(n) < 0) grp.items.push(n); });
    });
    return out;
}
// inUse: Set(동일기간 사용중 강의실명) — 비활성+'(사용중)' 표기 / '__direct__' = 직접입력
function classroomDetailSelectHtmlInstructor(value, changeExpr, styleText, inUse) {
    const current = String(value || '').trim();
    const esc = v => String(v || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const groups = _effectiveGroupsShared();
    const flat = groups.flatMap(g => g.items);
    const custom = current && !flat.includes(current) ? '<option value="' + esc(current) + '" selected>' + esc(current) + '</option>' : '';
    const optHtml = item => {
        const used = inUse && inUse.has && inUse.has(item) && item !== current;
        return '<option value="' + esc(item) + '"' + (item === current ? ' selected' : '') + (used ? ' disabled' : '') + '>' + esc(item) + (used ? ' (사용중)' : '') + '</option>';
    };
    return '<select onchange="' + esc(changeExpr) + '" style="' + esc(styleText) + '">' +
        '<option value="">-- 장소 선택 --</option>' + custom +
        groups.map(g => '<optgroup label="' + esc(g.label) + '">' + g.items.map(optHtml).join('') + '</optgroup>').join('') +
        '<option value="__direct__">✏️ 직접 입력…</option>' +
        '</select>';
}

const annualPlanMgr = {

    ROOMS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    PLAN_KEY: 'system/annualPlan',

    /* 엑셀 Serial 또는 숫자문자열 → YYYY-MM-DD */
    _excelDate: function(v) {
        let n = typeof v === 'number' ? v : parseFloat(v);
        if (!isNaN(n) && n > 40000) {
            // UTC 기준으로 변환 (엑셀은 1900-01-01 기준, 단 1900-02-29 버그 포함)
            const ms = (n - 25569) * 86400 * 1000;
            const d = new Date(ms);
            const y = d.getUTCFullYear();
            const m = String(d.getUTCMonth() + 1).padStart(2, '0');
            const day = String(d.getUTCDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        }
        return null;
    },

    _getMondayOf: function(dateStr) {
        const d = new Date(dateStr + 'T00:00:00Z');
        const day = d.getUTCDay();
        const diff = day === 0 ? -6 : 1 - day;
        d.setUTCDate(d.getUTCDate() + diff);
        return d.toISOString().split('T')[0];
    },

    _today: function() {
        // KST(UTC+9) 기준 날짜 반환.
        // toISOString()은 UTC 기준이라 토요일 00:00~08:59 KST 구간에도
        // UTC상 금요일로 인식되어 차주 전환이 09:00까지 지연됐던 문제 수정.
        const d = new Date();
        d.setTime(d.getTime() + 9 * 60 * 60 * 1000); // UTC → KST
        return d.toISOString().split('T')[0];
    },

    /* ── 컬럼 문자 → 0-indexed 숫자 (A→0, B→1, ...) ── */
    _colToIdx: function(col) {
        let n = 0;
        for (const ch of col) n = n * 26 + ch.charCodeAt(0) - 64;
        return n - 1;
    },

    upload: async function(input) {
        const file = input.files[0];
        if (!file) return;
        input.value = '';

        const statusEl = document.getElementById('annualPlanStatus');
        if (statusEl) { statusEl.innerText = '⏳ 분석 중...'; statusEl.style.color = '#f59e0b'; }

        try {
            const buf = await file.arrayBuffer();
            const wb  = XLSX.read(buf, { type: 'array', cellText: false, cellDates: false });

            // ── 시트 접근: SheetNames 인덱스로 직접 접근하여 한글 키 불일치 완전 우회
            // wb.Sheets[sheetName] 방식은 xlsx.js 내부 인코딩 불일치로 undefined 반환 가능.
            // SheetNames 순서와 Sheets 객체 순서는 항상 일치하므로 인덱스로 꺼냄.
            const sheetIdx  = wb.SheetNames.findIndex(n => n.replace(/\s/g,'').includes('총괄'));
            const useIdx    = sheetIdx >= 0 ? sheetIdx : 0;
            const sheetName = wb.SheetNames[useIdx];
            // Sheets 객체를 배열로 변환해 인덱스로 접근 → 키 매칭 완전 우회
            const ws        = Object.values(wb.Sheets)[useIdx];
            console.log('[annualPlanMgr] 시트:', sheetName, '| index:', useIdx);

            if (!ws) {
                throw new Error(`시트를 열 수 없습니다.\n등록된 시트: ${wb.SheetNames.join(', ')}`);
            }

            // !ref 누락 방어: 데이터 범위 정보가 없으면 넓은 범위 강제 주입
            if (!ws['!ref']) {
                ws['!ref'] = XLSX.utils.encode_range({ s:{c:0,r:0}, e:{c:25,r:499} });
            }

            const range = XLSX.utils.decode_range(ws['!ref']);

            // ── 헤더 행 탐색 (상위 30행): '연번'과 '과정명'이 같이 있는 행
            // 실제 파일: 1~12행 메타데이터, 13행(r=12)에 컬럼 헤더 위치
            // 셀 값 정규화: \r\n·공백·괄호 제거 후 비교 → '교육일정확인\n(운영부)' 도 매칭
            let headerRow = -1;
            const colMap  = {};

            for (let r = range.s.r; r <= Math.min(range.s.r + 30, range.e.r); r++) {
                const norm = {}; // col → 정규화된 문자열
                for (let c = range.s.c; c <= range.e.c; c++) {
                    const cell = ws[XLSX.utils.encode_cell({r, c})];
                    if (cell && cell.v != null) {
                        norm[c] = String(cell.v).replace(/[\r\n\s()（）]/g, '');
                    }
                }
                const vals = Object.values(norm);
                if (vals.includes('연번') && vals.includes('과정명')) {
                    headerRow = r;
                    for (const [c, v] of Object.entries(norm)) {
                        const ci = parseInt(c);
                        if (v === '연번')               colMap.no    = ci; // B열(1)
                        if (v === '과정명')             colMap.name  = ci; // H열(7)
                        if (v === '담임교수' && colMap.prof  == null) colMap.prof  = ci; // F열(5) 첫번째만
                        if (v.includes('교육일정확인')) colMap.coord = ci; // E열(4)
                        if (v === '교육시작일')         colMap.start = ci; // N열(13)
                        if (v === '교육종료일')         colMap.end   = ci; // O열(14)
                    }
                    console.log('[annualPlanMgr] 헤더 행:', r + 1, colMap);
                    break;
                }
            }

            if (headerRow < 0) {
                throw new Error('헤더 행을 찾을 수 없습니다.\n총괄표 시트에 "연번"과 "과정명" 컬럼이 필요합니다.');
            }

            // ── 데이터 파싱
            const courses = [];
            for (let r = headerRow + 1; r <= range.e.r; r++) {
                try {
                    const get = c => ws[XLSX.utils.encode_cell({r, c})];

                    const noCell = get(colMap.no);
                    if (!noCell) continue;
                    const no = parseInt(noCell.v);
                    if (isNaN(no)) continue;

                    const nameCell = get(colMap.name);
                    if (!nameCell || !nameCell.v) continue;

                    const startDate = this._excelDate(get(colMap.start)?.v);
                    const endDate   = this._excelDate(get(colMap.end)?.v);
                    if (!startDate || !endDate) continue;

                    const profRaw = get(colMap.prof)?.v  ? String(get(colMap.prof).v)  : '';
                    const coordRaw= get(colMap.coord)?.v ? String(get(colMap.coord).v) : '';

                    courses.push({
                        no,
                        name:      String(nameCell.v).trim(),
                        startDate, endDate,
                        period:    `${startDate} ~ ${endDate}`,
                        prof:      profRaw.split(/[,，、\/]/)[0].trim(),
                        coord:     coordRaw.replace(/[\r\n]/g,'').trim(),
                        weekKey:   this._getMondayOf(startDate)
                    });
                } catch (rowErr) {
                    console.warn(`[annualPlanMgr] 행 ${r+1} 스킵:`, rowErr);
                }
            }

            if (courses.length === 0) throw new Error('파싱된 과정이 없습니다.');

            await this._assignRooms(courses);

            if (statusEl) { statusEl.innerText = `✅ ${courses.length}개 과정 적용됨`; statusEl.style.color = '#10b981'; }
            ui.showAlert(`✅ 업로드 완료!\n총 ${courses.length}개 과정을 자동 배치했습니다.`);

        } catch (err) {
            console.error('[annualPlanMgr] 오류:', err);
            if (statusEl) { statusEl.innerText = '❌ ' + err.message.split('\n')[0]; statusEl.style.color = '#ef4444'; }
            ui.showAlert('❌ 업로드 오류:\n' + err.message);
        }
    },

    _assignRooms: async function(courses) {
        // 전체 방 초기화 (단, 잠금(autoAssignLocked) 방은 건드리지 않음)
        const lockSnap = await firebase.database().ref('courses').once('value');
        const lockData = lockSnap.val() || {};
        const reset = {};
        for (const r of this.ROOMS) {
            if (lockData[r] && lockData[r].settings && lockData[r].settings.autoAssignLocked) continue;
            reset[`courses/${r}/settings/courseName`] = '';
            reset[`courses/${r}/settings/period`]     = '';
            reset[`courses/${r}/settings/coordinatorName`] = null;
            reset[`courses/${r}/status/professorName`] = '';
            reset[`courses/${r}/status/roomStatus`]   = 'idle';
            reset[`courses/${r}/status/ownerSessionId`] = null;
        }
        await firebase.database().ref().update(reset);

        // 전체 과정 저장 (만료 체크용)
        const planData = {};
        courses.forEach((c, i) => { planData[`c${i}`] = c; });
        await firebase.database().ref(this.PLAN_KEY).set(planData);

        await this._applyCurrentWeek(courses);
    },

    // 대상 주(월~일)의 월요일 키 계산.
    //  토요일(6)·일요일(0)에는 '다음 주'를 대상으로 한다 → 토요일부터 차주 과정으로 전환.
    _getTargetMonday: function(todayStr) {
        const d = new Date(todayStr + 'T00:00:00Z');
        const dow = d.getUTCDay(); // 0=일 ... 6=토
        const mon = this._getMondayOf(todayStr);
        if (dow === 6 || dow === 0) {
            // 주말이면 다음 주 월요일
            const m = new Date(mon + 'T00:00:00Z');
            m.setUTCDate(m.getUTCDate() + 7);
            return m.toISOString().split('T')[0];
        }
        return mon;
    },

    // 수동 리셋되어 이번 대상 주 자동배치에서 제외할 과정(과정명|기간) Set 반환
    _getDismissedSet: async function(weekKey) {
        const set = new Set();
        try {
            const snap = await firebase.database().ref(`system/dismissedCourses/${weekKey}`).once('value');
            const obj = snap.val() || {};
            Object.values(obj).forEach(d => {
                if (d && d.name) set.add(`${(d.name||'').trim()}|${(d.period||'').trim()}`);
            });
        } catch (e) {}
        return set;
    },

    _applyCurrentWeek: async function(courses) {
        const today = this._today();
        // 대상 주(이번주 또는 토요일부터는 차주) 월~일 범위
        const targetMon = this._getTargetMonday(today);
        const targetSunObj = new Date(targetMon + 'T00:00:00Z');
        targetSunObj.setUTCDate(targetSunObj.getUTCDate() + 6);
        const targetSun = targetSunObj.toISOString().split('T')[0];

        // 대상 주에 '걸치는' 과정만 (과정 기간이 그 주와 겹치면 포함). 미래/지난 주 과정은 제외.
        const weekCourses = courses
            .filter(c => c.startDate && c.endDate)
            .filter(c => !c.cancelled)
            .filter(c => c.startDate <= targetSun && c.endDate >= targetMon)
            .filter(c => c.endDate >= today)
            .sort((a, b) => a.startDate.localeCompare(b.startDate));

        // [Clean Start 준비] 각 방의 현재 과정명을 먼저 읽어둔다 (과정 교체 감지용)
        const curSnap = await firebase.database().ref('courses').once('value');
        const curRooms = curSnap.val() || {};

        // 잠금(autoAssignLocked) 방은 자동배치에서 제외
        const openRooms = this.ROOMS.filter(r => !(curRooms[r] && curRooms[r].settings && curRooms[r].settings.autoAssignLocked));

        // 잠긴 방에 이미 들어있는 (과정명|기간) 집합 — 동일 과정은 다른 방에 중복 배치하지 않음
        const lockedKeys = new Set();
        this.ROOMS.forEach(r => {
            const rd = curRooms[r];
            if (rd && rd.settings && rd.settings.autoAssignLocked) {
                const nm = (rd.settings.courseName || '').trim();
                const pd = (rd.settings.period || '').trim();
                if (nm) lockedKeys.add(`${nm}|${pd}`);
            }
        });

        // 풀에서 잠긴 방과 동일한 과정 제외
        const pool = weekCourses.filter(c => {
            const key = `${(c.name||'').trim()}|${(c.period||'').trim()}`;
            return !lockedKeys.has(key);
        });

        const updates = {};
        const assigned = [];
        const wiped = [];
        // 교수 오픈톡 프로필 미리 로드
        const _profSnap = await firebase.database().ref('system/professorProfiles').once('value');
        const _profAll = _profSnap.val() || {};
        const _kakaoOf = (pn) => { const p = _profAll[(pn||'').trim()]; return (p && p.kakaoLink) ? p.kakaoLink : ''; };
        // [교수 고정방] 교수 프로필 fixedRoom 우선 배정 → 나머지는 남은 방에 순번 배정
        const _roomCourse = {}; const _usedFixed = {}; const _restCourses = [];
        pool.forEach(function(c){
            var fr = (_profAll[((c.prof)||'').trim()]||{}).fixedRoom;
            if(fr && openRooms.indexOf(fr)>=0 && !_usedFixed[fr]){ _roomCourse[fr]=c; _usedFixed[fr]=1; }
            else _restCourses.push(c);
        });
        const _freeRooms = openRooms.filter(function(r){ return !_usedFixed[r]; });
        _restCourses.forEach(function(c, _ri){ if(_ri < _freeRooms.length) _roomCourse[_freeRooms[_ri]] = c; });

        for (let i = 0; i < openRooms.length; i++) {
            const room = openRooms[i];
            const course = _roomCourse[room];
            const prevName = ((curRooms[room] || {}).settings || {}).courseName || '';

            if (course) {
                if (course.name !== prevName) {
                    // 새/다른 과정 → 리셋 후 배치
                    Object.assign(updates, this._cleanStartUpdates(room));
                    // [명단 보존] 자동배치는 지원부·운영부 명단을 지우지 않음 (삭제는 과정 종료 expire에서만)
                    wiped.push(`${room}(${prevName || '비어있음'}→${course.name})`);
                    updates[`courses/${room}/settings/courseName`] = course.name;
                    updates[`courses/${room}/settings/courseCreatedAt`] = firebase.database.ServerValue.TIMESTAMP;
                    updates[`courses/${room}/settings/period`]     = course.period;
                    const coordFull = coordMgr.matchName(course.coord) || (course.coord || '');
                    updates[`courses/${room}/settings/coordinatorName`] = coordFull;
                    updates[`courses/${room}/status/professorName`] = course.prof;
                    updates[`courses/${room}/status/roomStatus`]   = 'active';
                    updates[`courses/${room}/settings/kakaoLink`]  = _kakaoOf(course.prof);
                    if (course.roomDetail) updates[`courses/${room}/settings/roomDetailName`] = course.roomDetail;
                    else updates[`courses/${room}/settings/roomDetailName`] = '';
                    updates[`courses/${room}/status/ownerSessionId`] = null;
                    assigned.push(`${room}: ${course.name}`);
                }
                // course.name === prevName → 이미 같은 과정이 운영 중:
                //   강사가 직접 조정한 '기간·강의실' 등 설정을 자동배치가 덮어쓰지 않고 그대로 보존한다.
            } else {
                // [리셋 정합성] 배정 대상 없음 + 현재 방의 과정이 이미 기간 종료됐으면 → 미개설로 리셋
                //   (차주 유지(autoAssignLocked) 방은 openRooms 에서 이미 제외돼 보존됨)
                const _rd = curRooms[room] || {};
                const _act = (_rd.status || {}).roomStatus === 'active';
                const _nm = ((_rd.settings || {}).courseName || '').trim();
                const _pd = ((_rd.settings || {}).period || '').trim();
                const _end = _pd.includes('~') ? _pd.split('~').pop().trim() : '';
                if (_act && _nm && _end && _end < targetMon) {
                    Object.assign(updates, this._cleanStartUpdates(room));
                    updates[`courses/${room}/settings/courseName`] = '';
                    updates[`courses/${room}/settings/period`] = null;
                    updates[`courses/${room}/settings/coordinatorName`] = null;
                    updates[`courses/${room}/status/professorName`] = '';
                    updates[`courses/${room}/status/roomStatus`] = 'idle';
                    wiped.push(`${room}(${_nm} 종료→미개설)`);
                }
            }
        }

        if (Object.keys(updates).length) {
            await firebase.database().ref().update(updates);
            console.log('[annualPlanMgr] 배치 완료:', assigned.join(' | '));
            if (wiped.length) console.log('[annualPlanMgr] 과정 교체 자동 리셋:', wiped.join(' | '));
        }
    },

    /* [Clean Start] 과정 교체 시 이전 기수 데이터를 비우는 multi-path 업데이트 묶음 반환.
       (보안 규칙에 정의된 하위 노드만 대상으로 하여 권한 충돌 방지) */
    _cleanStartUpdates: function(room) {
        const rPath = `courses/${room}`;
        const newResetKey = "reset_" + Date.now();
        return {
            [`${rPath}/students`]:            null,
            [`${rPath}/internal_attendance`]: null,
            [`${rPath}/questions`]:           null,
            [`${rPath}/admin_actions`]:       null,
            [`${rPath}/shuttle`]:             null,
            [`${rPath}/dinner_skips`]:        null,
            [`${rPath}/tablet_loans`]:        null,
            [`${rPath}/connections`]:         null,
            [`${rPath}/quizAnswers`]:         null,
            [`${rPath}/activeQuiz`]:          null,
            [`${rPath}/quizFinalResults`]:    null,
            [`${rPath}/attendanceQR`]:        null,
            [`${rPath}/scheduleImage`]:       null,  // [추가] 차주 전환(과정 종료) 시 교육 시간표 사진 자동 삭제
            [`${rPath}/boardNotice`]:         "",
            [`${rPath}/notice`]:              "",
            [`${rPath}/coordNotice`]:         "",
            [`${rPath}/coordNoticeHistory`]:  null,
            [`${rPath}/settings/password`]:   null,  // [비번 옵션화] 차주 새 과정 배치 전 비번 제거(없음 상태)
            [`${rPath}/settings/quickTabs`]:  null,  // [퀵 탭] 새 과정은 기본(공지관리·수강생현황)으로 복귀
            [`${rPath}/settings/remoteMenu`]: null,  // [육각 리모컨] 새 과정은 기본 메뉴로 복귀
            [`${rPath}/settings/guideCourseInfo`]: null,  // [교육과정 안내] 새 과정은 기본(직무일반·없음)으로 복귀
            [`${rPath}/settings/guidePagePos`]: null,     // [삽입 페이지 위치] 새 과정은 기본 위치로 복귀
            [`${rPath}/settings/guidePageEnable`]: null,  // [오픈톡방QR·채널안내 표시] 새 과정은 기본(표시)으로 복귀
            [`${rPath}/settings/centerNoticeOnline`]: null,  // [온라인 운영부공지 토글] 새 과정은 기본(온라인 숨김)으로 복귀
            [`${rPath}/settings/venuePick`]: null,        // [교육 장소] 새 과정은 강의실 선택 초기화
            [`${rPath}/settings/guideVenuePage`]: null,   // [교육 장소] 페이지 번호 기본(14)로 복귀
            [`${rPath}/status/ownerSessionId`]: null,
            [`${rPath}/status/resetKey`]:     newResetKey  // 교육생 강제 퇴출 신호
        };
    },

    /* 페이지 로드 시 자동 체크 & 재배치 — 대상 주(토요일부터 차주)와 현재 배정이 다르면 갱신 */
    checkAndReset: async function() {
        try {
            const snap = await firebase.database().ref(this.PLAN_KEY).once('value');
            if (!snap.exists()) return;

            const courses = Object.values(snap.val());
            if (!courses.length) return;

            const today = this._today();
            const targetMon = this._getTargetMonday(today);
            const targetSunObj = new Date(targetMon + 'T00:00:00Z');
            targetSunObj.setUTCDate(targetSunObj.getUTCDate() + 6);
            const targetSun = targetSunObj.toISOString().split('T')[0];
            const norm = s => (s || '').trim();
            const planByName = {};
            courses.forEach(c => { if (c.name && !c.cancelled) planByName[norm(c.name)] = c; });

            // 수동 리셋되어 이번 주 배치 제외할 과정
            const dismissed = await this._getDismissedSet(targetMon);

            // 대상 주에 걸치는 과정명 집합 (dismissed 제외)
            const expected = new Set(
                courses
                    .filter(c => c.startDate && c.endDate && c.startDate <= targetSun && c.endDate >= targetMon)
                    .filter(c => !c.cancelled)
                    .filter(c => c.endDate >= today)
                    .filter(c => !dismissed.has(`${norm(c.name)}|${norm(c.period)}`))
                    .map(c => norm(c.name))
            );

            const snapAll = await firebase.database().ref('courses').once('value');
            const roomsData = snapAll.val() || {};

            let needsUpdate = false;
            for (const room of this.ROOMS) {
                const rd = roomsData[room] || {};
                const settings = rd.settings || {};
                if (settings.autoAssignLocked) continue; // 잠긴 방은 무시
                const courseName = norm(settings.courseName);
                const period = settings.period || '';
                const endDate = period.split('~')[1]?.trim();

                // (2) 과정 만료 → 재배치
                if (endDate && endDate < today) { needsUpdate = true; break; }

                // (2-1) 연간계획 강의실과 현재 방 강의실 불일치 → 재배치(강의실 갱신)
                const pcc = planByName[courseName];
                if (pcc && expected.has(courseName)) {
                    const planRoom = norm(pcc.roomDetail);
                    if (planRoom && planRoom !== norm(settings.roomDetailName)) { needsUpdate = true; break; }
                }
            }

            // (3) 대상 주 과정 중 아직 어느 방에도 안 들어간 게 있으면 → 재배치
            //     (단, 진행 중이 아닌 빈 방이 있을 때만 의미가 있으므로 sync가 알아서 처리)
            if (!needsUpdate) {
                const assignedNames = new Set(
                    this.ROOMS.map(r => norm(((roomsData[r] || {}).settings || {}).courseName)).filter(Boolean)
                );
                for (const nm of expected) {
                    if (!assignedNames.has(nm)) { needsUpdate = true; break; }
                }
            }

            // [충돌 방지] 강사 플랫폼은 방 자동 재배치를 하지 않음 — 방 배정은 운영부에서만 수행.
            //  (여러 플랫폼이 동시에 배정하면 같은 과정이 방마다 번갈아 생기는 충돌이 발생)
            if (needsUpdate) {
                console.log('[annualPlanMgr] 재배치 필요 감지 — 강사 플랫폼에선 미수행(운영부 전담).');
            }
        } catch (err) {
            console.warn('[annualPlanMgr] checkAndReset 오류:', err);
        }
    }
};

/* ════════════════════════════════════════════════════════════
   연간계획 실시간 편집기 (모달) — 강사 플랫폼
   DB(system/annualPlan)를 표로 불러와 수정/추가/삭제 후
   저장 시 잠금되지 않은 Room을 현재 날짜 기준으로 즉시 갱신
   ════════════════════════════════════════════════════════════ */
annualPlanMgr.currentEditingData = [];

annualPlanMgr._escapeHtml = function(s) {
    return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/"/g, '&quot;')
        .replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
annualPlanMgr._profOptions = function(cur){
    cur = cur || '';
    var esc = this._escapeHtml;
    var names = (typeof profMgr !== 'undefined' && profMgr.list) ? profMgr.list.map(function(p){return p.name;}).filter(Boolean) : [];
    var opts = '<option value="">(선택)</option>'; var seen=false;
    names.forEach(function(n){ if(n===cur) seen=true; opts += '<option value="'+esc(n)+'"'+(n===cur?' selected':'')+'>'+esc(n)+'</option>'; });
    if(cur && !seen) opts += '<option value="'+esc(cur)+'" selected>'+esc(cur)+'</option>';
    return opts;
};
annualPlanMgr._coordOptions = function(cur){
    cur = cur || '';
    var esc = this._escapeHtml;
    var names = (typeof coordMgr !== 'undefined' && coordMgr.list) ? coordMgr.list.map(function(c){return c.name;}).filter(Boolean) : [];
    var opts = '<option value="">(선택)</option>'; var seen=false;
    names.forEach(function(n){ if(n===cur) seen=true; opts += '<option value="'+esc(n)+'"'+(n===cur?' selected':'')+'>'+esc(n)+'</option>'; });
    if(cur && !seen) opts += '<option value="'+esc(cur)+'" selected>'+esc(cur)+'</option>';
    return opts;
};
annualPlanMgr._openPeriodPicker = function(idx, el){
    this._lastIdx = idx;
    var c = this.currentEditingData[idx]; if(!c) return; var self=this;
    var fmt = function(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
    if(el._fp){ el._fp.open(); return; }
    el._fp = flatpickr(el, {
        mode:'range', locale:'ko', dateFormat:'Y-m-d', disableMobile:'true',
        defaultDate: (c.startDate && c.endDate) ? [c.startDate, c.endDate] : null,
        onClose: function(dates){
            if(dates && dates.length === 2){
                c.startDate = fmt(dates[0]); c.endDate = fmt(dates[1]);
                c.period = c.startDate + ' ~ ' + c.endDate;
                c.weekKey = self._getMondayOf(c.startDate);
                self.renderEditor(idx);
            }
        }
    });
    el._fp.open();
};

annualPlanMgr.openEditorModal = async function() {
    const modal = document.getElementById('annualPlanModal');
    const area  = document.getElementById('annualPlanEditorArea');
    if (!modal || !area) return;
    modal.style.display = 'flex';
    area.innerHTML = "<p style='padding:20px; color:#64748b;'>데이터 로딩 중...</p>";
    try {
        const snap = await firebase.database().ref(this.PLAN_KEY).once('value');
        const data = snap.val() || [];
        const arr  = Array.isArray(data) ? data : Object.values(data);
        this._startLive();
        this.currentEditingData = arr
            .filter(c => c && (c.name || c.startDate))
            .map(c => ({
                no:        c.no || 0,
                name:      c.name || '',
                startDate: c.startDate || '',
                endDate:   c.endDate || '',
                period:    c.period || ((c.startDate && c.endDate) ? `${c.startDate} ~ ${c.endDate}` : ''),
                prof:      c.prof || '',
                coord:     c.coord || '',
                roomDetail: c.roomDetail || c.classroom || c.roomName || '',
                preAssign: !!c.preAssign,
                cancelled: !!c.cancelled,
                weekKey:   c.weekKey || (c.startDate ? this._getMondayOf(c.startDate) : '')
            }))
            .sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));
        this.renderEditor();
    } catch (e) {
        area.innerHTML = `<p style='padding:20px; color:#ef4444;'>불러오기 오류: ${this._escapeHtml(e.message)}</p>`;
        console.error('[annualPlanMgr] openEditorModal 오류:', e);
    }
};

annualPlanMgr.renderEditor = function(keepIdx) {
    const area = document.getElementById('annualPlanEditorArea');
    if (!area) return;
    const esc = this._escapeHtml;
    if (!this.currentEditingData.length) {
        area.innerHTML = "<p style='padding:24px; color:#64748b; text-align:center;'>등록된 과정이 없습니다. 상단 [과정 행 추가] 버튼으로 추가하세요.</p>";
        return;
    }
    // 행 배경색 분류: 진행중(연블루) / 차주 예정(연핑크) / 그 외 예정(연그린) / 종료(회색)
    const today = this._today();
    const thisMon = this._getMondayOf(today);
    const nextMon = (() => { const d = new Date(thisMon + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate()+7); return d.toISOString().split('T')[0]; })();
    const rowBg = (c) => {
        if (!c.startDate || !c.endDate) return '';                         // 미입력
        if (c.endDate < today) return 'background:#f1f5f9;';                // 종료(회색)
        if (c.startDate <= today && c.endDate >= today) return 'background:#dbeafe;'; // 진행중(연블루)
        if (this._getMondayOf(c.startDate) === nextMon) return 'background:#fce7f3;';  // 차주 예정(연핑크)
        return 'background:#dcfce7;';                                       // 그 외 예정(연그린)
    };
    const cellStyle = "padding:4px; border:1px solid #e2e8f0;";
    const inpStyle  = "width:100%; border:1px solid transparent; background:transparent; padding:6px; font-size:13px; box-sizing:border-box;";
    const weekLabelOf = (key) => {
        if (!key) return '주차 미정';
        const d = new Date(key + 'T00:00:00');
        if (isNaN(d.getTime())) return '주차 미정';
        const e = new Date(d); e.setDate(e.getDate() + 4);
        return `${d.getMonth()+1}/${d.getDate()} ~ ${e.getMonth()+1}/${e.getDate()}`;
    };
    let html = `
        <div style="position:sticky; top:0; z-index:11; display:flex; gap:14px; flex-wrap:wrap; padding:0 12px; height:37px; box-sizing:border-box; font-size:12px; color:#475569; align-items:center; background:#fff; border-bottom:1px solid #e2e8f0;">
            <span style="font-weight:800;">상태 색상:</span>
            <span><span style="display:inline-block; width:12px; height:12px; border-radius:3px; background:#dbeafe; vertical-align:middle; margin-right:4px;"></span>진행 중</span>
            <span><span style="display:inline-block; width:12px; height:12px; border-radius:3px; background:#fce7f3; vertical-align:middle; margin-right:4px;"></span>차주 진행 예정</span>
            <span><span style="display:inline-block; width:12px; height:12px; border-radius:3px; background:#dcfce7; vertical-align:middle; margin-right:4px;"></span>예정</span>
            <span><span style="display:inline-block; width:12px; height:12px; border-radius:3px; background:#f1f5f9; vertical-align:middle; margin-right:4px;"></span>종료</span>
            <span><span style="display:inline-block; width:12px; height:12px; border-radius:3px; background:#fff1f2; vertical-align:middle; margin-right:4px; border:1px solid #fecdd3;"></span>폐강</span>
        </div>
        <table style="width:100%; border-collapse:collapse; font-size:13px;">
            <thead style="position:sticky; top:37px; background:#f8fafc; z-index:10;">
                <tr>
                    <th style="width:48px; padding:10px; border:1px solid #e2e8f0;">No</th>
                    <th style="padding:10px; border:1px solid #e2e8f0; min-width:220px;">과정명</th>
                    <th style="width:240px; padding:10px; border:1px solid #e2e8f0;">기간 <span style="font-weight:600; color:#94a3b8;">(클릭→달력)</span></th>
                    <th style="width:110px; padding:10px; border:1px solid #e2e8f0;">담임교수</th>
                    <th style="width:120px; padding:10px; border:1px solid #e2e8f0;">운영담당</th>
                    <th style="min-width:170px; padding:10px; border:1px solid #e2e8f0;">강의실</th>
                    <th style="width:72px; padding:10px; border:1px solid #e2e8f0;" title="체크하면 자동 배정과 운영 노출에서 제외됩니다.">폐강</th>
                    <th style="width:92px; padding:10px; border:1px solid #e2e8f0;" title="체크하면 기간과 무관하게 저장 즉시 방에 배정됩니다">사전배정</th>
                    <th style="width:50px; padding:10px; border:1px solid #e2e8f0;">삭제</th>
                </tr>
            </thead>
            <tbody>`;
    const _today = this._today();
    // 스크롤 대상 결정: ① 진행 중 과정 → 없으면 ② 시작일이 오늘 이후인 가장 가까운 과정
    let _targetIdx = -1;
    this.currentEditingData.forEach((c, idx) => {
        if (c.startDate && c.endDate && c.startDate <= _today && c.endDate >= _today) {
            if (_targetIdx === -1) _targetIdx = idx;  // 진행 중 (최우선)
        }
    });
    if (_targetIdx === -1) {
        // 진행 중 없음 → 다가오는(미래) 과정 중 시작일이 가장 빠른 것
        let best = null;
        this.currentEditingData.forEach((c, idx) => {
            if (c.startDate && c.startDate > _today) {
                if (best === null || c.startDate < this.currentEditingData[best].startDate) best = idx;
            }
        });
        if (best !== null) _targetIdx = best;
    }

    let _prevWeekKey = '';
    this.currentEditingData.forEach((c, idx) => {
        const isCur = c.startDate && c.endDate && c.startDate <= _today && c.endDate >= _today;
        const cancelled = !!c.cancelled;
        const cancelStyle = cancelled ? 'opacity:.58; text-decoration:line-through;' : '';
        const wk = c.startDate ? this._getMondayOf(c.startDate) : (c.endDate ? this._getMondayOf(c.endDate) : '');
        if (wk !== _prevWeekKey) {
            _prevWeekKey = wk;
            html += `
            <tr class="annual-week-sep">
                <td colspan="9" style="padding:10px 12px 8px; border-top:2px dashed #93c5fd; border-bottom:1px solid #dbeafe; background:#f8fbff; color:#1d4ed8; font-size:13px; font-weight:900;">${weekLabelOf(wk)} 주차</td>
            </tr>`;
        }
        html += `
            <tr data-plan-row="${idx}" data-cur="${isCur ? '1' : '0'}" data-target="${idx === _targetIdx ? '1' : '0'}" style="${rowBg(c)} ${cancelled ? 'background:#fff1f2;' : ''}">
                <td style="${cellStyle} text-align:center; color:#64748b;">${idx + 1}</td>
                <td style="${cellStyle}"><input type="text" value="${esc(c.name)}" onchange="annualPlanMgr.updateLocalData(${idx},'name',this.value)" style="${inpStyle} font-weight:700; ${cancelStyle}"></td>
                <td style="${cellStyle}"><input type="text" readonly data-idx="${idx}" value="${(c.startDate&&c.endDate)?esc(c.startDate+' ~ '+c.endDate):''}" placeholder="기간 선택" onclick="annualPlanMgr._openPeriodPicker(${idx}, this)" style="${inpStyle} cursor:pointer; background:#fff; text-align:center; ${cancelStyle}"></td>
                <td style="${cellStyle}"><select onchange="annualPlanMgr.updateLocalData(${idx},'prof',this.value)" style="${inpStyle} cursor:pointer; background:#fff; ${cancelStyle}">${annualPlanMgr._profOptions(c.prof)}</select></td>
                <td style="${cellStyle}"><select onchange="annualPlanMgr.updateLocalData(${idx},'coord',this.value)" style="${inpStyle} cursor:pointer; background:#fff; ${cancelStyle}">${annualPlanMgr._coordOptions(c.coord)}</select></td>
                <td style="${cellStyle}">${classroomDetailSelectHtmlInstructor(c.roomDetail || '', "annualPlanMgr.onRoomPick(" + idx + ",this)", inpStyle + cancelStyle, annualPlanMgr._roomsInUse(idx))}</td>
                <td style="${cellStyle} text-align:center;"><input type="checkbox" ${cancelled ? 'checked' : ''} onchange="annualPlanMgr.updateLocalData(${idx},'cancelled',this.checked); annualPlanMgr.renderEditor(${idx});" title="폐강 처리: 자동 배정과 운영 노출에서 제외" style="width:18px; height:18px; cursor:pointer; accent-color:#ef4444;"></td>
                <td style="${cellStyle} text-align:center;"><input type="checkbox" ${c.preAssign ? 'checked' : ''} onchange="annualPlanMgr.updateLocalData(${idx},'preAssign',this.checked)" title="체크하면 기간과 무관하게 저장 즉시 방에 배정됩니다" style="width:18px; height:18px; cursor:pointer; accent-color:#2563eb;"></td>
                <td style="${cellStyle} text-align:center;"><button onclick="annualPlanMgr.deleteRow(${idx})" title="삭제" style="color:#ef4444; border:none; background:none; cursor:pointer; font-size:16px; font-weight:800;">✕</button></td>
            </tr>`;
    });
    html += `</tbody></table>`;
    area.innerHTML = html;

    // 진행 중(없으면 차주/다가오는) 과정 행을 화면 중앙으로 스크롤
    setTimeout(() => {
        if (keepIdx != null) {
            const r = area.querySelector(`tbody tr[data-plan-row="${keepIdx}"]`);
            if (r && r.scrollIntoView) r.scrollIntoView({ block: 'nearest' });
            return; // 편집 중인 행 유지 — 자동 스크롤 안 함
        }
        const targetRow = area.querySelector('tr[data-target="1"]') || area.querySelector('tr[data-cur="1"]');
        if (targetRow && targetRow.scrollIntoView) targetRow.scrollIntoView({ block: 'center' });
    }, 50);
};

annualPlanMgr.updateLocalData = function(idx, field, value) {
    const c = this.currentEditingData[idx];
    if (!c) return;
    this._lastIdx = idx;
    c[field] = value;
    if (field === 'startDate' || field === 'endDate') {
        c.period  = (c.startDate && c.endDate) ? `${c.startDate} ~ ${c.endDate}` : '';
        c.weekKey = c.startDate ? this._getMondayOf(c.startDate) : '';
        // 날짜가 바뀌면 상태 색상도 갱신되도록 다시 그린다 (입력 포커스 유지를 위해 약간 지연)
        setTimeout(() => this.renderEditor(idx), 0);
    }
};

// [연간계획 강의실] 직접입력 디스패처 + 사용중 계산 + 실시간 리스너
annualPlanMgr.onRoomPick = function(idx, sel){
    this._lastIdx = idx;
    if (sel.value === '__direct__') {
        const v = prompt('강의실/장소를 직접 입력하세요');
        if (v && v.trim()) this.updateLocalData(idx, 'roomDetail', v.trim());
        this.renderEditor(idx);
        return;
    }
    this.updateLocalData(idx, 'roomDetail', sel.value);
};
annualPlanMgr._overlap = function(s1,e1,s2,e2){ return !!(s1 && e1 && s2 && e2) && s1 <= e2 && e1 >= s2; };
annualPlanMgr._roomsInUse = function(idx){
    const set = new Set();
    const me = this.currentEditingData[idx];
    if (!me || !me.startDate || !me.endDate) return set;
    const isOnline = v => /온라인|zoom/i.test(String(v||''));
    const localNames = new Set();
    this.currentEditingData.forEach(c => { if (c && c.name) localNames.add(String(c.name).trim()); });
    this.currentEditingData.forEach((c, j) => {
        if (j === idx || !c || !c.roomDetail || isOnline(c.roomDetail)) return;
        if (this._overlap(me.startDate, me.endDate, c.startDate, c.endDate)) set.add(String(c.roomDetail).trim());
    });
    (this._remoteList || []).forEach(c => {
        if (!c.roomDetail || isOnline(c.roomDetail)) return;
        if (localNames.has(String(c.name||'').trim())) return;   // 로컬 편집본 우선
        if (this._overlap(me.startDate, me.endDate, c.startDate, c.endDate)) set.add(String(c.roomDetail).trim());
    });
    return set;
};
annualPlanMgr._startLive = function(){
    const self = this;
    // 공용 강의실(system/classrooms) 실시간
    if (!this._customRef) {
        this._customRef = firebase.database().ref('system/classrooms');
        this._customRef.on('value', function(snap){
            const v = snap.val() || {}; const by = {};
            Object.keys(v).forEach(function(k){ const it=v[k]; if(!it||!it.name) return; const b=String(it.building||'기타').trim(); (by[b]=by[b]||[]).push(String(it.name).trim()); });
            window.__customRooms = by;
            self._reRenderIfOpen();
        });
    }
    // 연간계획(system/annualPlan) 실시간 — 타 플랫폼 배정 즉시 '사용중' 반영
    if (!this._liveRef) {
        this._liveRef = firebase.database().ref(this.PLAN_KEY);
        this._liveRef.on('value', function(snap){
            const v = snap.val() || []; const arr = Array.isArray(v) ? v : Object.values(v);
            self._remoteList = arr.filter(c => c && c.name && c.startDate && c.endDate && !c.cancelled)
                .map(c => ({ name:c.name, startDate:c.startDate, endDate:c.endDate, roomDetail:c.roomDetail||c.classroom||c.roomName||'' }));
            self._reRenderIfOpen();
        });
    }
};
annualPlanMgr._reRenderIfOpen = function(){
    const m = document.getElementById('annualPlanModal');
    if (m && m.style.display !== 'none' && this.currentEditingData && this.currentEditingData.length) {
        this.renderEditor(this._lastIdx != null ? this._lastIdx : -1);
    }
};

annualPlanMgr.addRow = function() {
    document.getElementById('ca-name').value = '';
    document.getElementById('ca-err').innerText = '';
    var pe = document.getElementById('ca-period');
    if (pe) {
        if (!pe._flatpickr) { flatpickr(pe, { mode:'range', locale:'ko', dateFormat:'Y-m-d', disableMobile:'true' }); }
        if (pe._flatpickr) pe._flatpickr.clear();
        pe.value = '';
    }
    document.getElementById('courseAddPop').style.display = 'flex';
    setTimeout(() => document.getElementById('ca-name').focus(), 100);
};

annualPlanMgr.confirmAdd = function() {
    const name = (document.getElementById('ca-name').value || '').trim();
    const err = document.getElementById('ca-err');
    const pe = document.getElementById('ca-period');
    const ds = (pe && pe._flatpickr && pe._flatpickr.selectedDates) ? pe._flatpickr.selectedDates : [];
    if (!name) { err.innerText = '과정명을 입력하세요.'; return; }
    if (ds.length < 2) { err.innerText = '기간(시작~종료)을 달력에서 선택하세요.'; return; }
    const _fmt = d => d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
    const start = _fmt(ds[0]); const end = _fmt(ds[1]);
    if (end < start) { err.innerText = '종료일이 시작일보다 빠를 수 없습니다.'; return; }
    // 새 과정 추가 후 시작일 순으로 정렬 (날짜에 맞는 위치에 들어가도록)
    this.currentEditingData.push({
        no: 0, name, startDate: start, endDate: end,
        period: `${start} ~ ${end}`, prof: '', coord: '', roomDetail: '', cancelled: false,
        weekKey: this._getMondayOf(start)
    });
    this.currentEditingData.sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));
    document.getElementById('courseAddPop').style.display = 'none';
    this.renderEditor();
    // 방금 추가한 과정 행으로 스크롤 + 잠깐 강조
    setTimeout(() => {
        const area = document.getElementById('annualPlanEditorArea');
        if (!area) return;
        const idx = this.currentEditingData.findIndex(c => c.name === name && c.startDate === start && c.endDate === end);
        const row = area.querySelector(`tbody tr[data-plan-row="${idx}"]`);
        if (row && row.scrollIntoView) {
            row.scrollIntoView({ block: 'center' });
            row.style.transition = 'background 0.3s';
            const orig = row.style.background;
            row.style.background = '#fde68a';
            setTimeout(() => { row.style.background = orig; }, 900);
        }
    }, 60);
};

annualPlanMgr.deleteRow = function(idx) {
    const self = this;
    const row = this.currentEditingData[idx] || {};
    const nm = String(row.name || '').trim();
    const pd = (row.startDate && row.endDate) ? (row.startDate + ' ~ ' + row.endDate) : String(row.period || '');
    const norm = v => String(v || '').replace(/\s+/g, '').trim();
    const finishLocal = function () { self.currentEditingData.splice(idx, 1); self.renderEditor(); };
    if (!nm) { finishLocal(); return; }
    // 이 과정이 현재 방에서 진행 중이면 → 그 방까지 함께 초기화(명단·출결·설문 등 전부)
    firebase.database().ref('courses').once('value').then(function (s) {
        const rooms = s.val() || {};
        let target = null;
        Object.keys(rooms).forEach(function (rk) {
            const c = rooms[rk] || {}, st = c.settings || {};
            if (norm(st.courseName) && norm(st.courseName) === norm(nm)) target = rk;
        });
        if (!target) { finishLocal(); return; }
        if (!confirm('"' + nm + '" 과정이 현재 Room #' + target + '에서 운영 중입니다.\n삭제하면 이 방의 명단·출결·설문·공지 등 모든 데이터가 함께 초기화됩니다.\n계속하시겠습니까?')) return;
        annualPlanMgr._resetRoomFull(target, nm, pd).then(function () {
            finishLocal();
            if (ui.showAlert) ui.showAlert('🗑️ "' + nm + '" 삭제 · Room #' + target + ' 초기화 완료.');
        }).catch(function (e) { if (ui.showAlert) ui.showAlert('초기화 실패: ' + (e && e.message || e)); });
    }).catch(function () { finishLocal(); });
};

// [연간계획 삭제 연동] 특정 방을 통째로 초기화(수동 리셋과 동일 범위 + 생활관 명단/배정 정리 + 재생성 방지)
annualPlanMgr._resetRoomFull = function (room, nm, pd) {
    const rp = 'courses/' + room;
    const upd = {};
    upd[rp + '/settings'] = { courseName: '', roomDetailName: '', period: null, coordinatorName: null, subjects: null, password: null };
    upd[rp + '/status'] = { professorName: '', roomStatus: 'idle', ownerSessionId: null, resetKey: 'reset_' + Date.now(), mode: 'qa', quizStep: 'none', professorManual: null, roomDetailManual: null };
    ['coordNoticeHistory', 'students', 'internal_attendance', 'questions', 'admin_actions', 'shuttle', 'dinner_skips', 'tablet_loans', 'connections', 'quizAnswers', 'expectedStudents', 'coordRoster', 'activeQuiz', 'quizFinalResults', 'quizBank', 'attendanceQR', 'activeSurvey', 'surveyAnswers', 'lastSurveyResult', 'scheduleImage', 'venuePick'].forEach(function (k) { upd[rp + '/' + k] = null; });
    ['boardNotice', 'notice', 'coordNotice'].forEach(function (k) { upd[rp + '/' + k] = ''; });
    // 생활관 명단(rosters)·배정(assignments) + 재생성 방지(dismissedCourses)
    const weekKeys = [];
    try {
        const start = (pd && pd.indexOf('~') >= 0) ? pd.split('~')[0].trim() : '';
        if (start) {
            const d = new Date(start + 'T00:00:00');
            if (!isNaN(d)) {
                const dow = (d.getDay() + 6) % 7;
                const mon = new Date(d); mon.setDate(d.getDate() - dow);
                const utc = mon.toISOString().slice(0, 10);
                const local = mon.getFullYear() + '-' + String(mon.getMonth() + 1).padStart(2, '0') + '-' + String(mon.getDate()).padStart(2, '0');
                [local, utc].forEach(function (wk) { weekKeys.push(wk); });
            }
        }
    } catch (e) {}
    try {
        let weekKey = '';
        try { weekKey = annualPlanMgr._getTargetMonday(annualPlanMgr._today()); } catch (e) {}
        const key = (nm + '|' + pd).replace(/[.#$/\[\]]/g, '_');
        upd['system/dismissedCourses/' + weekKey + '/' + key] = { name: nm, period: pd, at: Date.now() };
    } catch (e) {}
    const nnm = String(nm || '').replace(/\s+/g, '').trim();
    const reads = (nnm && weekKeys.length) ? weekKeys.map(function (wk) {
        return firebase.database().ref('system/dorm/assignments/' + wk + '/students').once('value').then(function (as) {
            const students = as.val() || {};
            Object.keys(students).forEach(function (k) { const stu = students[k]; if (stu && String(stu.course || '').replace(/\s+/g, '').trim() === nnm) upd['system/dorm/assignments/' + wk + '/students/' + k] = null; });
        }).catch(function () {});
    }) : [];
    // [J9] 생활관 명단은 과정명 일치 시에만 삭제 (같은 방·주차의 다른 과정 명단 보존)
    const rosterReads = (nnm && weekKeys.length) ? weekKeys.map(function (wk) {
        const p = 'system/dorm/rosters/' + wk + '__' + room;
        return firebase.database().ref(p).once('value').then(function (rs) {
            const rv = rs.val(); if (!rv) return;
            const rn = String(rv.courseName || '').replace(/\s+/g, '').trim();
            if (rn === nnm) upd[p] = null;
            else console.warn('[연간계획 리셋/J9] 지원부 명단 보존(과정명 불일치):', p);
        }).catch(function () {});
    }) : [];
    return Promise.all(reads.concat(rosterReads)).then(function () { return firebase.database().ref().update(upd); });
};

annualPlanMgr.saveAndSync = async function() {
    const invalid = this.currentEditingData.find(c =>
        c.name && c.startDate && c.endDate && c.startDate > c.endDate);
    if (invalid) {
        ui.showAlert(`❌ "${invalid.name}" 과정의 시작일이 종료일보다 늦습니다.`);
        return;
    }
    if (!confirm("수정된 계획을 저장하고, 잠금되지 않은 강의실 정보를 현재 날짜 기준으로 갱신하시겠습니까?")) return;

    ui.showLoading("데이터 동기화 및 룸 재배치 중...");
    try {
        // 빈 행 제거 + 시작일 정렬 + 연번 재부여
        const clean = this.currentEditingData
            .filter(c => c.name && c.startDate && c.endDate)
            .sort((a, b) => a.startDate.localeCompare(b.startDate))
            .map((c, i) => ({
                no:        i + 1,
                name:      c.name.trim(),
                startDate: c.startDate,
                endDate:   c.endDate,
                period:    `${c.startDate} ~ ${c.endDate}`,
                prof:      (c.prof || '').trim(),
                coord:     (c.coord || '').trim(),
                roomDetail: (c.roomDetail || c.classroom || c.roomName || '').trim(),
                preAssign: !!c.preAssign,
                cancelled: !!c.cancelled,
                weekKey:   this._getMondayOf(c.startDate)
            }));

        // 1) 마스터 계획 저장 (keyed object 규약 c0,c1,... 유지)
        const planData = {};
        clean.forEach((c, i) => { planData[`c${i}`] = c; });
        await firebase.database().ref(this.PLAN_KEY).set(planData);

        // 2) 잠금 인식 룸 재배치
        const syncRes = await this._syncRoomsLockAware(clean);

        ui.hideLoading();
        if (syncRes && syncRes.unplacedPreAssign && syncRes.unplacedPreAssign.length) {
            ui.showAlert(`✅ 저장 완료 (${clean.length}개 과정).\n\n⚠️ 다만 비어 있는 방이 부족해 아래 사전배정 과정이 아직 배치되지 못했습니다:\n· ${syncRes.unplacedPreAssign.join('\n· ')}\n\n사용 중인 방은 건드리지 않았습니다. 방이 비면 자동 배치되며, 지금 바로 넣으려면 비어 있는 방을 하나 확보해 주세요.`);
        } else {
            ui.showAlert(`✅ 저장 및 실시간 동기화가 완료되었습니다. (${clean.length}개 과정)`);
        }
        document.getElementById('annualPlanModal').style.display = 'none';
    } catch (e) {
        ui.hideLoading();
        ui.showAlert("❌ 오류 발생: " + e.message);
        console.error('[annualPlanMgr] saveAndSync 오류:', e);
    }
};

/* 편집기 "저장 및 즉시 적용" — 대상 주만 배정.
   잠금 방 보존 + 이미 배정된 과정(과정명|기간 동일)은 잠금 없어도 그 방 그대로 유지 + 동일 과정 중복 방지 */
annualPlanMgr._syncRoomsLockAware = async function(courses) {
    const today = this._today();
    const targetMon = this._getTargetMonday(today);
    const targetSunObj = new Date(targetMon + 'T00:00:00Z');
    targetSunObj.setUTCDate(targetSunObj.getUTCDate() + 6);
    const targetSun = targetSunObj.toISOString().split('T')[0];

    const snap = await firebase.database().ref('courses').once('value');
    const roomsData = snap.val() || {};
    const norm = s => (s || '').trim();
    // 교수 프로필(오픈톡 링크) 미리 로드 → 배치 시 방에 자동 세팅
    const profSnap = await firebase.database().ref('system/professorProfiles').once('value');
    const profAll = profSnap.val() || {};
    const kakaoOf = (profName) => {
        const p = profAll[norm(profName)];
        return (p && p.kakaoLink) ? p.kakaoLink : '';
    };
    // 과정명 기준으로 연간계획에서 최신 정보 찾기 (교수/담당/기간 갱신용)
    const planByName = {};
    courses.forEach(c => { if (c.name && !c.cancelled) planByName[norm(c.name)] = c; });

    // 대상 주에 걸치는 과정 풀 (시작일 순). 단, '사전배정(preAssign)' 과정은 (아직 종료 전이면) 기간과 무관하게 즉시 포함.
    let pool = courses
        .filter(c => c.startDate && c.endDate)
        .filter(c => !c.cancelled)
        .filter(c => (c.preAssign && c.endDate >= today) || (c.startDate <= targetSun && c.endDate >= targetMon))
        .sort((a, b) => {
            // 사전배정 과정을 먼저 배치 → 빈 방을 우선 차지
            if (!!a.preAssign !== !!b.preAssign) return a.preAssign ? -1 : 1;
            return a.startDate.localeCompare(b.startDate);
        });

    // 수동 리셋된 과정은 이번 대상 주 배치에서 제외 (단, 사전배정 과정은 항상 포함)
    const dismissed = await this._getDismissedSet(targetMon);
    if (dismissed.size) {
        pool = pool.filter(c => c.preAssign || !dismissed.has(`${norm(c.name)}|${norm(c.period)}`));
    }

    // 대상 주 과정명 집합 — 방에 이미 세팅된 과정이 풀에 있으면 보존 대상으로 분류
    const poolNames = new Set(pool.map(c => norm(c.name)));

    const updates = {};
    const keptNames = new Set();   // 보존된 방의 과정명 (중복 배치 방지)
    const freeRooms = [];

    // 1) 각 방 판정: 잠금 / 현재 진행 중 / 이미 대상 주 과정명 세팅된 경우 → 보존
    //    그 외(만료됐거나 관계없는 과정, 빈 방)는 재배치 대상
    this.ROOMS.forEach(r => {
        const rd = roomsData[r] || {};
        const s = rd.settings || {};
        const st = rd.status || {};
        const nm = norm(s.courseName);
        const locked = !!s.autoAssignLocked;

        // 현재 진행 중 여부: 기간이 오늘을 포함
        let inProgress = false;
        if (nm && s.period && s.period.includes('~')) {
            const parts = s.period.split('~');
            const sd = norm(parts[0]), ed = norm(parts[1]);
            if (sd && ed && sd <= today && ed >= today) inProgress = true;
        }

        // 과정명이 같은 경우(대상 주 풀에 포함된 과정명이면) → 리셋 없이 보존.
        // 잠금, 진행 중, 또는 이미 대상 주 과정으로 세팅된 방 모두 보존.
        const alreadySet = nm && poolNames.has(nm);

        if (locked || (nm && inProgress) || alreadySet) {
            // ── 보존 방 ──
            keptNames.add(nm);
            // [이름 수정 대응] 강사가 과정명을 변형(예: "전기 자동차 과정 (테스트)")한 경우,
            //  계획의 원래 과정("전기 자동차 과정")도 '이미 배치됨'으로 간주 → 원래 이름으로 중복 재생성 방지.
            if (nm) {
                pool.forEach(function(c){
                    var cn = norm(c.name);
                    if (cn && cn !== nm && (nm.indexOf(cn) === 0 || cn.indexOf(nm) === 0)) keptNames.add(cn);
                });
            }
            // 잠금 방 제외: 연간계획의 최신 교수·담당·기간으로 갱신 (데이터는 건드리지 않음)
            if (!locked && planByName[nm]) {
                const pc = planByName[nm];
                const coordFull = (typeof coordMgr !== 'undefined' && coordMgr.matchName ? coordMgr.matchName(pc.coord) : '') || (pc.coord || '');
                updates[`courses/${r}/settings/period`] = pc.period;
                if (!st.coordManual) updates[`courses/${r}/settings/coordinatorName`] = coordFull;   // [J10] 수동 지정한 담임은 자동동기화에서 보존
                if (!st.professorManual) {                                  // 수동 지정한 교수는 자동동기화에서 보존(덮어쓰지 않음)
                    updates[`courses/${r}/status/professorName`] = pc.prof;
                    updates[`courses/${r}/settings/kakaoLink`] = kakaoOf(pc.prof);
                }
                if (pc.roomDetail && !st.roomDetailManual) updates[`courses/${r}/settings/roomDetailName`] = pc.roomDetail;   // 강사가 강의실 수동 지정 시 계획값으로 덮어쓰지 않음
            }
            return; // 방 자체는 유지
        }

        // ── 열린 방 & 대상 주 과정 아님 → 비우고 재배치 대상 ──
        updates[`courses/${r}/settings/courseName`] = '';
        updates[`courses/${r}/settings/period`]     = '';
        updates[`courses/${r}/settings/roomDetailName`] = '';
        updates[`courses/${r}/settings/password`]   = null;  // [비번 옵션화] 방 비울 때 비번 제거(없음 상태)
        updates[`courses/${r}/settings/coordinatorName`] = null;
        updates[`courses/${r}/status/professorName`] = '';
        updates[`courses/${r}/status/professorManual`] = null;   // 방 비우면 수동 플래그 해제
        updates[`courses/${r}/status/coordManual`] = null;       // [J10] 담임 수동 플래그도 해제
        updates[`courses/${r}/status/roomDetailManual`] = null;  // 방 비우면 강의실 수동 플래그도 해제
        updates[`courses/${r}/status/roomStatus`]   = 'idle';
        updates[`courses/${r}/status/ownerSessionId`] = null;
        freeRooms.push(r);
    });

    // 2) 풀에서 '보존된 방에 이미 있는 과정명' 제외 → 나머지만 빈 방에 배치
    const toPlace = pool.filter(c => !keptNames.has(norm(c.name)));

    const usedNames = new Set(keptNames);
    let placeCount = 0, _ri = 0;
    for (const course of toPlace) {
        const _cnm = norm(course.name);
        if (usedNames.has(_cnm)) continue;        // 같은 과정명 중복 배치 금지(중복 생성 원천 차단)
        if (_ri >= freeRooms.length) break;
        const room = freeRooms[_ri++]; placeCount++;
        usedNames.add(_cnm);

        // [Clean Start] 새 과정 배치 시 이전 기수 데이터 일괄 소거
        //  (학생 명단·출결·질문·설문·셔틀·석식 등 전부 초기화 → 이전 기수 잔류 방지)
        Object.assign(updates, annualPlanMgr._cleanStartUpdates(room));

        const coordFull = (typeof coordMgr !== 'undefined' && coordMgr.matchName ? coordMgr.matchName(course.coord) : '') || (course.coord || '');
        updates[`courses/${room}/settings/courseName`] = course.name;
        updates[`courses/${room}/settings/courseCreatedAt`] = firebase.database.ServerValue.TIMESTAMP;
        updates[`courses/${room}/settings/period`]     = course.period;
        updates[`courses/${room}/settings/coordinatorName`] = coordFull;
        updates[`courses/${room}/status/professorName`] = course.prof;
        updates[`courses/${room}/status/professorManual`] = null;   // 신규 배치는 계획값 기준(자동동기화 대상)
        updates[`courses/${room}/status/coordManual`] = null;        // [J10] 신규 배치는 계획 담임 기준
        updates[`courses/${room}/status/roomDetailManual`] = null;  // 신규 배치는 계획 강의실 기준
        updates[`courses/${room}/status/roomStatus`]   = 'active';
        updates[`courses/${room}/settings/kakaoLink`]  = kakaoOf(course.prof);
        updates[`courses/${room}/settings/roomDetailName`] = course.roomDetail || '';
        updates[`courses/${room}/status/ownerSessionId`] = null;
    }
    // [중복 과정 정리] 같은 과정명이 두 방 이상이면, 학생·명단·장소 있는 방만 남기고 비움
    (function(){
        var finalName = {};
        this.ROOMS.forEach(function(r){
            var k='courses/'+r+'/settings/courseName';
            var fn = Object.prototype.hasOwnProperty.call(updates,k) ? updates[k] : ((roomsData[r]&&roomsData[r].settings&&roomsData[r].settings.courseName)||'');
            finalName[r]=norm(fn);
        });
        var byName={};
        Object.keys(finalName).forEach(function(r){ var n=finalName[r]; if(!n) return; (byName[n]=byName[n]||[]).push(r); });
        Object.keys(byName).forEach(function(n){
            var rooms=byName[n]; if(rooms.length<2) return;
            var score=function(r){ var c=roomsData[r]||{}, s=c.settings||{}, st=c.status||{}; var stu=c.students?Object.keys(c.students).length:0; return stu*1000+(st.ownerSessionId?100:0)+((s.roomDetailName||'').trim()?10:0)+(s.autoAssignLocked?500:0); };
            rooms.sort(function(a,b){ return score(b)-score(a); });
            rooms.slice(1).forEach(function(r){
                updates['courses/'+r+'/settings/courseName']='';
                updates['courses/'+r+'/settings/period']='';
                updates['courses/'+r+'/settings/roomDetailName']='';
                updates['courses/'+r+'/settings/coordinatorName']=null;
                updates['courses/'+r+'/status/professorName']='';
                updates['courses/'+r+'/status/roomStatus']='idle';
                updates['courses/'+r+'/status/ownerSessionId']=null;
            });
        });
    }).call(this);
    if (Object.keys(updates).length) {
        await firebase.database().ref().update(updates);
        console.log('[annualPlanMgr] 동기화 완료. 대상주:', targetMon, '~', targetSun, '/ 보존:', [...keptNames].filter(Boolean).length, '/ 신규:', placeCount);
    }
    // 빈 방 부족으로 배치되지 못한 '사전배정' 과정 목록 반환 (사용 중인 방은 건드리지 않음)
    const unplacedPreAssign = toPlace.slice(placeCount)
        .filter(c => c.preAssign && c.endDate >= today)
        .map(c => c.name);
    return { unplacedPreAssign };
};

/* 강사 플랫폼 로드 시 자동 만료 체크 */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                if (typeof kacExpireEndedCourses === 'function') kacExpireEndedCourses();
                if (typeof kacClearDefaultPw === 'function') kacClearDefaultPw();
                annualPlanMgr.checkAndReset();

                // 탭을 열어 두어도 KST 날짜가 바뀌면 자동으로 재체크 (10분 간격).
                // 특히 금→토 자정 또는 일→월 자정에도 차주 전환이 자동 적용됨.
                let _lastCheckedDate = annualPlanMgr._today();
                setInterval(function() {
                    const nowDate = annualPlanMgr._today();
                    if (nowDate !== _lastCheckedDate) {
                        _lastCheckedDate = nowDate;
                        console.log('[annualPlanMgr] KST 날짜 변경 감지 → 자동 재배치 체크');
                        annualPlanMgr.checkAndReset();
                    }
                }, 10 * 60 * 1000); // 10분마다 KST 날짜 변경 감지
            }
        });
    }
    // 생활관 플랫폼 등에서 ?openAnnual=1 로 진입하면 연간계획 편집기를 자동으로 연다.
    try {
        const params = new URLSearchParams(location.search);
        if (params.get('openAnnual') === '1') {
            const tryOpen = (n) => {
                if (typeof annualPlanMgr !== 'undefined' && annualPlanMgr.openEditorModal) {
                    annualPlanMgr.openEditorModal();
                } else if (n < 20) {
                    setTimeout(() => tryOpen(n + 1), 300);
                }
            };
            setTimeout(() => tryOpen(0), 600);
        }
    } catch (e) {}
});

/* ════════════════════════════════════════════════════════
   즉석 설문조사 관리 (강사 플랫폼)
   데이터: courses/{room}/activeSurvey, courses/{room}/surveyAnswers
════════════════════════════════════════════════════════ */
const surveyMgr = {
    _bound: false,
    _boundRoom: null,
    _optCount: 0,

    // 공지 화면 진입 시 초기화 + 리스너 바인딩
    init: function() {
        this.renderComposeOptions(true);
        // 방이 바뀌었으면 새 방으로 다시 바인딩 (기존엔 _bound 가드 때문에 옛 방에 묶여 화면이 안 바뀌었음)
        if (state.room && this._boundRoom !== state.room) {
            this.bindListeners();
        }
    },

    // 작성 영역의 보기 입력칸 렌더 (reset=true면 기본 2칸)
    renderComposeOptions: function(reset) {
        const wrap = document.getElementById('surveyOptions');
        if (!wrap) return;
        if (reset || !wrap.children.length) {
            wrap.innerHTML = '';
            this._optCount = 0;
            this.addOption(); this.addOption();
        }
    },

    addOption: function() {
        const wrap = document.getElementById('surveyOptions');
        if (!wrap) return;
        if (wrap.children.length >= 6) { ui.showAlert('보기는 최대 6개까지 가능합니다.'); return; }
        this._optCount++;
        const idx = this._optCount;
        const row = document.createElement('div');
        row.style.cssText = 'display:flex; gap:8px; align-items:center;';
        row.innerHTML = `
            <span style="width:24px; height:24px; border-radius:50%; background:#e0f2fe; color:#0369a1; font-weight:900; font-size:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">${wrap.children.length + 1}</span>
            <input type="text" class="survey-opt-input" maxlength="60" placeholder="보기 내용"
                style="flex:1; padding:10px 12px; border:1.5px solid #e2e8f0; border-radius:9px; font-size:14px; outline:none;">
            <button onclick="this.parentElement.remove(); surveyMgr.renumberOptions();" style="background:#fef2f2; color:#ef4444; border:none; border-radius:8px; width:34px; height:34px; cursor:pointer; flex-shrink:0;"><i class="fa-solid fa-xmark"></i></button>
        `;
        wrap.appendChild(row);
    },

    renumberOptions: function() {
        const wrap = document.getElementById('surveyOptions');
        if (!wrap) return;
        Array.from(wrap.children).forEach((row, i) => {
            const badge = row.querySelector('span');
            if (badge) badge.innerText = i + 1;
        });
    },

    publish: function() {
        if (state.isObserver) return ui.showAlert('👁️ 옵저버 모드에서는 설문을 게시할 수 없습니다.');
        if (!state.room) return ui.showAlert('강의실을 먼저 선택하세요.');
        const q = (document.getElementById('surveyQuestion').value || '').trim();
        if (!q) return ui.showAlert('설문 질문을 입력하세요.');
        const opts = Array.from(document.querySelectorAll('#surveyOptions .survey-opt-input'))
            .map(i => i.value.trim()).filter(v => v);
        if (opts.length < 2) return ui.showAlert('보기를 2개 이상 입력하세요.');
        const anonymous = document.getElementById('surveyAnonymous').checked;

        // 현재 방 기준으로 리스너가 살아있는지 보장 (방 전환 후 stale 리스너로 화면이 안 바뀌는 문제 방지)
        if (this._boundRoom !== state.room) this.bindListeners();

        const payload = {
            question: q,
            options: opts,
            anonymous: anonymous,
            status: 'active',
            createdAt: firebase.database.ServerValue.TIMESTAMP
        };
        // 새 설문 게시 → 기존 응답 초기화
        const updates = {};
        updates[`courses/${state.room}/activeSurvey`] = payload;
        updates[`courses/${state.room}/surveyAnswers`] = null;
        firebase.database().ref().update(updates)
            .then(() => {
                // [수정] 실시간 리스너 타이밍과 무관하게 즉시 '취합 화면'으로 전환.
                //  (리스너가 늦게 도착하거나 방 전환으로 누락돼 설정 화면에 멈추던 문제 해결)
                surveyMgr._answers = {};
                surveyMgr.renderState(payload);
                ui.showAlert('✅ 설문이 게시되었습니다. 교육생 화면에 팝업으로 표시됩니다.');
            })
            .catch(e => { console.error(e); ui.showAlert('⚠️ 게시 실패'); });
    },

    end: function() {
        if (!state.room) return;
        if (!confirm('설문을 종료하시겠습니까?\n교육생 팝업이 닫히고, 결과 요약이 한 번 더 표시됩니다.')) return;
        const room = state.room;
        // 종료 직전의 결과를 스냅샷으로 보존 (이력 1개)
        const snapshot = this.computeSnapshot();
        const updates = {};
        updates[`courses/${room}/activeSurvey/status`] = 'ended';
        if (snapshot) updates[`courses/${room}/lastSurveyResult`] = snapshot;
        firebase.database().ref().update(updates)
            .then(() => {
                ui.showAlert('설문이 종료되었습니다.');
                // 종료 결과를 팝업으로 한 번 더 강조
                if (snapshot) surveyMgr.showResultPopup(snapshot);
            });
    },

    // 현재 설문+응답으로 결과 스냅샷 객체 생성
    computeSnapshot: function() {
        const survey = this._survey;
        if (!survey) return null;
        const answers = this._answers || {};
        const opts = survey.options || [];
        const counts = opts.map(() => 0);
        const named = opts.map(() => []);
        Object.entries(answers).forEach(([token, a]) => {
            const idx = (typeof a === 'object') ? a.choice : a;
            if (idx != null && counts[idx] != null) {
                counts[idx]++;
                const nm = (typeof a === 'object' && a.name) ? a.name : token.split('_')[0];
                named[idx].push(nm);
            }
        });
        return {
            question: survey.question,
            options: opts,
            anonymous: !!survey.anonymous,
            counts: counts,
            named: named,
            total: counts.reduce((s, c) => s + c, 0),
            endedAt: Date.now()
        };
    },

    // 결과 막대 HTML 생성 (인라인/팝업 공용)
    buildResultBars: function(opts, counts, total) {
        const palette = ['#0ea5e9','#10b981','#f59e0b','#8b5cf6','#ec4899','#ef4444'];
        return opts.map((o, i) => {
            const pct = total > 0 ? Math.round((counts[i] / total) * 100) : 0;
            const col = palette[i % palette.length];
            return `
                <div>
                    <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:700; margin-bottom:4px;">
                        <span>${this._esc(o)}</span>
                        <span style="color:${col};">${counts[i]}명 (${pct}%)</span>
                    </div>
                    <div style="background:#f1f5f9; border-radius:8px; height:14px; overflow:hidden;">
                        <div style="width:${pct}%; height:100%; background:${col}; transition:width 0.4s;"></div>
                    </div>
                </div>`;
        }).join('');
    },

    // 종료 결과 강조 팝업
    showResultPopup: function(snap) {
        if (!snap) return;
        const modal = document.getElementById('surveyResultPopup');
        if (!modal) return;
        document.getElementById('srpQ').innerText = snap.question || '';
        document.getElementById('srpTotal').innerText = `응답 ${snap.total}명`;
        document.getElementById('srpAnon').innerText = snap.anonymous ? '· 익명 설문' : '· 기명 설문';
        document.getElementById('srpBars').innerHTML = this.buildResultBars(snap.options || [], snap.counts || [], snap.total || 0);
        // 최다 득표(승자) 강조
        let winIdx = -1, winMax = -1;
        (snap.counts || []).forEach((c, i) => { if (c > winMax) { winMax = c; winIdx = i; } });
        const winEl = document.getElementById('srpWinner');
        if (snap.total > 0 && winIdx >= 0) {
            winEl.style.display = 'block';
            winEl.innerHTML = `🏆 최다 선택: <b>${this._esc(snap.options[winIdx])}</b> (${winMax}명)`;
        } else {
            winEl.style.display = 'none';
        }
        // 기명이면 명단
        const detail = document.getElementById('srpNamed');
        if (!snap.anonymous && snap.total > 0) {
            detail.style.display = 'block';
            detail.innerHTML = (snap.options || []).map((o, i) =>
                (snap.named[i] && snap.named[i].length) ? `<div><b>${this._esc(o)}</b>: ${snap.named[i].map(n => this._esc(n)).join(', ')}</div>` : ''
            ).filter(Boolean).join('');
        } else {
            detail.style.display = 'none';
        }
        modal.style.display = 'flex';
    },

    // 저장된 직전 설문 결과 다시 보기
    viewLastResult: function() {
        if (!state.room) return;
        firebase.database().ref(`courses/${state.room}/lastSurveyResult`).once('value', s => {
            const snap = s.val();
            if (!snap) { ui.showAlert('저장된 직전 설문 결과가 없습니다.'); return; }
            this.showResultPopup(snap);
        });
    },

    bindListeners: function() {
        const room = state.room;
        if (!room) return;
        // 이전 방 리스너 해제 (방 전환 시 stale 리스너가 현재 방 이벤트를 무시하던 문제 방지)
        if (this._boundRoom && this._boundRoom !== room) {
            try {
                firebase.database().ref(`courses/${this._boundRoom}/activeSurvey`).off();
                firebase.database().ref(`courses/${this._boundRoom}/surveyAnswers`).off();
            } catch (e) {}
        }
        this._bound = true;
        this._boundRoom = room;
        firebase.database().ref(`courses/${room}/activeSurvey`).on('value', snap => {
            if (state.room !== room) return;
            this.renderState(snap.val());
        });
        firebase.database().ref(`courses/${room}/surveyAnswers`).on('value', snap => {
            if (state.room !== room) return;
            this._answers = snap.val() || {};
            this.renderResult();
        });
    },

    renderState: function(survey) {
        this._survey = survey;
        const composeArea = document.getElementById('surveyComposeArea');
        const resultArea = document.getElementById('surveyResultArea');
        if (!composeArea || !resultArea) return;
        if (survey && survey.status === 'active') {
            composeArea.style.display = 'none';
            resultArea.style.display = 'block';
            this.renderResult();
        } else {
            composeArea.style.display = 'block';
            resultArea.style.display = 'none';
        }
    },

    renderResult: function() {
        const survey = this._survey;
        if (!survey || survey.status !== 'active') return;
        const answers = this._answers || {};
        const opts = survey.options || [];
        const counts = opts.map(() => 0);
        const named = opts.map(() => []);
        Object.entries(answers).forEach(([token, a]) => {
            const idx = (typeof a === 'object') ? a.choice : a;
            if (idx != null && counts[idx] != null) {
                counts[idx]++;
                const nm = (typeof a === 'object' && a.name) ? a.name : token.split('_')[0];
                named[idx].push(nm);
            }
        });
        const total = counts.reduce((s, c) => s + c, 0);

        document.getElementById('surveyResultQ').innerText = survey.question;
        document.getElementById('surveyResultTotal').innerText = `응답 ${total}명`;
        document.getElementById('surveyResultAnon').innerText = survey.anonymous ? '· 익명 설문' : '· 기명 설문';

        document.getElementById('surveyResultBars').innerHTML = this.buildResultBars(opts, counts, total);

        // 기명이면 보기별 응답자 명단
        const detail = document.getElementById('surveyNamedDetail');
        if (!survey.anonymous && total > 0) {
            detail.style.display = 'block';
            detail.innerHTML = opts.map((o, i) =>
                named[i].length ? `<div><b>${this._esc(o)}</b>: ${named[i].map(n => this._esc(n)).join(', ')}</div>` : ''
            ).filter(Boolean).join('');
        } else {
            detail.style.display = 'none';
        }
    },

    _esc: function(s) {
        return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    }
};

/* [JDS260613] 전면 현황판 총괄표 비노출(hideFromBoard) 해제 시 경고 — 연동 플랫폼 데이터 끊김 안내 */
function warnHideFromBoard(cb){
    if(!cb) return;
    if(!cb.checked){
        const ok = confirm(
            '⚠️ 이 과정을 [전면 현황판 총괄표]에서 숨깁니다.\n\n' +
            '숨기면 이 과정은 아래 연동 플랫폼에 표시되지 않고 데이터가 연동되지 않습니다:\n' +
            '· 생활관(기숙사) 배정\n' +
            '· 영양사(식당) 식수 집계\n' +
            '· 미화 · 비품 관리\n' +
            '· 기타 총괄표 기반 플랫폼\n\n' +
            '※ 테스트 · 내부 운용 과정에만 사용하세요.\n\n계속하시겠습니까?'
        );
        if(!ok){ cb.checked = true; }
    }
}
window.warnHideFromBoard = warnHideFromBoard;



/* ===== [공용] 종료된 과정 자동 정리 — 종료일이 지난 방을 다음날 미개설로 비움 =====
   모든 플랫폼(강사·운영부·지원부·영양사)이 로드 시 1회 호출. 하루 1회만 실제 스캔(브라우저별). */
// [비번 옵션화] 예전 기본비번(7777) 잔재를 한 번만 자동 제거 (사용자가 일부러 설정한 비번은 보존)
window.kacClearDefaultPw = async function(){
  try{ if(localStorage.getItem('kac_pwclear_v1')==='1') return; }catch(e){}
  try{
    var DEF = btoa('7777');
    var snap = await firebase.database().ref('courses').get();
    var all = snap.val() || {};
    var updates = {};
    Object.keys(all).forEach(function(r){
      var pw = all[r] && all[r].settings && all[r].settings.password;
      if (pw === DEF) updates['courses/'+r+'/settings/password'] = null;
    });
    if (Object.keys(updates).length) { await firebase.database().ref().update(updates); console.log('[KAC] 기본비번 7777 잔재 제거:', Object.keys(updates).length); }
    try{ localStorage.setItem('kac_pwclear_v1','1'); }catch(e){}
  }catch(e){ console.warn('[KAC pwclear] 스킵:', e && e.message); }
};

/* ══ [J13] 수료 기념사진 (gradMgr) ══════════════════════════════════════════
   흐름: 강사가 수료식 때 폰으로 단체사진 촬영 → QR(grad_photo.html?room=X)로 업로드(긴변 1600·JPEG 0.8 압축)
        → courses/{room}/gradPhoto = { dataUrl, updatedAt, endDate(과정 종료일) }
        → 액자(grad_frame.png, 가운데 투명)에 cover-fit 합성 + 하단 4칸(과정명/기간/장소/담임) 텍스트
        → 강사·교육생 출결 화면에서 다운로드. 유효기간: 수료일(endDate) 자정까지 — 이후 자동 정리(kacExpire)와 리셋에서 삭제.
   텍스트 좌표: system/sharedGuide/gradPhotoPos/{name|period|venue|prof} = {l,t} (액자 % 기준, 3초 드래그 보정·전 과정 공통) */
window.gradMgr = {
    FRAME_URL: 'grad_frame.png',
    FRAME_FALLBACK: 'https://raw.githubusercontent.com/kac-edu/CATC/main/grad_frame.png',
    HOLE: { l: 10.01, t: 26.52, r: 89.85, b: 69.80 },              // 액자 투명 구멍(실측 %)
    DEF_POS: { name: { l: 21.5, t: 76.4 }, period: { l: 64.3, t: 76.4 }, venue: { l: 22.8, t: 85.4 }, prof: { l: 64.0, t: 85.5 } },
    _pos: null, _frameImg: null, _cur: null, _ref: null, _posRef: null,
    _room: function () { return state.room; },
    _todayStr: function () { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); },
    _endDateOf: function (period) { const p = String(period || ''); const sep = p.indexOf(' ~ ') >= 0 ? ' ~ ' : '~'; const parts = p.split(sep); return (parts[1] || parts[0] || '').trim(); },
    _loadFrame: function () {
        if (this._frameImg) return Promise.resolve(this._frameImg);
        const self = this;
        return new Promise(function (res, rej) {
            const im = new Image(); im.crossOrigin = 'anonymous';
            im.onload = function () { self._frameImg = im; res(im); };
            im.onerror = function () {
                const im2 = new Image(); im2.crossOrigin = 'anonymous';
                im2.onload = function () { self._frameImg = im2; res(im2); };
                im2.onerror = rej;
                im2.src = self.FRAME_FALLBACK;
            };
            im.src = self.FRAME_URL;
        });
    },
    _loadPos: function () {
        const self = this;
        if (this._posRef) return;
        try {
            this._posRef = firebase.database().ref('system/sharedGuide/gradPhotoPos');
            this._posRef.on('value', function (s) { self._pos = s.val() || null; self._applyDragPos(); });
        } catch (e) {}
    },
    _getPos: function (k) { const p = (this._pos || {})[k]; return (p && typeof p.l === 'number') ? p : this.DEF_POS[k]; },
    // ── 합성: 원본사진 + 액자 + 텍스트 → 캔버스 ──
    composite: async function (photoUrl, info) {
        const frame = await this._loadFrame();
        const W = frame.naturalWidth, H = frame.naturalHeight;
        const photo = await new Promise(function (res, rej) { const im = new Image(); im.onload = function () { res(im); }; im.onerror = rej; im.src = photoUrl; });
        const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
        const ctx = cv.getContext('2d');
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
        const h = this.HOLE, hx = h.l / 100 * W, hy = h.t / 100 * H, hw = (h.r - h.l) / 100 * W, hh = (h.b - h.t) / 100 * H;
        const sc = Math.max(hw / photo.naturalWidth, hh / photo.naturalHeight);
        const nw = photo.naturalWidth * sc, nh = photo.naturalHeight * sc;
        ctx.save(); ctx.beginPath(); ctx.rect(hx, hy, hw, hh); ctx.clip();
        ctx.drawImage(photo, hx - (nw - hw) / 2, hy - (nh - hh) / 2, nw, nh);
        ctx.restore();
        ctx.drawImage(frame, 0, 0, W, H);
        ctx.fillStyle = '#0f2057'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
        const self = this;
        // [J13.1] 칸 오른쪽 경계(액자 실측 %) 안에 들어오도록 measureText 기반 자동 축소 — 길이 추정 휴리스틱 제거
        const BOX_R = { name: 48.3, venue: 48.3, period: 89.3, prof: 89.3 };
        const FONT = function (px) { return '900 ' + px + "px 'Pretendard','Malgun Gothic','Apple SD Gothic Neo',sans-serif"; };
        [['name', info.name], ['period', info.period], ['venue', info.venue], ['prof', info.prof]].forEach(function (pair) {
            const p = self._getPos(pair[0]);
            const t = String(pair[1] || '-');
            const maxW = Math.max(60, (BOX_R[pair[0]] - p.l - 0.8) / 100 * W);
            let fs = Math.round(W * 0.0205);
            ctx.font = FONT(fs);
            while (fs > 11 && ctx.measureText(t).width > maxW) { fs -= 1; ctx.font = FONT(fs); }
            ctx.fillText(t, p.l / 100 * W, p.t / 100 * H);
        });
        return cv;
    },
    _info: null,
    _loadInfo: async function () {
        const room = this._room();
        const s = await firebase.database().ref('courses/' + room).once('value');
        const v = s.val() || {}, set = v.settings || {}, stt = v.status || {};
        const fmt = function (p) { try { return guideMgr._fmtPeriod ? (guideMgr._fmtPeriod(p) || p) : p; } catch (e) { return p; } };
        this._info = {
            name: set.courseName || '과정명 미설정',
            period: fmt(set.period || '') || '-',
            venue: set.roomDetailName || '-',
            prof: (stt.professorName ? stt.professorName + ' 교수' : '-'),
            endDate: this._endDateOf(set.period)
        };
        return this._info;
    },
    // ── 모달 ──
    _ensureModal: function () {
        if (document.getElementById('gradPhotoModal')) return;
        const m = document.createElement('div');
        m.id = 'gradPhotoModal';
        m.innerHTML = ''
            + '<div class="grad-box" onclick="event.stopPropagation()">'
            + '  <div class="grad-head"><b>📸 수료 기념사진</b><button class="grad-x" onclick="gradMgr.close()"><i class="fa-solid fa-xmark"></i></button></div>'
            + '  <div class="grad-body">'
            + '    <div id="gradEmpty" style="display:none;">'
            + '      <div class="grad-guide">수료식에서 <b>스마트폰으로 단체사진</b>을 찍고 아래 QR로 업로드하세요.<br>업로드되면 액자에 자동 합성되고, 교육생도 <b>수료일 자정까지</b> 출결 화면에서 내려받을 수 있습니다.</div>'
            + '      <div id="gradQr" class="grad-qr"></div>'
            + '      <div class="grad-or">— 또는 —</div>'
            + '      <button class="grad-btn grad-btn-blue" onclick="document.getElementById(\'gradFile\').click()"><i class="fa-solid fa-file-arrow-up"></i> 이 기기에서 사진 선택</button>'
            + '      <input type="file" id="gradFile" accept="image/*" style="display:none;" onchange="gradMgr._onFile(this)">'
            + '    </div>'
            + '    <div id="gradPrev" style="display:none;">'
            + '      <div id="gradCanvasWrap" class="grad-canvas-wrap"><canvas id="gradCanvas"></canvas><div id="gradDragLayer"></div></div>'
            + '      <div class="grad-hint"><i class="fa-solid fa-hand-pointer"></i> 하단 글자를 <b>3초</b> 꾹 누르면 위치를 옮길 수 있습니다 (모든 과정 공통 저장)</div>'
            + '      <div class="grad-actions">'
            + '        <button class="grad-btn grad-btn-green" onclick="gradMgr.download()"><i class="fa-solid fa-download"></i> PNG 다운로드</button>'
            + '        <button class="grad-btn grad-btn-blue" onclick="gradMgr.reshootPhone()"><i class="fa-solid fa-mobile-screen-button"></i> 폰으로 다시 찍기</button>'
            + '        <button class="grad-btn grad-btn-gray" onclick="document.getElementById(\'gradFile2\').click()"><i class="fa-solid fa-rotate"></i> 사진 교체</button>'
            + '        <input type="file" id="gradFile2" accept="image/*" style="display:none;" onchange="gradMgr._onFile(this)">'
            + '        <button class="grad-btn grad-btn-red" onclick="gradMgr.remove()"><i class="fa-solid fa-trash"></i> 삭제</button>'
            + '      </div>'
            + '    </div>'
            + '  </div>'
            + '</div>';
        m.addEventListener('click', function () { gradMgr.close(); });
        document.body.appendChild(m);
    },
    open: function () {
        if (!this._room()) { ui.showAlert('강의실을 먼저 선택하세요.'); return; }
        this._ensureModal();
        this._loadPos();
        const m = document.getElementById('gradPhotoModal');
        try {
            const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
            if (fsEl && fsEl.contains && !fsEl.contains(m)) fsEl.appendChild(m);
        } catch (e) {}
        m.style.display = 'flex';
        // QR
        try {
            const qr = document.getElementById('gradQr'); qr.innerHTML = '';
            const url = new URL('grad_photo.html', location.href).href + '?room=' + encodeURIComponent(this._room());
            new QRCode(qr, { text: url, width: 190, height: 190, correctLevel: QRCode.CorrectLevel.M });
        } catch (e) {}
        // 사진 구독
        const room = this._room(), self = this;
        if (this._ref) { try { this._ref.off(); } catch (e) {} }
        this._ref = firebase.database().ref('courses/' + room + '/gradPhoto/updatedAt');
        this._ref.on('value', async function (s) {
            if (self._room() !== room) return;
            const ts = s.val();
            if (!ts) { self._cur = null; self._showState(false); return; }
            try {
                const ds = await firebase.database().ref('courses/' + room + '/gradPhoto/dataUrl').once('value');
                self._cur = ds.val() || null;
                self._showState(!!self._cur);
                if (self._cur) self._renderPreview();
            } catch (e) {}
        });
    },
    close: function () {
        const m = document.getElementById('gradPhotoModal');
        if (m) m.style.display = 'none';
        if (this._ref) { try { this._ref.off(); } catch (e) {} this._ref = null; }
    },
    _showState: function (has) {
        const e1 = document.getElementById('gradEmpty'), e2 = document.getElementById('gradPrev');
        if (e1) e1.style.display = has ? 'none' : 'block';
        if (e2) e2.style.display = has ? 'block' : 'none';
    },
    // [폰으로 다시 찍기] 현재 사진은 두고 QR 화면으로 되돌려, 휴대폰으로 다시 촬영·업로드하면 자동 교체
    reshootPhone: function () {
        // QR 화면(gradEmpty) 표시 — 새 사진이 폰에서 올라오면 _ref 리스너가 감지해 자동으로 액자로 전환됨
        this._showState(false);
        try {
            const qr = document.getElementById('gradQr');
            if (qr && (!qr.firstChild)) {   // QR이 비어있으면 다시 렌더
                qr.innerHTML = '';
                const url = new URL('grad_photo.html', location.href).href + '?room=' + encodeURIComponent(this._room());
                new QRCode(qr, { text: url, width: 190, height: 190, correctLevel: QRCode.CorrectLevel.M });
            }
        } catch (e) {}
        if (ui.showAlert) ui.showAlert('📱 휴대폰으로 QR을 스캔해 다시 촬영·업로드하면 사진이 자동으로 교체됩니다.');
    },
    _onFile: function (input) {
        const f = input.files && input.files[0];
        input.value = '';
        if (!f) return;
        const self = this;
        const rd = new FileReader();
        rd.onload = function () {
            const im = new Image();
            im.onload = async function () {
                const MAX = 1600;
                const sc = Math.min(1, MAX / Math.max(im.width, im.height));
                const cv = document.createElement('canvas');
                cv.width = Math.round(im.width * sc); cv.height = Math.round(im.height * sc);
                cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
                const dataUrl = cv.toDataURL('image/jpeg', 0.8);
                try {
                    const info = await self._loadInfo();
                    await firebase.database().ref('courses/' + self._room() + '/gradPhoto').set({ dataUrl: dataUrl, updatedAt: Date.now(), endDate: info.endDate || '' });
                    ui.showAlert('✅ 기념사진이 업로드되었습니다.\n교육생은 출결 화면에서 수료일 자정까지 내려받을 수 있습니다.');
                } catch (err) { ui.showAlert('❌ 업로드 실패: ' + (err && err.message || err)); }
            };
            im.src = rd.result;
        };
        rd.readAsDataURL(f);
    },
    _renderPreview: async function () {
        if (!this._cur) return;
        try {
            const info = await this._loadInfo();
            const cv = await this.composite(this._cur, info);
            const el = document.getElementById('gradCanvas');
            if (!el) return;
            el.width = cv.width; el.height = cv.height;
            el.getContext('2d').drawImage(cv, 0, 0);
            this._buildDragLayer(info);
        } catch (e) { console.warn('[기념사진]', e); }
    },
    // 텍스트 4칸 드래그 보정 (미리보기 위 오버레이, 액자 % 좌표로 저장)
    _buildDragLayer: function (info) {
        const layer = document.getElementById('gradDragLayer');
        if (!layer) return;
        layer.innerHTML = '';
        const self = this;
        [['name', info.name], ['period', info.period], ['venue', info.venue], ['prof', info.prof]].forEach(function (pair) {
            const el = document.createElement('div');
            el.className = 'grad-drag-item';
            el.dataset.key = pair[0];
            el.textContent = pair[1] || '-';
            el.title = '3초간 꾹 누르면 위치를 옮길 수 있습니다';
            layer.appendChild(el);
            self._bindDrag(el);
        });
        this._applyDragPos();
    },
    _applyDragPos: function () {
        const layer = document.getElementById('gradDragLayer');
        if (!layer) return;
        const self = this;
        Array.prototype.forEach.call(layer.children, function (el) {
            const p = self._getPos(el.dataset.key);
            el.style.left = p.l + '%'; el.style.top = p.t + '%';
        });
    },
    _bindDrag: function (el) {
        const self = this;
        el.style.touchAction = 'none';
        let hold = null, dragging = false;
        el.addEventListener('pointerdown', function (e) {
            e.stopPropagation();
            try { el.setPointerCapture(e.pointerId); } catch (_) {}
            dragging = false;
            el.classList.add('grad-pressing');
            clearTimeout(hold);
            hold = setTimeout(function () { dragging = true; el.classList.remove('grad-pressing'); el.classList.add('grad-dragging'); if (navigator.vibrate) navigator.vibrate(40); }, 3000);
        });
        el.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            e.preventDefault(); e.stopPropagation();
            const r = document.getElementById('gradCanvasWrap').getBoundingClientRect();
            const l = Math.max(0, Math.min(97, (e.clientX - r.left) / r.width * 100));
            const t = Math.max(0, Math.min(97, (e.clientY - r.top) / r.height * 100));
            el.style.left = l + '%'; el.style.top = t + '%';
            el._cur = { l: Math.round(l * 10) / 10, t: Math.round(t * 10) / 10 };
        });
        function fin(e) {
            clearTimeout(hold);
            el.classList.remove('grad-pressing');
            if (!dragging) return;
            dragging = false;
            el.classList.remove('grad-dragging');
            e.stopPropagation();
            if (!el._cur) return;
            try { firebase.database().ref('system/sharedGuide/gradPhotoPos/' + el.dataset.key).set(el._cur); } catch (err) {}
            self._renderPreview();   // 캔버스에 즉시 반영
        }
        el.addEventListener('pointerup', fin);
        el.addEventListener('pointercancel', function () { clearTimeout(hold); el.classList.remove('grad-pressing'); el.classList.remove('grad-dragging'); dragging = false; });
    },
    download: async function () {
        if (!this._cur) return;
        try {
            const info = await this._loadInfo();
            const cv = await this.composite(this._cur, info);
            const a = document.createElement('a');
            a.download = '수료기념사진_' + String(info.name || '').replace(/[\\/:*?"<>|]/g, '') + '_' + this._todayStr() + '.png';
            a.href = cv.toDataURL('image/png');
            a.click();
        } catch (e) { ui.showAlert('❌ 다운로드 실패: ' + (e && e.message || e)); }
    },
    remove: function () {
        const self = this;
        if (!confirm('기념사진을 삭제할까요?\n교육생 다운로드 버튼도 함께 사라집니다.')) return;
        firebase.database().ref('courses/' + this._room() + '/gradPhoto').remove()
            .then(function () { ui.showAlert('삭제되었습니다.'); })
            .catch(function (e) { ui.showAlert('❌ 삭제 실패: ' + (e && e.message || e)); });
    },
    // [J14] 대시보드 히어로(강의장소 옆) 노란 버튼 — 수료일 '당일' KST 06:00부터 노출
    _heroTimer: null,
    refreshHeroBtn: function (period) {
        const btn = document.getElementById('dashGradBtn');
        if (!btn) return;
        const end = this._endDateOf(period);
        const now = new Date();
        const today = this._todayStr();
        const show = !!end && end === today && now.getHours() >= 6;
        // .info-pill의 display !important와 충돌하지 않도록 전용 클래스로 노출을 제어한다.
        btn.classList.toggle('is-visible', show);
        if (this._heroTimer) { clearTimeout(this._heroTimer); this._heroTimer = null; }
        // 수료일 새벽에 열어둔 화면: 06:00이 되는 순간 자동 노출
        if (end === today && now.getHours() < 6) {
            const t = new Date(); t.setHours(6, 0, 5, 0);
            this._heroTimer = setTimeout(function () { try { gradMgr.refreshHeroBtn(period); } catch (e) {} }, Math.max(1000, t - now));
        }
    }
};

/* ══ [J12] 비대면 입교안내 교육개요(4p) 오버레이 — 항목별 값 표기 + 3초 롱프레스 이동
   좌표: system/sharedGuide/overviewPos/{항목}/{window|fullscreen} = {l,t} (%), 전 과정 공통·화면모드별 개별 저장 ══ */
ui._ovwFB = 'system/sharedGuide/overviewPos';
ui._ovwDefaults = {
    name:   { l: 32,   t: 34.6 },
    count:  { l: 32,   t: 44.9 },
    period: { l: 32,   t: 55.1 },
    cat:    { l: 32,   t: 65.3 },
    ev:     { l: 32,   t: 75.5 },
    zoom:   { l: 39.5, t: 85.7 }
};
ui._ovwPos = {};
ui._ovwMode = function () { return (document.fullscreenElement || document.webkitFullscreenElement) ? 'fullscreen' : 'window'; };
ui._ovwSubscribed = false;
ui._ovwSubscribe = function () {
    if (ui._ovwSubscribed) return;
    if (!(window.firebase && firebase.database)) { setTimeout(ui._ovwSubscribe, 800); return; }
    ui._ovwSubscribed = true;
    try {
        firebase.database().ref(ui._ovwFB).on('value', function (s) {
            ui._ovwPos = s.val() || {};
            ui._ovwApplyAll();
        });
    } catch (e) { ui._ovwSubscribed = false; }
};
ui._ovwApply = function (el) {
    if (!el) return;
    var key = el.dataset.key;
    var saved = (ui._ovwPos[key] || {})[ui._ovwMode()];
    var p = (saved && typeof saved.l === 'number') ? saved : ui._ovwDefaults[key];
    if (!p) return;
    el.style.left = p.l + '%';
    el.style.top = p.t + '%';
};
ui._ovwApplyAll = function () {
    var host = document.getElementById('guideOverviewOverlay');
    if (!host) return;
    Array.prototype.forEach.call(host.children, ui._ovwApply);
};
ui._ovwBind = function (el) {
    if (el._ovwBound) return; el._ovwBound = true;
    el.style.touchAction = 'none';
    var holdTimer = null, dragging = false;
    el.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        e.stopPropagation();
        dragging = false;
        try { el.setPointerCapture(e.pointerId); } catch (_) {}
        clearTimeout(holdTimer);
        el.classList.add('ovw-pressing');
        holdTimer = setTimeout(function () {
            dragging = true;
            el.classList.remove('ovw-pressing');
            el.classList.add('ovw-dragging');
            if (navigator.vibrate) navigator.vibrate(40);
        }, 3000);
    });
    el.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        e.stopPropagation(); e.preventDefault();
        var wrap = document.getElementById('pdfWrapper'); if (!wrap) return;
        var r = wrap.getBoundingClientRect();
        var l = Math.max(0, Math.min(96, (e.clientX - r.left) / r.width * 100));
        var t = Math.max(0, Math.min(96, (e.clientY - r.top) / r.height * 100));
        el.style.left = l + '%'; el.style.top = t + '%';
        el._ovwCur = { l: Math.round(l * 10) / 10, t: Math.round(t * 10) / 10 };
    });
    function finish(e) {
        clearTimeout(holdTimer);
        el.classList.remove('ovw-pressing');
        if (!dragging) return;
        dragging = false;
        el.classList.remove('ovw-dragging');
        el._ovwJustDragged = true;                                   // [J12.2] 드래그 직후 클릭 무시
        setTimeout(function () { el._ovwJustDragged = false; }, 350);
        e.stopPropagation();
        var p = el._ovwCur; if (!p) return;
        var key = el.dataset.key, m = ui._ovwMode();
        if (!ui._ovwPos[key]) ui._ovwPos[key] = {};
        ui._ovwPos[key][m] = p;
        try { firebase.database().ref(ui._ovwFB + '/' + key + '/' + m).set({ l: p.l, t: p.t }); } catch (err) {}
        if (ui.showAlert) ui.showAlert('📍 위치가 저장되었습니다 (' + (m === 'fullscreen' ? '전체화면' : '윈도우') + ' 기준 · 모든 과정 공통)');
    }
    el.addEventListener('pointerup', finish);
    el.addEventListener('pointercancel', function () { clearTimeout(holdTimer); el.classList.remove('ovw-pressing'); el.classList.remove('ovw-dragging'); dragging = false; });
};
ui.renderOverviewOverlay = async function () {
    var host = document.getElementById('guideOverviewOverlay');
    if (!host) return;
    ui._ovwSubscribe();
    var room = state.room;
    var renderToken = (ui._ovwRenderToken = (ui._ovwRenderToken || 0) + 1);
    // [J12.1] slot.courseInfo 의존 제거 — 진입 경로/타이밍과 무관하게 항상 최신 값을 직접 조회
    var name = '', period = '', cat = 'duty-general', ev = 'none', count = 0, zoomTxt = '미입력';
    try {
        var results = await Promise.all([
            firebase.database().ref('courses/' + room + '/settings').once('value'),
            firebase.database().ref('courses/' + room + '/students').once('value'),
            firebase.database().ref('courses/' + room + '/zoomMeeting').once('value')
        ]);
        var set = results[0].val() || {};
        name = String(set.courseName || '').trim();
        period = String(set.period || '').trim();
        var gi = set.guideCourseInfo || {};
        if (gi.category) cat = gi.category;
        if (gi.evaluation) ev = gi.evaluation;
        var stu = results[1].val() || {};
        count = new Set(Object.values(stu).filter(function (x) { return x && x.name && x.name !== 'undefined'; }).map(function (x) { return String(x.name).trim(); })).size;
        var zv = results[2].val() || {};
        var no = String(zv.no || '').trim(), pw = String(zv.pw || '').trim();
        if (no || pw) zoomTxt = (no || '-') + (pw ? '\u00A0\u00A0/\u00A0\u00A0' + pw : '');
    } catch (e) { console.warn('[교육개요]', e); }
    if (renderToken !== ui._ovwRenderToken || state.room !== room) return;   // 늦게 도착한 응답 무시
    var catTxt = (cat === 'duty-legal') ? '직무 법정' : '직무 일반';
    var evTxt = (ev === 'written') ? '필기평가 (90%) + 근태 (10%)' : '없음 (근태평가 10%)';
    var items = [
        { k: 'name',   v: name || '과정명 미설정' },
        { k: 'count',  v: count + ' 명' },
        { k: 'period', v: (guideMgr._fmtPeriod ? guideMgr._fmtPeriod(period) : period) || '기간 미설정' },
        { k: 'cat',    v: catTxt },
        { k: 'ev',     v: evTxt },
        { k: 'zoom',   v: zoomTxt }
    ];
    // [J12.1] 글자 크기: PDF(래퍼) 폭에 비례 — PDF 라벨과 같은 비율로 커지고 작아짐
    var wrap = document.getElementById('pdfWrapper');
    var w = wrap ? wrap.getBoundingClientRect().width : 1050;
    var fsMain = Math.round(w * 0.030);             // [J12.2] PDF 라벨과 같은 크기감 (더 크게)
    var fsSub = Math.round(w * 0.026);              // 평가·회의 ID/PW (문장이 길어 반 단계만 작게)
    host.innerHTML = '';
    items.forEach(function (it) {
        var el = document.createElement('div');
        el.className = 'ovw-item';
        el.dataset.key = it.k;
        el.textContent = it.v;
        el.style.fontSize = ((it.k === 'ev' || it.k === 'zoom') ? fsSub : fsMain) + 'px';
        el.title = (it.k === 'zoom' ? '클릭: 회의 ID/PW 입력·수정 (ZOOM 연동 화면 전체 적용)\n' : '') + '3초간 꾹 누르면 위치를 옮길 수 있습니다 (윈도우/전체화면 좌표 개별 저장 · 모든 과정 공통)';
        if (it.k === 'zoom') el.style.cursor = 'pointer';            // [J12.2] 회의정보는 클릭 입력 지원
        el.addEventListener('click', function (e) {
            e.stopPropagation();
            if (it.k === 'zoom' && !el._ovwJustDragged) ui.askZoomMeetingInfo(state.room);
        });
        el.addEventListener('contextmenu', function (e) { e.stopPropagation(); e.preventDefault(); });
        host.appendChild(el);
        ui._ovwBind(el);
    });
    ui._ovwApplyAll();
};

/* ══ [J11] 지원부 판독 교육시간표 — 아래→위 슬라이드 시트 + 병합셀 그대로 렌더 ══ */
ui._renderParsedGrid = function (grid) {
    var R = Number(grid.rows || 0), C = Number(grid.cols || 0), cells = grid.cells || [];
    if (!R || !C || !cells.length) return '<div style="padding:30px;text-align:center;color:#94a3b8;font-weight:800;">시간표 데이터가 비어 있습니다.</div>';
    var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
    var cellAt = {}, occ = {};
    cells.forEach(function (c) { cellAt[c.r + '_' + c.c] = c; });
    function fmt(t) {
        t = String(t || '').trim();
        if (!t) return '';
        var compact = t.replace(/\s+/g, '');
        if (/^\d{1,2}:\d{2}[~\u223C\uFF5E](\d{1,2}:\d{2})?$/.test(compact)) return esc(compact);   // 시간칸 한 줄
        var m = t.match(/^(.*?)[\s]*\(([^()]{1,24})\)$/);   // "과목명 (강사)" → 두 줄 센터
        if (m && m[1].trim()) return esc(m[1].trim()) + '<span class="pss-teacher">(' + esc(m[2].trim()) + ')</span>';
        return esc(t);
    }
    var html = '<table class="pss-table"><colgroup>';
    for (var cc = 0; cc < C; cc++) html += '<col' + (cc === 0 ? ' style="width:48px"' : (cc === 1 ? ' style="width:96px"' : '')) + '>';
    html += '</colgroup>';
    for (var r = 0; r < R; r++) {
        html += '<tr>';
        for (var c2 = 0; c2 < C; c2++) {
            if (occ[r + '_' + c2]) continue;
            var cell = cellAt[r + '_' + c2];
            if (!cell) { occ[r + '_' + c2] = 1; html += '<td class="pss-empty"></td>'; continue; }
            for (var rr = cell.r; rr < cell.r + cell.rs; rr++) for (var xx = cell.c; xx < cell.c + cell.cs; xx++) occ[rr + '_' + xx] = 1;
            var t = String(cell.t || '');
            var cls = [];
            var isLunch = /점\s*심|중\s*식|식\s*사/.test(t) && cell.cs > 1;
            if (r < 2 && (/일\s*자|시\s*간|^[월화수목금토일]$/.test(t.trim()) || /\d+\s*월\s*\d+\s*일/.test(t) || /\d+\s*일차/.test(t))) cls.push('pss-hdr');
            else if (c2 === 0 && /^\d{1,2}$/.test(t.trim())) cls.push('pss-period');
            else if (/^\d{1,2}\s*:\s*\d{2}/.test(t.trim()) && c2 <= 1) cls.push('pss-time');
            if (isLunch) cls.push('pss-lunch');
            else if ((cell.rs > 1 || cell.cs > 1) && cls.indexOf('pss-hdr') < 0) cls.push('pss-merged');   // [핵심] 줄합침 강의: 병합 + 센터정렬(td 기본)
            if (!t.trim()) cls.push('pss-empty');
            html += '<td' + (cls.length ? ' class="' + cls.join(' ') + '"' : '') + (cell.rs > 1 ? ' rowspan="' + cell.rs + '"' : '') + (cell.cs > 1 ? ' colspan="' + cell.cs + '"' : '') + '>' + fmt(t) + '</td>';
        }
        html += '</tr>';
    }
    return html + '</table>';
};
ui.openParsedSchedule = function () {
    var slot = (window.guideMgr && guideMgr._slot) ? guideMgr._slot() : null;
    var grid = slot && slot.parsedGrid;
    var sheet = document.getElementById('parsedScheduleSheet');
    var body = document.getElementById('pssBody');
    if (!sheet || !body) return;
    if (!grid) { ui.showAlert('판독된 시간표가 없습니다.\n지원부에서 한글 시간표(명단 파일)를 업로드하면 자동 등록됩니다.'); return; }
    body.innerHTML = ui._renderParsedGrid(grid);
    var title = document.getElementById('pssTitle');
    if (title) {
        title.innerHTML = '<i class="fa-solid fa-calendar-days"></i> 교육 시간표';
        try {
            firebase.database().ref(`courses/${state.room}/settings`).once('value').then(function (s) {
                var v = s.val() || {};
                if (v.courseName) title.innerHTML = '<i class="fa-solid fa-calendar-days"></i> ' + String(v.courseName).replace(/</g, '&lt;') + (v.period ? ' <span style="font-size:.68em;font-weight:800;opacity:.75;margin-left:8px;">' + String(v.period).replace(/</g, '&lt;') + '</span>' : '');
            });
        } catch (e) {}
    }
    sheet.style.display = 'flex';
    requestAnimationFrame(function () { requestAnimationFrame(function () { sheet.classList.add('pss-open'); }); });
};
ui.closeParsedSchedule = function () {
    var sheet = document.getElementById('parsedScheduleSheet');
    if (!sheet) return;
    sheet.classList.remove('pss-open');
    setTimeout(function () { if (!sheet.classList.contains('pss-open')) sheet.style.display = 'none'; }, 430);
};

window.kacExpireEndedCourses = async function(){
  try{
    var today=(function(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');})();
    try{ if(localStorage.getItem('kac_expire_done')===today) return; }catch(e){}
    if(typeof firebase==='undefined'||!firebase.database) return;
    var snap=await firebase.database().ref('courses').once('value');
    var rooms=snap.val()||{};
    var dormRosters={}; try{ dormRosters=(await firebase.database().ref('system/dorm/rosters').once('value')).val()||{}; }catch(e){}
    var updates={}; var archives=[];
    for(var i=65;i<=90;i++){
      var room=String.fromCharCode(i); var rd=rooms[room]; if(!rd) continue;
      var st=rd.settings||{}, stt=rd.status||{};
      if(st.autoAssignLocked) continue;            // 차주 유지 방 보존
      if(stt.roomStatus!=='active') continue;
      var nm=(st.courseName||'').trim(); var pd=(st.period||'').trim();
      var end=pd.indexOf('~')>=0?pd.split('~').pop().trim():'';
      if(!nm||!end) continue;
      if(end < today){                              // 종료일 지남 → 비움
        var aa=rd.admin_actions||{}, ia=rd.internal_attendance||{}, stu=rd.students||{};
        if(Object.keys(aa).length||Object.keys(ia).length||Object.keys(stu).length){
          archives.push(firebase.database().ref('system/course_archive/'+room+'_'+Date.now()).set({room:room,courseName:nm,period:pd,prof:stt.professorName||'',coord:st.coordinatorName||'',admin_actions:aa,internal_attendance:ia,students:stu,expectedStudents:(rd.expectedStudents||null),archivedAt:firebase.database.ServerValue.TIMESTAMP}).catch(function(){}));
        }
        var b='courses/'+room+'/';
        ['students','internal_attendance','questions','admin_actions','shuttle','dinner_skips','tablet_loans','connections','quizAnswers','expectedStudents','coordRoster','activeQuiz','quizFinalResults','attendanceQR','scheduleImage','coordNoticeHistory','gradPhoto'].forEach(function(k){ updates[b+k]=null; });
        updates[b+'boardNotice']=''; updates[b+'notice']=''; updates[b+'coordNotice']='';
        updates[b+'settings/courseName']=''; updates[b+'settings/period']=null; updates[b+'settings/coordinatorName']=null; updates[b+'settings/password']=null;
        updates[b+'status/professorName']=''; updates[b+'status/roomStatus']='idle'; updates[b+'status/ownerSessionId']=null; updates[b+'status/resetKey']='rk_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);
        try{ var s=pd.indexOf(' ~ ')>=0?pd.split(' ~ ')[0].trim():(pd.split('~')[0]||'').trim();
          if(s){ var d=new Date(s+'T00:00:00'); if(!isNaN(d)){ var dw=(d.getDay()+6)%7; var mo=new Date(d); mo.setDate(d.getDate()-dw);
            var u=mo.toISOString().slice(0,10); var l=mo.getFullYear()+'-'+String(mo.getMonth()+1).padStart(2,'0')+'-'+String(mo.getDate()).padStart(2,'0');
            var _nrm=nm.replace(/\s+/g,'');
            [u+'__'+room, l+'__'+room].forEach(function(rk){ var rv=dormRosters[rk];
              if(rv && String(rv.courseName||'').replace(/\s+/g,'').trim()===_nrm) updates['system/dorm/rosters/'+rk]=null; }); }}
        }catch(e){}
      }
    }
    if(archives.length){ try{ await Promise.all(archives); }catch(e){} }
    if(Object.keys(updates).length){ await firebase.database().ref().update(updates); console.log('[KAC] 종료 과정 자동 정리 완료'); }
    try{ localStorage.setItem('kac_expire_done', today); }catch(e){}
  }catch(e){ console.warn('[KAC expire] 스킵:', e && e.message); }
};

// ===== 과정현황 항목 인라인 수정 (달력·드롭다운 팝업) =====
ui.openFieldEdit = async function(field){
  if (state.isObserver) { ui.showAlert("👁️ 옵저버 모드에서는 수정할 수 없습니다."); return; }
  if (!state.room) { ui.showAlert("강의실을 먼저 선택하세요."); return; }
  ui._editField = field;
  var modal=document.getElementById('fieldEditModal');
  var box=modal.querySelector('.modal-box');
  var titleEl=document.getElementById('fieldEditTitle');
  var bodyEl=document.getElementById('fieldEditBody');
  var msg=document.getElementById('fieldEditMsg'); if(msg) msg.textContent='';
  var get=function(id){ var e=document.getElementById(id); return e? (e.innerText||'').trim() : ''; };
  var selStyle='width:100%; padding:12px; border:1.5px solid #cbd5e1; border-radius:10px; font-size:15px; outline:none; box-sizing:border-box; background:#fff;';
  if(box) box.style.width = (field==='period') ? '860px' : '440px';

  if(field==='period'){
    titleEl.textContent='교육 기간 수정';
    bodyEl.innerHTML='<input type="text" id="fe-period" style="display:none;"><div style="display:flex; justify-content:center;"></div>';
    modal.style.display='flex';
    setTimeout(function(){
      try{ var ex=document.getElementById('fe-period')._flatpickr; if(ex) ex.destroy(); }catch(e){}
      var pd=get('dashPeriod'); var defaults=[];
      if(pd.indexOf('~')>=0){ var pp=pd.split('~'); var a=(pp[0]||'').trim(), b=(pp[1]||'').trim(); if(a)defaults.push(a); if(b)defaults.push(b); }
      flatpickr('#fe-period', { mode:'range', locale:'ko', dateFormat:'Y-m-d', showMonths:2, inline:true, closeOnSelect:false, disableMobile:'true', defaultDate: defaults.length?defaults:null });
    }, 60);
    return;
  }

  if(field==='roomDetail'){
    titleEl.textContent='교육 장소 수정';
    var src=document.getElementById('setup-room-select');
    var inner = src ? src.innerHTML : '<option value="">--- 장소 선택 ---</option>';
    bodyEl.innerHTML='<select id="fe-val" style="'+selStyle+'">'+inner+'</select>'
      +'<input type="text" id="fe-direct" placeholder="위치 직접 작성" style="'+selStyle+'display:none; margin-top:8px;">';
    var selEl=document.getElementById('fe-val'); var dirEl=document.getElementById('fe-direct');
    selEl.onchange=function(){ dirEl.style.display=(this.value==='direct')?'block':'none'; };
    try{
      var snap=await firebase.database().ref('courses').get(); var all=snap.val()||{}; var occ=[];
      Object.keys(all).forEach(function(r){ if(r!==state.room && all[r].status && all[r].status.roomStatus==='active'){ var loc=all[r].settings&&all[r].settings.roomDetailName; if(loc) occ.push(loc); } });
      Array.from(selEl.options).forEach(function(opt){ if(opt.value && occ.indexOf(opt.value)>=0){ opt.text=opt.text+' (이미 사용 중)'; opt.disabled=true; opt.style.color='#cbd5e1'; } });
    }catch(e){}
    var cur=get('dashRoomDetail'); if(cur && cur!=='-' && cur!=='장소 미설정') selEl.value=cur;
    modal.style.display='flex'; return;
  }

  if(field==='prof'){
    titleEl.textContent='담임 교수 수정';
    var opts='<option value="">(선택 안함)</option>';
    (profMgr.list||[]).forEach(function(pp){ opts+='<option value="'+pp.name+'">'+pp.name+' 교수</option>'; });
    bodyEl.innerHTML='<select id="fe-val" style="'+selStyle+'">'+opts+'</select>';
    var cur2=get('dashProfNameOnly'); if(cur2 && cur2!=='-') document.getElementById('fe-val').value=cur2;
    modal.style.display='flex'; return;
  }

  if(field==='coord'){
    titleEl.textContent='과정 담당 수정';
    var clist=(coordMgr && coordMgr.list)?coordMgr.list:[];
    var opts2='<option value="">--- 담당자 선택 ---</option>';
    clist.forEach(function(c){ opts2+='<option value="'+c.name+'">'+c.name+'</option>'; });
    bodyEl.innerHTML='<select id="fe-val" style="'+selStyle+'">'+opts2+'</select>';
    var selC=document.getElementById('fe-val');
    if(!clist.length){
      try{ var cs=await firebase.database().ref('system/coordinators').get(); var co=cs.val()||{}; var h='<option value="">--- 담당자 선택 ---</option>'; Object.values(co).forEach(function(c){ h+='<option value="'+c.name+'">'+c.name+'</option>'; }); selC.innerHTML=h; }catch(e){}
    }
    var curc=get('dashCoordName');
    if(curc && curc!=='-' && curc!=='미지정'){ selC.value=curc; if(!selC.value && coordMgr && coordMgr.matchName){ var cn=coordMgr.matchName(curc); if(cn) selC.value=cn; } }
    modal.style.display='flex'; return;
  }

  // courseName (텍스트)
  titleEl.textContent='과정명 수정';
  var v=get('dashCourseTitle'); if(v==='과정명을 설정해주세요.') v='';
  bodyEl.innerHTML='<input type="text" id="fe-val" value="'+v.replace(/"/g,'&quot;')+'" placeholder="과정명 입력" style="'+selStyle+'">';
  modal.style.display='flex';
  setTimeout(function(){ var i=document.getElementById('fe-val'); if(i){ i.focus(); if(i.select) i.select(); } },60);
};

ui.closeFieldEdit = function(){
  try{ var fp=document.getElementById('fe-period'); if(fp&&fp._flatpickr) fp._flatpickr.destroy(); }catch(e){}
  var m=document.getElementById('fieldEditModal'); if(m) m.style.display='none';
};
ui.saveFieldEdit = async function(){
  var f=ui._editField, room=state.room; if(!room) return;
  var msg=document.getElementById('fieldEditMsg'); var updates={};
  if(f==='period'){
    var fp=(document.getElementById('fe-period')||{})._flatpickr;
    var ds=(fp&&fp.selectedDates)?fp.selectedDates:[];
    if(!ds.length){ if(msg)msg.textContent='기간을 선택하세요.'; return; }
    var fmt=function(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); };
    updates['courses/'+room+'/settings/period']=fmt(ds[0])+' ~ '+fmt(ds[ds.length-1]);
  } else if(f==='roomDetail'){
    var sv=(document.getElementById('fe-val')||{}).value||'';
    if(sv==='direct'){ sv=((document.getElementById('fe-direct')||{}).value||'').trim(); if(!sv){ if(msg)msg.textContent='장소를 입력하세요.'; return; } }
    updates['courses/'+room+'/settings/roomDetailName']=sv;
    // [J6] 수동 지정 보호 — 연간계획 자동동기화가 온라인(Zoom) 설정을 원래 강의실로 되돌리지 않도록
    updates['courses/'+room+'/status/roomDetailManual']=(sv&&String(sv).trim())?true:null;
  } else if(f==='prof'){
    var pv=(document.getElementById('fe-val')||{}).value||'';
    updates['courses/'+room+'/status/professorName']=pv;
    updates['courses/'+room+'/status/professorManual']=true;   // 수동 지정 — 연간계획 자동동기화가 덮어쓰지 않도록 보존
    try{ var ks=await firebase.database().ref('system/professorProfiles/'+pv+'/kakaoLink').get(); updates['courses/'+room+'/settings/kakaoLink']=ks.val()||''; }catch(e){}
  } else if(f==='coord'){
    updates['courses/'+room+'/settings/coordinatorName']=(document.getElementById('fe-val')||{}).value||'';
    updates['courses/'+room+'/status/coordManual']=(((document.getElementById('fe-val')||{}).value||'').trim())?true:null;   // [J10] 수동 지정 보존
  } else if(f==='courseName'){
    var cv=((document.getElementById('fe-val')||{}).value||'').trim();
    if(!cv){ if(msg)msg.textContent='과정명을 입력하세요.'; return; }
    updates['courses/'+room+'/settings/courseName']=cv;
  } else return;
  try{
    await firebase.database().ref().update(updates); ui.closeFieldEdit();
    // [J6] 온라인(Zoom) 장소 저장 → 알림 확인을 누르면 이어서 회의정보 모달 (동시 팝업 방지)
    var _rd=(f==='roomDetail')?String(updates['courses/'+room+'/settings/roomDetailName']||''):'';
    if(f==='roomDetail' && /온라인|zoom/i.test(_rd)){
      ui.showAlert('✅ 장소가 온라인(Zoom)으로 저장되었습니다.\n확인을 누르면 ZOOM 회의 정보를 입력합니다.', function(){ ui.askZoomMeetingInfo(room); });
    } else {
      ui.showAlert('✅ 저장되었습니다. 모든 화면에 반영됩니다.');
    }
  }
  catch(err){ if(msg)msg.textContent='저장 중 오류가 발생했습니다.'; }
};

// [J6] ZOOM 회의번호/암호 — 전용 모달로 입력받아 과정별 저장 (zoom_monitor가 자동으로 불러옴)
ui._fmtZoomNo = function(el){
  var d=String(el.value||'').replace(/\D/g,'').slice(0,11);
  var out;
  if(d.length<=3) out=d;
  else if(d.length<=6) out=d.slice(0,3)+' '+d.slice(3);
  else if(d.length<=10) out=d.slice(0,3)+' '+d.slice(3,6)+' '+d.slice(6);
  else out=d.slice(0,3)+' '+d.slice(3,7)+' '+d.slice(7);
  el.value=out;
};
ui.askZoomMeetingInfo = async function(room){
  if(!room) return;
  ui._zmRoom=room;
  var no=document.getElementById('zmNo'), pw=document.getElementById('zmPw'), msg=document.getElementById('zmMsg');
  if(no)no.value=''; if(pw)pw.value=''; if(msg)msg.textContent='';
  try{
    var s=await firebase.database().ref('courses/'+room+'/zoomMeeting').get();
    var cur=s.val()||{};
    if(no&&cur.no){ no.value=String(cur.no); ui._fmtZoomNo(no); }
    if(pw&&cur.pw){ pw.value=String(cur.pw); }
  }catch(e){}
  var m=document.getElementById('zoomMeetingModal');
  if(m){
    // [J12.2] 입교안내 PDF 전체화면 중이면 모달을 전체화면 요소 안으로 옮겨야 보임 (닫을 때 원위치 복원)
    try{
      var fsEl=document.fullscreenElement||document.webkitFullscreenElement;
      if(fsEl && fsEl.contains && !fsEl.contains(m)){ ui._zmHomeParent=m.parentNode; ui._zmHomeNext=m.nextSibling; fsEl.appendChild(m); }
    }catch(e){}
    m.style.display='flex'; setTimeout(function(){ try{ no.focus(); }catch(e){} }, 80);
  }
};
ui.closeZoomMeetingModal = function(){
  var m=document.getElementById('zoomMeetingModal'); if(!m) return;
  m.style.display='none';
  if(ui._zmHomeParent){ try{ ui._zmHomeParent.insertBefore(m, ui._zmHomeNext||null); }catch(e){} ui._zmHomeParent=null; ui._zmHomeNext=null; }
};
ui.saveZoomMeetingInfo = async function(){
  var room=ui._zmRoom; if(!room) return ui.closeZoomMeetingModal();
  var noEl=document.getElementById('zmNo'), pwEl=document.getElementById('zmPw'), msg=document.getElementById('zmMsg');
  var no=String((noEl&&noEl.value)||'').replace(/\D/g,'');
  if(no.length<9){ if(msg)msg.textContent='회의 번호를 정확히 입력하세요. (9~11자리 숫자)'; return; }
  try{
    await firebase.database().ref('courses/'+room+'/zoomMeeting').set({ no:no, pw:String((pwEl&&pwEl.value)||'').trim(), updatedAt:Date.now() });
    ui.closeZoomMeetingModal();
    try{ var _ovw=document.getElementById('guideOverviewOverlay'); if(_ovw && _ovw.style.display!=='none' && ui.renderOverviewOverlay) ui.renderOverviewOverlay(); }catch(e){}
    ui.showAlert('✅ ZOOM 회의 정보가 저장되었습니다.\n입교안내 교육개요·ZOOM 모니터링 등 ZOOM 연동 화면 전체에 적용됩니다.');
  }catch(err){ if(msg)msg.textContent='저장 실패: '+(err&&err.message||err); }
};

// ===== 도움이 되는 소식: 항기원 맛집 (강사 뷰) =====
ui._foodNewsFilter = '전체';
ui._foodNewsSort = 'likes';
ui._foodNewsCache = [];
ui._FOOD_CATS = ['식당','카페','분식','술집','기타'];
ui._HANGIWON = '충북 청주시 상당구 문의면 남계길 22-55';
ui._foodCatColor = function(c){ return ({'식당':'#f59e0b','카페':'#10b981','분식':'#ef4444','술집':'#8b5cf6','기타':'#64748b'})[c]||'#64748b'; };
ui.loadFoodNews = function(){
    ui._fnInitKakao();
    ui._renderFoodNewsFilters();
    ui._renderFoodNewsSort();
    try{ if(ui._foodNewsRef) ui._foodNewsRef.off(); }catch(e){}
    ui._foodNewsRef = firebase.database().ref('system/foodspots');
    ui._foodNewsRef.on('value', function(snap){
        var v=snap.val()||{};
        ui._foodNewsCache = Object.keys(v).map(function(k){ var o=v[k]||{}; o.id=k; return o; });
        ui._foodNewsCache.sort(function(a,b){ return (b.likes||0)-(a.likes||0) || (b.ts||0)-(a.ts||0); });
        ui._renderFoodNewsList();
    });
};
ui.setFoodNewsFilter = function(c){ ui._foodNewsFilter=c; ui._renderFoodNewsFilters(); ui._renderFoodNewsList(); };
ui.setFoodNewsSort = function(v){ ui._foodNewsSort=v; ui._renderFoodNewsSort(); ui._renderFoodNewsList(); };
ui.foodNewsSortBy = function(col){
    var cur=ui._foodNewsSort;
    if(col==='dist'){ ui._foodNewsSort=(cur==='dist-asc')?'dist-desc':'dist-asc'; }
    else if(col==='likes'){ ui._foodNewsSort=(cur==='likes-desc'||cur==='likes')?'likes-asc':'likes-desc'; }
    ui._renderFoodNewsSort(); ui._renderFoodNewsList();
};
ui._renderFoodNewsSort = function(){
    var el=document.getElementById('foodNewsSortBar'); if(!el) return;
    var opts=[['likes','추천순'],['recent','최신순']];
    el.innerHTML=opts.map(function(o){ var sv=ui._foodNewsSort; var on=(o[0]==='likes')?(sv==='likes'||sv==='likes-desc'||sv==='likes-asc'):(sv===o[0]);
        return '<button onclick="ui.setFoodNewsSort(\''+o[0]+'\')" style="padding:6px 14px; border-radius:50px; border:1px solid '+(on?'#2563eb':'#cbd5e1')+'; background:'+(on?'#2563eb':'#fff')+'; color:'+(on?'#fff':'#64748b')+'; font-size:13px; font-weight:800; cursor:pointer;">'+o[1]+'</button>';
    }).join('');
};
ui._renderFoodNewsFilters = function(){
    var el=document.getElementById('foodNewsFilters'); if(!el) return;
    var cats=['전체'].concat(ui._FOOD_CATS);
    el.innerHTML=cats.map(function(c){ var on=(ui._foodNewsFilter===c);
        return '<button onclick="ui.setFoodNewsFilter(\''+c+'\')" style="padding:8px 16px; border-radius:50px; border:1px solid '+(on?'#2563eb':'#cbd5e1')+'; background:'+(on?'#2563eb':'#fff')+'; color:'+(on?'#fff':'#334155')+'; font-size:14px; font-weight:800; cursor:pointer;">'+c+'</button>';
    }).join('');
};
ui._renderFoodNewsList = function(){
    var el=document.getElementById('foodNewsList'); if(!el) return;
    var list=ui._foodNewsCache.filter(function(o){ return ui._foodNewsFilter==='전체' || o.category===ui._foodNewsFilter; });
    var _sort=ui._foodNewsSort;
    list.sort(function(a,b){
        if(_sort==='recent') return (b.ts||0)-(a.ts||0);
        if(_sort==='dist-asc') return (a.distanceKm==null?9e9:a.distanceKm)-(b.distanceKm==null?9e9:b.distanceKm);
        if(_sort==='dist-desc') return (b.distanceKm==null?-1:b.distanceKm)-(a.distanceKm==null?-1:a.distanceKm);
        if(_sort==='likes-asc') return (a.likes||0)-(b.likes||0);
        return (b.likes||0)-(a.likes||0) || (b.ts||0)-(a.ts||0);
    });
    var _da=(_sort==='dist-asc')?' \u25B2':((_sort==='dist-desc')?' \u25BC':'');
    var _la=(_sort==='likes-asc')?' \u25B2':((_sort==='likes-desc'||_sort==='likes')?' \u25BC':'');
    if(!list.length){ el.innerHTML='<div style="padding:40px 0; text-align:center; color:#94a3b8; font-weight:700;">아직 등록된 맛집이 없습니다.</div>'; return; }
    var esc=function(t){ return String(t||'').replace(/</g,'&lt;'); };
    var th='padding:10px 8px; font-size:12px; font-weight:800; color:#64748b; border-bottom:2px solid #e2e8f0; white-space:nowrap;';
    var td='padding:10px 8px; font-size:13px; border-bottom:1px solid #eef2f7; vertical-align:middle;';
    var miniBtn='padding:5px 10px; border:none; border-radius:8px; font-weight:800; font-size:12px; cursor:pointer; white-space:nowrap;';
    var rows=list.map(function(o,i){
        var cat=o.category||'기타'; var col=ui._foodCatColor(cat);
        var dist=(o.distanceKm!=null)?(o.distanceKm+'km'):'-';
        return '<tr onclick="ui.openFoodDetail(\''+o.id+'\')" style="cursor:pointer;">'
          +'<td style="'+td+' text-align:center; color:#94a3b8; font-weight:700;">'+(i+1)+'</td>'
          +'<td style="'+td+' text-align:left;"><span style="background:'+col+'; color:#fff; font-size:10px; font-weight:800; padding:2px 7px; border-radius:5px; margin-right:6px;">'+cat+'</span><b style="font-size:14px; color:#0f172a;">'+esc(o.name)+'</b>'+(o.comment?'<span style="color:#94a3b8; font-size:12px;"> · '+esc(o.comment)+'</span>':'')+'</td>'
          +'<td style="'+td+' text-align:center; color:#2563eb; font-weight:800; white-space:nowrap;">'+dist+'</td>'
          +'<td style="'+td+' text-align:center; font-weight:900; color:#0f172a; white-space:nowrap;">👍 '+(o.likes||0)+'</td>'
          +'<td style="'+td+' text-align:center;"><button onclick="event.stopPropagation();ui.foodNewsMapById(\''+o.id+'\')" style="'+miniBtn+' background:#eef4ff; color:#1e3a8a;">지도</button></td>'
          +'<td style="'+td+' text-align:center;"><button onclick="event.stopPropagation();ui.foodNewsRouteById(\''+o.id+'\')" style="'+miniBtn+' background:#eafff4; color:#047857;">길찾기</button></td>'
          +'<td style="'+td+' text-align:center; white-space:nowrap;"><button onclick="event.stopPropagation();ui.foodNewsEdit(\''+o.id+'\')" style="'+miniBtn+' background:#fff; color:#475569; border:1px solid #e2e8f0; margin-right:4px;">수정</button><button onclick="event.stopPropagation();ui.foodNewsDelete(\''+o.id+'\')" style="'+miniBtn+' background:#fee2e2; color:#b91c1c;">삭제</button></td>'
          +'</tr>';
    }).join('');
    el.innerHTML='<div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse; min-width:680px;">'
      +'<thead><tr>'
      +'<th style="'+th+' text-align:center; width:46px;">연번</th>'
      +'<th style="'+th+' text-align:left;">가게명</th>'
      +'<th onclick="ui.foodNewsSortBy(\'dist\')" style="'+th+' text-align:center; cursor:pointer; user-select:none;">항기원 거리'+_da+'</th>'
      +'<th onclick="ui.foodNewsSortBy(\'likes\')" style="'+th+' text-align:center; cursor:pointer; user-select:none;">추천수'+_la+'</th>'
      +'<th style="'+th+' text-align:center;">지도</th>'
      +'<th style="'+th+' text-align:center;">길찾기</th>'
      +'<th style="'+th+' text-align:center;">수정/삭제</th>'
      +'</tr></thead><tbody>'+rows+'</tbody></table></div>';
};
ui.foodNewsMapById=function(id){
    var o=ui._foodNewsCache.filter(function(x){return x.id===id;})[0]; if(!o) return;
    if(o.lat&&o.lng){ window.open('https://map.kakao.com/link/map/'+encodeURIComponent(o.name)+','+o.lat+','+o.lng,'_blank'); }
    else { window.open('https://map.naver.com/p/search/'+encodeURIComponent(o.name||o.address||''),'_blank'); }
};
ui.closeFoodDetail=function(){ var m=document.getElementById('foodDetailModal'); if(m) m.style.display='none'; };
ui.openFoodDetail=function(id){
    var o=ui._foodNewsCache.filter(function(x){return x.id===id;})[0]; if(!o) return;
    ui._fnInitKakao();
    ui._renderFoodDetail(o);
    document.getElementById('foodDetailModal').style.display='flex';
    if((!o.phone || !o.placeUrl) && o.lat && o.lng && ui._fnPlaces){
        ui._fnPlaces.keywordSearch(o.name, function(data,st){
            if(st===kakao.maps.services.Status.OK && data && data.length){
                var best=null,bd=9e9; data.forEach(function(d){ var dd=Math.abs(parseFloat(d.y)-o.lat)+Math.abs(parseFloat(d.x)-o.lng); if(dd<bd){bd=dd;best=d;} });
                if(best){ o.phone=o.phone||best.phone; o.placeUrl=o.placeUrl||best.place_url; ui._renderFoodDetail(o); }
            }
        });
    }
};
ui._renderFoodDetail=function(o){
    var el=document.getElementById('foodDetailBody'); if(!el) return;
    var esc=function(t){return String(t||'').replace(/</g,'&lt;');};
    var cat=o.category||'기타'; var col=ui._foodCatColor(cat);
    var dist=(o.distanceKm!=null)?(o.distanceKm+'km (직선)'):'-';
    var cmts=[]; if(o.comment&&String(o.comment).trim()) cmts.push(o.comment);
    if(o.comments){ Object.keys(o.comments).forEach(function(k){ var c=o.comments[k]; if(c&&c.text) cmts.push(c.text); }); }
    var cmtsHtml=cmts.length?cmts.map(function(t){return '<div style="font-size:14px; color:#334155; line-height:1.6; padding:10px 12px; background:#f8fafc; border-radius:10px; margin-bottom:6px;">💬 '+esc(t)+'</div>';}).join(''):'<div style="color:#94a3b8; font-size:13px;">아직 한줄평이 없습니다.</div>';
    var phoneHtml=o.phone?'<a href="tel:'+o.phone+'" style="color:#2563eb; font-weight:700; text-decoration:none;">'+o.phone+'</a>':'<span style="color:#94a3b8;">등록된 번호 없음</span>';
    var bizHtml=o.placeUrl?'<a href="'+o.placeUrl+'" target="_blank" rel="noopener" style="color:#047857; font-weight:700;">카카오에서 영업시간·영업여부 보기 →</a>':'<span style="color:#94a3b8;">카카오 상세정보 없음</span>';
    el.innerHTML=
      '<div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;"><span style="background:'+col+'; color:#fff; font-size:13px; font-weight:800; padding:3px 11px; border-radius:7px;">'+cat+'</span><h2 style="margin:0; font-size:23px; font-weight:900; color:#0f172a;">'+esc(o.name)+'</h2></div>'
      +'<table style="width:100%; margin:14px 0; font-size:14px;">'
      +'<tr><td style="padding:6px 0; color:#94a3b8; width:92px; font-weight:700; vertical-align:top;">주소</td><td style="color:#334155;">'+(esc(o.address)||'-')+'</td></tr>'
      +'<tr><td style="padding:6px 0; color:#94a3b8; font-weight:700;">연락처</td><td>'+phoneHtml+'</td></tr>'
      +'<tr><td style="padding:6px 0; color:#94a3b8; font-weight:700;">영업정보</td><td>'+bizHtml+'</td></tr>'
      +'<tr><td style="padding:6px 0; color:#94a3b8; font-weight:700;">항기원 거리</td><td style="color:#2563eb; font-weight:800;">'+dist+'</td></tr>'
      +'<tr><td style="padding:6px 0; color:#94a3b8; font-weight:700;">추천수</td><td style="font-weight:900;">👍 '+(o.likes||0)+'</td></tr>'
      +'</table>'
      +'<div id="foodDetailMap" style="width:100%; height:260px; border-radius:12px; border:1px solid #e2e8f0; margin-bottom:14px;"></div>'
      +'<div style="display:flex; gap:8px; margin-bottom:18px;"><button onclick="ui.foodNewsMapById(\''+o.id+'\')" style="flex:1; padding:11px; border:none; border-radius:10px; background:#eef4ff; color:#1e3a8a; font-weight:800; cursor:pointer;">🗺️ 지도보기</button><button onclick="ui.foodNewsRouteById(\''+o.id+'\')" style="flex:1; padding:11px; border:none; border-radius:10px; background:#eafff4; color:#047857; font-weight:800; cursor:pointer;">🚗 항기원→가게 길찾기</button></div>'
      +'<h3 style="margin:0 0 8px; font-size:16px; font-weight:900; color:#0f172a;">📝 교육생 한줄평 ('+cmts.length+')</h3>'
      +cmtsHtml;
    if(o.lat&&o.lng && ui._fnKakaoReady){ try{ var mc=document.getElementById('foodDetailMap'); var pos=new kakao.maps.LatLng(o.lat,o.lng); var m=new kakao.maps.Map(mc,{center:pos,level:3}); var mk=new kakao.maps.Marker({position:pos}); mk.setMap(m); setTimeout(function(){ try{ m.relayout(); m.setCenter(pos);}catch(e){} },90); }catch(e){} }
};
// ===== 강사: 맛집 추가/수정/삭제 (카카오 검색) =====
ui._fnKakaoReady=false; ui._fnPlaces=null; ui._fnGeocoder=null; ui._fnHANGIWON_LL=null;
ui._fnResults=[]; ui._fnSelected=null; ui._fnEditId=null; ui._fnMap=null; ui._fnMarker=null;
ui._fnInitKakao=function(){
    if(ui._fnKakaoReady) return;
    if(typeof kakao==='undefined' || !kakao.maps || !kakao.maps.load) return;
    kakao.maps.load(function(){
        ui._fnKakaoReady=true;
        try{ ui._fnPlaces=new kakao.maps.services.Places(); ui._fnGeocoder=new kakao.maps.services.Geocoder(); }catch(e){}
        if(ui._fnGeocoder){ ui._fnGeocoder.addressSearch(ui._HANGIWON, function(res,st){ if(st===kakao.maps.services.Status.OK && res[0]){ ui._fnHANGIWON_LL={lat:parseFloat(res[0].y), lng:parseFloat(res[0].x)}; } }); }
    });
};
ui._fnRenderMap=function(){
    var mc=document.getElementById('fnMap'); if(!mc) return;
    if(!ui._fnKakaoReady){ ui._fnInitKakao(); setTimeout(ui._fnRenderMap, 400); return; }
    var hasSel=!!(ui._fnSelected && ui._fnSelected.lat && ui._fnSelected.lng);
    var center;
    if(hasSel){ center=new kakao.maps.LatLng(ui._fnSelected.lat, ui._fnSelected.lng); }
    else if(ui._fnHANGIWON_LL){ center=new kakao.maps.LatLng(ui._fnHANGIWON_LL.lat, ui._fnHANGIWON_LL.lng); }
    else { if(ui._fnGeocoder){ ui._fnGeocoder.addressSearch(ui._HANGIWON, function(res,st){ if(st===kakao.maps.services.Status.OK && res[0]){ ui._fnHANGIWON_LL={lat:parseFloat(res[0].y), lng:parseFloat(res[0].x)}; ui._fnRenderMap(); } }); } return; }
    if(!ui._fnMap){ ui._fnMap=new kakao.maps.Map(mc,{center:center, level:hasSel?3:6}); }
    else { ui._fnMap.setCenter(center); ui._fnMap.setLevel(hasSel?3:6); }
    if(hasSel){ if(!ui._fnMarker){ ui._fnMarker=new kakao.maps.Marker({position:center}); } ui._fnMarker.setPosition(center); ui._fnMarker.setMap(ui._fnMap); }
    else if(ui._fnMarker){ ui._fnMarker.setMap(null); }
    setTimeout(function(){ try{ ui._fnMap.relayout(); ui._fnMap.setCenter(center); }catch(e){} }, 80);
};
ui._fnHaversine=function(aLat,aLng,bLat,bLng){ var R=6371,t=Math.PI/180; var dLat=(bLat-aLat)*t,dLng=(bLng-aLng)*t; var x=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(aLat*t)*Math.cos(bLat*t)*Math.sin(dLng/2)*Math.sin(dLng/2); return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x)); };
ui._fnAutoCat=function(cn){ cn=cn||''; if(cn.indexOf('카페')>=0||cn.indexOf('디저트')>=0||cn.indexOf('베이커리')>=0) return '카페'; if(cn.indexOf('주점')>=0||cn.indexOf('호프')>=0||cn.indexOf('술집')>=0) return '술집'; if(cn.indexOf('분식')>=0) return '분식'; return '식당'; };
ui.openFoodNewsAdd=function(){
    ui._fnInitKakao(); ui._fnEditId=null; ui._fnSelected=null;
    var f=document.getElementById('foodNewsAddModal'); if(f) f.style.display='flex';
    var en=document.getElementById('fnEditNote'); if(en) en.style.display='none';
    ['fnSearch','fnComment'].forEach(function(id){ var e=document.getElementById(id); if(e) e.value=''; });
    var sb=document.getElementById('fnSelectedBox'); if(sb) sb.style.display='none';
    var sr=document.getElementById('fnSearchResults'); if(sr) sr.innerHTML='';
    ui._fnRenderMap();
};
ui.fillFnPreset=function(t){ var e=document.getElementById('fnComment'); if(e){ e.value=t; e.focus(); } };
ui.closeFoodNewsAdd=function(){ var f=document.getElementById('foodNewsAddModal'); if(f) f.style.display='none'; ui._fnEditId=null; ui._fnSelected=null; };
// 맛집 리스트를 PDF로 저장 (깨끗한 인쇄창 → 브라우저 'PDF로 저장')
ui.foodNewsSavePdf=function(){
    var list=document.getElementById('foodNewsList');
    if(!list || !list.children || !list.children.length){ if(ui.showAlert) ui.showAlert('저장할 맛집 목록이 없습니다.'); return; }
    var w=window.open('','_blank');
    if(!w){ if(ui.showAlert) ui.showAlert('팝업이 차단되어 PDF 저장 창을 열 수 없습니다.\n브라우저에서 팝업을 허용한 뒤 다시 시도해 주세요.'); return; }
    var d=new Date(); var ds=d.getFullYear()+'.'+(d.getMonth()+1)+'.'+d.getDate();
    var html='<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>항기원 맛집 리스트</title>'
        +'<style>*{box-sizing:border-box;}body{font-family:"Malgun Gothic","맑은 고딕",AppleSDGothicNeo,sans-serif;margin:0;padding:28px;color:#0f172a;}h1{font-size:22px;margin:0 0 4px;}.sub{color:#64748b;font-size:12px;margin-bottom:18px;}button{display:none!important;}a{color:inherit;text-decoration:none;}img{max-width:100%;}#foodNewsList>*{break-inside:avoid;page-break-inside:avoid;margin-bottom:10px;}</style>'
        +'</head><body><h1>🍔 항기원 맛집 리스트</h1><div class="sub">출력일: '+ds+'</div>'
        +'<div id="foodNewsList">'+list.innerHTML+'</div>'
        +'<scr'+'ipt>window.onload=function(){setTimeout(function(){window.focus();window.print();},400);};window.onafterprint=function(){window.close();};<\/scr'+'ipt>'
        +'</body></html>';
    w.document.open(); w.document.write(html); w.document.close();
};
ui.foodNewsSearch=function(){
    var q=(document.getElementById('fnSearch').value||'').trim(); if(!q) return;
    ui._fnInitKakao();
    var el=document.getElementById('fnSearchResults');
    if(!ui._fnKakaoReady || !ui._fnPlaces){ if(el) el.innerHTML='<div style="padding:12px; color:#94a3b8; font-size:13px;">지도 검색 준비 중입니다. 잠시 후 다시 시도하세요.</div>'; return; }
    if(el) el.innerHTML='<div style="padding:12px; color:#94a3b8; font-size:13px;">검색 중…</div>';
    var opts={ size:10 }; if(ui._fnHANGIWON_LL){ opts.location=new kakao.maps.LatLng(ui._fnHANGIWON_LL.lat,ui._fnHANGIWON_LL.lng); opts.radius=20000; }
    ui._fnPlaces.keywordSearch(q, function(data,status){
        if(status!==kakao.maps.services.Status.OK || !data || !data.length){ if(el) el.innerHTML='<div style="padding:12px; color:#94a3b8; font-size:13px;">검색 결과가 없습니다.</div>'; return; }
        ui._fnResults=data;
        el.innerHTML=data.slice(0,10).map(function(d,i){ var ad=d.road_address_name||d.address_name||''; var cn=(d.category_name||'').split('>').pop().trim();
            return '<div onclick="ui.foodNewsPick('+i+')" style="padding:10px 12px; border:1px solid #eef2f7; border-radius:10px; margin-bottom:6px; cursor:pointer; background:#fff;"><div style="font-weight:800; color:#0f172a; font-size:14px;">'+d.place_name+(cn?(' <span style=\"font-size:11px;color:#94a3b8;font-weight:600;\">'+cn+'</span>'):'')+'</div><div style="font-size:12px; color:#64748b;">'+ad+'</div></div>';
        }).join('');
    }, opts);
};
ui.foodNewsPick=function(i){
    var d=ui._fnResults[i]; if(!d) return;
    ui._fnSelected={ name:d.place_name, address:(d.road_address_name||d.address_name||''), lat:parseFloat(d.y), lng:parseFloat(d.x), phone:(d.phone||''), placeUrl:(d.place_url||'') };
    document.getElementById('fnSelName').textContent=d.place_name;
    document.getElementById('fnSelAddr').textContent=ui._fnSelected.address;
    document.getElementById('fnSelectedBox').style.display='block';
    document.getElementById('fnSearchResults').innerHTML='';
    try{ document.getElementById('fnCat').value=ui._fnAutoCat(d.category_name); }catch(e){}
    ui._fnRenderMap();
};
ui.foodNewsSubmit=function(){
    var cat=(document.getElementById('fnCat').value||'기타');
    var cm=(document.getElementById('fnComment').value||'').trim();
    if(ui._fnEditId){
        var upd={ category:cat, comment:cm };
        if(ui._fnSelected && ui._fnSelected.name){
            upd.name=ui._fnSelected.name; upd.address=ui._fnSelected.address||''; upd.lat=ui._fnSelected.lat||null; upd.lng=ui._fnSelected.lng||null; upd.phone=ui._fnSelected.phone||''; upd.placeUrl=ui._fnSelected.placeUrl||'';
            if(ui._fnHANGIWON_LL && ui._fnSelected.lat && ui._fnSelected.lng){ upd.distanceKm=Math.round(ui._fnHaversine(ui._fnHANGIWON_LL.lat,ui._fnHANGIWON_LL.lng,ui._fnSelected.lat,ui._fnSelected.lng)*10)/10; }
        }
        firebase.database().ref('system/foodspots/'+ui._fnEditId).update(upd).then(function(){ ui.closeFoodNewsAdd(); ui.showAlert('✅ 수정되었습니다.'); }).catch(function(){ ui.showAlert('수정 중 오류가 발생했습니다.'); });
        return;
    }
    if(!ui._fnSelected || !ui._fnSelected.name){ ui.showAlert('가게명을 검색해서 선택해주세요.'); return; }
    var exist=ui._foodNewsCache.filter(function(x){ return x.name===ui._fnSelected.name && (x.address||'')===(ui._fnSelected.address||''); })[0];
    if(exist){
        if(cm){ firebase.database().ref('system/foodspots/'+exist.id+'/comments').push({ text:cm, ts:Date.now() }); }
        ui.closeFoodNewsAdd(); ui.showAlert(cm?'이미 등록된 가게라 한줄평만 추가했습니다.':'이미 등록된 가게입니다.');
        return;
    }
    var dist=null; if(ui._fnHANGIWON_LL && ui._fnSelected.lat && ui._fnSelected.lng){ dist=Math.round(ui._fnHaversine(ui._fnHANGIWON_LL.lat,ui._fnHANGIWON_LL.lng,ui._fnSelected.lat,ui._fnSelected.lng)*10)/10; }
    firebase.database().ref('system/foodspots').push({ name:ui._fnSelected.name, category:cat, address:ui._fnSelected.address||'', lat:ui._fnSelected.lat||null, lng:ui._fnSelected.lng||null, phone:ui._fnSelected.phone||'', placeUrl:ui._fnSelected.placeUrl||'', distanceKm:dist, comment:cm, likes:0, ts:Date.now() }).then(function(){ ui.closeFoodNewsAdd(); ui.showAlert('✅ 맛집이 등록되었습니다.'); }).catch(function(){ ui.showAlert('등록 중 오류가 발생했습니다.'); });
};
ui.foodNewsEdit=function(id){
    var o=ui._foodNewsCache.filter(function(x){ return x.id===id; })[0]; if(!o) return;
    ui._fnInitKakao();
    var f=document.getElementById('foodNewsAddModal'); if(f) f.style.display='flex';
    ui._fnEditId=id;
    ui._fnSelected={ name:o.name, address:o.address||'', lat:o.lat||null, lng:o.lng||null, phone:o.phone||'', placeUrl:o.placeUrl||'' };
    var en=document.getElementById('fnEditNote'); if(en) en.style.display='block';
    document.getElementById('fnSelName').textContent=o.name||'';
    document.getElementById('fnSelAddr').textContent=o.address||'';
    document.getElementById('fnSelectedBox').style.display='block';
    document.getElementById('fnSearchResults').innerHTML='';
    document.getElementById('fnSearch').value='';
    try{ document.getElementById('fnCat').value=o.category||'기타'; }catch(e){}
    document.getElementById('fnComment').value=o.comment||'';
    ui._fnRenderMap();
    try{ f.scrollIntoView({behavior:'smooth', block:'center'}); }catch(e){}
};
ui.foodNewsDelete=function(id){
    var o=ui._foodNewsCache.filter(function(x){ return x.id===id; })[0];
    var nm=o?(o.name||'이 맛집'):'이 맛집';
    ui.showConfirm('"'+nm+'" 항목을 삭제할까요? 되돌릴 수 없습니다.', function(){
        firebase.database().ref('system/foodspots/'+id).remove().then(function(){ ui.showAlert('🗑️ 삭제되었습니다.'); }).catch(function(){ ui.showAlert('삭제 중 오류가 발생했습니다.'); });
    });
};
ui.foodNewsRouteById=function(id){
    var o=ui._foodNewsCache.filter(function(x){return x.id===id;})[0]; if(!o) return;
    if(!(o.lat&&o.lng)){ window.open('https://map.kakao.com/link/search/'+encodeURIComponent(o.name||o.address||''),'_blank'); return; }
    function go(h){ window.open('https://map.kakao.com/link/by/car/'+encodeURIComponent('항공기술훈련원')+','+h.lat+','+h.lng+'/'+encodeURIComponent(o.name)+','+o.lat+','+o.lng,'_blank'); }
    if(ui._fnHANGIWON_LL){ go(ui._fnHANGIWON_LL); return; }
    ui._fnInitKakao();
    if(ui._fnGeocoder){ ui._fnGeocoder.addressSearch(ui._HANGIWON, function(res,st){ if(st===kakao.maps.services.Status.OK && res[0]){ ui._fnHANGIWON_LL={lat:parseFloat(res[0].y), lng:parseFloat(res[0].x)}; go(ui._fnHANGIWON_LL); } else { window.open('https://map.kakao.com/link/to/'+encodeURIComponent(o.name)+','+o.lat+','+o.lng,'_blank'); } }); }
    else { window.open('https://map.kakao.com/link/to/'+encodeURIComponent(o.name)+','+o.lat+','+o.lng,'_blank'); }
};

/* __JSVER_STAMP__ */
// [공용 강의실] system/classrooms 실시간 — 과정설정 드롭다운 즉시 반영
(function initCustomRooms(){
  try {
    if (!firebase || !firebase.database) { setTimeout(initCustomRooms, 300); return; }
    firebase.database().ref('system/classrooms').on('value', function(snap){
      var v = snap.val() || {}; var by = {};
      Object.keys(v).forEach(function(k){ var it=v[k]; if(!it||!it.name) return; var b=String(it.building||'기타').trim(); (by[b]=by[b]||[]).push(String(it.name).trim()); });
      window.__customRooms = by;
      var sm = document.getElementById('courseSetupModal');
      if (sm && sm.style.display === 'flex' && typeof setupMgr !== 'undefined') { try { setupMgr._injectCustomRooms(); } catch(e){} }
    });
  } catch(e){ setTimeout(initCustomRooms, 500); }
})();
(function stampJsVer(){try{var b=document.getElementById('__catcVer');if(b){if(b.textContent.indexOf('Jv')<0)b.textContent=b.textContent+'\u00b7Ju';}else{setTimeout(stampJsVer,200);}}catch(e){}})();

/* ===== [공항별 입교 현황 지도] 수강생현황 → 지도로 보기 ===== */
ui._mapRegions = {
  '서울':{x:120.0,y:180.0,air:true},
  '인천':{x:73.2,y:194.2,air:false},
  '강원':{x:273.9,y:153.8,air:false},
  '양양':{x:306.6,y:113.5,air:true},
  '원주':{x:236.9,y:202.2,air:true},
  '송탄':{x:140.8,y:253.3,air:false},
  '청주':{x:188.3,y:301.7,air:true},
  '예천':{x:278.1,y:309.8,air:false},
  '군산':{x:95.3,y:398.5,air:true},
  '대구':{x:306.6,y:407.9,air:true},
  '포항':{x:384.8,y:387.8,air:true},
  '울산':{x:380.6,y:448.3,air:true},
  '부안':{x:103.8,y:436.2,air:false},
  '광주':{x:115.4,y:507.4,air:true},
  '무안':{x:74.2,y:535.7,air:true},
  '여수':{x:201,y:551.8,air:true},
  '사천':{x:248.5,y:512.8,air:true},
  '김해':{x:330.9,y:495.3,air:true},
  '부산':{x:351,y:504.7,air:false},
  '제주':{x:84.8,y:732,air:true}
};
ui._deptToRegion = function(dept){
  var d = String(dept||'');
  if(!d.trim()) return '';
  if(d.indexOf('본사')>=0) return '서울';
  if(d.indexOf('김포')>=0) return '서울';
  if(d.indexOf('인천')>=0) return '인천';
  if(d.indexOf('항로시설본부')>=0) return '대구';
  if(d.indexOf('한라레이더')>=0) return '제주';
  if(d.indexOf('항공교육훈련센터')>=0||d.indexOf('항공훈련센터')>=0||d.indexOf('강서')>=0) return '서울';
  if(d.indexOf('훈련원')>=0||d.indexOf('항공기술')>=0||d.indexOf('오송')>=0) return '청주';
  var keys=['양양','원주','청주','예천','군산','포항','울산','부안','광주','무안','여수','사천','김해','부산','제주','대구','강원','송탄'];
  for(var i=0;i<keys.length;i++){ if(d.indexOf(keys[i])>=0) return keys[i]; }
  return '';
};
ui.closeStudentMap = function(){ var m=document.getElementById('studentMapModal'); if(m) m.remove(); };
ui.openStudentMap = async function(){
  if(!state.room){ ui.showAlert('강의실을 먼저 선택하세요.'); return; }
  var esc = s => String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  var room = state.room;
  var list=[], course='';
  try{
    var cs=await firebase.database().ref('courses/'+room+'/settings/courseName').once('value');
    course=String(cs.val()||'').trim();
    var ds=await firebase.database().ref('system/dorm/rosters').once('value');
    var all=ds.val()||{}; var best=null;
    for(var k in all){ var dv=all[k]; if(dv&&Array.isArray(dv.list)&&dv.list.length&&String(dv.courseName||'').trim()===course){ if(!best||(dv.updatedAt||0)>(best.updatedAt||0)) best=dv; } }
    if(best) list=best.list;
  }catch(e){}
  var counts={}, unknown=0, total=0;
  list.forEach(function(pp){ var reg=ui._deptToRegion(pp&&pp.dept||''); if(reg){ counts[reg]=(counts[reg]||0)+1; total++; } else { unknown++; } });
  // ── 지역별 위경도(홈 통계 지도와 동일) + 카카오 분포지도 ──
  ui._regionLL = ui._regionLL || { '서울':[37.5586,126.7906],'인천':[37.4602,126.4407],'강원':[37.8813,127.7300],'양양':[38.0613,128.6690],'원주':[37.4416,127.9606],'송탄':[37.0807,127.0353],'청주':[36.7166,127.4990],'예천':[36.6320,128.3549],'군산':[35.9038,126.6158],'대구':[35.8941,128.6586],'포항':[35.9879,129.4204],'울산':[35.5935,129.3517],'부안':[35.7316,126.7330],'광주':[35.1264,126.8089],'무안':[34.9914,126.3828],'여수':[34.8423,127.6168],'사천':[35.0886,128.0703],'김해':[35.1795,128.9382],'부산':[35.1796,129.0756],'제주':[33.5113,126.4930] };
  var _sorted=Object.keys(counts).sort(function(a,b){ return counts[b]-counts[a]; });
  var _distGrid = _sorted.length ? _sorted.map(function(n){ return '<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 12px;background:#f8fafc;border:1px solid #eef2f7;border-radius:8px;"><span style="font-weight:700;color:#334155;font-size:14px;">'+esc(n)+'</span><span style="font-weight:900;color:#10b981;font-size:14px;">'+counts[n]+'명</span></div>'; }).join('') : '<div style="grid-column:1/-1;padding:14px;color:#94a3b8;text-align:center;font-size:13px;">소속 정보가 없습니다.</div>';
  var _unknownNote = unknown ? '<div style="font-size:12px;color:#94a3b8;margin-top:2px;">· 소속 구분 불가 '+unknown+'명은 지도에서 제외</div>' : '';
  var _old=document.getElementById('studentMapModal'); if(_old) _old.remove();
  var modal=document.createElement('div'); modal.id='studentMapModal';
  modal.setAttribute('style','position:fixed;inset:0;z-index:9700;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,.55);backdrop-filter:blur(4px);padding:20px;');
  modal.onclick=function(e){ if(e.target===modal) ui.closeStudentMap(); };
  modal.innerHTML = '<div style="background:#fff;border-radius:22px;width:min(720px,96vw);max-height:92vh;overflow:auto;box-shadow:0 30px 70px rgba(0,0,0,.35);">'
    + '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 22px;background:linear-gradient(135deg,#1e3a8a,#2563eb);color:#fff;position:sticky;top:0;z-index:2;">'
      + '<div style="font-size:18px;font-weight:900;"><i class="fa-solid fa-map-location-dot" style="margin-right:8px;"></i>공항별 입교 현황 지도</div>'
      + '<button onclick="ui.closeStudentMap()" style="background:rgba(255,255,255,.18);border:none;color:#fff;width:34px;height:34px;border-radius:50%;font-size:18px;cursor:pointer;">&times;</button>'
    + '</div>'
    + '<div style="padding:18px 22px;">'
      + '<div style="font-size:13.5px;color:#64748b;font-weight:800;margin-bottom:12px;">'+esc(course||'현재 과정')+' · 전체 '+total+'명</div>'
      + '<div id="studentMapKakao" style="width:100%;height:46vh;min-height:300px;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;background:#eaf2fb;"></div>'
      + '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-top:12px;">'+_distGrid+'</div>'
      + '<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 13px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:9px;margin-top:8px;"><span style="font-weight:900;color:#166534;">합계</span><span style="font-weight:900;color:#16a34a;">'+(total+unknown)+'명</span></div>'
      + _unknownNote
    + '</div></div>';
  (document.fullscreenElement || document.webkitFullscreenElement || document.body).appendChild(modal);   // 전체화면(top layer) 위에 보이도록 전체화면 요소에 붙임
  var _buildMap=function(){
    var el=document.getElementById('studentMapKakao'); if(!el||!(window.kakao&&kakao.maps&&kakao.maps.Map)) return;
    var map=new kakao.maps.Map(el,{ center:new kakao.maps.LatLng(36.4,127.9), level:13 });
    try{ map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT); }catch(e){}
    var bounds=new kakao.maps.LatLngBounds(); var any=false;
    Object.keys(counts).forEach(function(name){ var ll=ui._regionLL[name]; if(!ll) return; var c=counts[name]; any=true; var pos=new kakao.maps.LatLng(ll[0],ll[1]); bounds.extend(pos); var sz=30+Math.min(c,14)*2; var content='<div style="transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;"><div style="width:'+sz+'px;height:'+sz+'px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);color:#fff;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;border:2.5px solid #fff;box-shadow:0 4px 12px rgba(5,150,105,.45);">'+c+'</div><div style="margin-top:3px;background:rgba(255,255,255,.95);color:#0f172a;font-size:11px;font-weight:800;padding:1px 7px;border-radius:7px;box-shadow:0 1px 4px rgba(0,0,0,.18);white-space:nowrap;">'+name+'</div></div>'; new kakao.maps.CustomOverlay({ map:map, position:pos, content:content, yAnchor:0.5, zIndex:5 }); });
    if(any){ try{ map.setBounds(bounds,70,70,70,70); }catch(e){} }
    setTimeout(function(){ try{ map.relayout(); if(any) map.setBounds(bounds,70,70,70,70); }catch(e){} }, 250);
  };
  if(window.kakao && kakao.maps && kakao.maps.Map){ _buildMap(); }
  else if(window.kakao && kakao.maps && kakao.maps.load){ kakao.maps.load(_buildMap); }
  else { var _t=0; var _iv=setInterval(function(){ _t++; if(window.kakao&&kakao.maps){ clearInterval(_iv); (kakao.maps.load?kakao.maps.load(_buildMap):_buildMap()); } else if(_t>20){ clearInterval(_iv); } }, 300); }
};


// ===== [학생장 룰렛] 원형 휠 — 입교 학생 중 3시 마커에 걸린 사람이 당첨 → 학생장 지정(전 플랫폼 연동) =====
ui.closeLeaderRoulette = function(){
  var m=document.getElementById('leaderRouletteModal'); if(m) m.remove();
  ui._wheelSpinning=false;
  try{ if(ui._spinAudio){ ui._spinAudio.pause(); } }catch(e){}
  var _fh=document.getElementById('floatingHomeBtn'); if(_fh) _fh.style.display='flex';
};
// 입교안내 23p '학생장 선출'에서 실행 → 오디션 무대 배경 위에서 룰렛 진행 (닫으면 23p로 복귀)
ui.openLeaderRouletteStage = async function(){
  try { await ui.openLeaderRoulette(); } catch(e){}
  var m = document.getElementById('leaderRouletteModal');
  if (m) m.classList.add('roulette-stage-bg');
};
// 시간표 사진과 업로드 안내를 한 번에 정리하고, 현재 PDF 전체화면/페이지는 유지한다.
ui.closeScheduleGuide = function(){
  // 시간표 보려고 우리가 진입한 전체화면이면 해제(원래 전체화면은 유지)
  if(ui._scheduleEnteredFs){
    ui._scheduleEnteredFs = false;
    try{ var _ef = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen; if(_ef && (document.fullscreenElement || document.webkitFullscreenElement)) _ef.call(document); }catch(e){}
  }
  ['guideScheduleModal','guideScheduleUploadModal'].forEach(function(id){
    var layer=document.getElementById(id);
    if(!layer) return;
    try{ if(typeof layer._cleanup==='function') layer._cleanup(); }catch(e){}
    layer.remove();
  });
};
// 입교안내 13p '교육시간표 보기' → 시간표 사진을 PDF 위에 화면맞춤으로 표출 (전체화면 대응 · 페이지 넘김 차단)
ui.openScheduleView = async function(){
  var room = state.room; if(!room) return;
  var dataUrl = '';
  try { var ds = await firebase.database().ref('courses/'+room+'/scheduleImage/dataUrl').once('value'); dataUrl = ds.val() || ''; } catch(e){}
  if(!dataUrl){ if(ui.showAlert) ui.showAlert('등록된 교육 시간표 사진이 없습니다.'); return; }
  ui.closeScheduleGuide();
  var modal = document.createElement('div'); modal.id = 'guideScheduleModal';
  modal.className = 'guide-schedule-modal';
  modal.innerHTML =
      '<div class="guide-schedule-frame">'
    + '<img src="'+dataUrl+'" alt="교육 시간표">'
    + '<button id="guideScheduleClose" class="guide-schedule-close" type="button" title="시간표 사진 닫기">'
    + '<i class="fa-solid fa-xmark"></i><span>시간표 닫기</span></button>'
    + '</div>';
  // PDF 페이지가 뒤에서 넘어가지 않도록 전파 차단
  modal.addEventListener('click', function(e){ e.stopPropagation(); });
  modal.addEventListener('contextmenu', function(e){ e.stopPropagation(); });
  modal.addEventListener('pointerdown', function(e){ e.stopPropagation(); });
  (document.fullscreenElement || document.webkitFullscreenElement || document.body).appendChild(modal);
  // [모니터 전체화면] 이미 전체화면이 아니면(창 모드), 시간표 사진을 모니터 전체로 띄우기 위해 전체화면 진입
  ui._scheduleEnteredFs = false;
  if(!(document.fullscreenElement || document.webkitFullscreenElement)){
    try{
      var _rf = modal.requestFullscreen || modal.webkitRequestFullscreen || modal.msRequestFullscreen;
      if(_rf){ var _p = _rf.call(modal); ui._scheduleEnteredFs = true; if(_p && _p.catch) _p.catch(function(){ ui._scheduleEnteredFs = false; }); }
    }catch(e){}
  }
  var cb = document.getElementById('guideScheduleClose');
  if(cb) cb.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); ui.closeScheduleGuide(); });
};
// 입교안내 13p '시간표 업로드' → QR 표출(폰으로 촬영·업로드) → 올라오면 자동으로 화면에 표시 (깜빡한 교수 즉석 업로드)
ui.openScheduleQrUpload = function(){
  var room = state.room; if(!room) return;
  if(state.isObserver){ if(ui.showAlert) ui.showAlert('👁️ 옵저버 모드에서는 업로드할 수 없습니다.'); return; }
  var old = document.getElementById('guideScheduleUploadModal'); if(old) old.remove();
  var url = (typeof scheduleMgr!=='undefined' && scheduleMgr._photoUploadUrl) ? scheduleMgr._photoUploadUrl() : ('schedule_photo.html?room='+encodeURIComponent(room));
  var modal = document.createElement('div'); modal.id = 'guideScheduleUploadModal';
  modal.setAttribute('style','position:fixed;inset:0;z-index:9700;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,.82);padding:2.5vh 2.5vw;');
  modal.innerHTML =
      '<div style="background:#fff;border-radius:20px;padding:30px 34px;max-width:440px;width:92vw;text-align:center;box-shadow:0 24px 70px rgba(0,0,0,.4);box-sizing:border-box;">'
    + '<div style="font-size:21px;font-weight:900;color:#0f172a;margin-bottom:6px;"><i class="fa-solid fa-camera" style="color:#d97706;margin-right:8px;"></i>교육 시간표 업로드</div>'
    + '<div style="font-size:13.5px;color:#64748b;font-weight:700;line-height:1.65;margin-bottom:18px;">담당 교수님 <b>휴대폰 카메라로 아래 QR을 스캔</b>한 뒤<br>시간표를 <b>촬영</b>하거나 <b>앨범에서 선택</b>해 업로드하세요.</div>'
    + '<div id="guideSchedUploadQr" style="display:inline-block;padding:14px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;"></div>'
    + '<div id="guideSchedUploadWait" style="margin-top:16px;font-size:13px;font-weight:800;color:#94a3b8;"><i class="fa-solid fa-circle-notch fa-spin"></i> 업로드 대기 중… 사진이 올라오면 자동으로 표시됩니다.</div>'
    + '<button id="guideSchedUploadClose" style="margin-top:18px;background:#f1f5f9;color:#475569;border:none;border-radius:12px;padding:11px 24px;font-weight:800;font-size:14px;cursor:pointer;">닫기</button>'
    + '</div>';
  // PDF 페이지가 뒤에서 넘어가지 않도록 전파 차단
  modal.addEventListener('click', function(e){ e.stopPropagation(); if(e.target === modal) closeUp(); });
  modal.addEventListener('contextmenu', function(e){ e.stopPropagation(); });
  modal.addEventListener('pointerdown', function(e){ e.stopPropagation(); });
  (document.fullscreenElement || document.webkitFullscreenElement || document.body).appendChild(modal);
  var qrDiv = document.getElementById('guideSchedUploadQr');
  if(qrDiv && typeof QRCode !== 'undefined'){ try{ new QRCode(qrDiv, { text:url, width:210, height:210, correctLevel:QRCode.CorrectLevel.H }); }catch(e){ qrDiv.textContent = url; } }
  else if(qrDiv){ qrDiv.textContent = url; }
  // 업로드 라이브 감지: updatedAt이 생기면 = 사진 올라옴 → 슬롯 갱신 · 버튼 토글 · 모달 닫고 바로 보기
  var ref = firebase.database().ref('courses/'+room+'/scheduleImage/updatedAt');
  function onTs(snap){
    if(state.room !== room) return;
    var ts = snap.val(); if(!ts) return;
    try{ var sl = guideMgr._slot(); if(sl) sl.scheduleTs = Number(ts); }catch(e){}
    closeUp();
    try{ guideMgr.renderPage(guideMgr._slot().pageNum); }catch(e){}   // 버튼을 '보기'로 전환
    if(ui.openScheduleView) ui.openScheduleView();                    // 올라온 시간표 바로 표시
  }
  function cleanup(){ try{ ref.off('value', onTs); }catch(e){} }
  function closeUp(){ cleanup(); var m=document.getElementById('guideScheduleUploadModal'); if(m) m.remove(); }
  modal._cleanup=cleanup;
  ref.on('value', onTs);
  var cbtn = document.getElementById('guideSchedUploadClose'); if(cbtn) cbtn.addEventListener('click', closeUp);
};
// 입교안내 삽입 페이지(프로필·오픈톡방QR·채널안내·교육과정안내) 위치 수동 설정
ui.openGuidePageSettings = function(){
  if(state.isObserver){ ui.showAlert('👁️ 옵저버 모드에서는 변경할 수 없습니다.'); return; }
  if(!state.room){ ui.showAlert('강의실을 먼저 선택하세요.'); return; }
  var pos = (typeof guideMgr!=='undefined' && guideMgr._pagePos) ? guideMgr._pagePos() : { profile:1, kakaoqr:1, channelguide:1, courseinfo:12 };
  var total = 0; try{ var sl=guideMgr._slot(); total=(sl&&sl.pdfDoc)?sl.pdfDoc.numPages:0; }catch(e){}
  var en=(typeof guideMgr!=='undefined'&&guideMgr._pageEnable)?guideMgr._pageEnable():{kakaoqr:true,channelguide:true};
  // 페이지 위치 입력 행 (프로필 · 교육과정 안내)
  var rowPage=function(key,label,icon,color){
    return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">'
      +'<i class="fa-solid '+icon+'" style="color:'+color+';width:22px;text-align:center;"></i>'
      +'<span style="flex:1;font-size:14px;font-weight:800;color:#334155;">'+label+'</span>'
      +'<span style="font-size:12px;color:#94a3b8;font-weight:700;">PDF</span>'
      +'<input type="number" min="1" '+(total?('max="'+total+'"'):'')+' id="gpp-'+key+'" value="'+pos[key]+'" style="width:64px;padding:8px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:14px;font-weight:800;text-align:center;">'
      +'<span style="font-size:12px;color:#64748b;font-weight:700;">페이지 뒤</span></div>';
  };
  // 표시/해제 체크박스 행 (오픈톡방 QR · 채널 입교등록 안내 — 프로필 바로 뒤에 따라옴)
  var rowCheck=function(key,label,icon,color,checked,sub){
    return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;padding-left:16px;border-left:2px solid #e2e8f0;margin-left:8px;">'
      +'<i class="fa-solid '+icon+'" style="color:'+color+';width:22px;text-align:center;"></i>'
      +'<span style="flex:1;font-size:13.5px;font-weight:800;color:#475569;">'+label+' <span style="font-weight:600;color:#94a3b8;font-size:11px;">'+(sub||'· 프로필 바로 뒤')+'</span></span>'
      +'<label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer;user-select:none;"><input type="checkbox" id="gpe-'+key+'" '+(checked?'checked':'')+' style="width:17px;height:17px;accent-color:#2563eb;cursor:pointer;"><span style="font-size:12.5px;font-weight:800;color:#334155;">표시</span></label></div>';
  };
  // [온라인 운영부공지] 온라인 과정일 때만 노출되는 토글 (기본 숨김 → 켜면 표시)
  var _isOnlineCourse = (typeof guideMgr!=='undefined' && guideMgr._isOnline && guideMgr._isOnline());
  var _cnOnline = !!(guideMgr._slot && guideMgr._slot() && guideMgr._slot().centerNoticeOnline);
  var onlineNoticeRow = _isOnlineCourse
    ? ('<div style="display:flex;align-items:center;gap:10px;margin:2px 0 12px;padding:8px 12px 8px 16px;border-left:2px solid #fcd34d;margin-left:8px;background:#fffbeb;border-radius:0 8px 8px 0;">'
        +'<i class="fa-solid fa-video" style="color:#0ea5e9;width:22px;text-align:center;"></i>'
        +'<span style="flex:1;font-size:13px;font-weight:800;color:#92400e;">온라인 과정에도 운영부 공지 표시 <span style="font-weight:600;color:#b45309;font-size:11px;">(온라인은 기본 숨김)</span></span>'
        +'<label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer;user-select:none;"><input type="checkbox" id="gpe-cnonline" '+(_cnOnline?'checked':'')+' style="width:17px;height:17px;accent-color:#0ea5e9;cursor:pointer;"><span style="font-size:12.5px;font-weight:800;color:#334155;">표시</span></label></div>')
    : '';
  var rowHtml=rowPage('profile','담임교수 프로필','fa-user-tie','#1e3a8a')
    +rowCheck('kakaoqr','오픈톡방 QR','fa-qrcode','#3a1d1d',en.kakaoqr)
    +rowCheck('channelguide','채널 입교등록 안내','fa-comment-dots','#f59e0b',en.channelguide)
    +rowPage('courseinfo','교육과정 안내','fa-clipboard-list','#1d4ed8')
    +rowCheck('centernotice','입교안내 공지','fa-bullhorn','#e11d48',en.centernotice,'· PDF 23p 뒤 · 공지 있을 때만 표시')
    +onlineNoticeRow;
  // 교육 장소 강의실 (4 교육동) 선택 행 — 슬라이드 위 pill 없이 여기서 지정
  var _esc=function(x){ return String(x||'').replace(/"/g,'&quot;').replace(/</g,'&lt;'); };
  var venuePick=((guideMgr._slot&&guideMgr._slot().venuePick)||{});
  var curVenue=''; var _NC=(guideMgr._venueCells?guideMgr._venueCells.length:3); for(var _vk=0;_vk<_NC;_vk++){ if(venuePick[_vk]){ curVenue=venuePick[_vk]; break; } }
  var venueOpts='<option value="">(선택 안함 / 없음)</option>';
  var _optTag=function(o){ return '<option value="'+_esc(o)+'"'+(o===curVenue?' selected':'')+'>'+_esc(o)+'</option>'; };
  (guideMgr._venueCells||[]).forEach(function(c){
    var os=guideMgr._venueOptions(c.filter);
    if(!os.length) return;
    if(c.filter==='국제동'){   // 글로벌교육동은 1층/2층으로 나눠서 표시
      var f1=os.filter(function(o){return o.indexOf('1층')>=0;}), f2=os.filter(function(o){return o.indexOf('2층')>=0;}), oth=os.filter(function(o){return o.indexOf('1층')<0&&o.indexOf('2층')<0;});
      if(f1.length) venueOpts+='<optgroup label="'+_esc(c.label)+' · 1층">'+f1.map(_optTag).join('')+'</optgroup>';
      if(f2.length) venueOpts+='<optgroup label="'+_esc(c.label)+' · 2층">'+f2.map(_optTag).join('')+'</optgroup>';
      if(oth.length) venueOpts+='<optgroup label="'+_esc(c.label)+'">'+oth.map(_optTag).join('')+'</optgroup>';
    } else {
      venueOpts+='<optgroup label="'+_esc(c.label)+'">'+os.map(_optTag).join('')+'</optgroup>';
    }
  });
  var venueRows='<select id="gvv-single" style="width:100%;padding:9px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:14px;font-weight:700;">'+venueOpts+'</select>';
  var ov=document.createElement('div'); ov.id='guidePageSettingsModal';
  ov.style.cssText='position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:21000;display:flex;align-items:center;justify-content:center;';
  ov.innerHTML='<div style="background:#fff;border-radius:18px;padding:26px 28px;width:480px;max-width:92vw;box-shadow:0 24px 70px rgba(0,0,0,.3);" onclick="event.stopPropagation()">'
    +'<h3 style="margin:0 0 6px;font-size:19px;font-weight:900;color:#0f172a;"><i class="fa-solid fa-gear" style="color:#2563eb;"></i> 삽입 페이지 위치 설정</h3>'
    +'<p style="margin:0 0 16px;font-size:12.5px;color:#64748b;font-weight:600;line-height:1.5;">삽입 위치는 <b>프로필</b> 기준 1곳만 정하면 됩니다. 오픈톡방 QR·채널 안내는 <b>프로필 바로 뒤</b>에 이어서 나오며, 체크 해제 시 표시되지 않습니다.'+(total?(' 현재 PDF 총 <b>'+total+'</b>페이지.'):'')+' <b>이 과정에만</b> 저장됩니다. (등록 조건이 맞을 때만 표시)</p>'
    +rowHtml
    +'<hr style="border:none;border-top:1px solid #eef2f7;margin:8px 0 12px;">'
    +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">'
      +'<i class="fa-solid fa-location-dot" style="color:#16a34a;width:22px;text-align:center;"></i>'
      +'<span style="flex:1;font-size:14px;font-weight:800;color:#334155;">교육 장소 페이지 (강의실 ✓)</span>'
      +'<span style="font-size:12px;color:#94a3b8;font-weight:700;">PDF</span>'
      +'<input type="number" min="1" '+(total?('max="'+total+'"'):'')+' id="gpp-venuepage" value="'+((typeof guideMgr!=="undefined"&&guideMgr._venuePage)?guideMgr._venuePage():14)+'" style="width:64px;padding:8px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:14px;font-weight:800;text-align:center;">'
      +'<span style="font-size:12px;color:#64748b;font-weight:700;">페이지</span></div>'
    +'<div style="font-size:13px;font-weight:900;color:#16a34a;margin:12px 0 8px;"><i class="fa-solid fa-location-dot"></i> 교육 장소 · 강의실 <span style="font-weight:600;color:#94a3b8;font-size:11.5px;">(한 곳만 선택 → 해당 교육동에 ✓ 표시)</span></div>'
    +venueRows
    +'<div id="gpp-msg" style="font-size:12px;color:#ef4444;font-weight:700;min-height:16px;margin:4px 0;"></div>'
    +'<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:8px;">'
    +'<button onclick="document.getElementById(\'guidePageSettingsModal\').remove()" style="padding:10px 18px;border:none;border-radius:10px;background:#64748b;color:#fff;font-weight:800;cursor:pointer;">취소</button>'
    +'<button onclick="ui.saveGuidePageSettings()" style="padding:10px 22px;border:none;border-radius:10px;background:#10b981;color:#fff;font-weight:800;cursor:pointer;">적용</button>'
    +'</div></div>';
  ov.addEventListener('click', function(e){ if(e.target===ov) ov.remove(); });
  document.body.appendChild(ov);
};
ui.saveGuidePageSettings = function(){
  if(!state.room) return;
  var keys=['profile','courseinfo'];   // 페이지 위치는 프로필·교육과정 안내 2개만 (QR·채널은 프로필 뒤 따라감)
  var total=0; try{ var sl=guideMgr._slot(); total=(sl&&sl.pdfDoc)?sl.pdfDoc.numPages:0; }catch(e){}
  var obj={};
  keys.forEach(function(k){ var el=document.getElementById('gpp-'+k); if(!el) return; var v=parseInt(el.value,10); if(!v||v<1) v=1; if(total&&v>total) v=total; obj[k]=v; });
  var en={ kakaoqr: !!(document.getElementById('gpe-kakaoqr')||{}).checked, channelguide: !!(document.getElementById('gpe-channelguide')||{}).checked, centernotice: !!(document.getElementById('gpe-centernotice')||{}).checked };
  var vp=parseInt((document.getElementById('gpp-venuepage')||{}).value,10); if(!vp||vp<1) vp=14; if(total&&vp>total) vp=total;
  var vsel=String((document.getElementById('gvv-single')||{}).value||'').trim();
  var vpick={};
  if(vsel){ var _vc=guideMgr._venueCells||[]; for(var _ci=0;_ci<_vc.length;_ci++){ if(vsel.indexOf(_vc[_ci].filter)>=0){ vpick[_ci]=vsel; break; } } }
  // [온라인 운영부공지] 토글(온라인 과정에만 표시됨). 요소가 없으면 기존 값 유지.
  var _cnOnlineEl=document.getElementById('gpe-cnonline');
  var upd={}; upd['courses/'+state.room+'/settings/guidePagePos']=obj; upd['courses/'+state.room+'/settings/guidePageEnable']=en; upd['courses/'+state.room+'/settings/guideVenuePage']=vp; upd['courses/'+state.room+'/settings/venuePick']=vpick;
  if(_cnOnlineEl){ upd['courses/'+state.room+'/settings/centerNoticeOnline']=!!_cnOnlineEl.checked; }
  firebase.database().ref().update(upd)
    .then(function(){
      try{ var sl=guideMgr._slot(); sl.pagePos=obj; sl.pageEnable=en; sl.venuePage=vp; sl.venuePick=vpick; if(_cnOnlineEl) sl.centerNoticeOnline=!!_cnOnlineEl.checked; }catch(e){}
      var m=document.getElementById('guidePageSettingsModal'); if(m) m.remove();
      if(typeof guideMgr.refresh==='function') guideMgr.refresh();
      ui.showAlert('✅ 삽입 페이지 위치가 저장되었습니다. (이 과정)');
    })
    .catch(function(){ var msg=document.getElementById('gpp-msg'); if(msg) msg.textContent='저장 중 오류가 발생했습니다.'; });
};
// ── [통합 현황판 검색창] 3초 꾹 누르면 드래그로 위치 이동 (전체 공통 저장) ──
ui._homeSearchPos = null; ui._homeSearchPosLoaded = false;
ui._loadHomeSearchPos = function(cb){
  try{
    firebase.database().ref('system/sharedGuide/homeSearchPos').once('value').then(function(s){
      var v=s.val()||{}; ui._homeSearchPos={ dx:Number(v.dx)||0, dy:Number(v.dy)||0 }; ui._homeSearchPosLoaded=true; if(cb)cb();
    }).catch(function(){ ui._homeSearchPos={dx:0,dy:0}; ui._homeSearchPosLoaded=true; if(cb)cb(); });
  }catch(e){ ui._homeSearchPos={dx:0,dy:0}; ui._homeSearchPosLoaded=true; if(cb)cb(); }
};
ui._applyHomeSearchPos = function(){
  var el=document.getElementById('homeSearchWrap'); if(!el) return;
  if(!ui._homeSearchPosLoaded){ ui._loadHomeSearchPos(function(){ ui._applyHomeSearchPos(); }); return; }
  var p=ui._homeSearchPos||{dx:0,dy:0};
  el.style.transform='translate('+p.dx+'vw,'+p.dy+'vh)';
};
ui._saveHomeSearchPos = function(){
  if(!ui._homeSearchPos) return;
  try{ firebase.database().ref('system/sharedGuide/homeSearchPos').set({dx:ui._homeSearchPos.dx, dy:ui._homeSearchPos.dy}).catch(function(){}); }catch(e){}
};
ui._bindHomeSearchDrag = function(){
  var el=document.getElementById('homeSearchWrap'); if(!el || el._hsDragBound) return; el._hsDragBound=true;
  var holdTimer=null, dragMode=false, moved=false, sx=0, sy=0, startDx=0, startDy=0, pid=null;
  var clearHold=function(){ if(holdTimer){ clearTimeout(holdTimer); holdTimer=null; } el.classList.remove('hs-pressing'); };
  el.addEventListener('pointerdown', function(e){
    if(e.target.closest('#homeSearchResults')) return;   // 결과 리스트 조작 중엔 드래그 안 함
    sx=e.clientX; sy=e.clientY; moved=false; dragMode=false; pid=e.pointerId;
    var p=ui._homeSearchPos||{dx:0,dy:0}; startDx=p.dx; startDy=p.dy;
    el.classList.add('hs-pressing');
    holdTimer=setTimeout(function(){
      dragMode=true; el.classList.remove('hs-pressing'); el.classList.add('hs-dragging');
      try{ el.setPointerCapture(pid); }catch(_){}
      try{ if(navigator.vibrate) navigator.vibrate(45); }catch(_){}
    }, 3000);
  });
  el.addEventListener('pointermove', function(e){
    if(dragMode){
      e.preventDefault();
      var ndx=startDx + (e.clientX-sx)/window.innerWidth*100;
      var ndy=startDy + (e.clientY-sy)/window.innerHeight*100;
      ui._homeSearchPos={dx:+ndx.toFixed(2), dy:+ndy.toFixed(2)};
      el.style.transform='translate('+ui._homeSearchPos.dx+'vw,'+ui._homeSearchPos.dy+'vh)';
    } else if(Math.hypot(e.clientX-sx,e.clientY-sy)>10){ moved=true; clearHold(); }
  });
  var end=function(e){
    clearHold();
    if(dragMode){ dragMode=false; el.classList.remove('hs-dragging'); try{ el.releasePointerCapture(pid); }catch(_){} ui._saveHomeSearchPos(); if(ui.showAlert) ui.showAlert('📍 검색창 위치를 저장했습니다. (모든 과정 공통)'); }
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', function(){ clearHold(); if(dragMode){ dragMode=false; el.classList.remove('hs-dragging'); ui._saveHomeSearchPos(); } });
};
document.addEventListener('DOMContentLoaded', function(){
  try{ if(ui && ui._bindHomeSearchDrag) ui._bindHomeSearchDrag(); }catch(e){}
  setTimeout(function(){ try{ if(ui && ui._applyHomeSearchPos) ui._applyHomeSearchPos(); }catch(e){} }, 900);
});

// ── [입교등록 카운트 블록] 영상(start.mp4) 페이지 좌측 큰 숫자 ──
//    위치 = 전체 과정 공통(system/sharedGuide/videoCountPos), 윈도우/전체화면 좌표 개별 저장.
//    3초 꾹 누르면 드래그로 이동.
ui._videoCountDefaultPos = { win:{ x:4, y:34 }, fs:{ x:4, y:34 } };   // %(슬라이드 기준) — 좌측 중앙쯤
ui._videoCountPos = null; ui._videoCountPosLoaded = false;
ui._isGuideFs = function(){ return !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement); };
ui._loadVideoCountPos = function(cb){
  firebase.database().ref('system/sharedGuide/videoCountPos').once('value').then(function(s){
    var v = s.val() || {}; var d = ui._videoCountDefaultPos;
    ui._videoCountPos = {
      win: { x: (v.win&&isFinite(v.win.x))?Number(v.win.x):d.win.x, y: (v.win&&isFinite(v.win.y))?Number(v.win.y):d.win.y },
      fs:  { x: (v.fs &&isFinite(v.fs.x)) ?Number(v.fs.x) :d.fs.x,  y: (v.fs &&isFinite(v.fs.y)) ?Number(v.fs.y) :d.fs.y }
    };
    ui._videoCountPosLoaded = true; if(cb) cb();
  }).catch(function(){ var d=ui._videoCountDefaultPos; ui._videoCountPos={win:{x:d.win.x,y:d.win.y},fs:{x:d.fs.x,y:d.fs.y}}; ui._videoCountPosLoaded=true; if(cb) cb(); });
};
// ── [채널 배경음 초기 음량] 전체 과정 공통(system/sharedGuide/channelAudioVolume) · 기본 20% ──
//    음량 아이콘 클릭 = 슬라이더 펼침/접기(현재 세션 음량 조절), 3초 꾹 = 지금 음량을 초기값으로 저장.
ui._cgVolDefault = 0.2;
ui._cgVol = null; ui._cgVolLoaded = false;
ui._loadChannelVol = function(cb){
  firebase.database().ref('system/sharedGuide/channelAudioVolume').once('value').then(function(s){
    var v = s.val();
    ui._cgVol = (v!=null && isFinite(v)) ? Math.max(0,Math.min(1,Number(v))) : ui._cgVolDefault;
    ui._cgVolLoaded = true; if(cb) cb();
  }).catch(function(){ ui._cgVol = ui._cgVolDefault; ui._cgVolLoaded = true; if(cb) cb(); });
};
ui._saveChannelVol = function(v){
  v = Math.max(0,Math.min(1,Number(v)||0));
  ui._cgVol = v;
  firebase.database().ref('system/sharedGuide/channelAudioVolume').set(v).catch(function(){});
};
// 채널 페이지 진입 시 호출: 저장된 음량을 슬라이더/오디오에 반영하고 버튼에 롱프레스 저장 바인딩
// ── [채널 음량 위젯] 위치 = 전체 과정 공통(system/sharedGuide/videoVolPos) · 윈도우/전체화면 개별 · 3초 꾹 드래그 이동 ──
ui._volPosDefault = { win:{ x:82, y:85 }, fs:{ x:82, y:85 } };
ui._volPos = null; ui._volPosLoaded = false;
ui._loadVolPos = function(cb){
  firebase.database().ref('system/sharedGuide/videoVolPos').once('value').then(function(s){
    var v=s.val()||{}; var d=ui._volPosDefault;
    ui._volPos={
      win:{ x:(v.win&&isFinite(v.win.x))?Number(v.win.x):d.win.x, y:(v.win&&isFinite(v.win.y))?Number(v.win.y):d.win.y },
      fs: { x:(v.fs&&isFinite(v.fs.x))?Number(v.fs.x):d.fs.x,  y:(v.fs&&isFinite(v.fs.y))?Number(v.fs.y):d.fs.y }
    };
    ui._volPosLoaded=true; if(cb)cb();
  }).catch(function(){ var d=ui._volPosDefault; ui._volPos={win:{x:d.win.x,y:d.win.y},fs:{x:d.fs.x,y:d.fs.y}}; ui._volPosLoaded=true; if(cb)cb(); });
};
ui._saveVolPos = function(){
  if(!ui._volPos) return;
  firebase.database().ref('system/sharedGuide/videoVolPos').set({ win:ui._volPos.win, fs:ui._volPos.fs }).catch(function(){});
};
ui._applyVolPos = function(){
  var w=document.getElementById('cgVolWrap'); if(!w) return;
  if(!ui._volPosLoaded){ ui._loadVolPos(function(){ ui._applyVolPos(); }); return; }
  var P=ui._volPos||ui._volPosDefault; var c=ui._isGuideFs()?P.fs:P.win;
  w.style.left=c.x+'%'; w.style.top=c.y+'%'; w.style.right='auto'; w.style.bottom='auto';
};
ui._initChannelVolUI = function(){
  var apply = function(){
    var v = (ui._cgVol!=null && isFinite(ui._cgVol)) ? ui._cgVol : ui._cgVolDefault;
    try { if (guideMgr && guideMgr._setChannelVolume) guideMgr._setChannelVolume(v); } catch(e){}
  };
  if(!ui._cgVolLoaded){ ui._loadChannelVol(apply); } else { apply(); }
  ui._applyVolPos();
  var btn = document.getElementById('cgVolBtn');
  var wrap = document.getElementById('cgVolWrap');
  var slider = document.getElementById('cgVolSlider');
  // 슬라이더 조작이 PDF 페이지 넘김으로 이어지지 않도록 전파 차단
  if(slider && !slider._cgStop){
    slider._cgStop = true;
    ['pointerdown','pointerup','click','mousedown','mouseup','touchstart','touchend'].forEach(function(ev){
      slider.addEventListener(ev, function(e){ e.stopPropagation(); }, {passive:true});
    });
  }
  if(wrap && !wrap._cgStop){
    wrap._cgStop = true;
    wrap.addEventListener('click', function(e){ e.stopPropagation(); });
    wrap.addEventListener('contextmenu', function(e){ e.stopPropagation(); e.preventDefault(); });
  }
  if(btn && !btn._cgVolBound){
    btn._cgVolBound = true;
    var holdTimer=null, dragMode=false, moved=false, sx=0, sy=0, gx=0, gy=0;
    var clearHold=function(){ if(holdTimer){ clearTimeout(holdTimer); holdTimer=null; } btn.classList.remove('cg-vol-pressing'); };
    btn.addEventListener('pointerdown', function(e){
      e.stopPropagation(); e.preventDefault(); sx=e.clientX; sy=e.clientY; moved=false; dragMode=false;
      try{ btn.setPointerCapture(e.pointerId); }catch(_){}
      btn.classList.add('cg-vol-pressing');
      holdTimer=setTimeout(function(){
        dragMode=true; btn.classList.remove('cg-vol-pressing'); if(wrap) wrap.classList.add('cg-vol-dragging');
        var cr=(wrap||btn).getBoundingClientRect(); gx=sx-cr.left; gy=sy-cr.top;
        try{ if(navigator.vibrate) navigator.vibrate(45); }catch(_){}
      }, 3000);
    });
    btn.addEventListener('pointermove', function(e){
      if(dragMode){
        e.preventDefault(); e.stopPropagation();
        var slide=(wrap||btn).parentElement; if(!slide) return; var r=slide.getBoundingClientRect();
        var ww=(wrap||btn).offsetWidth/r.width*100, wh=(wrap||btn).offsetHeight/r.height*100;
        var nl=(e.clientX-gx-r.left)/r.width*100, nt=(e.clientY-gy-r.top)/r.height*100;
        nl=Math.max(0,Math.min(100-ww,nl)); nt=Math.max(0,Math.min(100-wh,nt));
        if(wrap){ wrap.style.left=nl.toFixed(2)+'%'; wrap.style.top=nt.toFixed(2)+'%'; wrap.style.right='auto'; wrap.style.bottom='auto'; }
        if(!ui._volPos){ var d=ui._volPosDefault; ui._volPos={win:{x:d.win.x,y:d.win.y},fs:{x:d.fs.x,y:d.fs.y}}; }
        if(!ui._volPos.fs) ui._volPos.fs={}; if(!ui._volPos.win) ui._volPos.win={};
        var slot=ui._isGuideFs()?ui._volPos.fs:ui._volPos.win;
        slot.x=+nl.toFixed(2); slot.y=+nt.toFixed(2);
      } else if(Math.hypot(e.clientX-sx,e.clientY-sy)>10){ moved=true; clearHold(); }
    });
    btn.addEventListener('pointerup', function(e){
      e.stopPropagation(); clearHold();
      try{ btn.releasePointerCapture(e.pointerId); }catch(_){}
      if(dragMode){
        dragMode=false; if(wrap) wrap.classList.remove('cg-vol-dragging');
        ui._saveVolPos();
        // 위치와 함께 현재 음량도 초기값으로 저장 (같이 저장)
        var vol=(guideMgr._cgAudio?guideMgr._cgAudio.volume:((ui._cgVol!=null)?ui._cgVol:ui._cgVolDefault));
        ui._saveChannelVol(vol);
        if(ui.showAlert) ui.showAlert('📍 스피커 위치와 음량('+Math.round(vol*100)+'%)을 저장했습니다. ('+(ui._isGuideFs()?'전체화면':'창 모드')+' · 모든 과정 공통)');
      } else if(!moved && wrap){
        wrap.classList.toggle('open');   // 짧게 누르면 슬라이더 펼침/접기
      }
    });
    btn.addEventListener('pointercancel', function(){ clearHold(); if(dragMode){ dragMode=false; if(wrap) wrap.classList.remove('cg-vol-dragging'); ui._saveVolPos(); } });
    btn.addEventListener('click', function(e){ e.stopPropagation(); e.preventDefault(); });
    btn.addEventListener('contextmenu', function(e){ e.stopPropagation(); e.preventDefault(); });
  }
};
ui._saveVideoCountPos = function(){
  if(!ui._videoCountPos) return;
  firebase.database().ref('system/sharedGuide/videoCountPos').set({ win:ui._videoCountPos.win, fs:ui._videoCountPos.fs }).catch(function(){});
};
ui._applyVideoCountPos = function(){
  var box = document.getElementById('cgCountBox'); if(!box) return;
  if(!ui._videoCountPosLoaded){ ui._loadVideoCountPos(function(){ ui._applyVideoCountPos(); }); return; }
  var P = ui._videoCountPos || ui._videoCountDefaultPos;
  var c = ui._isGuideFs() ? P.fs : P.win;
  box.style.left = c.x + '%';
  box.style.top  = c.y + '%';
};
ui._bindVideoCountDrag = function(box){
  if(!box || box._cgBound) return; box._cgBound = true;
  var holdTimer=null, dragMode=false, moved=false, sx=0, sy=0, gx=0, gy=0;
  var clearHold=function(){ if(holdTimer){ clearTimeout(holdTimer); holdTimer=null; } box.classList.remove('cg-count-pressing'); };
  box.addEventListener('pointerdown', function(e){
    e.stopPropagation();
    sx=e.clientX; sy=e.clientY; moved=false; dragMode=false;
    try{ box.setPointerCapture(e.pointerId); }catch(_){}
    box.classList.add('cg-count-pressing');
    holdTimer=setTimeout(function(){
      dragMode=true; box.classList.remove('cg-count-pressing'); box.classList.add('cg-count-dragging');
      var cr=box.getBoundingClientRect(); gx=sx-cr.left; gy=sy-cr.top;
      try{ if(navigator.vibrate) navigator.vibrate(45); }catch(_){}
    }, 3000);
  });
  box.addEventListener('pointermove', function(e){
    if(dragMode){
      e.preventDefault();
      var slide = box.parentElement; if(!slide) return; var r=slide.getBoundingClientRect();
      var bw = box.offsetWidth/r.width*100, bh = box.offsetHeight/r.height*100;
      var nl=(e.clientX-gx-r.left)/r.width*100, nt=(e.clientY-gy-r.top)/r.height*100;
      nl=Math.max(0,Math.min(100-bw,nl)); nt=Math.max(0,Math.min(100-bh,nt));
      box.style.left=nl.toFixed(2)+'%'; box.style.top=nt.toFixed(2)+'%';
      if(!ui._videoCountPos){ var d=ui._videoCountDefaultPos; ui._videoCountPos={win:{x:d.win.x,y:d.win.y},fs:{x:d.fs.x,y:d.fs.y}}; }
      var P=ui._videoCountPos;
      if(!P.fs) P.fs={}; if(!P.win) P.win={};
      var slot = ui._isGuideFs() ? P.fs : P.win;
      slot.x=+nl.toFixed(2); slot.y=+nt.toFixed(2);
    } else if(Math.hypot(e.clientX-sx,e.clientY-sy)>10){ moved=true; clearHold(); }
  });
  box.addEventListener('pointerup', function(e){
    e.stopPropagation(); clearHold();
    try{ box.releasePointerCapture(e.pointerId); }catch(_){}
    if(dragMode){ dragMode=false; box.classList.remove('cg-count-dragging'); ui._saveVideoCountPos();
      if(ui.showAlert) ui.showAlert('📍 입교등록 카운트 위치를 저장했습니다. ('+(ui._isGuideFs()?'전체화면':'창 모드')+' · 모든 과정 공통)'); }
  });
  box.addEventListener('pointercancel', function(){ clearHold(); if(dragMode){ dragMode=false; box.classList.remove('cg-count-dragging'); ui._saveVideoCountPos(); } });
  box.addEventListener('click', function(e){ e.stopPropagation(); });
  box.addEventListener('contextmenu', function(e){ e.stopPropagation(); e.preventDefault(); });
};
// [입교 완료 연기 효과] 신규 입교자 이름이 카운트 블록 위로 피어올라 블러되며 사라짐
ui._spawnEnrollFx = function(name){
  var box = document.getElementById('cgCountBox'); if(!box) return;
  var nm = String(name||'').trim(); if(!nm) return;
  var fx = document.createElement('div'); fx.className = 'cg-enroll-fx';
  fx.textContent = '🎉 ' + nm + '님 입교를 환영합니다!';
  // 여러 명 동시 등록 시 겹침 완화용 좌우 랜덤 오프셋
  var off = Math.round(Math.random()*36 - 18);
  fx.style.left = 'calc(50% + ' + off + 'px)';
  box.appendChild(fx);
  setTimeout(function(){ try{ fx.remove(); }catch(e){} }, 2600);
};
// 전체화면 진입/해제 시 카운트 블록 위치를 해당 모드 좌표로 다시 적용 (윈도우/전체화면 좌표 분리)
if(!ui._videoCountFsHook){
  ui._videoCountFsHook = true;
  ['fullscreenchange','webkitfullscreenchange','msfullscreenchange'].forEach(function(ev){
    document.addEventListener(ev, function(){ try{ if(document.getElementById('cgCountBox') && ui._applyVideoCountPos) ui._applyVideoCountPos(); }catch(e){} try{ if(document.getElementById('cgVolWrap') && ui._applyVolPos) ui._applyVolPos(); }catch(e){} });
  });
}

// 교육장소 페이지 오버레이: 교육동 4칸에 선택된 강의실 ✓ 표시 (셀 위치는 % · 화면 보고 미세조정 가능)
// 칸 위치 = 전체 과정 공통 (system/sharedGuide/venuePos). 3초 꾹 누르면 드래그로 이동
ui._venueDefaultPos = { lefts:[5,36,68], tops:[52,52,52], w:31, h:16 };   // 3개 교육동 흰 칸 너비를 넓혀 강의실명을 온전히 표시
ui._venuePos = null; ui._venuePosLoaded = false;
ui._loadVenuePos = function(cb){
  firebase.database().ref('system/sharedGuide/venuePos').once('value').then(function(s){
    var v = s.val() || {}; var d = ui._venueDefaultPos;
    var NC = d.lefts.length;
    ui._venuePos = {
      lefts: (Array.isArray(v.lefts)&&v.lefts.length===NC)? v.lefts.map(Number) : d.lefts.slice(),
      tops:  (Array.isArray(v.tops) &&v.tops.length===NC)?  v.tops.map(Number)  : d.tops.slice(),
      w: Math.max(Number(v.w)||d.w,d.w), h: Number(v.h)||d.h
    };
    ui._venuePosLoaded = true; if(cb) cb();
  }).catch(function(){ var d=ui._venueDefaultPos; ui._venuePos={lefts:d.lefts.slice(),tops:d.tops.slice(),w:d.w,h:d.h}; ui._venuePosLoaded=true; if(cb) cb(); });
};
ui._saveVenuePos = function(){
  if(!ui._venuePos) return;
  firebase.database().ref('system/sharedGuide/venuePos').set({ lefts:ui._venuePos.lefts, tops:ui._venuePos.tops, w:ui._venuePos.w, h:ui._venuePos.h }).catch(function(){});
};
ui.renderVenueOverlay = function(){
  var ov = document.getElementById('guideVenueOverlay'); if(!ov) return;
  if(!ui._venuePosLoaded){ ui._loadVenuePos(function(){ ui.renderVenueOverlay(); }); }
  var P = ui._venuePos || ui._venueDefaultPos;
  var slot = (typeof guideMgr!=='undefined') ? guideMgr._slot() : {};
  var pick = (slot && slot.venuePick) || {};
  var NC = (guideMgr._venueCells ? guideMgr._venueCells.length : 3);
  // [자동 강의실] 수동 선택(venuePick)이 없으면, 과정 강의실(연간계획/과정현황의 roomDetailName)로 자동 표시
  var _hasManual=false; for(var _mk in pick){ if(pick[_mk]){ _hasManual=true; break; } }
  if(!_hasManual){
    var _rd = (slot && slot.roomDetailName) ? String(slot.roomDetailName).trim() : '';
    if(_rd && guideMgr._venueCells){
      for(var _ci=0;_ci<guideMgr._venueCells.length;_ci++){
        if(_rd.indexOf(guideMgr._venueCells[_ci].filter) >= 0){ pick = {}; pick[_ci] = _rd; break; }
      }
    }
  }
  var selIdx = -1; for(var k=0;k<NC;k++){ if(pick[k]){ selIdx=k; break; } }   // 선택된 칸(첫 번째 하나만)
  var hasSel = selIdx >= 0;
  var html = '';
  for(var i=0;i<NC;i++){
    if(hasSel && i!==selIdx) continue;   // 선택되면 그 칸만 표시(나머지 칸은 숨김)
    var val = pick[i] || '';
    if(val){
      var sh = (guideMgr._venueShort ? guideMgr._venueShort(val) : {main:val,sub:''});
      var e2 = function(x){ return String(x||'').replace(/</g,'&lt;'); };
      var badge = '<span class="gv-badge'+(sh.sub?' gv-badge-2':'')+'"><span class="gv-badge-main">'+e2(sh.main)+'</span>'+(sh.sub?'<span class="gv-badge-sub">('+e2(sh.sub)+')</span>':'')+'</span>';
      var inner = '<span class="gv-check"><i class="fa-solid fa-check"></i></span>'+badge;
      html += '<div class="gv-cell gv-filled" data-cell="'+i+'" style="left:'+P.lefts[i]+'%;top:'+P.tops[i]+'%;width:'+P.w+'%;height:'+P.h+'%;touch-action:none;">'+inner+'</div>';
    } else {
      // 아직 선택 전 → 빈 체크박스로 선택 유도 (4칸 모두 표시)
      html += '<div class="gv-cell gv-empty-cell" data-cell="'+i+'" style="left:'+P.lefts[i]+'%;top:'+P.tops[i]+'%;width:'+P.w+'%;height:'+P.h+'%;touch-action:none;"><span class="gv-check gv-check-empty"></span></div>';
    }
  }
  ov.innerHTML = html;
  [].forEach.call(ov.querySelectorAll('.gv-cell'), function(c){ ui._bindVenueCell(c); });
};
ui._bindVenueCell = function(cell){
  var i = parseInt(cell.getAttribute('data-cell'),10);
  var holdTimer=null, dragMode=false, moved=false, sx=0, sy=0, gx=0, gy=0;
  var clearHold=function(){ if(holdTimer){ clearTimeout(holdTimer); holdTimer=null; } cell.classList.remove('gv-pressing'); };
  cell.addEventListener('pointerdown', function(e){
    e.stopPropagation();
    sx=e.clientX; sy=e.clientY; moved=false; dragMode=false;
    try{ cell.setPointerCapture(e.pointerId); }catch(_){}
    cell.classList.add('gv-pressing');   // 누르는 동안 옅게 표시(3초 후 이동 모드)
    holdTimer=setTimeout(function(){
      dragMode=true; cell.classList.remove('gv-pressing'); cell.classList.add('gv-dragging');
      var cr=cell.getBoundingClientRect(); gx=sx-cr.left; gy=sy-cr.top;
      try{ if(navigator.vibrate) navigator.vibrate(45); }catch(_){}
    }, 3000);
  });
  cell.addEventListener('pointermove', function(e){
    if(dragMode){
      e.preventDefault();
      var ov=document.getElementById('guideVenueOverlay'); if(!ov) return; var r=ov.getBoundingClientRect();
      var P=ui._venuePos||ui._venueDefaultPos;
      var nl=(e.clientX-gx-r.left)/r.width*100, nt=(e.clientY-gy-r.top)/r.height*100;
      nl=Math.max(0,Math.min(100-P.w,nl)); nt=Math.max(0,Math.min(100-P.h,nt));
      cell.style.left=nl.toFixed(2)+'%'; cell.style.top=nt.toFixed(2)+'%';
      P.lefts[i]=+nl.toFixed(2); P.tops[i]=+nt.toFixed(2);
    } else if(Math.hypot(e.clientX-sx,e.clientY-sy)>10){ moved=true; clearHold(); }
  });
  cell.addEventListener('pointerup', function(e){
    e.stopPropagation(); clearHold();
    try{ cell.releasePointerCapture(e.pointerId); }catch(_){}
    if(dragMode){ dragMode=false; cell.classList.remove('gv-dragging'); ui._saveVenuePos(); if(ui.showAlert) ui.showAlert('📍 강의실 칸 위치를 저장했습니다. (모든 과정 공통)'); }
    else if(!moved){ ui.pickVenue(i); }
  });
  cell.addEventListener('pointercancel', function(){ clearHold(); if(dragMode){ dragMode=false; cell.classList.remove('gv-dragging'); ui._saveVenuePos(); } });
  cell.addEventListener('contextmenu', function(e){ e.stopPropagation(); e.preventDefault(); });
  // 클릭이 뒤 PDF(pdfWrapper onclick=changePage)로 전파돼 페이지가 넘어가지 않도록 차단
  cell.addEventListener('click', function(e){ e.stopPropagation(); });
};
ui.pickVenue = function(i){
  if(state.isObserver){ ui.showAlert('👁️ 옵저버 모드에서는 변경할 수 없습니다.'); return; }
  if(!state.room) return;
  // 중복 팝업 방지: 기존 선택창이 있으면 모두 제거 (전체화면에서 안 보여 여러 번 눌러 쌓이던 문제)
  [].forEach.call(document.querySelectorAll('#venuePickModal'), function(m){ m.remove(); });
  var cell = guideMgr._venueCells[i];
  var opts = guideMgr._venueOptions(cell.filter);
  var slot = guideMgr._slot(); var cur = (slot.venuePick||{})[i] || '';
  var esc = function(x){ return String(x||'').replace(/"/g,'&quot;').replace(/</g,'&lt;'); };
  var _tag = function(o){ return '<option value="'+esc(o)+'"'+(o===cur?' selected':'')+'>'+esc(o)+'</option>'; };
  var optionsHtml = '<option value="">(선택 안함 / 미정)</option>';
  if(cell.filter==='국제동'){   // 글로벌교육동은 1층/2층 그룹으로 구분
    var f1=opts.filter(function(o){return o.indexOf('1층')>=0;}), f2=opts.filter(function(o){return o.indexOf('2층')>=0;}), oth=opts.filter(function(o){return o.indexOf('1층')<0&&o.indexOf('2층')<0;});
    if(f1.length) optionsHtml+='<optgroup label="1층">'+f1.map(_tag).join('')+'</optgroup>';
    if(f2.length) optionsHtml+='<optgroup label="2층">'+f2.map(_tag).join('')+'</optgroup>';
    if(oth.length) optionsHtml+=oth.map(_tag).join('');
  } else {
    optionsHtml += opts.map(_tag).join('');
  }
  var ov = document.createElement('div'); ov.id='venuePickModal';
  ov.style.cssText='position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:21000;display:flex;align-items:center;justify-content:center;';
  ov.innerHTML = '<div style="background:#fff;border-radius:16px;padding:24px 26px;width:420px;max-width:92vw;box-shadow:0 24px 70px rgba(0,0,0,.3);" onclick="event.stopPropagation()">'
    +'<h3 style="margin:0 0 14px;font-size:18px;font-weight:900;color:#0f172a;"><i class="fa-solid fa-location-dot" style="color:#2563eb;"></i> '+esc(cell.label)+' · 강의실 선택</h3>'
    + (opts.length ? '<select id="venuePickSel" style="width:100%;padding:11px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:15px;font-weight:700;">'+optionsHtml+'</select>'
                   : '<input id="venuePickSel" type="text" value="'+esc(cur)+'" placeholder="강의실명 입력 (예: F강의실)" style="width:100%;padding:11px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:15px;font-weight:700;box-sizing:border-box;">')
    +'<p style="margin:10px 0 0;font-size:12px;color:#94a3b8;font-weight:700;">칸에는 짧게(예: "F 강의실") 표시됩니다.</p>'
    +'<div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">'
    +'<button onclick="document.getElementById(\'venuePickModal\').remove()" style="padding:9px 16px;border:none;border-radius:9px;background:#64748b;color:#fff;font-weight:800;cursor:pointer;">취소</button>'
    +'<button onclick="ui.saveVenue('+i+')" style="padding:9px 20px;border:none;border-radius:9px;background:#10b981;color:#fff;font-weight:800;cursor:pointer;">적용</button>'
    +'</div></div>';
  ov.addEventListener('click', function(e){ e.stopPropagation(); if(e.target===ov) ov.remove(); });
  ov.addEventListener('pointerdown', function(e){ e.stopPropagation(); });
  ov.addEventListener('contextmenu', function(e){ e.stopPropagation(); });
  // 전체화면(top layer) 위에 보이도록 전체화면 요소에 붙임
  (document.fullscreenElement || document.webkitFullscreenElement || document.body).appendChild(ov);
};
ui.saveVenue = function(i){
  if(!state.room) return;
  var el = document.getElementById('venuePickSel'); var val = el ? String(el.value||'').trim() : '';
  var slot = guideMgr._slot();
  var vp = {}; if(val) vp[i] = val;   // 한 곳만 — 선택 시 나머지 칸 자동 해제 (빈 값이면 미정 → 전체 해제 → 3칸 체크박스 복귀)
  slot.venuePick = vp;
  slot.roomDetailName = val || '';
  var updates = {};
  updates['courses/'+state.room+'/settings/venuePick'] = vp;
  // 강의실 선택을 과정 강의실(roomDetailName)에도 동기화 → 대시보드 장소에도 반영.
  // 수동 지정 플래그(미정 포함)를 세워 자동배치가 계획값으로 덮어쓰지 않게 함.
  updates['courses/'+state.room+'/settings/roomDetailName'] = val || '';
  updates['courses/'+state.room+'/status/roomDetailManual'] = true;
  firebase.database().ref().update(updates).catch(function(){});
  [].forEach.call(document.querySelectorAll('#venuePickModal'), function(m){ m.remove(); });   // 쌓인 팝업 모두 제거
  ui.renderVenueOverlay();
};
ui._spacedKoreanName = function(name){
  return Array.from(String(name || '').replace(/\s+/g, '')).join(' ');
};
ui.openLeaderRoulette = async function(){
  if(state.isObserver){ ui.showAlert('👁️ 옵저버는 사용할 수 없습니다.'); return; }
  if(!state.room){ ui.showAlert('강의실을 먼저 선택하세요.'); return; }
  var esc = s => String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  var room = state.room;
  // 입교(체크인)한 학생만 대상
  var students=[];
  try{
    var snap=await firebase.database().ref('courses/'+room+'/students').once('value');
    var data=snap.val()||{};
    Object.keys(data).forEach(function(token){ var st=data[token]; if(st && st.name && st.name!=='undefined'){ students.push({ token:token, name:String(st.name).trim() }); } });
  }catch(e){}
  students = students.filter(function(st, idx, arr){
    var key = String(st.name || '').replace(/\s+/g, '').toLowerCase();
    return key && arr.findIndex(function(x){
      return String(x.name || '').replace(/\s+/g, '').toLowerCase() === key;
    }) === idx;
  });
  students.sort(function(a,b){ return a.name.localeCompare(b.name); });
  if(students.length <= 1){ ui.showAlert('현재 입교 완료 인원이 ' + students.length + '명입니다.\n인원이 부족하여(2명 이상 필요) 학생장 룰렛을 이용할 수 없습니다.'); return; }

  ui._rouletteStudents = students;
  ui._rouletteWinner = null;
  ui._wheelRot = 0;
  ui._wheelSpinning = false;

  // 1명뿐이면 추첨의 의미가 없으므로 룰렛 대신 바로 지정 화면을 제공한다.
  if(students.length === 1){
    ui._rouletteWinner = students[0];
    var oneOld=document.getElementById('leaderRouletteModal'); if(oneOld) oneOld.remove();
    var oneModal=document.createElement('div'); oneModal.id='leaderRouletteModal';
    oneModal.setAttribute('style','position:fixed;inset:0;z-index:9700;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,.68);backdrop-filter:blur(6px);padding:18px;');
    oneModal.onclick=function(e){ if(e.target===oneModal) ui.closeLeaderRoulette(); };
    oneModal.innerHTML =
      '<div style="width:min(560px,94vw);background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.42);">'
        + '<div style="display:flex;align-items:center;justify-content:space-between;padding:20px 24px;background:linear-gradient(135deg,#0f4c81,#2563eb);color:#fff;">'
          + '<strong style="font-size:20px;"><i class="fa-solid fa-user-check" style="margin-right:9px;"></i>학생장 지정</strong>'
          + '<button onclick="ui.closeLeaderRoulette()" style="width:38px;height:38px;border:0;border-radius:50%;background:rgba(255,255,255,.18);color:#fff;font-size:20px;cursor:pointer;">&times;</button>'
        + '</div>'
        + '<div style="padding:38px 34px;text-align:center;">'
          + '<div style="font-size:15px;color:#64748b;font-weight:800;">현재 입교한 교육생이 1명입니다</div>'
          + '<div style="margin:24px 0 8px;font-size:clamp(38px,8vw,62px);font-weight:950;color:#0f3d68;white-space:nowrap;">'+esc(ui._spacedKoreanName(students[0].name))+'</div>'
          + '<div style="font-size:18px;color:#475569;font-weight:800;margin-bottom:30px;">룰렛 없이 학생장으로 지정할 수 있습니다.</div>'
          + '<button onclick="ui.confirmRouletteLeader()" style="width:100%;min-height:58px;border:0;border-radius:14px;background:#0f6cbd;color:#fff;font-size:19px;font-weight:900;cursor:pointer;box-shadow:0 10px 24px rgba(15,108,189,.26);"><i class="fa-solid fa-crown" style="margin-right:8px;"></i>학생장으로 지정</button>'
        + '</div>'
      + '</div>';
    document.body.appendChild(oneModal);
    var oneHome=document.getElementById('floatingHomeBtn'); if(oneHome) oneHome.style.display='none';
    return;
  }

  // ── 원형 휠 SVG 생성 ──
  var N=students.length, seg=360/N, cx=300, cy=300, r=292;
  var colors=['#174c7e','#2563eb','#0f766e','#16a34a','#d97706','#ea580c','#db2777','#7c3aed','#0891b2','#475569'];
  function polar(R,deg){ var a=deg*Math.PI/180; return [cx+R*Math.cos(a), cy+R*Math.sin(a)]; }
  function arcPath(R,a0,a1){ var p0=polar(R,a0), p1=polar(R,a1); var large=((a1-a0)%360)>180?1:0; return 'M'+cx+' '+cy+' L'+p0[0].toFixed(2)+' '+p0[1].toFixed(2)+' A'+R+' '+R+' 0 '+large+' 1 '+p1[0].toFixed(2)+' '+p1[1].toFixed(2)+' Z'; }
  var fs=Math.max(14, Math.min(46, Math.round(520/N)));
  var segHtml='', txtHtml='';
  for(var i=0;i<N;i++){
    var a0=i*seg, a1=(i+1)*seg, mid=a0+seg/2;
    var col=colors[i%colors.length];
    segHtml+='<path d="'+arcPath(r,a0,a1)+'" fill="'+col+'" stroke="#ffffff" stroke-width="2"/>';
    var tp=polar(r*0.60,mid);
    var nm=students[i].name; if(nm.length>8) nm=nm.slice(0,8)+'…';
    txtHtml+='<text x="'+tp[0].toFixed(1)+'" y="'+tp[1].toFixed(1)+'" fill="#ffffff" font-size="'+fs+'" font-weight="800" text-anchor="middle" dominant-baseline="central" transform="rotate('+mid.toFixed(2)+' '+tp[0].toFixed(1)+' '+tp[1].toFixed(1)+')" style="paint-order:stroke;stroke:rgba(0,0,0,.18);stroke-width:3px;">'+esc(nm)+'</text>';
  }
  var svg='<svg id="rlWheel" viewBox="0 0 600 600" style="width:100%;height:100%;display:block;transition:transform 5.4s cubic-bezier(.12,.62,.07,1);transform:rotate(0deg);filter:drop-shadow(0 10px 26px rgba(15,23,42,.28));">'
    + segHtml + txtHtml
    + '<circle cx="300" cy="300" r="292" fill="none" stroke="#ffffff" stroke-width="6"/>'
    + '</svg>';

  var _old=document.getElementById('leaderRouletteModal'); if(_old) _old.remove();
  var modal=document.createElement('div'); modal.id='leaderRouletteModal';
  modal.setAttribute('style','position:fixed;inset:0;z-index:9700;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,.62);backdrop-filter:blur(4px);padding:18px;overflow:hidden;');
  modal.onclick=function(e){ if(e.target===modal && !ui._wheelSpinning) ui.closeLeaderRoulette(); };
  // [전체화면] 모달이 #pdfWrapper 안에 붙어도 클릭이 PDF 페이지 넘김으로 전파되지 않게 차단
  modal.addEventListener('click', function(e){ e.stopPropagation(); });
  modal.addEventListener('contextmenu', function(e){ e.stopPropagation(); });
  modal.addEventListener('pointerdown', function(e){ e.stopPropagation(); });
  var wheelPx='min(70vh, 80vw)';
  modal.innerHTML =
    '<div style="background:#fff;border-radius:26px;width:auto;max-width:97vw;max-height:98vh;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.45);">'
      + '<style>@keyframes rlPop{0%{transform:scale(.55);opacity:0}60%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}</style>'
      + '<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 24px;background:linear-gradient(135deg,#0f3d68,#2563eb);color:#fff;">'
        + '<div style="font-size:19px;font-weight:900;"><i class="fa-solid fa-trophy" style="margin-right:8px;"></i>학생장 룰렛</div>'
        + '<button onclick="ui.closeLeaderRoulette()" style="background:rgba(255,255,255,.2);border:none;color:#fff;width:36px;height:36px;border-radius:50%;font-size:19px;cursor:pointer;">&times;</button>'
      + '</div>'
      + '<div style="padding:22px 28px 38px;text-align:center;">'
        + '<div style="font-size:13.5px;color:#64748b;font-weight:800;margin-bottom:18px;">입교한 학생 '+N+'명 · 가운데 <b style="color:#0f6cbd;">시작</b>을 누르면 3시 방향 마커에 걸린 학생이 당첨됩니다</div>'
        + '<div style="position:relative;width:'+wheelPx+';height:'+wheelPx+';margin:0 auto 20px;">'
          + svg
          // 3시 방향 마커
          + '<div style="position:absolute;top:50%;right:-14px;transform:translateY(-50%);width:0;height:0;border-top:18px solid transparent;border-bottom:18px solid transparent;border-right:30px solid #dc2626;filter:drop-shadow(-2px 2px 3px rgba(0,0,0,.3));z-index:3;"></div>'
          // 가운데 시작 버튼
          + '<button id="rlStart" onclick="ui._spinWheel()" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:23%;height:23%;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffffff,#dbeafe 70%,#60a5fa);border:5px solid #fff;box-shadow:0 8px 22px rgba(15,76,129,.38);color:#0f3d68;font-weight:900;font-size:clamp(24px,6.5vh,58px);cursor:pointer;z-index:4;letter-spacing:0;">시작</button>'
        + '<div id="rlWinPop" style="position:absolute;inset:0;display:none;align-items:center;justify-content:center;z-index:20;padding:14px;">'
          + '<div style="background:rgba(255,255,255,.98);border:3px solid #3b82f6;border-radius:28px;padding:clamp(18px,4vh,46px) clamp(22px,5vw,66px);box-shadow:0 24px 70px rgba(15,23,42,.42);text-align:center;max-width:96%;animation:rlPop .45s cubic-bezier(.17,.89,.32,1.28);">'
            + '<div style="font-size:clamp(15px,2.3vh,26px);font-weight:900;color:#0f6cbd;letter-spacing:0;margin-bottom:12px;">축하합니다</div>'
            + '<div id="rlWinLine" style="font-size:clamp(28px,7.2vh,104px);line-height:1.15;font-weight:950;color:#0f3d68;letter-spacing:0;white-space:nowrap;"></div>'
            + '<div style="font-size:clamp(15px,2.2vh,26px);font-weight:800;color:#334155;margin:clamp(14px,3vh,30px) 0 14px;">이 학생을 학생장으로 지정할까요?</div>'
            + '<div style="display:flex;flex-direction:column;gap:10px;align-items:center;">'
              + '<button onclick="ui.confirmRouletteLeader()" style="width:100%;max-width:400px;background:linear-gradient(135deg,#0f4c81,#2563eb);color:#fff;border:none;padding:16px 22px;border-radius:15px;font-weight:900;font-size:clamp(16px,2.4vh,24px);cursor:pointer;box-shadow:0 8px 22px rgba(37,99,235,.3);"><i class="fa-solid fa-crown" style="margin-right:8px;"></i>학생장으로 지정</button>'
              + '<div style="display:flex;gap:10px;width:100%;max-width:400px;">'
                + '<button onclick="ui._spinWheel()" style="flex:1;background:#f1f5f9;color:#475569;border:1px solid #e2e8f0;padding:12px;border-radius:12px;font-weight:800;font-size:clamp(13px,1.8vh,18px);cursor:pointer;"><i class="fa-solid fa-rotate-right"></i> 다시 돌리기</button>'
                + '<button onclick="ui.closeLeaderRoulette()" style="flex:1;background:#fff;color:#94a3b8;border:1px solid #e2e8f0;padding:12px;border-radius:12px;font-weight:800;font-size:clamp(13px,1.8vh,18px);cursor:pointer;">닫기</button>'
              + '</div>'
            + '</div>'
          + '</div>'
        + '</div>'
        + '</div>'
        + '<div id="rlResult" style="min-height:30px;"></div>'
      + '</div>'
    + '</div>';
  (document.fullscreenElement || document.webkitFullscreenElement || document.body).appendChild(modal);   // 전체화면(top layer) 위에 보이도록 전체화면 요소에 붙임
  var _fh=document.getElementById('floatingHomeBtn'); if(_fh) _fh.style.display='none';
};
ui._spinWheel = function(){
  if(ui._wheelSpinning) return;
  var students=ui._rouletteStudents||[]; var N=students.length; if(!N) return;
  var wheel=document.getElementById('rlWheel'); var startBtn=document.getElementById('rlStart'); var result=document.getElementById('rlResult');
  if(!wheel) return;
  ui._wheelSpinning=true; ui._rouletteWinner=null;
  if(startBtn){ startBtn.disabled=true; startBtn.style.opacity='.55'; startBtn.style.cursor='default'; startBtn.textContent='…'; }
  var pop=document.getElementById('rlWinPop'); if(pop) pop.style.display='none';
  try{ if(ui._spinAudio){ try{ui._spinAudio.pause();}catch(_){} } ui._spinAudio=new Audio('spin.mp3'); ui._spinAudio.currentTime=0; ui._spinAudio.play().catch(function(){}); }catch(e){}

  var seg=360/N;
  var w=Math.floor(Math.random()*N);
  var mid=w*seg+seg/2;                 // 당첨 조각의 중심각(3시=0도 기준, 시계방향)
  var targetMod=(((-mid)%360)+360)%360; // 이 조각을 3시(0도)에 맞추기 위한 회전량
  var cur=ui._wheelRot||0; var curMod=((cur%360)+360)%360;
  var jitter=(Math.random()-0.5)*seg*0.6; // 조각 안에서 살짝 흔들림
  var delta=((targetMod-curMod)+360)%360 + 360*6 + jitter; // 6바퀴 + 보정
  var R=cur+delta; ui._wheelRot=R;
  // 강제 reflow 후 transform 적용(전환 보장)
  void wheel.getBoundingClientRect();
  wheel.style.transform='rotate('+R.toFixed(2)+'deg)';

  var done=function(){
    wheel.removeEventListener('transitionend', done);
    ui._wheelSpinning=false;
    var win=students[w]; ui._rouletteWinner=win;
    if(startBtn){ startBtn.disabled=false; startBtn.style.opacity='1'; startBtn.style.cursor='pointer'; startBtn.textContent='다시'; }
    var winnerLine=document.getElementById('rlWinLine');
    if(winnerLine){
      winnerLine.innerHTML='<span class="rl-win-name"></span><span style="font-size:.42em;font-weight:800;color:#475569;letter-spacing:0;margin-left:.15em;">님 당첨!</span>';
      var _nmEl=winnerLine.querySelector('.rl-win-name');
      if(_nmEl) _nmEl.textContent=ui._spacedKoreanName(win.name);   // 이름은 크게, '님 당첨!'은 작게
    }
    var pop=document.getElementById('rlWinPop');
    if(pop){ pop.style.display='flex'; var card=pop.firstChild; if(card){ card.style.animation='none'; void card.offsetWidth; card.style.animation='rlPop .45s cubic-bezier(.17,.89,.32,1.28)'; } }
    try{ if(ui._spinAudio){ ui._spinAudio.pause(); } }catch(e){}
    try{ var _wa=new Audio('you.mp3'); _wa.currentTime=0; _wa.play().catch(function(){}); }catch(e){}
  };
  wheel.addEventListener('transitionend', done);
  // 안전장치: 전환 이벤트 누락 시 강제 종료
  setTimeout(function(){ if(ui._wheelSpinning) done(); }, 6200);
};
ui.confirmRouletteLeader = function(){
  var win=ui._rouletteWinner;
  if(!win){ ui.showAlert('먼저 추첨을 완료하세요.'); return; }
  if(state.isObserver){ ui.showAlert('👁️ 옵저버는 권한을 수정할 수 없습니다.'); return; }
  if(!state.room) return;
  var room=state.room;
  firebase.database().ref('courses/'+room+'/students').once('value', function(snap){
    var data=snap.val()||{}; var updates={};
    // 단일 학생장: 기존 학생장 해제 후 당첨자 지정
    Object.keys(data).forEach(function(tk){ if(data[tk] && data[tk].isLeader===true && tk!==win.token){ updates[tk+'/isLeader']=false; updates[tk+'/leaderPhone']=null; } });
    updates[win.token+'/isLeader']=true;
    firebase.database().ref('courses/'+room+'/students').update(updates).then(function(){
      ui.closeLeaderRoulette();   // 룰렛 먼저 닫고 → 알림창이 전체화면(top layer) 위에 확실히 남도록
      ui.showAlert('👑 ['+win.name+'] 교육생이 학생장으로 지정되었습니다.\n모든 플랫폼에 연동됩니다.');
    }).catch(function(){ ui.showAlert('지정 중 오류가 발생했습니다.'); });
  });
};

// ===== 강사 리모컨 고도화: 6개 커스텀 육각 메뉴 + 롱프레스 이동 =====
(function(){
  var POS_KEY = 'kac_instructor_remote_pos_v2';
  var currentRoomMenu = null;   // 과정별 리모컨 메뉴(6개 모드). 방 입장 시 settings/remoteMenu에서 로드
  // 중앙(과정현황)은 고정이므로 ring 선택지에서 dashboard 제외
  var choices = [
    {mode:'guide', label:'입교안내', icon:'fa-file-pdf'},
    {mode:'notice', label:'공지관리', icon:'fa-bullhorn'},
    {mode:'students', label:'수강생현황', icon:'fa-users-viewfinder'},
    {mode:'admin-action', label:'외출외박', icon:'fa-person-walking-arrow-right'},
    {mode:'attendance', label:'OTP출결', icon:'fa-keyboard'},
    {mode:'shuttle', label:'차량수요조사', icon:'fa-bus'},
    {mode:'dormitory', label:'생활관배치', icon:'fa-bed'},
    {mode:'dinner-skip', label:'석식제외', icon:'fa-utensils'},
    {mode:'qa', label:'Q&A', icon:'fa-comments'},
    {mode:'quiz', label:'퀴즈모드', icon:'fa-clipboard-question'}
  ];
  var defaults = ['qa','guide','notice','students','admin-action','attendance'];   // 중앙=과정현황 고정, 상단 슬롯 기본 Q&A

  function selected(){
    try {
      if(Array.isArray(currentRoomMenu)){
        var valid = currentRoomMenu.filter(function(key){
          return choices.some(function(item){ return item.mode === key; });
        });
        if(valid.length === 6) return valid.slice(0, 6);
      }
    } catch(e){}
    return defaults.slice();
  }

  function esc(value){
    return String(value || '').replace(/[&<>"]/g, function(char){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char];
    });
  }

  function render(){
    var host = document.getElementById('courseSmartRemote');
    if(!host) return;
    var picked = selected();
    host.classList.add('hex-remote-v2');
    // 첫 렌더 시 '접힘'(중앙 과정현황만) 상태로 시작. 이후 렌더는 현재 상태 유지.
    if(host.dataset.hexInit !== '1'){ host.classList.add('hex-collapsed'); host.dataset.hexInit = '1'; }
    host.innerHTML =
      '<div class="hex-drag-handle" title="길게 눌러 위치 이동"><i class="fa-solid fa-grip-lines"></i><span>길게 눌러 이동</span></div>'+
      '<button class="hex-gear" type="button" title="리모컨 메뉴 설정"><i class="fa-solid fa-gear"></i></button>'+
      '<div class="hex-ring">'+picked.map(function(mode, index){
        var item = choices.find(function(choice){ return choice.mode === mode; }) || choices[0];
        var hot = '';   // 시안성 강조: 입교안내=빨강, 수강생현황=하늘색, 외출외박=연두색
        if (item.mode === 'guide') hot = ' hex-key-hot';
        else if (item.mode === 'students') hot = ' hex-key-sky';
        else if (item.mode === 'admin-action') hot = ' hex-key-mint';
        return '<button class="hex-key hex-pos-'+index+hot+'" type="button" data-mode="'+esc(item.mode)+'" title="'+esc(item.label)+'"><i class="fa-solid '+esc(item.icon)+'"></i><span>'+esc(item.label)+'</span></button>';
      }).join('')+
      '<button class="hex-center" type="button" title="탭: 펼침/접힘 · 접힌 뒤 한번 더: 과정현황 · 길게: 위치 이동"><i class="fa-solid fa-gauge-high"></i><span>과정현황</span></button></div>';

    host.querySelectorAll('.hex-key').forEach(function(button){
      button.addEventListener('click', function(){
        var m = button.dataset.mode;
        ui.setMode(m);
        // OTP출결은 출결관리(공식 E-HRD QR)가 아닌 'OTP 자체출결' 탭으로 바로 전환
        if (m === 'attendance') {
          setTimeout(function(){ try { ui.toggleAttendanceMode('internal'); } catch(e){} }, 80);
        }
        _remotePendingNav = false;
        scheduleAutoCollapse(host);   // 메뉴 확인 후 약 4초 뒤 자동 축소
      });
    });
    // 중앙 과정현황: 짧게=펼침+과정현황 이동 / 길게=위치 이동(드래그) — bindDrag()에서 처리
    // 설정은 '길게 눌러 이동' 옆 기어 아이콘으로
    var gear = host.querySelector('.hex-gear');
    if(gear){
      gear.addEventListener('pointerdown', function(e){ e.stopPropagation(); });
      gear.addEventListener('click', function(e){ e.stopPropagation(); openSettings(); });
    }
    bindDrag(host);
    restorePos(host);
  }

  function openSettings(){
    var old = document.getElementById('hexRemoteSettings');
    if(old) old.remove();
    var picked = selected();
    var overlay = document.createElement('div');
    overlay.id = 'hexRemoteSettings';
    overlay.className = 'hex-settings-overlay';
    overlay.innerHTML =
      '<div class="hex-settings-card"><div class="hex-settings-head"><div><b>육각 리모컨 메뉴 설정</b><small>자주 쓰는 메뉴를 정확히 6개 선택하세요.</small></div><button type="button" data-close>&times;</button></div>'+
      '<div class="hex-settings-list">'+choices.map(function(item){
        return '<label><input type="checkbox" value="'+esc(item.mode)+'" '+(picked.indexOf(item.mode)>=0?'checked':'')+'><i class="fa-solid '+esc(item.icon)+'"></i><span>'+esc(item.label)+'</span></label>';
      }).join('')+'</div><div class="hex-settings-foot"><span id="hexSelectedCount">6 / 6</span><button type="button" data-save>적용</button></div></div>';
    document.body.appendChild(overlay);

    function sync(){
      var checks = Array.from(overlay.querySelectorAll('input:checked'));
      overlay.querySelector('#hexSelectedCount').textContent = checks.length+' / 6';
      overlay.querySelector('[data-save]').disabled = checks.length !== 6;
    }
    overlay.querySelectorAll('input').forEach(function(input){
      input.addEventListener('change', function(){
        if(overlay.querySelectorAll('input:checked').length > 6){
          input.checked = false;
          if(ui.showAlert) ui.showAlert('리모컨 메뉴는 6개까지 선택할 수 있습니다.');
        }
        sync();
      });
    });
    overlay.querySelector('[data-close]').onclick = function(){ overlay.remove(); };
    overlay.onclick = function(event){ if(event.target === overlay) overlay.remove(); };
    overlay.querySelector('[data-save]').onclick = function(){
      var values = Array.from(overlay.querySelectorAll('input:checked')).map(function(input){ return input.value; });
      if(values.length !== 6) return;
      currentRoomMenu = values;
      if(typeof state !== 'undefined' && state.room){
        firebase.database().ref('courses/'+state.room+'/settings/remoteMenu').set(values).catch(function(){});   // 과정별 저장
      }
      overlay.remove();
      render();
    };
    sync();
  }

  function restorePos(host){
    try{
      var position = JSON.parse(localStorage.getItem(POS_KEY) || 'null');
      if(!position) return;
      host.style.left = Math.max(8, Math.min(window.innerWidth-host.offsetWidth-8, position.x))+'px';
      host.style.top = Math.max(8, Math.min(window.innerHeight-90, position.y))+'px';
      host.style.right = 'auto';
      host.style.transform = 'none';
    }catch(e){}
  }

  // 드래그 상태를 IIFE 스코프에 유지 → 재렌더 때 window 리스너 중복 방지
  var _drag = {host:null, center:null, timer:null, dragging:false, moved:false, pressEl:null, startX:0, startY:0, originX:0, originY:0};
  var _dragWinBound = false;

  function _dragDown(event){
    if(event && event.pointerType==='mouse' && event.button!==0) return;
    var host = _drag.host; if(!host) return;
    _drag.pressEl = event.currentTarget;
    var rect = host.getBoundingClientRect();
    _drag.startX = event.clientX; _drag.startY = event.clientY;
    _drag.originX = rect.left; _drag.originY = rect.top;
    _drag.moved = false; _drag.dragging = false;
    clearTimeout(_drag.timer);
    _drag.timer = setTimeout(function(){
      _drag.dragging = true;
      host.classList.add('is-dragging');
      if(navigator.vibrate) navigator.vibrate(35);
    }, 520);
  }
  function _dragMove(event){
    if(!_drag.timer && !_drag.dragging) return;
    if(!_drag.dragging){
      if(Math.hypot(event.clientX-_drag.startX, event.clientY-_drag.startY) > 9){ clearTimeout(_drag.timer); _drag.timer = null; }
      return;
    }
    var host = _drag.host; if(!host) return;
    event.preventDefault();
    var x = Math.max(8, Math.min(window.innerWidth-host.offsetWidth-8, _drag.originX+event.clientX-_drag.startX));
    var y = Math.max(8, Math.min(window.innerHeight-90, _drag.originY+event.clientY-_drag.startY));
    host.style.left = x+'px'; host.style.top = y+'px'; host.style.right = 'auto'; host.style.transform = 'none';
  }
  function _dragUp(){
    var host = _drag.host;
    var wasDragging = _drag.dragging;
    if(_drag.timer){ clearTimeout(_drag.timer); _drag.timer = null; }
    if(host && wasDragging){
      var rect = host.getBoundingClientRect();
      localStorage.setItem(POS_KEY, JSON.stringify({x:rect.left, y:rect.top}));
    } else if(host && _drag.pressEl === _drag.center){
      handleCenterTap(host);   // 접힘→펼침 / 펼침→축소 / 축소(대기)→과정현황 이동
    }
    _drag.dragging = false; _drag.pressEl = null;
    if(host) host.classList.remove('is-dragging');
  }

  // 접힘/펼침: 박스 크기는 그대로라 위치 보정이 필요 없음 (중앙 원은 항상 박스 중심에 고정)
  function setCollapsed(host, collapse){
    if(!host) return;
    if(collapse) host.classList.add('hex-collapsed');
    else host.classList.remove('hex-collapsed');
  }

  // 중앙 과정현황 탭 동작:
  //  · 접힘 상태 → 펼침
  //  · 펼침 상태 → 축소만(페이지 이동 X) + 다음 탭은 과정현황 페이지로 대기
  //  · 축소 상태(대기중) → 과정현황 페이지로 이동
  var _remotePendingNav = false;
  var _autoCollapseTimer = null;
  function scheduleAutoCollapse(host){
    clearTimeout(_autoCollapseTimer);
    _autoCollapseTimer = setTimeout(function(){ setCollapsed(host, true); _remotePendingNav = false; }, 4000);
  }
  function handleCenterTap(host){
    if(!host) return;
    clearTimeout(_autoCollapseTimer);
    var collapsed = host.classList.contains('hex-collapsed');
    if(!collapsed){
      setCollapsed(host, true);      // 펼쳐진 상태 → 축소만
      _remotePendingNav = true;      // 다음 탭은 과정현황 페이지로
    } else if(_remotePendingNav){
      _remotePendingNav = false;
      try{ ui.setMode('dashboard'); }catch(e){}   // 축소 상태에서 한번 더 → 과정현황 페이지
    } else {
      setCollapsed(host, false);     // 평상시 축소 → 펼침
      scheduleAutoCollapse(host);    // 펼친 뒤 4초 무동작이면 자동 축소
    }
  }

  function bindDrag(host){
    var handle = host.querySelector('.hex-drag-handle');
    var center = host.querySelector('.hex-center');
    _drag.host = host; _drag.center = center;
    // 리모컨 위에 마우스가 있으면 자동축소 잠시 멈춤 → 벗어나면 다시 4초 카운트
    if(!host._hoverBound){
      host.addEventListener('pointerenter', function(){ clearTimeout(_autoCollapseTimer); });
      host.addEventListener('pointerleave', function(){ if(!host.classList.contains('hex-collapsed')) scheduleAutoCollapse(host); });
      host._hoverBound = true;
    }
    if(handle){ handle.style.touchAction='none'; handle.addEventListener('pointerdown', _dragDown); }
    if(center){ center.style.touchAction='none'; center.addEventListener('pointerdown', _dragDown); }
    if(!_dragWinBound){
      window.addEventListener('pointermove', _dragMove, {passive:false});
      window.addEventListener('pointerup', _dragUp);
      window.addEventListener('pointercancel', _dragUp);
      _dragWinBound = true;
    }
  }

  function cleanQrAndGroupSettings(){
    var qr = document.getElementById('qrcode');
    if(qr){
      var settingGroup = qr.closest('.setting-group');
      if(settingGroup) settingGroup.remove();
    }
    ['floatingQR','qrModal','studentManualModal'].forEach(function(id){
      var node = document.getElementById(id);
      if(node) node.remove();
    });
    document.querySelectorAll('[onclick*="toggleMiniQR"]').forEach(function(node){ node.remove(); });

    var box = document.querySelector('.sidebar-bottom .action-buttons');
    if(box && !document.getElementById('sidebarSettingsFold')){
      var observer = document.getElementById('observerToggleButton');
      var fold = document.createElement('details');
      fold.id = 'sidebarSettingsFold';
      fold.className = 'sidebar-settings-fold';
      fold.innerHTML = '<summary><i class="fa-solid fa-gear"></i><span>Settings</span><i class="fa-solid fa-chevron-down"></i></summary><div class="sidebar-settings-actions"></div>';
      var inner = fold.querySelector('.sidebar-settings-actions');
      Array.from(box.children).forEach(function(button){
        if(button !== observer) inner.appendChild(button);
      });
      if(observer) box.insertBefore(observer, box.firstChild);
      box.appendChild(fold);
    }
  }

  // [과정별 리모컨] 방 settings 변경 시 호출 → 해당 과정의 메뉴 적용 후 재렌더
  ui.renderRemote = render;
  ui.applyRemoteMenu = function(settings){
    var rm = (settings && Array.isArray(settings.remoteMenu) && settings.remoteMenu.length === 6) ? settings.remoteMenu : null;
    currentRoomMenu = rm;
    render();
  };

  function boot(){
    cleanQrAndGroupSettings();
    render();
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else setTimeout(boot, 0);
})();


// ===== [우측 더보기 사이드바] 슬라이드 패널 토글 (HTML 버튼에서 호출하나 정의가 없었음) =====
ui._fitMorePanelToViewport = function(){
  var p=document.getElementById('moreMenuPanel');
  if(!p) return;
  var zoom=parseFloat(getComputedStyle(document.documentElement).zoom)||1;
  p.style.setProperty('width',(240/zoom)+'px','important');          // 콘텐츠에 맞춘 폭 (글자가 짧아 슬림하게)
  p.style.setProperty('top','0','important');                         // 전체 높이 (좌측과 통일)
  p.style.setProperty('right','0','important');                       // 우측 끝 밀착
  p.style.setProperty('height',(window.innerHeight/zoom)+'px','important');
  p.style.setProperty('min-height','0','important');
  p.style.setProperty('border-radius','20px 0 0 20px','important');    // 안쪽(좌측) 모서리만 20px 라운드 — 좌측 사이드바(0 20px 20px 0)의 거울 대칭
};
ui.openMorePanel = function(){
  var p=document.getElementById('moreMenuPanel'), t=document.getElementById('moreToggleTab'), b=document.getElementById('moreMenuBackdrop'), ic=document.getElementById('moreToggleIcon');
  if(!p) return;
  ui._fitMorePanelToViewport();
  p.classList.add('more-open'); p.style.transform='translateX(0)';
  if(b) b.style.display='block';
  if(t) t.style.right=((p.offsetWidth||300))+'px';
  if(ic) ic.className='fa-solid fa-chevron-right';
};
ui.closeMorePanel = function(){
  var p=document.getElementById('moreMenuPanel'), t=document.getElementById('moreToggleTab'), b=document.getElementById('moreMenuBackdrop'), ic=document.getElementById('moreToggleIcon');
  if(p){ p.classList.remove('more-open'); p.style.transform='translateX(calc(100% + 24px))'; }
  if(b) b.style.display='none';
  if(t) t.style.right='0';
  if(ic) ic.className='fa-solid fa-chevron-left';
};
ui.toggleMorePanel = function(){
  var p=document.getElementById('moreMenuPanel');
  if(!p) return;
  if(p.classList.contains('more-open')) ui.closeMorePanel(); else ui.openMorePanel();
};
window.addEventListener('resize', function(){
  var p=document.getElementById('moreMenuPanel');
  if(p && p.classList.contains('more-open')) ui._fitMorePanelToViewport();
});


// [J8] ZOOM 진입 요소(버튼·메뉴) 표시 제어 — CSS !important 규칙으로 원천 차단.
//  body에 zoom-room-online 클래스가 없으면(=오프라인) openZoomMonitor를 여는 모든 요소가
//  어떤 코드가 표시를 시도해도 CSS 차원에서 강제 숨김. 배지 감시 + 리스너 + 2초 하트비트가 클래스를 갱신.
(function(){
  function injectCss(){
    if(document.getElementById('zmVisGuardStyle'))return;
    var st=document.createElement('style');
    st.id='zmVisGuardStyle';
    st.textContent='body:not(.zoom-room-online) [onclick*="openZoomMonitor"]{display:none !important;}';
    document.head.appendChild(st);
  }
  function applyZoomVis(){
    try{
      var el=document.getElementById('dashRoomDetail');
      var on=!!(el && /온라인|zoom/i.test(String(el.innerText||'')));
      window._zoomRoomOnline = on;
      document.body.classList.toggle('zoom-room-online', on);
      if(on){ // 온라인일 때는 초기 inline display:none을 해제해 실제로 보이게
        document.querySelectorAll('[onclick*="openZoomMonitor"]').forEach(function(t){ t.style.display=''; });
      }
    }catch(e){}
  }
  function install(){
    injectCss();
    var el=document.getElementById('dashRoomDetail');
    if(el && !el._zmObs){
      el._zmObs=true;
      try{ new MutationObserver(applyZoomVis).observe(el,{childList:true,characterData:true,subtree:true}); }catch(e){}
    }
    if(!window._zmHeartbeat){ window._zmHeartbeat=setInterval(applyZoomVis, 2000); }
    applyZoomVis();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install);
  else install();
})();
