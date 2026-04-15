export type TopicStatus = "concluido" | "revisar" | "pendente";

export type Topic = {
  id: string;
  title: string;
  status: TopicStatus;

  subjectId: string;
};
