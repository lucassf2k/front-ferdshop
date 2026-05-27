import { Minus, Plus, X } from 'lucide-react';

import { Button } from '@/ui/components/ui/button';
import { currencyFormatter } from '@/services/format-currency';
import type { CartProduct } from '@/stores/cart/cart-type';
import { CiCircleInfo } from 'react-icons/ci';
import { useAddProductToCart, useRemoveProductFromCart } from '@/stores/cart';

interface Props {
  product: CartProduct & {
    image: string;
    totalToPay: number;
  };
}

export const CartItem = ({ product }: Props) => {
  const isOnlyOne = product.quantity === 1;
  const removeProduct = useRemoveProductFromCart();
  const addProduct = useAddProductToCart();

  const handleAddOrIncrementProduct = () => addProduct(product);
  const handleRemoveOrDecrementProduct = () => removeProduct(product.id);

  return (
    <div className="flex w-172 items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm">
      {/* Product image */}
      <div className="h-20 w-20 overflow-hidden rounded-xl bg-zinc-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 justify-between self-stretch">
        {/* Left side */}
        <div className="flex flex-col">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                {product.name}
              </h3>

              <div className="mt-1 flex items-center gap-1 text-sm">
                <span className="text-amber-500">
                  <CiCircleInfo />
                </span>

                <button className="text-sm font-medium text-amber-500 transition-colors hover:text-amber-600">
                  Ver detalhes
                </button>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="mt-6">
            <span className="text-xs font-medium text-zinc-400 uppercase">
              Valor total
            </span>

            <p className="text-2xl font-bold text-amber-500">
              {currencyFormatter.toReal(product.totalToPay)}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-end">
          {/* Remove */}
          {isOnlyOne && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-zinc-300 hover:bg-red-50 hover:text-red-500"
              onClick={handleRemoveOrDecrementProduct}
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          {/* Quantity controls */}
          <div className="mt-auto flex flex-col items-center gap-1">
            <span className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
              Quantidade
            </span>

            <div className="flex items-center rounded-full border bg-zinc-50 p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                disabled={isOnlyOne}
                onClick={handleRemoveOrDecrementProduct}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="min-w-8 text-center font-semibold text-zinc-900">
                {product.quantity}
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={handleAddOrIncrementProduct}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
