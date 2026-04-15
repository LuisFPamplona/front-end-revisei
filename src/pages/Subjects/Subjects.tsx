import Sidebar from "../../components/layout/Sidebar";
import { SubjectCard } from "../../components/SubjectCard";
import { useEffect, useState } from "react";
import type { Subject } from "../../types/user";

import { createSubject, getSubjects } from "../../services/subjectServices";
import { Plus } from "lucide-react";
import SubjectDetails from "../../components/SubjectDetails";
import { AddSubjectForm } from "../../components/AddSubjectForm";

const Subjects = () => {
  const [isSubjectDetailsOpen, setIsSubjectDetailsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const toggleSubjectDetails = () =>
    setIsSubjectDetailsOpen(!isSubjectDetailsOpen);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectDetail, setSubjectDetail] = useState<Subject>({
    id: "0",
    name: "0",
    userId: "0",
  });

  useEffect(() => {
    const loadSubjects = async () => {
      const data = await getSubjects();

      if (data.success) {
        setSubjects(data.data);
      }
    };

    loadSubjects();
  }, [subjects]);

  const handleAddSubject = async (name: string) => {
    const data = await createSubject(name);

    if (!data.success) {
      return { success: false, message: "Erro ao criar matéria" };
    }

    setSubjects((prev) => [...prev, data.data]);
    setIsAdding(false);
  };

  return (
    <>
      <SubjectDetails
        subject={subjectDetail}
        toggle={toggleSubjectDetails}
        display={isSubjectDetailsOpen}
      />
      <Sidebar />

      <section className="min-h-screen w-full md:pl-64 flex flex-col items-center overflow-x-hidden">
        <div>
          <div className="mb-8 w-full grid justify-center items-center pt-2">
            <h1 className="text-3xl font-bold text-gray-800">Matérias</h1>
            <div className="h-1 w-[30%] bg-[#806ECD] rounded-full mt-2"></div>
          </div>
          <div className="grid gap-2 pb-16 md:grid-cols-4">
            {subjects.map((item) => {
              return (
                <SubjectCard
                  subject={item}
                  id={item.id}
                  name={item.name}
                  topicCount={item._count?.topics ?? 0}
                  toggle={toggleSubjectDetails}
                  setSubject={setSubjectDetail}
                />
              );
            })}
            {isAdding && (
              <AddSubjectForm
                onConfirm={handleAddSubject}
                onCancel={() => setIsAdding(false)}
              />
            )}
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex-1 flex w-92 items-center justify-center gap-2 bg-[#806ECD] hover:bg-[#6b5bb3] text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5" /> Adicionar Matéria
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Subjects;
