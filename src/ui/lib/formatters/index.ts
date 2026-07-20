const ROLE_MAP = {
  CUSTOMER: 'Cliente',
  ADMIN: 'Administrador',
};

const date = (value: string) => {
  return new Date(value).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const currency = (value: number) => {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const roleToUser = (role: string) => {
  return ROLE_MAP[role as 'CUSTOMER' | 'ADMIN'];
};

const unwrapTableValue = <T>(value: T | null | undefined) => {
  return value === null || value === undefined ? '-' : value;
};

type Address = {
  street?: string;
  houseNumber?: string;
  city?: string;
  state?: string;
  country?: string;
};

export const formatAddressDisplayName = (address: Address): string => {
  return [
    [address.street && `Rua ${address.street}`, address.houseNumber]
      .filter(Boolean)
      .join(', '),

    [address.city, address.state].filter(Boolean).join(' - '),

    address.country,
  ]
    .filter(Boolean)
    .join(', ');
};

export const formatter = {
  date,
  currency,
  unwrapTableValue,
  roleToUser,
  formatAddressDisplayName,
} as const;
