import type { User } from '@/domain/entities/user';
import { appError } from '@/domain/shared/api-error';
import { useMutationSignUp } from '@/hooks/mutations/use-mutation-sign-up';
import { signUpSchema, type SignUpSchema } from '@/schemas/sign-up';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

export const useSignUpController = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const { data, mutate, isPending, error } = useMutationSignUp();

  const handleSignUp: SubmitHandler<SignUpSchema> = (data) => {
    const user: User = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'CUSTOMER',
    };
    mutate(user);
  };

  useEffect(() => {
    if (!error) return;
    if (error.type === 'ApiError') {
      toast.info(appError.toUserMessage(error));
    }
  }, [error]);

  return { form, data, isPending, handleSignUp };
};
