const ROLE_MAP = {
  CUSTOMER: 'Cliente',
  ADMIN: 'Administrador',
};

const roleToUser = (role: 'CUSTOMER' | 'ADMIN') => {
  return ROLE_MAP[role];
};

export const userMapper = { roleToUser } as const;
