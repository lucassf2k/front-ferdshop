import type { VariantProps } from 'class-variance-authority';
import { Button as PrimitiveButton, buttonVariants } from './ui/button';
import { Spinner } from './ui/spinner';

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
} & React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = ({ isLoading, children, className, ...props }: Props) => {
  return (
    <PrimitiveButton
      className={className}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {isLoading && <Spinner />}
        {children}
      </span>
    </PrimitiveButton>
  );
};
