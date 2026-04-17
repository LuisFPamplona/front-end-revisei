type LoadingListener = (activeLoaders: number) => void;

let activeLoaders = 0;
const listeners = new Set<LoadingListener>();

const notifyListeners = () => {
  listeners.forEach((listener) => listener(activeLoaders));
};

export const subscribeToLoading = (listener: LoadingListener) => {
  listeners.add(listener);
  listener(activeLoaders);

  return () => {
    listeners.delete(listener);
  };
};

export const startGlobalLoading = () => {
  activeLoaders += 1;
  notifyListeners();
};

export const stopGlobalLoading = () => {
  activeLoaders = Math.max(0, activeLoaders - 1);
  notifyListeners();
};

export const trackGlobalLoading = async <T,>(promise: Promise<T>) => {
  startGlobalLoading();

  try {
    return await promise;
  } finally {
    stopGlobalLoading();
  }
};
