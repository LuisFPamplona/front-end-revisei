import { useState } from "react";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Settings,
  LogOut,
  LibraryBig,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authServices";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-40 p-2 text-white bg-[#806ECD] rounded-md transition-colors cursor-pointer"
        >
          <Menu size={24} />
        </button>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-50 w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-[#806ECD] font-bold text-xl">
              {t("common.appName")}
            </span>
            <button
              onClick={toggleSidebar}
              className="p-1 hover:bg-gray-100 rounded cursor-pointer md:hidden"
            >
              <X size={24} color="gray" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Link
              to="/home"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-[#806ECD] rounded-lg transition-all"
            >
              <Home size={20} />
              <span>{t("sidebar.home")}</span>
            </Link>
            <Link
              to="/subjects"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-[#806ECD] rounded-lg transition-all"
            >
              <BookOpen size={20} />
              <span>{t("sidebar.subjects")}</span>
            </Link>
            <Link
              to="/explore"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-[#806ECD] rounded-lg transition-all"
            >
              <LibraryBig size={20} />
              <span>{t("sidebar.explore")}</span>
            </Link>
            <Link
              to="/configs"
              className="flex items-center gap-3 p-3 text-gray-700 hover:bg-purple-50 hover:text-[#806ECD] rounded-lg transition-all"
            >
              <Settings size={20} />
              <span>{t("sidebar.configs")}</span>
            </Link>
          </nav>

          <div className="p-4 border-t">
            <button
              className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-lg transition-all"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>{t("sidebar.logout")}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
