import { categoryKeys } from '@/constants/queries/categories';
import { userKeys } from '@/constants/queries/users';
import { productKeys } from './products';
import { organizationKeys } from './organization';

export const queries = {
  categoryKeys,
  userKeys,
  productKeys,
  organizationKeys,
} as const;
