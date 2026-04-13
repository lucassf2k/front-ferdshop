import { Link } from 'react-router';
import type { LucideIcon } from 'lucide-react';

type Props = {
  title: string;
  Icon: LucideIcon;
  to: string;
};

export const DashboardMenuBarItem = ({ title, Icon, to }: Props) => {
  return (
    <Link
      to={to}
      title={title}
      className="flex p-2 font-bold text-gray-100 uppercase hover:rounded-r-full hover:border-r-4 hover:text-white"
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};
