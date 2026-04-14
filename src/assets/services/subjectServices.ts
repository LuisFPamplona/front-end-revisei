import type { ApiResponse } from "../types/api";
import type { Subject } from "../types/user";

const URL = "http://localhost:3000";

export const getSubjects = async (): Promise<ApiResponse<Subject>> => {
  const token = localStorage.getItem("token") || "";
  try {
    const res = await fetch(`${URL}/subjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: ApiResponse<Subject> = await res.json();

    if (!data.success) {
      console.log("Erro ao buscar matérias");
      return { success: false, message: data.message };
    }

    return data;
  } catch (error) {
    console.log("Erro no servidor");
    return { success: false, message: "Erro no servidor" };
  }
};

export const createSubject = async (
  name: string,
): Promise<ApiResponse<Subject>> => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${URL}/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    const data: ApiResponse<Subject> = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    return data;
  } catch (error) {
    return { success: false, message: "Erro no servidor" };
  }
};

export const updateSubject = async () => {};

export const deleteSubject = async () => {};
