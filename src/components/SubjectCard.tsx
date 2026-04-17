import { BookOpen, ArrowRight, X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { Subject } from "../types/user";
import { deleteSubject } from "../services/subjectServices";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface SubjectCardProps {
  subject: Subject;
  id: string;
  name: string;
  topicCount?: number;
  onDelete: (id: string) => void;
  toggle: () => void;
  setSubject: Dispatch<SetStateAction<Subject>>;
}

export const SubjectCard = ({
  subject,
  id,
  name,
  topicCount = 0,
  toggle,
  setSubject,
  onDelete,
}: SubjectCardProps) => {
  const { t } = useTranslation();

  const handleDelete = async (currentId: string) => {
    const data = await deleteSubject(currentId);

    if (!data.success) {
      toast.error(data.message || t("errors.deleteSubject"));
      return;
    }

    onDelete(currentId);
    toast.success(t("success.subjectDeleted"));
  };

  return (
    <div className="group relative w-92 h-42 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-[#806ECD]/50 transition-all duration-300">
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
              {t("subjects.topicCount", { count: topicCount })}
            </p>
          </div>
        </div>
        <button
          onClick={() => handleDelete(id)}
          className="bg-gray-50 text-gray-400 p-1 cursor-pointer hover:bg-red-500 hover:text-white transition-all rounded"
        >
          <X />
        </button>
      </div>

      <button
        onClick={() => {
          setSubject(subject);
          toggle();
        }}
        className="mt-6 w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 text-gray-600 font-medium rounded-lg group-hover:bg-[#806ECD] group-hover:text-white transition-all duration-300 cursor-pointer"
      >
        <span>{t("subjects.viewTopics")}</span>
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition-transform"
        />
      </button>
    </div>
  );
};
