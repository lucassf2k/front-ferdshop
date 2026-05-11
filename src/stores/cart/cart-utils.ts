import type { AddProductInput, CartProduct } from './cart-type';

export const incremenOrDecrementProductQuantity = (
  cart: CartProduct[],
  productId: string,
  isDecrement = false,
): CartProduct[] => {
  return cart.map((product) => {
    if (product.id !== productId) return product;
    const quantity = isDecrement ? product.quantity - 1 : product.quantity + 1;
    return {
      ...product,
      quantity,
    };
  });
};

export const addNewProduct = (
  cart: CartProduct[],
  product: AddProductInput,
): CartProduct[] => {
  return [
    ...cart,
    {
      ...product,
      quantity: 1,
    },
  ];
};

export const removeProductOfId = (
  cart: CartProduct[],
  productId: string,
): CartProduct[] => {
  return cart.filter((product) => product.id !== productId);
};
