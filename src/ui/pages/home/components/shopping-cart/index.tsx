import { useCartItems, useCartTotalPrice } from '@/stores/cart';
import { Button } from '@/ui/components/ui/button';
import { CiClock2 } from 'react-icons/ci';
import { FaAngleRight } from 'react-icons/fa';
import { IoBag, IoBagOutline } from 'react-icons/io5';
import { ShoppingCartItem } from './shopping-cart-item';
import { formatCurrencyService } from '@/services/format-currency';

export const ShoppingCart = () => {
  const cart = useCartItems();
  const totalPrice = useCartTotalPrice();

  const hasItems = cart.length > 0;

  return (
    <div className="sticky top-24 max-w-104 rounded-2xl bg-white">
      <div className="py-5">
        <div className="flex items-center gap-5 px-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500">
            <IoBag size={20} className="text-white" />
          </div>
          <div>
            <h6 className="text-[18px] font-bold">Seu pedido</h6>
            <div className="flex items-center gap-1">
              <CiClock2 className="text-gray-500" />
              <p className="text-[12px] leading-7 font-normal text-gray-500">
                Ver tempo de entrega
              </p>
            </div>
          </div>
        </div>

        <div className="my-4 h-px w-full bg-gray-200"></div>

        {!hasItems && (
          <div className="flex w-full flex-col items-center justify-center gap-3 py-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-200">
              <IoBagOutline size={32} className="text-gray-500" />
            </div>
            <h6 className="text-[18px] font-bold">Carrinho vazio</h6>
            <p className="text-center text-[14px] text-gray-500">
              Explore nosso menu e adicione <br /> itens deliciosos!
            </p>
          </div>
        )}

        {hasItems &&
          cart.map((product) => (
            <ShoppingCartItem key={product.id} product={product} />
          ))}

        <div className="my-4 h-px w-full bg-gray-200"></div>

        {hasItems && (
          <div className="my-4 flex w-full items-center justify-between px-8">
            <p className="text-[16px] font-bold">Total</p>
            <p className="text-[16px] font-bold text-green-500">
              {formatCurrencyService.toReal(totalPrice)}
            </p>
          </div>
        )}

        <div className="flex w-full px-8">
          <Button className="h-13.5 w-full cursor-pointer rounded-2xl bg-amber-500 text-[16px] font-bold transition-colors duration-500 hover:bg-amber-400">
            Finalizar Pedido
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100/20">
              <FaAngleRight />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
