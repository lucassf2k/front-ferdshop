import { queries } from '@/constants/queries';
import type { UpsertOrganizationInput } from '@/domain/use-case/upsert-organization';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { upsertOrganizationService } from '@/services/upsert-organization';
import { useQueryClient } from '@tanstack/react-query';

export const useUpsertOrganizationMutation = () => {
  const clientQuery = useQueryClient();

  return useBaseApiMutation({
    service: (data: UpsertOrganizationInput) =>
      unwrapResultOrThrow(upsertOrganizationService(data)),
    options: {
      onSuccess: () => {
        clientQuery.invalidateQueries({
          queryKey: queries.organizationKeys.all,
        });
      },
    },
  });
};
