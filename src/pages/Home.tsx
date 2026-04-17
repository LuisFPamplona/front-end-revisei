import { useEffect, useState } from "react";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import { getSubjects } from "../services/subjectServices";
import { getTopics } from "../services/topicServices";
import type { Subject } from "../types/user";
import type { Topic } from "../types/topics";
import Sidebar from "../components/layout/Sidebar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [allTopics, setAllTopics] = useState<
    (Topic & { subjectName: string })[]
  >([]);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadDashboardData() {
      const subjectsRes = await getSubjects();

      if (!subjectsRes.success) {
        toast.error(subjectsRes.message || t("errors.loadDashboard"));
        return;
      }

      setSubjects(subjectsRes.data);

      const topicsPromises = subjectsRes.data.map(async (subj) => {
        const res = await getTopics(subj.id);

        if (res.success && res.data) {
          return res.data.map((topic) => ({
            ...topic,
            subjectName: subj.name,
          }));
        }

        return [];
      });

      const results = await Promise.all(topicsPromises);
      setAllTopics(results.flat());
    }

    void loadDashboardData();
  }, [t]);

  const totalSubjects = subjects.length;
  const totalTopics = allTopics.length;
  const completedTopics = allTopics.filter(
    (topic) => topic.status === "concluido",
  ).length;
  const pendingTopics = allTopics.filter(
    (topic) => topic.status === "pendente" || topic.status === "revisar",
  ).length;

  const completionPercentage =
    totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  const topicsToFocus = allTopics
    .filter((topic) => topic.status !== "concluido")
    .slice(0, 3);

  return (
    <div className="min-h-screen md:ml-64 bg-slate-50/50">
      <Sidebar />
      <div className="flex flex-col gap-6 p-4 pb-24 md:p-10 pt-20 md:pt-10 animate-in fade-in duration-500 max-w-7xl mx-auto">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            {t("home.greeting")}
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            {t("home.subtitle")}{" "}
            <span className="text-[#806ECD] font-bold">{t("common.appName")}</span>
          </p>
        </header>

        <section className="flex gap-4 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          <div onClick={() => navigate("/subjects")}>
            <StatCard
              icon={BookOpen}
              label={t("home.stats.subjects")}
              value={totalSubjects}
              color="text-[#806ECD]"
            />
          </div>
          <div>
            <StatCard
              icon={CheckCircle}
              label={t("home.stats.completed")}
              value={completedTopics}
              color="text-green-500"
            />
          </div>
          <div>
            <StatCard
              icon={Clock}
              label={t("home.stats.pending")}
              value={pendingTopics}
              color="text-orange-500"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-6">
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
          </section>

          <section className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                {t("home.focusNow")}
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {topicsToFocus.length > 0 ? (
                topicsToFocus.map((topic) => (
                  <div
                    key={topic.id}
                    className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#806ECD] transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-[#806ECD] uppercase">
                        {topic.subjectName}
                      </span>
                      <h3 className="text-slate-800 font-semibold">
                        {topic.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${topic.status === "revisar" ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-600"}`}
                      >
                        {t(`topicStatus.${topic.status}`)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-10 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                  <p className="text-slate-400 text-sm">
                    {t("home.allCaughtUp")}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="min-w-37.5 flex-1 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
      <Icon className={`${color} w-5 h-5`} />
      <span className="text-2xl font-bold text-slate-800">{value}</span>
      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
