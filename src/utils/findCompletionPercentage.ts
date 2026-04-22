import type { TopicWithSubjectName } from "../types/topics";
import type { Subject } from "../types/user";

export const findCompletionPercentage = (
  subject: Subject | null,
  topics: TopicWithSubjectName[],
) => {
  const totalTopics = topics.filter((t) => t.subjectId === subject?.id);
  const completedTopics = totalTopics.filter(
    (topic) => topic.status === "concluido",
  ).length;

  const completionPercentage =
    totalTopics.length > 0
      ? Math.round((completedTopics / totalTopics.length) * 100)
      : 0;

  return completionPercentage;
};
