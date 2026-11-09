import { BaseFetch } from '@/services/base-fetch';

export type BaseApiSchema<T> = {
  ok: boolean;
  data: T;
};

const FERSHOP_API_URL = import.meta.env.VITE_FERDSHOP_API_URL;

export const api = new BaseFetch(`${FERSHOP_API_URL}/api/v1/`);
