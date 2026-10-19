import { queries } from '@/constants/queries';
import type { UpdateDeliveryOptionInput } from '@/domain/use-case/update-delivery-option';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { updateDeliveryOptionService } from '@/services/update-delivery-option';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUpdateDeliveryOptionMutation = (orderId: string) => {
  const useQuery = useQueryClient();

  return useBaseApiMutation({
    service: (data: UpdateDeliveryOptionInput) =>
      unwrapResultOrThrow(updateDeliveryOptionService(data)),
    options: {
      onError: () =>
        toast.warning(
          'Não foi possível alterar a opção de entrega, tente novamente mais tarde',
        ),
      onSuccess: () => {
        toast.success('Opção de entrega alterado com sucesso');
        useQuery.invalidateQueries({
          queryKey: queries.orderKeys.getOfId(orderId),
        });
      },
    },
  });
};
