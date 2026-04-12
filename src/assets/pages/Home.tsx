import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../services/subjectServices";
import type { Subject } from "../types/user";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [subjects, setSubjects] = useState<Subject>();

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
      <section className="flex flex-col w-screen h-screen items-center">
        <div className="w-full h-12 pl-1 pr-4 bg-black flex justify-between items-center text-white">
          <div>Nav</div>
          <div>Revisei</div>
          <button
            onClick={handleLogout}
            className="bg-red-600 w-12 h-8 rounded-xl text-center font-bold text-sm active:scale-98 cursor-pointer transition-all"
          >
            Sair
          </button>
        </div>
        <div>
          <div>
            <h1>Matérias</h1>
            <div className="flex flex-col w-full h-full gap-2">
              {subjects?.length > 0 &&
                subjects.map((subject) => {
                  return (
                    <div
                      key={subject.id}
                      className="border w-72 h-16 rounded-xl"
                    >
                      {subject.name}
                    </div>
                  );
                })}
              {subjects?.length === 0 && <div>Nenhuma matéria</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
