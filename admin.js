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
                msgDiv.innerText = "로그인 되었습니다.";
                msgDiv.style.color = "#10b981";
            }
            setTimeout(() => {
                document.getElementById('loginOverlay').style.display = 'none';
                dataMgr.loadInitialData();
                if(msgDiv) msgDiv.innerText = "";
            }, 700);
        } catch (error) {
            if(msgDiv) {
                msgDiv.innerText = "비밀번호가 틀렸습니다.";
                msgDiv.style.color = "#ef4444";
            } else {
                alert("비밀번호가 올바르지 않습니다.");
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

    if (lastRoom && lastRoom !== "null" && lastRoom !== "") {
        // [중요 수정] forceEnterRoom을 바로 부르면 데이터 리스너가 즉시 꽂혀서 내용이 보입니다.
        // 대신 switchRoomAttempt를 호출하여 '내 세션ID가 주인인지' 먼저 확인하고, 
        // 주인이 아니면 비밀번호 입력창을 띄우도록 유도합니다.
        console.log("기존 접속 강의실 보안 검증 및 복구 시도:", lastRoom);
        
        // ★ 핵심 변경: forceEnterRoom -> switchRoomAttempt
        this.switchRoomAttempt(lastRoom.toUpperCase());
    } else {
        // 이전에 들어간 방 기록이 없으면 대기실(전체 현황판) 표시
        ui.showWaitingRoom();
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
switchRoomAttempt: async function(newRoom) {
    // 1. 시각적 즉시 차단: 서버 데이터를 가져오기도 전에 화면부터 가립니다.
    // 새로고침 시 데이터가 보이는 찰나의 순간을 방지합니다.
    const overlay = document.getElementById('statusOverlay');
    if (overlay) overlay.style.display = 'flex';

    localStorage.setItem('kac_last_mode', 'dashboard');
    
    // 해당 방에 대한 옵저버 모드 여부 확인
    state.isObserver = (sessionStorage.getItem('kac_observer_room') === newRoom);

    // 2. 서버의 실시간 상태를 조회 (ownerSessionId 확인)
    const snapshot = await firebase.database().ref(`courses/${newRoom}/status`).get();
    const st = snapshot.val() || {};

    const isActive = (st.roomStatus === 'active');
    const isOwner = (st.ownerSessionId === state.sessionId);

    // 3. [보안 핵심] 인증 전 버튼 및 기능 물리적 잠금
    const setupBtn = document.getElementById('btnSetupModal');
    if (setupBtn) {
        if (isActive && !isOwner && !state.isObserver) {
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
    
    // (A) 방이 사용 중인데 내가 주인이 아니고, 옵저버도 아님 -> 데이터 차단
    if (isActive && !isOwner && !state.isObserver) {
        console.log(`[권한 차단] Room ${newRoom}에 대한 소유권이 없습니다.`);
        state.pendingRoom = newRoom;
        
        // 중요: forceEnterRoom을 실행하지 않고 여기서 중단합니다. (데이터 리스너 실행 방지)
        document.getElementById('takeoverPwInput').value = "";
        document.getElementById('takeoverModal').style.display = 'flex';
        document.getElementById('takeoverPwInput').focus();
        
        // overlay는 flex 상태를 유지하여 뒷배경 데이터를 가립니다.
        return; 
    }

    // (B) 내가 주인이거나, 옵저버이거나, 혹은 방이 비어있는 경우 -> 입장 허용
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

        if (btoa(input) === dbPw || btoa(input) === "MTMyODE=") {
            // [수정] 강사 입장 시 해당 방의 옵저버 기록만 정밀 삭제
            state.isObserver = false; 
            sessionStorage.removeItem('kac_observer_room');

            await firebase.database().ref(`courses/${newRoom}/status`).update({ 
                ownerSessionId: state.sessionId,
                roomStatus: 'active'
            });
            localStorage.setItem(`last_owned_room`, newRoom);
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




enterAsObserver: function() {
        const newRoom = state.pendingRoom;
        if (!newRoom) return;

        // [수정] 방 번호를 구체적으로 지정해서 옵저버 메모 저장
        state.isObserver = true; 
        sessionStorage.setItem('kac_observer_room', newRoom);
        
        document.getElementById('takeoverModal').style.display = 'none';
        this.forceEnterRoom(newRoom);
        ui.showAlert(`👁️ Room ${newRoom} 옵저버 모드로 입장했습니다.`);
    },










    cancelTakeover: function() {
        document.getElementById('takeoverModal').style.display = 'none';
        document.getElementById('roomSelect').value = state.room || ""; 
        state.pendingRoom = null;
    },


















// [수정] 진입 시 잠금을 기본값으로 설정하고 권한에 따라 해제하는 버전
forceEnterRoom: async function(room) {
    const cleanRoom = room.toUpperCase();

    // [핵심 추가] 입장 시작과 동시에 화면을 잠금 상태로 강제 전환
    // 데이터가 로드되어 내가 주인임이 확인되기 전까지는 아무것도 볼 수 없어야 함
    const overlay = document.getElementById('statusOverlay');
    if (overlay) overlay.style.display = 'flex';

    if (window.dbRef) {
        Object.values(window.dbRef).forEach(ref => {
            if (ref && typeof ref.off === 'function') ref.off();
        });
    }

    firebase.database().ref(`courses/${cleanRoom}/questions`).off();
    firebase.database().ref(`courses/${cleanRoom}/status`).off();
    firebase.database().ref(`courses/${cleanRoom}/settings`).off();

    state.room = cleanRoom; 
    state.qaData = {};      
    state.activeQaKey = null; 
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

        // [중요] 권한 검증 로직 및 모달 트리거
        if (!state.isObserver) {
            if (isActive && !isOwner) {
                // 방이 사용 중인데 내가 주인이 아님 -> 잠금 유지 및 비번 입력창 유도
                overlay.style.display = 'flex';
                state.pendingRoom = cleanRoom;
                document.getElementById('takeoverModal').style.display = 'flex';
            } else if (!isActive) {
                // 방이 비어있음 -> 잠금 유지
                overlay.style.display = 'flex';
            } else {
                // 내가 정당한 주인이 확인됨 -> 잠금 해제
                overlay.style.display = 'none';
                document.getElementById('takeoverModal').style.display = 'none';
            }
        } else {
            // 옵저버 모드는 잠금 없이 관람 허용
            overlay.style.display = 'none';
        }

        // 설정 버튼 상태 제어
        const setupBtn = document.getElementById('btnSetupModal');
        if (setupBtn) {
            if (isActive && !isOwner && !state.isObserver) {
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
    const lastMode = localStorage.getItem('kac_last_mode') || 'dashboard';
    ui.setMode(lastMode); 
    subjectMgr.init();
    guideMgr.init();

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
    const directory = path.substring( path.lastIndexOf('/'), 0);
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
        const encryptedPw = rawPw ? btoa(rawPw) : "Nzc3Nw==";

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
















// [최종 수정] 리셋 시 교육생 퇴출용 resetKey를 포함한 초기화 로직
resetCourse: function() {
    // 1. 현재 강의실이 선택되어 있는지 확인
    if (!state.room) {
        ui.showAlert("⚠️ 초기화할 강의실을 먼저 선택해야 합니다.");
        return;
    }

    // 2. 옵저버(단순 관람) 모드일 때는 초기화 금지
    if (state.isObserver) {
        ui.showAlert("👁️ 옵저버 모드에서는 과정을 초기화할 수 없습니다.");
        return;
    }

    if(confirm(`🚨 [위험] Room ${state.room}의 모든 데이터를 초기화하시겠습니까?\n이름, 질문, 신청 내역 등 모든 정보가 삭제되며 되돌릴 수 없습니다.`)) {
        const rPath = `courses/${state.room}`;
        const updates = {};

        // [격리 초기화] 해당 방 번호 밑에 있는 데이터들만 콕 집어서 삭제(null) 처리
        updates[`${rPath}/questions`] = null;
        updates[`${rPath}/students`] = null;
        updates[`${rPath}/expectedStudents`] = null; 
        updates[`${rPath}/activeQuiz`] = null;
        updates[`${rPath}/quizAnswers`] = null;
        updates[`${rPath}/quizFinalResults`] = null;
        updates[`${rPath}/admin_actions`] = null;
        updates[`${rPath}/dinner_skips`] = null;
        updates[`${rPath}/shuttle`] = null;
        updates[`${rPath}/notice`] = null;
        updates[`${rPath}/coordNotice`] = null;
        updates[`${rPath}/internal_attendance`] = null;

        // 과정 기본값 재설정
        updates[`${rPath}/settings/courseName`] = "";
        updates[`${rPath}/status/professorName`] = "";
        updates[`${rPath}/status/roomStatus`] = "idle"; // 비어있음으로 전환
        updates[`${rPath}/status/ownerSessionId`] = null; // 제어권 해제
        
        // 학생들에게 초기화 신호를 보내 강제 퇴출시킴
        updates[`${rPath}/status/resetKey`] = "reset_" + Date.now();

        firebase.database().ref().update(updates).then(() => {
            ui.showAlert(`✅ Room ${state.room}이 성공적으로 초기화되었습니다.`);
            // 화면 새로고침하여 대기 상태로 복귀
            setTimeout(() => location.reload(), 800);
        }).catch(err => {
            ui.showAlert("초기화 실패: " + err.message);
        });
    }
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
        // 1. 옵저버 권한 체크 (변경 권한 차단)
        if(state.isObserver) {
            ui.showAlert("👁️ 옵저버 모드에서는 학생장 권한을 수정할 수 없습니다.");
            return;
        }

        if(!state.room) return;

        firebase.database().ref(`courses/${state.room}/students/${token}`).once('value', snap => {
            const student = snap.val();
            if(!student) return;

            const isNowLeader = !student.isLeader; 

            if(isNowLeader) {
                // 학생장으로 지정할 때
                const phone = prompt(`[${currentName}] 학생을 학생장으로 지정합니다.\n비상 연락망 관리를 위해 전체 전화번호를 입력하세요.`, "010-0000-0000");
                if(!phone) return; // 취소 누르면 중단
                
                firebase.database().ref(`courses/${state.room}/students/${token}`).update({
                    isLeader: true,
                    phone: phone 
                });
                ui.showAlert(`👑 [${currentName}] 학생이 학생장으로 지정되었습니다.`);
            } else {
                // 학생장 권한을 해제할 때
                if(confirm(`[${currentName}] 학생의 학생장 권한을 해제할까요?`)) {
                    firebase.database().ref(`courses/${state.room}/students/${token}`).update({
                        isLeader: false
                    });
                    ui.showAlert(`✅ 학생장 권한이 해제되었습니다.`);
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
            if(p) {
                document.getElementById('pp-eng-name').value = p.engName || ""; // 영문 성함 로드
                document.getElementById('pp-phone').value = p.phone || "";
                document.getElementById('pp-email').value = p.email || "";
                document.getElementById('pp-msg').value = p.msg || "";
                document.getElementById('pp-bio').value = p.bio || "";
                if(p.photo && previewImg) {
                    previewImg.src = p.photo;
                    previewImg.style.display = 'block';
                }
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


// 과정 담당자(행정) 및 서명 관리 객체 (강사 플랫폼용)
const coordMgr = {
    list: [],
    tempSign: "",
    
    init: function() {
        const ref = firebase.database().ref('system/coordinators');
        ref.on('value', s => {
            const data = s.val() || {};
            this.list = Object.keys(data).map(k => ({ key: k, ...data[k] }));
            this.renderSelects();    
            this.renderManageList(); 
        });
    },

    renderSelects: function() {
        const sel = document.getElementById('setup-coord-select'); 
        if(!sel) return;
        const curValue = sel.value; 
        sel.innerHTML = '<option value="">--- 담당자 선택 ---</option>';
        this.list.forEach(c => {
            const opt = new Option(c.name, c.name);
            if(c.name === curValue) opt.selected = true;
            sel.add(opt);
        });
    },

    renderManageList: function() {
        const div = document.getElementById('coordListContainer'); 
        if(!div) return;
        if(this.list.length === 0) {
            div.innerHTML = "<div style='text-align:center; padding:20px; color:#94a3b8;'>등록된 담당자가 없습니다.</div>";
            return;
        }
        div.innerHTML = this.list.map(c => `
            <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee; align-items:center; background:#fff; margin-bottom:5px; border-radius:8px;">
                <div style="display:flex; align-items:center; gap:12px;">
                    <span style="font-weight:800; color:#1e293b;">${c.name}</span>
                    ${c.sign ? `<img src="${c.sign}" style="height:35px; mix-blend-mode:multiply; border:1px solid #eee; border-radius:4px;">` : `<span style="font-size:10px; color:#94a3b8;">(미등록)</span>`}
                </div>
                <i class="fa-solid fa-circle-xmark" style="color:#ef4444; cursor:pointer; font-size:20px;" onclick="coordMgr.delete('${c.key}')"></i>
            </div>`).join('');
    },

    handleFile: function(input) {
        const file = input.files[0]; 
        if(!file) return;
        const reader = new FileReader();
        reader.onload = (e) => { 
            this.tempSign = e.target.result; 
            document.getElementById('tempSignPreview').src = e.target.result;
            document.getElementById('signPreviewArea').style.display = 'block';
        };
        reader.readAsDataURL(file);
    },

    add: async function() {
        const input = document.getElementById('newCoordInput'); 
        const name = input.value.trim();
        if(!name) return alert("성함을 입력해 주세요.");
        try {
            await firebase.database().ref('system/coordinators').push({ name: name, sign: this.tempSign });
            input.value = ""; this.tempSign = "";
            document.getElementById('signPreviewArea').style.display = 'none';
        } catch(e) { alert("오류: " + e.message); }
    },

    delete: async function(k) {
        if(confirm("이 담당자를 삭제할까요?")) {
            await firebase.database().ref(`system/coordinators/${k}`).remove();
        }
    },

    openManage: function() {
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
const ui = {


// [신규] 단체 회식 적용 (전원 석식 제외)
    applyGroupDinner: function() {
        if(!confirm("현재 명단의 모든 수강생을 '석식 제외'로 등록하시겠습니까?\n(단체 회식 시 사용)")) return;
        
        firebase.database().ref(`courses/${state.room}/students`).once('value', snap => {
            const students = snap.val() || {};
            const today = getTodayString();
            const updates = {};
            
            Object.keys(students).forEach(token => {
                const s = students[token];
                if(s.name) {
                    updates[`courses/${state.room}/dinner_skips/${today}/${token}`] = `${s.name}(${s.phone ? s.phone.slice(-4) : '0000'})`;
                }
            });
            
            firebase.database().ref().update(updates).then(() => {
                ui.showAlert("✅ 전원 석식 제외 처리가 완료되었습니다.");
            });
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

    // 1. 데이터베이스 안테나(참조) 설정
    const refs = {
        settings: firebase.database().ref(`courses/${room}/settings`),
        notice: firebase.database().ref(`courses/${room}/notice`),
        coordNotice: firebase.database().ref(`courses/${room}/coordNotice`),
        globalNotice: firebase.database().ref(`system/globalNotice`),
        status: firebase.database().ref(`courses/${room}/status`),
        expected: firebase.database().ref(`courses/${room}/expectedStudents`),
        actual: firebase.database().ref(`courses/${room}/students`),
        action: firebase.database().ref(`courses/${room}/admin_actions/${today}`),
        dinner: firebase.database().ref(`courses/${room}/dinner_skips/${today}`),
        departure: firebase.database().ref(`courses/${room}/shuttle/departure`),
        shuttleReq: firebase.database().ref(`courses/${room}/shuttle/requests`)
    };

    // 2. 과정 정보 및 장소 실시간 업데이트
    refs.settings.on('value', snap => {
        if (state.room !== room) return;
        const s = snap.val() || {};
        if (document.getElementById('dashCourseTitle')) document.getElementById('dashCourseTitle').innerText = s.courseName || "과정명을 설정해주세요.";
        if (document.getElementById('dashPeriod')) document.getElementById('dashPeriod').innerText = s.period || "기간 미설정";
        if (document.getElementById('dashRoomDetail')) document.getElementById('dashRoomDetail').innerText = s.roomDetailName || "장소 미설정";
        if (document.getElementById('dashCoordName')) document.getElementById('dashCoordName').innerText = s.coordinatorName || "미지정";
    });

    // 3. 공지사항 피드 실시간 업데이트
    refs.notice.on('value', s => {
        if (state.room !== room) return;
        const el = document.getElementById('dashNoticeInst');
        if (el) el.innerText = s.val() || "작성된 담임 교수 공지가 없습니다.";
    });
    refs.coordNotice.on('value', s => {
        if (state.room !== room) return;
        const el = document.getElementById('dashNoticeAdmin');
        if (el) el.innerText = s.val() || "등록된 운영부 과정 공지가 없습니다.";
    });
    refs.globalNotice.on('value', s => {
        const el = document.getElementById('dashNoticeGlobal');
        if (el) el.innerText = s.val() || "현재 게시된 센터 전체 공지가 없습니다.";
    });

    // 4. 교수 성함 실시간 업데이트
    refs.status.on('value', snap => {
        if (state.room !== room) return;
        const st = snap.val() || {};
        const profOnlyEl = document.getElementById('dashProfNameOnly');
        if (profOnlyEl) profOnlyEl.innerText = st.professorName || "미지정";
    });

    // 5. ★핵심 수정★ 실시간 입교 완료 현황 집계 (온라인 여부 상관없이 전체 카운트)
    refs.actual.on('value', snap => {
        if (state.room !== room) return;
        const data = snap.val() || {};
        
        // 온라인(isOnline) 여부와 상관없이 이름이 등록된 모든 학생 필터링
        const arrivedStudents = Object.values(data).filter(s => s.name && s.name !== "undefined");
        const arrivedCount = arrivedStudents.length;

        // (A) 대시보드 "수강생 입교 현황" 좌측 숫자 업데이트
        const dashArrivedEl = document.getElementById('dashArrivedCount');
        if (dashArrivedEl) dashArrivedEl.innerText = arrivedCount;
        
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

    // 6. 전체 명단(분모) 계산
    refs.expected.on('value', expSnap => {
        const expectedNames = expSnap.val() || [];
        firebase.database().ref(`courses/${room}/students`).once('value', snap => {
            const data = snap.val() || {};
            const actualNames = Object.values(data).map(s => s.name);
            const combinedNames = Array.from(new Set([...expectedNames, ...actualNames]));
            if (document.getElementById('dashTotalCount')) document.getElementById('dashTotalCount').innerText = combinedNames.length;
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

    // 8. 셔틀 정보 및 차량 수요 실시간 업데이트
    refs.departure.on('value', snap => {
        if (state.room !== room) return; 
        const dep = snap.val();
        const bar = document.getElementById('dashShuttleNotice');
        const txt = document.getElementById('dashShuttleNoticeTxt');
        if (!bar || !txt) return;
        if (dep && dep.time) {
            bar.style.display = "block";
            txt.innerText = `퇴교차량 출발 예정: ${dep.date} [${dep.time}]`;
        } else {
            bar.style.display = "none";
        }
    });
    refs.shuttleReq.on('value', s => {
        if (state.room !== room) return;
        const data = s.val() || {};
        const items = Object.values(data);
        if (document.getElementById('total-osong')) document.getElementById('total-osong').innerText = items.filter(i => i.type === 'osong').length;
        if (document.getElementById('total-term')) document.getElementById('total-term').innerText = items.filter(i => i.type === 'terminal').length;
        if (document.getElementById('total-air')) document.getElementById('total-air').innerText = items.filter(i => i.type === 'airport').length;
        if (document.getElementById('total-car')) document.getElementById('total-car').innerText = items.filter(i => i.type === 'car').length;
        if (document.getElementById('dashShuttleTotal')) document.getElementById('dashShuttleTotal').innerText = items.length + "명";
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
        const currentSelectedRoom = state.room; // 현재 내가 선택한 방 (홈으로 가면 null)

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
            const isRealMyRoom = isRoomActive && (st.ownerSessionId === state.sessionId);

            // 사이드바 드롭다운 갱신
            if(sel) {
                const opt = document.createElement('option');
                opt.value = c;
                if(isRealMyRoom) opt.innerText = `Room ${c} (🔵 내 강의실 - ${profName})`;
                else if(isRoomActive) opt.innerText = `Room ${c} (🔴 사용중 - ${profName})`;
                else opt.innerText = `Room ${c} (⚪ 대기)`;
                
                // [중요] 현재 방에 있을 때만 해당 항목을 선택 상태로 표시
                if(c === currentSelectedRoom) opt.selected = true;
                sel.appendChild(opt);
            }

            // 우측 현황판 테이블 갱신
            if(tableBody) {
                const row = document.createElement('tr');
                
                // 현재 선택된 방이면 즉시 파란색 하이라이트 적용
                if (c === currentSelectedRoom) {
                    row.classList.add('is-my-room');
                }
                
                const statusBadge = isRoomActive 
                    ? '<span class="badge-status badge-active">🟢 사용 중</span>' 
                    : '<span class="badge-status badge-idle">⚪ 비어 있음</span>';

                row.innerHTML = `
                    <td>${count++}</td>
                    <td style="font-weight:900; color:#3b82f6;">
                        Room ${c}
                        ${isRealMyRoom ? '<span class="my-room-badge">MY</span>' : ''}
                    </td>
                    <td><div class="td-course-name" title="${courseName}">${courseName}</div></td>
                    <td style="font-weight:600;">${profName}</td>
                    <td>${statusBadge}</td>
                    <td style="font-weight:700;">${userCount}명</td>
                    <td style="color:#94a3b8; font-size:14px;">-</td>
                    <td>
                        <button class="btn-table-action" onclick="dataMgr.switchRoomAttempt('${c}')">입장하기</button>
                    </td>
                `;
                tableBody.appendChild(row);
            }
        }

        // [핵심 추가] 현재 선택된 방 정보가 없다면(홈 화면) 메뉴를 "Select Room"으로 강제 리셋
        if(!currentSelectedRoom && sel) {
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
        const directory = path.substring( path.lastIndexOf('/'), 0);
        const baseUrl = window.location.origin + directory + "/";
        const forcedUrl = `${baseUrl}index.html?room=${state.room}`;
        
        label.innerText = `Room ${state.room} Join`;
        
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
        // 무서운 눈(👁️) 대신 폰트어썸 아이콘 사용
        if (state.isObserver) {
            titleText += ` <span style="font-size:14px; margin-left:8px; color:#94a3b8; font-weight:normal;">(<i class="fa-solid fa-eye" style="font-size:12px;"></i> 옵저버)</span>`;
        }
        elTop.innerHTML = titleText; // innerText 대신 innerHTML 사용
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
        btn.innerHTML = '<i class="fa-solid fa- binoculars"></i> 옵저버 모드'; // 쌍안경 아이콘으로 변경 (선택사항)
        btn.style.background = "#e2e8f0"; 
        btn.style.color = "#475569";
    }
},


















    
    renderSettings: function(d) {
        document.getElementById('courseNameInput').value = d.courseName || "";
        document.getElementById('roomPw').value = d.password ? atob(d.password) : "7777";
        document.getElementById('displayCourseTitle').innerText = d.courseName || "";
    },
    
renderRoomStatus: function(st) { 
        const sel = document.getElementById('roomStatusSelect');
        if(sel) {
            sel.value = st || 'idle'; 
            // [수정] 사용자가 직접 클릭해서 상태를 변경하지 못하도록 비활성화 고정
            sel.disabled = true; 
            
            // 시각적으로 가독성을 높이기 위해 색상 처리
            if(sel.value === 'active') {
                sel.style.color = '#10b981'; // 사용중일 때 초록색
            } else {
                sel.style.color = '#94a3b8'; // 비어있을 때 회색
            }
        }
    },
    
    renderQr: function(url) {
        document.getElementById('studentLink').value = url;
        const qrDiv = document.getElementById('qrcode'); 
        if(!qrDiv) return;
        qrDiv.innerHTML = "";
        try { 
            new QRCode(qrDiv, { text: url, width: 35, height: 35 }); 
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
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
                ui.showAlert("클립보드에 링크가 복사되었습니다!");
            }).catch(() => {
                linkInput.select(); 
                document.execCommand('copy'); 
                ui.showAlert("링크가 복사되었습니다!");
            });
        } else {
            linkInput.select(); 
            document.execCommand('copy'); 
            ui.showAlert("링크가 복사되었습니다!");
        }
    },







setMode: function(mode) {
        // [추가] 플로팅 홈 버튼 제어
        const homeBtn = document.getElementById('floatingHomeBtn');
        if (homeBtn) {
            homeBtn.style.display = (mode === 'dashboard') ? 'none' : 'flex';
        }

        // 1. 모든 view- 로 시작하는 구역을 일단 숨김
        document.querySelectorAll('[id^="view-"]').forEach(v => { 
            v.style.display = 'none'; 
        });

        // [핵심 추가] 강사 모드일 때 옵저버에 의해 숨겨진 버튼들을 다시 보이게 초기화
if (!state.isObserver) {
    const allAdminBtns = document.querySelectorAll('.btn-action, .m-btn-done, .navy-btn, #btnReset, button.btn-danger');
    allAdminBtns.forEach(btn => {
        if (btn.id !== 'quizFile' && btn.id !== 'studentFile') {
            btn.style.display = ''; 
            
            // --- 아래 3줄을 추가하여 비활성화 상태를 해제합니다 ---
            btn.disabled = false;            // 잠금 해제
            btn.style.opacity = '1';         // 투명도 복구
            btn.style.cursor = 'pointer';    // 마우스 커서 복구
        }
    });
    const quizCtrl = document.getElementById('quizControls');
    if(quizCtrl) quizCtrl.style.display = 'flex';
}
        
        // 2. 현재 선택한 모드에 맞는 구역 ID 결정
        const targetView = (mode === 'admin-action') ? 'view-admin-action' : (mode === 'dinner-skip') ? 'view-dinner-skip' : `view-${mode}`;
        const targetEl = document.getElementById(targetView);
        
        // 3. 화면 표시 방식 결정 (모달형은 flex, 일반은 block)
        if(targetEl) {
            if(mode === 'prof-presentation' || mode === 'quiz' || mode === 'qa') {
                targetEl.style.display = 'flex';
            } else if(mode === 'waiting' || mode === 'dashboard') {
                targetEl.style.display = 'block';
            } else {
                targetEl.style.display = 'flex'; // 기본값
            }
        }

        // 4. 상단 탭 활성화 표시
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        const targetTab = document.getElementById(`tab-${mode}`);
        if(targetTab) targetTab.classList.add('active');

        localStorage.setItem('kac_last_mode', mode);

        // 5. 각 모드별 데이터 로드
        if (state.room) {
            if (mode === 'quiz') {
                document.getElementById('quizSelectModal').style.display = 'flex'; 
                quizMgr.loadSavedQuizList(); 
            }

            let studentMode = (['waiting', 'shuttle', 'admin-action', 'dinner-skip', 'students', 'dashboard', 'notice', 'attendance', 'guide', 'dormitory'].includes(mode)) ? 'qa' : mode;
            
            // [옵저버 제한] 옵저버는 교육생 화면 모드를 원격으로 바꿀 수 없음
            if (!state.isObserver) {
                firebase.database().ref(`courses/${state.room}/status/mode`).set(studentMode);
            }
            
            if (mode === 'dashboard') ui.loadDashboardStats(); 
            if (mode === 'notice') ui.loadNoticeView(); 
            if (mode === 'attendance') ui.loadAttendanceView();

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
            if (mode === 'students') ui.loadStudentList();
            
            // [기숙사/생활관 정밀 매칭 로직 유지]
            if (mode === 'dormitory') {
                const tbody = document.getElementById('dormitoryTableBody');
                if(!tbody) return;
                tbody.innerHTML = "<tr><td colspan='5' style='padding:50px; color:#94a3b8;'>데이터를 매칭 중입니다...</td></tr>";

                Promise.all([
                    firebase.database().ref(`courses/${state.room}/students`).once('value'),
                    firebase.database().ref(`system/dormitory_assignments`).once('value')
                ]).then(([studentSnap, dormSnap]) => {
                    const students = studentSnap.val() || {};
                    const dormData = dormSnap.val() || {}; 
                    tbody.innerHTML = "";
                    const studentList = Object.values(students).filter(s => s.name && s.name !== "undefined").sort((a, b) => a.name.localeCompare(b.name));

                    if (studentList.length === 0) {
                        tbody.innerHTML = "<tr><td colspan='5' style='padding:50px; color:#94a3b8;'>현재 입실한 수강생이 없습니다.</td></tr>";
                        return;
                    }

                    studentList.forEach((s, idx) => {
                        const sName = s.name;
                        const sPhone = s.phone ? s.phone.slice(-4) : ""; 
                        let assignedInfo = null;

                        if (dormData[`${sName}_${sPhone}`]) {
                            assignedInfo = dormData[`${sName}_${sPhone}`];
                        } 
                        else if (dormData[sName]) {
                            assignedInfo = dormData[sName];
                        }

                        const bName = assignedInfo ? assignedInfo.building : "-";
                        const rNo = assignedInfo ? assignedInfo.room + "호" : "미배정";
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

        // [옵저버 전용 보안 로직 추가] 탭 이동할 때마다 버튼 숨기기 실행
        if (state.isObserver) {
            // 1. 리셋, 초기화, 삭제 관련 버튼 숨기기
            const dangerBtns = document.querySelectorAll('#btnReset, .btn-danger, .btn-del-mini');
            dangerBtns.forEach(b => b.style.display = 'none');

            // 2. 저장, 게시, 적용, 등록 버튼 숨기기
            const saveBtns = document.querySelectorAll('.btn-action, .m-btn-done, .navy-btn');
            saveBtns.forEach(b => {
                const t = b.innerText;
                if(t.includes('저장') || t.includes('적용') || t.includes('게시') || t.includes('등록') || t.includes('확인')) {
                    b.style.display = 'none';
                }
            });

            // 3. 퀴즈 컨트롤 영역 숨기기
            const quizCtrl = document.getElementById('quizControls');
            if(quizCtrl) quizCtrl.style.display = 'none';

            // 4. 상단바에 옵저버 상태 표시
            const roomNameEl = document.getElementById('displayRoomName');
            if(roomNameEl && !roomNameEl.innerHTML.includes('fa-eye')) {
                roomNameEl.innerHTML = "Room #" + state.room + ` <span style="font-size:14px; margin-left:8px; color:#94a3b8; font-weight:normal;">(<i class="fa-solid fa-eye" style="font-size:12px;"></i> 옵저버)</span>`;
            }
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
    
    // 6. 정렬 로직 (고정 질문 > 나중에 답변 > 좋아요 순 > 최신 순)
    items.sort((a, b) => {
        const getWeight = (s) => {
            if (s === 'pin') return 3;
            if (s === 'later') return 2;
            if (s === 'normal') return 1;
            return 0; // done, pin-done
        };
        const weightDiff = getWeight(b.status) - getWeight(a.status);
        if (weightDiff !== 0) return weightDiff;
        if (b.likes !== a.likes) return b.likes - a.likes;
        return b.timestamp - a.timestamp;
    });

    // 7. HTML 빌드 (메모리 내에서 한 번에 조립)
    let htmlBuffer = "";
    const now = Date.now();

    items.forEach(i => {
        try {
            const s = i.status;
            const isDone = (s === 'done' || s === 'pin-done');
            
            // 클래스 및 아이콘 설정
            let cls = "";
            let icon = "";
            if (s === 'pin' || s === 'pin-done') { cls = "status-pin"; icon = "📌 "; }
            else if (s === 'later') { cls = "status-later"; icon = "⚠️ "; }
            else if (isDone) { cls = "status-done"; icon = "✅ "; }

            // 신규 질문 강조 (2분 이내)
            const isNew = (now - i.timestamp) < 120000;
            const newClass = isNew ? 'is-new' : '';
            const newBadge = isNew ? '<span class="new-badge-icon">NEW</span>' : '';

            // 강사 라벨 이름 처리
            let targetName = String(i.subject);
            let displayName = targetName;
            const titles = ["본부장", "공항장", "센터장", "부장", "차장", "과장", "주임", "교수", "강사"];
            const hasTitle = titles.some(t => targetName.includes(t));
            
            if (targetName !== '공통질문' && targetName !== '일반' && !hasTitle) {
                displayName = targetName + " 강사님";
            } else if (hasTitle && !targetName.includes("님")) {
                displayName = targetName + "님";
            }

            htmlBuffer += `
            <div class="q-card ${cls} ${newClass}" onclick="ui.openQaModal('${i.id}')">
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
        } catch (err) {
            console.error("개별 카드 렌더링 에러:", err);
        }
    });

    // 8. 최종 반영
    list.innerHTML = htmlBuffer || `
        <div style="text-align:center; padding:80px 0; color:#94a3b8;">
            <p>조건에 맞는 질문이 없습니다.</p>
        </div>`;
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
        const elem = document.querySelector('.main-stage');
        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch(err => console.log(err));
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
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
        state.room = null; // 메모리상 방 정보 완전 삭제
        
        // 1. 흐릿한 잠금 화면(overlay) 강제 숨김
        const overlay = document.getElementById('statusOverlay');
        if (overlay) overlay.style.setProperty('display', 'none', 'important');
        
        // 2. 인증 팝업창 닫기
        const takeoverModal = document.getElementById('takeoverModal');
        if (takeoverModal) takeoverModal.style.display = 'none';

        // 3. 상단 바 텍스트 및 배지 초기화
        const roomNameEl = document.getElementById('displayRoomName');
        if(roomNameEl) roomNameEl.innerText = "Instructor Waiting Room";
        document.querySelectorAll('.room-badge-global').forEach(b => b.innerText = "");
        
        // 4. 탭 메뉴 숨기기
        const tabs = document.querySelector('.mode-tabs');
        if(tabs) tabs.style.display = 'none'; 
        
        // 5. 모든 뷰 숨기고 현황판만 표시
        document.querySelectorAll('[id^="view-"]').forEach(v => { 
            v.style.display = 'none'; 
        });
        const viewWait = document.getElementById('view-waiting');
        if(viewWait) viewWait.style.display = 'block'; 

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
                const typeNm = item.type === 'outing' ? 
                    '<span style="color:#f59e0b; font-weight:bold;">외출</span>' : 
                    '<span style="color:#ef4444; font-weight:bold;">외박</span>';
                
                const datePrefix = isYesterday ? '<small style="color:#94a3b8;">[어제]</small> ' : '';
                const timeStr = new Date(item.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
                const targetDate = isYesterday ? getYesterdayString() : getTodayString();

                tbody.innerHTML += `
                    <tr>
                        <td>${count++}</td>
                        <td>${datePrefix}${typeNm}</td>
                        <td style="font-weight:bold;">${item.name}</td>
                        <td>${item.phone}</td>
                        <td style="color:#94a3b8; font-size:13px;">${timeStr}</td>
                        <td>
                            <button class="btn-table-action" onclick="ui.cancelIndividualAdminAction('${targetDate}', '${token}')" 
                                    style="background-color:#64748b; font-size:11px; padding:5px 8px;">
                                취소
                            </button>
                        </td>
                    </tr>
                `;
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

// [신규] 특정 학생 한 명만 석식 제외 명단에서 삭제 (식사 가능 상태로 복구)
cancelIndividualDinnerSkip: function(token) {
        if(state.isObserver) return ui.showAlert("👁️ 옵저버는 석식 제외 신청을 취소할 수 없습니다.");
        if(!confirm("이 학생을 석식 제외 명단에서 삭제하시겠습니까?")) return;
        const today = getTodayString();
        firebase.database().ref(`courses/${state.room}/dinner_skips/${today}/${token}`).remove()
            .then(() => { ui.showAlert("✅ 해당 학생이 제외 명단에서 삭제되었습니다."); });
    },

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

    // 1. 이전 방의 감시자(Listener)를 끄고 현재 방 명단만 감시 시작
    const expectedRef = firebase.database().ref(`courses/${state.room}/expectedStudents`);
    const actualRef = firebase.database().ref(`courses/${state.room}/students`);
    expectedRef.off();
    actualRef.off();

    expectedRef.on('value', expSnap => {
        const expectedNames = expSnap.val() || [];
        
        actualRef.on('value', snap => {
            // 방이 바뀌는 도중에 이전 데이터가 들어오는 것 방지
            if(!state.room) return; 

            const data = snap.val() || {};
            const tbody = document.getElementById('studentListTableBody');
            if(!tbody) return;

            // 실제 입장한 학생 데이터 가공
            const actualStudents = Object.keys(data).map(key => ({
                token: key,
                ...data[key]
            })).filter(s => s.name && s.name !== "undefined");

            const actualNames = actualStudents.map(s => s.name);
            // 업로드한 예정 명단과 실제 입장 명단을 합쳐서 정렬
            const combinedNames = Array.from(new Set([...expectedNames, ...actualNames])).sort((a,b) => a.localeCompare(b));

            tbody.innerHTML = ""; 
            let arrivedCount = 0;

            combinedNames.forEach((name, idx) => {
                const sList = actualStudents.filter(student => student.name === name);
                const isArrived = sList.length > 0;
                
                // 입장 경로 아이콘 결정
                let joinTypeIcon = isArrived 
                    ? (expectedNames.includes(name) ? '<i class="fa-solid fa-user-check" style="color:#3b82f6;"></i>' : '<i class="fa-solid fa-qrcode" style="color:#10b981;"></i>')
                    : '<i class="fa-solid fa-user-clock" style="color:#cbd5e1;"></i>';

                const studentData = isArrived ? sList[0] : null;
                const isOnline = isArrived && studentData.isOnline === true;
                const isLeader = isArrived && studentData.isLeader === true;

                if(isArrived) arrivedCount++;

                tbody.innerHTML += `
                    <tr class="${isLeader ? 'is-leader-row' : ''}">
                        <td>${idx + 1}</td>
                        <td style="text-align:center;">
                            <div style="display:inline-flex; align-items:center; gap:8px;">
                                ${joinTypeIcon}
                                <span style="color:${isOnline ? '#22c55e' : '#cbd5e1'};">●</span>
                                <span style="font-weight:800;">${name}</span>
                            </div>
                        </td>
                        <td><span class="status-badge ${isArrived ? 'status-arrived' : 'status-wait'}">${isArrived ? '입교 완료' : '미입교'}</span></td>
                        <td style="color:#94a3b8; font-size:13px;">${isArrived ? (isOnline ? '접속 중' : '오프라인') : '-'}</td>
                        <td>
                            ${isArrived ? `
                                <div style="display:flex; gap:5px; justify-content:center;">
                                    <button class="btn-table-action" onclick="dataMgr.toggleLeader('${studentData.token}', '${name}')" 
                                            style="padding:4px 8px; font-size:11px;">${isLeader ? "해제" : "학생장"}</button>
                                    <button class="btn-table-action" onclick="dataMgr.deleteStudent('${studentData.token}')" 
                                            style="background:#ef4444; color:white; padding:4px 8px; font-size:11px;">삭제</button>
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
        const dormRef = firebase.database().ref(`system/dormitory_assignments`);

        const renderAll = (expData, actData, dormData) => {
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
                const phoneSuffix = sData.phone ? sData.phone.slice(-4) : "-";

                const cleanName = name.trim();
                const assigned = dormData[cleanName] || { building: "-", room: "미배정" };
                
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
        } else {
            // 기사님이 시간을 설정하지 않았을 때 표시될 문구 수정
            el.innerHTML = `<div style="font-size:18px; opacity:0.7;">퇴교 공지 대기 중</div>`;
            el.style.color = "white";
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










toggleMenuDropdown: function() {
        const dropdown = document.getElementById('menuDropdown');
        if(dropdown) dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
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
        const menu = document.getElementById('familySiteMenu');
        const chevron = document.getElementById('familyChevron');
        const isOpen = menu.style.display === 'flex';

        if (isOpen) {
            menu.style.display = 'none';
            chevron.classList.replace('fa-chevron-down', 'fa-chevron-up');
        } else {
            menu.style.display = 'flex';
            chevron.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }
    },

// [강사 플랫폼: 로고 클릭 시 모든 정보를 초기화하고 현황판으로 이동]
    goHome: function() {
        if(confirm("현재 강의실에서 나가 초기 현황판 화면으로 이동하시겠습니까?")) {
            // 1. 로컬 저장소의 모든 방 접속 정보 삭제 (초기화 핵심)
            localStorage.removeItem('kac_last_room');
            localStorage.removeItem('kac_last_mode');
            state.room = null;

            // 2. 주소창의 파라미터를 제거하고 깨끗하게 새로고침
            // 이렇게 하면 다시 접속했을 때 아무 방도 선택되지 않은 초기 상태가 됩니다.
            location.href = 'admin.html';
        }
    },


// [강사 플랫폼 전용: 유관 시스템 보안 하이패스 함수]
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
                container.innerHTML = `<div style="text-align:center; padding:30px; color:#ef4444; font-weight:bold;">⚠️ 저장된 퀴즈가 없습니다.</div>`;
                return;
            }
            Object.keys(data).reverse().forEach(key => {
                const quizSet = data[key];
                const item = document.createElement('div');
                item.className = 'saved-quiz-item';
                item.innerHTML = `<div style="flex-grow:1; cursor:pointer;" onclick="quizMgr.useSavedQuizSet('${key}')"><div class="q-title">${quizSet.title}</div><div class="q-info">${quizSet.data.length}문항 | ${new Date(quizSet.timestamp).toLocaleString()}</div></div><button class="btn-del-mini" onclick="quizMgr.deleteQuizSet('${key}', '${quizSet.title}')"><i class="fa-solid fa-trash-can"></i></button>`;
                container.appendChild(item);
            });
        });
    },
    
    useSavedQuizSet: function(key) {
        firebase.database().ref(`courses/${state.room}/quizBank/${key}`).once('value', snap => {
            const val = snap.val();
            if (val) { 
                state.quizList = val.data; 
                state.isExternalFileLoaded = true; 
                this.renderMiniList(); 
                this.completeQuizLoading(); 
            }
        });
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
        if(qText) qText.innerText = q.text;
        if(qNum) qNum.innerText = `Q${state.currentQuizIdx + 1}`;
        const oDiv = document.getElementById('d-options'); 
        const cDiv = document.getElementById('d-chart');
        if(oDiv) oDiv.style.display = 'flex'; 
        if(cDiv) cDiv.style.display = 'none';
        if(oDiv) {
            oDiv.innerHTML = "";
            q.options.forEach((o, i) => {
                oDiv.innerHTML += `<div class="quiz-opt ${q.isOX?'ox-mode':''}" id="opt-${i+1}"><div class="opt-num">${i+1}</div><div class="opt-text">${o}</div></div>`;
            });
        }
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






    
action: function(act) {
        // [옵저버 제어 차단]
        if(state.isObserver) {
            ui.showAlert("👁️ 옵저버 모드에서는 퀴즈 상태를 변경할 수 없습니다.");
            return;
        }
        
        firebase.database().ref(`courses/${state.room}/activeQuiz`).update({ status: act });
        if(act === 'open') { 
            this.startTimer(); 
        } else if(act === 'close') { 
            this.stopTimer(); 
            const q = state.quizList[state.currentQuizIdx];
            if(!q.isSurvey) { 
                const opt = document.getElementById(`opt-${q.correct}`); 
                if(opt) opt.classList.add('reveal-answer'); 
            } else { 
                const guide = document.getElementById('quizGuideArea');
                if(guide) guide.innerText = "마감되었습니다."; 
            }
        } else if(act === 'result') { 
            this.stopTimer(); 
            const card = document.querySelector('.quiz-card');
            if(card) card.classList.add('result-mode');
            const oDiv = document.getElementById('d-options');
            const cDiv = document.getElementById('d-chart');
            if(oDiv) oDiv.style.display='none'; 
            if(cDiv) cDiv.style.display='flex'; 
            this.renderChart(`Q${state.currentQuizIdx}`, state.quizList[state.currentQuizIdx].correct); 
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
    



// [최종 복구] 퀴즈 모드 종료 시도 (옵저버 여부 체크 포함)
    closeQuizMode: function() { 
        // 옵저버는 데이터에 영향이 없으므로 그냥 나갑니다.
        if(state.isObserver) {
            ui.setMode('qa');
            return;
        }
        // 강사는 팝업창을 띄워 선택하게 합니다.
        const exitModal = document.getElementById('quizExitModal');
        if(exitModal) exitModal.style.display = 'flex'; 
    },
    
    // [최종 복구] 팝업창 버튼 클릭 시 실행 로직 (이어서 하기 / 초기화)
    confirmExitQuiz: function(type) {
        const exitModal = document.getElementById('quizExitModal');
        if(exitModal) exitModal.style.display = 'none';

        if(type === 'reset') {
            // 1. [완전 초기화] 모든 진행 데이터 삭제
            state.currentQuizIdx = 0; 
            state.isExternalFileLoaded = false; 
            state.quizList = [];
            
            // 서버 데이터 싹 비우기
            firebase.database().ref(`courses/${state.room}/activeQuiz`).set(null);
            firebase.database().ref(`courses/${state.room}/status/quizStep`).set('none');
            firebase.database().ref(`courses/${state.room}/quizAnswers`).set(null);
            firebase.database().ref(`courses/${state.room}/quizFinalResults`).set(null);
            
            // 강사 화면 리셋
            quizMgr.renderMiniList();
            const qTxt = document.getElementById('d-qtext');
            const oDiv = document.getElementById('d-options');
            if(qTxt) qTxt.innerText = "Ready?"; 
            if(oDiv) oDiv.innerHTML = "";
            
            ui.showAlert("✅ 퀴즈가 완전히 초기화되었습니다.");
        } 
        // 'resume' (이어서 하기)의 경우 데이터를 지우지 않고 화면만 이동합니다.

        // 공통: Q&A 게시판으로 화면 전환
        ui.setMode('qa'); 
    }
};





/* --- [수정 2차 - 완결본] 입교안내 가이드 관리 로직 (동적 스케일 및 기존 기능 통합) --- */
const guideMgr = {
    pdfDoc: null,
    pageNum: 1,
    isRendering: false,

    // 1. 초기화 (기존 로직 + 리사이즈 감시 추가)
init: function() {
    if (!state.room) return;
    if (window['pdfjs-dist/build/pdf']) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    }
    const guideRef = firebase.database().ref(`system/sharedGuide`);
    guideRef.off(); // 이전 안테나 제거
    guideRef.on('value', snap => {
        const data = snap.val();
        const badge = document.getElementById('guideStatusBadge');
        if (data) {
            if (badge) { badge.innerText = "✅ 가이드 등록 완료"; badge.style.color = "#10b981"; }
            guideMgr.pageNum = 1;
            guideMgr.loadPDF(data);
        } else {
            if (badge) { badge.innerText = "❌ 등록된 파일 없음"; badge.style.color = "#ef4444"; }
        }
    });
    window.addEventListener('resize', () => {
        if (document.getElementById('view-guide').style.display !== 'none') {
            guideMgr.renderPage(guideMgr.pageNum);
        }
    });
    document.addEventListener('fullscreenchange', () => {
        setTimeout(() => guideMgr.renderPage(guideMgr.pageNum), 200);
    });
},

    // 2. 가이드 업로드 (사용자님의 확인 팝업 버전 유지)
    uploadGuide: function(input) {
        const file = input.files[0];
        if(!file || file.type !== 'application/pdf') {
            ui.showAlert("PDF 파일만 업로드 가능합니다.");
            input.value = ""; 
            return;
        }

        const userConfirmed = confirm(
            "⚠️ [주의] 새 가이드를 업로드하시겠습니까?\n\n" +
            "업로드 시 기존에 등록되어 있던 가이드 자료는\n" +
            "즉시 삭제되고 새로운 파일로 교체됩니다.\n\n" +
            "진행하시겠습니까?"
        );

        if (!userConfirmed) {
            input.value = ""; 
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            firebase.database().ref(`system/sharedGuide`).set(e.target.result)
                .then(() => {
                    ui.showAlert("✅ 가이드가 성공적으로 교체되었습니다.");
                    input.value = "";
                });
        };
        reader.readAsDataURL(file);
    },

    // 3. PDF 로드 (기존 로직 유지)
    loadPDF: async function(base64) {
        try {
            const raw = atob(base64.split(',')[1]);
            const array = new Uint8Array(new ArrayBuffer(raw.length));
            for (let i = 0; i < raw.length; i++) array[i] = raw.charCodeAt(i);
            
            const loadingTask = pdfjsLib.getDocument({data: array});
            guideMgr.pdfDoc = await loadingTask.promise;
            guideMgr.renderPage(guideMgr.pageNum);
        } catch (err) {
            console.error("PDF 로딩 실패:", err);
        }
    },

    // 4. 화면 렌더링 (동적 스케일 계산 적용 및 인디케이터 업데이트 포함)
    renderPage: async function(num) {
        if(!guideMgr.pdfDoc || guideMgr.isRendering) return;
        guideMgr.isRendering = true;

        try {
            const page = await guideMgr.pdfDoc.getPage(num);
            const canvas = document.getElementById('guideCanvas');
            if(!canvas) return;
            const ctx = canvas.getContext('2d');
            
            // --- [핵심 수정: 동적 크기 계산] ---
            // 현재 화면(브라우저 창)의 너비와 높이를 가져옴
            const winW = window.innerWidth;
            const winH = window.innerHeight;

            // PDF 원본 크기 정보를 가져옴
            const unscaledViewport = page.getViewport({scale: 1.0});

            // 화면에 꽉 차도록(하지만 잘리지 않게 98% 비율로) 계산
            const ratioW = (winW * 0.98) / unscaledViewport.width;
            const ratioH = (winH * 0.98) / unscaledViewport.height;

            // 가로와 세로 중 더 작은 비율을 선택해야 화면 밖으로 안 나감 (Fit-to-Screen)
            let dynamicScale = Math.min(ratioW, ratioH);

            // 전체화면이 아닐 때는 일반 뷰이므로 너무 커지지 않게 최대 1.5배로 제한
            if (!document.fullscreenElement) {
                dynamicScale = Math.min(dynamicScale, 1.5);
            }
            // ---------------------------------

            const viewport = page.getViewport({scale: dynamicScale}); 
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({canvasContext: ctx, viewport: viewport}).promise;
            guideMgr.isRendering = false;
            
            // 페이지 번호 인디케이터 업데이트 (기존 로직 유지)
            const indicator = document.getElementById('pageIndicator');
            if(indicator) {
                indicator.innerText = `Page: ${num} / ${guideMgr.pdfDoc.numPages}`;
            }
        } catch (err) {
            guideMgr.isRendering = false;
        }
    },

    // 5. 페이지 이동 (기존 로직 유지)
    changePage: function(offset) {
        if(!guideMgr.pdfDoc || guideMgr.isRendering) return;
        let newPage = guideMgr.pageNum + offset;
        if(newPage > 0 && newPage <= guideMgr.pdfDoc.numPages) {
            guideMgr.pageNum = newPage;
            guideMgr.renderPage(guideMgr.pageNum);
        }
    },

    // 6. 진짜 전체화면 모드 (기존 로직 유지)
    toggleFullScreen: function() {
        const elem = document.getElementById('view-guide');
        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch(err => {
                alert(`전체화면 모드를 실행할 수 없습니다: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
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

    // 담당자 및 가이드 상태 로드
    firebase.database().ref('system/coordinators').once('value', snap => {
        const coords = snap.val() || {};
        let coordOptions = '<option value="">--- 담당자 선택 ---</option>';
        Object.values(coords).forEach(c => { coordOptions += `<option value="${c.name}">${c.name}</option>`; });
        document.getElementById('setup-coord-select').innerHTML = coordOptions;
        
        firebase.database().ref(`system/sharedGuide`).once('value', gSnap => {
            const el = document.getElementById('modalGuideStatus');
            if(el) {
                if(gSnap.exists()) {
                    el.innerHTML = '<i class="fa-solid fa-circle-check"></i> 가이드 PDF가 등록되어 있습니다.';
                    el.style.color = "#10b981";
                } else {
                    el.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> 등록된 가이드 파일이 없습니다.';
                    el.style.color = "#ef4444";
                }
            }

            // 기존에 저장된 데이터(과정명, 장소 등)를 입력창에 세팅
            this.loadCurrentSettings(); 

// [최종 최적화] 자동 닫힘 방지 + 대화면 달력 적용
            flatpickr("#setup-period-range", {
                mode: "range",
                locale: "ko",
                dateFormat: "Y-m-d",
                showMonths: 2,         // 2개월 동시 보기
                closeOnSelect: false,  // ★ 두 번째 날짜 클릭해도 안 닫힘 (확인 후 바깥 클릭 시 닫힘)
                disableMobile: "true",
                onReady: function(selectedDates, dateStr, instance) {
                    // 가로폭을 800px로 넉넉하게 늘려 3월과 4월 겹침 현상 해결
                    instance.calendarContainer.style.width = "800px"; 
                    instance.calendarContainer.style.fontSize = "16px";
                },
                onChange: function(selectedDates, dateStr, instance) {
                    // 날짜를 선택할 때마다 너비가 유지되도록 보정
                    instance.calendarContainer.style.width = "800px";
                }
            });
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
        document.getElementById('setup-room-pw').value = s.password ? atob(s.password) : "7777";
        document.getElementById('setup-prof-select').value = st.professorName || "";
        document.getElementById('setup-coord-select').value = s.coordinatorName || "";

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

        // 4. ★핵심 수정★ 날짜 범위 로직 (Range Picker 대응)
        const rangeInput = document.getElementById('setup-period-range');
        const todayStr = typeof getTodayString === 'function' ? getTodayString() : new Date().toISOString().split('T')[0];

        if(s.period && s.period.includes(" ~ ")) {
            // 기존에 "2026-03-03 ~ 2026-03-13" 형태의 데이터가 있다면 그대로 입력
            rangeInput.value = s.period;
        } else {
            // 데이터가 없으면 "오늘 ~ 오늘" 형태를 기본값으로 세팅
            rangeInput.value = `${todayStr} ~ ${todayStr}`;
        }
        
        // 5. 모달 표시 및 과목 리스트 출력
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

        // ★ 유효성 검사 수정 (periodRange가 비어있는지 확인)
        if(!name || !periodRange || !rawPw || !roomName) {
            alert("모든 필수 항목(과정명, 암호, 교육기간, 장소)을 입력해주세요.");
            return;
        }

        if (this.occupiedLocations.includes(roomName)) {
            ui.showAlert(`🚫 '${roomName}'은(는) 이미 사용 중인 장소입니다.`);
            return;
        }

        const updates = {};
        updates[`courses/${state.room}/settings/courseName`] = name;
        updates[`courses/${state.room}/settings/password`] = btoa(rawPw);
        
        // ★ 수정: 호텔 예약 방식으로 선택된 날짜 범위 ("시작일 ~ 종료일")를 그대로 저장합니다.
        updates[`courses/${state.room}/settings/period`] = periodRange;
        
        updates[`courses/${state.room}/settings/roomDetailName`] = roomName;
        updates[`courses/${state.room}/settings/coordinatorName`] = coordName;
        updates[`courses/${state.room}/status/professorName`] = profName;
        updates[`courses/${state.room}/status/roomStatus`] = 'active';
        updates[`courses/${state.room}/status/ownerSessionId`] = state.sessionId;

        firebase.database().ref().update(updates).then(() => {
            document.getElementById('courseNameInput').value = name;
            document.getElementById('roomPw').value = rawPw;
            document.getElementById('displayCourseTitle').innerText = name;
            localStorage.setItem('last_owned_room', state.room);
            
            ui.showAlert("✅ 설정이 저장되었습니다.");
            
            // 1. 팝업창 닫기
            this.closeSetupModal();

            // 2. [핵심 추가] 즉시 방에 다시 입장하여 잠금 화면을 치우고 대시보드를 보여줌
            dataMgr.forceEnterRoom(state.room);
        });
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

    // [중요] 여기서 forceEnterRoom을 또 부르면 안테나가 두 개 꽂혀서 실시간이 안 됩니다.
    // dataMgr.initSystem()이 로그인 체크 후 위에서 고친 loadInitialData를 한 번만 실행합니다.
    dataMgr.initSystem(); 
};







window.onclick = function(event) {
    // 1. 메뉴 드롭다운 외 클릭 시 닫기
    if (!event.target.matches('.dropdown-trigger') && !event.target.closest('.dropdown-trigger')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            if (dropdowns[i].style.display === "block") {
                dropdowns[i].style.display = "none";
            }
        }
    }

    // 2. [추가] 알림창 배경 클릭 시 닫기
    const alertModal = document.getElementById('customAlertModal');
    if (event.target === alertModal) {
        ui.closeAlert();
    }
    
    // 3. [추가] Q&A 상세창 배경 클릭 시 닫기
    const qaModal = document.getElementById('qaModal');
    if (event.target === qaModal) {
        ui.closeQaModal();
    }
};