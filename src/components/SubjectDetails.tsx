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

interface SubjectDetailsProps {
  subject: Subject;
  toggle: () => void;
  display: boolean;
}

const SubjectDetails = ({ subject, toggle, display }: SubjectDetailsProps) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const loadTopics = async () => {
      const data = await getTopics(subject.id);
      if (!data.success) return;
      setTopics(data.data);
    };
    if (display) loadTopics();
  }, [subject, display]);

  const handleAddTopic = async (title: string) => {
    const data = await createTopic(title, subject.id);
    if (!data.success) return;

    setTopics([...topics, data.data]);
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    const data = await deleteTopic(id);

    if (!data.success) {
      return { success: false, message: "Erro ao deletar tópico." };
    }

    setTopics((prev) => prev.filter((topic) => topic.id !== id));
  };

  const handleUpdate = async (id: string, status: TopicStatus) => {
    let updatedStatus: TopicStatus;

    if (status === "pendente") {
      updatedStatus = "concluido";
    } else if (status === "concluido") {
      updatedStatus = "revisar";
    } else {
      updatedStatus = "pendente";
    }

    const data = await updateTopic(id, updatedStatus);

    if (!data.success) {
      return { success: false, message: "Erro ao modificar tópico." };
    }

    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === id ? { ...topic, status: updatedStatus } : topic,
      ),
    );
  };

  const doneTopics = topics.filter((i) => i.status === "concluido");
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
                <p className="text-gray-500">Gerencie seus tópicos</p>
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
                Total tópicos: {doneTopics.length} / {topics.length} (
                {donePercent}%)
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
                  handleUpdate={handleUpdate}
                />
              ))}

              {isAdding && (
                <AddTopicForm
                  onConfirm={handleAddTopic}
                  onCancel={() => setIsAdding(false)}
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
                <Plus className="w-5 h-5" /> Adicionar Tópico
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectDetails;
