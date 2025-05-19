'use client';
import { QueryFunctionContext, useInfiniteQuery, useQuery } from "@tanstack/react-query";

const useFetch = <T>(url: string, queryKey: string[], enabled: boolean) => {
    const fetchData = async () => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.statusText}`);
        };

        return res.json();
    };

    const { data, isLoading, isError, error } = useQuery<T>({
        queryKey,
        queryFn: fetchData,
        enabled: enabled,
        staleTime: 300000 // 5 minutes
    });

    return { data, isLoading, isError, error };
};

const useFetchInfinite = <T extends { nextPageToken: string }>(
    url: string, queryKey: string[], enabled = true
) => {
    const fetchData = async ({ pageParam = '' }: QueryFunctionContext) => {
        const fullUrl = pageParam ? `${url}&pageToken=${pageParam}` : url;
        const res = await fetch(fullUrl);

        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.statusText}`);
        };

        return res.json();
    };

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useInfiniteQuery<T>({
        queryKey,
        queryFn: fetchData,
        initialPageParam: '',
        getNextPageParam: (lastPage: T) => lastPage.nextPageToken,
        enabled: enabled,
        staleTime: 300000 // 5 minutes
    });

    return { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess };
};

const useFetchInfiniteWithInitialData = <T extends { nextPageToken: string }>(
  url: string, queryKey: string[], initialData: T
) => {

    const fetchData = async ({ pageParam = '' }: QueryFunctionContext) => {
        const fullUrl = pageParam ? `${url}&pageToken=${pageParam}` : url;
        const res = await fetch(fullUrl);

        if (!res.ok) {
            throw new Error(`Error fetching data: ${res.statusText}`);
        };

        return res.json();
    };

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useInfiniteQuery<T>({
        queryKey,
        queryFn: fetchData,
        initialPageParam: '',
        getNextPageParam: lastPage => lastPage.nextPageToken,
        initialData: {
          pages: [initialData],
          pageParams: [''],
        },
        staleTime: 300000,
    });

    return { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess };
};

export { useFetch, useFetchInfinite, useFetchInfiniteWithInitialData };