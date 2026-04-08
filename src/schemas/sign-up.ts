import z from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().min(1, 'O nome é obrigatório'),
    email: z.email('Email inválido'),
    password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'A confirmação de senha deve conter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
