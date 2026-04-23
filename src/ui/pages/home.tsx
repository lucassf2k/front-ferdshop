import { MenuBar } from '@/ui/components/menu-bar';
import {
  FaAppleAlt,
  FaGlassCheers,
  FaPumpSoap,
  FaThLarge,
  FaWater,
  FaWineBottle,
} from 'react-icons/fa';
import { BannerInfoOrganization } from './home/components/banner-info-organization';
import { BestSellers } from './home/components/best-sellers';
import { SearchBar } from './home/components/search-bar';
import { ShoppingCart } from './home/components/shopping-cart';
import { CategoriesSelector } from './home/components/categories-selector';

const categories = [
  { id: 'all', label: 'Todas', icon: FaThLarge },
  { id: 'refill', label: 'Água c/ sais', icon: FaWater },
  { id: 'mineral', label: 'Água mineral', icon: FaWater },
  { id: 'bottle', label: 'Vasilhame 20L', icon: FaWineBottle },
  { id: 'food', label: 'Alimentos', icon: FaAppleAlt },
  { id: 'clean', label: 'Limpeza', icon: FaPumpSoap },
  { id: 'drinks', label: 'Bebidas', icon: FaGlassCheers },
];

export const HomePage = () => {
  return (
    <>
      <MenuBar />

      {/* IMAGE DE FUNDO */}
      <div className="h-80 w-full bg-red-500">
        <div className="pointer-events-none h-full w-full bg-linear-to-b from-black/0 via-black/40 to-black/90" />
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="-mt-6 flex h-screen w-full flex-col items-center rounded-t-[1.8rem] bg-neutral-200 p-8">
        <div className="w-[90%]">
          {/* BANNER INFO ORGANIZATION */}
          <BannerInfoOrganization title="ferdshop" address="Mossoró, RN" />

          <div className="-mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(250px,30%)]">
            <div className="flex flex-col gap-6">
              {/* SEARCH BAR */}
              <SearchBar />

              {/* LISTAGEM DE CATEGORIAS */}
              <CategoriesSelector />
              {/* MAIS VENDIDOS */}
              <BestSellers />
            </div>

            {/* CARRINHO */}
            <ShoppingCart />
          </div>
        </div>
      </div>
    </>
  );
};
