import { api, type BaseApiSchema } from '@/api';
import type {
  UndeleteCategoryOfId,
  UndeleteCategoryOfIdOutput,
} from '@/domain/use-case/undelete-category-of-id';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const undeleteCategoryOfIdService: UndeleteCategoryOfId = async ({
  id,
}) => {
  const response = await api.patch<BaseApiSchema<UndeleteCategoryOfIdOutput>>(
    `categories/${id}/restore`,
  );
  return unwrapResultBaseAPi(response);
};
