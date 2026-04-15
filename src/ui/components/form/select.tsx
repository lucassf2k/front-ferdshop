import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/ui/select';
import { Label } from '@/ui/components/ui/label';
import { InputError } from '@/ui/components/form/input';

type Props = {
  label: string;
  placehold: string;
  items: {
    groupLabel: string;
    selectItems: {
      value: string;
      label: string;
    }[];
  }[];
  value?: string;
  onValueChange?: (value: string) => void;
  error?: string;
  isLabelBold?: boolean;
};

export const CustomSelect = ({
  label,
  placehold,
  items,
  error,
  value,
  isLabelBold,
  onValueChange,
}: Props) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <Label className={`text-[16px] ${isLabelBold && 'font-bold'}`}>
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-10.5! w-full rounded-b-md border-3 border-blue-500 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/50">
          <SelectValue placeholder={placehold} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item, idx) => (
            <React.Fragment key={`${item.groupLabel}-${idx}`}>
              <SelectGroup>
                <SelectLabel>{item.groupLabel}</SelectLabel>
                {item.selectItems.map((select, idx) => (
                  <SelectItem
                    value={select.value}
                    key={`${select.value}-${idx}`}
                  >
                    {select.label}
                  </SelectItem>
                ))}
              </SelectGroup>
              {items.length > 1 && <SelectSeparator />}
            </React.Fragment>
          ))}
        </SelectContent>
      </Select>
      {error && <InputError message={error} />}
    </div>
  );
};
