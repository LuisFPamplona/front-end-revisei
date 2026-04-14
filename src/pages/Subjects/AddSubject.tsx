import { useState } from "react";
import FormInput from "../../components/FormInput";
import Sidebar from "../../components/layout/Sidebar";
import { validadeSubjectData } from "../../utils/validadeSubjectData";
import { createSubject } from "../../services/subjectServices";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AddSubject = () => {
  const [subjectName, setSubjectName] = useState<string>("");
  const navigate = useNavigate();

  const createSubjectSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
    name: string,
  ) => {
    e.preventDefault();

    if (!validadeSubjectData) {
      return console.log("Erro ao validar dados da matéria.");
    }

    const data = await createSubject(name);

    if (data.success) {
      navigate("/subjects");
    }
  };
  return (
    <>
      <Sidebar />
      <section className="flex flex-col w-screen h-screen items-center md:pl-64">
        <div className="mb-8 w-full grid justify-center items-center pt-2 md:pl-4 md:justify-start">
          <h1 className="text-3xl font-bold text-gray-800">
            Adicionar matéria
          </h1>
          <div className="h-1 w-32 bg-[#806ECD] rounded-full mt-2"></div>
        </div>
        <div className="md:w-full md:pl-16">
          <div className="w-full flex justify-end md:justify-start">
            <button
              onClick={() => navigate("/subjects")}
              className="text-white font-bold hover:shadow-[#806ECD]/20 hover:bg-[#6b5bb3] active:scale-[0.98] bg-[#806ECD] p-3 rounded-2xl  flex items-center gap-2 transition-all cursor-pointer "
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          <form
            className="w-82 mt-8 space-y-6"
            onSubmit={(e) => createSubjectSubmit(e, subjectName)}
          >
            <FormInput
              label="Nome da matéria"
              setState={setSubjectName}
              placeholder="Digite o nome da matéria..."
            />
            <button
              className="w-full h-12 bg-[#806ECD] text-white font-semibold rounded-xl 
            hover:bg-[#6b5bb3] active:scale-[0.98] transition-all 
            shadow-md hover:shadow-[#806ECD]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              Adicionar matéria
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddSubject;
