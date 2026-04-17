import { useTranslation } from "react-i18next";

interface FormInputProps {
  label: string;
  setState: (value: string) => void;
  type?: "text" | "password" | "email";
  placeholder?: string;
}

const FormInput = ({ label, setState, type, placeholder }: FormInputProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-gray-700 ml-1">{label}</label>

      <input
        type={type}
        placeholder={
          placeholder ||
          t("form.placeholders.default", { label: label.toLowerCase() })
        }
        onChange={(e) => setState(e.target.value)}
        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl
                   text-gray-800 placeholder:text-gray-400
                   focus:outline-none focus:border-[#806ECD] focus:ring-2 focus:ring-[#806ECD]/10
                   transition-all duration-200"
      />
    </div>
  );
};

export default FormInput;
