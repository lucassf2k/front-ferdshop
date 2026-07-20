import { api, type BaseApiSchema } from '@/api';
import type {
  UpdateUserRole,
  UpdateUserRoleOutput,
} from '@/domain/use-case/update-user-role';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const updateUserRoleService: UpdateUserRole = async ({ id, role }) => {
  const response = await api.put<BaseApiSchema<UpdateUserRoleOutput>>(
    `users/${id}?role=${role}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return unwrapResultBaseAPi(response);
};
