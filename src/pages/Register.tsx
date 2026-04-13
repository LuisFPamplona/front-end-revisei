import { useState } from "react";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import { validateRegisterData } from "../utils/validadeRegisterData";
import { register } from "../services/authServices";
import { UserPlus, ArrowLeft } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    name: string,
    email: string,
    password: string,
  ) => {
    e.preventDefault();

    if (!validateRegisterData(name, email, password)) {
      return console.log("Erro ao validar dados de registro.");
    }

    const data = await register({ name, email, password });

    if (data.success) {
      navigate("/login");
    }
  };

  return (
    <section className="flex flex-col w-screen h-screen items-center justify-center bg-[#806ECD]">
      <button
        onClick={() => navigate("/login")}
        className="absolute top-8 left-8 text-black/80 md:text-white hover:text-gray-400 md:hover:text-black  flex items-center gap-2 transition-colors cursor-pointer"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </button>

      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center md:pb-8">
          <div className="w-12 h-12 bg-purple-100 text-[#806ECD] rounded-full flex items-center justify-center mb-4">
            <UserPlus size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Crie sua conta</h1>
          <p className="text-gray-500 text-sm text-center">
            Junte-se ao Revisei e comece a organizar seus estudos.
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => registerSubmit(e, name, email, password)}
        >
          <FormInput
            label="Nome"
            setState={setName}
            placeholder="Seu nome completo"
          />
          <FormInput
            label="Email"
            type="email"
            setState={setEmail}
            placeholder="exemplo@email.com"
          />
          <FormInput
            label="Senha"
            type="password"
            setState={setPassword}
            placeholder="Crie uma senha forte"
          />

          <button
            type="submit"
            className="w-full h-12 mt-6 bg-[#806ECD] text-white font-bold rounded-xl 
                       hover:bg-[#6b5bb3] active:scale-[0.98] transition-all 
                       shadow-lg shadow-purple-200 cursor-pointer"
          >
            Cadastrar no Revisei
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600 text-sm">
            Já tem uma conta?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#806ECD] font-bold hover:underline cursor-pointer"
            >
              Fazer login
            </button>
          </p>
        </div>
      </div>

      <p className="mt-4 text-white/60 text-xs tracking-widest uppercase">
        Prepare-se para a aprovação
      </p>
    </section>
  );
};

export default Register;
