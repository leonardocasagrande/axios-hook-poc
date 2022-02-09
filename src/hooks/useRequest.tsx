import axios, { AxiosRequestConfig, Method } from 'axios';
import { useEffect } from 'react';
import useSWR from 'swr';
import { BareFetcher, PublicConfiguration } from 'swr/dist/types';
import { useApp } from './AppContext';

export interface IUseRequestProps<T, E> {
  path: string;
  method?: Method;
  errorMessage?: string;
  successMessage?: string;
  showErrorModal?: boolean;
  showSuccessModal?: boolean;
  showLoader?: boolean;
  swrConfig?: Partial<PublicConfiguration<T, E, BareFetcher<T>>>;
}

const useRequest = <T extends unknown, E extends unknown>({
  path,
  method = `GET`,
  errorMessage = 'Erro interno do servidor',
  successMessage = 'Sucesso na requisicao!',
  showErrorModal = true,
  showSuccessModal = false,
  showLoader = true,
}: IUseRequestProps<T, E>) => {
  const { setLoading, setErrorMessage, setSuccessMessage } = useApp();

  const Axios = axios.create({
    baseURL: 'https://gorest.co.in/public/v2/',
  });

  const axiosFetcher = (url: string, config?: AxiosRequestConfig) =>
    Axios.request({
      url,
      method,
      ...config,
    }).then((res) => res.data);

  const { data, error, isValidating, mutate } = useSWR<T, E>(
    path,
    axiosFetcher,
    {}
  );

  useEffect(() => {
    if (error && showErrorModal) {
      setErrorMessage(errorMessage);
    }
  }, [error, errorMessage, setErrorMessage, showErrorModal]);

  useEffect(() => {
    setLoading(isValidating && showLoader);
  }, [isValidating, showLoader, setLoading]);

  useEffect(() => {
    if (showSuccessModal && data && !isValidating) {
      setSuccessMessage(successMessage);
    }
  }, [showSuccessModal, data, isValidating, setSuccessMessage, successMessage]);

  return { data, error, isValidating, mutate };
};

export default useRequest;
