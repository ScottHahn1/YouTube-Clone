'use client';
import { useFetchInfinite } from "@/app/hooks/useFetch";
import useChannels from "@/app/hooks/useChannels";
import { use } from 'react';
import SearchVideo from './type/video';
import SearchChannel from './type/channel';

interface Search {
    items: {
        id: {
            kind: string;
            videoId: string;
        }
        snippet: {
            channelId: string;
            channelTitle: string;
            description: string;
            publishedAt: string;
            thumbnails: {
                high: {
                    url: string;
                }
            }
            title: string;
        },
        statistics: {
            viewCount: number;
        }
    }[],
    nextPageToken: string;
}

interface Props {
    params: Promise<{ query: string }>
}

const SearchPage = ({ params }: Props) => {
    const { query } = use(params);

    const searchQueryParams = new URLSearchParams({
        'maxResults': '30',
        'part': 'snippet',
        'q': query as string
    }).toString();
      
    const { data: searchResults, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchInfinite<Search>(`/api/search?${searchQueryParams}`, ['search']);

    const channels = useChannels(searchResults?.pages.length ?
        searchResults?.pages[searchResults.pages.length - 1].
        items.map(page => page.snippet.channelId) 
        : []
    );

    return (
        <div className='ml-52'>
            {
                channels.length > 0 &&
                searchResults?.pages.map(page => (
                    page.items.map(result => (
                        result.id.kind === 'youtube#video' ?
                        <SearchVideo channels={channels} searchResults={searchResults} video={result} />
                        :
                        result.id.kind === 'youtube#channel' &&
                        <SearchChannel channel={result} />
                    ))
                ))
            }
        </div>
    )
}

export default SearchPage;