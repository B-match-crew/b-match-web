export const ROUTES = {
  SPLASH: "/",
  LOGIN: "/login",
  PROFILE_SETUP: "/profile-setup",
  HOST_REGISTER: "/host-register",
  HOME: "/home",
  MAP: "/map",
  MY: "/my",
  MATCHING_CREATE: "/matching/create",
  MATCHING_DETAIL: (id: string) => `/matching/${id}`,
} as const;
