import { useState } from "react";
import { toast } from "react-toastify";
import type { User } from "../../types/user";
import { updateMe } from "../../services/userServices";
import { useTranslation } from "react-i18next";

type ProfileSettingsFormProps = {
  user: User;
  onClose: () => void;
  onSuccess: (user: User) => void;
};

const ProfileSettingsForm = ({
  user,
  onClose,
  onSuccess,
}: ProfileSettingsFormProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error(t("validation.nameRequired"));
      return;
    }

    if (!email.trim()) {
      toast.error(t("validation.emailRequired"));
      return;
    }

    setIsSubmitting(true);

    const data = await updateMe({
      name: name.trim(),
      email: email.trim(),
    });

    if (data.success) {
      toast.success(t("success.profileUpdated"));
      onSuccess(data.data);
      onClose();
    } else {
      toast.error(data.message || t("errors.updateProfile"));
    }

    setIsSubmitting(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          {t("form.name")}
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#806ECD]/15 focus:border-[#806ECD]"
          placeholder={t("form.placeholders.name")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          {t("form.email")}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#806ECD]/15 focus:border-[#806ECD]"
          placeholder={t("form.placeholders.email")}
        />
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
          {isSubmitting ? t("configForms.saving") : t("configForms.saveChanges")}
        </button>
      </div>
    </form>
  );
};

export default ProfileSettingsForm;
