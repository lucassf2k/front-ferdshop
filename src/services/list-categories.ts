import { api, type BaseApiSchema } from '@/api';
import type {
  ListCategories,
  ListCategoriesOutput,
} from '@/domain/use-case/list-categories';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const listCategoriesService: ListCategories = async () => {
  const response = await api.get<BaseApiSchema<ListCategoriesOutput[]>>(
    'categories',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return unwrapResultBaseAPi(response);
};
