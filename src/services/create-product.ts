import { api, type BaseApiSchema } from '@/api';
import type {
  CreateProduct,
  CreateProductOutput,
} from '@/domain/use-case/create-product';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const createProductService: CreateProduct = async (data) => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('name', data.name);
  formData.append('price', String(data.price));
  formData.append('stock', String(data.stock));
  formData.append('categoryId', String(data.categoryId));
  formData.append('description', String(data.description));
  const response = await api.post<BaseApiSchema<CreateProductOutput>>(
    'products',
    {
      body: formData,
    },
  );
  return unwrapResultBaseAPi(response);
};
