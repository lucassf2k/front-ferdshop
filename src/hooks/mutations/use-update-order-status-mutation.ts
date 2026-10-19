import { queries } from '@/constants/queries';
import type { UpdateOrderStatusInput } from '@/domain/use-case/update-order-status';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { updateOrderStatusService } from '@/services/update-order-status';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUpdateOrderStatusMutation = (orderId: string) => {
  const useQuery = useQueryClient();

  return useBaseApiMutation({
    service: (data: UpdateOrderStatusInput) =>
      unwrapResultOrThrow(updateOrderStatusService(data)),
    options: {
      onError: () =>
        toast.warning(
          'Não foi possível alterar o status, tente novamente mais tarde',
        ),
      onSuccess: () => {
        toast.success('Status alterado com sucesso');
        useQuery.invalidateQueries({
          queryKey: queries.orderKeys.getOfId(orderId),
        });
      },
    },
  });
};
