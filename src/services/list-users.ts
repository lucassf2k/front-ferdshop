import { api } from '@/api';
import { result } from '@/domain/shared/result';
import type { ListUsers, ListUsersOutput } from '@/domain/use-case/list-users';

export const ListUsersService: ListUsers = async (input) => {
  const paginationParams = new URLSearchParams({
    page: input.page,
    perPage: input.perPage,
  });
  const data = await api.get<ListUsersOutput>(
    `users?${paginationParams.toString()}`,
  );
  return result.ok(data);
};
