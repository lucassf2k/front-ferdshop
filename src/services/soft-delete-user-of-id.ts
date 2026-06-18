import { api, type BaseApiSchema } from '@/api';
import type {
  SoftDeleteUserOfId,
  SoftDeleteUserOfIdOutput,
} from '@/domain/use-case/soft-delete-user-of-id';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const softDeleteUserOfIdService: SoftDeleteUserOfId = async ({ id }) => {
  const response = await api.delete<BaseApiSchema<SoftDeleteUserOfIdOutput>>(
    `users/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return unwrapResultBaseAPi(response);
};
