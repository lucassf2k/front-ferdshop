import { useCartTotalPrice } from '@/stores/cart';
import { Button } from '@/ui/components/base-button';
import { BaseInput } from '@/ui/components/form/input';
import { Switch } from '@/ui/components/form/switch';
import { LeafletMap } from '@/ui/components/maps/leaflet';
import { Badge } from '@/ui/components/ui/badge';
import { WrapperAnimatedCollapse } from '@/ui/components/wrapper-animated-collapse';
import { formatter } from '@/ui/lib/formatters';
import { mask } from '@/ui/lib/mask';
import { cn } from '@/ui/lib/utils';
import { CarTaxiFrontIcon, HomeIcon } from 'lucide-react';
import { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router';
import { CartButton } from '@/ui/pages/cart/components/cart-button';
import { CheckBoxWithLabel } from '@/ui/pages/payment/components/checkbox-with-label';
import { PaymentCardWrapper } from '@/ui/pages/payment/components/payment-wrapper';
import { WrapperWithCheckBox } from '@/ui/pages/payment/components/paymente-selectable-form';
import { SelectableOption } from '@/ui/pages/payment/components/selectable-option';
import {
  DELIVERY_OPTIONS,
  ONLINE_PAYMENT_OPTIONS,
  PAYMENT_OPTIONS,
  type DeliveryOptionsIds,
  type OnlinePaymentIds,
  type PaymentOptionsIds,
} from '@/ui/pages/payment/constants';
import { PaymentBadge } from '@/ui/pages/payment/components/payment-badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PAYMENT_DEFAULT_VALUES,
  paymentFormSchema,
  type PaymentFormSchema,
} from '@/schemas/payment-infos';

export const PaymentPage = () => {
  const form = useForm<PaymentFormSchema>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: PAYMENT_DEFAULT_VALUES,
  });

  const totalToPay = useCartTotalPrice();
  const [phone, setPhone] = useState('');
  const [deliverySelected, setDeliverySelected] =
    useState<DeliveryOptionsIds>('delivery');

  const [selectedPayment, setSelectedPayment] =
    useState<PaymentOptionsIds>('cash');
  const [onlinePaymentSelected, setOnlinePaymentSelected] =
    useState<OnlinePaymentIds>('pix');

  const [address, setAddress] = useState({
    displayName: '',
  });
  const [answer, setAnswer] = useState<boolean>(false);
  const [isScheduleOrder, setIsScheduleOrder] = useState<boolean>(false);
  const [shouldSendOrderViaWhatsapp, setShouldSendOrderViaWhatsapp] =
    useState<boolean>(false);

  const handleToggleDeliveryOption = (optionId: DeliveryOptionsIds) => {
    return () => setDeliverySelected(optionId);
  };

  const handleTogglePaymentOption = (optionId: PaymentOptionsIds) => {
    return () => setSelectedPayment(optionId);
  };

  const handleToggleOnlinePaymentOption = (optionId: OnlinePaymentIds) => {
    return () => setOnlinePaymentSelected(optionId);
  };

  const isCashSelected = selectedPayment === 'cash';
  const isDeliverySelected = deliverySelected === 'delivery';
  const isOnlineSelected = selectedPayment === 'online';

  return (
    <div className="mt-20 min-h-[calc(100vh-80px)] bg-white pb-36">
      <div className="relative flex flex-col items-center py-4 shadow-md after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-linear-to-r after:from-transparent after:via-amber-500 after:to-transparent after:content-['']">
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
          <PaymentBadge
            label="Carrinho"
            Icon={CarTaxiFrontIcon}
            to="/carrinho"
          />
          <PaymentBadge
            label="Pagamento"
            Icon={CarTaxiFrontIcon}
            to="/pagamento"
            selected
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 overflow-y-auto bg-gray-50 py-2">
        {/* DADOS PESSOIAS */}
        <div className="shadow-card mx-auto mt-4 w-[80%] rounded-2xl bg-white px-4 py-6">
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
        <div className="shadow-card mx-auto w-[80%] rounded-2xl bg-white px-4 py-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <Badge variant="outline" className="h-8 w-8 bg-amber-500/20">
              <CarTaxiFrontIcon className="h-4! w-4! font-bold text-amber-600" />
            </Badge>{' '}
            <h4 className="text-md font-bold uppercase">opções de entrega</h4>
          </div>
          <div className="mt-3 space-y-3">
            {DELIVERY_OPTIONS.map((option) => (
              <SelectableOption
                key={option.id}
                title={option.title}
                description={option.description}
                Icon={option.Icon}
                selected={deliverySelected === option.id}
                aria-label={option.ariaLabel}
                onClick={handleToggleDeliveryOption(option.id)}
              />
            ))}
          </div>
        </div>

        {/* CASO DE ENTREGA: ENDEREÇO */}
        <WrapperAnimatedCollapse
          open={isDeliverySelected}
          className={`w-full ${isDeliverySelected ? 'mb-0' : '-mb-4'}`}
        >
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
                placeholder="Ex.: Apartamento 123 ou Casa 453"
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
        </WrapperAnimatedCollapse>

        <div className="mx-auto w-[80%]">
          <div className="border-t border-b border-gray-400 py-6">
            <div className="flex w-full items-center justify-between">
              <p className="font-semibold">Valor da comprar: </p>
              <p className="text-gray-600">{formatter.currency(8.7)}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="font-semibold">Taxa de entrega: </p>
              <p className="text-green-600">Grátis</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="font-semibold">Valor total: </p>
              <p className="text-gray-600">{formatter.currency(8.7)}</p>
            </div>
          </div>

          <div className="border-b border-gray-400 py-6">
            <BaseInput
              label="ALGUMA OBSERVAÇÃO?"
              containerClassName="w-full"
              labelClassName="text-sm font-normal"
              className="border-gray-400 bg-white focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50"
              placeholder="Ex.: Chame no portão"
            />

            <div className="mt-4 flex flex-col items-start justify-center gap-3">
              <Switch
                id="send-whatsapp"
                label="Enviar pedido pelo whatsapp"
                checked={isScheduleOrder}
                onCheckedChange={setIsScheduleOrder}
              />
              <div className="space-y-6">
                <Switch
                  id="send-whatsapp"
                  label="Agendar esse pedido"
                  checked={shouldSendOrderViaWhatsapp}
                  onCheckedChange={setShouldSendOrderViaWhatsapp}
                />
                <WrapperAnimatedCollapse open={shouldSendOrderViaWhatsapp}>
                  <BaseInput
                    type="date"
                    labelClassName="text-sm font-normal"
                    className="border-gray-400 bg-white text-start focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50"
                  />
                </WrapperAnimatedCollapse>
              </div>
            </div>
          </div>
        </div>

        {/* FORMAS DE PAGAMENTO */}
        <div className="shadow-card mx-auto w-[80%] rounded-2xl bg-white px-4 py-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <Badge variant="outline" className="h-8 w-8 bg-amber-500/20">
              <CarTaxiFrontIcon className="h-4! w-4! font-bold text-amber-600" />
            </Badge>{' '}
            <h4 className="text-md font-bold uppercase">forma de pagamento</h4>
          </div>
          <div className="mt-3 space-y-3">
            {PAYMENT_OPTIONS.map((option) => (
              <SelectableOption
                key={option.id}
                title={option.title}
                description={option.description}
                Icon={option.Icon}
                aria-label={option.ariaLabel}
                selected={selectedPayment === option.id}
                onClick={handleTogglePaymentOption(option.id)}
              />
            ))}
          </div>

          <WrapperAnimatedCollapse open={isOnlineSelected} className="mt-3">
            <div className="boder-gray-400 space-y-3 rounded-lg border p-4">
              <h4 className="text-[12px] font-bold text-gray-500 uppercase">
                Escolha método
              </h4>
              {ONLINE_PAYMENT_OPTIONS.map((option) => (
                <SelectableOption
                  key={option.id}
                  title={option.title}
                  description={option.description}
                  Icon={option.Icon}
                  aria-label={option.ariaLabel}
                  selected={onlinePaymentSelected === option.id}
                  onClick={handleToggleOnlinePaymentOption(option.id)}
                />
              ))}
            </div>
          </WrapperAnimatedCollapse>

          {/* CASO DINHEIRO - TROCO */}
          <WrapperAnimatedCollapse open={isCashSelected}>
            <div className="mt-3 border p-4">
              <h4 className="text-[12px] font-bold text-gray-500 uppercase">
                precisa de troco?
              </h4>
              <div className="py-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setAnswer(true)}
                    className={cn(
                      'h-12 w-[48%] cursor-pointer transition-colors',
                      answer === true
                        ? 'border-amber-500 bg-amber-50 text-amber-600 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-600'
                        : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/40 hover:text-amber-600',
                    )}
                  >
                    Sim
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setAnswer(false)}
                    className={cn(
                      'h-12 w-[48%] cursor-pointer transition-colors',
                      answer === false
                        ? 'border-amber-500 bg-amber-50 text-amber-600 hover:border-amber-500 hover:bg-amber-50 hover:text-amber-600'
                        : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/40 hover:text-amber-600',
                    )}
                  >
                    Não
                  </Button>
                </div>

                <WrapperAnimatedCollapse open={answer} className="mt-3 w-full">
                  <BaseInput
                    type="number"
                    label="PARA QUANTO?"
                    containerClassName="w-full"
                    labelClassName="text-sm text-gray-500"
                    className="border-gray-200 focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500/50"
                    placeholder="R$ 0,00"
                  />
                </WrapperAnimatedCollapse>
              </div>
            </div>
          </WrapperAnimatedCollapse>
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
