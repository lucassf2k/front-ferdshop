import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';
import type { OrganizationModel } from '@/domain/model/organization';

export type UpsertOrganizationInput = {
  name: string;
  email: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  whatsapp: string;
  instagram: string;
};

export type UpsertOrganizationOutput = OrganizationModel;

export type UpsertOrganization = (
  data: UpsertOrganizationInput,
) => Promise<Result<AppError, UpsertOrganizationOutput>>;
