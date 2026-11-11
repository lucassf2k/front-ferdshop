import { CardInfo } from '@/ui/pages/home/components/card-info';
import { MenuBarButton } from './menu-bar-item';
import { Clock, CreditCard, Info, InfoIcon, Map, MapPin } from 'lucide-react';
import { CardInfoTitle } from '@/ui/pages/home/components/card-info/components/card-info-title';
import { CardHoursInfo } from '@/ui/pages/home/components/card-info/components/card-hours-info';
import { PaymentOptionsInfo } from '@/ui/pages/home/components/card-info/components/oayment-options-info';
import { useGetOrganizationQuery } from '@/hooks/queries/use-get-organization-query';

export const OrganizationCardInfo = () => {
  const { data: organizationData } = useGetOrganizationQuery();

  const organization = organizationData ? organizationData : null;

  if (!organization) {
    return null;
  }

  return (
    <CardInfo trigger={<MenuBarButton label="Informações" Icon={InfoIcon} />}>
      <div className="w-full">
        <div className="flex items-center gap-2 p-6">
          <span className="flex h-11.75 w-11.75 items-center justify-center rounded-xl bg-slate-200">
            <Info className="h-6! w-6!" />
          </span>
          <div>
            <strong className="text-[20px]">Informações</strong>
            <p className="text-[14px]">Detalhes da loja</p>
          </div>
        </div>

        <div className="flex max-h-140 flex-col gap-6 overflow-y-auto p-6">
          <div className="space-y-4">
            <CardInfoTitle text="Horário de funcionamento" Icon={Clock} />
            <CardHoursInfo
              title="1º Turno"
              businessHours={organization.businessHours}
              defaultOpen
            />
          </div>

          <CardInfoTitle text="Formas de pagamento" Icon={CreditCard} />
          <PaymentOptionsInfo />

          <div className="flex items-center gap-4">
            <div className="flex w-1/2 flex-col items-center gap-2 rounded-lg border border-gray-100 bg-white py-6 shadow-sm">
              <div className="flex h-11.75 w-11.75 items-center justify-center rounded-lg bg-amber-500">
                <p className="text-white">icon</p>
              </div>
              <p className="text-[12px] text-gray-400 uppercase">
                Pedido mínimo
              </p>
              <p className="text-xl font-bold">R$ 0,00</p>
            </div>

            <div className="flex w-1/2 flex-col items-center gap-2 rounded-lg border border-gray-100 bg-white py-6 shadow-sm">
              <div className="flex h-11.75 w-11.75 items-center justify-center rounded-lg bg-amber-500">
                <p className="text-white">icon</p>
              </div>
              <p className="text-[12px] text-gray-400 uppercase">
                Tempo máximo
              </p>
              <p className="text-xl font-bold">90 min</p>
            </div>
          </div>

          <CardInfoTitle text="Endereço" Icon={MapPin} />
          <div className="flex flex-col items-center gap-2 rounded-lg border border-gray-100 bg-white py-6 shadow-sm">
            <div className="text-md flex max-w-[320px] flex-col items-center gap-2 text-center">
              <p className="font-bold text-gray-600">{organization.address}</p>
              <p className="text-gray-500">{organization.city}</p>
              <p className="text-gray-500">{organization.state}</p>
            </div>

            <a
              className="flex w-[80%] cursor-pointer items-center justify-center gap-2 rounded-lg bg-amber-500 py-4 font-bold text-white hover:bg-amber-600"
              href={`https://www.google.com/maps?q=${organization.coordinates.latitude},${organization.coordinates.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Map className="h-6! w-6!" />
              <p> Abrir no Mapa</p>
            </a>
          </div>
        </div>
      </div>
    </CardInfo>
  );
};
