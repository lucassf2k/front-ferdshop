import type { User } from '@/domain/entities/user';
import { useMutationSignUp } from '@/hooks/mutations/use-mutation-sign-up';
import { signUpSchema, type SignUpSchema } from '@/schemas/sign-up';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

export const useSignUpController = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const { data, mutate, isPending } = useMutationSignUp();

  const handleSignUp: SubmitHandler<SignUpSchema> = (data) => {
    const user: User = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'CUSTOMER',
    };
    mutate(user);
  };

  return { form, data, isPending, handleSignUp };
};
