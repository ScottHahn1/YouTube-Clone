'use client';
import { useFetchInfinite } from "@/app/hooks/useFetch";
import Card from "./card";
import useChannels from "../../hooks/useChannels";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";

export interface Videos {
    items: {
        id: string;
        contentDetails: {
            duration: string;
        }
        snippet: {
            channelId: string;
            channelTitle: string;
            publishedAt: string;
            thumbnails: {
                high: {
                    url: string;
                }
            }
            title: string;
        }
        statistics: {
            viewCount: number;
        }
    }[];
    nextPageToken: string;
}

export interface ChannelsData {
    items: {
        id: string;
        snippet: {
            thumbnails: {
                default: {
                    url: string;
                }
            }
            title: string;
        }
    }[]
    nextPageToken: string;
}

const Popular = () => {
    const videosQueryParams = new URLSearchParams({
        'part': 'snippet, statistics',
        'chart': 'mostPopular',
        'maxResults': '30'
    }).toString();

    const { data: videos, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchInfinite<Videos>(`http://localhost:3000/api/videos?${videosQueryParams}`, ['popular', videosQueryParams]);

    const channels = useChannels(videos?.pages.length ? videos?.pages[videos.pages.length - 1].items.map(page => page.snippet.channelId) : []);

    const lastItemRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

    return (
        <div className='w-80% flex flex-wrap float-right'>
            {
                videos?.pages.map(page => page.items.map((video, index) => (
                    <>
                        <Card 
                            key={video.id}
                            channelImage={channels.length > 0 && channels?.find(channel => channel.id == video.snippet.channelId)?.snippet.thumbnails.default.url as string || ''}
                            channelTitle= {channels.length > 0 && channels?.find(channel => channel.id == video.snippet.channelId)?.snippet.title as string || ''} 
                            publishedAt={video.snippet.publishedAt}
                            title={video.snippet.title} 
                            thumbnail={video.snippet.thumbnails.high.url} 
                            videoId={video.id}
                            views={video.statistics.viewCount}
                        />
                        { index === page.items.length - 1 && <div ref={lastItemRef} /> }
                    </>
                )))
            }
        </div>
    )
}

export default Popular;