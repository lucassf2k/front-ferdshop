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
  customerName: string;
  customerPhone: string;
  deliveryOption: string;
  withoutAddressNumber: boolean;
  addressNumber: string | null;
  complement: string | null;
  reference: string | null;
  notes: string | null;
  needChange: boolean;
  changeFor: number | null;
  sendWhastsapp: boolean;
  scheduleOrder: boolean;
  scheduleDate: Date | null;
  totalPrice: number;
  status: string;
  deliveryAddress: string;
  latitude: number | null;
  longitude: number | null;
  userId: string;
  orderItems: OrderItemModel[];
  payment: PaymentModel | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderModelWithProducts = Omit<OrderModel, 'orderItems'> & {
  orderItems: {
    id: string;
    quantity: number;
    unitPrice: number;
    product: {
      id: string;
      name: string;
      price: number;
      stock: number;
      imageUrl: string;
      description: string | null;
    };
  }[];
};
