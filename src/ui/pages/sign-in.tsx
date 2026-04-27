import z from 'zod';
import { Link } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { SignInInput } from '@/ui/components/sign-in-input';
import logoImage from '@/ui/assets/logo.png';
import { signInService } from '@/services/sign-in-service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Spinner } from '../components/ui/spinner';
import { Button } from '../components/base-button';

const signInSchema = z.object({
  email: z.email({ error: 'Email inválido' }),
  password: z
    .string()
    .min(8, { error: 'Senha deve ter pelo menos 8 caracteres' }),
});
type SignInSchema = z.infer<typeof signInSchema>;

export const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: signInService,
  });

  const handleSignIn: SubmitHandler<SignInSchema> = async (data) => {
    mutateAsync(data);
  };

  return (
    <div className="grid h-screen w-screen grid-cols-[1fr_2fr] max-md:flex max-md:items-center max-md:justify-center">
      <section className="flex h-full w-full items-center justify-center bg-blue-600 max-md:hidden">
        <img
          src={logoImage}
          alt="Logo escrito vendas de água"
          className="h-95 w-95"
        />
      </section>
      <section className="flex w-full items-center justify-center">
        <div className="w-full max-w-170 max-[1120px]:p-8">
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="w-full rounded-lg p-10"
          >
            <h2 className="mb-4 text-2xl font-bold">
              Preencha com os seus dados
            </h2>
            <div className="flex flex-col gap-4">
              <SignInInput
                label="Email"
                type="email"
                placeholder="example@mail.com"
                error={errors.email?.message}
                {...register('email')}
              />

              <SignInInput
                label="Senha"
                type="password"
                placeholder="********"
                error={errors.password?.message}
                {...register('password')}
              />

              <div className="mt-4 w-full gap-2">
                <div className="flex w-full justify-center">
                  <div className="flex w-70 items-center justify-around text-[14px] text-neutral-500">
                    <p className="">Esqueci minha senha</p>
                    <p>|</p>
                    <Link to="/sign-up">Cadastrar nova conta</Link>
                  </div>
                </div>

                <Button
                  isLoading={isPending}
                  size="lg"
                  className="mt-3 w-full cursor-pointer bg-blue-600 font-bold hover:bg-blue-500"
                >
                  ENTRAR
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
