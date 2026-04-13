import { Plus } from "lucide-react";

interface FloatingAddButtonProps {
  onClick: () => void;
}

export const FloatingAddButton = ({ onClick }: FloatingAddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-6 z-40 flex items-center justify-center 
                 w-14 h-14 bg-[#806ECD] text-white rounded-full shadow-lg 
                 hover:bg-[#6b5bb3] active:scale-95 sm:hover:scale-110 
                 transition-all duration-200 group cursor-pointer"
      aria-label="Adicionar matéria"
    >
      <Plus
        size={28}
        className="group-hover:rotate-90 transition-transform duration-300"
      />

      <span
        className="absolute right-16 scale-0 group-hover:scale-100 transition-all 
                       bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
      >
        Nova Matéria
      </span>
    </button>
  );
};
