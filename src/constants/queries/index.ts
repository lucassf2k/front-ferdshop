import { categoryKeys } from '@/constants/queries/categories';
import { userKeys } from '@/constants/queries/users';
import { productKeys } from '@/constants/queries/products';
import { organizationKeys } from '@/constants/queries/organization';
import { orderKeys } from '@/constants/queries/orders';

export const queries = {
  categoryKeys,
  userKeys,
  productKeys,
  organizationKeys,
  orderKeys,
} as const;
