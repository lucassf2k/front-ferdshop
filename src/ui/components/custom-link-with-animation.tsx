import type { IconType } from 'react-icons';
import { Link } from 'react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/ui/lib/utils';

const customLinkCardVariants = cva(
  [
    'group relative flex items-center gap-3 rounded-lg p-4',
    'transition-all duration-300 ease-out',

    // Canto inferior esquerdo
    'before:absolute before:bottom-0 before:left-0',
    'before:h-0 before:w-0 before:rounded-bl-2xl',
    'before:border-b-[3px] before:border-l-[3px]',
    'before:border-transparent',
    'before:transition-[width,height,border-color]',
    'before:duration-500 before:ease-out before:content-[""]',

    // Canto inferior direito
    'after:absolute after:right-0 after:bottom-0',
    'after:h-0 after:w-0 after:rounded-br-2xl',
    'after:border-r-[3px] after:border-b-[3px]',
    'after:border-transparent',
    'after:transition-[width,height,border-color]',
    'after:duration-500 after:ease-out after:content-[""]',

    // Animação dos cantos
    'hover:before:h-8 hover:before:w-12',
    'hover:after:h-8 hover:after:w-12',
  ],
  {
    variants: {
      variant: {
        green: [
          'hover:bg-green-50',
          'hover:before:border-green-700',
          'hover:after:border-green-700',
        ],
        blue: [
          'hover:bg-blue-50',
          'hover:before:border-blue-700',
          'hover:after:border-blue-700',
        ],
        purple: [
          'hover:bg-purple-50',
          'hover:before:border-purple-700',
          'hover:after:border-purple-700',
        ],
        orange: [
          'hover:bg-orange-50',
          'hover:before:border-orange-600',
          'hover:after:border-orange-600',
        ],
        rose: [
          'hover:bg-rose-50',
          'hover:before:border-rose-600',
          'hover:after:border-rose-600',
        ],
        black: [
          'hover:bg-gray-100',
          'hover:before:border-gray-700',
          'hover:after:border-gray-700',
        ],
      },
    },
    defaultVariants: {
      variant: 'green',
    },
  },
);

const iconVariants = cva(
  [
    'flex h-9 w-9 items-center justify-center rounded-full text-white',
    'transition-all duration-300 ease-out',
    'group-hover:scale-110 group-hover:-rotate-12',
    'group-hover:shadow-md',
  ],
  {
    variants: {
      variant: {
        green: 'bg-green-700',
        blue: 'bg-blue-700',
        purple: 'bg-purple-700',
        orange: 'bg-orange-600',
        rose: 'bg-rose-600',
        black: 'bg-gray-700',
      },
    },
    defaultVariants: {
      variant: 'green',
    },
  },
);

interface Props extends VariantProps<typeof customLinkCardVariants> {
  to: string;
  Icon: IconType;
  label: string;
  subLabel?: string;
  className?: string;
}

export const CustomLinkCardWithAnimation = ({
  Icon,
  label,
  to,
  subLabel,
  variant,
  className,
}: Props) => {
  return (
    <Link
      to={to}
      className={cn(customLinkCardVariants({ variant }), className)}
    >
      <div className={iconVariants({ variant })}>
        <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
      </div>

      <div className="transition-transform duration-300 group-hover:translate-x-1">
        <p className="font-semibold">{label}</p>

        {subLabel && <span className="text-sm text-gray-500">{subLabel}</span>}
      </div>
    </Link>
  );
};
