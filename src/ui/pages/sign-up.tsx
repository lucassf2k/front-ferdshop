import { Link } from 'react-router';
import logoImage from '@/ui/assets/logo.png';
import { BaseInput } from '@/ui/components/form/input';
import { Button } from '@/ui/components/base-button';
import { useSignUpController } from '../controllers/use-sign-up-controller';

export const SignUpPage = () => {
  const {
    form: {
      register,
      formState: { errors },
      handleSubmit,
    },
    data,
    isPending,
    handleSignUp,
  } = useSignUpController();

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
          <form onSubmit={handleSubmit(handleSignUp)}>
            <h2 className="mb-4 text-2xl font-bold">
              Preencha com os seus dados
            </h2>
            <div className="flex flex-col gap-4">
              <BaseInput
                label="Nome"
                type="text"
                placeholder="Degite seu nome"
                error={errors.name?.message}
                {...register('name')}
              />
              <BaseInput
                label="Email"
                type="email"
                placeholder="Degite seu email"
                error={errors.email?.message}
                {...register('email')}
              />
              <BaseInput
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
                error={errors.password?.message}
                {...register('password')}
              />
              <BaseInput
                label="Confirmar senha"
                type="password"
                placeholder="Confirme sua senha"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />

              <div className="mt-4 w-full gap-2">
                <div className="flex w-full justify-center">
                  <div className="flex w-70 items-center justify-around text-[14px] text-neutral-500">
                    <Link to="/">Já tenho uma conta</Link>
                  </div>
                </div>

                <Button
                  isLoading={isPending}
                  size="lg"
                  className="mt-3 w-full cursor-pointer bg-blue-600 font-bold hover:bg-blue-500"
                >
                  CADASTRAR
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
