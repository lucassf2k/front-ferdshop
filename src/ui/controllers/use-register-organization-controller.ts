import type { OrganizationModel } from '@/domain/model/organization';
import { useUpsertOrganizationMutation } from '@/hooks/mutations/use-upsert-organization-mutation';
import { useGetOrganizationQuery } from '@/hooks/queries/use-get-organization-query';
import { useGetGeolocation } from '@/hooks/use-get-geolocation';
import {
  zodRegisterOrganizationDialogSchema,
  type ZodRegisterOrganizationDialogSchema,
} from '@/schemas/upsert-organization';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

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

export const useRegisterOrganizationController = () => {
  const form = useForm<ZodRegisterOrganizationDialogSchema>({
    resolver: zodResolver(zodRegisterOrganizationDialogSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { data: organizationData, isLoading: isOrganizationLoading } =
    useGetOrganizationQuery();

  const {
    latitude,
    longitude,
    isLoading: isGeolocationLoading,
    error: geolocationError,
    getCurrentLocation,
  } = useGetGeolocation();

  const { mutate: upsertOrganization, isPending: isUpsertPending } =
    useUpsertOrganizationMutation();

  useEffect(() => {
    if (!organizationData) {
      form.reset(DEFAULT_VALUES);
      return;
    }

    form.reset(mapOrganizationToForm(organizationData));
  }, [organizationData, form]);

  useEffect(() => {
    if (latitude == null || longitude == null) {
      return;
    }

    form.setValue('latitude', latitude);
    form.setValue('longitude', longitude);
  }, [latitude, longitude, form]);

  const handleSubmit: SubmitHandler<ZodRegisterOrganizationDialogSchema> = (
    data,
  ) => {
    upsertOrganization({
      ...data,
      latitude: data.latitude,
      longitude: data.longitude,
    });
  };

  const isEditing = Boolean(organizationData);

  const hasCurrentLocation = latitude != null && longitude != null;

  const canShowForm = isEditing || hasCurrentLocation;

  const title = isEditing ? 'Atualizar organização' : 'Criar organização';

  const isLoading =
    isOrganizationLoading || isGeolocationLoading || isUpsertPending;

  return {
    form,

    title,
    isLoading,
    isEditing,
    canShowForm,

    geolocationError,
    getCurrentLocation,
    isGeolocationLoading,

    handleSubmit,

    currentLatitude: form.watch('latitude'),
    currentLongitude: form.watch('longitude'),
  };
};
