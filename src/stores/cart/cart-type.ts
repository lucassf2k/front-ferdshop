export type CartProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type AddProductInput = Omit<CartProduct, 'quantity'>;

export type CartStore = {
  cart: CartProduct[];
  addProduct: (product: AddProductInput) => void;
  removeProduct: (id: string) => void;
  cleanCart: () => void;
};
