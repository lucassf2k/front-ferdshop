import { Link } from 'react-router';
import { IoIosArrowForward } from 'react-icons/io';

interface Props {
  title: string;
  children: React.ReactNode;
  createComp?: React.ReactNode;
}

export const TableWrapper = ({ children, title, createComp }: Props) => {
  const CreateComp = createComp ? createComp : null;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-60 w-full bg-amber-500" />
      <div className="-mt-52 w-[90%] space-y-4">
        <Link
          to="/"
          className="flex items-center gap-1 text-[12px] font-semibold text-white"
        >
          Home <IoIosArrowForward />{' '}
          <span className="lowercase underline">{title}</span>
        </Link>
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-4xl font-bold text-white">{title}</h3>
          {CreateComp}
        </div>
        <div className="rounded-md border bg-white py-2">{children}</div>
      </div>
    </div>
  );
};
