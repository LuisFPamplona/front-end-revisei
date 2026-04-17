import { X } from "lucide-react";
import type { ReactNode } from "react";

type ConfigModalProps = {
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
};

const ConfigModal = ({
  title,
  description,
  onClose,
  children,
}: ConfigModalProps) => {
  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-slate-800">{title}</h2>
              <p className="text-sm text-slate-500">{description}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
          <div className="px-6 py-5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ConfigModal;
