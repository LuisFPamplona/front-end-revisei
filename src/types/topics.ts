export type TopicStatus = "concluido" | "revisar" | "pendente";

export type Topic = {
  id: string;
  title: string;
  status: TopicStatus;

  subjectId: string;
};

export type TopicWithSubjectName = Topic & {
  subjectName: string;
};
