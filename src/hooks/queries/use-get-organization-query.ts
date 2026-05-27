import { queries } from '@/constants/queries';
import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiQuery } from '@/helpers/use-base-api-query';
import { getOrganizationService } from '@/services/get-organization';

export const useGeOrganizationQuery = () => {
  return useBaseApiQuery({
    queryKey: queries.organizationKeys.all,
    service: () => unwrapResultOrThrow(getOrganizationService()),
  });
};
