import type { CreateOrderInput } from '@/domain/use-case/create-order';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { createOrderService } from '@/services/create-order';
import { toast } from 'sonner';

export const useCreateOrderMutation = () => {
  return useBaseApiMutation({
    service: (data: CreateOrderInput) =>
      unwrapResultOrThrow(createOrderService(data)),
    options: {
      onSuccess: () => {
        toast.success('Pedido feito com sucesso!');
      },
    },
  });
};
