export type AuthRole = 'CUSTOMER' | 'ADMIN';
export type Auth = {
  id: string;
  email: string;
  role: AuthRole;
};
export type AuthStateStatus = 'loading' | 'authenticated' | 'unauthenticated';
