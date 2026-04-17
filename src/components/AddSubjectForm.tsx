import { useState } from "react";
import { Check, X } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface AddSubjectFormProps {
  onConfirm: (title: string) => void;
  onCancel: () => void;
}

export const AddSubjectForm = ({
  onConfirm,
  onCancel,
}: AddSubjectFormProps) => {
  const [name, setName] = useState("");
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error(t("validation.subjectNameRequired"));
      return;
    }

    onConfirm(name);
    setName("");
  };

  return (
    <div className="flex w-92 h-42 flex-col justify-center gap-4 p-3 border-2 border-dashed border-[#806ECD]/30 rounded-xl bg-purple-50/50">
      <input
        autoFocus
        type="text"
        placeholder={t("form.placeholders.subjectName")}
        className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#806ECD]"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 flex items-center cursor-pointer justify-center gap-1 bg-[#806ECD] text-white py-2 rounded-lg hover:bg-[#6b5bb3] transition-colors font-bold"
        >
          <Check className="w-6 h-6" /> {t("common.save")}
        </button>
        <button
          onClick={onCancel}
          className="px-3 bg-gray-200 cursor-pointer text-gray-600 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
