import { api, type BaseApiSchema } from '@/api';
import type { ListUsers, ListUsersOutput } from '@/domain/use-case/list-users';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const ListUsersService: ListUsers = async (input) => {
  const paginationParams = new URLSearchParams({
    page: input.page,
    perPage: input.perPage,
  });
  const response = await api.get<BaseApiSchema<ListUsersOutput>>(
    `users?${paginationParams.toString()}`,
  );
  return unwrapResultBaseAPi(response);
};
