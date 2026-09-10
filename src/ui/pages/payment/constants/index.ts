import { FaLocationDot, FaPix } from 'react-icons/fa6';
import { MdDeliveryDining } from 'react-icons/md';
import { PiMoneyWavy } from 'react-icons/pi';
import { CiMoneyCheck1 } from 'react-icons/ci';
import type { SelectableOptionItem } from '@/ui/pages/payment/components/selectable-option';
import {
  DeliveryOptionEnum,
  OnlinePaymentMethodEnum,
  PaymentMethodEnum,
} from '@/domain/use-case/create-order';

export type OnlinePaymentIds = OnlinePaymentMethodEnum;
export const ONLINE_PAYMENT_OPTIONS: SelectableOptionItem<OnlinePaymentIds>[] =
  [
    {
      id: OnlinePaymentMethodEnum.PIX,
      title: 'Pix',
      description: 'Transferencia Pix',
      Icon: FaPix,
      ariaLabel: 'Selecionar pix',
      selected: false,
    },
  ] as const;

export type DeliveryOptionsIds = DeliveryOptionEnum;
export const DELIVERY_OPTIONS: SelectableOptionItem<DeliveryOptionsIds>[] = [
  {
    id: DeliveryOptionEnum.DELIVERY,
    title: 'Entrega',
    description: 'Previsão cerca de 90 min',
    Icon: MdDeliveryDining,
    ariaLabel: 'Selecionar entrega',
    selected: true,
  },
  {
    id: DeliveryOptionEnum.PICKUP,
    title: 'Retirada',
    description: 'Retirada na loja',
    Icon: FaLocationDot,
    ariaLabel: 'Selecionar retirada',
    selected: false,
  },
] as const;

export type PaymentOptionsIds = PaymentMethodEnum;
export const PAYMENT_OPTIONS: SelectableOptionItem<PaymentOptionsIds>[] = [
  {
    id: PaymentMethodEnum.CASH,
    title: 'Dinheiro',
    description: 'Clique e digite o troco',
    Icon: PiMoneyWavy,
    ariaLabel: 'Selecionar dinheiro',
    selected: false,
  },
  {
    id: PaymentMethodEnum.CARD,
    title: 'Cartão',
    description: 'Pague na maquininha',
    Icon: CiMoneyCheck1,
    ariaLabel: 'Selecionar cartão',
    selected: false,
  },
  {
    id: PaymentMethodEnum.ONLINE,
    title: 'Online',
    description: 'Pague com Pix',
    Icon: FaPix,
    ariaLabel: 'Selecionar Pix',
    selected: false,
  },
];
