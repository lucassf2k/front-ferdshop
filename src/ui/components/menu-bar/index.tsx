import {
  Cuboid,
  HomeIcon,
  LayoutDashboard,
  ShoppingCartIcon,
  SquareStack,
  UserIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  MenuBarButton,
  MenuBarItem,
} from '@/ui/components/menu-bar/components/menu-bar-item';
import { useCartTotalItems } from '@/stores/cart';
import { useAuth } from '@/hooks/auth/use-auth';
import { CardInfo } from '@/ui/pages/home/components/card-info';
import { OrganizationCardInfo } from './components/organization-card-info';
import { CardInfoTitle } from '@/ui/pages/home/components/card-info/components/card-info-title';
import { CustomLinkCardWithAnimation } from '../custom-link-with-animation';

export const MenuBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItemsInCart = useCartTotalItems();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [setIsScrolled]);

  return (
    <div
      className={`fixed top-0 left-1/2 z-50 flex h-20 min-w-95 -translate-x-1/2 items-center justify-center bg-blue-700 transition-all duration-500 ${
        isScrolled
          ? 'mt-2 w-[80vw] rounded-full bg-blue-700/80 backdrop-blur-md'
          : 'w-screen'
      }`}
    >
      <nav className="flex h-full w-120 items-center justify-around">
        <MenuBarItem label="Home" Icon={HomeIcon} to="/" />
        <MenuBarItem
          label="Carrinho"
          Icon={ShoppingCartIcon}
          to="/carrinho"
          info={totalItemsInCart}
        />
        <OrganizationCardInfo />
        <CardInfo trigger={<MenuBarButton label="Conta" Icon={UserIcon} />}>
          <div className="flex w-full flex-col gap-2 p-6">
            <CardInfoTitle text="Escolha sua conta" Icon={UserIcon} />
            <div className="p-4">
              <CustomLinkCardWithAnimation
                to="/login"
                label="Consumidor"
                subLabel="Gerencia seu perfil de cliente"
                Icon={UserIcon}
                variant="green"
              />
            </div>
            <CardInfoTitle text="Outros" Icon={Cuboid} />
            <CustomLinkCardWithAnimation
              to="/"
              label="Meus pedidos"
              subLabel="Veja seu histórico de pedidos"
              Icon={SquareStack}
              variant="black"
            />
          </div>
        </CardInfo>

        {user && (
          <MenuBarItem
            label="Dashboard"
            Icon={LayoutDashboard}
            to="/dashboard"
          />
        )}
      </nav>
    </div>
  );
};
