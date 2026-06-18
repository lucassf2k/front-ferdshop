import type { PropsWithChildren } from 'react';
import { RegisterProductDialog } from './register-product';
import { Link } from 'react-router';
import { IoIosArrowForward } from 'react-icons/io';

export const TableWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-60 w-full bg-amber-500" />
      <div className="-mt-52 w-[90%] space-y-4">
        <Link
          to="/"
          className="flex items-center gap-1 text-[12px] font-semibold text-white"
        >
          Home <IoIosArrowForward /> <span className="underline">Produtos</span>
        </Link>
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-4xl font-bold text-white">Produtos</h3>
          <RegisterProductDialog />
        </div>
        <div className="rounded-md border bg-white py-2">{children}</div>
      </div>
    </div>
  );
};
