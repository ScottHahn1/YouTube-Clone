import { useFetchInfinite } from "@/app/hooks/useFetch";
import { Videos } from "../home/popular";
import Link from "next/link";
import Image from "next/image";
import { formatDate, formatDuration, formatNumbers } from "@/app/utils/formatter";

interface RelatedVideos {
    id: string;
    nextPageToken: string;
}

interface Props {
    videoCategoryId: string;
}

const RelatedVideos = ({ videoCategoryId }: Props) => {
    const videosQueryParams = new URLSearchParams({
        'chart': 'mostPopular',
        'maxResults': '20',
        'part': 'contentDetails, snippet, statistics',
        'videoCategoryId': videoCategoryId
    }).toString();

    const { data: videos, fetchNextPage, isFetchingNextPage } = useFetchInfinite<Videos>(`/api/videos?${videosQueryParams}`, ['relatedVideos', videosQueryParams]);

    return (
        <div>
            {
                videos?.pages.map(page => page.items.map((video) => (
                    <div className='flex items-center gap-1 h-28' key={video.id}>
                        <div className='relative w-40% h-20 xl:h-24'>
                            <Link href={`/watch/${video.id}`}>
                                <Image 
                                    className='rounded-lg' 
                                    layout='fill'
                                    objectFit='cover'
                                    src={video.snippet.thumbnails.high.url} 
                                    alt={`${video.snippet.title} video thumbnail`}
                                />
                                <p className='absolute bottom-2 right-2 bg-black/60 py-0.5 px-1 rounded-md text-white text-sm'>
                                    {formatDuration(video.contentDetails.duration)}
                                </p>
                            </Link>
                        </div>
                        
                        <div className='py-2 w-80% text-sm h-24 text-gray-700 dark:text-gray-300 lg:py-1 lg:w-55%'>
                            <h1 className='text-ellipsis text-black dark:text-white font-medium line-clamp-2'>{video.snippet.title}</h1>
                            <p>{video.snippet.channelTitle}</p>
                            <div className='flex gap-1 items-center'>
                                <span>{formatNumbers(video.statistics.viewCount)} views</span>
                                <span className='text-2xl'>&#x00B7;</span>
                                <span>{formatDate(video.snippet.publishedAt)}</span>
                            </div>
                        </div>
                    </div>
                )))
            }
        </div>
    )
}

export default RelatedVideos;