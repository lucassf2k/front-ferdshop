import { CreditCard } from 'lucide-react';
import { currencyFormatter } from '@/services/format-currency';

interface Props {
  total: number;
}

export const CartButton = ({ total }: Props) => {
  return (
    <button className="flex w-172 cursor-pointer items-center justify-between rounded-2xl bg-amber-500 px-5 py-4 text-white shadow-lg transition-all hover:bg-amber-600">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
          <CreditCard className="h-6 w-6" />
        </div>

        <div className="text-left">
          <strong className="block text-base font-semibold">
            Finalizar Pedido
          </strong>

          <span className="text-sm text-amber-100">
            Selecione pagamento e entrega
          </span>
        </div>
      </div>

      <div className="rounded-full bg-white/20 px-5 py-2 text-lg font-bold">
        {currencyFormatter.toReal(total)}
      </div>
    </button>
  );
};
