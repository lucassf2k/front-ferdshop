import { queries } from '@/constants/queries';
import type { UpdatePaymentStatusInput } from '@/domain/use-case/update-payment-status';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { updatePaymentStatusService } from '@/services/update-payment-status';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUpdatePaymentStatusMutation = (orderId: string) => {
  const useQuery = useQueryClient();

  return useBaseApiMutation({
    service: (data: UpdatePaymentStatusInput) =>
      unwrapResultOrThrow(updatePaymentStatusService(data)),
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
