export const ORDER_STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  PENDING: {
    label: 'Pendente',
    className: 'bg-amber-100 text-amber-700 ring-amber-300',
  },
  CONFIRMED: {
    label: 'Confirmado',
    className: 'bg-blue-100 text-blue-700 ring-blue-300',
  },
  PREPARING: {
    label: 'Preparando',
    className: 'bg-violet-100 text-violet-700 ring-violet-300',
  },
  DELIVERING: {
    label: 'Em entrega',
    className: 'bg-indigo-100 text-indigo-700 ring-indigo-300',
  },
  DELIVERED: {
    label: 'Entregue',
    className: 'bg-emerald-100 text-emerald-700 ring-emerald-300',
  },
  CANCELED: {
    label: 'Cancelado',
    className: 'bg-red-100 text-red-700 ring-red-300',
  },
} as const;

export const PAYMENT_STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  PENDING: {
    label: 'PENDENTE',
    className: 'bg-amber-100 text-amber-700 ring-amber-300',
  },
  PAID: {
    label: 'PAGO',
    className: 'bg-emerald-100 text-emerald-700 ring-emerald-300',
  },
  CANCELED: {
    label: 'CANCELADO',
    className: 'bg-red-100 text-red-700 ring-red-300',
  },
  FAILED: {
    label: 'Falhou',
    className: 'bg-rose-100 text-rose-800 ring-rose-300',
  },
  REFUNDED: {
    label: 'Reembolsado',
    className: 'bg-slate-100 text-slate-600 ring-slate-300',
  },
} as const;

export const DELIVERY_OPTION_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  DELIVERY: {
    label: 'Entrega',
    className:
      'uppercase text-[12px] bg-violet-100 text-violet-700 ring-violet-300',
  },
  PICKUP: {
    label: 'Retirada',
    className:
      'uppercase text-[12px] bg-indigo-100 text-indigo-700 ring-indigo-300',
  },
};

export const PAYMENT_OPTION_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  CASH: {
    label: 'Dinheiro',
    className:
      'uppercase text-[12px] bg-violet-100 text-violet-700 ring-violet-300',
  },
  CARD: {
    label: 'CARTÃO',
    className:
      'uppercase text-[12px] bg-indigo-100 text-indigo-700 ring-indigo-300',
  },
  PIX: {
    label: 'PIX',
    className:
      'uppercase text-[12px] bg-indigo-100 text-indigo-700 ring-indigo-300',
  },
};

export const PAYMENT_METHOD_CONFIG: Record<
  string,
  { label: string; icon: string }
> = {
  CASH: { label: 'Dinheiro', icon: '💵' },
  CARD: { label: 'Cartão', icon: '💳' },
  PIX: { label: 'Pix', icon: '⚡' },
} as const;
