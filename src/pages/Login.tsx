import { useState } from "react";
import { validateLoginData } from "../utils/validateLoginData";
import { login } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { LogIn, UserPlus } from "lucide-react"; 

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const loginSubmit = async (
    e: React.FormEvent<HTMLFormElement>, 
    email: string,
    password: string,
  ) => {
    e.preventDefault();

    if (!validateLoginData(email, password)) {
      return console.log("Erro ao validar dados de login.");
    }

    const data = await login({ email, password });
    if (data.success) {
      navigate("/home");
    }
  };

  return (
    <section className="flex flex-col w-screen h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#806ECD] rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <span className="text-white text-3xl font-bold italic">R</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Bem-vindo ao Revisei
          </h1>
          <p className="text-gray-500 text-sm">
            Organize seus estudos de forma simples
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => loginSubmit(e, email, password)}
        >
          <div className="flex flex-col gap-4">
            <FormInput label="Email" type="text" setState={setEmail} />
            <FormInput label="Senha" type="password" setState={setPassword} />

            <button
              type="submit"
              className="w-full h-12 bg-[#806ECD] text-white font-semibold rounded-xl 
                         hover:bg-[#6b5bb3] active:scale-[0.98] transition-all 
                         shadow-md hover:shadow-[#806ECD]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn size={20} />
              Entrar
            </button>
          </div>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative px-4 text-sm text-gray-400 bg-white">
            ou
          </span>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="w-full h-12 border-2 border-[#806ECD] text-[#806ECD] font-semibold rounded-xl 
                     hover:bg-purple-50 active:scale-[0.98] transition-all
                     flex items-center justify-center gap-2 cursor-pointer"
        >
          <UserPlus size={20} />
          Criar conta agora
        </button>
      </div>

      <p className="mt-8 text-gray-400 text-xs tracking-widest uppercase">
        © 2026 Revisei - Seu portfólio de estudos
      </p>
    </section>
  );
};

export default Login;
