import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_EXPIRED_EVENT, validateToken } from "../services/apiClient";

const PrivateRoutes = () => {
  const [tokenIsValid, setTokenIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const handleTokenValidation = async () => {
      const isValid = await validateToken();

      setTokenIsValid(isValid);
    };

    const handleAuthExpired = () => {
      setTokenIsValid(false);
    };

    handleTokenValidation();
    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);

    return () => {
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    };
  }, []);

  if (tokenIsValid === null) return null;

  return tokenIsValid ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
