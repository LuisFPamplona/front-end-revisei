import type { LucideIcon } from "lucide-react";


interface FloatingButtonProps {
  onClick: () => void;
  icon: LucideIcon;
  title: string;
  rotate: number;
  position: "left" | "right";
}

export const FloatingButton = ({
  onClick,
  icon: Icon,
  title,
  rotate,
  position,
}: FloatingButtonProps) => {
  const labelPositionClass = position === "right" ? "right-16" : "left-16";

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 ${position}-6 z-40 flex items-center justify-center 
                 w-14 h-14 bg-[#806ECD] text-white rounded-full shadow-lg 
                 hover:bg-[#6b5bb3] active:scale-95 sm:hover:scale-110 
                 transition-all duration-200 group cursor-pointer md:ml-64`}
    >
      <Icon
        size={28}
        className={`group-hover:rotate-${rotate} transition-transform duration-300`}
      />

      <span
        className={`absolute ${labelPositionClass} scale-0 group-hover:scale-100 transition-all 
                       bg-gray-800 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap`}
      >
        {title}
      </span>
    </button>
  );
};
