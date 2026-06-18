import z from 'zod';

export const registerProductSchema = z.object({
  name: z.string().min(1, { error: 'nome é obrigatório' }),
  price: z.string().min(1, { error: 'preço é obrigatório' }),
  stock: z.string().min(1, { error: 'quantidade é obrigatória' }),
  categoryId: z.string().min(1, { error: 'categoria é obrigatória' }),
  description: z.string().optional(),
});
export type RegisterProductSchema = z.infer<typeof registerProductSchema>;
