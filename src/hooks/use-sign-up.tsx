import { useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { signUpService } from '@/services/sign-up-service';
import type { User } from '@/domain/entities/user';

const schema = z
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
type SchemaType = z.infer<typeof schema>;

export const useSignUp = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const signUpForm = useForm({
    resolver: zodResolver(schema),
  });

  const handleSignUp: SubmitHandler<SchemaType> = async (data) => {
    const user: User = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'CUSTOMER',
    };
    const signUpOutput = await signUpService(user);
    setUserId(signUpOutput.id);
  };

  return {
    signUpForm,
    handleSignUp,
    userId,
  };
};
