import { useState } from "react";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import { validateRegisterData } from "../utils/validadeRegisterData";
import { register } from "../services/authServices";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const registerSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
    name: string,
    email: string,
    password: string,
  ) => {
    e.preventDefault();

    if (!validateRegisterData(name, email, password)) {
      return console.log("Erro ao validar dados de registro.");
    }

    const data = await register({ name, email, password });

    console.log(data);
    if (data.success) {
      navigate("/login");
    }
  };
  return (
    <>
      <section className="flex flex-col w-screen h-screen items-center">
        <h1 className="pt-24">Super tela de registro do REVISEI</h1>
        <form
          action="submit"
          className="pt-24"
          onSubmit={(e) => registerSubmit(e, name, email, password)}
        >
          <div className="flex flex-col gap-2">
            <FormInput label="Nome" setState={setName} />
            <FormInput label="Email" setState={setEmail} />
            <FormInput label="Senha" setState={setPassword} />
            <button
              type="submit"
              className="w-72 h-12 border rounded-full active:scale-98 cursor-pointer"
            >
              Criar conta
            </button>
          </div>
        </form>
        <button
          onClick={() => navigate("/login")}
          className="w-72 h-12 mt-12 rounded-full active:scale-98 cursor-pointer underline"
        >
          Já tem uma conta?
        </button>
      </section>
    </>
  );
};

export default Register;
