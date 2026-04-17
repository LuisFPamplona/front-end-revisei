import { useState, useEffect } from "react";
import {
  Clock,
  ChevronLeft,
  RotateCcw,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import type { Topic, TopicStatus } from "../types/topics";
import { useTranslation } from "react-i18next";

interface ReviewSessionProps {
  topic: Topic;
  onClose: () => void;
  onFinish: (id: string, status: TopicStatus) => void;
}

export default function ReviewSession({
  topic,
  onClose,
  onFinish,
}: ReviewSessionProps) {
  const [seconds, setSeconds] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 bg-white z-100 flex flex-col animate-in fade-in zoom-in-95 duration-300">
      <header className="p-4 border-b flex items-center justify-between bg-slate-50">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium cursor-pointer"
        >
          <ChevronLeft size={20} />
          <span>{t("review.exit")}</span>
        </button>

        <div className="flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
          <Clock size={16} className="text-[#806ECD]" />
          <span className="font-mono font-bold text-slate-700">
            {formatTime(seconds)}
          </span>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-4xl font-bold text-slate-800">{topic.title}</h1>
          <p className="text-slate-400">{t("review.focusTime")}</p>
        </div>

        <div className="mt-12 w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 flex gap-4 items-start">
          <div className="p-3 bg-white rounded-2xl shadow-sm text-[#806ECD]">
            <BookOpen size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">
              {t("review.studyTipTitle")}
            </h4>
            <p className="text-sm text-slate-500">
              {t("review.studyTipDescription")}
            </p>
          </div>
        </div>
      </main>

      <footer className="p-6 border-t bg-slate-50">
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
          <button
            onClick={() => onFinish(topic.id, "concluido")}
            className="flex items-center justify-center gap-3 py-4 px-2 bg-white border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer"
          >
            <RotateCcw size={20} />
            {t("review.stillUnsure")}
          </button>

          <button
            onClick={() => onFinish(topic.id, "pendente")}
            className="flex items-center justify-center gap-3 py-4 px-2 bg-[#806ECD] text-white font-bold rounded-2xl shadow-lg hover:bg-[#6b5bb3] transition-all cursor-pointer"
          >
            <CheckCircle size={20} />
            {t("review.markCompleted")}
          </button>
        </div>
      </footer>
    </div>
  );
}
