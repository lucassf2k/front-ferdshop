import { cn } from '@/ui/lib/utils';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const PaymentCardWrapper = ({ className, children }: Props) => {
  return (
    <div
      className={cn(
        'mx-auto w-[80%] rounded-2xl bg-white px-4 py-6 shadow-md',
        className,
      )}
    >
      {children}
    </div>
  );
};
