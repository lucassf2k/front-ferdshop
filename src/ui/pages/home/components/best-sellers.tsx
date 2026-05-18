import { FaFire } from 'react-icons/fa';
import logoImage from '@/ui/assets/logo.png';
import { BestSellersSkeleton } from '@/ui/components/skeletons/bes-sellers-skeleton';
import { useListProductsBestSellersQuery } from '@/hooks/queries/use-list-products-best-sellers-query';
import { formatCurrencyService } from '@/services/format-currency';

interface BestSellersItemProps {
  name: string;
  description: string | undefined;
  price: number;
  sold: number;
  position: number;
}

const badgeStyles = {
  1: {
    bg: 'bg-amber-500',
    text: 'text-amber-500',
    shadow: 'hover:shadow-amber-200',
  },
  2: {
    bg: 'bg-orange-500',
    text: 'text-orange-500',
    shadow: 'hover:shadow-orange-200',
  },
  default: {
    bg: 'bg-gray-400',
    text: 'text-gray-500',
    shadow: 'hover:shadow-gray-200',
  },
};

const BestSellersItems = ({
  name,
  description,
  price,
  sold,
  position,
}: BestSellersItemProps) => {
  const currentStyle =
    position === 1
      ? badgeStyles[1]
      : position === 2
        ? badgeStyles[2]
        : badgeStyles.default;

  return (
    <div
      className={`min-w-55 transition-all duration-200 ease-linear hover:scale-[102%] hover:shadow-md ${currentStyle.shadow}`}
    >
      <div className="relative">
        <img
          src={logoImage}
          alt="Mais vendido"
          className="h-27.5 w-full rounded-2xl object-cover"
        />

        <span
          className={`absolute top-2.5 left-4 flex h-6 w-9 items-center justify-center rounded-sm text-[12px] text-white ${currentStyle.bg}`}
        >
          #{position}
        </span>
      </div>

      <div className="p-3 leading-6">
        <h4 className="font-bold uppercase">{name}</h4>

        <p className="text-[14px] font-normal text-gray-500">{description}</p>

        <p className="flex w-full items-center justify-between font-bold text-green-600">
          {formatCurrencyService.toReal(price)}
          <span className={`text-[12px] ${currentStyle.text}`}>
            {sold} vendidos
          </span>
        </p>
      </div>
    </div>
  );
};

const QUANTITY_BEST_SELLERS = 2;

export const BestSellers = () => {
  const { data, isLoading, isError } = useListProductsBestSellersQuery({
    quantity: QUANTITY_BEST_SELLERS,
  });

  if (!data || data.length === 0) return null;

  if (isLoading || isError) {
    return (
      <div className="w-full space-y-4 rounded-2xl bg-white p-5">
        <p className="flex items-center gap-2 font-bold">
          <span>
            <FaFire className="h-6 w-6 text-amber-500" />
          </span>
          Favoritos da casa
        </p>
        <BestSellersSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 rounded-2xl bg-white p-5">
      <p className="flex items-center gap-2 font-bold">
        <span>
          <FaFire className="h-6 w-6 text-amber-500" />
        </span>
        Favoritos da casa
      </p>
      <div className="grid w-full grid-cols-2 gap-2">
        {data.map((bestSeller, index) => (
          <BestSellersItems
            key={bestSeller.product.id}
            name={bestSeller.product.name}
            description={bestSeller.product.description}
            price={bestSeller.product.price}
            sold={bestSeller.totalSold}
            position={index + 1}
          />
        ))}
      </div>
    </div>
  );
};
