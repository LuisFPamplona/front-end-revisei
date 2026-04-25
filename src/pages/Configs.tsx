import { useState } from "react";
import {
  User as UserIcon,
  Moon,
  Lock,
  LogOut,
  ChevronRight,
  Smartphone,
  Target,
  Languages,
} from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import { logout } from "../services/authServices";
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import ConfigModal from "../components/configs/ConfigModal";
import ProfileSettingsForm from "../components/configs/ProfileSettingsForm";
import SecuritySettingsForm from "../components/configs/SecuritySettingsForm";
import DailyGoalForm from "../components/configs/DailyGoalForm";
import { useTranslation } from "react-i18next";
import { useAuth } from "../features/auth/hooks/useAuth";

type ActiveModal = "profile" | "security" | "daily-goal" | null;

export default function Configs() {
  const { t, i18n } = useTranslation();
  const { user, setUser } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <div className="min-h-screen mb-12 md:mb-0 md:ml-64 bg-slate-50/50">
      <Sidebar />

      <main className="p-4 md:p-10 md:pt-10 max-w-3xl mx-auto">
        <header className="mb-8 pt-2 flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            {t("configs.title")}
          </h1>
          <p className="text-slate-500 text-sm pt-2">{t("configs.subtitle")}</p>
        </header>

        <div className="space-y-6">
          <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center gap-4">
              <div className="w-16 h-16 bg-[#806ECD] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-200">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {user?.name || t("configs.userFallback")}
                </h2>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>

            <ConfigItem
              icon={UserIcon}
              label={t("configs.editProfile")}
              description={t("configs.editProfileDescription")}
              onClick={() => setActiveModal("profile")}
            />
            <ConfigItem
              icon={Lock}
              label={t("configs.security")}
              description={t("configs.securityDescription")}
              onClick={() => setActiveModal("security")}
            />
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50/50">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {t("configs.preferences")}
              </h3>
            </div>

            <div className="flex items-center justify-between p-4 px-6 hover:bg-slate-50 transition-colors border-b border-slate-50">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Target size={20} />
                </div>
                <div>
                  <p className="font-semibold text-slate-700">
                    {t("configs.dailyGoal")}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t("configs.dailyGoalValue", {
                      count: Number(user?.dailyGoal || 0),
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal("daily-goal")}
                className="text-[#806ECD] text-sm font-bold hover:underline cursor-pointer"
              >
                {t("configs.editGoal")}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 px-6 border-b border-slate-50">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <Languages size={20} />
                </div>
                <p className="font-semibold text-slate-700">
                  {t("language.label")}
                </p>
              </div>
              <select
                value={i18n.resolvedLanguage || "pt"}
                onChange={(e) => void i18n.changeLanguage(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#806ECD]/15 focus:border-[#806ECD]"
              >
                <option value="pt">{t("language.pt")}</option>
                <option value="en">{t("language.en")}</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 px-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-50 text-[#806ECD] rounded-lg">
                  <Moon size={20} />
                </div>
                <p className="font-semibold text-slate-700">
                  {t("configs.darkMode")}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#806ECD]"></div>
              </label>
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <ConfigItem
              icon={Smartphone}
              label={t("configs.about")}
              description={t("configs.aboutDescription")}
            />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 px-6 text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <div className="p-2 bg-red-50 rounded-lg text-red-500">
                <LogOut size={20} />
              </div>
              <span className="font-bold">{t("configs.logout")}</span>
            </button>
          </section>
        </div>
      </main>

      {activeModal === "profile" && user ? (
        <ConfigModal
          title={t("configs.profileModalTitle")}
          description={t("configs.profileModalDescription")}
          onClose={() => setActiveModal(null)}
        >
          <ProfileSettingsForm
            user={user}
            onClose={() => setActiveModal(null)}
            onSuccess={handleUserUpdated}
          />
        </ConfigModal>
      ) : null}

      {activeModal === "security" && user ? (
        <ConfigModal
          title={t("configs.securityModalTitle")}
          description={t("configs.securityModalDescription")}
          onClose={() => setActiveModal(null)}
        >
          <SecuritySettingsForm
            onClose={() => setActiveModal(null)}
            onSuccess={handleUserUpdated}
          />
        </ConfigModal>
      ) : null}

      {activeModal === "daily-goal" && user ? (
        <ConfigModal
          title={t("configs.dailyGoalModalTitle")}
          description={t("configs.dailyGoalModalDescription")}
          onClose={() => setActiveModal(null)}
        >
          <DailyGoalForm
            user={user}
            onClose={() => setActiveModal(null)}
            onSuccess={handleUserUpdated}
          />
        </ConfigModal>
      ) : null}
    </div>
  );
}

function ConfigItem({ icon: Icon, label, description, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 px-6 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group cursor-pointer"
    >
      <div className="flex items-center gap-4 text-left">
        <div className="p-2 bg-slate-100 text-slate-500 group-hover:bg-[#806ECD]/10 group-hover:text-[#806ECD] rounded-lg transition-colors">
          <Icon size={20} />
        </div>
        <div>
          <p className="font-semibold text-slate-700">{label}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
      <ChevronRight
        size={18}
        className="text-slate-300 group-hover:translate-x-1 transition-transform"
      />
    </button>
  );
}
