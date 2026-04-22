import type { ApiResponse } from "../types/api";
import type { Topic, TopicStatus } from "../types/topics";
import { API_URL, fetchWithAuth } from "./apiClient";

export const getTopics = async (id: string): Promise<ApiResponse<Topic[]>> => {
  try {
    const res = await fetchWithAuth(`${API_URL}/subjects/${id}/topics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: ApiResponse<Topic[]> = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    return data;
  } catch {
    return { success: false, message: "Erro no servidor" };
  }
};

export const createTopic = async (
  title: string,
  id: string,
): Promise<ApiResponse<Topic>> => {
  try {
    if (!title) {
      return { success: false, message: "Title must be provided." };
    }

    const res = await fetchWithAuth(`${API_URL}/subjects/${id}/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const data: ApiResponse<Topic> = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    return data;
  } catch {
    return { success: false, message: "Erro no servidor" };
  }
};

export const deleteTopic = async (id: string): Promise<ApiResponse<Topic>> => {
  try {
    const res = await fetchWithAuth(`${API_URL}/topics/${id}`, {
      method: "DELETE",
    });

    const data: ApiResponse<Topic> = await res.json();

    if (!data.success) {
      return { success: false, message: "Erro ao deletar topico" };
    }

    return data;
  } catch {
    return { success: false, message: "Erro no servidor" };
  }
};

export const updateTopic = async (
  id: string,
  status?: TopicStatus,
  title?: string,
  completedAt?: string,
): Promise<ApiResponse<Topic>> => {
  try {
    const res = await fetchWithAuth(`${API_URL}/topics/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, status, completedAt }),
    });

    const data: ApiResponse<Topic> = await res.json();

    if (!data.success) {
      return { success: false, message: "Erro ao modificar topico." };
    }

    return data;
  } catch {
    return { success: false, message: "Erro no servidor" };
  }
};
