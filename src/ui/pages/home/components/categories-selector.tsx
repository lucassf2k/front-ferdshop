import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';
import { ScrollButton } from './categories-selector/components/scroll-button';
import { CategoriesSelectorContent } from './categories-selector/components/categories-selector-content';
import { useFetchGetCategories } from '@/hooks/fetchs/use-fetch-get-categories';
import { useCategoriesSelectorUrl } from '@/hooks/use-categories-selector-url';

const CATEGORY_PARAM = 'category';

type CategoryModel = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

interface Props {
  onChange?: (id: string) => void;
}

export const CategoriesSelector = ({ onChange }: Props) => {
  const { data, error, isLoading } = useFetchGetCategories();
  const { activeCategoryId, setCategory } = useCategoriesSelectorUrl(data);
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false,
  });

  useEffect(() => {
    if (data) {
      console.log('dados mudaram:', data);
    }
  }, [data]);

  useEffect(() => {
    if (!activeCategoryId) return;
    onChange?.(activeCategoryId);
  }, [activeCategoryId, onChange]);

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
        error={error}
        activeCategoryId={activeCategoryId}
        onSelect={setCategory}
        scrollRef={scrollRef}
      />

      {scrollState.canScrollRight && (
        <ScrollButton direction="right" onClick={handleScroll} />
      )}
    </div>
  );
};
