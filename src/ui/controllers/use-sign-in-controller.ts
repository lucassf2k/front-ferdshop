import { appError } from '@/domain/shared/api-error';
import { useMutationSignIn } from '@/hooks/mutations/use-mutation-sign-in';
import { signInSchema, type SignInSchema } from '@/schemas/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useSignInController = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signInSchema),
  });

  const { mutate, isPending, error, data, isSuccess } = useMutationSignIn();

  const handleSignIn: SubmitHandler<SignInSchema> = async (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess]);

  useEffect(() => {
    if (data?.code) {
      toast.success('Logado com sucesso, bem vindo de volta!');
      return;
    }
    if (!error) return;
    toast.info(appError.toUserMessage(error));
  }, [error, data]);

  return { data, form, isPending, isSuccess, handleSignIn };
};
