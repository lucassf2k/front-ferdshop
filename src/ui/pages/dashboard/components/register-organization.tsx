import type { OrganizationModel } from '@/domain/model/organization';
import { useUpsertOrganizationMutation } from '@/hooks/mutations/use-upsert-organization-mutation';
import { useGetOrganizationQuery } from '@/hooks/queries/use-get-organization-query';
import { useGetGeolocation } from '@/hooks/use-get-geolocation';
import { Button } from '@/ui/components/base-button';
import { CustomRegisterDialogWrapper } from '@/ui/components/custom-dialog';
import { DialogForm } from '@/ui/components/custom-dialog/dialog-form';
import { BaseInput } from '@/ui/components/form/input';
import { mask } from '@/ui/lib/mask';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';

const zodRegisterOrganizationDialogSchema = z.object({
  name: z.string().min(1, { error: 'Nome é obrigatório' }),
  email: z.email({ error: 'Email inválido' }),
  phone: z.string().min(15, { error: 'Telefone precisa ter 15 dígitos' }),
  address: z.string().min(1, { error: 'Endereço é obrigatório' }),
  latitude: z.number({ error: 'Latitude inválida' }),
  longitude: z.number({ error: 'Longitude inválida' }),
  city: z.string().min(1, { error: 'Cidade é obrigatória' }),
  state: z.string().min(1, { error: 'Estado é obrigatório' }),
});

type ZodRegisterOrganizationDialogSchema = z.infer<
  typeof zodRegisterOrganizationDialogSchema
>;

const DEFAULT_VALUES: ZodRegisterOrganizationDialogSchema = {
  name: '',
  email: '',
  phone: '',
  address: '',
  latitude: 0,
  longitude: 0,
  city: '',
  state: '',
};

const mapOrganizationToForm = (
  organization: OrganizationModel,
): ZodRegisterOrganizationDialogSchema => {
  return {
    name: organization.name,
    email: organization.email,
    phone: organization.phone,
    address: organization.address,
    latitude: organization.coordinates.latitude,
    longitude: organization.coordinates.longitude,
    city: organization.city,
    state: organization.state,
  };
};

export const RegisterOrganizationDialog = () => {
  const { data: organizationData, isLoading: isOrganizationLoading } =
    useGetOrganizationQuery();

  const {
    latitude,
    longitude,
    isLoading: isGeolocationLoading,
    error: geolocationError,
    getCurrentLocation,
  } = useGetGeolocation();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm<ZodRegisterOrganizationDialogSchema>({
    resolver: zodResolver(zodRegisterOrganizationDialogSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { mutate, isPending: isUpsertPending } =
    useUpsertOrganizationMutation();

  useEffect(() => {
    if (!organizationData) {
      reset(DEFAULT_VALUES);
      return;
    }

    reset(mapOrganizationToForm(organizationData));
  }, [organizationData, reset]);

  useEffect(() => {
    if (
      latitude !== null &&
      latitude !== undefined &&
      longitude !== null &&
      longitude !== undefined
    ) {
      setValue('latitude', latitude);
      setValue('longitude', longitude);
    }
  }, [latitude, longitude, setValue]);

  const handleUpsertOrganization: SubmitHandler<
    ZodRegisterOrganizationDialogSchema
  > = (data) => {
    mutate({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  };

  const title = organizationData
    ? 'Atualizar organização'
    : 'Criar organização';

  const isLoading =
    isOrganizationLoading || isUpsertPending || isGeolocationLoading;

  const isEditing = !!organizationData;

  const hasCurrentLocation =
    latitude !== null &&
    latitude !== undefined &&
    longitude !== null &&
    longitude !== undefined;

  const canShowForm = isEditing || hasCurrentLocation;

  const currentLatitude = watch('latitude');
  const currentLongitude = watch('longitude');

  return (
    <CustomRegisterDialogWrapper title={title} dialogTitle="Organização">
      {!canShowForm ? (
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={isGeolocationLoading}
            className="bg-primary rounded-md px-4 py-2 text-white disabled:opacity-50"
          >
            {isGeolocationLoading
              ? 'Obtendo localização...'
              : 'Obter localização'}
          </button>

          {geolocationError && (
            <p className="text-sm text-red-500">
              Desculpe, ocorreu um erro ao obter sua localização.
            </p>
          )}
        </div>
      ) : (
        <DialogForm
          onHandleSubmit={handleSubmit}
          onSubmit={handleUpsertOrganization}
          isLoading={isLoading}
        >
          <div className="space-y-3 rounded-md border p-4">
            <div>
              <p className="font-medium">Localização atual</p>

              <p className="text-muted-foreground text-sm">
                Latitude: {currentLatitude}
              </p>

              <p className="text-muted-foreground text-sm">
                Longitude: {currentLongitude}
              </p>
            </div>

            <Button
              type="button"
              onClick={getCurrentLocation}
              disabled={isGeolocationLoading}
              isLoading={isGeolocationLoading}
              className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {isGeolocationLoading
                ? 'Atualizando coordenadas...'
                : 'Atualizar coordenadas'}
            </Button>

            {geolocationError && (
              <p className="text-sm text-red-500">
                Erro ao obter localização atual.
              </p>
            )}
          </div>

          <BaseInput
            label="Nome da organização"
            placeholder="Digite o nome da organização"
            error={errors.name?.message}
            disabled={isLoading}
            {...register('name')}
          />

          <BaseInput
            label="Email da organização"
            placeholder="Digite o email da organização"
            type="email"
            error={errors.email?.message}
            disabled={isLoading}
            {...register('email')}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <BaseInput
                label="Telefone da organização"
                placeholder="Digite o telefone da organização"
                error={errors.phone?.message}
                disabled={isLoading}
                value={field.value ?? ''}
                onChange={(e) => field.onChange(mask.phoneMask(e.target.value))}
              />
            )}
          />

          <BaseInput
            label="Endereço da organização"
            placeholder="Digite o endereço da organização"
            error={errors.address?.message}
            disabled={isLoading}
            {...register('address')}
          />

          <BaseInput
            label="Estado da organização"
            placeholder="Digite o estado da organização"
            error={errors.state?.message}
            disabled={isLoading}
            {...register('state')}
          />

          <BaseInput
            label="Cidade da organização"
            placeholder="Digite a cidade da organização"
            error={errors.city?.message}
            disabled={isLoading}
            {...register('city')}
          />
        </DialogForm>
      )}
    </CustomRegisterDialogWrapper>
  );
};
