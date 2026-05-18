import { useCartItems, useCartTotalPrice } from '@/stores/cart';

import { CartButton } from './components/cart-button';
import { ShoppingCartHeader } from './components/cart-header';
import { CartItem } from './components/cart-item';
import { EmptyCart } from './components/empty-cart';

export const CartPage = () => {
  const cart = useCartItems();
  const totalToPay = useCartTotalPrice();

  const hasItems = cart.length > 0;

  return (
    <div className="mt-20 min-h-[calc(100vh-80px)] w-full border-t-4 border-t-amber-500 px-8 pb-36">
      <div className="flex w-full flex-col items-center gap-6 py-5">
        {hasItems && <ShoppingCartHeader />}

        {/* Items */}
        {hasItems ? (
          <div className="flex flex-col gap-4">
            {cart.map((p) => {
              const product = {
                ...p,
                image: 'asdads',
                totalToPay,
              };

              return <CartItem key={product.id} product={product} />;
            })}
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>

      {/* Fixed button */}
      {hasItems && (
        <div className="fixed right-0 bottom-0 left-0 border-t bg-white/90 p-5 backdrop-blur-md">
          <div className="mx-auto w-full max-w-2xl">
            <CartButton total={totalToPay} />
          </div>
        </div>
      )}
    </div>
  );
};
