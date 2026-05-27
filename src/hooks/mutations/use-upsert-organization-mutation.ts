import type { UpsertOrganizationInput } from '@/domain/use-case/upsert-organization';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { upsertOrganizationService } from '@/services/upsert-organization';

export const useOrganizationMutation = () => {
  return useBaseApiMutation({
    service: (data: UpsertOrganizationInput) =>
      unwrapResultOrThrow(upsertOrganizationService(data)),
  });
};
