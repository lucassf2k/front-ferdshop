import { unwrapResultOrThrow } from '@/helpers/unwrap-result-or-throw';
import { useBaseApiMutation } from '@/helpers/use-base-api-mutation';
import { softDeleteUserOfIdService } from '@/services/soft-delete-user-of-id';

type Input = {
  id: string;
};

export const useSoftDeleteUserOfIdMutation = (input: Input) => {
  return useBaseApiMutation({
    service: () => unwrapResultOrThrow(softDeleteUserOfIdService(input)),
  });
};
