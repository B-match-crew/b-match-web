export const ROUTES = {
  SPLASH: "/",
  ONBOARDING: "/onboarding",
  LOGIN: "/login",
  PROFILE_SETUP: "/profile-setup",
  HOST_REGISTER: "/host-register",
  HOME: "/home",
  MAP: "/map",
  MY: "/my",
  MATCHING_DETAIL: (id: string) => `/matching/${id}`,
} as const;
