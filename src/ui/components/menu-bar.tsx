import {
  HomeIcon,
  InfoIcon,
  ShoppingCartIcon,
  UserIcon,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

type MenuBarItemProps = {
  label: string;
  Icon: LucideIcon;
  to: string;
};

const MenuBarItem = ({ label, Icon, to }: MenuBarItemProps) => {
  return (
    <Link
      to={to}
      className="flex h-full flex-col items-center justify-center gap-2 p-2 font-bold text-gray-100 uppercase hover:rounded-l-full hover:rounded-r-full hover:border-b-4 hover:text-white"
    >
      <Icon className="h-6 w-6" />
      <p className="text-[11px] tracking-wider">{label}</p>
    </Link>
  );
};

export const MenuBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <>
      <div
        className={`fixed top-0 left-1/2 z-50 flex h-20 -translate-x-1/2 items-center justify-center bg-blue-700 transition-all duration-300 ${isScrolled ? 'mt-2 w-[90%] rounded-l-full rounded-r-full' : 'w-full rounded-none'}`}
      >
        <nav className="flex h-full w-96 items-center justify-around">
          <MenuBarItem label="Home" Icon={HomeIcon} to="/" />
          <MenuBarItem label="Carrinho" Icon={ShoppingCartIcon} to="/cart" />
          <MenuBarItem label="Informações" Icon={InfoIcon} to="/info" />
          <MenuBarItem label="Conta" Icon={UserIcon} to="/contact" />
        </nav>
      </div>
    </>
  );
};
