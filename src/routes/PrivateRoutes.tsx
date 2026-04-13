import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const [loading, setLoading] = useState(true);
  const [tokenIsValid, setTokenIsValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setTokenIsValid(false);
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/auth/validate", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        setTokenIsValid(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setTokenIsValid(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return tokenIsValid ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
