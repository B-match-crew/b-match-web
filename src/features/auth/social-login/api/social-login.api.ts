// TODO: [AUTH-01] 카카오 소셜 로그인 연동
// - Kakao JavaScript SDK 설치
// - REST API Key 환경변수 설정: NEXT_PUBLIC_KAKAO_APP_KEY
// - Kakao.Auth.login() 호출 후 토큰 발급
// - 서버로 카카오 토큰 전달 → JWT 토큰 수신
export async function loginWithKakao(): Promise<{ token: string; isNewUser: boolean }> {
  // 임시 더미 응답
  console.log("TODO: 카카오 로그인 연동 필요");
  return { token: "dummy-kakao-token", isNewUser: true };
}

// TODO: [AUTH-01] Apple 소셜 로그인 연동
// - Apple Sign In JS 라이브러리 로드
// - NEXT_PUBLIC_APPLE_CLIENT_ID, APPLE_REDIRECT_URI 설정
// - appleid.auth.signIn() 호출
export async function loginWithApple(): Promise<{ token: string; isNewUser: boolean }> {
  console.log("TODO: Apple 로그인 연동 필요");
  return { token: "dummy-apple-token", isNewUser: true };
}

// TODO: [AUTH-01] Google 소셜 로그인 연동
// - @react-oauth/google 패키지 설치
// - NEXT_PUBLIC_GOOGLE_CLIENT_ID 환경변수 설정
// - useGoogleLogin() 훅으로 토큰 발급
export async function loginWithGoogle(): Promise<{ token: string; isNewUser: boolean }> {
  console.log("TODO: Google 로그인 연동 필요");
  return { token: "dummy-google-token", isNewUser: true };
}
