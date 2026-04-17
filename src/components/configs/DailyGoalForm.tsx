import { useState } from "react";
import { toast } from "react-toastify";
import { updateMe } from "../../services/userServices";
import type { User } from "../../types/user";
import { useTranslation } from "react-i18next";

type DailyGoalFormProps = {
  user: User;
  onClose: () => void;
  onSuccess: (user: User) => void;
};

const DailyGoalForm = ({ user, onClose, onSuccess }: DailyGoalFormProps) => {
  const [dailyGoal, setDailyGoal] = useState(String(user.dailyGoal || 1));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedGoal = Number(dailyGoal);

    if (!Number.isInteger(parsedGoal) || parsedGoal < 1) {
      toast.error(t("validation.dailyGoalInvalid"));
      return;
    }

    setIsSubmitting(true);

    const data = await updateMe({
      dailyGoal: parsedGoal,
    });

    if (data.success) {
      toast.success(t("success.dailyGoalUpdated"));
      onSuccess(data.data);
      onClose();
    } else {
      toast.error(data.message || t("errors.updateDailyGoal"));
    }

    setIsSubmitting(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
          {t("form.dailyGoal")}
        </label>
        <input
          type="number"
          min={1}
          step={1}
          value={dailyGoal}
          onChange={(e) => setDailyGoal(e.target.value)}
          className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#806ECD]/15 focus:border-[#806ECD]"
          placeholder={t("form.placeholders.dailyGoal")}
        />
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-600">
        {t("configForms.dailyGoalHint")}
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
          {isSubmitting ? t("configForms.saving") : t("configForms.saveGoal")}
        </button>
      </div>
    </form>
  );
};

export default DailyGoalForm;
