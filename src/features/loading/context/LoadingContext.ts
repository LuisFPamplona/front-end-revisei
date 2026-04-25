import { createContext } from "react";

interface LoadingContextValue {
  activeLoaders: number;
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  trackLoading: <T>(promise: Promise<T>) => Promise<T>;
}

export const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);
