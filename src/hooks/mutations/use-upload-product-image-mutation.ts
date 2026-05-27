import type { UploadProductImageInput } from '@/domain/use-case/upload-product-image';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { uploadProductImageService } from '@/services/upload-product-image';
import { toast } from 'sonner';

export const useUploadProductImageMutation = () => {
  return useBaseApiMutation({
    service: (data: UploadProductImageInput) =>
      unwrapResultOrThrow(uploadProductImageService(data)),
    options: {
      onSuccess: () => {
        toast.success('Imagem salva com sucesso!');
      },
    },
  });
};
