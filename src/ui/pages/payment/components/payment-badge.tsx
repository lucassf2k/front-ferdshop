import { Badge } from '@/ui/components/ui/badge';
import { cn } from '@/ui/lib/utils';
import type { IconType } from 'react-icons';
import { Link } from 'react-router';

interface Props {
  label: string;
  Icon: IconType;
  to: string;
  selected?: boolean;
}

export const PaymentBadge = ({ label, Icon, to, selected }: Props) => {
  return (
    <Link to={to}>
      <Badge
        variant="outline"
        className={cn(
          'flex cursor-pointer items-center gap-2 px-5 py-1.5 text-[13px] text-zinc-500 transition-colors',
          selected
            ? 'border-amber-500 bg-amber-500 text-white hover:bg-amber-500 hover:text-white'
            : 'hover:bg-amber-300/20 hover:font-bold hover:text-amber-600',
        )}
      >
        <Icon className="h-4! w-4! text-current" />
        {label}
      </Badge>
    </Link>
  );
};
