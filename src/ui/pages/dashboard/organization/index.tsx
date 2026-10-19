import { useGetOrganizationQuery } from '@/hooks/queries/use-get-organization-query';
import { RegisterOrganizationDialog } from '../components/register-organization';
import { TableWrapper } from '../components/table-wrapper';
import { formatter } from '@/ui/lib/formatters';

export const DashboardOrganizationPage = () => {
  const { data: organizationData, isLoading: isOrganizationLoading } =
    useGetOrganizationQuery();

  return (
    <TableWrapper
      title="Organização"
      createComp={<RegisterOrganizationDialog />}
    >
      {isOrganizationLoading ? (
        <div className="text-muted-foreground py-10 text-center">
          Carregando dados da organização...
        </div>
      ) : !organizationData ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="font-semibold">Nenhuma organização encontrada</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Cadastre uma organização para visualizar suas informações.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cabeçalho */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="bg-primary/10 text-primary flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-bold">
                {organizationData.name.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold">
                  {organizationData.name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {organizationData.city}, {organizationData.state}
                </p>
              </div>

              <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Organização cadastrada
              </span>
            </div>
          </div>

          {/* Dados gerais */}
          <section className="bg-card rounded-xl border p-6">
            <h3 className="mb-5 font-semibold">Dados gerais</h3>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem label="Nome" value={organizationData.name} />
              <InfoItem label="E-mail" value={organizationData.email} />
              <InfoItem label="Telefone" value={organizationData.phone} />
              <InfoItem label="WhatsApp" value={organizationData.whatsapp} />
              <InfoItem
                label="Instagram"
                value={organizationData.instagram}
                isLink
              />
            </div>
          </section>

          {/* Endereço */}
          <section className="bg-card rounded-xl border p-6">
            <h3 className="mb-5 font-semibold">Endereço</h3>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem label="Endereço" value={organizationData.address} />
              <InfoItem label="Cidade" value={organizationData.city} />
              <InfoItem label="Estado" value={organizationData.state} />
            </div>
          </section>

          {/* Localização */}
          <section className="bg-card rounded-xl border p-6">
            <h3 className="mb-5 font-semibold">Localização geográfica</h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoItem
                label="Latitude"
                value={String(organizationData.coordinates.latitude)}
              />
              <InfoItem
                label="Longitude"
                value={String(organizationData.coordinates.longitude)}
              />
            </div>

            <a
              href={`https://www.google.com/maps?q=${organizationData.coordinates.latitude},${organizationData.coordinates.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-5 inline-flex text-sm font-medium hover:underline"
            >
              Ver localização no Google Maps →
            </a>
          </section>

          {/* Datas */}
          <section className="bg-card rounded-xl border p-6">
            <h3 className="mb-5 font-semibold">Informações do cadastro</h3>

            <div className="grid gap-5 sm:grid-cols-2">
              <InfoItem
                label="Criado em"
                value={formatter.date(organizationData.createdAt.toString())}
              />
              <InfoItem
                label="Última atualização"
                value={formatter.date(organizationData.updatedAt.toString())}
              />
            </div>
          </section>
        </div>
      )}
    </TableWrapper>
  );
};

type InfoItemProps = {
  label: string;
  value: string | number | null | undefined;
  isLink?: boolean;
};

const InfoItem = ({ label, value, isLink = false }: InfoItemProps) => {
  const displayValue =
    value == null || value === '' ? 'Não informado' : String(value);

  const instagramUrl = displayValue.startsWith('@')
    ? `https://instagram.com/${displayValue.slice(1)}`
    : `https://instagram.com/${displayValue.replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/^\/+|\/+$/g, '')}`;

  return (
    <div className="min-w-0 space-y-1">
      <p className="text-muted-foreground text-sm">{label}</p>

      {isLink && displayValue !== 'Não informado' ? (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary block font-medium wrap-break-word hover:underline"
        >
          {displayValue}
        </a>
      ) : (
        <p className="font-medium wrap-break-word">{displayValue}</p>
      )}
    </div>
  );
};
