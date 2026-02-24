// TODO: [INFRA] API 서버 베이스 URL 설정
// - 환경변수: NEXT_PUBLIC_API_BASE_URL
// - 토큰 자동 첨부 인터셉터
// - 401 응답 시 자동 로그아웃 처리
// - 서버 점검 상태(503) 감지 → 점검 안내 팝업

import { storage } from "./storage";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...init } = options;

  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value)
    );
  }

  const token = storage.getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...init.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), {
    ...init,
    headers,
  });

  if (!response.ok) {
    // TODO: [INFRA] 401 시 자동 로그아웃, 503 시 서버 점검 안내
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
