import useGamification from "../../features/gamification/hooks/useGamification";
import Sidebar from "./Sidebar";

function Header() {
  const { crowns, streak, gems } = useGamification();

  return (
    <section className="relative">
      <Sidebar />
      <div className="w-full bg-[#806ECD] h-18 md:h-15.5 flex md:justify-center items-center px-4">
        <section className="w-full h-10 ml-6 md:w-92 md:mr-0 flex justify-between px-8 items-center">
          <div className="group w-16 h-8 flex items-center justify-center gap-1 bg-white rounded-2xl relative">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3763/3763864.png"
              className="w-5 h-5 opacity-85"
            />
            <span className="font-medium text-[#806ECD]">{crowns}</span>
            <span className="absolute -top-3 text-[8pt] bg-white text-[#806ECD] px-1 font-medium rounded">
              Nível
            </span>
          </div>
          <div className="w-16 h-8 flex items-center justify-center gap-1 bg-white rounded-2xl relative">
            <img
              src="https://cdn-icons-png.flaticon.com/512/740/740842.png"
              className="w-5 h-5 opacity-85"
            />
            <span className="font-medium text-[#806ECD] pt-1">{streak}</span>
            <span className="absolute -top-3 text-[8pt] bg-white text-[#806ECD] px-1 font-medium rounded">
              Streak
            </span>
          </div>
          <div className="w-16 h-8 flex items-center justify-center gap-1 bg-white rounded-2xl relative">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7408/7408575.png"
              className="w-5 h-5 opacity-85"
            />
            <span className="font-medium text-[#806ECD]">{gems}</span>
            <span className="absolute -top-3 text-[8pt] bg-white text-[#806ECD] px-1 font-medium rounded">
              Gemas
            </span>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Header;
