import { FaLocationDot, FaPix } from 'react-icons/fa6';
import { MdDeliveryDining } from 'react-icons/md';
import { PiMoneyWavy } from 'react-icons/pi';
import { CiMoneyCheck1 } from 'react-icons/ci';
import type { SelectableOptionItem } from '@/ui/pages/payment/components/selectable-option';

export type OnlinePaymentIds = 'pix';
export const ONLINE_PAYMENT_OPTIONS: SelectableOptionItem<OnlinePaymentIds>[] =
  [
    {
      id: 'pix',
      title: 'Pix',
      description: 'Transferencia Pix',
      Icon: FaPix,
      ariaLabel: 'Selecionar pix',
      selected: false,
    },
  ] as const;

export type DeliveryOptionsIds = 'delivery' | 'pickup';
export const DELIVERY_OPTIONS: SelectableOptionItem<DeliveryOptionsIds>[] = [
  {
    id: 'delivery',
    title: 'Entrega',
    description: 'Previsão cerca de 90 min',
    Icon: MdDeliveryDining,
    ariaLabel: 'Selecionar entrega',
    selected: true,
  },
  {
    id: 'pickup',
    title: 'Retirada',
    description: 'Retirada na loja',
    Icon: FaLocationDot,
    ariaLabel: 'Selecionar retirada',
    selected: false,
  },
] as const;

export type PaymentOptionsIds = 'cash' | 'card' | 'online';
export const PAYMENT_OPTIONS: SelectableOptionItem<PaymentOptionsIds>[] = [
  {
    id: 'cash',
    title: 'Dinheiro',
    description: 'Clique e digite o troco',
    Icon: PiMoneyWavy,
    ariaLabel: 'Selecionar dinheiro',
    selected: false,
  },
  {
    id: 'card',
    title: 'Cartão',
    description: 'Pague na maquininha',
    Icon: CiMoneyCheck1,
    ariaLabel: 'Selecionar cartão',
    selected: false,
  },
  {
    id: 'online',
    title: 'Online',
    description: 'Pague com Pix',
    Icon: FaPix,
    ariaLabel: 'Selecionar Pix',
    selected: false,
  },
];
