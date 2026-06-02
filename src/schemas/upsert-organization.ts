import z from 'zod';

export const zodRegisterOrganizationDialogSchema = z.object({
  name: z.string().min(1, { error: 'Nome é obrigatório' }),
  email: z.email({ error: 'Email inválido' }),
  phone: z.string().min(15, { error: 'Telefone precisa ter 15 dígitos' }),
  address: z.string().min(1, { error: 'Endereço é obrigatório' }),
  latitude: z.number({ error: 'Latitude inválida' }),
  longitude: z.number({ error: 'Longitude inválida' }),
  city: z.string().min(1, { error: 'Cidade é obrigatória' }),
  state: z.string().min(1, { error: 'Estado é obrigatório' }),
});

export type ZodRegisterOrganizationDialogSchema = z.infer<
  typeof zodRegisterOrganizationDialogSchema
>;
