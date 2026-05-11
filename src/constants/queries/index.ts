import { categoryKeys } from '@/constants/queries/categories';
import { userKeys } from '@/constants/queries/users';
import { productKeys } from './products';

export const queries = { categoryKeys, userKeys, productKeys } as const;
