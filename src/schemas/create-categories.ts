import z from 'zod';

export const registerCategorySchema = z.object({
  name: z.string().min(1, { error: 'nome é obrigatório' }),
});
export type RegisterCategorySchema = z.infer<typeof registerCategorySchema>;
