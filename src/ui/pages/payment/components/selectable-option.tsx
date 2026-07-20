import * as React from 'react';
import { CiCircleCheck } from 'react-icons/ci';
import type { IconType } from 'react-icons';
import { cn } from '@/ui/lib/utils';

export type SelectableOptionItem = {
  id: string;
  title: string;
  description: string;
  Icon: IconType;
  ariaLabel: string;
  selected: boolean;
};

type SelectableOptionProps = React.ComponentProps<'button'> & {
  title: string;
  description: string;
  Icon: IconType;
  selected?: boolean;
};

export const SelectableOption = ({
  title,
  description,
  Icon,
  selected = false,
  className,
  type = 'button',
  ...props
}: SelectableOptionProps) => {
  return (
    <button
      type={type}
      className={cn(
        'flex h-20 w-full cursor-pointer items-center justify-between rounded-xl border px-5 py-3.5 shadow-sm transition-all',
        selected
          ? 'border-amber-500 bg-amber-50'
          : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/40',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-md shadow-sm transition-colors',
            selected ? 'bg-amber-500 text-white' : 'bg-white text-gray-700',
          )}
        >
          <Icon className="h-5! w-5!" />
        </div>

        <div className="flex flex-col items-start">
          <strong className="text-sm font-semibold uppercase">{title}</strong>

          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>

      {selected && (
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white transition-colors">
          <CiCircleCheck className="h-6! w-6!" />
        </div>
      )}
    </button>
  );
};

export const toggleSelectableOption = <
  T extends { id: string; selected: boolean },
>(
  options: readonly T[],
  optionId: T['id'],
) => {
  return options.map((option) => {
    if (option.id === optionId)
      return { ...option, selected: !option.selected };
    return option.selected ? { ...option, selected: false } : option;
  });
};

export const selectableSingleOption = <
  T extends { id: string; selected: boolean },
>(
  options: readonly T[],
  optionId: T['id'],
) => {
  return options.map((option) => ({
    ...option,
    selected: option.id === optionId,
  }));
};
