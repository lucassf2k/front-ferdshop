type ListUsersInput = {
  page: number;
  perPage: number;
};

type ListUsersOutput = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ListUsers = (input: ListUsersInput) => Promise<ListUsersOutput[]>;
