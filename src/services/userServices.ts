import type { ApiResponse } from "../types/api";
import type { UpdateUserData, User } from "../types/user";
import { API_URL, fetchWithAuth } from "./apiClient";

export const getMe = async (): Promise<ApiResponse<User>> => {
  try {
    const res = await fetchWithAuth(`${API_URL}/user`, {
      method: "GET",
    });

    const data: ApiResponse<User> = await res.json();
    return data;
  } catch {
    return { success: false, message: "Erro ao carregar perfil" };
  }
};

export const updateMe = async (
  payload: UpdateUserData,
): Promise<ApiResponse<User>> => {
  try {
    const res = await fetchWithAuth(`${API_URL}/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse<User> = await res.json();
    return data;
  } catch {
    return { success: false, message: "Erro ao atualizar perfil" };
  }
};
