import { BarChart3, Trash2, PlayCircle } from "lucide-react";
import type { Topic, TopicStatus } from "../types/topics";
import { useTranslation } from "react-i18next";

interface TopicCardProps {
  topic: Topic;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, status: TopicStatus) => void;
  onStartReview: (topic: Topic) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  handleDelete,
  handleUpdate,
  onStartReview,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center h-22 justify-between pl-0 mb-3 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all group">
      <div
        onClick={() => handleDelete(topic.id)}
        className="bg-gray-100 h-22 rounded-l-xl p-1 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all cursor-pointer text-gray-400"
      >
        <Trash2 size={16} />
      </div>

      <div className="flex flex-1 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-[#806ECD] transition-colors">
            <BarChart3 className="w-5 h-5" />
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 text-sm line-clamp-1 w-full max-w-42 md:w-42 md:max-w-42">
              {topic.title}
            </h4>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          <button
            onClick={() => onStartReview(topic)}
            className="p-2 bg-purple-50 text-[#806ECD] rounded-full hover:bg-[#806ECD] hover:text-white transition-all cursor-pointer shadow-sm"
            title={t("topicCard.startReview")}
          >
            <PlayCircle size={22} />
          </button>
          <span
            onClick={() => handleUpdate(topic.id, topic.status)}
            className={`text-[10px] w-18 text-center font-bold uppercase px-2 py-1 rounded cursor-pointer ${
              topic.status === "concluido"
                ? "bg-green-100 text-green-600"
                : topic.status === "pendente"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-blue-100 text-blue-600"
            }`}
          >
            {t(`topicStatus.${topic.status}`)}
          </span>
        </div>
      </div>
    </div>
  );
};
