import { trackGlobalLoading } from "./loadingTracker";

export const API_URL = "http://localhost:3000";
export const AUTH_TOKEN_KEY = "token";
export const AUTH_EXPIRED_EVENT = "auth:expired";

type ApiRequestInit = RequestInit & {
  skipGlobalLoading?: boolean;
};

export const getAuthToken = (): string => {
  return localStorage.getItem(AUTH_TOKEN_KEY) || "";
};

export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const notifyAuthExpired = () => {
  clearAuthToken();
  window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
};

export const fetchWithAuth = async (
  input: string,
  init: ApiRequestInit = {},
): Promise<Response> => {
  const token = getAuthToken();
  const headers = new Headers(init.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const request = fetch(input, {
    ...init,
    headers,
  });

  const response = init.skipGlobalLoading
    ? await request
    : await trackGlobalLoading(request);

  if (response.status === 401 || response.status === 403) {
    notifyAuthExpired();
  }

  return response;
};

export const validateToken = async (): Promise<boolean> => {
  const token = getAuthToken();

  if (!token) {
    return false;
  }

  try {
    const response = await fetchWithAuth(`${API_URL}/auth/validate`, {
      method: "GET",
    });

    return response.ok;
  } catch {
    return false;
  }
};
