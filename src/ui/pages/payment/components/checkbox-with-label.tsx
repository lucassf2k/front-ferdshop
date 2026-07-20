import { Checkbox } from '@/ui/components/ui/checkbox';
import { cn } from '@/ui/lib/utils';

interface Props extends React.ComponentProps<typeof Checkbox> {
  label: string;
  className?: string;
}

export const CheckBoxWithLabel = ({ label, className, ...props }: Props) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Checkbox
        className="border-gray-300 focus-visible:ring-amber-500/50 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:text-white"
        {...props}
      />
      <p className="text-[12px] text-gray-500">{label}</p>
    </div>
  );
};
