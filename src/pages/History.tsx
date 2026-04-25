import { BrushCleaning, Search, Wind } from "lucide-react";
import HistoryCard from "../components/history/HistoryCard";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { t } from "i18next";
import { useState } from "react";
import type { TopicWithSubjectName } from "../types/topics";
import { formatDateForInput } from "../utils/formatDate";
import { useDashboardData } from "../features/dashboard/hooks/useDashboardData";

export type GroupedTopics = {
  date: string;
  topics: TopicWithSubjectName[];
};

function History() {
  const { allTopics } = useDashboardData();
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState("");

  const completedTopics = allTopics
    .filter((topic) => topic.status === "concluido")
    .sort((a, b) => a.completedAt.localeCompare(b.completedAt));

  const filteredTopics = completedTopics
    .filter((topic) =>
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((topic) => {
      if (!date) return true;

      const completedDate = formatDateForInput(new Date(topic.completedAt));

      return completedDate === date;
    });

  const groupedByDate = filteredTopics.reduce(
    (acc, topic) => {
      const date = formatDateForInput(new Date(topic.completedAt));

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(topic);

      return acc;
    },
    {} as Record<string, typeof filteredTopics>,
  );

  const groupedArray = Object.entries(groupedByDate)
    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
    .map(([date, topics]) => ({
      date,
      topics,
    }));

  return (
    <div className="min-h-screen md:ml-64 bg-slate-50/50">
      <Sidebar />
      <div className="flex flex-col gap-6 p-4 pb-24 md:p-10 md:pt-10 animate-in fade-in duration-500 max-w-7xl mx-auto">
        <Header
          title="Histórico"
          subtitle="Veja o seu histórico de tópicos concluídos"
        />
        <section className="flex flex-col gap-2 md:flex-row md:justify-between md:w-160">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-[#806ECD]" />
            <input
              type="text"
              placeholder={t("subjects.searchPlaceholder")}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#806ECD]/20 focus:border-[#806ECD] w-full md:w-120 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <input
              value={date}
              onChange={(e) => setDate(() => e.target.value)}
              type="date"
              className="py-2 px-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#806ECD]/20 focus:border-[#806ECD] w-32 transition-all shadow-sm text-slate-500 font-medium"
            />
          </div>
        </section>
        {groupedArray.length > 0 && (
          <div className="md:grid md:grid-cols-2">
            {groupedArray.map((group) => (
              <HistoryCard topics={group} key={group.date} />
            ))}
          </div>
        )}
        {groupedArray.length < 1 && (
          <div className="flex flex-col items-center pt-12">
            <span>Nenhum tópico na data escolhida.</span>
            <span className="flex gap-1 items-baseline">
              <BrushCleaning /> <Wind />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
