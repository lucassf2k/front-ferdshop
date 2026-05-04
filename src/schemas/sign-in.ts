import z from 'zod';

export const signInSchema = z.object({
  email: z.email({ error: 'Email inválido' }),
  password: z
    .string()
    .min(8, { error: 'Senha deve ter pelo menos 8 caracteres' }),
});
export type SignInSchema = z.infer<typeof signInSchema>;
