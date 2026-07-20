import { Input } from '@/ui/components/ui/input';
import { Label } from '@/ui/components/ui/label';
import { cn } from '@/ui/lib/utils';

type InputErrorProps = {
  message: string;
};

export const InputError = ({ message }: InputErrorProps) => {
  return <p className="text-sm text-red-500">{message}</p>;
};

interface BaseInputProps extends React.ComponentProps<'input'> {
  label?: string;
  isLabelBold?: boolean;
  labelClassName?: string;
  containerClassName?: string;
  error?: string;
}

export const BaseInput = ({
  label,
  error,
  isLabelBold = false,
  labelClassName,
  containerClassName,
  className,
  ...props
}: BaseInputProps) => {
  return (
    <div className={cn('flex flex-col gap-1', containerClassName)}>
      {label && (
        <Label
          className={cn(
            `text-[16px] ${isLabelBold && 'font-bold'}`,
            labelClassName,
          )}
        >
          {label}
        </Label>
      )}
      <Input
        className={cn(
          'flex h-10.5 items-center justify-center rounded-b-md border-3 border-blue-500 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/50',
          className,
        )}
        {...props}
      />
      {error && <InputError message={error} />}
    </div>
  );
};
