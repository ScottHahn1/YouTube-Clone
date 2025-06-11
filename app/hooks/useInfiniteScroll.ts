'use client';
import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

const useInfiniteScroll = <T, >(
    fetchNextPage: (
        options?: FetchNextPageOptions | undefined
    ) => Promise<InfiniteQueryObserverResult<InfiniteData<T, unknown>, Error>>, 
    hasNextPage: boolean, 
    isFetchingNextPage: boolean
) => {
    const lastItemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                rootMargin: '100px',
            },
        );

        if (lastItemRef.current) {
            observer.observe(lastItemRef.current);
        };

        
        return () => {
            if (lastItemRef.current) {
                observer.unobserve(lastItemRef.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return lastItemRef;
};

export default useInfiniteScroll;