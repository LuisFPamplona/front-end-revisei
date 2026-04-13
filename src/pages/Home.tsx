import Sidebar from "../components/layout/Sidebar";

const Home = () => {
  return (
    <>
      <Sidebar />
      <section className="flex flex-col w-screen h-screen items-center md:pl-64">
        <div className="mb-8 w-full grid justify-center items-center pt-2 md:justify-start md:pl-8">
          <h1 className="text-3xl font-bold text-gray-800">Página Inicial</h1>
          <div className="h-1 w-12 bg-[#806ECD] rounded-full mt-2"></div>
        </div>
      </section>
    </>
  );
};

export default Home;
