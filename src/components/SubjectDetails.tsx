import { X, Plus } from "lucide-react";
import { TopicCard } from "../components/TopicCard";
import type { Topic, TopicStatus } from "../types/topics";
import type { Subject } from "../types/user";
import { useEffect, useState } from "react";
import {
  createTopic,
  deleteTopic,
  getTopics,
  updateTopic,
} from "../services/topicServices";
import { AddTopicForm } from "./AddTopicForm";
import ReviewSession from "./ReviewSession";
import { Slide, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useDashboardData } from "../features/dashboard/hooks/useDashboardData";
import { useAuth } from "../features/auth/hooks/useAuth";
import Swal from "sweetalert2";

interface SubjectDetailsProps {
  subject: Subject;
  toggle: () => void;
  display: boolean;
  homeSelectedTopicId?: string | null;
  clearHomeSelectedTopicId: () => void;
}

const SubjectDetails = ({
  subject,
  toggle,
  display,
  clearHomeSelectedTopicId,
  homeSelectedTopicId,
}: SubjectDetailsProps) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const { t } = useTranslation();
  const { refreshDashboardData } = useDashboardData();
  const { loadUser } = useAuth();

  if (!subject) {
    return;
  }

  useEffect(() => {
    const loadTopics = async () => {
      const data = await getTopics(subject.id);

      if (!data.success) {
        toast.error(data.message || t("errors.loadTopics"));
        return;
      }

      setTopics(data.data);
    };

    if (display) {
      void loadTopics();
    }
  }, [display, subject.id, t]);

  useEffect(() => {
    if (!homeSelectedTopicId) return;

    const selected = topics.find((t) => t.id === homeSelectedTopicId);
    if (!selected) return;

    setActiveTopic(selected);
    clearHomeSelectedTopicId();
  }, [topics, homeSelectedTopicId, clearHomeSelectedTopicId]);

  const handleAddTopic = async (title: string) => {
    const data = await createTopic(title, subject.id);

    if (!data.success) {
      toast.error(data.message || t("errors.createTopic"));
      return;
    }

    setTopics((prev) => [...prev, data.data]);
    setIsAdding(false);
    refreshDashboardData();
    toast.success(t("success.topicCreated"));
  };

  const handleDelete = async (id: string) => {
    const data = await deleteTopic(id);

    if (!data.success) {
      toast.error(data.message || t("errors.deleteTopic"));
      return;
    }

    setTopics((prev) => prev.filter((topic) => topic.id !== id));
    refreshDashboardData();
    toast.success(t("success.topicDeleted"));
  };

  const handleUpdate = async (
    id: string,
    status: TopicStatus,
    seconds?: number,
  ) => {
    let updatedStatus: TopicStatus;
    let isoDate;
    let data;

    if (seconds != undefined && seconds < 600) {
      const result = await Swal.fire({
        title: "Tem certeza?",
        text: "Tópicos concluídos em menos de 10 minutos recebem apenas 20% de experiência, e não recebe gemas.",
        icon: "warning",
        background: "white",
        color: "#806ECD",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Sim, concluír.",
        cancelButtonText: "Cancelar",
      });
      if (!result.isConfirmed) {
        toast.error("Tópico não concluído.");
        return;
      }
    }

    if (status === "pendente") {
      updatedStatus = "concluido";
      isoDate = new Date().toISOString();
    } else if (status === "concluido") {
      updatedStatus = "revisar";
      isoDate = "1970-01-01T00:00:00.000Z";
    } else {
      updatedStatus = "pendente";
      isoDate = "1970-01-01T00:00:00.000Z";
    }

    data = await updateTopic(id, updatedStatus, undefined, isoDate, seconds);

    if (!data.success) {
      toast.error(data.message || t("errors.updateTopic"));
      return;
    }

    if (
      updatedStatus === "concluido" &&
      data.rewards?.rewards.gemReward != undefined &&
      data.rewards?.rewards.experienceReward != undefined
    ) {
      toast.info(
        `Recebeu ${data.rewards?.rewards.gemReward} gemas e ${data.rewards?.rewards.experienceReward} de exp.`,
        {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          draggable: true,
          theme: "colored",
          transition: Slide,
        },
      );
    }
    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === id ? { ...topic, status: updatedStatus } : topic,
      ),
    );
    loadUser();
    refreshDashboardData();
    toast.success(t("success.topicUpdated"));
  };

  const doneTopics = topics.filter((topic) => topic.status === "concluido");
  const donePercent =
    topics.length > 0
      ? Math.round((doneTopics.length / topics.length) * 100)
      : 0;

  return (
    <>
      {display && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={toggle}
        />
      )}

      {display && (
        <div
          className={`fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] 
          h-[90vh] max-h-140 md:max-h-180 w-92 md:w-180 rounded-2xl bg-white shadow-2xl z-50 
          flex flex-col overflow-hidden transition-all duration-300 ease-in-out md:left-[36%] md:translate-x-0`}
        >
          <div className="p-6 pb-4 flex justify-between items-start shrink-0">
            <div className="flex items-center gap-4">
              <div className="bg-[#806ECD] p-3 w-12 text-center rounded-2xl text-white font-bold text-xl italic">
                {subject.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                  {subject.name}
                </h2>
                <p className="text-gray-500">{t("subjectDetails.subtitle")}</p>
              </div>
            </div>
            <button
              onClick={toggle}
              className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 mb-4 shrink-0">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-700">
                {t("subjectDetails.totalTopics", {
                  done: doneTopics.length,
                  total: topics.length,
                  percent: donePercent,
                })}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-[#6b5bb3] h-2 rounded-full transition-all duration-500"
                style={{ width: `${donePercent}%` }}
              ></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 min-h-0">
            <div className="md:grid md:grid-cols-2 gap-3">
              {topics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  handleDelete={handleDelete}
                  onStartReview={(selectedTopic) =>
                    setActiveTopic(selectedTopic)
                  }
                />
              ))}

              {isAdding && (
                <AddTopicForm
                  onConfirm={handleAddTopic}
                  onCancel={() => setIsAdding(false)}
                />
              )}

              {activeTopic && (
                <ReviewSession
                  topic={activeTopic}
                  onClose={() => setActiveTopic(null)}
                  onFinish={(id, status, seconds) => {
                    void handleUpdate(id, status, seconds);
                    setActiveTopic(null);
                  }}
                />
              )}
            </div>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-3 md:flex-row shrink-0">
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#806ECD] hover:bg-[#6b5bb3] text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
              >
                <Plus className="w-5 h-5" /> {t("subjectDetails.addTopic")}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectDetails;
