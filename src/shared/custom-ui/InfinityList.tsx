import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Loader } from "./Loader";
import clsx from "clsx";

type InfinityListProps<TData> = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  children: React.ReactNode;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<TData, Error>>;
  className?: string;
};

export const InfinityList = <TData,>({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  children,
  className,
}: InfinityListProps<TData>) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.unobserve(sentinel);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      <div
        className={clsx(
          "flex w-full flex-wrap gap-6 justify-around",
          className,
        )}
      >
        {children}
      </div>
      <div ref={sentinelRef} />
      {isFetchingNextPage && <Loader />}
    </div>
  );
};
