import type { LoginData, RegisterData } from "../types/auth";
import type { ApiResponse } from "../types/api";
import type { AuthResponse } from "../types/auth";
import { API_URL, AUTH_TOKEN_KEY, clearAuthToken } from "./apiClient";

export const login = async ({
  email,
  password,
}: LoginData): Promise<ApiResponse<AuthResponse>> => {
  try {
    const res = await fetch(`${API_URL}/auth/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: ApiResponse<AuthResponse> = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    localStorage.setItem(AUTH_TOKEN_KEY, data.data.token);

    return data;
  } catch {
    return { success: false, message: "Erro de conexao" };
  }
};

export const register = async ({
  name,
  email,
  password,
}: RegisterData): Promise<ApiResponse<AuthResponse>> => {
  try {
    const res = await fetch(`${API_URL}/auth/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data: ApiResponse<AuthResponse> = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    return data;
  } catch {
    return { success: false, message: "Erro de conexao" };
  }
};

export const logout = () => {
  clearAuthToken();
};
