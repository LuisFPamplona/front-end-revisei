import Login from "../pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/Home";
import Subjects from "../pages/Subjects";
import Configs from "../pages/Configs";
import ExplorePage from "../pages/ExplorePage";

export const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/configs" element={<Configs />} />
              <Route path="/explore" element={<ExplorePage />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
