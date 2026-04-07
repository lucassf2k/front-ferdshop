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
  error?: string;
}

export const BaseInput = (props: BaseInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-[16px] font-bold">{props.label}</Label>
      <Input
        className="h-10.5 rounded-b-md border-3 border-blue-500"
        {...props}
      />
      {props.error && <InputError message={props.error} />}
    </div>
  );
};
