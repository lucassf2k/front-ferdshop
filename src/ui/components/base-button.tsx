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
      className={`relative ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </span>
      )}

      <span className={isLoading ? 'invisible' : ''}>{children}</span>
    </PrimitiveButton>
  );
};
