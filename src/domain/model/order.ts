export enum PaymentStatusEnum {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentProviderEnum {
  ABACATE = 'ABACATE',
}

export enum PaymentMethodEnum {
  CASH = 'CASH',
  CARD = 'CARD',
  PIX = 'PIX',
}

type OrderItemModel = {
  id: string;
  quantity: number;
  unitPrice: number;
  productId: string;
};

type PaymentModel = {
  amount: number;
  orderId: string;
  method: PaymentMethodEnum;
  status: PaymentStatusEnum;
  provider: PaymentProviderEnum | null;
  providerId: string | null;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderModel = {
  id: string;
  totalPrice: number;
  status: string;
  deliveryAddress: string;
  latitude: number | null;
  longitude: number | null;
  orderItems: OrderItemModel[];
  payment: PaymentModel | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
