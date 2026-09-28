import type { Result } from '@/domain/shared/result';
import type { AppError } from '@/domain/shared/api-error';
import type { PaymentStatusEnum } from '../model/order';

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
  ONLINE = 'PIX',
  CARD = 'CARD',
  CASH = 'CASH',
}

export enum PaymentOnlineOptionEnum {
  PIX = 'PIX',
}

export type Payment = {
  method: PaymentMethodEnum;
  status: PaymentStatusEnum;
};

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
  payment: Payment;
  needChange: boolean;
  changeFor: number | null;
  scheduleOrder: boolean;
  scheduleDate: Date | null;
  sendWhastsapp: boolean;
  latitude: number | null;
  longitude: number | null;
};
export type CreateOrderOutput = {
  id: string;
};
export type CreateOrder = (
  data: CreateOrderInput,
) => Promise<Result<AppError, CreateOrderOutput>>;
