import { queries } from '@/constants/queries';
import type { SoftDeleteProductOfIdInput } from '@/domain/use-case/soft-delete-product-of-id';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { softDeleteProductOfIdService } from '@/services/soft-delete-product-of-id';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useSoftDeleteProductOfIdMutation = () => {
  const queryClient = useQueryClient();
  return useBaseApiMutation({
    service: (input: SoftDeleteProductOfIdInput) =>
      unwrapResultOrThrow(softDeleteProductOfIdService(input)),
    options: {
      onSuccess: () => {
        toast.success('Produto deletado com sucesso!');
        queryClient.invalidateQueries({
          queryKey: queries.productKeys.all,
        });
      },
    },
  });
};
