import { queries } from '@/constants/queries';
import type { UpdatePaymentMethodInput } from '@/domain/use-case/update-payment-method';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { updatePaymentMethodService } from '@/services/update-payment-method';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUpdatePaymentMethodMutation = (orderId: string) => {
  const useQuery = useQueryClient();

  return useBaseApiMutation({
    service: (data: UpdatePaymentMethodInput) =>
      unwrapResultOrThrow(updatePaymentMethodService(data)),
    options: {
      onError: () =>
        toast.warning(
          'Não foi possível alterar o método de pagamento, tente novamente mais tarde',
        ),
      onSuccess: () => {
        toast.success('Método de pagamento alterado com sucesso');
        useQuery.invalidateQueries({
          queryKey: queries.orderKeys.getOfId(orderId),
        });
      },
    },
  });
};
