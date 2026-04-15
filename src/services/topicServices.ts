import type { ApiResponse } from "../types/api";
import type { Topic, TopicStatus } from "../types/topics";

const URL = "http://localhost:3000";

export const getTopics = async (id: string): Promise<ApiResponse<Topic[]>> => {
  const token = localStorage.getItem("token") || "";
  try {
    const res = await fetch(`${URL}/subjects/${id}/topics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: ApiResponse<Topic[]> = await res.json();

    if (!data.success) {
      console.log("Erro ao buscar tópicos");
      return { success: false, message: data.message };
    }

    return data;
  } catch (error) {
    return { success: false, message: "Erro no servidor" };
  }
};

export const createTopic = async (
  title: string,
  id: string,
): Promise<ApiResponse<Topic>> => {
  try {
    const token = localStorage.getItem("token") || "";

    if (!title) {
      return { success: false, message: "Title must be provided." };
    }

    const res = await fetch(`${URL}/subjects/${id}/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: title }),
    });

    const data: ApiResponse<Topic> = await res.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    return data;
  } catch (error) {
    return { success: false, message: "Erro no servidor" };
  }
};

export const deleteTopic = async (id: string): Promise<ApiResponse<Topic>> => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${URL}/topics/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: ApiResponse<Topic> = await res.json();

    if (!data.success) {
      return { success: false, message: "Erro ao deletar tópico" };
    }

    return data;
  } catch (error) {
    return { success: false, message: "Erro no servidor" };
  }
};

export const updateTopic = async (
  id: string,
  status?: TopicStatus,
  title?: string,
): Promise<ApiResponse<Topic>> => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`${URL}/topics/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, status }),
    });

    const data: ApiResponse<Topic> = await res.json();

    if (!data.success) {
      return { success: false, message: "Erro ao modificar tópico." };
    }

    return data;
  } catch (error) {
    return { success: false, message: "Erro no servidor" };
  }
};
