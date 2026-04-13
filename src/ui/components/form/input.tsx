import { Input } from '@/ui/components/ui/input';
import { Label } from '@/ui/components/ui/label';

type InputErrorProps = {
  message: string;
};

export const InputError = ({ message }: InputErrorProps) => {
  return <p className="text-sm text-red-500">{message}</p>;
};

interface BaseInputProps extends React.ComponentProps<'input'> {
  label: string;
  isLabelBold?: boolean;
  error?: string;
}

export const BaseInput = ({
  label,
  error,
  isLabelBold = false,
  ...props
}: BaseInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className={`text-[16px] ${isLabelBold && 'font-bold'}`}>
        {label}
      </Label>
      <Input
        className="h-10.5 rounded-b-md border-3 border-blue-500 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/50"
        {...props}
      />
      {error && <InputError message={error} />}
    </div>
  );
};
