import type {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Loader } from "./Loader";
import clsx from "clsx";

type InfinityListProps<TData, TError = unknown> = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  children: React.ReactNode;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<TData, TError>>;
  className?: string;
};

export const InfinityList = <TData, TError = unknown>({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  children,
  className,
}: InfinityListProps<TData, TError>) => {
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
        threshold: 0,
        rootMargin: "300px",
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.unobserve(sentinel);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full">
      <div
        className={clsx(
          "flex w-full flex-wrap gap-6 justify-around",
          className,
        )}
      >
        {children}
      </div>
      <div ref={sentinelRef} className="h-px w-full" />
      {isFetchingNextPage && <Loader />}
    </div>
  );
};
