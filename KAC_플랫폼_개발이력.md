# KAC 항공기술훈련원 교육플랫폼 개발 이력

> **개발자:** 장두석 교수 (항공기술훈련원 교육운영부)  
> **플랫폼 구성:** 강사 플랫폼(`admin.html/js/css`) · 교육생 플랫폼(`index.html`) · 운영부 플랫폼(`admin_coord.html`) · 통합 포털(`portal.html`) · 출석부(`attendance_sheet.html`)  
> **기술 스택:** Firebase Realtime Database · Firebase Auth · Vanilla JS · HTML/CSS · flatpickr · pdf.js · Font Awesome

---

## 세션 1 — 2026-05-25 (초기 대규모 버그수정)

### 강사 플랫폼

| 분류 | 내용 |
|------|------|
| 로그인 | Firebase Auth 이메일 로그인 구조 안정화 |
| PDF 입교안내 | pdf.js 렌더링 오류 수정, 페이지 넘기기 정상화 |
| 공지 팝업 | coordNotice/globalNotice 실시간 팝업 리스너 구조 재설계 |
| 강의실 현황판 | 파란박스(MY 강의실) 상단 라인 잘림 수정 |
| Q&A | 날짜별 분류 표시 기능 추가 |
| 퀴즈모드 | 교육생 화면 연동 오작동 수정 |
| 차량 출발시간 | 셔틀 출발시간 공지 기능 정상화 |
| menuFeatures | 기본값 shuttle + adminAction만 ON으로 설정 |

---

## 세션 2 — 2026-05-25 (기능 추가 및 연동)

### 강사 플랫폼

| 분류 | 내용 |
|------|------|
| 퀴즈모드 연동 | 강사 퀴즈탭 진입 시 `status/mode='quiz'` DB 저장 → 교육생 화면 전환 |
| 공지 팝업 | `dashRefs`에서 coordNotice/globalNotice 분리, `state.noticeSeen`으로 중복 팝업 방지 |
| 파란박스 | `kac_owned_rooms` 배열로 누적 저장, isMyOwnedRoom() 헬퍼 추가 |
| 강의실 입장 | forceEnterRoom 4가지 분기(오너/미개설/세션복구/타인) 재설계 |
| 외출/외박 복귀호출 | `returnCall` Firebase 신호, 개별/전체 호출 버튼 추가 |
| PDF 입교안내 | 오프스크린 캔버스 렌더링으로 번쩍임 제거 |

### 교육생 플랫폼

| 분류 | 내용 |
|------|------|
| 차량 버튼 | 아이콘(🚗🚄🚌✈️) 추가, 가로 배치로 정렬 개선 |
| 연락처 | 하이픈 자동 포맷(`formatPhoneInput`) |
| 석식 제외 | 16시 이후 자동 비활성화 + 안내 문구 |
| 복귀 알림 | 외출 22시 초과 시 5분 간격 진동+소리+팝업, 외박 익일 8:10부터 3회 |
| 강사 복귀호출 | `returnCall` 감지 리스너 → 팝업 표시 |
| 외박 날짜 | "외출 날짜" → "외박 날짜" 레이블 수정 |

---

## 세션 3 — 2026-05-26 (현재 세션 — 대규모 개선)

### 🔴 버그 수정

#### 공지 시스템
- **두 번째 공지 팝업 안 뜨는 문제** — `window._coordNoticeListenerRoom` 플래그 방식 제거, 항상 `.off()→.on()` 재등록으로 변경
- **대시보드 공지 피드 실시간 미반영** — `loadDashboardStats`의 `once` 제거, `forceEnterRoom` 리스너가 피드 업데이트 전담
- **`dashRefs`에 공지 리스너 포함되어 `.off()` 시 같이 죽는 문제** — `dashRefs`에서 coordNotice/globalNotice 완전 분리

#### 교육생 플랫폼
- **로딩 멈춤** — JS 문자열 내 실제 개행 문자 오류 2건 수정 (`\n` 이스케이프)
- **퀴즈모드 연동 안 됨** — `blockModes`에서 `quiz` 제거, `setMode('quiz')` 시 `status/mode='quiz'` 즉시 DB 저장

#### 강의실 현황판
- **파란박스 상단 라인 잘림** — `padding-top: 4px → 8px` 증가
- **새로고침 시 "강의실 입장 확인" 화면** — `showWaitingRoom()` 먼저 표시 후 방 복구 백그라운드 처리(`silent=true`)
- **새로고침 시 비밀번호 창** — `switchRoomAttempt(room, silent=true)` → overlay 표시 안 하고 현황판으로 복귀

#### 교육기간 설정
- **flatpickr 날짜 항상 오늘만 표시** — `defaultDate: new Date()` 제거 + `requestAnimationFrame + setTimeout(50ms)`으로 `setDate` 타이밍 수정

#### PDF 입교안내
- **번쩍임/버벅거림** — 오프스크린 캔버스 렌더링 완료 후 한 번에 교체 방식으로 개선

---

### 🟢 신규 기능

#### 강사 플랫폼

| 기능 | 내용 |
|------|------|
| 공지 탭 하이라이트 | 새 공지 있을 때 공지탭 진입 시 연두색 flash 효과 |
| 수강생 입교 방식 구분 | 명단 업로드 입교 → 📋 아이콘, QR 신규 → 📱 아이콘 |
| 강의실 현황판 — 강의실 열 | "마지막 활동" → "강의실" 로 변경, `roomDetailName` 2줄 표시 |
| 외출/외박 복귀여부 | 테이블에 복귀여부(✅/⏳) + 복귀호출 컬럼 추가 |
| 전체 복귀호출 버튼 | 미복귀자 전체 일괄 Firebase 신호 발송 |
| 복귀완료자 차단 | 이미 복귀한 교육생은 호출 신호 무시 |
| 주야간 버튼 제거 | 주간 모드 고정 |
| 전체화면 버튼 수정 | CSS 클래스 토글 방식(`body.sidebar-hidden`)으로 변경 — 입교안내 화면 뜨던 문제 해결 |
| Reset 권한 강화 | 내 방이 아닌 경우 마스터키(`13281`) 또는 강의실 비번 입력 필수 |
| Reset 시 강의실 초기화 | `settings.roomDetailName` Reset 시 함께 초기화 |
| All Idle 마스터키 | 마스터키(`13281`) 입력 후에만 실행 |
| Password/Logout 버튼 제거 | 불필요한 버튼 제거, 사이드바 정리 |
| 하단 버튼 비활성화 | 강의실 미설정 시 Report/옵저버/Reset 자동 비활성화(opacity 0.35) |
| ROOM STATUS LED | 비활성화 시 🔴 빨간색, 활성화 시 🟢 초록색 |
| 퇴교차량 노란박스 제거 | 셔틀 탑승 수요 현황 제목 옆에 `(15:00 출발)` 인라인 표시로 대체 |

#### 운영부 플랫폼

| 기능 | 내용 |
|------|------|
| 공지 발송 이력 | Firebase `coordNoticeHistory` 저장, 최신 1건 textarea에 파란색 이탤릭으로 표시 |
| 클릭 시 초기화 | 이전 공지 클릭하면 지워지고 새 내용 입력 모드 전환 |
| 공지 버튼 녹색 통일 | `#10b981` 녹색으로 통일 |
| 색상 정리 | 흰색 카드 + 파란 헤더 타이틀 바 방식으로 전환 (색상 과부하 해소) |
| 퇴교차량 카드 | 파란 그라데이션 복원 |

#### 교육생 플랫폼

| 기능 | 내용 |
|------|------|
| 차량 버튼 아이콘 재정렬 | 아이콘(왼쪽) + 글자(오른쪽) 가로 배치, 버튼 크기에 맞게 최적화 |
| 외박 날짜 라벨 | "외출 날짜" → "외박 날짜" 수정 |

#### 통합 포털

| 기능 | 내용 |
|------|------|
| 데이터 연결 오류 수정 | `portalPins` read:true 규칙 변경 + 익명 로그인 제거로 단순화 |

#### 출석부 (`attendance_sheet.html`)

| 기능 | 내용 |
|------|------|
| A4 인쇄 설정 강화 | `@page { size: A4 }`, `thead` 반복, `page-break-inside: avoid` |
| 입교 방식 아이콘 | 명단 📋 / QR신규 📱 Font Awesome 아이콘으로 표시 |

---

### 🎨 UI/디자인 개선

| 항목 | 내용 |
|------|------|
| 대시보드 카드 여백 | `padding-top: 40px → 25px`, `justify-content: flex-start` |
| 카드 높이 통일 | `align-items: stretch` + `min-height: 260px` + 왼쪽 카드 `flex: 1` |
| 외출/외박 헤더 | `view-header` 표준 양식으로 통일 |
| 전화번호 줄바꿈 | `white-space: nowrap` 적용 |
| 퇴교차량 날짜/시간 | 괄호 처리 + 가운데 정렬, 이후 노란박스 제거 |
| flatpickr 날짜 | `startRange/endRange` 색상 강화 (`#1d4ed8`) |
| 공지 관리 설명 문구 | "항공기술훈련원 강의실 및 교육과정 운영 상태를 실시간으로 모니터링합니다." |

---

### 🔧 Firebase 보안 규칙 변경사항

```json
"coordNoticeHistory": { ".write": true },
"portalPins":         { ".read": true, ".write": "auth != null" }
```

---

### 📁 수정된 파일 목록

| 파일 | 수정 횟수 |
|------|-----------|
| `admin.js` | 다수 (핵심 로직 전반) |
| `admin.html` | 다수 (UI 구조 변경) |
| `admin.css` | 다수 (스타일 개선) |
| `admin_coord.html` | 다수 (운영부 전면 개편) |
| `index.html` | 다수 (교육생 기능 추가) |
| `portal.html` | 2회 (오류 수정) |
| `attendance_sheet.html` | 1회 (인쇄 개선) |

---

### 📌 현재 알려진 제한사항

| 항목 | 내용 |
|------|------|
| 복귀 알림 백그라운드 | 교육생 폰 화면 꺼진 상태에서 알림 불가 (웹앱 한계) |
| 마스터키 보안 | JS 코드에 평문 노출 — 내부 시스템이므로 현재 수준 유지 |
| 공지 PIN 보안 | 해시 미적용 — 향후 SHA-256 해시 적용 검토 가능 |

---

*문서 생성일: 2026-05-26*  
*Developed by DooSeok, Jang — KAC 항공기술훈련원*
