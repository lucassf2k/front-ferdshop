import React from 'react';
import { Banknote, CreditCard } from 'lucide-react';
import { FaPix } from 'react-icons/fa6';

interface PaymentOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  bgColor: string;
}

const options: PaymentOption[] = [
  {
    id: 'dinheiro',
    label: 'Dinheiro',
    icon: <Banknote className="h-6 w-6 text-emerald-600" />,
    bgColor: 'bg-emerald-50',
  },
  {
    id: 'cartao',
    label: 'Cartão',
    icon: <CreditCard className="h-6 w-6 text-amber-600" />,
    bgColor: 'bg-amber-50',
  },
  {
    id: 'pix',
    label: 'PIX',
    icon: <FaPix className="h-6 w-6 text-blue-600" />,
    bgColor: 'bg-blue-50',
  },
];

export function PaymentOptionsInfo() {
  return (
    <div className="flex bg-slate-50">
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex w-36.25 items-center gap-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div
              className={`flex items-center justify-center rounded-xl p-3 ${option.bgColor}`}
            >
              {option.icon}
            </div>

            <span className="text-[14px] font-medium text-gray-800">
              {option.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
