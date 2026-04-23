import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva('flex items-center gap-1 rounded-full px-3 py-1.5', {
  variants: {
    status: {
      open: 'bg-green-50 text-green-600',
      closed: 'bg-red-50 text-red-600',
    },
  },
  defaultVariants: {
    status: 'closed',
  },
});

const dotVariants = cva('h-1.5 w-1.5 rounded-full', {
  variants: {
    status: {
      open: 'bg-green-600',
      closed: 'bg-red-600',
    },
  },
});

type Props = VariantProps<typeof badgeVariants> & {
  label?: string;
};

export const StatusBadge = ({ status, label }: Props) => {
  const text = label ?? (status === 'open' ? 'aberto' : 'fechado');

  return (
    <div className={badgeVariants({ status })}>
      <span className={dotVariants({ status })}></span>
      <p className="text-[12px] font-bold uppercase">{text}</p>
    </div>
  );
};
