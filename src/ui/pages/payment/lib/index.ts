import {
  DeliveryOptionEnum,
  PaymentMethodEnum,
} from '@/domain/use-case/create-order';
import type { PaymentFormSchema } from '@/schemas/payment-infos';

type Errors = Partial<Record<keyof PaymentFormSchema, string>>;
type OrderApprovalResult = {
  approved: boolean;
  errors: Errors;
};

export const approveOrderForPickup = (
  data: PaymentFormSchema,
): OrderApprovalResult => {
  const errors: Errors = {};

  if (!data.phone) errors.phone = 'Telefone é obrigatório';
  if (!data.name) errors.name = 'Nome é obrigatório';
  if (!data.paymentMethod) {
    errors.paymentMethod = 'Opcão de pagamento é obrigatória';
  }
  if (
    data.paymentMethod === PaymentMethodEnum.CASH &&
    data.needChange &&
    !data.changeFor
  ) {
    errors.changeFor = 'Valor de troco é obrigatório';
  }
  if (data.scheduleOrder && !data.scheduleDate) {
    errors.scheduleDate = 'Data de entrega é obrigatória';
  }
  return {
    approved: Object.keys(errors).length === 0,
    errors,
  };
};

export const approveOrderForDelivery = (
  data: PaymentFormSchema,
): OrderApprovalResult => {
  const errors: Errors = {};
  if (!data.phone) errors.phone = 'Telefone é obrigatório';
  if (!data.name) errors.name = 'Nome é obrigatório';
  if (!data.address) errors.address = 'Endereço é obrigatório';
  const hasCoordinates = data.latitude !== null && data.longitude !== null;
  if (!data.number && !data.withoutNumber && !hasCoordinates) {
    errors.number = 'Informe o número ou marque "Sem número"';
  }
  if (
    data.paymentMethod === PaymentMethodEnum.CASH &&
    data.needChange &&
    !data.changeFor
  ) {
    errors.changeFor = 'Valor de troco é obrigatório';
  }
  if (data.scheduleOrder && !data.scheduleDate) {
    errors.scheduleDate = 'Data de entrega é obrigatória';
  }
  return {
    approved: Object.keys(errors).length === 0,
    errors,
  };
};

export const orderApproved = (data: PaymentFormSchema): OrderApprovalResult => {
  switch (data.deliveryOption) {
    case DeliveryOptionEnum.DELIVERY:
      return approveOrderForDelivery(data);
    case DeliveryOptionEnum.PICKUP:
      return approveOrderForPickup(data);
    default:
      return {
        approved: false,
        errors: {
          deliveryOption: 'Opcão de entrega é obrigatória',
        },
      };
  }
};
