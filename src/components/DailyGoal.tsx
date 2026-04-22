import { useTranslation } from "react-i18next";
import useFetchUser from "../hooks/useFetchUser";
import type { TopicWithSubjectName } from "../types/topics";
import { useEffect, useState } from "react";
import {  PartyPopper } from "lucide-react";

interface DailyGoalProps {

  topics: TopicWithSubjectName[];
}

function DailyGoal({ topics }: DailyGoalProps) {
  const { t } = useTranslation();
  const { user } = useFetchUser({ t });
  const [topicsCompletedToday, setTopicsCompletedToday] = useState(0);
  const [dailyGoalPercent, setDailyGoalPercent] = useState(0);

  const today = new Date().toISOString().slice(0, 10);

  const dailyGoal: number = user?.dailyGoal ?? 0;
  const completedTopics = topics.filter((t) => t.completedAt !== null);
  useEffect(() => {
    setTopicsCompletedToday(
      completedTopics.filter((t) => t.completedAt.slice(0, 10) === today)
        .length,
    );

    setDailyGoalPercent(() => {
      const completedPercent: number =
        dailyGoal > 0
          ? Math.round((topicsCompletedToday / dailyGoal) * 100)
          : 0;

      return completedPercent;
    });
  }, [topics]);

  const isDailyGoalCompleted: boolean = dailyGoal === topicsCompletedToday;

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
                className="bg-[#806ECD] h-4 rounded-full"
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
