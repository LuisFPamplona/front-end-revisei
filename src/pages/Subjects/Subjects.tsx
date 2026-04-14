import { useNavigate } from "react-router-dom";
import { FloatingAddButton } from "../../components/FloatingAddButton";
import Sidebar from "../../components/layout/Sidebar";
import { SubjectCard } from "../../components/SubjectCard";
import { useEffect, useState } from "react";
import type { Subject } from "../../types/user";
import { getSubjects } from "../../services/subjectServices";

const Subjects = () => {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const loadSubjects = async () => {
      const data = await getSubjects();

      if (data.success) {
        setSubjects(data.data);
      }
    };

    loadSubjects();
  }, []);

  return (
    <>
      <Sidebar />
      <FloatingAddButton onClick={() => navigate("/add-subject")} />
      <section className="flex flex-col w-screen h-screen items-center md:pl-64">
        <div>
          <div className="mb-8 w-full grid justify-center items-center pt-2 md:justify-start">
            <h1 className="text-3xl font-bold text-gray-800">Matérias</h1>
            <div className="h-1 w-12 bg-[#806ECD] rounded-full mt-2"></div>
          </div>
          <div className="grid gap-2 pb-16 md:grid-cols-4">
            {subjects.map((item) => {
              return (
                <SubjectCard id={item.id} name={item.name} topicCount={32} />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Subjects;
