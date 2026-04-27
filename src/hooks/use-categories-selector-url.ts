import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

const CATEGORY_PARAM = 'category';

export type CategoryModel = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export const useCategoriesSelectorUrl = (categories?: CategoryModel[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryIds = useMemo(
    () => new Set(categories?.map((c) => c.id)),
    [categories],
  );

  const categoryFromUrl = searchParams.get(CATEGORY_PARAM);

  const activeCategoryId = useMemo(() => {
    if (!categories?.length) return '';

    if (categoryFromUrl && categoryIds.has(categoryFromUrl)) {
      return categoryFromUrl;
    }
    return categories[0].id;
  }, [categories, categoryIds, categoryFromUrl]);

  useEffect(() => {
    if (!categories?.length) return;

    const isValid = categoryFromUrl && categoryIds.has(categoryFromUrl);
    if (isValid) return;

    const next = new URLSearchParams(searchParams);
    next.set(CATEGORY_PARAM, categories[0].id);
    setSearchParams(next, { replace: true });
  }, [categories, categoryFromUrl, categoryIds, searchParams, setSearchParams]);

  const setCategory = useCallback(
    (id: string) => {
      if (!id || id === activeCategoryId) return;
      if (!categoryIds.has(id)) return;
      const next = new URLSearchParams(searchParams);
      next.set(CATEGORY_PARAM, id);
      setSearchParams(next);
    },
    [activeCategoryId, categoryIds, searchParams, setSearchParams],
  );

  return {
    activeCategoryId,
    setCategory,
  };
};
