import { Link } from 'react-router';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { CarTaxiFrontIcon, HomeIcon } from 'lucide-react';
import { Badge } from '@/ui/components/ui/badge';
import type { IconType } from 'react-icons/lib';
import { cn } from '@/ui/lib/utils';
import { BaseInput } from '@/ui/components/form/input';
import { mask } from '@/ui/lib/mask';
import { useState } from 'react';
import { MdDeliveryDining } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import {
  SelectableOption,
  selectableSingleOption,
  toggleSelectableOption,
  type SelectableOptionItem,
} from './components/selectable-option';
import { CartButton } from '../cart/components/cart-button';
import { useCartTotalPrice } from '@/stores/cart';
import { PiMoneyWavy } from 'react-icons/pi';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { FaPix } from 'react-icons/fa6';
import { PaymentCardWrapper } from './components/payment-wrapper';
import { Checkbox } from '@/ui/components/ui/checkbox';
import { CheckBoxWithLabel } from './components/checkbox-with-label';
import { WrapperWithCheckBox } from './components/paymente-selectable-form';
import { LeafletMap } from '@/ui/components/maps/leaflet';
import type { GetAddressOutput } from '@/domain/use-case/get-address';

interface BadgePaymentFlowProps {
  label: string;
  Icon: IconType;
  selected?: boolean;
}

const BadgePaymentFlow = ({ label, Icon, selected }: BadgePaymentFlowProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        'flex cursor-pointer items-center gap-2 px-5 py-1.5 text-[13px] text-zinc-500 transition-colors',
        selected
          ? 'border-amber-500 bg-amber-500 text-white hover:bg-amber-500 hover:text-white'
          : 'hover:bg-amber-300/20 hover:font-bold hover:text-amber-600',
      )}
    >
      <Icon className="h-4! w-4! text-current" />
      {label}
    </Badge>
  );
};

export const PaymentPage = () => {
  const totalToPay = useCartTotalPrice();
  const [phone, setPhone] = useState('');
  const [deliveryOptions, setDeliveryOptions] = useState<
    SelectableOptionItem[]
  >([
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
  ]);
  const [paymentOptions, setPaymentOptions] = useState<SelectableOptionItem[]>([
    {
      id: 'cash',
      title: 'Dinheiro',
      description: 'Clique e digite o troco',
      Icon: PiMoneyWavy,
      ariaLabel: 'Selecionar dinheiro',
      selected: true,
    },
    {
      id: 'card',
      title: 'Cartão',
      description: 'Pague na maquininha',
      Icon: CiMoneyCheck1,
      ariaLabel: 'Selecionar cartão',
      selected: false,
    },
    {
      id: 'pix',
      title: 'online',
      description: 'Pague com pix',
      Icon: FaPix,
      ariaLabel: 'Selecionar pix',
      selected: false,
    },
  ]);
  const [address, setAddress] = useState({
    displayName: '',
  });

  const handleToggleDeliveryOption = (optionId: string) => {
    return () =>
      setDeliveryOptions((prev) => selectableSingleOption(prev, optionId));
  };

  const handleTogglePaymentOption = (optionId: string) => {
    return () =>
      setPaymentOptions((prev) => selectableSingleOption(prev, optionId));
  };

  return (
    <div className="mt-20 min-h-[calc(100vh-80px)] bg-white pb-36">
      <div className="relative flex flex-col items-center py-4 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-linear-to-r after:from-transparent after:via-amber-500 after:to-transparent after:content-['']">
        <div className="mx-auto flex w-[80%] items-center justify-between">
          <Link
            to="/carrinho"
            className="flex h-11 w-32 items-center justify-center gap-2 rounded-2xl border px-3.5 py-2 text-sm hover:border-amber-500 hover:text-amber-500"
          >
            <IoIosArrowRoundBack className="h-6 w-6 hover:text-amber-500" />
            Carrinho
          </Link>
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-md font-bold uppercase">concluir pedido</h3>
            <p className="text-sm text-zinc-500">
              Confirme seus dados e finalize
            </p>
          </div>
          <Link
            to="/carrinho"
            className="flex h-11 w-32 items-center justify-center gap-3 rounded-2xl border px-3.5 py-2 text-sm hover:border-amber-500 hover:text-amber-500"
          >
            Loja <HomeIcon className="h-6 w-6 hover:text-amber-500" />
          </Link>
        </div>
        {/* BADGE */}
        <div className="mt-4 flex items-center gap-2">
          <BadgePaymentFlow label="Carrinho" Icon={CarTaxiFrontIcon} />
          <BadgePaymentFlow
            label="Pagamento"
            Icon={CarTaxiFrontIcon}
            selected
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 overflow-y-auto bg-zinc-200 py-2">
        {/* DADOS PESSOIAS */}
        <div className="mx-auto mt-4 w-[80%] rounded-2xl bg-white px-4 py-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <Badge variant="outline" className="h-8 w-8 bg-amber-500/20">
              <CarTaxiFrontIcon className="h-4! w-4! font-bold text-amber-600" />
            </Badge>{' '}
            <h4 className="text-md font-bold uppercase">Seus dados</h4>
          </div>
          <div className="pt-4">
            <div className="flex items-center justify-between gap-4">
              <BaseInput
                label="SEU TELEFONE"
                containerClassName="w-1/2"
                labelClassName="text-sm text-gray-500"
                className="border-gray-200 focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50"
                placeholder="(00) 00000-0000"
                value={phone}
                onChange={(e) => setPhone(mask.phoneMask(e.target.value))}
              />
              <BaseInput
                label="SEU NOME"
                containerClassName="w-1/2"
                labelClassName="text-sm text-gray-500"
                className="border-gray-200 focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50"
                placeholder="Digite seu nome"
              />
            </div>
          </div>
        </div>

        {/* DADOS DE ENTREGA */}
        <div className="mx-auto w-[80%] rounded-2xl bg-white px-4 py-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <Badge variant="outline" className="h-8 w-8 bg-amber-500/20">
              <CarTaxiFrontIcon className="h-4! w-4! font-bold text-amber-600" />
            </Badge>{' '}
            <h4 className="text-md font-bold uppercase">dados de entrega</h4>
          </div>
          <div className="mt-3 space-y-3">
            {deliveryOptions.map((option) => (
              <SelectableOption
                key={option.id}
                title={option.title}
                description={option.description}
                Icon={option.Icon}
                selected={option.selected}
                onClick={handleToggleDeliveryOption(option.id)}
                aria-label={option.ariaLabel}
              />
            ))}
          </div>
        </div>

        {/* CASO DE ENTREGA: ENDEREÇO */}
        <PaymentCardWrapper className="border border-slate-300 bg-slate-200 p-6 shadow-none">
          <div className="space-y-3">
            <WrapperWithCheckBox checkBoxLabel="Digite o endereço">
              <div className="mt-3 flex items-center">
                <div className="flex h-11 w-11 items-center justify-center border">
                  <FaLocationDot className="text-green-500" />
                </div>
                <BaseInput
                  containerClassName="w-full"
                  labelClassName="text-sm text-gray-500"
                  className="border-gray-200 focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50"
                  placeholder="Cidade, bairro, rua"
                />
              </div>
              <div className="relative mt-3">
                <BaseInput
                  label="NÚMERO"
                  containerClassName="w-full"
                  labelClassName="text-[10px] text-gray-500"
                  className="border-gray-200 focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50"
                  placeholder="Número da sua residência"
                />

                <CheckBoxWithLabel
                  label="Sem número"
                  className="absolute -top-1 right-0"
                />
              </div>
            </WrapperWithCheckBox>

            {/* MAPA */}
            <WrapperWithCheckBox checkBoxLabel="Obter no mapa">
              <LeafletMap
                onChange={(address) =>
                  setAddress({ displayName: address.displayName || '' })
                }
              />

              <div className="mt-1">
                <p className="text-gray-600">{address.displayName}</p>
              </div>
            </WrapperWithCheckBox>
          </div>

          {/* COMPLEMENTO */}
          <div className="mt-3 space-y-2">
            <BaseInput
              label="Possui complemento?"
              containerClassName="w-full"
              labelClassName="text-sm text-gray-500"
              className="border-gray-400 bg-white focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50"
              placeholder="Ex.: Apartamento 123"
            />
            <BaseInput
              label="Algum ponto de referência?"
              containerClassName="w-full"
              labelClassName="text-sm text-gray-500"
              className="border-gray-400 bg-white focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50"
              placeholder="Ex.: Perto da escola"
            />
          </div>
        </PaymentCardWrapper>
        {/* FORMAS DE PAGAMENTO */}
        <div className="mx-auto w-[80%] rounded-2xl bg-white px-4 py-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <Badge variant="outline" className="h-8 w-8 bg-amber-500/20">
              <CarTaxiFrontIcon className="h-4! w-4! font-bold text-amber-600" />
            </Badge>{' '}
            <h4 className="text-md font-bold uppercase">forma de pagamento</h4>
          </div>
          <div className="mt-3 space-y-3">
            {paymentOptions.map((option) => (
              <SelectableOption
                key={option.id}
                title={option.title}
                description={option.description}
                Icon={option.Icon}
                selected={option.selected}
                onClick={handleTogglePaymentOption(option.id)}
                aria-label={option.ariaLabel}
              />
            ))}
          </div>
        </div>
      </div>

      {/* BOTÂO DE FINALIZAR */}
      <div className="fixed right-0 bottom-0 left-0 border-t bg-white/90 p-5 backdrop-blur-md">
        <div className="mx-auto w-full max-w-2xl">
          <CartButton text="Finalizar compra" total={totalToPay} disabled />
        </div>
      </div>
    </div>
  );
};
