import { api, type BaseApiSchema } from '@/api';
import type {
  SoftDeleteCategoryOfId,
  SoftDeleteCategoryOfIdOutput,
} from '@/domain/use-case/soft-delete-category-of-id';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const softDeleteCategoryOfIdService: SoftDeleteCategoryOfId = async ({
  id,
}) => {
  const response = await api.delete<
    BaseApiSchema<SoftDeleteCategoryOfIdOutput>
  >(`categories/${id}`);
  return unwrapResultBaseAPi(response);
};
