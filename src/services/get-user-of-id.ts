import { api, type BaseApiSchema } from '@/api';
import type {
  GetUserOfId,
  GetUserOfIdOutput,
} from '@/domain/use-case/get-user-of-id';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const getUserOfIdService: GetUserOfId = async ({ id }) => {
  const response = await api.get<BaseApiSchema<GetUserOfIdOutput>>(
    `users/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return unwrapResultBaseAPi(response);
};
