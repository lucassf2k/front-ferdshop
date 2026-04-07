type Input = {
  email: string;
  password: string;
};

type Output = {
  token: string;
};

export type SignIn = (input: Input) => Promise<Output>;
