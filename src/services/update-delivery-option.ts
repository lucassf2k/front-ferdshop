import { api, type BaseApiSchema } from '@/api';
import type {
  UpdateDeliveryOption,
  UpdateDeliveryOptionOutput,
} from '@/domain/use-case/update-delivery-option';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const updateDeliveryOptionService: UpdateDeliveryOption = async ({
  orderId,
  option,
}) => {
  const response = await api.patch<BaseApiSchema<UpdateDeliveryOptionOutput>>(
    `orders/${orderId}/delivery/option`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ option }),
    },
  );
  return unwrapResultBaseAPi(response);
};
