import { api, type BaseApiSchema } from '@/api';
import type {
  UploadProductImage,
  UploadProductImageOutput,
} from '@/domain/use-case/upload-product-image';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const uploadProductImageService: UploadProductImage = async (data) => {
  const formData = new FormData();
  formData.append('file', data.file);
  const response = await api.post<BaseApiSchema<UploadProductImageOutput>>(
    'products/image',
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    },
  );
  return unwrapResultBaseAPi(response);
};
