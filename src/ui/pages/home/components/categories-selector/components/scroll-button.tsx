import { Button } from '@/ui/components/ui/button';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';

interface Props {
  direction: 'left' | 'right';
  onClick: (dir: 'left' | 'right') => void;
}

export const ScrollButton = ({ direction, onClick }: Props) => {
  const Icon = direction === 'left' ? IoMdArrowDropleft : IoMdArrowDropright;

  return (
    <Button
      onClick={() => onClick(direction)}
      className="h-8 w-8 cursor-pointer rounded-full bg-white shadow-md hover:bg-white"
    >
      <Icon size={48} className="h-8! w-8! text-amber-500" />
    </Button>
  );
};
