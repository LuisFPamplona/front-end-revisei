import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../types/user";
import { getMe } from "../services/userServices";
import { AuthContext } from "../features/auth/context/AuthContext";
import Loading from "../components/Loading";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const data = await getMe();

      if (data.success) {
        setUser(data.data);
        return;
      }

      setUser(null);
    } catch {
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUser();
  }, [loadUser]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      authLoading,
      isAuthenticated: !!user,
    }),
    [user, authLoading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {authLoading && <Loading fullScreen />}
    </AuthContext.Provider>
  );
};
