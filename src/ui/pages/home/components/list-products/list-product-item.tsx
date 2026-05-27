import { useState, type SyntheticEvent } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa6';
import { CiStar } from 'react-icons/ci';
import { currencyFormatter } from '@/services/format-currency';
import { Button } from '@/ui/components/base-button';
import emptyProductImage from '@/ui/assets/empty-product.png';
import type { ProductModel } from '@/domain/model/product';
import { useAddProductToCart } from '@/stores/cart';

interface ListProductItemProps {
  product: ProductModel;
}

export const ListProducItem = ({ product }: ListProductItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const addProduct = useAddProductToCart();

  const renderReviewRating = () =>
    Array.from({ length: 5 }).map((_, index) => {
      const icon =
        index < product.reviewCount ? (
          <FaStar key={index} className="text-amber-500" />
        ) : (
          <CiStar key={index} />
        );
      return icon;
    });

  const fallbackImage = () => {
    return (e: SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = emptyProductImage;
    };
  };

  const handleAddProductToCart = async () => {
    setIsLoading((state) => !state);
    addProduct(product);
    await new Promise((resolve) => setTimeout(resolve, 200));
    setIsLoading((state) => !state);
  };

  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex justify-between">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          onError={fallbackImage()}
          className="h-24 w-24 object-cover"
        />
        <div className="space-y-1 text-end">
          <p className="text-sm font-bold text-green-500">
            {currencyFormatter.toReal(product.price)}
          </p>
          <span className="flex items-center gap-1">
            {renderReviewRating()}
          </span>
        </div>
      </div>

      <div>
        <p className="max-w-60 text-sm leading-7 font-bold">{product.name} </p>
        <p className="text-sm text-gray-500">{product.description}</p>
      </div>

      <Button
        className="mt-10 h-10 w-12 cursor-pointer rounded-xl border border-green-500 bg-transparent text-green-500 transition-all duration-200 hover:bg-green-500 hover:text-white"
        type="button"
        isLoading={isLoading}
        onClick={handleAddProductToCart}
      >
        <BsCartPlus />
      </Button>
    </div>
  );
};
