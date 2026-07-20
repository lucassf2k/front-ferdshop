import { queries } from '@/constants/queries';
import type { UpdateUserRoleInput } from '@/domain/use-case/update-user-role';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { updateUserRoleService } from '@/services/update-user-role';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUpdateUserRoleMutation = () => {
  const queryClient = useQueryClient();

  return useBaseApiMutation({
    service: (data: UpdateUserRoleInput) =>
      unwrapResultOrThrow(updateUserRoleService(data)),
    options: {
      onSuccess: () => {
        toast.success('Novo papel atribuido ao usuário com sucesso!');
        queryClient.invalidateQueries({
          queryKey: queries.userKeys.all,
        });
      },
    },
  });
};
