import type { CreateCategoryInput } from '@/domain/use-case/create-category';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { createCategoryService } from '@/services/create-category';
import { toast } from 'sonner';

export const useCreateCategoryMutation = () => {
  return useBaseApiMutation({
    service: (data: CreateCategoryInput) =>
      unwrapResultOrThrow(createCategoryService(data)),
    options: {
      onSuccess: () => {
        toast.success('Categoria criada com sucesso!');
      },
    },
  });
};
