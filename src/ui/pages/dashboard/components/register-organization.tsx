import type { OrganizationModel } from '@/domain/model/organization';
import { useUpsertOrganizationMutation } from '@/hooks/mutations/use-upsert-organization-mutation';
import { useGetOrganizationQuery } from '@/hooks/queries/use-get-organization-query';
import { useGetGeolocation } from '@/hooks/use-get-geolocation';
import { Button } from '@/ui/components/base-button';
import { CustomActionDialogWrapper } from '@/ui/components/custom-dialog';
import { DialogForm } from '@/ui/components/custom-dialog/dialog-form';
import { BaseInput } from '@/ui/components/form/input';
import { mask } from '@/ui/lib/mask';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import {
  Controller,
  useForm,
  useWatch,
  type SubmitHandler,
} from 'react-hook-form';
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
  whatsapp: z.string().min(15, {
    error: 'Whatsapp precisa ter 15 dígitos',
  }),
  instagram: z.string().min(1, {
    error: 'Instagram é obrigatório',
  }),
});

type FormData = z.infer<typeof zodRegisterOrganizationDialogSchema>;

const DEFAULT_VALUES: FormData = {
  name: '',
  email: '',
  phone: '',
  address: '',
  latitude: 0,
  longitude: 0,
  city: '',
  state: '',
  whatsapp: '',
  instagram: '',
};

const mapOrganizationToForm = (organization: OrganizationModel): FormData => ({
  name: organization.name,
  email: organization.email,
  phone: organization.phone,
  address: organization.address,
  latitude: organization.coordinates.latitude,
  longitude: organization.coordinates.longitude,
  city: organization.city,
  state: organization.state,
  whatsapp: organization.whatsapp,
  instagram: organization.instagram,
});

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
    control,
    formState: { errors },
  } = useForm<FormData>({
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
    if (latitude == null || longitude == null) {
      return;
    }

    setValue('latitude', latitude, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue('longitude', longitude, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [latitude, longitude, setValue]);

  const [currentLatitude, currentLongitude] = useWatch({
    control,
    name: ['latitude', 'longitude'],
  });

  const handleUpsertOrganization: SubmitHandler<FormData> = (data) => {
    mutate({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      whatsapp: data.whatsapp,
      instagram: data.instagram,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  };

  const isEditing = Boolean(organizationData);

  const hasCurrentLocation =
    latitude !== null &&
    latitude !== undefined &&
    longitude !== null &&
    longitude !== undefined;

  const canShowForm = isEditing || hasCurrentLocation;

  const isFormLoading = isOrganizationLoading || isUpsertPending;

  return (
    <CustomActionDialogWrapper
      title={isEditing ? 'Atualizar organização' : 'Criar organização'}
      dialogTitle="Organização"
    >
      {!canShowForm ? (
        <div className="flex flex-col gap-4">
          <Button
            type="button"
            onClick={getCurrentLocation}
            isLoading={isGeolocationLoading}
          >
            Obter localização
          </Button>

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
          isLoading={isFormLoading}
        >
          <div className="space-y-3 rounded-md border p-4">
            <div>
              <p className="font-medium">Coordenadas cadastradas</p>

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
              isLoading={isGeolocationLoading}
              disabled={isGeolocationLoading}
            >
              Atualizar coordenadas
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
            disabled={isFormLoading}
            {...register('name')}
          />

          <BaseInput
            label="Email da organização"
            placeholder="Digite o email da organização"
            type="email"
            error={errors.email?.message}
            disabled={isFormLoading}
            {...register('email')}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <BaseInput
                label="Telefone da organização"
                placeholder="Ex.: (99) 99999-9999"
                error={errors.phone?.message}
                disabled={isFormLoading}
                value={field.value ?? ''}
                onChange={(e) => field.onChange(mask.phoneMask(e.target.value))}
              />
            )}
          />

          <BaseInput
            label="Endereço da organização"
            placeholder="Digite o endereço da organização"
            error={errors.address?.message}
            disabled={isFormLoading}
            {...register('address')}
          />

          <BaseInput
            label="Estado da organização"
            placeholder="Digite o estado da organização"
            error={errors.state?.message}
            disabled={isFormLoading}
            {...register('state')}
          />

          <BaseInput
            label="Cidade da organização"
            placeholder="Digite a cidade da organização"
            error={errors.city?.message}
            disabled={isFormLoading}
            {...register('city')}
          />

          <Controller
            control={control}
            name="whatsapp"
            render={({ field }) => (
              <BaseInput
                label="Whatsapp da organização"
                placeholder="Ex.: (99) 99999-9999"
                error={errors.whatsapp?.message}
                disabled={isFormLoading}
                value={field.value ?? ''}
                onChange={(e) => field.onChange(mask.phoneMask(e.target.value))}
              />
            )}
          />

          <BaseInput
            label="Instagram da organização"
            placeholder="Digite o instagram da organização"
            error={errors.instagram?.message}
            disabled={isFormLoading}
            {...register('instagram')}
          />
        </DialogForm>
      )}
    </CustomActionDialogWrapper>
  );
};
