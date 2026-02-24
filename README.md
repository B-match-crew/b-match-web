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
│   ├── onboarding/         # /onboarding - 온보딩
│   ├── login/              # /login - 소셜 로그인
│   ├── profile-setup/      # /profile-setup - 프로필 설정
│   └── host-register/      # /host-register - 호스트 등록
│
├── src/                    # FSD 레이어
│   ├── app/                # 전역 프로바이더, 설정
│   ├── views/              # 페이지 수준 합성 컴포넌트
│   ├── widgets/            # 대형 UI 블록 (AppBar, BottomNav 등)
│   ├── features/           # 기능 단위 (로그인, 필터, 호스트 등록)
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
| HOST-01~04 | 호스트 등록 | 클럽명/성비/연령/급수 입력 | UI 완료 / TODO: 저장 API |
| HOST-05/06 | 등록 완료 | 완료 팝업 및 홈 이동 | UI 완료 |
| NAV-01 | 공통 | 하단 탭 네비게이션 | 완료 |
| NAV-02 | 지도 | 지도 뷰 | TODO: 지도 API 연동 |
| HOME-01 | 매칭 홈 | 매칭 리스트 (무한 스크롤) | UI 완료 / TODO: 리스트 API |
| HOME-02 | 매칭 홈 | 필터 설정 | UI 완료 |
| HOME-03 | 매칭 상세 | 매칭 상세 진입 | UI 완료 / TODO: 상세 API |

## TODO (외부 연동)

- [ ] 소셜 로그인 SDK 연동 (카카오, Apple, Google)
- [ ] Firebase 초기화 (Auth, Firestore, FCM)
- [ ] API 서버 연동 (매칭 CRUD, 프로필 저장, 호스트 등록)
- [ ] 지도 API 연동 (카카오맵 / 네이버 지도)
- [ ] 토큰 검증 API 연동
- [ ] 푸시 알림 (Firebase Cloud Messaging)

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
