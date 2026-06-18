type Review = {
  id: string;
  rating: number;
  userId: string;
};

export type ProductModel = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  reviews: Review[];
  reviewCount: number;
  categoryId: string;
};
