import type { Result } from '@/domain/shared/result';
import type { AppError } from '@/domain/shared/api-error';

export type OrderItem = {
  quantity: number;
  unitPrice: number;
  productId: string;
};

export enum DeliveryOptionEnum {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP',
}

export enum PaymentMethodEnum {
  ONLINE = 'ONLINE',
  CARD = 'CARD',
  CASH = 'CASH',
}

export enum OnlinePaymentMethodEnum {
  PIX = 'PIX',
}

export type CreateOrderInput = {
  orderItems: OrderItem[];
  customerName: string;
  customerPhone: string;
  deliveryOption: DeliveryOptionEnum;
  deliveryAddress: string | null;
  addressNumber: string | null;
  withoutAddressNumber: boolean;
  complement: string | null;
  reference: string | null;
  notes: string | null;
  paymentMethod: PaymentMethodEnum;
  onlinePaymentMethod: OnlinePaymentMethodEnum | null;
  needChange: boolean;
  changeFor: number | null;
  scheduleOrder: boolean;
  scheduleDate: Date | null;
  sendWhastsapp: boolean;
};
export type CreateOrderOutput = {
  id: string;
};
export type CreateOrder = (
  data: CreateOrderInput,
) => Promise<Result<AppError, CreateOrderOutput>>;
