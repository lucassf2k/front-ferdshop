import { Link } from 'react-router';
import type { LucideIcon } from 'lucide-react';

type Props = {
  label: string;
  Icon: LucideIcon;
  to: string;
};

export const MenuBarItem = ({ label, Icon, to }: Props) => {
  return (
    <Link
      to={to}
      className="flex h-full w-[8.4rem] flex-col items-center justify-center gap-4 p-2 font-bold text-gray-100 uppercase hover:rounded-l-full hover:rounded-r-full hover:border-b-4 hover:text-white"
    >
      <Icon className="h-6 w-6" />
      <p className="text-[11px] tracking-wider">{label}</p>
    </Link>
  );
};
