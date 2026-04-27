import { api } from '@/api';
import { useQuery } from '@tanstack/react-query';

type CategoryModel = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export const useFetchGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return await api.get<CategoryModel[]>('categories');
    },
  });
};
