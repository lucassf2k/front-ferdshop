import { Link } from 'react-router';
import type { LucideIcon } from 'lucide-react';

type Props = {
  label: string;
  Icon: LucideIcon;
  to: string;
  info?: number;
};

export const MenuBarItem = ({ label, Icon, to, info }: Props) => {
  const showInfo = info !== undefined && info > 0;

  return (
    <Link
      to={to}
      className="relative flex h-full w-[8.4rem] flex-col items-center justify-center gap-4 p-2 font-bold text-gray-100 uppercase hover:border-b-4 hover:text-white"
    >
      <Icon className="h-6 w-6" />

      {showInfo && (
        <span className="absolute top-1 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[12px] font-bold text-white">
          {info}
        </span>
      )}

      <p className="text-[11px] tracking-wider">{label}</p>
    </Link>
  );
};
