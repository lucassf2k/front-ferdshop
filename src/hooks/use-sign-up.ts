import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { signUpService } from '@/services/sign-up-service';
import type { User } from '@/domain/entities/user';
import { signUpSchema, type SignUpSchema } from '@/schemas/sign-up';

export const useSignUp = () => {
  const [userId, setUserId] = useState<string | null>(null);

  const signUpForm = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp: SubmitHandler<SignUpSchema> = async (data) => {
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
