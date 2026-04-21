import { useEffect, useRef, useState } from "react";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import type { Subject } from "../types/user";
import type { Topic } from "../types/topics";
import Sidebar from "../components/layout/Sidebar";
import { useNavigate } from "react-router-dom";

import { t } from "i18next";

import { useDashboardData } from "../hooks/useDashboardData";
import { findCompletionPercentage } from "../utils/findCompletionPercentage";

export default function Dashboard() {
  const navigate = useNavigate();
  const { subjects, allTopics } = useDashboardData({ t });
  const [nextTopic, setNextTopic] = useState<Topic & { subjectName: string }>({
    id: "",
    title: "",
    status: "pendente",
    subjectId: "",
    subjectName: "",
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;

      const index = Math.round(scrollLeft / offsetWidth);
      setActiveIndex(index);
    }
  };

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

  const onlyReviewTopics = allTopics
    .filter((topic) => topic.status === "revisar")
    .slice(0, 3);

  const onlyPendingTopics = allTopics
    .filter((topic) => topic.status === "pendente")
    .slice(0, 3);

  const [bestSubject, setBestSubject] = useState<Subject | null>(null);

  const donePercent = findCompletionPercentage(
    bestSubject,
    allTopics.filter((t) => t.subjectId == bestSubject?.id),
  );

  useEffect(() => {
    setBestSubject(() => {
      const bestSubject = subjects.reduce<Subject | null>(
        (bestSubject, currentSubject) => {
          const concludedCount = allTopics.filter(
            (topic) =>
              topic.subjectId === currentSubject.id &&
              topic.status === "concluido",
          ).length;

          const bestCount = allTopics.filter(
            (topic) =>
              topic.subjectId === bestSubject?.id &&
              topic.status === "concluido",
          ).length;

          if (!bestSubject || concludedCount > bestCount) {
            return currentSubject;
          }

          return bestSubject;
        },
        null,
      );

      return bestSubject;
    });
  }, [subjects, allTopics]);

  useEffect(() => {
    if (onlyReviewTopics.length > 0) {
      setNextTopic(onlyPendingTopics[0]);
    } else if (onlyPendingTopics.length > 0) {
      setNextTopic(onlyPendingTopics[0]);
    }
  }, [nextTopic, onlyPendingTopics, onlyReviewTopics]);

  return (
    <div className="min-h-screen md:ml-64 bg-slate-50/50">
      <Sidebar />
      <div className="flex flex-col gap-6 p-4 pb-24 md:p-10 md:pt-10 animate-in fade-in duration-500 max-w-7xl mx-auto">
        <header className="flex justify-center md:items-start items-center flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            {t("home.greeting")}
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            {t("home.subtitle")}{" "}
            <span className="text-[#806ECD] font-bold">
              {t("common.appName")}
              <div className="h-1.5 w-22 bg-[#806ECD] rounded-full mt-2" />
            </span>
          </p>
        </header>

        {totalSubjects > 0 && (
          <section className="flex flex-col gap-6 md:flex-row">
            <div className="lg:col-span-1 md:w-140 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-6">
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
            </div>
            <section>
              <div className="flex flex-col gap-4">
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory md:flex-col md:overflow-visible"
                >
                  {nextTopic.title.length > 0 && (
                    <div className="flex-none w-[92vw] md:w-102 snap-center">
                      <h2 className="text-sm font-semibold text-slate-700 uppercase mb-4 px-2">
                        {t("home.nextAction.title")}
                      </h2>

                      <div className="flex flex-col w-92 gap-6 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group hover:border-[#806ECD] transition-colors">
                        <div className="flex w-full justify-between">
                          <div className="p-3 bg-purple-50 text-[#806ECD] rounded-lg group-hover:bg-[#806ECD] group-hover:text-white transition-colors duration-300">
                            <BookOpen size={24} />
                          </div>
                          <div className="cursor-default max-w-58">
                            <span className="text-[10px] font-bold text-[#806ECD] uppercase">
                              {nextTopic.subjectName}
                            </span>
                            <h3 className="text-slate-800 font-semibold">
                              {nextTopic.title}
                            </h3>
                          </div>
                          <div>
                            <span
                              className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${nextTopic.status === "revisar" ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-600"}`}
                            >
                              {t(`topicStatus.${nextTopic.status}`)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            navigate(`/subjects`, {
                              state: {
                                subjectId: nextTopic.subjectId,
                                topicId: nextTopic.id,
                              },
                            })
                          }
                          className="bg-gray-50 text-gray-600 font-medium p-2 w-38 text-sm shadow-sm rounded-2xl border border-slate-100 flex items-center justify-center  group-hover:bg-[#806ECD] group-hover:text-white transition-all duration-300 cursor-pointer"
                        >
                          {t("home.nextAction.studyNow")}
                        </button>
                      </div>
                    </div>
                  )}

                  {subjects.length > 0 && (
                    <div className="flex-none w-[92vw] md:w-102 snap-center">
                      <h2 className="text-sm font-semibold text-slate-700 uppercase mb-4 px-2">
                        Desempenho por matéria
                      </h2>

                      <div className="flex flex-col w-92 gap-6 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group hover:border-[#806ECD] transition-colors">
                        <div className="flex w-full justify-between">
                          <div className="p-3 bg-purple-50 text-[#806ECD] rounded-lg group-hover:bg-[#806ECD] group-hover:text-white transition-colors duration-300">
                            <BookOpen size={24} />
                          </div>
                          <div className="cursor-default max-w-58">
                            <span className="text-[10px] font-bold text-[#806ECD] uppercase">
                              MELHOR MATÉRIA
                            </span>
                            <h3 className="text-slate-800 font-semibold">
                              {bestSubject?.name}
                            </h3>
                          </div>
                          <div>
                            <span
                              className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${donePercent < 40 ? "bg-orange-100 text-orange-600" : donePercent < 80 ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}
                            >
                              {donePercent}%
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate("/performance")}
                          className="bg-gray-50 text-gray-600 font-medium p-2 w-38 text-sm shadow-sm rounded-2xl border border-slate-100 flex items-center justify-center  group-hover:bg-[#806ECD] group-hover:text-white transition-all duration-300 cursor-pointer"
                        >
                          Ver performance
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 md:hidden">
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === 0 ? "bg-[#806ECD] w-4" : "bg-slate-200"}`}
                  />
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === 1 ? "bg-[#806ECD] w-4" : "bg-slate-200"}`}
                  />
                </div>
              </div>
            </section>
          </section>
        )}

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
          {totalSubjects < 1 && (
            <section className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  {t("home.firstStep.title")}
                </h2>
              </div>
              <button
                onClick={() => navigate("/explore")}
                className="bg-[#806ECD] p-4 max-w-92 h-14 shadow-sm rounded-2xl border border-slate-100 hover:border-0 flex items-center justify-center transition-colors cursor-pointer text-white font-bold"
              >
                {t(`home.firstStep.explore`)}
              </button>
            </section>
          )}

          {totalSubjects > 0 && (
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
                      onClick={() =>
                        navigate(`/subjects`, {
                          state: {
                            subjectId: topic.subjectId,
                            topicId: topic.id,
                          },
                        })
                      }
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
          )}
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
