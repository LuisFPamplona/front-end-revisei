import { useState } from "react";
import { login } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import { LogIn, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { validateLoginData } from "../utils/validateLoginData";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loginSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    currentEmail: string,
    currentPassword: string,
  ) => {
    e.preventDefault();

    const validation = validateLoginData(currentEmail, currentPassword);

    if (!validation.isValid) {
      validation.errors.forEach((error) => toast.error(t(error)));
      return;
    }

    setIsSubmitting(true);

    const data = await login({
      email: currentEmail,
      password: currentPassword,
    });

    if (data.success) {
      toast.success(t("success.login"));
      navigate("/home");
    } else {
      toast.error(data.message || t("errors.login"));
    }

    setIsSubmitting(false);
  };

  return (
    <section className="flex flex-col w-screen h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-[#806ECD] rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <span className="text-white text-3xl font-bold italic">R</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {t("auth.login.title")}
          </h1>
          <p className="text-gray-500 text-sm">{t("auth.login.subtitle")}</p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => loginSubmit(e, email, password)}
        >
          <div className="flex flex-col gap-4">
            <FormInput
              label={t("form.email")}
              type="text"
              setState={setEmail}
              placeholder={t("form.placeholders.email")}
            />
            <FormInput
              label={t("form.password")}
              type="password"
              setState={setPassword}
              placeholder={t("form.password")}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#806ECD] text-white font-semibold rounded-xl 
                         hover:bg-[#6b5bb3] active:scale-[0.98] transition-all 
                         shadow-md hover:shadow-[#806ECD]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <LogIn size={20} />
              {isSubmitting
                ? t("auth.login.submitting")
                : t("auth.login.submit")}
            </button>
          </div>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative px-4 text-sm text-gray-400 bg-white">
            {t("common.or")}
          </span>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="w-full h-12 border-2 border-[#806ECD] text-[#806ECD] font-semibold rounded-xl 
                     hover:bg-purple-50 active:scale-[0.98] transition-all
                     flex items-center justify-center gap-2 cursor-pointer"
        >
          <UserPlus size={20} />
          {t("auth.login.createAccount")}
        </button>
      </div>

      <p className="mt-8 text-gray-400 text-xs tracking-widest uppercase">
        {t("auth.login.footer")}
      </p>
    </section>
  );
};

export default Login;
