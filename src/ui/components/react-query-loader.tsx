import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { useTopLoader } from 'nextjs-toploader';
import { useEffect } from 'react';

export const ReactQueryLoader = () => {
  const loader = useTopLoader();
  const fetching = useIsFetching();
  const mutating = useIsMutating();
  const isLoading = fetching + mutating > 0;
  useEffect(() => {
    if (isLoading) {
      loader.start();
      return;
    }
    loader.done();
  }, [isLoading, loader]);

  return null;
};
