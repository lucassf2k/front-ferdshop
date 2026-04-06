import { Link } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button } from '@/ui/components/ui/button';
import { Input } from '@/ui/components/ui/input';
import { Label } from '@/ui/components/ui/label';
import logoImage from '@/ui/assets/logo.png';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

interface BaseInputProps extends React.ComponentProps<'input'> {
  label: string;
}

const BaseInput = (props: BaseInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-[16px] font-bold">{props.label}</Label>
      <Input
        className="h-10.5 rounded-b-md border-3 border-blue-500"
        {...props}
      />
    </div>
  );
};

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
    message: 'As senhas não coincidem',
  });
type SchemaType = z.infer<typeof schema>;

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleSignUp: SubmitHandler<SchemaType> = (data) => {
    console.log(data);
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
          <form onSubmit={handleSubmit(handleSignUp)}>
            <h2 className="mb-4 text-2xl font-bold">
              Preencha com os seus dados
            </h2>
            <div className="flex flex-col gap-4">
              <BaseInput
                label="Nome"
                type="text"
                placeholder="Degite seu nome"
                {...register('name')}
              />
              <BaseInput
                label="Email"
                type="email"
                placeholder="Degite seu email"
                {...register('email')}
              />
              <BaseInput
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
                {...register('password')}
              />
              <BaseInput
                label="Confirmar senha"
                type="password"
                placeholder="Confirme sua senha"
                {...register('confirmPassword')}
              />

              <div className="mt-4 w-full gap-2">
                <div className="flex w-full justify-center">
                  <div className="flex w-70 items-center justify-around text-[14px] text-neutral-500">
                    <Link to="/">Já tenho uma conta</Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="mt-3 h-10.5 w-full cursor-pointer bg-blue-600 font-bold hover:bg-blue-500"
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
