import { ShoppingCart, PlusCircle } from 'lucide-react';

import { Link } from 'react-router';

export const EmptyCart = () => {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-end text-center">
      {/* Icon */}
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-amber-100">
        <ShoppingCart className="h-10 w-10 text-amber-500" />
      </div>

      {/* Content */}
      <div className="mt-6 space-y-2">
        <h2 className="text-2xl font-bold text-zinc-900">
          Seu carrinho está vazio
        </h2>

        <p className="max-w-sm text-zinc-500">
          Adicione produtos para continuar suas compras
        </p>
      </div>

      {/* Action */}
      <Link
        to="/"
        className="mt-8 flex h-14 items-center gap-2 rounded-full bg-amber-500 px-8 text-base font-semibold text-white hover:bg-amber-600"
      >
        <PlusCircle className="mr-2 h-5 w-5" />
        Adicionar Itens
      </Link>
    </div>
  );
};
