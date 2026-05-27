import { api, type BaseApiSchema } from '@/api';
import type {
  GetOrganization,
  GetOrganizationOutput,
} from '@/domain/use-case/get-organization';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const getOrganizationService: GetOrganization = async () => {
  const response =
    await api.get<BaseApiSchema<GetOrganizationOutput>>('organizations');
  return unwrapResultBaseAPi(response);
};
