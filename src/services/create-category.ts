import { api, type BaseApiSchema } from '@/api';
import type {
  CreateCategory,
  CreateCategoryOutput,
} from '@/domain/use-case/create-category';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const createCategoryService: CreateCategory = async (data) => {
  const response = await api.post<BaseApiSchema<CreateCategoryOutput>>(
    'categories',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );
  return unwrapResultBaseAPi(response);
};
