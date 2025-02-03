import { useFetchInfinite } from "@/app/hooks/useFetch";
import { Videos } from "../home/popular";
import Link from "next/link";
import Image from "next/image";
import { formatDate, formatNumbers } from "@/app/utils/formatter";

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
        'part': 'snippet, statistics',
        'videoCategoryId': videoCategoryId
    }).toString();

    const { data: videos, fetchNextPage, isFetchingNextPage } = useFetchInfinite<Videos>(`/api/videos?${videosQueryParams}`, ['relatedVideos', videosQueryParams]);

    return (
        <div>
            {
                videos?.pages.map(page => page.items.map((video) => (
                    <div className='flex' key={video.id}>
                        <div className='relative w-1/2 h-36'>
                            <Link href={`/watch/${video.id}`}>
                                <Image 
                                    className='p-1 rounded-3xl' 
                                    layout='fill'
                                    objectFit='cover'
                                    src={video.snippet.thumbnails.high.url} 
                                    alt={`${video.snippet.title} video thumbnail`}
                                />
                            </Link>
                        </div>
                        <div className='w-1/2'>
                            <p className='text-ellipsis'>{video.snippet.title}</p>
                            <p>{video.snippet.channelTitle}</p>
                            <div className='flex gap-1 items-center'>
                                <span>{formatNumbers(video.statistics.viewCount)} views</span>
                                <span className='text-4xl leading-none align-baseline mb-1'>&#x00B7;</span>
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