import { useState } from "react";
import { toast } from "react-toastify";
import { updateMe } from "../../services/userServices";
import type { User } from "../../types/user";
import { useTranslation } from "react-i18next";

type SecuritySettingsFormProps = {
  onClose: () => void;
  onSuccess: (user: User) => void;
};

const SecuritySettingsForm = ({
  onClose,
  onSuccess,
}: SecuritySettingsFormProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentPassword.trim()) {
      toast.error(t("validation.currentPasswordRequired"));
      return;
    }

    if (password.length < 8) {
      toast.error(t("validation.passwordMinLength"));
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error(t("validation.passwordUppercase"));
      return;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      toast.error(t("validation.passwordSpecial"));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t("validation.confirmPasswordMismatch"));
      return;
    }

    setIsSubmitting(true);

    const data = await updateMe({
      currentPassword,
      password,
    });

    if (data.success) {
      toast.success(t("success.passwordUpdated"));
      onSuccess(data.data);
      onClose();
    } else {
      toast.error(data.message || t("errors.updatePassword"));
    }

    setIsSubmitting(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          {t("form.currentPassword")}
        </label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#806ECD]/15 focus:border-[#806ECD]"
          placeholder={t("form.placeholders.currentPassword")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          {t("form.newPassword")}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#806ECD]/15 focus:border-[#806ECD]"
          placeholder={t("form.placeholders.newPassword")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          {t("form.confirmPassword")}
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#806ECD]/15 focus:border-[#806ECD]"
          placeholder={t("form.placeholders.confirmPassword")}
        />
      </div>

      <div className="rounded-2xl border border-violet-100 bg-violet-50 px-4 py-3 text-sm text-slate-600">
        {t("configForms.passwordHint")}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="h-11 rounded-xl border border-slate-200 px-5 font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
        >
          {t("common.cancel")}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-xl bg-[#806ECD] px-5 font-semibold text-white hover:bg-[#6b5bb3] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting
            ? t("configForms.saving")
            : t("configForms.updatePassword")}
        </button>
      </div>
    </form>
  );
};

export default SecuritySettingsForm;
