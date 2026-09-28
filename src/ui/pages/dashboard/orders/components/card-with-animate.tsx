import { WrapperAnimatedCollapse } from '@/ui/components/wrapper-animated-collapse';
import { useState, type ReactNode } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface Props {
  title: string;
  children: ReactNode;
}

export const CardWithAnimate = ({ title, children }: Props) => {
  const [state, setState] = useState<boolean>(false);

  const handleToggleCard = () => setState((prev) => !prev);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-[18px] font-bold">{title}</h4>
        <button type="button" onClick={handleToggleCard}>
          <IoIosArrowDown className="h-5 w-5 cursor-pointer" />
        </button>
      </div>
      <WrapperAnimatedCollapse open={state}>{children}</WrapperAnimatedCollapse>
    </div>
  );
};
