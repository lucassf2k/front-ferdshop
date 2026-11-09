import type { LucideIcon } from 'lucide-react';

interface Props {
  Icon: LucideIcon;
  text: string;
}

export const CardInfoTitle = ({ Icon, text }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500">
        <Icon className="size-5 text-white" />
      </div>

      <h3 className="font-bold">{text}</h3>
    </div>
  );
};
