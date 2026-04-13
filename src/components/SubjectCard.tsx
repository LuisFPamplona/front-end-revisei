import { BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SubjectCardProps {
  id: string;
  name: string;
  topicCount?: number; // adicionar no backend depois, vai ficar mais "útil" o card
}

export const SubjectCard = ({ id, name, topicCount = 0 }: SubjectCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#806ECD]/50 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-[#806ECD] rounded-lg group-hover:bg-[#806ECD] group-hover:text-white transition-colors duration-300">
            <BookOpen size={24} />
          </div>

          <div className="cursor-default w-58">
            <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#806ECD] transition-colors">
              {name}
            </h3>
            <p className="text-sm text-gray-500">
              {topicCount}{" "}
              {topicCount === 1 ? "tópico cadastrado" : "tópicos cadastrados"}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate(`/subject/${id}`)}
        className="mt-6 w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 text-gray-600 font-medium rounded-lg group-hover:bg-[#806ECD] group-hover:text-white transition-all duration-300 cursor-pointer"
      >
        <span>Ver tópicos</span>
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>
    </div>
  );
};
