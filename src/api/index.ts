import { BaseFetch } from '@/services/base-fetch';

export type BaseApiSchema<T> = {
  ok: boolean;
  data: T;
};

export const api = new BaseFetch('http://localhost:3001/api/v1/');
