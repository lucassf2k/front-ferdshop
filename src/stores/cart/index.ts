import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartStore } from '@/stores/cart/cart-type';
import {
  addNewProduct,
  incremenOrDecrementProductQuantity,
  removeProductOfId,
} from '@/stores/cart/cart-utils';

const CART_KEY = 'ferdshop.cart';

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addProduct: (product) => {
        set((state) => {
          const productAlreadyExists = state.cart.some(
            (item) => item.id === product.id,
          );
          if (productAlreadyExists) {
            return {
              cart: incremenOrDecrementProductQuantity(state.cart, product.id),
            };
          }
          return {
            cart: addNewProduct(state.cart, product),
          };
        });
      },
      removeProduct: (productId) => {
        set((state) => {
          const product = state.cart.find((item) => item.id === productId);
          if (!product) return { cart: state.cart };
          const shouldRemoceProduct = product.quantity === 1;
          if (shouldRemoceProduct) {
            return { cart: removeProductOfId(state.cart, productId) };
          }
          return {
            cart: incremenOrDecrementProductQuantity(
              state.cart,
              productId,
              true,
            ),
          };
        });
      },
      cleanCart: () => {
        set({ cart: [] });
      },
    }),
    { name: CART_KEY },
  ),
);

export const useCartItems = () => useCart((state) => state.cart);
export const useAddProductToCart = () => useCart((state) => state.addProduct);

export const useRemoveProductFromCart = () =>
  useCart((state) => state.removeProduct);
export const useCleanCart = () => useCart((state) => state.cleanCart);
export const useCartTotalItems = () =>
  useCart((state) =>
    state.cart.reduce((acc, items) => acc + items.quantity, 0),
  );
export const useCartTotalPrice = () =>
  useCart((state) =>
    state.cart.reduce((acc, items) => acc + items.price * items.quantity, 0),
  );
