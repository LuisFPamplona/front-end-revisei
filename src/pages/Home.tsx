import { useEffect, useRef, useState } from "react";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import type { Subject } from "../types/user";
import type { TopicWithSubjectName } from "../types/topics";
import Sidebar from "../components/layout/Sidebar";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useDashboardData } from "../hooks/useDashboardData";
import { findCompletionPercentage } from "../utils/findCompletionPercentage";
import Header from "../components/layout/Header";
import OverallProgress from "../components/home/OverallProgress";
import ActionCard from "../components/home/ActionCard";
import FocusNow from "../components/home/FocusNow";
import StatCard from "../components/home/StatCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const { subjects, allTopics } = useDashboardData({ t });
  const [nextTopic, setNextTopic] = useState<TopicWithSubjectName | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSubjects = subjects.length;
  const totalTopics = allTopics.length;
  const [bestSubject, setBestSubject] = useState<Subject | null>(null);

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

  const donePercent = findCompletionPercentage(
    bestSubject,
    allTopics.filter((t) => t.subjectId == bestSubject?.id),
  );

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;

      const index = Math.round(scrollLeft / offsetWidth);
      setActiveIndex(index);
    }
  };

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
      setNextTopic(onlyReviewTopics[0]);
    } else if (onlyPendingTopics.length > 0) {
      setNextTopic(onlyPendingTopics[0]);
    }
  }, [onlyPendingTopics, onlyReviewTopics]);

  return (
    <div className="min-h-screen md:ml-64 bg-slate-50/50">
      <Sidebar />
      <div className="flex flex-col gap-6 p-4 pb-24 md:p-10 md:pt-10 animate-in fade-in duration-500 max-w-7xl mx-auto">
        <Header title="home.greeting" subtitle="home.subtitle" />
        {totalSubjects > 0 && (
          <section className="flex flex-col gap-6 md:flex-row">
            <OverallProgress
              completionPercentage={completionPercentage}
              totalTopics={totalTopics}
              completedTopics={completedTopics}
              allTopics={allTopics}
            />
            <section className="flex flex-col gap-4">
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory md:flex-col md:overflow-visible"
              >
                {nextTopic && nextTopic.title.length > 0 && (
                  <ActionCard
                    topic={nextTopic}
                    title="home.nextAction.title"
                    buttonText="home.nextAction.studyNow"
                  />
                )}

                {subjects.length > 0 && (
                  <ActionCard
                    subject={bestSubject}
                    title="Desempenho" // alterar para i18n
                    buttonText="Ver performance" // alterar para i18n
                    subjectPercentage={donePercent}
                  />
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

          {totalSubjects > 0 && <FocusNow topics={topicsToFocus} />}
        </div>
      </div>
    </div>
  );
}
