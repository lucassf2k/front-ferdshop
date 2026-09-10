import { cn } from '@/ui/lib/utils';

interface Props {
  value: string;
  config: Record<string, { label: string; className: string }>;
}

export const OrderStatusBadge = ({ value, config }: Props) => {
  const cfg = config[value] ?? {
    label: value,
    className: 'bg-gray-100 text-gray-600 ring-gray-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1',
        cfg.className,
      )}
    >
      {cfg.label}
    </span>
  );
};
