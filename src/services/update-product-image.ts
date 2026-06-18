import { api, type BaseApiSchema } from '@/api';
import type {
  UpdateProductImage,
  UpdateProductImageOutput,
} from '@/domain/use-case/update-product-image';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const updateProductImageService: UpdateProductImage = async (data) => {
  const formData = new FormData();
  formData.append('file', data.file);
  const response = await api.patch<BaseApiSchema<UpdateProductImageOutput>>(
    `products/${data.id}/image`,
    {
      body: formData,
    },
  );
  return unwrapResultBaseAPi(response);
};
