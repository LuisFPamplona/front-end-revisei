import type { ApiResponse } from "../types/api";
import type { Subject } from "../types/user";
import { API_URL, fetchWithAuth } from "./apiClient";

export const getSubjects = async (): Promise<ApiResponse<Subject[]>> => {
  try {
    const res = await fetchWithAuth(`${API_URL}/subjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: ApiResponse<Subject[]> = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    return data;
  } catch {
    return { success: false, message: "Erro no servidor" };
  }
};

export const getSpecificSubject = async (
  id: string,
): Promise<ApiResponse<Subject>> => {
  try {
    const res = await fetchWithAuth(`${API_URL}/subjects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: ApiResponse<Subject> = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    return data;
  } catch {
    return { success: false, message: "Erro no servidor" };
  }
};

export const createSubject = async (
  name: string,
): Promise<ApiResponse<Subject>> => {
  try {
    const res = await fetchWithAuth(`${API_URL}/subjects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data: ApiResponse<Subject> = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    return data;
  } catch {
    return { success: false, message: "Erro no servidor" };
  }
};

export const updateSubject = async () => {};

export const deleteSubject = async (
  id: string,
): Promise<ApiResponse<Subject>> => {
  try {
    const res = await fetchWithAuth(`${API_URL}/subjects/${id}`, {
      method: "DELETE",
    });

    const data: ApiResponse<Subject> = await res.json();

    if (!data.success) {
      return { success: false, message: "Erro ao deletar materia" };
    }

    return data;
  } catch {
    return { success: false, message: "Erro no servidor" };
  }
};
