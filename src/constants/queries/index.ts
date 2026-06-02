import { categoryKeys } from '@/constants/queries/categories';
import { userKeys } from '@/constants/queries/users';
import { productKeys } from '@/constants/queries/products';
import { organizationKeys } from '@/constants/queries/organization';

export const queries = {
  categoryKeys,
  userKeys,
  productKeys,
  organizationKeys,
} as const;
