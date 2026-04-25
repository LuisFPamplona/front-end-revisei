import { useCallback, useMemo, useState, type ReactNode } from "react";
import { LoadingContext } from "../features/loading/context/LoadingContext";
import Loading from "../components/Loading";

interface Props {
  children: ReactNode;
}

export const LoadingProvider = ({ children }: Props) => {
  const [activeLoaders, setActiveLoaders] = useState<number>(0);

  const startLoading = useCallback(() => {
    setActiveLoaders((prev) => prev + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setActiveLoaders((prev) => Math.max(0, prev - 1));
  }, []);

  const trackLoading = useCallback(
    async <T,>(promise: Promise<T>) => {
      startLoading();
      try {
        return await promise;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading],
  );

  const isLoading: boolean = activeLoaders > 0;

  const value = useMemo(
    () => ({
      activeLoaders,
      isLoading,
      startLoading,
      stopLoading,
      trackLoading,
    }),
    [activeLoaders, isLoading, startLoading, stopLoading, trackLoading],
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && <Loading />}
    </LoadingContext.Provider>
  );
};
