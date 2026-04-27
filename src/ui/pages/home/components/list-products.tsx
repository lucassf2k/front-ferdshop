import { CiStar } from 'react-icons/ci';
import { Button } from '@/ui/components/ui/button';
import { BsCartPlus } from 'react-icons/bs';

import logoImage from '@/ui/assets/logo.png';

const ListProducItem = () => {
  return (
    <div className="rounded-2xl bg-white p-4">
      <div className="flex justify-between">
        <img src={logoImage} alt="Água" className="h-24 w-24 object-cover" />
        <div className="space-y-1 text-end">
          <p className="text-sm font-bold text-green-500">R$ 8.98</p>
          <span className="flex items-center gap-1">
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </span>
        </div>
      </div>

      <div>
        <p className="max-w-32 text-sm leading-7 font-bold">ÁGUA</p>
        <p className="text-sm text-gray-500">descrição</p>
      </div>

      <Button className="mt-10 h-10 w-12 cursor-pointer rounded-xl border border-green-500 bg-transparent text-green-500 transition-all duration-200 hover:bg-green-500 hover:text-white">
        <BsCartPlus />
      </Button>
    </div>
  );
};

export const ListProducts = () => {
  return (
    <div className="h-full">
      <h2 className="text-lg font-bold uppercase">Todos os produtos</h2>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
        <ListProducItem />
      </div>
    </div>
  );
};
