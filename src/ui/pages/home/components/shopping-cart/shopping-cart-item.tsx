import { Minus, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/ui/components/ui/button';
import { formatCurrencyService } from '@/services/format-currency';
import type { CartProduct } from '@/stores/cart/cart-type';
import { useRemoveProductFromCart } from '@/stores/cart';

interface Props {
  product: CartProduct;
}

export const ShoppingCartItem = ({ product }: Props) => {
  const isOnlyOne = product.quantity === 1;
  const removeProduct = useRemoveProductFromCart();

  const handleRemoveOrDecrementProduct = () => removeProduct(product.id);

  return (
    <div className="flex w-full items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-md">
      {/* Product image */}
      <div className="h-24 w-24 overflow-hidden rounded-xl bg-zinc-100">
        <img src="" alt="" className="h-full w-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-1 items-start justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="line-clamp-1 text-sm font-semibold text-zinc-800">
              {product.name}
            </h3>

            <p className="mt-1 text-xs text-zinc-500">
              {formatCurrencyService.toReal(product.price)} cada
            </p>
          </div>

          {/* Quantity + total */}
          <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2">
            <span className="text-sm font-medium text-zinc-600">
              {product.quantity}x
            </span>

            <div className="h-1 w-1 rounded-full bg-zinc-300" />

            <span className="text-sm font-bold text-zinc-800">
              {formatCurrencyService.toReal(product.price * product.quantity)}
            </span>
          </div>
        </div>

        {/* Remove button */}
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer self-center rounded-full text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-500"
          onClick={handleRemoveOrDecrementProduct}
        >
          {isOnlyOne ? (
            <Trash2 className="h-5 w-5" />
          ) : (
            <Minus className="h-5 w-5" />
          )}{' '}
        </Button>
      </div>
    </div>
  );
};
