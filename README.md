# B-match Web

배드민턴 매칭 플랫폼 - 모바일 앱 스타일 웹 애플리케이션

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 + shadcn/ui |
| Styling | Tailwind CSS v4 |
| State Management | Zustand 5 |
| Form | React Hook Form + Zod |
| Icons | Lucide React |
| Architecture | FSD (Feature-Sliced Design) |

## 메인 컬러

- **Primary**: `rgb(64, 192, 109)` / `#40C06D`

## 프로젝트 구조 (FSD)

```
b-match-web/
├── app/                    # Next.js App Router (라우팅 전용, 얇은 래퍼)
│   ├── (main)/             # Route Group: 하단 네비 공유 레이아웃
│   │   ├── home/           # /home - 매칭 홈
│   │   ├── map/            # /map - 지도
│   │   ├── my/             # /my - 마이페이지
│   │   └── matching/[id]/  # /matching/:id - 매칭 상세
│   ├── matching/create/     # /matching/create - 매칭 등록
│   ├── onboarding/         # /onboarding - 온보딩
│   ├── login/              # /login - 소셜 로그인
│   ├── profile-setup/      # /profile-setup - 프로필 설정
│   └── host-register/      # /host-register - 호스트 등록
│
├── src/                    # FSD 레이어
│   ├── app/                # 전역 프로바이더, 설정
│   ├── views/              # 페이지 수준 합성 컴포넌트
│   ├── widgets/            # 대형 UI 블록 (AppBar, BottomNav 등)
│   ├── features/           # 기능 단위 (로그인, 필터, 호스트 등록, 매칭 등록)
│   ├── entities/           # 도메인 모델 (User, Matching, Host)
│   └── shared/             # 공통 UI(shadcn), 유틸, 설정, 훅
│       └── ui/             # shadcn/ui 컴포넌트
│
└── public/images/          # 로고 이미지
```

### FSD 레이어 설명

| 레이어 | 위치 | 역할 |
|--------|------|------|
| app | `app/` + `src/app/` | 라우팅, 프로바이더, 전역 설정 |
| pages | `src/views/` | 페이지 수준 합성 |
| widgets | `src/widgets/` | 대형 UI 블록 (AppBar, BottomNav 등) |
| features | `src/features/` | 기능 단위 (로그인, 필터 등) |
| entities | `src/entities/` | 도메인 모델 (User, Matching, Host) |
| shared | `src/shared/` | 공통 UI(shadcn), 유틸, 설정 |

## 기능 명세 (MVP)

| ID | 화면 | 기능 | 상태 |
|----|------|------|------|
| ENT-01 | 스플래시 | 자동 로그인 체크 | UI 완료 / TODO: 토큰 검증 API |
| ENT-02 | 온보딩 | 서비스 소개 (3슬라이드) | UI 완료 |
| AUTH-01 | 로그인 | 소셜 로그인 (카카오/애플/구글) | UI 완료 / TODO: SDK 연동 |
| AUTH-02 | 프로필 설정 | 기본 정보 입력 | UI 완료 / TODO: 저장 API |
| AUTH-03 | 호스트 권유 | 호스트 가입 선택 팝업 | UI 완료 |
| AUTH-04 | 호스트 권유 | 게스트 유지 선택 | UI 완료 |
| HOST-01 | 호스트 등록 | 대표 이미지 업로드 (최대 5장) | TODO: 파일 업로드 서버 연동 |
| HOST-02~05 | 호스트 등록 | 클럽명/성비/연령/급수 입력 | UI 완료 / TODO: 저장 API |
| HOST-06/07 | 등록 완료 | 완료 팝업 및 홈 이동 | UI 완료 |
| NAV-01 | 공통 | 하단 탭 네비게이션 | 완료 |
| NAV-02 | 지도 | 지도 뷰 | TODO: 지도 API 연동 |
| HOME-01 | 매칭 홈 | 매칭 리스트 (무한 스크롤) | UI 완료 / TODO: 리스트 API |
| HOME-02 | 매칭 홈 | 필터 설정 | UI 완료 |
| HOME-03 | 매칭 상세 | 매칭 상세 진입 | UI 완료 / TODO: 상세 API |
| HOME-04 | 매칭 홈 | 매칭 만들기 버튼 (호스트 전용) | 완료 |
| HOME-05 | 매칭 홈 | 매칭 등록 화면 진입 | 완료 |
| POST-01 | 매칭 등록 | 일시 및 시간 선택 | UI 완료 |
| POST-02 | 매칭 등록 | 장소 설정 | UI 완료 / TODO: 지도 API 연동 |
| POST-03 | 매칭 등록 | 모집 인원 설정 (스테퍼/미정) | UI 완료 |
| POST-04 | 매칭 등록 | 참가 자격 (성별/나이/급수/초보환영) | UI 완료 |
| POST-05-1~4 | 매칭 등록 | 게스트비 (콕/현금/없음, 낱개구매) | UI 완료 |
| POST-06-1~4 | 매칭 등록 | 모임 참가비 (콕/현금/없음, 낱개구매) | UI 완료 |
| POST-07-1~3 | 매칭 등록 | 시설 이용료 (구장별도/모임입금) | UI 완료 |
| POST-08-1~3 | 매칭 등록 | 지정콕 (브랜드/모델, 낱개구매, 가격) | UI 완료 |
| POST-09-1~2 | 매칭 등록 | 모임 소개글 (가이드 placeholder) | UI 완료 |
| POST-10-1~2 | 매칭 등록 | 환불 마감 시간 (정책 안내 툴팁) | UI 완료 |
| POST-11-1~2 | 매칭 등록 | 등록 내용 미리보기 & 항목별 수정 | UI 완료 |
| POST-11-3 | 매칭 등록 | 매칭 운영 정책 최종 동의 | UI 완료 |
| POST-11-4~5 | 매칭 등록 | 모집글 정보 저장 확인 팝업 | UI 완료 / TODO: 템플릿 저장 API |
| POST-11-6~7 | 매칭 등록 | 등록 완료 팝업 & 화면 이동 | UI 완료 |

## TODO (핵심 비즈니스 로직 - 외부 연동 필요)

### 인증 & 사용자
- [ ] 소셜 로그인 SDK 연동 (카카오, Apple, Google)
- [ ] 토큰 검증 API 연동 (ENT-01)
- [ ] 프로필 저장 API 연동 (AUTH-02)

### 호스트
- [ ] 호스트 정보 저장 API 연동 (HOST-02~05)
- [ ] HOST-01: 대표 이미지 업로드 (파일 업로드 서버 필요, 최대 5장)
- [ ] 매칭 관리 페이지 구현 (MANAGE) - 호스트 매칭 관리 화면

### 지도
- [ ] 지도 API 연동 (카카오맵 / 네이버 지도)
  - POST-02: 매칭 등록 시 장소 검색 & 좌표(위도/경도) 저장
  - NAV-02: 지도 뷰에서 매칭 핀 표시 & 현재 위치 기반 조회

### 매칭 API
- [ ] 매칭 등록 API 연동 (POST-01~11 폼 데이터 서버 전송)
- [ ] 매칭 리스트 조회 API 연동 + 무한 스크롤 (HOME-01)
- [ ] 매칭 상세 데이터 API 연동 (HOME-03)
- [ ] 매칭 참여 신청 API 연동 (HOME-04 참여 신청 버튼)
- [ ] 매칭 필터링 서버 연동 (HOME-02 필터 → 리스트 반영)
- [ ] 모집글 정보 템플릿 저장/불러오기 API (POST-11-4~5)

### 결제 & 환불
- [ ] 결제 시스템 연동 (콕 제출 / 현금 결제)
- [ ] 환불 마감 정책 서버 로직 (POST-10)

### 알림 & 인프라
- [ ] 푸시 알림 연동 (Firebase Cloud Messaging)
- [ ] Firebase 초기화 (Auth, Firestore, FCM)
- [ ] API 서버 구축 및 연동

## 실행 방법

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 실행
npm run start

# 린트 검사
npm run lint
```

## 반응형 디자인

- **모바일** (< 640px): 전체 너비, 네이티브 앱과 동일한 경험
- **태블릿** (640px ~ 1024px): `max-w-[768px]` 중앙 정렬
- **데스크톱** (> 1024px): `max-w-[430px]` 중앙 정렬, 양옆 배경 분리
