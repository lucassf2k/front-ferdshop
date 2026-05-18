import { ShoppingCart } from 'lucide-react';

export const ShoppingCartHeader = () => {
  return (
    <div className="flex items-start gap-3 pb-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
        <ShoppingCart className="h-5 w-5 text-orange-500" />
      </div>

      <div>
        <h2 className="text-lg font-bold text-zinc-900 uppercase">
          Carrinho de Compras
        </h2>

        <p className="text-sm text-zinc-500">
          Revise seus itens antes de finalizar
        </p>
      </div>
    </div>
  );
};
