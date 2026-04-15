import { BarChart3, Trash2 } from "lucide-react";
import type { Topic, TopicStatus } from "../types/topics";

interface TopicCardProps {
  topic: Topic;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string, status: TopicStatus) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  handleDelete,
  handleUpdate,
}) => {
  return (
    <div className="flex items-center h-22 justify-between p-4 pl-0 mb-3 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div
        onClick={() => handleDelete(topic.id)}
        className="bg-gray-200 h-22 w-8 rounded-l-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all cursor-pointer"
      >
        <Trash2 size={16} />
      </div>
      <div className="flex items-center gap-4">
        <div className="p-3 pl-0 bg-gray-50 rounded-lg text-gray-500">
          <BarChart3 className="w-6 h-6" />
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 w-30">{topic.title}</h4>
        </div>
      </div>

      <div className={`flex items-center gap-1 font-medium`}>
        {topic.status === "concluido" && (
          <button
            onClick={() => handleUpdate(topic.id, topic.status)}
            className={`text-sm bg-green-200 w-18 rounded cursor-pointer  transition-all`}
          >
            Concluído
          </button>
        )}
        {topic.status === "pendente" && (
          <button
            onClick={() => handleUpdate(topic.id, topic.status)}
            className={`text-sm bg-orange-200 w-18 rounded cursor-pointer  transition-all`}
          >
            Pendente
          </button>
        )}
        {topic.status === "revisar" && (
          <button
            onClick={() => handleUpdate(topic.id, topic.status)}
            className={`text-sm bg-blue-200 w-18 rounded cursor-pointer  transition-all`}
          >
            Revisar
          </button>
        )}
      </div>
    </div>
  );
};
