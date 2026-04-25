import type { Subject } from "../types/user";
import Sidebar from "../components/layout/Sidebar";
import { t } from "i18next";

import { ArrowRight, BookOpen, History } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { findCompletionPercentage } from "../utils/findCompletionPercentage";
import { useDashboardData } from "../features/dashboard/hooks/useDashboardData";

const Performance = () => {
  const { subjects, allTopics } = useDashboardData();

  const navigate = useNavigate();

  const sortedSubjects = [...subjects].sort((a, b) => {
    const aDone = allTopics.filter(
      (topic) => topic.subjectId === a.id && topic.status === "concluido",
    ).length;

    const bDone = allTopics.filter(
      (topic) => topic.subjectId === b.id && topic.status === "concluido",
    ).length;

    return bDone - aDone;
  });

  return (
    <div className="min-h-screen md:pl-110">
      <Sidebar />
      <div className="w-full pt-6 flex justify-center md:justify-start">
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            Performance
          </h1>
          <div className="h-1.5 w-22 bg-[#806ECD] rounded-full mt-2" />
        </div>
      </div>
      <div className="flex justify-end md:justify-start px-4 md:px-0">
        <button
          onClick={() => navigate("/history")}
          className="mt-6 w-32 flex justify-center gap-2 py-2 px-4 font-medium rounded-lg bg-[#806ECD] text-white cursor-pointer"
        >
          Histórico <History />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 pt-7 pb-14 md:grid md:grid-cols-3 md:w-[80%]">
        {sortedSubjects.map((s: Subject) => (
          <div className="group flex flex-col w-92 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#806ECD]/50 transition-all duration-300">
            <section className="flex items-center justify-between gap-4">
              <div className="p-3 w-[15%] bg-purple-50 text-[#806ECD] rounded-lg group-hover:bg-[#806ECD] group-hover:text-white transition-colors duration-300">
                <BookOpen size={24} />
              </div>

              <div className="cursor-default w-[85%]">
                <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#806ECD] transition-colors">
                  {s.name}
                </h3>
              </div>
            </section>

            <section className="flex items-center">
              <div>
                <p className="text-[10px] flex justify-between w-26 font-bold uppercase px-2 py-1 rounded cursor-pointer text-sm bg-gray-50 text-gray-600">
                  <p>Tópicos:</p>
                  {allTopics.filter((t) => t.subjectId === s.id).length}
                </p>
                <p className="text-[10px] flex justify-between w-26 font-bold uppercase px-2 py-1 rounded cursor-pointer text-sm bg-green-100 text-green-600">
                  <p>Concluídos: </p>
                  {
                    allTopics
                      .filter((t) => t.subjectId === s.id)
                      .filter((t) => t.status === "concluido").length
                  }
                </p>
                <p className="text-[10px] flex justify-between w-26 font-bold uppercase px-2 py-1 rounded cursor-pointer text-sm bg-orange-100 text-orange-600">
                  <p>Pendentes: </p>
                  {
                    allTopics
                      .filter((t) => t.subjectId === s.id)
                      .filter((t) => t.status === "pendente").length
                  }
                </p>
                <p className="text-[10px] flex justify-between w-26 font-bold uppercase px-2 py-1 rounded cursor-pointer text-sm  bg-blue-100 text-blue-600">
                  <p>Revisar: </p>
                  {
                    allTopics
                      .filter((t) => t.subjectId === s.id)
                      .filter((t) => t.status === "revisar").length
                  }
                </p>
              </div>
              <div className="relative w-full flex items-center justify-center">
                <svg className="w-44 h-44 transform -rotate-90">
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
                    strokeDashoffset={
                      471 - (471 * findCompletionPercentage(s, allTopics)) / 100
                    }
                    strokeLinecap="round"
                    className="text-[#806ECD] transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold text-slate-800">
                    {findCompletionPercentage(s, allTopics)}%
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    {t("home.mastery")}
                  </span>
                </div>
              </div>
            </section>

            <button
              onClick={() =>
                navigate("/subjects", { state: { subjectId: s.id } })
              }
              className="mt-6 w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 text-gray-600 font-medium rounded-lg group-hover:bg-[#806ECD] group-hover:text-white transition-all duration-300 cursor-pointer"
            >
              <span>Ver matéria</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Performance;
