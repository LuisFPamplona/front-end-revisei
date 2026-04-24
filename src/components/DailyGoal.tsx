import { useTranslation } from "react-i18next";
import useFetchUser from "../hooks/useFetchUser";
import type { TopicWithSubjectName } from "../types/topics";
import { useEffect, useState } from "react";
import { PartyPopper } from "lucide-react";
import { formatDateForInput } from "../utils/formatDate";

interface DailyGoalProps {
  topics: TopicWithSubjectName[];
}

function DailyGoal({ topics }: DailyGoalProps) {
  const { t } = useTranslation();
  const { user } = useFetchUser({ t });
  const [topicsCompletedToday, setTopicsCompletedToday] = useState(0);
  const [dailyGoalPercent, setDailyGoalPercent] = useState(0);

  const dailyGoal: number = user?.dailyGoal ?? 0;

  useEffect(() => {
    const today = formatDateForInput(new Date());

    const completedToday = topics.filter(
      (topic) => formatDateForInput(new Date(topic.completedAt)) === today,
    ).length;

    setTopicsCompletedToday(completedToday);

    const completedPercent =
      dailyGoal > 0 ? Math.round((completedToday / dailyGoal) * 100) : 0;

    setDailyGoalPercent(completedPercent > 100 ? 100 : completedPercent);
  }, [topics, dailyGoal]);

  const isDailyGoalCompleted: boolean = dailyGoal <= topicsCompletedToday;

  return (
    <>
      <div className="w-full">
        <div>
          <h2 className="text-sm font-semibold text-slate-700 self-start uppercase tracking-widest">
            Meta diária
          </h2>
          <div className="flex flex-col items-center justify-center py-6">
            {!isDailyGoalCompleted && (
              <span className="text-xs text-center text-slate-500 font-medium pb-1">
                Faltam {dailyGoal - topicsCompletedToday} tópicos para sua meta
                diária.
              </span>
            )}
            {isDailyGoalCompleted && (
              <span className="text-xs text-center text-slate-500 font-medium pb-2 flex justify-center items-center gap-1">
                Meta diária alcançada. Parabéns!
                <PartyPopper size={15} />
                <PartyPopper size={15} />
              </span>
            )}

            <div className="relative w-[70%] h-4 bg-gray-200 rounded-full">
              <div
                className="bg-[#806ECD] h-4 rounded-full absolute"
                style={{ width: `${dailyGoalPercent}%` }}
              />
              <span className="absolute text-[10px] font-bold top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-slate-700">
                {topicsCompletedToday} / {dailyGoal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DailyGoal;
