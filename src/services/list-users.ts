import { api, type BaseApiSchema } from '@/api';
import type { ListUsers, ListUsersOutput } from '@/domain/use-case/list-users';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const listUsersService: ListUsers = async ({ page, perPage }) => {
  const response = await api.get<BaseApiSchema<ListUsersOutput>>(
    `users?page=${page}&pageSize=${perPage}`,
  );
  return unwrapResultBaseAPi(response);
};
