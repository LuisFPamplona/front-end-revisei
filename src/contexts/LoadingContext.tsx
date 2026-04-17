import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Loading from "../components/Loading";
import {
  startGlobalLoading,
  stopGlobalLoading,
  subscribeToLoading,
  trackGlobalLoading,
} from "../services/loadingTracker";

type LoadingContextValue = {
  activeLoaders: number;
  isGlobalLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  trackLoading: <T>(promise: Promise<T>) => Promise<T>;
};

const LoadingContext = createContext<LoadingContextValue | undefined>(
  undefined,
);

type LoadingProviderProps = {
  children: ReactNode;
};

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [activeLoaders, setActiveLoaders] = useState(0);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const startLoading = useCallback(() => {
    startGlobalLoading();
  }, []);

  const stopLoading = useCallback(() => {
    stopGlobalLoading();
  }, []);

  const trackLoading = useCallback(async <T,>(promise: Promise<T>) => {
    return trackGlobalLoading(promise);
  }, []);

  useEffect(() => {
    return subscribeToLoading(setActiveLoaders);
  }, []);

  useEffect(() => {
    if (activeLoaders === 0) {
      setIsGlobalLoading(false);
      return;
    }

    // Evita piscar o overlay em requests muito rápidos.
    const timer = window.setTimeout(() => {
      setIsGlobalLoading(true);
    }, 300);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeLoaders]);

  const value = useMemo(
    () => ({
      activeLoaders,
      isGlobalLoading,
      startLoading,
      stopLoading,
      trackLoading,
    }),
    [activeLoaders, isGlobalLoading, startLoading, stopLoading, trackLoading],
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isGlobalLoading ? (
        <div className="fixed inset-0 z-100 bg-slate-950/18 backdrop-blur-[2px]">
          <Loading fullScreen />
        </div>
      ) : null}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider.");
  }

  return context;
};
