import { Label } from '@/ui/components/ui/label';
import { Switch as PrimitveSwitch } from '@/ui/components/ui/switch';

interface Props {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Switch = ({ id, label, checked, onCheckedChange }: Props) => {
  return (
    <div className="mt-4 flex items-center gap-3">
      <PrimitveSwitch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="cursor-pointer data-[state=checked]:bg-amber-500 data-[state=unchecked]:bg-gray-300"
      />

      <Label
        htmlFor={id}
        className="cursor-pointer text-[14px] font-normal text-gray-700 select-none"
      >
        {label}
      </Label>
    </div>
  );
};
