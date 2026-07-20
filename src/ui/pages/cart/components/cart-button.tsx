import * as React from 'react';
import { CreditCard } from 'lucide-react';

import { currencyFormatter } from '@/services/format-currency';
import { cn } from '@/ui/lib/utils';

type CartButtonProps = React.ComponentProps<'button'> & {
  total: number;
  text: string;
  description?: string;
};

export const CartButton = ({
  total,
  text,
  description,
  className,
  type = 'button',
  ...props
}: CartButtonProps) => {
  return (
    <button
      type={type}
      className={cn(
        'flex w-172 items-center justify-between rounded-2xl px-5 py-4 text-white shadow-lg transition-all',
        'bg-amber-500 hover:bg-amber-600',
        'disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 disabled:shadow-none disabled:hover:bg-zinc-300',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
          <CreditCard className="h-6 w-6" />
        </div>

        <div className="text-left">
          <strong className="block text-base font-semibold">{text}</strong>

          {description && (
            <span className="text-sm text-amber-100">{description}</span>
          )}
        </div>
      </div>

      <div className="rounded-full bg-white/20 px-5 py-2 text-lg font-bold">
        {currencyFormatter.toReal(total)}
      </div>
    </button>
  );
};
