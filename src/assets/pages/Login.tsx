import { useState } from "react";
import { validateLoginData } from "../utils/validateLoginData";
import { login } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";

const Login = () => {
  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const loginSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
    email: string,
    password: string,
  ) => {
    e.preventDefault();

    if (!validateLoginData(email, password)) {
      return console.log("Erro ao validar dados de login.");
    }

    const data = await login({ email, password });
    console.log(data);
    if (data.success) {
      navigate("/home");
    }
  };

  return (
    <>
      <section className="flex flex-col w-screen h-screen items-center">
        <h1 className="pt-24">Super tela de login do REVISEI</h1>
        <form
          action="submit"
          className="pt-24"
          onSubmit={(e) => loginSubmit(e, email, password)}
        >
          <div className="flex flex-col gap-2">
            <FormInput label="Email" setState={setEmail} />
            <FormInput label="Senha" setState={setPassword} />

            <button
              type="submit"
              className="w-72 h-12 border rounded-full active:scale-98 cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </form>
        <button
          onClick={() => navigate("/register")}
          className="w-72 h-12 mt-12 border rounded-full active:scale-98 cursor-pointer"
        >
          Criar conta
        </button>
      </section>
    </>
  );
};

export default Login;
