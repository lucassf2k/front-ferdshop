import { MenuBar } from '@/ui/components/menu-bar';

export const HomePage = () => {
  return (
    <>
      <MenuBar />

      {/* IMAGE DE FUNDO */}
      <div className="h-80 w-full bg-red-500">
        <div className="pointer-events-none h-full w-full bg-linear-to-b from-black/0 via-black/40 to-black/90" />
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="-mt-6 h-screen rounded-t-[1.8rem] bg-neutral-200 p-8">
        <section className="-mt-28 mb-8 h-57.5 w-full rounded-4xl bg-white"></section>

        <h1 className="mb-4 text-2xl font-bold">Bem-vindo ao Home Page</h1>
        <p className="text-gray-700">
          Este é o conteúdo principal da página inicial.
        </p>
      </div>
    </>
  );
};
