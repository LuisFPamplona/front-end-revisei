import { useState } from "react";
import FormInput from "../components/FormInput";
import { useNavigate } from "react-router-dom";
import { validateRegisterData } from "../utils/validadeRegisterData";
import { register } from "../services/authServices";
import { UserPlus, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const passwordRules = [
    {
      label: t("auth.register.passwordRules.minLength"),
      isValid: password.length >= 8,
    },
    {
      label: t("auth.register.passwordRules.uppercase"),
      isValid: /[A-Z]/.test(password),
    },
    {
      label: t("auth.register.passwordRules.special"),
      isValid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const registerSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    currentName: string,
    currentEmail: string,
    currentPassword: string,
  ) => {
    e.preventDefault();

    const validation = validateRegisterData(
      currentName,
      currentEmail,
      currentPassword,
    );

    if (!validation.isValid) {
      validation.errors.forEach((error) => toast.error(t(error)));
      return;
    }

    setIsSubmitting(true);
    const data = await register({
      name: currentName,
      email: currentEmail,
      password: currentPassword,
    });

    if (data.success) {
      toast.success(t("success.register"));
      navigate("/login");
    } else {
      toast.error(data.message || t("errors.register"));
    }

    setIsSubmitting(false);
  };

  return (
    <section className="flex flex-col w-screen h-screen items-center justify-center bg-[#806ECD]">
      <button
        onClick={() => navigate("/login")}
        className="absolute top-8 left-8 text-black/80 md:text-white hover:text-gray-400 md:hover:text-black flex items-center gap-2 transition-colors cursor-pointer"
      >
        <ArrowLeft size={20} />
        <span>{t("common.back")}</span>
      </button>

      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center md:pb-8">
          <div className="w-12 h-12 bg-purple-100 text-[#806ECD] rounded-full flex items-center justify-center mb-4">
            <UserPlus size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {t("auth.register.title")}
          </h1>
          <p className="text-gray-500 text-sm text-center">
            {t("auth.register.subtitle")}
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => registerSubmit(e, name, email, password)}
        >
          <FormInput
            label={t("form.name")}
            setState={setName}
            placeholder={t("form.placeholders.name")}
          />
          <FormInput
            label={t("form.email")}
            type="email"
            setState={setEmail}
            placeholder={t("form.placeholders.email")}
          />
          <FormInput
            label={t("form.password")}
            type="password"
            setState={setPassword}
            placeholder={t("form.placeholders.password")}
          />

          <div className="rounded-xl bg-violet-50 border border-violet-100 p-4">
            <p className="text-sm font-semibold text-slate-700 mb-2">
              {t("auth.register.passwordRulesTitle")}
            </p>
            <div className="flex flex-col gap-1.5">
              {passwordRules.map((rule) => (
                <span
                  key={rule.label}
                  className={`text-sm ${rule.isValid ? "text-emerald-600" : "text-slate-500"}`}
                >
                  {rule.isValid ? "OK" : "•"} {rule.label}
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 mt-6 bg-[#806ECD] text-white font-bold rounded-xl 
                       hover:bg-[#6b5bb3] active:scale-[0.98] transition-all 
                       shadow-lg shadow-purple-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? t("auth.register.submitting")
              : t("auth.register.submit")}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600 text-sm">
            {t("auth.register.alreadyHaveAccount")}{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#806ECD] font-bold hover:underline cursor-pointer"
            >
              {t("auth.register.loginAction")}
            </button>
          </p>
        </div>
      </div>

      <p className="mt-4 text-white/60 text-xs tracking-widest uppercase">
        {t("auth.register.footer")}
      </p>
    </section>
  );
};

export default Register;
