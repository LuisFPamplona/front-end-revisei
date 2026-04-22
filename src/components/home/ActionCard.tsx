import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import type { TopicWithSubjectName } from "../../types/topics";
import type { Subject } from "../../types/user";

interface ActionCardProps {
  topic?: TopicWithSubjectName;
  subject?: Subject | null;
  title: string;
  buttonText: string;
  subjectPercentage?: number;
}

function ActionCard({
  topic,
  title,
  buttonText,
  subject,
  subjectPercentage,
}: ActionCardProps) {
  const navigate = useNavigate();
  return (
    <div className="flex-none w-92 md:w-102 snap-center">
      <h2 className="text-sm font-semibold text-slate-700 uppercase mb-4 px-2">
        {t(title)}
      </h2>

      <div className="flex flex-col w-92 gap-6 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group hover:border-[#806ECD] transition-colors">
        <div className="flex w-full justify-between">
          <div className="p-3 bg-purple-50 text-[#806ECD] rounded-lg group-hover:bg-[#806ECD] group-hover:text-white transition-colors duration-300">
            <BookOpen size={24} />
          </div>
          {topic && (
            <div className="cursor-default max-w-58">
              <span className="text-[10px] font-bold text-[#806ECD] uppercase">
                {topic.subjectName}
              </span>
              <h3 className="text-slate-800 font-semibold">{topic.title}</h3>
            </div>
          )}
          {subject && (
            <div className="cursor-default max-w-58">
              <span className="text-[10px] font-bold text-[#806ECD] uppercase">
                MAIOR DESEMPENHO
              </span>
              <h3 className="text-slate-800 font-semibold">{subject.name}</h3>
            </div>
          )}
          {topic && (
            <div>
              <span
                className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${topic.status === "revisar" ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-600"}`}
              >
                {t(`topicStatus.${topic.status}`)}
              </span>
            </div>
          )}
          {subject && subjectPercentage && (
            <div>
              <span
                className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase bg-slate-100`}
              >
                {subjectPercentage}% concluído
              </span>
            </div>
          )}
        </div>
        {topic && (
          <button
            onClick={() =>
              navigate(`/subjects`, {
                state: {
                  subjectId: topic.subjectId,
                  topicId: topic.id,
                },
              })
            }
            className="bg-gray-50 text-gray-600 font-medium p-2 w-38 text-sm shadow-sm rounded-2xl border border-slate-100 flex items-center justify-center  group-hover:bg-[#806ECD] group-hover:text-white transition-all duration-300 cursor-pointer"
          >
            {t(buttonText)}
          </button>
        )}
        {subject && (
          <button
            onClick={() => navigate("/performance")}
            className="bg-gray-50 text-gray-600 font-medium p-2 w-38 text-sm shadow-sm rounded-2xl border border-slate-100 flex items-center justify-center  group-hover:bg-[#806ECD] group-hover:text-white transition-all duration-300 cursor-pointer"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

export default ActionCard;
