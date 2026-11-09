import z from 'zod';

export const zodWhatsAppMessageFormScehma = z
  .object({
    phone: z.string().optional(),
    message: z.string().min(1, { error: 'Mensagem é obrigatória' }),
    allUsers: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.allUsers) return;
    if (data.phone && data.phone.length === 15) return;
    ctx.addIssue({
      code: 'custom',
      path: ['phone'],
      message: 'Telefone precisa ter 15 dígitos',
    });
  });

export type WhatsAppMessageFormSchema = z.infer<
  typeof zodWhatsAppMessageFormScehma
>;

export const WHATSAPP_MESSAGE_DEFAULT_VALUES: WhatsAppMessageFormSchema = {
  phone: '',
  message: '',
  allUsers: false,
} as const;
