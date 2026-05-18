import { HomeIcon, InfoIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MenuBarItem } from '@/ui/components/menu-bar/components/menu-bar-item';
import { useCartTotalItems } from '@/stores/cart';

export const MenuBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItemsInCart = useCartTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-1/2 z-50 flex h-20 -translate-x-1/2 items-center justify-center bg-blue-700 transition-all duration-500 ${
        isScrolled
          ? 'mt-2 w-[80vw] rounded-full bg-blue-700/80 backdrop-blur-md'
          : 'w-screen'
      }`}
    >
      <nav className="flex h-full w-96 items-center justify-around">
        <MenuBarItem label="Home" Icon={HomeIcon} to="/" />
        <MenuBarItem
          label="Carrinho"
          Icon={ShoppingCartIcon}
          to="/cart"
          info={totalItemsInCart}
        />
        <MenuBarItem label="Informações" Icon={InfoIcon} to="/info" />
        <MenuBarItem label="Conta" Icon={UserIcon} to="/contact" />
      </nav>
    </div>
  );
};
