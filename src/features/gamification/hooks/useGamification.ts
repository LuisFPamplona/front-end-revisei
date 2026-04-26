import { useMemo } from "react";
import { formatDateForInput } from "../../../utils/formatDate";
import { useDashboardData } from "../../dashboard/hooks/useDashboardData";
import { useAuth } from "../../auth/hooks/useAuth";

function useGamification() {
  const { subjects, allTopics } = useDashboardData();
  const { user } = useAuth();

  const crowns = subjects.filter((subject) => subject.isCompleted).length;

  const gems = user?.gems;

  const completedTopics = allTopics.filter(
    (topic) => topic.status === "concluido",
  );

  const groupedByDate = completedTopics.reduce(
    (acc, topic) => {
      const date = formatDateForInput(new Date(topic.completedAt));

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(topic);

      return acc;
    },
    {} as Record<string, typeof completedTopics>,
  );

  const streak = useMemo(() => {
    const dateAmount = Object.entries(groupedByDate).length;
    let days = [];
    let result = 0;

    for (let i = 0; i < dateAmount; i++) {
      if (Object.entries(groupedByDate)) {
        days.push(Object.entries(groupedByDate)[i][0].slice(8));
      }
    }

    days.sort((a, b) => b.localeCompare(a));

    for (let i = 0; i < days.length; i++) {
      Number(days[i]) - 1 === Number(days[i + 1]);
      result++;
    }

    return result;
  }, [completedTopics]);

  return {
    crowns,
    streak,
    gems,
  };
}

export default useGamification;
