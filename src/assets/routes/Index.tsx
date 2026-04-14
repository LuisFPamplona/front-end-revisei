import Login from "../pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/Home";
<<<<<<< Updated upstream:src/assets/routes/Index.tsx
=======
import Subjects from "../pages/subjects/Subjects";
import AddSubject from "../pages/subjects/AddSubject";
>>>>>>> Stashed changes:src/routes/Index.tsx

export const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<Home />} />
<<<<<<< Updated upstream:src/assets/routes/Index.tsx
=======
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/add-subject" element={<AddSubject />} />
>>>>>>> Stashed changes:src/routes/Index.tsx
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
