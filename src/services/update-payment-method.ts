import { api, type BaseApiSchema } from '@/api';
import type {
  UpdatePaymentMethod,
  UpdatePaymentMethodOutput,
} from '@/domain/use-case/update-payment-method';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const updatePaymentMethodService: UpdatePaymentMethod = async ({
  id,
  method,
}) => {
  const response = await api.patch<BaseApiSchema<UpdatePaymentMethodOutput>>(
    `payments/${id}/method`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(method),
    },
  );
  return unwrapResultBaseAPi(response);
};
