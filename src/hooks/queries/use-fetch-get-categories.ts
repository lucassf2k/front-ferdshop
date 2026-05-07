import { queries } from '@/constants/queries';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiQuery } from '@/helpers/use-base-api-query';
import { listCategoriesService } from '@/services/list-categories';

export const useQueryListCategories = () => {
  return useBaseApiQuery({
    queryKey: queries.categoryKeys.all,
    service: () => unwrapResultOrThrow(listCategoriesService()),
  });
};
