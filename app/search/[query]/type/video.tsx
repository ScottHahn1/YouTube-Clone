import { useFetch } from '@/app/hooks/useFetch';
import { formatDate, formatNumbers } from '@/app/utils/formatter';
import { InfiniteData } from '@tanstack/react-query';
import Image from 'next/image';

interface Channels {
    id: string;
    snippet: {
        thumbnails: {
            high: {
              url: string;
            }
        }
    }
}


interface SearchResults {
    items: {
        id: { videoId: string };
    }[]
}

interface Video {
    id: {
        kind: string;
        videoId: string;
    },
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
}

interface VideosStats {
    items: {
        statistics: {
            viewCount: number;
        }
    }[]
}

interface Props {
    channels: Channels[];
    searchResults: InfiniteData<SearchResults, unknown> | undefined; 
    video: Video;
}

const SearchVideo = ({ channels, searchResults, video }: Props ) => {
    const videosQueryParams = new URLSearchParams({
        'id': searchResults?.pages.length ? 
            searchResults?.pages[searchResults.pages.length - 1].
            items.map(page => page.id.videoId).toString() 
            : ''
        ,
        'maxResults': '30',
        'part': 'snippet, statistics',
    }).toString();

    const { data: videosStats } = useFetch<VideosStats>(`/api/videos?${videosQueryParams}`, ['searchVideosStats'], !!searchResults);

    return (
        <div>
            {
                videosStats && videosStats.items.length > 0 &&
                <div key={video.id.videoId} className='bg-orange-800 w-9/12 flex'>
                    <div className='relative w-1/2 h-72 bg-yellow-300'>
                        <Image 
                            className='p-1 rounded-2xl object-cover' 
                            layout='fill'
                            src={video.snippet.thumbnails.high.url} 
                            alt={`${video.snippet.title} video thumbnail`} 
                        />
                    </div>

                    <div className='pb-4 w-1/2'>
                        <p className='text-ellipsis'>{video.snippet.title}</p>
                        <div className='flex gap-1 items-center'>
                            {/* <span>{formatNumbers(videosStats?.items[index].statistics.viewCount)} views</span> */}
                            <p>{video.id.kind}</p>
                            <span className='text-4xl leading-none align-baseline mb-1'>&#x00B7;</span>
                            <span>{formatDate(video.snippet.publishedAt)}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Image className='rounded-full w-8 h-8' src={channels.filter(channel => channel.id === video.snippet.channelId)[0].snippet.thumbnails.high.url} width={30} height={30} alt={`${video.snippet.channelTitle}'s channel image`} /> 
                            <p>{video.snippet.channelTitle}</p>
                        </div>

                        <p>{video.snippet.description}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default SearchVideo;