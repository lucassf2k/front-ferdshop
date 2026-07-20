import { useEffect, useRef, useState } from 'react';
import { ScrollButton } from './categories-selector/components/scroll-button';
import { CategoriesSelectorContent } from './categories-selector/components/categories-selector-content';
import { useQueryListCategories } from '@/hooks/queries/use-fetch-get-categories';

interface Props {
  activeCategoryId?: string;
  onSelect: (id?: string) => void;
}

export const CategoriesSelector = ({ activeCategoryId, onSelect }: Props) => {
  const { data, isError, isLoading } = useQueryListCategories();
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const el = scrollRef.current;
      if (!el) return;

      const { scrollLeft, scrollWidth, clientWidth } = el;

      setScrollState({
        canScrollLeft: scrollLeft > 0,
        canScrollRight: scrollLeft < scrollWidth - clientWidth - 1,
      });
    };

    update();

    el.addEventListener('scroll', update);
    window.addEventListener('resize', update);

    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

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
      {scrollState.canScrollLeft && (
        <ScrollButton direction="left" onClick={handleScroll} />
      )}

      <CategoriesSelectorContent
        data={data}
        isLoading={isLoading}
        error={isError}
        activeCategoryId={activeCategoryId}
        onSelect={onSelect}
        scrollRef={scrollRef}
      />

      {scrollState.canScrollRight && (
        <ScrollButton direction="right" onClick={handleScroll} />
      )}
    </div>
  );
};
