import { api, type BaseApiSchema } from '@/api';
import type { GetMe, GetMeOutput } from '@/domain/use-case/get-me';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const getMeService: GetMe = async () => {
  const response = await api.get<BaseApiSchema<GetMeOutput>>('auth/me');
  return unwrapResultBaseAPi(response);
};
