# KAC 항공기술훈련원 교육플랫폼 개발 이력

> **개발자:** 장두석 교수 (항공기술훈련원 교육운영부)
> **플랫폼 구성:** 강사(`admin.html/js/css`) · 교육생(`index.html`) · 운영부(`admin_coord.html`) · 포털(`portal.html`) · 출석부(`attendance_sheet.html`)
> **기술 스택:** Firebase Realtime Database · Firebase Auth · Vanilla JS · HTML/CSS · flatpickr · pdf.js · Font Awesome
> **최종 업데이트:** 2026-05-26

---

## 세션 1 — 2026-05-25 AM (초기 대규모 버그수정)

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

## 세션 2 — 2026-05-25 PM (기능 추가 및 연동)

### 강사 플랫폼
| 분류 | 내용 |
|------|------|
| 퀴즈모드 연동 | 강사 퀴즈탭 진입 시 status/mode='quiz' DB 저장 → 교육생 화면 전환 |
| 공지 팝업 | dashRefs에서 coordNotice/globalNotice 분리, state.noticeSeen으로 중복 팝업 방지 |
| 파란박스 | kac_owned_rooms 배열로 누적 저장, isMyOwnedRoom() 헬퍼 추가 |
| 강의실 입장 | forceEnterRoom 4가지 분기(오너/미개설/세션복구/타인) 재설계 |
| 외출/외박 복귀호출 | returnCall Firebase 신호, 개별 호출 버튼 추가 |
| PDF 입교안내 | 오프스크린 캔버스 렌더링으로 번쩍임 제거 |

### 교육생 플랫폼
| 분류 | 내용 |
|------|------|
| 차량 버튼 | 아이콘(🚗🚄🚌✈️) 추가, 가로 배치로 정렬 개선 |
| 연락처 | 하이픈 자동 포맷(formatPhoneInput) |
| 석식 제외 | 16시 이후 자동 비활성화 + 안내 문구 |
| 복귀 알림 | 외출 22시 초과 시 5분 간격 진동+소리+팝업, 외박 익일 8:10부터 3회 |
| 강사 복귀호출 | returnCall 감지 리스너 → 팝업 표시 |

---

## 세션 3 — 2026-05-26 (대규모 개선 및 신규 기능)

### 버그 수정

#### 공지 시스템
| 항목 | 내용 |
|------|------|
| 두 번째 공지 팝업 미표시 | window._coordNoticeListenerRoom 플래그 방식 제거, 항상 off→on 재등록 |
| 대시보드 공지 피드 미반영 | loadDashboardStats의 once 제거, forceEnterRoom 리스너가 피드 업데이트 전담 |
| dashRefs 공지 리스너 | coordNotice/globalNotice를 dashRefs에서 완전 분리 |
| 방 이동 시 공지 팝업 미표시 | once()로 기준값 선로드 후 리스너 등록, 이후 변경분만 팝업 |

#### 교육생 플랫폼
| 항목 | 내용 |
|------|------|
| 로딩 멈춤 | JS 문자열 내 실제 개행 문자 오류 2건 수정 |
| 퀴즈모드 연동 | blockModes에서 quiz 제거, setMode('quiz') 시 즉시 DB 저장 |
| 복수 강의실 출결 | QR 찍을 때 미출결 강의실 2개 이상이면 선택 팝업 표시 |
| localStorage 출결 잔존 | 이름 재입력(타 토큰) 시 오늘 날짜 출결 기록 자동 초기화 |
| 출결 중복 방지 | cleanUrlAndGo → location.replace()로 실제 페이지 이동, init() 재실행 보장 |
| 접속 QR 오류 | resolveRoomFromCode 함수 누락 추가, 코드 조회 실패 시 localStorage 복구 |
| 접속 로딩 화면 | 데이터 로드 중 흰색 스피너 표시, 완료 시 과정명/입장 버튼 표시 |

#### 강사 플랫폼
| 항목 | 내용 |
|------|------|
| 파란박스 상단 라인 잘림 | padding-top 8px으로 증가 |
| 새로고침 시 잠금화면 | silent=true 플래그로 overlay 미표시, 항상 현황판 유지 |
| 새로고침 시 비밀번호 창 | silent 모드에서 현황판으로 복귀, kac_last_room 초기화 |
| 비밀번호 팝업 취소 | cancelTakeover 취소 시 statusOverlay 숨기고 현황판으로 복귀 |
| KAC Training 클릭 팝업 | confirm 제거, 바로 홈으로 이동 |
| flatpickr 날짜 오늘만 표시 | defaultDate 제거 + requestAnimationFrame으로 setDate 타이밍 수정 |
| PDF 번쩍임/버벅임 | 오프스크린 캔버스 렌더링 완료 후 한 번에 교체 |
| 출석부 도장 미표시 | expectedStudents null 처리 개선으로 정상 렌더링 |

---

### 신규 기능

#### 강사 플랫폼
| 기능 | 내용 |
|------|------|
| 공지 탭 하이라이트 | 새 공지 시 공지탭 진입 시 연두색 flash 효과 |
| 수강생 입교 방식 구분 | 명단 fa-book-open / QR신규 fa-qrcode Font Awesome 아이콘 |
| 강의실 현황판 강의실 열 | 마지막 활동 → 강의실로 변경, roomDetailName 2줄 가운데 표시 |
| Reset 시 강의실 초기화 | settings.roomDetailName Reset 시 함께 초기화 |
| 외출/외박 복귀여부 | 테이블에 복귀여부(✅/⏳) + 개별 복귀호출 컬럼 추가 |
| 주야간 버튼 제거 | 주간 모드 고정 |
| 사이드바 책갈피 탭 | 사이드바 우측 fixed 포지션 탭, 클릭 시 슬라이드 접기/펼치기 |
| 사이드바 슬라이드 애니메이션 | 모든 요소 0.3s ease 동기화 |
| Reset 권한 강화 | 내 방 아닌 경우 마스터키(13281) 또는 강의실 비번 입력 필수 |
| All Idle 마스터키 | 마스터키(13281) 입력 후에만 실행 |
| Password/Logout/시스템보안설정 버튼 제거 | 불필요한 버튼 제거, 사이드바 정리 |
| 하단 버튼 비활성화 | 강의실 미설정 시 Report/옵저버/Reset 자동 비활성화(opacity 0.35) |
| ROOM STATUS LED | 비활성화 시 빨간색, 활성화 시 초록색 |
| 퇴교차량 박스 제거 | 셔틀 탑승 수요 현황 제목 옆에 (15:00 출발) 인라인 표시로 대체 |
| 퇴교차량 여정 ETA | 차량수요조사 탭에 신청자 있는 목적지만 30분씩 예상 도착 시간 표시 |
| 로딩 스피너 | 홈 이동 시 전역 로딩 오버레이 표시 |
| 공지 관리 컬러바 | 검정 → 녹색(#10b981)으로 변경 |
| 플랫폼 개발 이력 버튼 | 사이드바 하단, 클릭 시 GitHub MD 파일 실시간 로드 팝업 |
| 입교안내 PDF/툴바 순서 | PDF 먼저, 이전/다음/전체화면 버튼이 아래 배치 |
| 탭 설명 문구 제거 | 입교안내/공지관리/Q&A 불필요한 설명 문구 제거 |

#### 운영부 플랫폼
| 기능 | 내용 |
|------|------|
| 공지 발송 이력 | Firebase coordNoticeHistory 저장, 최신 1건 textarea에 파란색 이탤릭으로 표시 |
| 클릭 시 초기화 | 이전 공지 클릭 시 지워지고 새 내용 입력 모드 전환 |
| 공지 버튼 녹색 통일 | #10b981 녹색으로 통일 |
| 색상 정리 | 흰색 카드 + 파란 헤더 타이틀 바 방식으로 전환 |
| 퇴교차량 카드 | 파란 그라데이션 복원 |

#### 통합 포털
| 기능 | 내용 |
|------|------|
| 데이터 연결 오류 수정 | portalPins read:true 규칙 변경 + 익명 로그인 제거 |

#### 출석부
| 기능 | 내용 |
|------|------|
| A4 인쇄 설정 강화 | @page size A4, thead 반복, page-break-inside avoid |
| 입교 방식 아이콘 | 명단/QR신규 Font Awesome 아이콘으로 표시 |
| 도장 렌더링 수정 | expectedStudents null 처리 개선 |

---

### UI/디자인 개선

| 항목 | 내용 |
|------|------|
| 대시보드 카드 여백 | padding 25px, justify-content flex-start |
| 카드 높이 통일 | align-items stretch + min-height 260px + 왼쪽 카드 flex 1 |
| 외출/외박 헤더 | view-header 표준 양식으로 통일 |
| 전화번호 줄바꿈 | white-space nowrap 적용 |
| flatpickr 날짜 색상 | startRange/endRange 색상 강화(#1d4ed8) |
| 현황판 설명 문구 | 항공기술훈련원 강의실 및 교육과정 운영 상태를 실시간으로 모니터링합니다. |
| 차량 버튼 배치 | 아이콘(왼쪽) + 글자(오른쪽) 가로 배치 최적화 |
| 운영부 색상 통일 | 퇴교차량 외 모든 섹션 흰색카드 + 파란 헤더 방식 |
| view-header 여백 통일 | margin-bottom 24px으로 과정현황과 동일하게 통일 |

---

## Firebase 보안 규칙 변경사항

```json
"coordNoticeHistory": { ".write": true },
"portalPins":         { ".read": true, ".write": "auth != null" }
```

---

## 마스터키 정보

| 용도 | 키 |
|------|-----|
| All Idle 실행 | 13281 |
| 타인 강의실 Reset | 13281 또는 해당 강의실 비번 |

---

## 수정된 파일 목록 (최종본)

| 파일 | 주요 변경 내용 |
|------|---------------|
| `admin.js` | 공지 리스너, 퀴즈모드, 현황판, Reset 권한, 사이드바 토글, ETA 계산, GitHub MD 로드 등 |
| `admin.html` | 버튼 정리, 사이드바 탭, 공지 컬러바, 강의실 열 헤더, 로딩 스피너, 개발이력 팝업 등 |
| `admin.css` | 카드 높이, 사이드바 슬라이드 애니메이션, LED 색상 등 |
| `admin_coord.html` | 색상 정리, 공지 이력, textarea placeholder 등 |
| `index.html` | 출결 복수강의실 선택, localStorage 초기화, 복귀알림, resolveRoomFromCode, 접속 로딩 스피너 등 |
| `portal.html` | 익명 로그인 제거, PIN 확인 단순화 |
| `attendance_sheet.html` | A4 인쇄, 도장 렌더링, 아이콘 추가 |

---

## 현재 알려진 제한사항

| 항목 | 내용 |
|------|------|
| 복귀 알림 백그라운드 | 교육생 폰 화면 꺼진 상태에서 알림 불가 (웹앱 한계, FCM 필요) |
| 마스터키 보안 | JS 코드에 평문 노출 — 내부 시스템이므로 현재 수준 유지 |
| 출결 localStorage | 같은 이름+번호 재등록 시 당일 기록만 초기화 (타 기기는 별도) |

---

## 새 대화 시작 시 안내

새 채팅에서 아래 파일들을 업로드하고 시작하세요.

**필수 업로드 파일:**
- admin.html / admin.js / admin.css
- admin_coord.html
- index.html
- portal.html
- attendance_sheet.html
- 본 MD 파일 (KAC_플랫폼_개발이력.md)

**시작 문구 예시:**
> "KAC 항공기술훈련원 교육플랫폼 개발 작업 이어서 진행합니다. 첨부 파일이 현재까지 작업된 최신본이며, MD 파일에 전체 개발 이력이 있습니다."

---

*Developed by Dooseok Jang — KAC 항공기술훈련원*
*GitHub: https://github.com/jds0616-boop/CATC*
