import { Button } from '@/ui/components/ui/button';
import { cva } from 'class-variance-authority';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router';
import {
  IoIosArrowBack,
  IoMdArrowDropleft,
  IoMdArrowDropright,
} from 'react-icons/io';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

const categories = [
  {
    id: '1',
    name: 'Todas',
  },
  {
    id: '2',
    name: 'Tecnologia',
  },
  {
    id: '3',
    name: 'Educação',
  },
  {
    id: '4',
    name: 'Saúde',
  },
  {
    id: '5',
    name: 'Entretenimento',
  },
  {
    id: '6',
    name: 'Esportes',
  },
  {
    id: '7',
    name: 'Negócios',
  },
  {
    id: '8',
    name: 'Ciência',
  },
];

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

const CATEGORY_PARAM = 'category';

interface Props {
  onChange?: (id: string) => void;
}

export const CategoriesSelector = ({ onChange }: Props) => {
  const active = false;

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryIds = useMemo(
    () => new Set(categories.map((c) => c.id)),
    [categories],
  );

  const categoryFromUrl = searchParams.get(CATEGORY_PARAM);

  const activeCategoryId = useMemo(() => {
    if (categoryFromUrl && categoryIds.has(categoryFromUrl)) {
      return categoryFromUrl;
    }
    return categories[0].id ?? '';
  }, [categories, categoryIds, categoryFromUrl]);

  useEffect(() => {
    const isValid = categoryFromUrl && categoryIds.has(categoryFromUrl);
    if (isValid) return;

    const next = new URLSearchParams(searchParams);
    next.set(CATEGORY_PARAM, categories[0].id);
    setSearchParams(next, { replace: true });
  }, [categories, categoryFromUrl, categoryIds, searchParams, setSearchParams]);

  useEffect(() => {
    if (!activeCategoryId) return;
    onChange?.(activeCategoryId);
  }, [activeCategoryId, onChange]);

  const handleChangeCategory = useCallback(
    (id: string) => {
      if (!id || id === activeCategoryId) return;
      if (!categoryIds.has(id)) return;
      const next = new URLSearchParams(searchParams);
      next.set(CATEGORY_PARAM, id);
      setSearchParams(next);
    },
    [activeCategoryId, categoryIds, searchParams, setSearchParams],
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -100 : 100;
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex w-full items-center gap-4">
      <Button
        onClick={() => handleScroll('left')}
        className="h-8 w-8 cursor-pointer rounded-full bg-white shadow-md hover:bg-white"
      >
        <IoMdArrowDropleft size={48} className="h-8! w-8! text-amber-500" />
      </Button>
      <div
        className="no-scrollbar flex max-w-200 snap-x snap-mandatory items-center gap-3 overflow-x-auto py-3"
        ref={scrollRef}
      >
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;

          return (
            <Button
              key={category.id}
              onClick={() => handleChangeCategory(category.id)}
              className={buttonVariants({ active: isActive })}
            >
              {category.name}
            </Button>
          );
        })}
        {/* Botão direita */}
      </div>
      <Button
        onClick={() => handleScroll('right')}
        className="h-8 w-8 cursor-pointer rounded-full bg-white shadow-md hover:bg-white"
      >
        <IoMdArrowDropright size={48} className="h-8! w-8! text-amber-500" />
      </Button>
    </div>
  );
};
