import { api } from '@/api';
import { useAppToastError } from '@/contexts/app-error-toast';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

type CategoryModel = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export const useFetchGetCategories = () => {
  const { showError } = useAppToastError();

  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await api.get<CategoryModel[]>('categories');
    },
    retry: false,
  });

  useEffect(() => {
    if (query.error) {
      showError('Houve um pequeno inconiência, tente novamente.');
    }
  }, [query.error]);

  return query;
};
