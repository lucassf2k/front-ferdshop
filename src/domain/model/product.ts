type Review = {
  id: string;
  rating: number;
  userId: string;
};

export type ProductModel = {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  description: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  reviews: Review[];
  reviewCount: number;
  category: {
    id: string;
    name: string;
  };
};
