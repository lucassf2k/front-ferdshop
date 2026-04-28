import { AppErrorToast } from '@/ui/components/spp-error-modal';
import { createContext, useContext, useState } from 'react';

type ErrorState = {
  message?: string;
};

type ContextType = {
  showError: (message?: string) => void;
  hideError: () => void;
};

const Context = createContext<ContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const AppErrorToastProvider = ({ children }: Props) => {
  const [error, setError] = useState<ErrorState | null>(null);

  const showError = (message?: string) => {
    setError({ message });
  };

  const hideError = () => setError(null);

  return (
    <Context.Provider value={{ showError, hideError }}>
      {children}

      <AppErrorToast open={Boolean(error)} message={error?.message} />
    </Context.Provider>
  );
};

export const useAppToastError = () => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error(
      'useAppToastError must be used within AppErrorToastProvider',
    );
  }
  return ctx;
};
