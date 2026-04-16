import { useEffect, useState } from "react";
import {
  User as UserIcon,
  Moon,
  Lock,
  LogOut,
  ChevronRight,
  Smartphone,
  Target,
  Loader2,
} from "lucide-react";
import Sidebar from "../components/layout/Sidebar";
import { getMe } from "../services/userServices"; // Certifique-se do path
import type { User } from "../types/user";
import { useNavigate } from "react-router-dom";

export default function Configs() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getMe();
      if (data.success && data.data) {
        setUser(data.data);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen md:ml-64">
        <Loader2 className="w-8 h-8 text-[#806ECD] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen mb-12 md:mb-0 md:ml-64 bg-slate-50/50">
      <Sidebar />

      <main className="p-4 md:p-10 pt-20 md:pt-10 max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Configurações
          </h1>
          <p className="text-slate-500">
            Gerencie seu perfil e preferências de estudo
          </p>
        </header>

        <div className="space-y-6">
          {/* SEÇÃO 1: PERFIL */}
          <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center gap-4">
              <div className="w-16 h-16 bg-[#806ECD] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-200">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {user?.name || "Usuário"}
                </h2>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>

            <ConfigItem
              icon={UserIcon}
              label="Editar Perfil"
              description="Nome, e-mail e foto de perfil"
            />
            <ConfigItem
              icon={Lock}
              label="Segurança"
              description="Alterar senha e autenticação"
            />
          </section>

          {/* SEÇÃO 2: ESTUDOS & APP */}
          <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 bg-slate-50/50">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Preferências
              </h3>
            </div>

            <div className="flex items-center justify-between p-4 px-6 hover:bg-slate-50 transition-colors border-b border-slate-50">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Target size={20} />
                </div>
                <div>
                  <p className="font-semibold text-slate-700">Meta Diária</p>
                  <p className="text-xs text-slate-500">
                    {String(user?.dailyGoal) || "0"} tópicos por dia
                  </p>
                </div>
              </div>
              <button className="text-[#806ECD] text-sm font-bold hover:underline">
                Ajustar
              </button>
            </div>

            <div className="flex items-center justify-between p-4 px-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-50 text-[#806ECD] rounded-lg">
                  <Moon size={20} />
                </div>
                <p className="font-semibold text-slate-700">Modo Escuro</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#806ECD]"></div>
              </label>
            </div>
          </section>

          {/* SEÇÃO 3: SUPORTE & SAIR */}
          <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <ConfigItem
              icon={Smartphone}
              label="Sobre o Revisei"
              description="Versão 1.0.0 - Beta"
            />
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 px-6 text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <div className="p-2 bg-red-50 rounded-lg text-red-500">
                <LogOut size={20} />
              </div>
              <span className="font-bold">Sair da conta</span>
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

function ConfigItem({ icon: Icon, label, description }: any) {
  return (
    <button className="w-full flex items-center justify-between p-4 px-6 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group cursor-pointer">
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
