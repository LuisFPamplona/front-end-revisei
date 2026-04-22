import { useEffect, useState } from "react";
import { getMe } from "../services/userServices";
import type { User } from "../types/user";
import { toast } from "react-toastify";

interface UseFetchUserProps {
  t: (key: string) => string;
}

function useFetchUser({ t }: UseFetchUserProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getMe();

      if (data.success) {
        setUser(data.data);
      } else {
        toast.error(data.message || t("errors.loadProfile"));
      }
    };

    void fetchUser();
  }, [t]);

  return { user, setUser };
}

export default useFetchUser;
