type Input = {
  name: string;
};

type Output = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCategory = (input: Input) => Promise<Output>;
