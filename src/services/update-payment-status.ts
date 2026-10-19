import { api, type BaseApiSchema } from '@/api';
import type {
  UpdatePaymentStatus,
  UpdatePaymentStatusOutput,
} from '@/domain/use-case/update-payment-status';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const updatePaymentStatusService: UpdatePaymentStatus = async ({
  id,
  status,
}) => {
  const response = await api.patch<BaseApiSchema<UpdatePaymentStatusOutput>>(
    `payments/${id}/status`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    },
  );
  return unwrapResultBaseAPi(response);
};
