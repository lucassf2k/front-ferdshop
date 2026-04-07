import type { User } from '@/domain/entities/user';

type Input = User;

type Output = {
  id: string;
};

export type SignUp = (input: Input) => Promise<Output>;
