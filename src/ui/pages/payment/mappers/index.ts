import {
  DeliveryOptionEnum,
  PaymentMethodEnum,
  type CreateOrderInput,
} from '@/domain/use-case/create-order';
import type { PaymentFormSchema } from '@/schemas/payment-infos';
import type { CartProduct } from '@/stores/cart/cart-type';
import { formatter } from '@/ui/lib/formatters';

export const paymentFormToCreateOrderInput = (
  data: PaymentFormSchema,
  orderItems: CreateOrderInput['orderItems'],
): CreateOrderInput => {
  return {
    orderItems,
    customerName: data.name,
    customerPhone: data.phone,
    deliveryOption: data.deliveryOption,
    deliveryAddress:
      data.deliveryOption === DeliveryOptionEnum.DELIVERY
        ? data.address || null
        : null,
    addressNumber:
      data.deliveryOption === DeliveryOptionEnum.DELIVERY
        ? data.number || null
        : null,
    withoutAddressNumber:
      data.deliveryOption === DeliveryOptionEnum.PICKUP
        ? true
        : data.withoutNumber,
    latitude: data.latitude,
    longitude: data.longitude,
    complement: data.complement || null,
    reference: data.reference || null,
    notes: data.notes || null,
    paymentMethod: data.paymentMethod,
    onlinePaymentMethod:
      data.paymentMethod === PaymentMethodEnum.ONLINE
        ? data.onlinePayment
        : null,
    needChange:
      data.paymentMethod === PaymentMethodEnum.CASH ? data.needChange : false,
    changeFor:
      data.paymentMethod === PaymentMethodEnum.CASH &&
      data.needChange &&
      data.changeFor
        ? formatter.currencyToNumber(data.changeFor)
        : null,
    scheduleOrder: data.scheduleOrder,
    scheduleDate:
      data.scheduleOrder && data.scheduleDate
        ? new Date(data.scheduleDate)
        : null,
    sendWhastsapp: data.sendWhatsapp,
  };
};

export const cartProductToOrderItems = (
  cartItems: CartProduct[],
): CreateOrderInput['orderItems'] => {
  return cartItems.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
    unitPrice: item.price,
  }));
};

export const paymentKeyToAppUser = (key: keyof PaymentFormSchema): string => {
  const messages: Record<keyof PaymentFormSchema, string> = {
    phone: 'Preencha o telefone',
    name: 'Preencha o nome',
    deliveryOption: 'Selecione uma opção de entrega',
    paymentMethod: 'Selecione uma forma de pagamento',
    onlinePayment: 'Selecione uma forma de pagamento online',
    address: 'Preencha o endereço',
    number: 'Preencha o número',
    withoutNumber: 'Informe se o endereço não possui número',
    complement: 'Preencha o complemento',
    reference: 'Preencha um ponto de referência',
    notes: 'Preencha as observações',
    sendWhatsapp: 'Informe se deseja enviar o pedido pelo WhatsApp',
    scheduleOrder: 'Informe se deseja agendar o pedido',
    scheduleDate: 'Informe a data do agendamento',
    needChange: 'Informe se precisa de troco',
    changeFor: 'Informe para quanto precisa de troco',
    latitude: 'Preencha a latitude',
    longitude: 'Preencha a longitude',
  };
  return messages[key];
};
