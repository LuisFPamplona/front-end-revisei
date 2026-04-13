import type { LoginData, RegisterData } from "../types/auth";
import type { ApiResponse } from "../types/api";
import type { AuthResponse } from "../types/auth";

const URL = "http://localhost:3000";

export const login = async ({
  email,
  password,
}: LoginData): Promise<ApiResponse<AuthResponse>> => {
  try {
    const res = await fetch(`${URL}/auth/sessions`, {
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

    localStorage.setItem("token", data.data.token);

    return data;
  } catch (error) {
    return { success: false, message: "Erro de conexão" };
  }
};

export const register = async ({
  name,
  email,
  password,
}: RegisterData): Promise<ApiResponse<AuthResponse>> => {
  try {
    const res = await fetch(`${URL}/auth/users`, {
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
  } catch (error) {
    return { success: false, message: "Erro de conexão" };
  }
};
