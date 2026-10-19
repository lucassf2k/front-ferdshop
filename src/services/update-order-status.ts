import { api, type BaseApiSchema } from '@/api';
import type {
  UpdateOrderStatus,
  UpdateOrderStatusOutput,
} from '@/domain/use-case/update-order-status';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const updateOrderStatusService: UpdateOrderStatus = async ({
  id,
  status,
}) => {
  const response = await api.patch<BaseApiSchema<UpdateOrderStatusOutput>>(
    `orders/${id}/status`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    },
  );
  return unwrapResultBaseAPi(response);
};
