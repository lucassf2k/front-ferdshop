import { z } from 'zod';

export const paymentFormSchema = z.object({
  phone: z.string().min(14, 'Telefone inválido'),
  name: z.string().min(3, 'Informe seu nome'),
  deliveryOption: z.enum(['delivery', 'pickup']),
  paymentMethod: z.enum(['cash', 'online']),
  onlinePayment: z.enum(['pix']).optional(),
  address: z.string().optional(),
  number: z.string().optional(),
  withoutNumber: z.boolean(),
  complement: z.string().optional(),
  reference: z.string().optional(),
  notes: z.string().optional(),
  sendWhatsapp: z.boolean(),
  scheduleOrder: z.boolean(),
  scheduleDate: z.string().optional(),
  needChange: z.boolean(),
  changeFor: z.string().optional(),
});

export type PaymentFormSchema = z.infer<typeof paymentFormSchema>;

export const PAYMENT_DEFAULT_VALUES: PaymentFormSchema = {
  phone: '',
  name: '',
  deliveryOption: 'delivery',
  paymentMethod: 'cash',
  onlinePayment: 'pix',
  address: '',
  number: '',
  withoutNumber: false,
  complement: '',
  reference: '',
  notes: '',
  sendWhatsapp: false,
  scheduleOrder: false,
  scheduleDate: '',
  needChange: false,
  changeFor: '',
};
