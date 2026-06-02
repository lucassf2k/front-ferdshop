import { ListCategoriesSkeleton } from '@/ui/components/skeletons/list-categories';
import { Button } from '@/ui/components/ui/button';
import { cva } from 'class-variance-authority';

type CategoryModel = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

interface Props {
  data: CategoryModel[] | undefined;
  error: boolean;
  isLoading: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  activeCategoryId: string;
  onSelect: (id: string) => void;
}

const buttonVariants = cva(
  'rounded-full transition-all duration-200 cursor-pointer select-none border',
  {
    variants: {
      active: {
        true: 'bg-black text-white shadow-md scale-[1.03]',
        false:
          'bg-white text-gray-700 border-gray-200 hover:bg-white hover:border-gray-400',
      },
    },
  },
);

export const CategoriesSelectorContent = ({
  isLoading,
  data,
  error,
  scrollRef,
  activeCategoryId,
  onSelect,
}: Props) => {
  if (error) {
    return <ListCategoriesSkeleton />;
  }

  if (isLoading) {
    return <ListCategoriesSkeleton />;
  }

  if (data?.length === 0) {
    return <p>Nenhuma categoria encontrada</p>;
  }

  return (
    <div
      className="no-scrollbar flex max-w-200 snap-x snap-mandatory items-center gap-3 overflow-x-auto py-3"
      ref={scrollRef}
    >
      {data?.map((category) => {
        const isActive = category.id === activeCategoryId;

        return (
          <Button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={buttonVariants({ active: isActive })}
          >
            {category.name}
          </Button>
        );
      })}
    </div>
  );
};
