'use client';
import { QueryFunctionContext, useInfiniteQuery, useQuery } from "@tanstack/react-query";

const useFetch = <T>(url: string, queryKey: string[], enabled: boolean) => {
    const fetchData = async () => {
        const res = await fetch(url)
        return res.json();
    };

    const { data, isLoading, isError, error } = useQuery<T>({
        queryKey: queryKey,
        queryFn: fetchData,
        enabled: enabled,
        staleTime: 300000 //5 minutes
    });

    return { data, isLoading, isError, error };
}

const useFetchInfinite = <T extends { nextPageToken: string }>(url: string, queryKey: string[], enabled = true) => {
    const fetchData = async ({ pageParam = '' }: QueryFunctionContext) => {
        const fullUrl = pageParam ? `${url}&pageToken=${pageParam}` : url;
        const res = await fetch(fullUrl);
        return res.json();
    };

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useInfiniteQuery<T>({
        queryKey: queryKey,
        queryFn: fetchData,
        initialPageParam: '',
        getNextPageParam: (lastPage: T) => lastPage.nextPageToken,
        enabled: enabled,
        staleTime: 300000 //5 minutes
    });

    return { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess };
}

export { useFetch, useFetchInfinite };