import { api, type BaseApiSchema } from '@/api';
import type {
  UpsertOrganization,
  UpsertOrganizationOutput,
} from '@/domain/use-case/upsert-organization';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const upsertOrganizationService: UpsertOrganization = async (data) => {
  const response = await api.post<BaseApiSchema<UpsertOrganizationOutput>>(
    'organizations',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );
  return unwrapResultBaseAPi(response);
};
