import { t } from "i18next";
import type { TopicWithSubjectName } from "../../types/topics";
import DailyGoal from "../DailyGoal";

interface OverallProgressProps {
  completionPercentage: number;
  completedTopics: number;
  totalTopics: number;
  allTopics: TopicWithSubjectName[];
}

function OverallProgress({
  completionPercentage,
  completedTopics,
  totalTopics,
  allTopics,
}: OverallProgressProps) {
  return (
    <div className="lg:col-span-1 md:w-140 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center gap-6 h-fit">
      <h2 className="text-sm font-semibold text-slate-700 self-start uppercase tracking-widest">
        {t("home.progressTitle")}
      </h2>
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="88"
            cy="88"
            r="75"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-100"
          />
          <circle
            cx="88"
            cy="88"
            r="75"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={471}
            strokeDashoffset={471 - (471 * completionPercentage) / 100}
            strokeLinecap="round"
            className="text-[#806ECD] transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-bold text-slate-800">
            {completionPercentage}%
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase">
            {t("home.mastery")}
          </span>
        </div>
      </div>
      <p className="text-xs text-center text-slate-500 font-medium">
        {t("home.finishedTopics", {
          completed: completedTopics,
          total: totalTopics,
        })}
      </p>
      <div className="w-full">
        <DailyGoal topics={allTopics} />
      </div>
    </div>
  );
}

export default OverallProgress;
