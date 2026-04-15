import { useState } from "react";
import { Check, X } from "lucide-react";

interface AddTopicFormProps {
  onConfirm: (title: string) => void;
  onCancel: () => void;
}

export const AddTopicForm = ({ onConfirm, onCancel }: AddTopicFormProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (title.trim()) {
      onConfirm(title);
      setTitle("");
    }
  };

  return (
    <div className="flex flex-col gap-2 p-3 border-2 border-dashed border-[#806ECD]/30 rounded-xl bg-purple-50/50">
      <input
        autoFocus
        type="text"
        placeholder="Título do tópico..."
        className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#806ECD]"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 flex items-center cursor-pointer justify-center gap-1 bg-[#806ECD] text-white py-2 rounded-lg hover:bg-[#6b5bb3] transition-colors text-sm font-bold"
        >
          <Check className="w-4 h-4" /> Confirmar
        </button>
        <button
          onClick={onCancel}
          className="px-3 bg-gray-200 cursor-pointer text-gray-600 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
