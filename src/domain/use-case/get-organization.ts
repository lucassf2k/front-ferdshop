import type { OrganizationModel } from '@/domain/model/organization';
import type { AppError } from '@/domain/shared/api-error';
import type { Result } from '@/domain/shared/result';

export type GetOrganizationOutput = OrganizationModel;

export type GetOrganization = () => Promise<
  Result<AppError, GetOrganizationOutput>
>;
