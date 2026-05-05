import { appError } from '@/domain/shared/api-error';
import { useMutationSignIn } from '@/hooks/fetchs/use-fetch-post-sign-in';
import { signInSchema, type SignInSchema } from '@/schemas/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

export const useSignInController = () => {
  const form = useForm({
    resolver: zodResolver(signInSchema),
  });

  const { mutate, isPending, error } = useMutationSignIn();

  const handleSignIn: SubmitHandler<SignInSchema> = async (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (!error) return;
    toast.info(appError.toUserMessage(error));
  }, [error]);

  return { form, isPending, handleSignIn };
};
