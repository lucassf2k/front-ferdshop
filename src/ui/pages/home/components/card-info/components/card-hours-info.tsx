import { useState } from 'react';
import { ClockIcon, ChevronDownIcon } from 'lucide-react';

import { WrapperAnimatedCollapse } from '@/ui/components/wrapper-animated-collapse';

interface BusinessHours {
  day: string;
  hour: string;
  isClosed: boolean;
}

interface Props {
  title: string;
  businessHours: BusinessHours[];
  defaultOpen?: boolean;
}

const HOURS_MAPPER_TO_USER: Record<string, string> = {
  MONDAY: 'Segunda-feira',
  TUESDAY: 'Terça-feira',
  WEDNESDAY: 'Quarta-feira',
  THURSDAY: 'Quinta-feira',
  FRIDAY: 'Sexta-feira',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo',
} as const;

export const CardHoursInfo = ({
  title,
  businessHours,
  defaultOpen = false,
}: Props) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full overflow-hidden rounded-lg bg-white shadow-sm">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className={`flex w-full items-center gap-2 px-4 py-3 text-left transition-colors ${
          isOpen ? 'bg-orange-50' : 'bg-white'
        }`}
      >
        <ClockIcon className="size-4 shrink-0 text-orange-500" />

        <span className="flex-1 text-sm font-semibold text-gray-900">
          {title}
        </span>

        <ChevronDownIcon
          className={`size-4 shrink-0 text-orange-500 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <WrapperAnimatedCollapse open={isOpen}>
        <div className="px-4">
          {businessHours.map((businnesHour, index) => (
            <div
              key={`${businnesHour.day}-${index}`}
              className={`flex min-h-9 items-center justify-between gap-4 py-2 ${
                index < businessHours.length - 1
                  ? 'border-b border-gray-100'
                  : ''
              }`}
            >
              <span className="text-sm text-gray-600">
                {HOURS_MAPPER_TO_USER[businnesHour.day]}
              </span>

              <span className="text-sm font-bold whitespace-nowrap text-gray-950">
                {businnesHour.isClosed ? 'Fechado' : businnesHour.hour}
              </span>
            </div>
          ))}
        </div>
      </WrapperAnimatedCollapse>
    </div>
  );
};
