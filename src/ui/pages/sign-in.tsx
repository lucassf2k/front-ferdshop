import logoImage from '@/ui/assets/logo.png';
import { SignInInput } from '@/ui/components/sign-in-input';
import { Button } from '@/ui/components/ui/button';

export const SignInPage = () => {
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
          <form>
            <h2 className="mb-4 text-2xl font-bold">
              Preencha com os seus dados
            </h2>
            <div className="flex flex-col gap-4">
              <SignInInput
                label="Email"
                type="email"
                placeholder="example@mail.com"
              />

              <SignInInput
                label="Senha"
                type="password"
                placeholder="********"
              />

              <div className="mt-4 w-full gap-2">
                <div className="flex w-full justify-center">
                  <div className="flex w-70 items-center justify-around text-[14px] text-neutral-500">
                    <p className="">Esqueci minha senha</p>
                    <p>|</p>
                    <p>Cadastrar nova conta</p>
                  </div>
                </div>

                <Button className="mt-3 h-10.5 w-full cursor-pointer bg-blue-600 font-bold hover:bg-blue-500">
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
