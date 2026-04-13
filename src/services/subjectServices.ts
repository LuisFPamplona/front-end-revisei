import type { ApiResponse } from "../types/api";
import type { Subject } from "../types/user";

const URL = "http://localhost:3000";

export const getSubjects = async (): Promise<ApiResponse<Subject[]>> => {
  const token = localStorage.getItem("token") || "";
  try {
    const res = await fetch(`${URL}/subjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: ApiResponse<Subject[]> = await res.json();

    if (!data.success) {
      console.log("Erro ao buscar matérias");
      return { success: false, message: data.message };
    }

    return data;
  } catch (error) {
    console.log("Erro no servidor");
    return { success: false, message: "" };
  }
};

export const createSubject = async () => {};

export const updateSubject = async () => {};

export const deleteSubject = async () => {};
