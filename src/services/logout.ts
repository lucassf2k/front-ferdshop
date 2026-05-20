import { api, type BaseApiSchema } from '@/api';
import type { LogOut, LogOutOutput } from '@/domain/use-case/logout';
import { unwrapResultBaseAPi } from '@/helpers/unwrap-result-base-api';

export const logOutService: LogOut = async () => {
  const response = await api.post<BaseApiSchema<LogOutOutput>>('auth/logout');
  return unwrapResultBaseAPi(response);
};
