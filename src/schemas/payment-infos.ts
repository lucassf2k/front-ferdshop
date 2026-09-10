import {
  DeliveryOptionEnum,
  OnlinePaymentMethodEnum,
  PaymentMethodEnum,
} from '@/domain/use-case/create-order';
import { z } from 'zod';

export const paymentFormSchema = z.object({
  phone: z.string().min(14, 'Telefone é obrigatório'),
  name: z.string().min(3, 'Nome é obrigatório'),
  deliveryOption: z.enum(DeliveryOptionEnum, 'Opcão de entrega é obrigatória'),
  paymentMethod: z.enum(PaymentMethodEnum, 'Opcão de pagamento é obrigatória'),
  onlinePayment: z.enum(OnlinePaymentMethodEnum).nullable(),
  address: z.string(),
  number: z.string(),
  withoutNumber: z.boolean(),
  complement: z.string(),
  reference: z.string(),
  notes: z.string(),
  sendWhatsapp: z.boolean(),
  scheduleOrder: z.boolean(),
  scheduleDate: z.string(),
  needChange: z.boolean(),
  changeFor: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
});

export type PaymentFormSchema = z.infer<typeof paymentFormSchema>;

export const PAYMENT_DEFAULT_VALUES: PaymentFormSchema = {
  phone: '',
  name: '',
  deliveryOption: DeliveryOptionEnum.DELIVERY,
  paymentMethod: PaymentMethodEnum.CASH,
  onlinePayment: OnlinePaymentMethodEnum.PIX,
  address: '',
  latitude: null,
  longitude: null,
  number: '',
  withoutNumber: true,
  complement: '',
  reference: '',
  notes: '',
  sendWhatsapp: false,
  scheduleOrder: false,
  scheduleDate: '',
  needChange: false,
  changeFor: '',
};
