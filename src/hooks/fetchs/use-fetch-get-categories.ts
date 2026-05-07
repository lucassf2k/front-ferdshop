import { useAppToastError } from '@/contexts/app-error-toast';
import { appError, type AppError } from '@/domain/shared/api-error';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { ListCategoriesService } from '@/services/list-categories';
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
    queryFn: async () => await unwrapResultOrThrow(ListCategoriesService()),
    retry: (failureCount, error: AppError) => {
      return error.type === 'NetworkError' && failureCount < 2;
    },
  });

  useEffect(() => {
    if (!query.error?.type) return;
    if (
      query.error.type === 'NetworkError' ||
      query.error.type === 'UnknownError'
    ) {
      showError(appError.toUserMessage(query.error));
    }
  }, [query.error]);

  return query;
};
