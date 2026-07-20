import { Link } from 'react-router';
import type { IconType } from 'react-icons/lib';

type Props = {
  title: string;
  Icon: IconType;
  to: string;
};

export const DashboardMenuBarItem = ({ title, Icon, to }: Props) => {
  return (
    <Link
      to={to}
      title={title}
      className="flex w-full items-center justify-center p-2 font-bold text-amber-500 hover:border-r-4 hover:border-amber-500 hover:text-amber-600"
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};
