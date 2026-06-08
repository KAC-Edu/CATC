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
saveInstructorNoticeMain: function() {
        // [옵저버 제한]
        if(state.isObserver) return ui.showAlert("👁️ 옵저버 모드에서는 공지사항을 수정할 수 없습니다.");
        
        if(!state.room) return;
        const msg = document.getElementById('instNoticeInputMain').value;
        firebase.database().ref(`courses/${state.room}/notice`).set(msg).then(() => {
            ui.showAlert("✅ 강사 공지사항이 교육생에게 게시되었습니다.");
        });
    },

    // ── 강의 안내 보드 저장/불러오기 ──
    saveBoardNotice: function() {
        if(state.isObserver) return ui.showAlert("👁️ 옵저버 모드에서는 수정할 수 없습니다.");
        if(!state.room) return ui.showAlert("강의실을 먼저 선택해 주세요.");
        const editor = document.getElementById('boardEditor');
        if(!editor) return;
        const html = editor.innerHTML;
        firebase.database().ref(`courses/${state.room}/boardNotice`).set(html).then(() => {
            const now = new Date();
            const ts = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
            const el = document.getElementById('boardLastSaved');
            if(el) el.textContent = `오늘 ${ts}`;
            ui.showAlert("✅ 강의 안내 보드가 저장되었습니다.");
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
            // [버그수정] 값이 없으면 반드시 비운다 — 이전 방 공지가 새 방에 남아 보이던 문제 해결
            editor.innerHTML = val || "";
            const el = document.getElementById('boardLastSaved');
            if(el) el.textContent = val ? '저장된 내용 불러옴' : '';
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
    const hasOwner = !!st.ownerSessionId;
    // 차단 조건: 방이 활성 상태이고, (실제 주인이 있거나 OR 비밀번호가 설정됨) AND 내가 주인/옵저버 아님
    const blocked = isActive && (hasOwner || roomHasPassword) && !isOwner && !state.isObserver;

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
            setupBtn.innerHTML = '<i class="fa-solid fa-gears"></i> 교육과정 환경 설정 (통합)';
        }
    }

    // 4. [분기 처리] 권한 여부에 따른 입장 통제
    
    // (A) 방이 사용 중이고 '실제 소유자'가 있는데 내가 주인이 아니고 옵저버도 아님 -> 차단
    if (blocked) {
        console.log(`[권한 차단] Room ${newRoom}에 대한 소유권이 없습니다.`);

        // 새로고침 복구 시(silent)에는 비밀번호창 없이 현황판으로 복귀
        if (silent) {
            localStorage.removeItem('kac_last_room');
            ui.showWaitingRoom();
            const sel = document.getElementById('roomSelect');
            if(sel) sel.value = '';
            return;
        }

        state.pendingRoom = newRoom;

        // [변경] 비밀번호창을 바로 띄우지 않고, 먼저 '입장 방식'을 선택하게 한다.
        //  강사 권한 가져오기 → 비밀번호창 / 옵저버 → 모니터링 입장 / 취소
        const lbl1 = document.getElementById('roleChoiceRoomLabel');
        if (lbl1) lbl1.innerText = `Room #${newRoom}`;
        document.getElementById('roleChoiceModal').style.display = 'flex';
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
    console.log(`[인증 성공] Room ${newRoom} 데이터 로드를 시작합니다.`);
    this.forceEnterRoom(newRoom);
    
    // [참고] forceEnterRoom 내부 리스너에서 소유권이 최종 확인되면 
    // 그 때 overlay를 none으로 바꿔 화면을 보여주게 됩니다.
},










    
     // [수정] 인증 성공 시에만 세션 ID를 서버에 등록하여 '정식 주인'으로 인정
verifyTakeover: async function() {
        const newRoom = state.pendingRoom;
        let input = document.getElementById('takeoverPwInput').value;
        if(input) input = input.trim(); 
        if (!newRoom || !input) return;

        const settingSnap = await firebase.database().ref(`courses/${newRoom}/settings`).get();
        const settings = settingSnap.val() || {};
        const dbPw = settings.password || btoa("7777"); 

        if (btoa(input) === dbPw) {
            // [수정] 강사 입장 시 해당 방의 옵저버 기록만 정밀 삭제
            state.isObserver = false; 
            sessionStorage.removeItem('kac_observer_room');

            await firebase.database().ref(`courses/${newRoom}/status`).update({ 
                ownerSessionId: state.sessionId,
                roomStatus: 'active'
            });
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
            // 1. 현재 옵저버인데 클릭했다면? -> 강사 모드로 전환 (비밀번호 창 띄우기)
            state.pendingRoom = state.room;
            document.getElementById('takeoverPwInput').value = "";
            const lbl3 = document.getElementById('takeoverRoomLabel');
            if(lbl3) lbl3.innerText = `Room #${state.room}`;
            document.getElementById('takeoverModal').style.display = 'flex';
            document.getElementById('takeoverPwInput').focus();
        } else {
            // 2. 현재 강사인데 클릭했다면? -> 옵저버 모드로 전환
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




    // [입장 방식 선택] 강사 권한 가져오기 → 비밀번호 입력창으로
    chooseTakeover: function() {
        document.getElementById('roleChoiceModal').style.display = 'none';
        state.entryIntent = 'teacher';
        const newRoom = state.pendingRoom;
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
        document.getElementById('takeoverModal').style.display = 'flex';
        setTimeout(() => document.getElementById('takeoverPwInput').focus(), 50);
    },

    // [입장 방식 선택] 옵저버 → 비밀번호 입력창으로(옵저버 의도 유지)
    chooseObserver: function() {
        document.getElementById('roleChoiceModal').style.display = 'none';
        state.entryIntent = 'observer';
        const newRoom = state.pendingRoom;
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

        // [추가] 옵저버 모드도 비밀번호 인증 요구 (단순 모니터링이라도 해당 강의실 비번 필요)
        let input = document.getElementById('takeoverPwInput').value;
        if (input) input = input.trim();
        if (!input) {
            ui.showAlert("👁️ 옵저버 모드 입장에도 해당 강의실 비밀번호가 필요합니다.\n비밀번호를 입력해주세요.");
            document.getElementById('takeoverPwInput').focus();
            return;
        }

        const settingSnap = await firebase.database().ref(`courses/${newRoom}/settings`).get();
        const settings = settingSnap.val() || {};
        const dbPw = settings.password || btoa("7777");

        if (btoa(input) !== dbPw) {
            ui.showAlert("⛔ 비밀번호가 올바르지 않습니다.");
            document.getElementById('takeoverPwInput').value = "";
            document.getElementById('takeoverPwInput').focus();
            return;
        }

        // 인증 성공 → 옵저버로 입장 (제어권은 가져오지 않음)
        state.isObserver = true; 
        sessionStorage.setItem('kac_observer_room', newRoom);
        
        document.getElementById('takeoverModal').style.display = 'none';
        this.forceEnterRoom(newRoom);
        ui.showAlert(`👁️ Room ${newRoom} 옵저버 모드로 입장했습니다.`);
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

    state.room = cleanRoom; 
    state.qaData = {};      
    state.activeQaKey = null; 
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
        ui.renderSettings(s.val() || {}); 
    });

    dbRef.status.on('value', s => {
        if (state.room !== cleanRoom) return;
        const statusData = s.val() || {};
        ui.renderRoomStatus(statusData.roomStatus || 'idle'); 

        const isOwner = (statusData.ownerSessionId === state.sessionId);
        const isActive = (statusData.roomStatus === 'active');

        // [세션 핸드오버] 내가 직전까지 이 방의 강사(소유자)였는데, 다른 기기가 제어권을 가져가
        //  ownerSessionId 가 '다른 값'으로 바뀐 순간을 감지 → 자동으로 옵저버 모드로 전환 + 알림.
        if (!state.isObserver
            && state._ownedSessionRoom === cleanRoom        // 직전 스냅샷에서 내가 소유자였음
            && isActive
            && statusData.ownerSessionId                    // 누군가가 소유 중(빈값/리셋 아님)
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
        if (isOwner) state._ownedSessionRoom = cleanRoom;

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
                firebase.database().ref(`courses/${cleanRoom}/status`).update({ ownerSessionId: state.sessionId });
                dataMgr.addOwnedRoom(cleanRoom);
                overlay.style.display = 'none';
                const tm = document.getElementById('takeoverModal');
                if (tm) tm.style.display = 'none';

            } else if (isActive && !isOwner && !statusData.ownerSessionId) {
                // ④-a 자동배치 등으로 주인이 아직 없는 방 → 입장하는 강사가 소유권 획득
                firebase.database().ref(`courses/${cleanRoom}/status`).update({ ownerSessionId: state.sessionId });
                dataMgr.addOwnedRoom(cleanRoom);
                overlay.style.display = 'none';
                const tm = document.getElementById('takeoverModal');
                if (tm) tm.style.display = 'none';

            } else if (isActive && !isOwner) {
                // ④-b 실제 다른 강사가 소유 중인 방 → 입장 방식 선택(강사/옵저버) 먼저
                overlay.style.display = 'flex';
                if (overlayMsg) overlayMsg.innerHTML = '현재 다른 기기에서 강의가 진행 중입니다.<br><br>입장 방식을 선택하세요.';
                state.pendingRoom = cleanRoom;
                const rcl = document.getElementById('roleChoiceRoomLabel');
                if (rcl) rcl.innerText = `Room #${cleanRoom}`;
                document.getElementById('roleChoiceModal').style.display = 'flex';
            }
        } else {
            // 옵저버 모드
            overlay.style.display = 'none';
        }

        // 설정 버튼 상태 제어
        const setupBtn = document.getElementById('btnSetupModal');
        if (setupBtn) {
            if (isActive && !isOwner && !state.isObserver && statusData.ownerSessionId) {
                setupBtn.style.setProperty('background', '#64748b', 'important');
                setupBtn.style.setProperty('opacity', '0.6', 'important');
                setupBtn.innerHTML = '<i class="fa-solid fa-lock"></i> 과정 잠김 (인증 필요)';
                setupBtn.style.pointerEvents = 'none';
                setupBtn.disabled = true;
            } else {
                setupBtn.style.setProperty('background', 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', 'important');
                setupBtn.style.setProperty('opacity', '1', 'important');
                setupBtn.innerHTML = '<i class="fa-solid fa-gears"></i> 교육과정 환경 설정 (통합)';
                setupBtn.style.pointerEvents = 'auto';
                setupBtn.disabled = false;
            }
        }
    });

    this.fetchCodeAndRenderQr(cleanRoom);

    // 퀴즈 mode 자동복구는 강사가 직접 퀴즈 탭에서 나갈 때만 처리 (forceEnterRoom에서 제거)

    const lastMode = localStorage.getItem('kac_last_mode') || 'dashboard';
    ui.setMode(lastMode); 
    subjectMgr.init();
    guideMgr.init();

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
            // 대시보드 피드 즉시 업데이트 (항상)
            const el = document.getElementById('dashNoticeAdmin');
            if (el) el.innerText = newMsg || '등록된 운영부 공지가 없습니다.';
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

    firebase.database().ref('system/globalNotice').off();
    firebase.database().ref('system/globalNotice').on('value', snap => {
        if (state.room !== cleanRoom) return;
        const newMsg = snap.val() || '';
        // 대시보드 피드 즉시 업데이트 (항상)
        const el = document.getElementById('dashNoticeGlobal');
        if (el) el.innerText = newMsg || '현재 게시된 센터 전체 공지가 없습니다.';
        // 팝업 처리
        if (!newMsg) return;
        const prev = state.noticeSeen['global'];
        state.noticeSeen['global'] = newMsg;
        if (prev === undefined) return;
        if (newMsg !== prev && state.currentMode !== 'notice') {
            guideMgr.showCoordNoticeAlert(newMsg, '🏢 항기원 전체 공지');
        }
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
        const encryptedPw = rawPw ? btoa(rawPw) : btoa("7777");

        // 설정을 저장하면서 내 세션ID를 다시 한 번 서버에 등록
        const updates = {};
        updates[`courses/${state.room}/settings/courseName`] = newName;
        updates[`courses/${state.room}/settings/password`] = encryptedPw;
        updates[`courses/${state.room}/status/roomStatus`] = statusVal;
        updates[`courses/${state.room}/status/professorName`] = (statusVal === 'active' ? selectedProf : "");
        // 사용중으로 저장할 때만 세션ID 등록
        updates[`courses/${state.room}/status/ownerSessionId`] = (statusVal === 'active' ? state.sessionId : null);

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
        const dbPw = settings.password || btoa("7777"); // 기본값 7777 (기존 비밀번호 정책과 동일)

        const input = await showPasswordPrompt(`🔐 Room ${room}의 잠금 상태를 변경하려면
강의실 비밀번호(4자리)를 입력하세요.`);
        if (input === null) return;                       // 취소 시 아무 동작 안 함
        if (btoa(input.trim()) !== dbPw) {
            return ui.showAlert("❌ 비밀번호가 일치하지 않습니다.");
        }

        const nextLocked = !currentLocked;
        await firebase.database().ref(`courses/${room}/settings/autoAssignLocked`).set(nextLocked || null);
        ui.showAlert(nextLocked
            ? `🔒 Room ${room} 잠금 설정\n연간계획 자동배치 시 이 방은 건드리지 않습니다.`
            : `🔓 Room ${room} 잠금 해제\n연간계획 자동배치 시 이 방도 배치 대상이 됩니다.`
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
        _dismissPromise = firebase.database().ref(`${rPath}/settings`).once('value').then(s => {
            const st = s.val() || {};
            const nm = (st.courseName || '').trim();
            const pd = (st.period || '').trim();
            if (!nm) return;
            // 대상 주 키 계산 (annualPlanMgr와 동일 기준)
            let weekKey = '';
            try { weekKey = annualPlanMgr._getTargetMonday(annualPlanMgr._today()); } catch(e) {}
            const key = `${nm}|${pd}`.replace(/[.#$/\[\]]/g, '_');
            const upd = {};
            upd[`system/dismissedCourses/${weekKey}/${key}`] = { name: nm, period: pd, at: Date.now() };
            return firebase.database().ref().update(upd);
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
        [`${rPath}/activeQuiz`]:          null,
        [`${rPath}/quizFinalResults`]:    null,
        [`${rPath}/quizBank`]:            null,
        [`${rPath}/attendanceQR`]:        null
    };

    firebase.database().ref().update(resetUpdates).then(() => {
        return _dismissPromise;
    }).then(() => {
        ui.showAlert(`✅ Room ${state.room}이 성공적으로 초기화되었습니다.`);
        setTimeout(() => location.reload(), 800);
    }).catch(err => {
        ui.showAlert("초기화 실패: " + err.message);
    });
},

// [추가] 공지사항 관리창 열기
    openNoticeManage: async function() {
        if(!state.room) return ui.showAlert("강의실을 선택하세요.");
        const snap = await firebase.database().ref(`courses/${state.room}/notice`).once('value');
        document.getElementById('instNoticeInput').value = snap.val() || ""; 
        document.getElementById('noticeManageModal').style.display = 'flex';
    },

    // [추가] 강사 공지사항 저장
    saveInstructorNotice: function() {
        const msg = document.getElementById('instNoticeInput').value;
        firebase.database().ref(`courses/${state.room}/notice`).set(msg).then(() => {
            ui.showAlert("✅ 공지사항이 게시되었습니다.");
            document.getElementById('noticeManageModal').style.display = 'none';
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
                // 학생장으로 지정할 때: 전체 전화번호 입력
                const phone = prompt(`[${currentName}] 교육생을 학생장으로 지정합니다.\n비상 연락망(전체 번호)을 입력해주세요.`, "010-0000-0000");
                if(!phone) return;
                
                firebase.database().ref(`courses/${state.room}/students/${token}`).update({
                    isLeader: true,
                    phone: phone // 전체 번호 서버 저장
                });
                ui.showAlert(`👑 [${currentName}] 교육생이 학생장으로 지정되었습니다.`);
            } else {
                // 이미 학생장인 경우 클릭하면 해제
                if(confirm(`[${currentName}] 교육생의 학생장 권한을 해제하시겠습니까?`)) {
                    firebase.database().ref(`courses/${state.room}/students/${token}`).update({ isLeader: false });
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

                    firebase.database().ref(`${rPath}/expectedStudents`).once('value', expSnap => {
                        const expected = expSnap.val();
                        const normName = v => String(v || '').trim();
                        const normPhone = v => String(v || '').replace(/\D/g, '');
                        const samePhone = (a, b) => {
                            const aa = normPhone(a), bb = normPhone(b);
                            if (!aa || !bb) return true;
                            return aa === bb || aa.slice(-4) === bb || aa.slice(-5) === bb || bb.slice(-4) === aa || bb.slice(-5) === aa;
                        };
                        const removeIfMatch = (key, item) => {
                            const itemName = typeof item === 'string' ? item : (item?.name || '');
                            const itemPhone = typeof item === 'string' ? '' : (item?.phone || item?.empNo || '');
                            if (normName(itemName) === normName(targetName) && samePhone(itemPhone, targetPhone)) {
                                updates[`${rPath}/expectedStudents/${key}`] = null;
                            }
                        };
                        if (Array.isArray(expected)) {
                            expected.forEach((item, idx) => removeIfMatch(idx, item));
                        } else if (expected && typeof expected === 'object') {
                            Object.keys(expected).forEach(key => removeIfMatch(key, expected[key]));
                        }

                        // [C] 서버에 최종 명령 전송
                        firebase.database().ref().update(updates).then(() => {
                            ui.showAlert(`✅ [${targetName}]님의 모든 데이터가 정상적으로 삭제되었습니다.`);
                        }).catch(e => {
                            ui.showAlert("삭제 실패: " + e.message);
                        });
                    });
                });
            }
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

    // [7.0차 신규] 등록된 예정 명단 초기화
    clearExpectedList: function() {
        if(confirm("등록된 예정 명단을 삭제하시겠습니까?\n(실제 입실한 학생 기록은 지워지지 않습니다.)")) {
            firebase.database().ref(`courses/${state.room}/expectedStudents`).set(null)
                .then(() => {
                    ui.showAlert("✅ 예정 명단이 초기화되었습니다.");
                });
        }
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
                <span>${p.name}</span> 
                <div style="display:flex; gap:5px;">
                    <button onclick="profMgr.openProfileEditor('${p.name}')" style="background:#3b82f6;">프로필</button>
                    <button onclick="profMgr.deleteProf('${p.key}')">삭제</button>
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
        document.getElementById('pp-eng-name').value = ""; // 초기화
        document.getElementById('pp-phone').value = "";
        document.getElementById('pp-email').value = "";
        document.getElementById('pp-msg').value = "";
        document.getElementById('pp-bio').value = "";
        const previewImg = document.getElementById('pp-photo-preview').querySelector('img');
        if(previewImg) previewImg.style.display = 'none';

        firebase.database().ref(`system/professorProfiles/${name}`).once('value', snap => {
            const p = snap.val();
            const kakaoEl = document.getElementById('pp-kakao');
            if(p) {
                document.getElementById('pp-eng-name').value = p.engName || ""; // 영문 성함 로드
                document.getElementById('pp-phone').value = p.phone || "";
                document.getElementById('pp-email').value = p.email || "";
                if (kakaoEl) kakaoEl.value = p.kakaoLink || "";
                document.getElementById('pp-msg').value = p.msg || "";
                document.getElementById('pp-bio').value = p.bio || "";
                if(p.photo && previewImg) {
                    previewImg.src = p.photo;
                    previewImg.style.display = 'block';
                }
            } else if (kakaoEl) {
                kakaoEl.value = "";
            }
        });
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
                engName: document.getElementById('pp-eng-name').value, // 영문 성함 추가
                phone: document.getElementById('pp-phone').value,
                email: document.getElementById('pp-email').value,
                kakaoLink: (document.getElementById('pp-kakao')?.value || '').trim(),
                msg: document.getElementById('pp-msg').value,
                bio: document.getElementById('pp-bio').value
            };
            firebase.database().ref(`system/professorProfiles/${name}`).set(profileData).then(() => {
                ui.showAlert("✅ 담임 교수 프로필이 성공적으로 저장되었습니다.");
                ui.closeProfProfileModal();
            });
        };

        if (fileInput.files.length > 0) {
            this.resizeImage(fileInput.files[0], (optimizedData) => doSave(optimizedData));
        } else {
            firebase.database().ref(`system/professorProfiles/${name}/photo`).once('value', s => doSave(s.val()));
        }
    } // <--- 함수의 끝
}; // <--- 중요!! profMgr라는 큰 바구니를 여기서 완전히 닫습니다. (콤마 없음)



















// [최종 최적화] 직급순 정렬 및 실시간 UI 동기화 과정 운영 담당자 관리 객체
const coordMgr = {
    list: [],
    tempSign: "",
    editingKey: null,
    
    // 1. 직급별 우선순위 (수정 불필요 - 완벽함)
    rankPriority: {
        "차장": 1,
        "과장": 2,
        "대리": 3,
        "주임": 4,
        "사원": 5
    },

    // 이름 문자열에서 직급 가중치를 반환
    getPriority: function(name) {
        if (!name) return 99;
        // 직급 키워드 매칭
        for (const rank in coordMgr.rankPriority) {
            if (name.includes(rank)) return coordMgr.rankPriority[rank];
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
        if (m) return m.name;

        // 2) 한쪽이 다른 쪽을 포함 (직급 표기 유무 차이 등)
        m = list.find(c => {
            const cs = squash(c.name);
            return cs.includes(rawSquash) || rawSquash.includes(cs);
        });
        if (m) return m.name;

        // 3) 직급을 떼어낸 순수 이름이 '유일하게' 일치하는 경우만 채택 (예: 엑셀 "장영근 차장" vs 명단 "장영근 과장")
        if (rawName) {
            const cands = list.filter(c => stripRank(c.name) === rawName);
            if (cands.length === 1) return cands[0].name;
        }

        return null;
    },

    // 초기화 및 실시간 리스너 설정
    init: function() {
        console.log("운영담당자 리스너 가동...");
        const ref = firebase.database().ref('system/coordinators');
        
        ref.on('value', s => {
            const data = s.val() || {};
            
            // 데이터를 배열로 변환 및 유효성 검사
            let items = Object.keys(data).map(k => ({ 
                key: k, 
                name: data[k].name || "이름 없음", 
                sign: data[k].sign || "" 
            }));

            // 직급순 정렬 (1순위: 직급 점수, 2순위: 이름 가나다)
            items.sort((a, b) => {
                const pA = coordMgr.getPriority(a.name);
                const pB = coordMgr.getPriority(b.name);

                if (pA !== pB) return pA - pB; 
                return a.name.localeCompare(b.name, 'ko'); 
            });

            coordMgr.list = items;
            
            // UI 업데이트 실행
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
            const opt = document.createElement('option');
            opt.value = c.name;
            opt.textContent = c.name;
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
                <div style="display:flex; align-items:center; gap:12px; flex:1;">
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
        if (!name) return alert("성함과 직급을 입력하세요.");
        
        try {
            const data = { name: name, sign: coordMgr.tempSign };
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

// [리포트 반영] 과목 필터 바 렌더링 (공통질문 필터 추가)
    renderFilters: function() {
        const bar = document.getElementById('subjectFilterBar');
        if(!bar) return;
        
        let html = `<div class="filter-chip ${this.selectedFilter === 'all' ? 'active' : ''}" onclick="subjectMgr.setFilter('all')">전체</div>`;
        
        // 공통질문 전용 필터 칩 추가
        html += `<div class="filter-chip ${this.selectedFilter === '공통질문' ? 'active' : ''}" onclick="subjectMgr.setFilter('공통질문')">공통질문</div>`;
        
        this.list.forEach(item => {
            html += `<div class="filter-chip ${this.selectedFilter === item.name ? 'active' : ''}" onclick="subjectMgr.setFilter('${item.name}')">${item.name}</div>`;
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
        firebase.database().ref(`system/professorProfiles/${name}`).once('value', snap => {
            const p = snap.val();
            if(!p) return ui.showAlert("상세 프로필을 먼저 등록해주세요.");
            
            // 1. 성함 포맷팅 (교수 성함 (English Name))
            const fullNameEl = document.getElementById('pres-display-full-name');
            if(fullNameEl) {
                const engPart = p.engName ? `<span class="eng-txt">(${p.engName})</span>` : "";
                fullNameEl.innerHTML = `<span class="rank-txt">교수</span> ${name} ${engPart}`;
            }
            
            // 2. 사진 및 텍스트 주입
            const photoImg = document.getElementById('pres-photo');
            if(photoImg) photoImg.src = p.photo || "logo.png";
            
            document.getElementById('pres-phone').innerText = p.phone || "연락처 미등록";
            document.getElementById('pres-email').innerText = p.email || "이메일 미등록";
            document.getElementById('pres-msg').innerText = p.msg ? `"${p.msg}"` : "";
            
            // 3. 약력 리스트 (불렛 로직 포함)
            const bioArea = document.getElementById('pres-bio');
            if(bioArea) {
                if(p.bio) {
                    const lines = p.bio.split('\n').filter(l => l.trim() !== "");
                    bioArea.innerHTML = lines.map(l => `<div class="bio-line">${l.trim()}</div>`).join('');
                } else {
                    bioArea.innerText = "등록된 약력이 없습니다.";
                }
            }
            
            ui.setMode('prof-presentation');
        });
    },
    closeProfProfileModal: function() { document.getElementById('profProfileModal').style.display = 'none'; },






loadDashboardStats: function() {
    if (!state.room) return;
    const room = state.room;
    const today = getTodayString();

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
        dinner: firebase.database().ref(`courses/${room}/dinner_skips/${today}`),
        tablet: firebase.database().ref(`courses/${room}/tablet_loans`),
        departure: firebase.database().ref(`courses/${room}/shuttle/departure`),
        shuttleReq: firebase.database().ref(`courses/${room}/shuttle/requests`)
    };
    window.dashRefs = refs; // 전역 보관 → 다음 방 전환 시 off() 가능

    // 2. 과정 정보 및 장소 실시간 업데이트
    refs.settings.on('value', snap => {
        if (state.room !== room) return;
        const s = snap.val() || {};
        if (document.getElementById('dashCourseTitle')) document.getElementById('dashCourseTitle').innerText = s.courseName || "과정명을 설정해주세요.";
        if (document.getElementById('dashPeriod')) document.getElementById('dashPeriod').innerText = s.period || "기간 미설정";
        if (document.getElementById('dashRoomDetail')) document.getElementById('dashRoomDetail').innerText = s.roomDetailName || "장소 미설정";
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
    refs.expected.on('value', expSnap => {
        if (state.room !== room) return;
        _expectedNamesCache = expSnap.val() || [];
        firebase.database().ref(`courses/${room}/students`).once('value', snap => {
            recalcTotal(snap.val() || {});
        });
    });

    // 7. 행정 신청(외출/석식) 실시간 카운트
    refs.action.on('value', s => {
        if (state.room !== room) return;
        const count = Object.keys(s.val() || {}).length;
        if (document.getElementById('dashActionCount')) document.getElementById('dashActionCount').innerText = count;
    });
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






// 8. 셔틀 정보 및 차량 수요 실시간 업데이트
refs.departure.on('value', snap => {
    if (state.room !== room) return; 
    const dep = snap.val();
    const bar = document.getElementById('dashShuttleNotice');
    const txt = document.getElementById('dashShuttleNoticeTxt');
    if (!bar || !txt) return;

    // 퇴교차량 노란 박스는 숨기고, 제목 옆에 시간만 표시
    bar.style.display = "none";
    const inlineEl = document.getElementById('dashShuttleTimeInline');
    if (dep && dep.time) {
        if (inlineEl) inlineEl.innerText = `(${dep.time} 출발)`;
    } else {
        if (inlineEl) inlineEl.innerText = '';
    }
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
        
        // 1. 좌측 영역: 강사 본인 공지
        const snap = await firebase.database().ref(`courses/${state.room}/notice`).once('value');
        document.getElementById('instNoticeInputMain').value = snap.val() || "";

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
        
        // 1. 강사 본인 공지 불러오기
        const snap = await firebase.database().ref(`courses/${state.room}/notice`).once('value');
        document.getElementById('instNoticeInputMain').value = snap.val() || "";

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
                
                // (2) 항기원 전체 공지
                if (globalMsg) {
                    html += `
                        <div style="margin-bottom:15px; padding:15px 20px; background:#f8fafc; border-radius:12px; border:1px solid #e2e8f0; border-left:8px solid #64748b;">
                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                                <span style="background:#64748b; color:white; font-size:10px; font-weight:900; padding:2px 6px; border-radius:4px; line-height:1.2;">CENTER</span>
                                <span style="color:#64748b; font-size:13px; font-weight:800;">항기원 전체 공지</span>
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
            this.generateInternalQR();
        }
    },

// [최종 수정] 자체 출석용 QR 코드 생성 (강의실 꼬임 방지 강화)
    generateInternalQR: function() {
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
                width: 260,
                height: 260,
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
                const cleanPhone = (s.phone || "0000").trim();
                const identifier = `${s.name.trim()}_${cleanPhone}`;
                uniqueStudentsMap.set(identifier, { name: s.name.trim(), phone: cleanPhone });
            }
        });
        const sortedList = Array.from(uniqueStudentsMap.values()).sort((a,b) => a.name.localeCompare(b.name));

        attendanceRef.on('value', attendSnap => {
            if (state.room !== roomAtInvoke) return;
            const attendees = attendSnap.val() || {};
            let attendCount = 0;
            if(listDiv) listDiv.innerHTML = "";

            sortedList.forEach(s => {
                // [수정 포인트] 학생이 저장한 '이름_번호' 형식과 정확히 일치시켜서 숫자를 올립니다.
                const attendKey = `${s.name}_${s.phone}`;
                const isAttended = attendees[attendKey] ? true : false;
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
            if(checkInEl) checkInEl.innerText = attendCount;
        });
    });
},











showAlert: function(msg) {
        document.getElementById('customAlertText').innerText = msg;
        document.getElementById('customAlertModal').style.display = 'flex';
    },

    closeAlert: function() {
        document.getElementById('customAlertModal').style.display = 'none';
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
                    opt.innerText = `Room ${c} (🔵 내 강의실 - ${profName})`;
                    opt.selected = true;
                } else if(c === state.room) {
                    // 선택한 방이지만 비번 미인증 (미개설 진입 등)
                    opt.innerText = `Room ${c} (⚪ 설정 중)`;
                    opt.selected = true;
                } else if(isRoomActive) {
                    opt.innerText = `Room ${c} (🟠 사용중 - ${profName})`;
                } else {
                    opt.innerText = `Room ${c}  (미개설)`;
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
                const isLocked = !!(settings.autoAssignLocked);

                const rowNumCell = isMyRoom
                    ? `<span style="display:inline-flex; align-items:center; justify-content:center; width:28px; height:28px; background:#3b82f6; border-radius:50%;"><i class="fa-solid fa-check" style="color:#fff; font-size:13px;"></i></span>`
                    : rowNum;

                const lockBtn = `
                    <div style="margin-top:5px;" title="${isLocked ? '잠금 해제 (자동배치 허용)' : '잠금 (자동배치 제외)'}">
                        <button onclick="event.stopPropagation(); dataMgr.toggleRoomLock('${c}', ${isLocked})"
                            style="border:none; background:${isLocked ? '#fef3c7' : '#f1f5f9'};
                                   border-radius:6px; padding:3px 7px; cursor:pointer;
                                   font-size:12px; font-weight:800;
                                   color:${isLocked ? '#d97706' : '#94a3b8'};
                                   border:1px solid ${isLocked ? '#fde68a' : '#e2e8f0'};
                                   transition:all .15s; display:flex; align-items:center; gap:4px;">
                            <i class="fa-solid ${isLocked ? 'fa-lock' : 'fa-lock-open'}"></i>
                            ${isLocked ? '잠금' : '열림'}
                        </button>
                    </div>`;

                row.innerHTML = `
                    <td>
                        <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
                            <div>${rowNumCell}</div>
                            ${lockBtn}
                        </div>
                    </td>
                    <td style="font-weight:900; color:#3b82f6;">
                        Room ${c}
                        ${isMyRoom ? '<span class="my-room-badge">MY</span>' : ''}
                    </td>
                    <td><div class="td-course-name" title="${courseName}">${courseName}</div></td>
                    <td style="font-weight:600;">${profName}</td>
                    <td>${statusBadge}</td>
                    <td style="font-weight:700;">${userCount}명</td>
                    <td>${roomCell}</td>
                    <td>
                        <button class="btn-table-action" onclick="dataMgr.switchRoomAttempt('${c}')">입장하기</button>
                    </td>
                `;

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
    
    // [보안] 강의실 선택 확인
    if (!state.room || state.room === 'null') {
        ui.showAlert("⚠️ 좌측 상단에서 강의실(Room)을 먼저 선택해 주세요.");
        return;
    }

    if (qrBox.style.display === 'flex') {
        qrBox.style.display = 'none';
    } else {
        qrBox.style.display = 'flex';
        const target = document.getElementById('miniQRElement');
        const label = document.querySelector('.qr-label');
        if(!target) return;

        target.innerHTML = ""; 
        
        // 경로 계산 보정
        const path = window.location.pathname;
        const directory = path.substring(0, path.lastIndexOf('/'));  // ← 인자 순서 수정
        const baseUrl = window.location.origin + directory + "/";
        const forcedUrl = `${baseUrl}index.html?room=${state.room}`;
        
        const ctEl = document.getElementById('displayCourseTitle');
        const courseNm = (ctEl && ctEl.innerText.trim()) ? ctEl.innerText.trim() : '';
        label.innerText = `ROOM ${state.room} Join` + (courseNm ? ` · ${courseNm}` : '');
        
        // QR 생성
        new QRCode(target, {
            text: forcedUrl,
            width: 140,
            height: 140,
            correctLevel: QRCode.CorrectLevel.H
        });
    }
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
        clear('dashCoordName', '-');
        clear('dashProfNameOnly', '-');
        clear('dashArrivedCount', '0');
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
        alert("QR 팝업용 HTML 요소가 없습니다.");
    }
},






    
    closeQrModal: function() { 
        document.getElementById('qrModal').style.display = 'none'; 
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







setMode: function(mode) {
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
            }
        }

        // 1. 모든 view- 로 시작하는 구역을 일단 숨김
        document.querySelectorAll('[id^="view-"]').forEach(v => { 
            v.style.display = 'none'; 
        });

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
        const targetView = (mode === 'admin-action') ? 'view-admin-action' : (mode === 'dinner-skip') ? 'view-dinner-skip' : (mode === 'tablet-loan') ? 'view-tablet-loan' : `view-${mode}`;
        const targetEl = document.getElementById(targetView);

        // 3. 화면 표시 (전부 flex)
        if(targetEl) targetEl.style.display = 'flex';

        // home 모드: 탭 숨김 / waiting 모드: 현황판 데이터 갱신
        if (mode === 'home') {
            const tabs = document.querySelector('.mode-tabs');
            if (tabs) tabs.style.display = 'none';
            setTimeout(() => { if(typeof ui.loadHomeStats==='function') ui.loadHomeStats(); }, 200);
        } else if (mode === 'waiting') {
            ui.initRoomSelect();
        }

        // 4. 상단 탭 활성화 표시
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        const targetTab = document.getElementById(`tab-${mode}`);
        if(targetTab) targetTab.classList.add('active');

        localStorage.setItem('kac_last_mode', mode);
        state.currentMode = mode; // 현재 탭 추적 (공지 팝업 차단용)

        // 5. 각 모드별 데이터 로드
        if (state.room) {
            // ── 교육생 화면 모드 설정 (퀴즈는 맨 먼저 처리) ──
            if (!state.isObserver) {
                const safeStudentModes = ['waiting', 'schedule', 'shuttle', 'admin-action', 'dinner-skip', 'tablet-loan', 'students', 'dashboard', 'notice', 'attendance', 'guide', 'dormitory', 'survey-guide', 'exam-timer'];
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
            if (mode === 'notice') { 
                ui.loadNoticeView(); 
                guideMgr.clearCoordNoticeBadge();
                // 안내 보드 기존 내용 불러오기 + 색상 팔레트 초기화
                dataMgr.loadBoardNotice();
                ui.initBoardPalette();
                if (typeof surveyMgr !== 'undefined') surveyMgr.init();
            }
            if (mode === 'attendance') ui.loadAttendanceView();
            if (mode === 'guide') { setTimeout(() => guideMgr.refresh(), 100); }
            if (mode === 'schedule' && typeof scheduleMgr !== 'undefined') scheduleMgr.load();
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
                const tbody = document.getElementById('dormitoryTableBody');
                if(!tbody) return;
                tbody.innerHTML = "<tr><td colspan='5' style='padding:50px; color:#94a3b8;'>데이터를 매칭 중입니다...</td></tr>";

                Promise.all([
                    firebase.database().ref(`courses/${state.room}/students`).once('value'),
                    firebase.database().ref(`system/dorm/assignments`).once('value')
                ]).then(([studentSnap, dormSnap]) => {
                    const students = studentSnap.val() || {};
                    const dormData = dormSnap.val() || {}; 
                    const norm = v => String(v || '').replace(/\s+/g, '').trim();
                    const normId = v => String(v || '').replace(/\D/g, '').trim();
                    const currentCourse = (document.getElementById('dashCourseName')?.innerText || '').trim();
                    const findDorm = (student) => {
                        const n = norm(student?.name);
                        const id = normId(student?.phone || student?.empNo || '');
                        let best = null;
                        let bestScore = -1;
                        Object.values(dormData || {}).forEach(wk => {
                            const when = Number(wk?.assignedAt || 0);
                            Object.values(wk?.students || {}).forEach(a => {
                                if (!a || norm(a.name) !== n) return;
                                const aid = normId(a.empNo || a.phone || '');
                                const idMatch = id && aid && (id === aid || id.slice(-4) === aid || aid.slice(-4) === id);
                                if (id && aid && !idMatch) return;
                                let score = when;
                                if (idMatch) score += 10000000000000;
                                if (String(a.room || '') === String(state.room || '')) score += 1000000000000;
                                if (currentCourse && String(a.course || '').trim() === currentCourse) score += 100000000000;
                                if (score > bestScore) { bestScore = score; best = a; }
                            });
                        });
                        return best;
                    };
                    tbody.innerHTML = "";
                    const studentList = Object.values(students).filter(s => s.name && s.name !== "undefined").sort((a, b) => a.name.localeCompare(b.name));

                    if (studentList.length === 0) {
                        tbody.innerHTML = "<tr><td colspan='5' style='padding:50px; color:#94a3b8;'>현재 입실한 수강생이 없습니다.</td></tr>";
                        return;
                    }

                    studentList.forEach((s, idx) => {
                        const sName = s.name;
                        const sPhone = s.phone ? s.phone : ""; 
                        let assignedInfo = findDorm(s);

                        const bName = assignedInfo ? assignedInfo.building : "-";
                        const rNo = assignedInfo ? (assignedInfo.no || assignedInfo.room) + "호" : "미배정";
                        const statusColor = assignedInfo ? "#3b82f6" : "#94a3b8";

                        tbody.innerHTML += `
                            <tr>
                                <td>${idx + 1}</td>
                                <td style="font-weight:bold;">${sName}</td>
                                <td>${sPhone || "-"}</td>
                                <td style="color:${statusColor}; font-weight:800;">${bName}</td>
                                <td style="color:${statusColor}; font-weight:800;">${rNo}</td>
                            </tr>`;
                    });
                });
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
                <div class="q-content">
                    ${newBadge}
                    <span style="display:inline-block; background:#eff6ff; color:#3b82f6; font-size:10px; padding:2px 7px; border-radius:4px; margin-right:8px; vertical-align:middle; border:1px solid #dbeafe; font-weight:800;">
                        To. ${displayName}
                    </span>
                    <span style="${isDone ? 'text-decoration:line-through; opacity:0.6;' : ''}">
                        ${icon}${i.text}
                    </span>
                    <button class="btn-translate" onclick="event.stopPropagation(); ui.translateQa('${i.id}')" title="번역">
                        <i class="fa-solid fa-language"></i> 번역
                    </button>
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
            // 오늘: 헤더 + 카드 바로 표시 (펼침 고정)
            htmlBuffer += `
            <div style="display:flex; align-items:center; gap:10px; margin:8px 0 6px; padding:8px 12px; background:#eff6ff; border-radius:10px; border-left:4px solid #3b82f6;">
                <span style="font-weight:900; color:#1d4ed8; font-size:14px;">${label}</span>
                <span style="font-size:12px; color:#64748b; font-weight:600;">${cnt}건</span>
                ${doneCnt > 0 ? `<span style="font-size:11px; color:#10b981; font-weight:700;">✅ 답변완료 ${doneCnt}건</span>` : ''}
            </div>`;
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
                <div id="${uid}" style="display:none; padding-top:4px;">
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
        box.style.display = isOpen ? 'none' : 'block';
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
    
    // 전체 출석부 관리/인쇄 (attendance_sheet.html 연결)
    openFullAttendanceSheet: function() {
        if(!state.room) return ui.showAlert("강의실을 먼저 선택해주세요.");
        window.open(`attendance_sheet.html?room=${state.room}`, '_blank');
    },

    toggleNightMode: function() { 
        document.body.classList.toggle('night-mode'); 
        const n = document.body.classList.contains('night-mode');
        document.getElementById('iconSun').classList.toggle('active', !n);
        document.getElementById('iconMoon').classList.toggle('active', n);
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
        setTimeout(() => { if(typeof ui.loadHomeStats==='function') ui.loadHomeStats(); }, 200);

        // 6. 왼쪽 룸 선택 메뉴 "Select Room"으로 강제 고정
        const sel = document.getElementById('roomSelect');
        if(sel) sel.value = "";
    },





    loadAdminActionData: function() {
        if(!state.room) return;
        const today = getTodayString();
        const yesterday = getYesterdayString();
        const now = new Date();
        const showYesterday = now.getHours() < 9; 
        
        const tbody = document.getElementById('adminActionTableBody');
        if(!tbody) return;

        if (state.adminActionRef) {
            state.adminActionRef.off();
        }

        state.adminActionRef = firebase.database().ref(`courses/${state.room}/admin_actions/${today}`);
        
        state.adminActionRef.on('value', snap => {
            const todayData = snap.val() || {};
            
            if (showYesterday) {
                firebase.database().ref(`courses/${state.room}/admin_actions/${yesterday}`).once('value', ySnap => {
                    const yesterdayData = ySnap.val() || {};
                    renderAdminList(todayData, yesterdayData);
                });
            } else {
                renderAdminList(todayData, {});
            }
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

            // 2. 가나다순(이름순) 정렬 실행
            combinedList.sort((a, b) => a.name.localeCompare(b.name));

            if (combinedList.length === 0) {
                tbody.innerHTML = "<tr><td colspan='6' style='padding:50px; color:#94a3b8;'>신청 내역이 없습니다.</td></tr>";
                return;
            }

            // 3. 정렬된 리스트를 화면에 출력
            combinedList.forEach(item => {
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

                // 복귀 여부 표시
                const isReturned = item.returned === true || item.returnReportTime;
                const returnedBadge = isReturned
                    ? '<span style="color:#10b981; font-weight:800; font-size:12px;">✅ 복귀완료</span>'
                    : '<span style="color:#ef4444; font-weight:800; font-size:12px;">⏳ 미복귀</span>';

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
                    <td style="text-align:center;">${returnedBadge}</td>
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

                tbody.appendChild(tr);
            }
        } 
    },

loadDinnerSkipData: function() {
        if(!state.room) return;
        const today = getTodayString();
        firebase.database().ref(`courses/${state.room}/dinner_skips/${today}`).on('value', snap => {
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






loadStudentList: function() {
        if(!state.room) return;
        const expectedRef = firebase.database().ref(`courses/${state.room}/expectedStudents`);
        const actualRef = firebase.database().ref(`courses/${state.room}/students`);
        expectedRef.off(); actualRef.off();

        expectedRef.on('value', expSnap => {
            const expectedNames = expSnap.val() || [];
            actualRef.on('value', snap => {
                if(!state.room) return; 
                const data = snap.val() || {};
                const tbody = document.getElementById('studentListTableBody');
                if(!tbody) return;

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
                                    </div>
                                ` : `-`}
                            </td>
                        </tr>`;
                });
                const total = combinedNames.length;
                const percent = total > 0 ? Math.round((arrivedCount / total) * 100) : 0;
                const statusEl = document.getElementById('arrivalStatusSmall');
                if(statusEl) statusEl.innerText = `${arrivedCount} / ${total} 명 (${percent}%)`;
            });
        });
    },







// [추가 1] 생활관 중복 제거 및 데이터 로드 함수
loadDormitoryData: function() {
        if(!state.room) return;
        const tbody = document.getElementById('dormitoryTableBody');
        const statusEl = document.getElementById('dormArrivalStatus');
        if(!tbody) return;

        const expectedRef = firebase.database().ref(`courses/${state.room}/expectedStudents`);
        const actualRef = firebase.database().ref(`courses/${state.room}/students`);
        const dormRef = firebase.database().ref(`system/dorm/assignments`);

        const renderAll = (expData, actData, dormData) => {
            const norm = v => String(v || '').replace(/\s+/g, '').trim();
            const normId = v => String(v || '').replace(/\D/g, '').trim();
            const currentCourse = (document.getElementById('dashCourseName')?.innerText || '').trim();
            const findDorm = (name, sData) => {
                const n = norm(name);
                const id = normId(sData?.phone || sData?.empNo || '');
                let best = null;
                let bestScore = -1;
                Object.values(dormData || {}).forEach(wk => {
                    const when = Number(wk?.assignedAt || 0);
                    Object.values(wk?.students || {}).forEach(a => {
                        if (!a || norm(a.name) !== n) return;
                        const aid = normId(a.empNo || a.phone || '');
                        const idMatch = id && aid && (id === aid || id.slice(-4) === aid || aid.slice(-4) === id);
                        if (id && aid && !idMatch) return;
                        let score = when;
                        if (idMatch) score += 10000000000000;
                        if (String(a.room || '') === String(state.room || '')) score += 1000000000000;
                        if (currentCourse && String(a.course || '').trim() === currentCourse) score += 100000000000;
                        if (score > bestScore) {
                            bestScore = score;
                            best = a;
                        }
                    });
                });
                if (!best) return { building: "-", room: "미배정" };
                return { building: best.building || "-", room: best.no || best.room || "미배정" };
            };
            const expectedNames = expData || [];
            const actualStudents = Object.values(actData || {}).filter(s => s.name && s.name !== "undefined");
            const actualNames = actualStudents.map(s => s.name);
            const combinedNames = Array.from(new Set([...expectedNames, ...actualNames])).sort((a,b) => a.localeCompare(b));

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
                const phoneSuffix = sData.phone ? sData.phone : "-";

                const assigned = findDorm(name, sData);
                
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

        let cacheExp = [], cacheAct = {}, cacheDorm = {};
        expectedRef.on('value', s => { cacheExp = s.val(); renderAll(cacheExp, cacheAct, cacheDorm); });
        actualRef.on('value', s => { cacheAct = s.val(); renderAll(cacheExp, cacheAct, cacheDorm); });
        dormRef.on('value', s => { cacheDorm = s.val() || {}; renderAll(cacheExp, cacheAct, cacheDorm); });
    },






// [최종 완결본] 실시간 로드 + 상하단 색상 동기화 + 강제 취소(삭제) 버튼 포함
loadShuttleData: function() {
    if(!state.room) return;

    // 1. 좌측 파란색 박스: 날짜, 시간, 문구 레이아웃
    firebase.database().ref(`courses/${state.room}/shuttle/departure`).on('value', snap => {
        const dep = snap.val();
        const el = document.getElementById('shuttleDepartureTime');
        if(!el) return;

        if (dep && dep.time) {
            el.innerHTML = `
                <div style="font-size:20px; opacity:0.8; margin-bottom:2px;">${dep.date}</div>
                <div style="font-size:42px; font-weight:900; line-height:1.1;">${dep.time}</div>
                <div style="font-size:16px; margin-top:10px; font-weight:800; background:rgba(255,255,255,0.15); padding:4px 12px; border-radius:50px; display:inline-block;">
                    퇴교차량 출발
                </div>
            `;
            el.style.color = "white";
            // 입력창에도 현재 설정값 반영
            const dateEl = document.getElementById('shuttle-depart-date');
            const timeEl = document.getElementById('shuttle-depart-time');
            if (dateEl && dep.date) dateEl.value = dep.date;
            if (timeEl && dep.time) timeEl.value = dep.time;
            // ETA 카드 업데이트 (현재 신청 인원 수 함께 전달)
            window._shuttleAdminDepTime = dep.time;
            ui.updateShuttleETA(dep.time, window._shuttleAdminCounts || { osong:0, terminal:0, airport:0 });
        } else {
            el.innerHTML = `<div style="font-size:18px; opacity:0.7;">퇴교 공지 대기 중</div>`;
            el.style.color = "white";
            window._shuttleAdminDepTime = null;
            ui.updateShuttleETA(null);
        }
    });





    // 2. 신청 명단 실시간 연동 및 삭제 버튼 생성
    firebase.database().ref(`courses/${state.room}/shuttle/requests`).on('value', snap => {
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
    if (!departureTime) {
        etaDetail.innerHTML = `<div style="color:#94a3b8; font-size:13px; padding:4px 0;">출발 시간이 공지되면 표시됩니다.</div>`;
        return;
    }

    // counts: { osong, terminal, airport } — 각 목적지 신청 인원수
    const c = counts || { osong: 0, terminal: 0, airport: 0 };
    const [hh, mm] = departureTime.split(':').map(Number);
    const base = hh * 60 + mm;

    const fmt = (total) => {
        const h = String(Math.floor(total / 60) % 24).padStart(2, '0');
        const m = String(total % 60).padStart(2, '0');
        return `${h}:${m}`;
    };

    // [스킵 방식] 신청자 있는 정류장만 순서대로 정차, 각 구간 30분
    //  - 신청자 없는 정류장은 건너뜀(정차 안 함) → 다음 정류장이 그만큼 앞당겨짐
    //  - 예) 출발 00:00, 셋 다 신청: 오송 00:30 / 터미널 01:00 / 공항 01:30
    //        오송 미신청: 터미널 00:30 / 공항 01:00
    let acc = base;
    const osongStop = c.osong > 0;
    const termStop  = c.terminal > 0;
    const airStop   = c.airport > 0;

    let osongMin = null, termMin = null, airMin = null;
    if (osongStop) { acc += 30; osongMin = acc; }
    if (termStop)  { acc += 30; termMin  = acc; }
    if (airStop)   { acc += 30; airMin   = acc; }

    const stops = [
        { label: '오송역',      time: osongMin !== null ? fmt(osongMin) : null, color: '#ef4444', cnt: c.osong },
        { label: '청주터미널',  time: termMin  !== null ? fmt(termMin)  : null, color: '#3b82f6', cnt: c.terminal },
        { label: '청주국제공항',time: airMin   !== null ? fmt(airMin)   : null, color: '#10b981', cnt: c.airport },
    ];

    // 한 줄 인라인 표시 (정차하지 않는 정류장은 흐리게 skip 표기)
    etaDetail.innerHTML = `
        <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
            ${stops.map(s => s.time !== null ? `
                <div style="display:flex; align-items:center; gap:8px; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:10px; padding:8px 16px;">
                    <span style="font-size:16px; font-weight:900; color:${s.color};">${s.label}</span>
                    <span style="font-size:18px; font-weight:900; color:#1e293b;">${s.time}</span>
                    <span style="font-size:12px; color:#94a3b8; font-weight:700;">도착</span>
                </div>
            ` : `
                <div style="display:flex; align-items:center; gap:6px; background:#f1f5f9; border:1.5px dashed #cbd5e1; border-radius:10px; padding:8px 14px; opacity:0.6;">
                    <span style="font-size:14px; font-weight:800; color:#94a3b8; text-decoration:line-through;">${s.label}</span>
                    <span style="font-size:11px; color:#94a3b8; font-weight:700;">신청자 없음 · skip</span>
                </div>
            `).join('')}
        </div>
        <div style="font-size:11px; color:#94a3b8; margin-top:8px;">※ 신청자 있는 정류장만 정차 · 각 구간 30분 (미신청 정류장은 건너뜀)</div>
    `;
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

// [강사 플랫폼: 로고 클릭 시 모든 정보를 초기화하고 현황판으로 이동]
    // 사이드바 책갈피 토글
    toggleSidebar: function() {
        const body = document.body;
        const icon = document.getElementById('sidebarToggleIcon');
        body.classList.toggle('sidebar-hidden');
        // 전체화면 버튼 아이콘도 동기화
        const fsIcon = document.querySelector('.control-icon-btn i.fa-expand, .control-icon-btn i.fa-compress');
        const isHidden = body.classList.contains('sidebar-hidden');
        if (fsIcon) {
            fsIcon.classList.toggle('fa-expand', !isHidden);
            fsIcon.classList.toggle('fa-compress', isHidden);
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

    // ── 홈 통계 로드 ── [수정] 실시간 on() 리스너 + '현재 방에 배정된 과정' 기준 집계
    //   기존엔 _isThisWeek(이번 주 월~금)로만 필터해서, 토요일에 SELECT ROOM이 차주 과정을
    //   미리 배정(D-2 오픈)해 둔 경우 그 과정이 "이번 주"가 아니라 0으로 누락됐다.
    //   → 방이 실제로 active(과정 배정됨)이거나, 기간이 이번 주와 겹치면 집계에 포함한다.
    loadHomeStats: function() {
        const computeAndRender = (d) => {
            const today = getTodayString();
            let activeCount=0, studentTotal=0, outingTotal=0;
            Object.entries(d).forEach(([room, r]) => {
                if (!r) return;
                const st=r.status||{}, settings=r.settings||{}, students=r.students||{};
                const actions=(r.admin_actions||{})[today]||{};
                const period = settings.period || '';
                const hasCourse = !!(settings.courseName && String(settings.courseName).trim());
                const isActive  = st.roomStatus === 'active';
                // 테스트·내부 운용(총괄표 비노출) 과정은 통합 현황판 집계에서 제외
                if (settings.hideFromBoard) return;
                // 집계 대상: (1) 현재 방에 과정이 배정/운영 중이거나 (2) 기간이 이번 주와 겹치는 과정
                const include = (isActive && hasCourse) || ui._isThisWeek(period);
                if (!include) return;
                if (isActive) activeCount++;
                const cnt = new Set(Object.values(students).filter(s=>s&&s.name&&s.name!=='undefined').map(s=>s.name)).size;
                studentTotal += cnt;
                Object.values(actions).forEach(a=>{
                    if(a&&(a.type==='outing'||a.type==='overnight'||a.type==='group_outing')) outingTotal++;
                });
            });
            ui._setStat('stat-active-count', activeCount);
            ui._setStat('stat-student-count', studentTotal);
            ui._setStat('stat-outing-count', outingTotal);
            window._homeStatsData=d; window._homeStatsToday=today;
        };

        // 실시간 리스너는 1회만 등록 (중복 등록 방지). 등록 시 즉시 최초값으로 렌더된다.
        if (!ui._homeStatsBound) {
            ui._homeStatsBound = true;
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
    openHomeStatModal: function(type) {
        const modal=document.getElementById('homeStatModal');
        const title=document.getElementById('homeStatModalTitle');
        const body=document.getElementById('homeStatModalBody');
        if(!modal) return;
        const d=window._homeStatsData||{}, today=window._homeStatsToday||getTodayString();
        modal.style.display='flex';
        // 카드 집계와 동일 기준: 현재 과정이 배정된 active 방 OR 이번 주와 겹치는 과정
        const weekRooms=Object.entries(d).filter(([,r])=>{
            const s=(r&&r.settings)||{}, st=(r&&r.status)||{};
            if (s.hideFromBoard) return false;
            const hasCourse=!!(s.courseName && String(s.courseName).trim());
            return (st.roomStatus==='active' && hasCourse) || ui._isThisWeek(s.period||'');
        });
        if(type==='active'){
            title.textContent='🏫 현재 강의 중인 과정 (이번 주)';
            const rows=weekRooms.filter(([,r])=>(r.status||{}).roomStatus==='active').map(([room,r])=>{
                const prof=(r.status||{}).professorName||'-', course=(r.settings||{}).courseName||'-';
                return `<div style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;background:#eff6ff;border:1px solid #dbeafe;border-radius:14px;margin-bottom:12px;">
                    <div style="display:flex;align-items:center;gap:16px;">
                        <span style="font-weight:900;color:#fff;background:#3b82f6;padding:6px 14px;border-radius:10px;font-size:16px;">Room ${room}</span>
                        <span style="font-size:18px;color:#0f172a;font-weight:700;">${course}</span>
                    </div>
                    <span style="font-size:15px;color:#475569;font-weight:800;">${prof} 교수</span></div>`;
            }).join('');
            body.innerHTML=rows||'<p style="color:#94a3b8;text-align:center;padding:30px;font-size:16px;">이번 주 강의 중인 과정이 없습니다.</p>';
        } else if(type==='students'){
            title.textContent='👩‍🎓 과정별 교육생 현황 (이번 주)';
            const rows=weekRooms.map(([room,r])=>{
                const course=(r.settings||{}).courseName||'-';
                const cnt=new Set(Object.values(r.students||{}).filter(s=>s.name&&s.name!=='undefined').map(s=>s.name)).size;
                return `<div style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;background:#f0fdf4;border:1px solid #dcfce7;border-radius:14px;margin-bottom:12px;">
                    <div style="display:flex;align-items:center;gap:16px;">
                        <span style="font-weight:900;color:#fff;background:#10b981;padding:6px 14px;border-radius:10px;font-size:16px;">Room ${room}</span>
                        <span style="font-size:18px;color:#0f172a;font-weight:700;">${course}</span>
                    </div>
                    <span style="font-size:30px;font-weight:900;color:#0f172a;">${cnt}<span style="font-size:15px;color:#64748b;font-weight:800;"> 명</span></span></div>`;
            }).join('');
            body.innerHTML=rows||'<p style="color:#94a3b8;text-align:center;padding:30px;font-size:16px;">이번 주 교육생 정보가 없습니다.</p>';
        } else if(type==='outing'){
            title.textContent='🚶 과정별 외출/외박 신청 현황 (금일)';
            const rows=weekRooms.map(([room,r])=>{
                const course=(r.settings||{}).courseName||'-';
                const acts=(r.admin_actions||{})[today]||{};
                const outs=Object.values(acts).filter(a=>a&&(a.type==='outing'||a.type==='overnight'||a.type==='group_outing'));
                if(!outs.length) return '';
                return `<div style="padding:20px 24px;background:#fffbeb;border:1px solid #fef3c7;border-radius:14px;margin-bottom:12px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                        <div style="display:flex;align-items:center;gap:16px;">
                            <span style="font-weight:900;color:#fff;background:#f59e0b;padding:6px 14px;border-radius:10px;font-size:16px;">Room ${room}</span>
                            <span style="font-size:18px;color:#0f172a;font-weight:700;">${course}</span>
                        </div>
                        <span style="font-size:30px;font-weight:900;color:#0f172a;">${outs.length}<span style="font-size:15px;color:#64748b;font-weight:800;"> 명</span></span></div>
                    ${outs.map(a=>`<div style="font-size:14px;color:#78716c;padding:8px 0;border-top:1px solid #fde68a;"><b>${a.name||'-'}</b> · ${a.type==='overnight'?'외박':'외출'} · ${a.destination||''} (${a.startTime||''}~${a.endTime||''})</div>`).join('')}
                </div>`;
            }).filter(Boolean).join('');
            body.innerHTML=rows||'<p style="color:#94a3b8;text-align:center;padding:30px;font-size:16px;">금일 외출/외박 신청자가 없습니다.</p>';
        }
    },


// [강사 플랫폼 전용: 유관 시스템 보안 하이패스 함수]
    // ── 강의실 초기화 인증 모달 ──
    openResetAuthModal: function() {
        const label = document.getElementById('resetAuthRoomLabel');
        const input = document.getElementById('resetAuthInput');
        if (label) label.innerText = `Room ${state.room}`;
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
            const storedPw = settings.password || btoa("7777"); // 미설정 시 기본값 7777
            if (btoa(inputPw) === storedPw) {
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
            oDiv.innerHTML = "";
            q.options.forEach((o, i) => {
                // opt-text-wrapper에 flex:1을 주어 우측 숫자를 끝으로 밀어내는 구조입니다.
                oDiv.innerHTML += `
                    <div class="quiz-opt ${q.isOX ? 'ox-mode' : ''}" id="opt-${i+1}">
                        <div class="opt-text-wrapper">
                            ${q.isOX ? '' : `<div class="opt-num">${i+1}</div>`}
                            <div class="opt-text">${o}</div>
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
            const id = `Q${idx}`; 
            const answers = allAns[id] || {}; 
            const keys = Object.keys(answers);
            if(keys.length > 0) totalQuestions++;
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
            .filter(u => u.pCount === totalQuestions)
            .sort((a, b) => b.score - a.score);
        
        const finalRankingData = {}; 
        let rank = 1;
        sortedUsers.forEach((u, i) => { 
            if (i > 0 && u.score < sortedUsers[i - 1].score) rank = i + 1; 
            finalRankingData[u.token] = { 
                score: u.score, 
                rank: rank, 
                total: sortedUsers.length 
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
            .replace(/汤捯/g, '')
            .replace(/^[ㄱ-ㅎㅏ-ㅣ]+(?=[가-힣A-Za-z0-9])/g, '')
            .replace(/[|]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    },
    parseTable: function(lines) {
        const arr = (lines || []).map(v => this.cleanLine(v)).filter(Boolean);
        const isDate = v => /\d+\s*월\s*\d+\s*일/.test(v);
        const isWeekday = v => /^(월|화|수|목|금|토|일)$/.test(v);
        const isPeriod = v => /^\d{1,2}$/.test(v);
        const isTime = v => /^\d{1,2}:\d{2}\s*~?$/.test(v) || /^\d{1,2}:\d{2}\s*~\s*\d{1,2}:\d{2}$/.test(v);
        const isHeader = v => /교육\s*시간표|과정명|담임|교육담당|교수|강의실|교육장소|일\s*자|시\s*간/.test(v);

        const dates = arr.filter(isDate).slice(0, 7);
        const firstDateIdx = arr.findIndex(isDate);
        const weekdays = firstDateIdx >= 0
            ? arr.slice(firstDateIdx).filter(isWeekday).slice(0, dates.length || 7)
            : arr.filter(isWeekday).slice(0, 7);
        const dayCount = Math.max(dates.length, weekdays.length, 1);
        const days = Array.from({ length: dayCount }, (_, i) => ({
            date: dates[i] || '',
            weekday: weekdays[i] || ''
        }));

        const combineSessions = items => {
            const sessions = [];
            items.forEach(raw => {
                const v = this.cleanLine(raw);
                if (!v || isHeader(v) || isDate(v) || isWeekday(v) || isPeriod(v) || isTime(v)) return;
                if (/^[(（].+[)）]$/.test(v) && sessions.length) {
                    sessions[sessions.length - 1] += `\n${v}`;
                } else if (!sessions.includes(v)) {
                    sessions.push(v);
                }
            });
            return sessions;
        };

        const mergeTime = (a, b) => {
            const times = `${a || ''} ${b || ''}`.match(/\d{1,2}:\d{2}/g) || [];
            if (times.length >= 2) return `${times[0]}~${times[times.length - 1]}`;
            return [a, b].filter(Boolean).join(' ');
        };
        const sameCells = (a, b) => JSON.stringify(a || []) === JSON.stringify(b || []);

        let startIdx = arr.findIndex(v => isWeekday(v));
        if (startIdx < 0) startIdx = arr.findIndex(v => /^1$/.test(v));
        let i = Math.max(0, startIdx + 1);
        const rows = [];
        while (i < arr.length) {
            if (!(isPeriod(arr[i]) && isTime(arr[i + 1] || ''))) { i++; continue; }
            const period = arr[i++];
            const t1 = arr[i++] || '';
            let t2 = '';
            if (isTime(arr[i] || '')) t2 = arr[i++];
            const cells = [];
            while (i < arr.length) {
                if (isPeriod(arr[i]) && isTime(arr[i + 1] || '')) break;
                cells.push(arr[i++]);
            }
            const sessions = combineSessions(cells);
            const common = sessions.length === 1 && /점심|식사/.test(sessions[0]);
            rows.push({
                period,
                time: [t1, t2].filter(Boolean).join(' '),
                cells: days.map((_, idx) => common ? sessions[0] : (sessions[idx] || ''))
            });
        }

        const compactRows = [];
        rows.forEach(row => {
            const hasContent = row.cells.some(Boolean);
            const prev = compactRows[compactRows.length - 1];
            if (prev && (!hasContent || sameCells(prev.cells, row.cells))) {
                prev.time = mergeTime(prev.time, row.time);
                return;
            }
            compactRows.push(row);
        });

        return { days, rows: compactRows.filter(r => r.time || r.cells.some(Boolean)) };
    },
    renderSchedule: function(lines) {
        const parsed = this.parseTable(lines);
        if (!parsed.rows.length || !parsed.days.length) {
            return `
                <div style="display:flex; flex-direction:column; gap:8px;">
                    ${(lines || []).map(line => `
                        <div style="display:flex; align-items:flex-start; gap:10px; background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:10px 12px; color:#1e293b; font-size:14px; font-weight:700; line-height:1.45;">
                            <span style="width:7px; height:7px; border-radius:50%; background:#2563eb; margin-top:8px; flex-shrink:0;"></span>
                            <span style="white-space:pre-wrap; word-break:keep-all;">${this.escapeHtml(line)}</span>
                        </div>
                    `).join('')}
                </div>`;
        }
        const startHour = time => {
            const m = String(time || '').match(/(\d{1,2}):(\d{2})/);
            return m ? Number(m[1]) + Number(m[2]) / 60 : 13;
        };
        const isSpecial = text => /노조|청렴|체육|입교|수료|설문|평가|안내/.test(text || '');
        const cleanSubject = text => this.cleanLine(text)
            .replace(/\n+/g, ' ')
            .replace(/\s*\(([^)]{1,18})\)\s*/g, ' ($1)')
            .trim();
        const addUnique = (arr, value) => {
            const v = cleanSubject(value);
            if (!v || /점심\s*식사/.test(v)) return;
            if (!arr.some(x => x === v)) arr.push(v);
        };
        const summaries = parsed.days.map((day, dayIdx) => {
            const item = { ...day, morning: [], afternoon: [] };
            parsed.rows.forEach(row => {
                const val = row.cells[dayIdx];
                if (!val) return;
                if (startHour(row.time) < 12) addUnique(item.morning, val);
                else addUnique(item.afternoon, val);
            });
            return item;
        });
        const chip = text => {
            const special = isSpecial(text);
            return `
                <div style="padding:7px 9px; border-radius:9px; border:1px solid ${special ? '#fed7aa' : '#dbeafe'}; background:${special ? '#fff7ed' : '#eff6ff'}; color:${special ? '#9a3412' : '#0f3f73'}; font-size:12px; font-weight:900; line-height:1.35; word-break:keep-all;">
                    ${this.escapeHtml(text)}
                </div>`;
        };
        const sessionBlock = (label, items) => `
            <div style="display:flex; flex-direction:column; gap:7px;">
                <div style="display:flex; align-items:center; gap:6px; color:#475569; font-size:11px; font-weight:900;">
                    <span style="width:6px; height:6px; border-radius:50%; background:${label === '오전' ? '#2563eb' : '#16a34a'};"></span>${label} 세션
                </div>
                ${items.length ? items.map(chip).join('') : '<div style="color:#cbd5e1; font-size:12px; font-weight:800;">-</div>'}
            </div>`;
        return `
            <div style="display:grid; grid-template-columns:repeat(${Math.min(summaries.length, 5)}, minmax(0, 1fr)); gap:12px;">
                ${summaries.map(day => `
                    <div style="background:#fff; border:1px solid #dbe4f0; border-radius:14px; overflow:hidden; min-height:220px;">
                        <div style="background:#0f3f73; color:#fff; padding:10px 12px; text-align:center;">
                            <div style="font-size:13px; font-weight:900;">${this.escapeHtml(day.date || '-')}</div>
                            <div style="font-size:12px; font-weight:800; opacity:0.82; margin-top:2px;">${this.escapeHtml(day.weekday || '')}</div>
                        </div>
                        <div style="padding:12px; display:flex; flex-direction:column; gap:12px;">
                            ${sessionBlock('오전', day.morning)}
                            <div style="height:1px; background:#e2e8f0;"></div>
                            ${sessionBlock('오후', day.afternoon)}
                        </div>
                    </div>
                `).join('')}
            </div>`;
    },
    load: async function() {
        const body = document.getElementById('scheduleBody');
        const title = document.getElementById('scheduleCourseName');
        const meta = document.getElementById('scheduleMeta');
        if (!body) return;
        if (!state.room) {
            body.innerHTML = '<div style="height:260px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-weight:800;">먼저 강의실을 선택하세요.</div>';
            return;
        }
        body.innerHTML = '<div style="height:260px; display:flex; align-items:center; justify-content:center; color:#94a3b8; font-weight:800;">교육시간표를 불러오는 중입니다.</div>';
        try {
            const settingsSnap = await firebase.database().ref(`courses/${state.room}/settings`).once('value');
            const settings = settingsSnap.val() || {};
            let data = settings.schedule || {};
            if (!(Array.isArray(data.lines) && data.lines.length) && !data.text) {
                try {
                    const snap = await firebase.database().ref(`courses/${state.room}/schedule`).once('value');
                    data = snap.val() || {};
                } catch (courseScheduleErr) {
                    console.warn('[교육시간표] courses schedule 읽기 실패:', courseScheduleErr);
                }
            }
            let lines = Array.isArray(data.lines) ? data.lines : String(data.text || '').split(/[\n\r]+/).filter(Boolean);

            if (!lines.length) {
                let rosters = {};
                let coordRosters = {};
                try {
                    const rosterSnap = await firebase.database().ref('system/dorm/rosters').once('value');
                    rosters = rosterSnap.val() || {};
                } catch (dormRosterErr) {
                    console.warn('[교육시간표] 생활관 명단 저장소 읽기 실패:', dormRosterErr);
                }
                try {
                    const coordRosterSnap = await firebase.database().ref('system/coord/rosters').once('value');
                    coordRosters = coordRosterSnap.val() || {};
                } catch (coordRosterErr) {
                    console.warn('[교육시간표] 운영부 명단 저장소 읽기 실패:', coordRosterErr);
                }
                const norm = v => String(v || '').replace(/\s+/g, '').trim();
                const dormCandidates = Object.values(rosters)
                    .filter(r => r && r.room === state.room && r.schedule)
                    .map(r => ({
                        ...r.schedule,
                        courseName: r.courseName || '',
                        period: r.period || '',
                        weekKey: r.weekKey || '',
                        _score:
                            (norm(r.courseName) && norm(r.courseName) === norm(settings.courseName) ? 100 : 0) +
                            (norm(r.period) && norm(r.period) === norm(settings.period) ? 20 : 0) +
                            Number(r.updatedAt || r.schedule.savedAt || 0) / 10000000000000
                    }));
                const coordCandidates = Object.values(coordRosters)
                    .filter(r => r && r.room === state.room && r.schedule)
                    .map(r => ({
                        ...r.schedule,
                        courseName: r.courseName || '',
                        period: r.period || '',
                        _score:
                            (norm(r.courseName) && norm(r.courseName) === norm(settings.courseName) ? 100 : 0) +
                            (norm(r.period) && norm(r.period) === norm(settings.period) ? 20 : 0) +
                            Number(r.savedAt || r.schedule.savedAt || 0) / 10000000000000
                    }));
                const candidates = dormCandidates.concat(coordCandidates)
                    .sort((a, b) => b._score - a._score);
                if (candidates.length) {
                    data = candidates[0];
                    lines = Array.isArray(data.lines) ? data.lines : String(data.text || '').split(/[\n\r]+/).filter(Boolean);
                }
            }
            const courseName = data.courseName || settings.courseName || '교육시간표';
            const period = data.period || settings.period || '';
            if (title) title.innerText = courseName;
            if (meta) {
                const source = data.source ? ` · 원본: ${data.source}` : '';
                meta.innerText = `${period || '기간 미설정'}${source}`;
            }
            if (!lines.length) {
                body.innerHTML = `
                    <div style="height:260px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#94a3b8; font-weight:800; gap:10px; text-align:center;">
                        <i class="fa-regular fa-calendar-xmark" style="font-size:42px; color:#cbd5e1;"></i>
                        <div>업로드된 교육시간표가 없습니다.</div>
                        <div style="font-size:13px; font-weight:700;">교육지원부/생활관 플랫폼에서 명단 파일을 업로드하고 저장하면 이곳에 표시됩니다.</div>
                    </div>`;
                return;
            }
            body.innerHTML = this.renderSchedule(lines);
        } catch (e) {
            console.error('[교육시간표 로드]', e);
            body.innerHTML = '<div style="height:260px; display:flex; align-items:center; justify-content:center; color:#ef4444; font-weight:900;">교육시간표를 불러오지 못했습니다.</div>';
        }
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

    // GitHub에 올린 입교안내 PDF의 raw URL (파일 교체 시 이 URL만 수정)
    GUIDE_PDF_URL: 'https://raw.githubusercontent.com/kac-edu/CATC/main/%EC%9E%85%EA%B5%90%EC%95%88%EB%82%B4.pdf',

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
        });

        // 휴대용 프레젠터(포인터) 및 키보드 방향키 지원
        // - 입교안내 탭이 활성화된 동안 항상 작동 (전체화면 불필요)
        // - 프레젠터 기기: 다음→ PageDown/ArrowRight, 이전← PageUp/ArrowLeft
        document.addEventListener('keydown', (e) => {
            if (state.currentMode !== 'guide') return;
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
                ? '🏢 항기원 전체 공지가 업데이트되었습니다'
                : '📋 운영부 과정 공지가 업데이트되었습니다';
        }
        content.innerText = msg;
        modal.style.display = 'flex';
    },

    // 탭 전환 시 PDF 재렌더링 (setMode에서 호출)
    // 현재 방 캐시에 pdfDoc이 있으면 저장된 페이지 그대로 재개,
    // 없으면 GitHub URL에서 on-demand 로드 (첫 진입 시)
    refresh: function() {
        const slot = guideMgr._slot();
        if (slot.pdfDoc) {
            guideMgr.isRendering = false;
            guideMgr.renderPage(slot.pageNum);
        } else {
            guideMgr.loadPDF(guideMgr.GUIDE_PDF_URL);
        }
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
            const loadingTask = pdfjsLib.getDocument(url);
            const pdfDoc = await loadingTask.promise;
            // 로드 완료 후 해당 방 슬롯에만 저장
            if (!guideMgr._roomCache[targetRoom]) {
                guideMgr._roomCache[targetRoom] = { pdfDoc: null, pageNum: 1 };
            }
            guideMgr._roomCache[targetRoom].pdfDoc = pdfDoc;
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
        if (!slot.pdfDoc || guideMgr.isRendering) return;
        guideMgr.isRendering = true;

        try {
            const page = await slot.pdfDoc.getPage(num);
            const canvas = document.getElementById('guideCanvas');
            if (!canvas) { guideMgr.isRendering = false; return; }

            // 스케일 계산
            const unscaledViewport = page.getViewport({scale: 1.0});
            const wrapper = document.getElementById('pdfWrapper');
            const containerW = (wrapper ? wrapper.clientWidth : window.innerWidth) - 2;
            const dpr = window.devicePixelRatio || 1;

            let cssScale = containerW / unscaledViewport.width;
            if (document.fullscreenElement) {
                const hScale = (window.innerHeight * 0.95) / unscaledViewport.height;
                cssScale = Math.min(cssScale, hScale);
            }
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
            canvas.style.width  = Math.floor(viewport.width  / dpr) + 'px';
            canvas.style.height = Math.floor(viewport.height / dpr) + 'px';
            const ctx = canvas.getContext('2d');
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.drawImage(offscreen, 0, 0);

            guideMgr.isRendering = false;
            // 렌더링 완료 후 현재 방 슬롯에 페이지 번호 저장
            guideMgr._slot().pageNum = num;

            const indicator = document.getElementById('guidePageInfo');
            if (indicator) indicator.innerText = `${num} / ${slot.pdfDoc.numPages}`;

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
        const newPage = slot.pageNum + offset;
        if (newPage > 0 && newPage <= slot.pdfDoc.numPages) {
            guideMgr.renderPage(newPage);
        }
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
    if (!profName) return;

    // 1) 캐시에 있으면 즉시 반영 (지연 없음)
    if (this._profKakaoCache && Object.prototype.hasOwnProperty.call(this._profKakaoCache, profName)) {
        const cached = (this._profKakaoCache[profName] || '').trim();
        if (cached) kakaoInput.value = cached;
        return;
    }
    // 2) 캐시에 없으면 즉시 조회 후 반영 + 캐시에 저장
    firebase.database().ref(`system/professorProfiles/${profName}/kakaoLink`).once('value', s => {
        const link = (s.val() || '').trim();
        if (!this._profKakaoCache) this._profKakaoCache = {};
        this._profKakaoCache[profName] = link;
        if (link) kakaoInput.value = link;
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
        // 기본값: 차량신청(shuttle) + 외출/외박(adminAction)만 ON, 나머지는 강사가 수동 체크
        const features = s.menuFeatures || {};
        const defaultOn = ['shuttle', 'adminAction'];
        const featureKeys = ['facility','shuttle','adminAction','meal','attendanceQr','cns','tabletLoan'];
        featureKeys.forEach(key => {
            const el = document.getElementById(`feat-${key}`);
            if (!el) return;
            if (Object.keys(features).length === 0) {
                // DB에 저장된 값 없으면 기본값 적용
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
            { val: rawPw,       id: 'setup-room-pw',       label: '암호' },
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
        updates[`courses/${state.room}/settings/password`] = btoa(rawPw);
        // 카카오톡 오픈톡방 링크 (선택) — 입력값 정리 후 저장
        const kakaoLinkVal = (document.getElementById('setup-kakao-link')?.value || '').trim();
        updates[`courses/${state.room}/settings/kakaoLink`] = kakaoLinkVal;
        // 전면 현황판 총괄표 노출 여부 — 체크 해제 시 hideFromBoard=true (총괄표에서 숨김)
        const showOnBoard = document.getElementById('setup-show-on-board');
        updates[`courses/${state.room}/settings/hideFromBoard`] = showOnBoard ? !showOnBoard.checked : false;
        
        // ★ 수정: 호텔 예약 방식으로 선택된 날짜 범위 ("시작일 ~ 종료일")를 그대로 저장합니다.
        updates[`courses/${state.room}/settings/period`] = periodRange;
        
        updates[`courses/${state.room}/settings/roomDetailName`] = roomName;
        updates[`courses/${state.room}/settings/coordinatorName`] = coordName;
        updates[`courses/${state.room}/status/professorName`] = profName;
        updates[`courses/${state.room}/status/roomStatus`] = 'active';
        updates[`courses/${state.room}/status/ownerSessionId`] = state.sessionId;

        // menuFeatures: 체크박스 상태 저장 (false일 때만 명시, true는 기본값)
        const featureKeys = ['facility','shuttle','adminAction','meal','attendanceQr','cns','tabletLoan'];
        const menuFeatures = {};
        featureKeys.forEach(key => {
            const el = document.getElementById(`feat-${key}`);
            menuFeatures[key] = el ? el.checked : true;
        });
        updates[`courses/${state.room}/settings/menuFeatures`] = menuFeatures;

        const self = this;
        const commitUpdates = () => {
            firebase.database().ref().update(updates).then(() => {
            document.getElementById('courseNameInput').value = name;
            document.getElementById('roomPw').value = rawPw;
            document.getElementById('displayCourseTitle').innerText = name;
            localStorage.setItem('last_owned_room', state.room);
            
            ui.showAlert("✅ 설정이 저장되었습니다.");
            
            // 1. 팝업창 닫기
            self.closeSetupModal();

            // 2. [핵심 추가] 즉시 방에 다시 입장하여 잠금 화면을 치우고 대시보드를 보여줌
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





// 파일 맨 아래 window.onload 부분도 이렇게 깔끔하게 바꿔야 실시간이 작동합니다!
window.onload = function() { 
    dataMgr.checkMobile(); 
    profMgr.init();   
    coordMgr.init(); 
    guideMgr.init();
    ui.startHeaderClock(); // 헤더 날짜/시간 시계 시작
    dataMgr.initSystem(); 
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
        } while (num === this._prevNum);
        return num;
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
            .filter(c => c.startDate <= targetSun && c.endDate >= targetMon)
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

        for (let i = 0; i < openRooms.length; i++) {
            const room = openRooms[i];
            const course = pool[i];
            const prevName = ((curRooms[room] || {}).settings || {}).courseName || '';

            if (course) {
                // [Clean Start] 과정명이 바뀌었거나 현재 비어 있는 방에 새 과정 배치 시 데이터 소거.
                //  "과정명이 같으면 리셋하지 말고, 없는 과정이면 리셋 후 배치" 규칙 적용.
                if (course.name !== prevName) {
                    Object.assign(updates, this._cleanStartUpdates(room));
                    wiped.push(`${room}(${prevName || '비어있음'}→${course.name})`);
                }
                updates[`courses/${room}/settings/courseName`] = course.name;
                updates[`courses/${room}/settings/period`]     = course.period;
                // [수정] coord 표기 차이(공백/직급)를 흡수해 명단의 정식 이름으로 정규화. 매칭 실패 시 원문 유지
                const coordFull = coordMgr.matchName(course.coord) || (course.coord || '');
                updates[`courses/${room}/settings/coordinatorName`] = coordFull;
                updates[`courses/${room}/status/professorName`] = course.prof;
                updates[`courses/${room}/status/roomStatus`]   = 'active';
                updates[`courses/${room}/settings/kakaoLink`]  = _kakaoOf(course.prof);
                updates[`courses/${room}/status/ownerSessionId`] = null;
                assigned.push(`${room}: ${course.name}`);
            }
            // course 가 없으면(배정 대상 없음) 기존 동작 유지: 방을 건드리지 않는다.
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
            [`${rPath}/expectedStudents`]:    null,
            [`${rPath}/activeQuiz`]:          null,
            [`${rPath}/quizFinalResults`]:    null,
            [`${rPath}/attendanceQR`]:        null,
            [`${rPath}/boardNotice`]:         "",
            [`${rPath}/notice`]:              "",
            [`${rPath}/coordNotice`]:         "",
            [`${rPath}/coordNoticeHistory`]:  null,
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

            // 수동 리셋되어 이번 주 배치 제외할 과정
            const dismissed = await this._getDismissedSet(targetMon);

            // 대상 주에 걸치는 과정명 집합 (dismissed 제외)
            const expected = new Set(
                courses
                    .filter(c => c.startDate && c.endDate && c.startDate <= targetSun && c.endDate >= targetMon)
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

            if (needsUpdate) {
                // 진행 중 방·잠금 방은 보존하고, dismissed는 제외하는 keep-in-place 동기화 사용
                await this._syncRoomsLockAware(courses);
                console.log('[annualPlanMgr] 자동 재배치 완료 (대상 주:', targetMon, '~', targetSun, ')');
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
                weekKey:   c.weekKey || (c.startDate ? this._getMondayOf(c.startDate) : '')
            }))
            .sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''));
        this.renderEditor();
    } catch (e) {
        area.innerHTML = `<p style='padding:20px; color:#ef4444;'>불러오기 오류: ${this._escapeHtml(e.message)}</p>`;
        console.error('[annualPlanMgr] openEditorModal 오류:', e);
    }
};

annualPlanMgr.renderEditor = function() {
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
    let html = `
        <div style="position:sticky; top:0; z-index:11; display:flex; gap:14px; flex-wrap:wrap; padding:0 12px; height:37px; box-sizing:border-box; font-size:12px; color:#475569; align-items:center; background:#fff; border-bottom:1px solid #e2e8f0;">
            <span style="font-weight:800;">상태 색상:</span>
            <span><span style="display:inline-block; width:12px; height:12px; border-radius:3px; background:#dbeafe; vertical-align:middle; margin-right:4px;"></span>진행 중</span>
            <span><span style="display:inline-block; width:12px; height:12px; border-radius:3px; background:#fce7f3; vertical-align:middle; margin-right:4px;"></span>차주 진행 예정</span>
            <span><span style="display:inline-block; width:12px; height:12px; border-radius:3px; background:#dcfce7; vertical-align:middle; margin-right:4px;"></span>예정</span>
            <span><span style="display:inline-block; width:12px; height:12px; border-radius:3px; background:#f1f5f9; vertical-align:middle; margin-right:4px;"></span>종료</span>
        </div>
        <table style="width:100%; border-collapse:collapse; font-size:13px;">
            <thead style="position:sticky; top:37px; background:#f8fafc; z-index:10;">
                <tr>
                    <th style="width:48px; padding:10px; border:1px solid #e2e8f0;">No</th>
                    <th style="padding:10px; border:1px solid #e2e8f0; min-width:220px;">과정명</th>
                    <th style="width:140px; padding:10px; border:1px solid #e2e8f0;">시작일</th>
                    <th style="width:140px; padding:10px; border:1px solid #e2e8f0;">종료일</th>
                    <th style="width:110px; padding:10px; border:1px solid #e2e8f0;">담임교수</th>
                    <th style="width:120px; padding:10px; border:1px solid #e2e8f0;">운영담당</th>
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

    this.currentEditingData.forEach((c, idx) => {
        const isCur = c.startDate && c.endDate && c.startDate <= _today && c.endDate >= _today;
        html += `
            <tr data-cur="${isCur ? '1' : '0'}" data-target="${idx === _targetIdx ? '1' : '0'}" style="${rowBg(c)}">
                <td style="${cellStyle} text-align:center; color:#64748b;">${idx + 1}</td>
                <td style="${cellStyle}"><input type="text" value="${esc(c.name)}" onchange="annualPlanMgr.updateLocalData(${idx},'name',this.value)" style="${inpStyle} font-weight:700;"></td>
                <td style="${cellStyle}"><input type="date" value="${esc(c.startDate)}" onchange="annualPlanMgr.updateLocalData(${idx},'startDate',this.value)" style="${inpStyle}"></td>
                <td style="${cellStyle}"><input type="date" value="${esc(c.endDate)}" onchange="annualPlanMgr.updateLocalData(${idx},'endDate',this.value)" style="${inpStyle}"></td>
                <td style="${cellStyle}"><input type="text" value="${esc(c.prof)}" onchange="annualPlanMgr.updateLocalData(${idx},'prof',this.value)" style="${inpStyle}"></td>
                <td style="${cellStyle}"><input type="text" value="${esc(c.coord)}" onchange="annualPlanMgr.updateLocalData(${idx},'coord',this.value)" style="${inpStyle}"></td>
                <td style="${cellStyle} text-align:center;"><button onclick="annualPlanMgr.deleteRow(${idx})" title="삭제" style="color:#ef4444; border:none; background:none; cursor:pointer; font-size:16px; font-weight:800;">✕</button></td>
            </tr>`;
    });
    html += `</tbody></table>`;
    area.innerHTML = html;

    // 진행 중(없으면 차주/다가오는) 과정 행을 화면 중앙으로 스크롤
    setTimeout(() => {
        const targetRow = area.querySelector('tr[data-target="1"]') || area.querySelector('tr[data-cur="1"]');
        if (targetRow && targetRow.scrollIntoView) targetRow.scrollIntoView({ block: 'center' });
    }, 50);
};

annualPlanMgr.updateLocalData = function(idx, field, value) {
    const c = this.currentEditingData[idx];
    if (!c) return;
    c[field] = value;
    if (field === 'startDate' || field === 'endDate') {
        c.period  = (c.startDate && c.endDate) ? `${c.startDate} ~ ${c.endDate}` : '';
        c.weekKey = c.startDate ? this._getMondayOf(c.startDate) : '';
        // 날짜가 바뀌면 상태 색상도 갱신되도록 다시 그린다 (입력 포커스 유지를 위해 약간 지연)
        setTimeout(() => this.renderEditor(), 0);
    }
};

annualPlanMgr.addRow = function() {
    document.getElementById('ca-name').value = '';
    document.getElementById('ca-start').value = '';
    document.getElementById('ca-end').value = '';
    document.getElementById('ca-err').innerText = '';
    document.getElementById('courseAddPop').style.display = 'flex';
    setTimeout(() => document.getElementById('ca-name').focus(), 100);
};

annualPlanMgr.confirmAdd = function() {
    const name = (document.getElementById('ca-name').value || '').trim();
    const start = document.getElementById('ca-start').value;
    const end = document.getElementById('ca-end').value;
    const err = document.getElementById('ca-err');
    if (!name) { err.innerText = '과정명을 입력하세요.'; return; }
    if (!start || !end) { err.innerText = '시작일과 종료일을 입력하세요.'; return; }
    if (end < start) { err.innerText = '종료일이 시작일보다 빠를 수 없습니다.'; return; }
    // 새 과정 추가 후 시작일 순으로 정렬 (날짜에 맞는 위치에 들어가도록)
    this.currentEditingData.push({
        no: 0, name, startDate: start, endDate: end,
        period: `${start} ~ ${end}`, prof: '', coord: '',
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
        const row = area.querySelectorAll('tbody tr')[idx];
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
    this.currentEditingData.splice(idx, 1);
    this.renderEditor();
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
                weekKey:   this._getMondayOf(c.startDate)
            }));

        // 1) 마스터 계획 저장 (keyed object 규약 c0,c1,... 유지)
        const planData = {};
        clean.forEach((c, i) => { planData[`c${i}`] = c; });
        await firebase.database().ref(this.PLAN_KEY).set(planData);

        // 2) 잠금 인식 룸 재배치
        await this._syncRoomsLockAware(clean);

        ui.hideLoading();
        ui.showAlert(`✅ 저장 및 실시간 동기화가 완료되었습니다. (${clean.length}개 과정)`);
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
    courses.forEach(c => { if (c.name) planByName[norm(c.name)] = c; });

    // 대상 주에 걸치는 과정 풀 (시작일 순)
    let pool = courses
        .filter(c => c.startDate && c.endDate)
        .filter(c => c.startDate <= targetSun && c.endDate >= targetMon)
        .sort((a, b) => a.startDate.localeCompare(b.startDate));

    // 수동 리셋된 과정은 이번 대상 주 배치에서 제외 (되살아나지 않도록)
    const dismissed = await this._getDismissedSet(targetMon);
    if (dismissed.size) {
        pool = pool.filter(c => !dismissed.has(`${norm(c.name)}|${norm(c.period)}`));
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
            // 잠금 방 제외: 연간계획의 최신 교수·담당·기간으로 갱신 (데이터는 건드리지 않음)
            if (!locked && planByName[nm]) {
                const pc = planByName[nm];
                const coordFull = (typeof coordMgr !== 'undefined' && coordMgr.matchName ? coordMgr.matchName(pc.coord) : '') || (pc.coord || '');
                updates[`courses/${r}/settings/period`] = pc.period;
                updates[`courses/${r}/settings/coordinatorName`] = coordFull;
                updates[`courses/${r}/status/professorName`] = pc.prof;
                updates[`courses/${r}/settings/kakaoLink`] = kakaoOf(pc.prof);
            }
            return; // 방 자체는 유지
        }

        // ── 열린 방 & 대상 주 과정 아님 → 비우고 재배치 대상 ──
        updates[`courses/${r}/settings/courseName`] = '';
        updates[`courses/${r}/settings/period`]     = '';
        updates[`courses/${r}/settings/coordinatorName`] = null;
        updates[`courses/${r}/status/professorName`] = '';
        updates[`courses/${r}/status/roomStatus`]   = 'idle';
        updates[`courses/${r}/status/ownerSessionId`] = null;
        freeRooms.push(r);
    });

    // 2) 풀에서 '보존된 방에 이미 있는 과정명' 제외 → 나머지만 빈 방에 배치
    const toPlace = pool.filter(c => !keptNames.has(norm(c.name)));

    for (let i = 0; i < Math.min(freeRooms.length, toPlace.length); i++) {
        const room = freeRooms[i];
        const course = toPlace[i];

        // [Clean Start] 새 과정 배치 시 이전 기수 데이터 일괄 소거
        //  (학생 명단·출결·질문·설문·셔틀·석식 등 전부 초기화 → 이전 기수 잔류 방지)
        Object.assign(updates, annualPlanMgr._cleanStartUpdates(room));

        const coordFull = (typeof coordMgr !== 'undefined' && coordMgr.matchName ? coordMgr.matchName(course.coord) : '') || (course.coord || '');
        updates[`courses/${room}/settings/courseName`] = course.name;
        updates[`courses/${room}/settings/period`]     = course.period;
        updates[`courses/${room}/settings/coordinatorName`] = coordFull;
        updates[`courses/${room}/status/professorName`] = course.prof;
        updates[`courses/${room}/status/roomStatus`]   = 'active';
        updates[`courses/${room}/settings/kakaoLink`]  = kakaoOf(course.prof);
        updates[`courses/${room}/status/ownerSessionId`] = null;
    }
    if (Object.keys(updates).length) {
        await firebase.database().ref().update(updates);
        console.log('[annualPlanMgr] 동기화 완료. 대상주:', targetMon, '~', targetSun, '/ 보존:', [...keptNames].filter(Boolean).length, '/ 신규:', Math.min(freeRooms.length, toPlace.length));
    }
};

/* 강사 플랫폼 로드 시 자동 만료 체크 */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
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
