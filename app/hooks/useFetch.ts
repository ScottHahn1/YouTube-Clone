import { QueryFunctionContext, useInfiniteQuery, useQuery } from "@tanstack/react-query";

const useFetch = <T>(url: string, queryKey: string[], enabled: boolean) => {
    const fetchData = async () => {
        const res = await fetch(url)
        return res.json();
    };

    const { data, isLoading, error } = useQuery<T>({
        queryKey: queryKey,
        queryFn: fetchData,
        enabled: enabled
    });

    return { data, isLoading, error };
}

const useFetchInfinite = <T extends { nextPageToken: string }>(url: string, queryKey: string[]) => {
    const fetchData = async ({ pageParam = '' }: QueryFunctionContext) => {
        const fullUrl = pageParam ? `${url}&pageToken=${pageParam}` : url;
        const res = await fetch(fullUrl);
        return res.json();
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } = useInfiniteQuery<T>({
        queryKey: queryKey,
        queryFn: fetchData,
        initialPageParam: '',
        getNextPageParam: (lastPage: T) => lastPage.nextPageToken,
    });

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess };
}

export { useFetch, useFetchInfinite };