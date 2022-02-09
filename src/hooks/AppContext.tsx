import { Backdrop, CircularProgress } from '@mui/material';
import SwalAlert from 'components/SwalAlert';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type TProps = {
  children: ReactNode;
};

type AppStateType = {
  loading: boolean;
  setLoading: (val: boolean) => void;
  errorMessage: string | undefined;
  setErrorMessage: (val: string | undefined) => void;
  successMessage: string | undefined;
  setSuccessMessage: (val: string | undefined) => void;
};

const AppContext = createContext<AppStateType>({} as AppStateType);

const AppProvider = ({ children }: TProps) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  useEffect(() => {
    if (errorMessage) {
      SwalAlert.fire({
        icon: 'error',
        title: 'Ops!',
        html: errorMessage,
        confirmButtonText: 'Ok',
      }).then(() => setErrorMessage(undefined));
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      SwalAlert.fire({
        icon: 'success',
        title: 'Eba!',
        html: successMessage,
        confirmButtonText: 'Ok',
      }).then(() => setSuccessMessage(undefined));
    }
  }, [successMessage]);

  return (
    <>
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      <AppContext.Provider
        value={{
          loading,
          setLoading,
          errorMessage,
          setErrorMessage,
          successMessage,
          setSuccessMessage,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
};

export { AppProvider, AppContext, useApp };
