type Coordinates = {
  latitude: number;
  longitude: number;
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
  createdAt: Date;
  updatedAt: Date;
};
