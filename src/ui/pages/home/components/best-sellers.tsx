import { FaFire } from 'react-icons/fa';
import logoImage from '@/ui/assets/logo.png';
import { BestSellersSkeleton } from '@/ui/components/skeletons/bes-sellers-skeleton';

interface BestSellersItemProps {
  name: string;
  description: string;
  price: number;
  sold: number;
}

const BestSellersItems = ({
  name,
  description,
  price,
  sold,
}: BestSellersItemProps) => {
  return (
    <div className="transition-all duration-200 ease-linear hover:scale-[102%] hover:shadow-md hover:shadow-amber-200">
      <div className="relative">
        <img
          src={logoImage}
          alt="Mais vendido"
          className="h-27.5 w-full rounded-2xl object-cover"
        />
        <span className="absolute top-2.5 left-4 flex h-6 w-9 items-center justify-center rounded-sm bg-amber-500 text-[12px] text-white">
          #1
        </span>
      </div>
      <div className="p-3 leading-6">
        <h4 className="font-bold uppercase">{name}</h4>
        <p className="text-[14px] font-normal text-gray-500">{description}</p>
        <p className="flex w-full items-center justify-between font-bold text-green-600">
          {price}
          <span className="text-[12px] text-amber-500">{sold} vendidos</span>
        </p>
      </div>
    </div>
  );
};

export const BestSellers = () => {
  return (
    <div className="w-full space-y-4 rounded-2xl bg-white p-5">
      <p className="flex items-center gap-2 font-bold">
        <span>
          <FaFire className="h-6 w-6 text-amber-500" />
        </span>
        Favoritos da casa
      </p>
      <div className="grid w-full grid-cols-2 gap-2">
        <BestSellersItems
          name="Água"
          description="ph 7"
          price={7.89}
          sold={1234}
        />

        <div>SEGUNDO</div>
      </div>
    </div>
  );
};
