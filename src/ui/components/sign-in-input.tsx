import { useState, type HTMLInputTypeAttribute } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Input } from '@/ui/components/ui/input';
import { Label } from '@/ui/components/ui/label';
import { InputError } from '@/ui/components/form/input';

interface InputWithLabelProps extends React.ComponentProps<'input'> {
  label: string;
  error?: string;
}

type InputIconProps = {
  inputType: HTMLInputTypeAttribute | undefined;
  tmpType: string;
  onTogglePassword: () => void;
};

const InputIcon = (props: InputIconProps) => {
  const getIcon = () => {
    if (props.inputType === 'email') return <Mail className="h-5 w-5" />;
    if (props.inputType === 'password') return <Lock className="h-5 w-5" />;
    return null;
  };

  return (
    <>
      <span className="absolute top-3 left-4 text-neutral-400">
        {getIcon()}
      </span>
      {props.inputType === 'password' && (
        <span
          className="absolute top-3 right-4 cursor-pointer text-neutral-400"
          onClick={props.onTogglePassword}
        >
          {props.tmpType === 'password' ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </span>
      )}
    </>
  );
};

export const SignInInput = (props: InputWithLabelProps) => {
  const [togglePassword, setTogglePassword] = useState<string>(
    props.type as string,
  );
  const handleTogglePassword = () => {
    if (togglePassword === 'password') return setTogglePassword('text');
    return setTogglePassword('password');
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-[16px] font-bold">{props.label}</Label>
      <div className="relative">
        <InputIcon
          inputType={props.type}
          tmpType={togglePassword}
          onTogglePassword={handleTogglePassword}
        />
        <Input
          className="mb-1 h-10.5 rounded-b-md border-3 border-blue-500 pl-12"
          {...props}
          type={togglePassword}
        />
        {props.error && <InputError message={props.error} />}
      </div>
    </div>
  );
};
