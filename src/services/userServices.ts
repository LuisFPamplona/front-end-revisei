import type { ApiResponse } from "../types/api";
import type { User } from "../types/user";

const URL = "http://localhost:3000";

export const getMe = async (): Promise<ApiResponse<User>> => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: ApiResponse<User> = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: "Erro ao carregar perfil" };
  }
};
