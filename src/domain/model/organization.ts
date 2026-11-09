import type { PaymentMethodEnum } from '../use-case/create-order';

type Coordinates = {
  latitude: number;
  longitude: number;
};

export type BusinessHours = {
  day: string;
  hour: string;
  isClosed: boolean;
};

export type OrganizationModel = {
  id: boolean;
  name: string;
  email: string;
  phone: string;
  address: string;
  coordinates: Coordinates;
  city: string;
  state: string;
  whatsapp: string;
  instagram: string;
  paymentMethods: PaymentMethodEnum[];
  businessHours: BusinessHours[];
  createdAt: Date;
  updatedAt: Date;
};
