import type { ComponentProps } from 'react';
import { cn } from '@/ui/lib/utils';

type Props = ComponentProps<'div'> & {
  open: boolean;
  children: React.ReactNode;
};

export const WrapperAnimatedCollapse = ({
  open,
  children,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        'grid transition-all duration-300 ease-in-out',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        className,
      )}
      {...props}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
};
