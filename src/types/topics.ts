export type TopicStatus = "concluido" | "revisar" | "pendente";

export type Topic = {
  id: string;
  title: string;
  status: TopicStatus;
  completedAt: string;

  subjectId: string;
};

export type TopicWithSubjectName = Topic & {
  subjectName: string;
};
