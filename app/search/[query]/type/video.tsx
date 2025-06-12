import { formatDate, formatNumbers } from '@/app/utils/formatter';
import Image from 'next/image';

export interface Video {
    id: {
        kind: string;
        videoId: string;
    },
    snippet: {
        categoryId: string;
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
        commentCount: number;
        likeCount: number;
        viewCount: number;
    };
};

interface Props {
    channelImage: string | undefined;
    video: Video;
    views: number | undefined;
};

const SearchVideo = ({ channelImage, video, views }: Props ) => {
    if (!channelImage || !video || !views) {
        return null;
    };
  
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='relative h-44 md:w-1/2 lg:h-56 xl:w-[45%] xl:h-64'>
                <Image
                    className='object-cover md:rounded-2xl'
                    fill
                    src={video.snippet.thumbnails.high.url}
                    alt={`${video.snippet.title} video thumbnail`}
                />
            </div>

            <div className='ml-2 mt-2 flex gap-1 md:w-1/2 md:mt-0'>
                <div className='relative w-9 h-9 shrink-0 md:hidden'>
                    <Image 
                        className='rounded-full object-cover' 
                        fill
                        src={
                            channelImage
                        } 
                        alt={`${video.snippet.channelTitle}'s channel image`} 
                    /> 
                </div>

                <div className='w-full flex flex-col md:gap-2 lg:gap-3'>
                    <p className='text-ellipsis font-semibold xl:text-lg'>{video.snippet.title}</p>
                    <p className='md:hidden'>{video.snippet.channelTitle}</p>

                    <div className='flex items-center gap-1'>
                        <span>
                            {formatNumbers(views)} views
                        </span>
                        <span className='text-3xl'>&#x00B7;</span>
                        <span>{formatDate(video.snippet.publishedAt)}</span>
                    </div>

                    <div className='hidden gap-2 items-center md:flex'>
                        <div className='relative w-7 h-7 shrink-0'>
                            <Image 
                                className='rounded-full object-cover' 
                                fill
                                src={
                                    channelImage
                                } 
                                alt={`${video.snippet.channelTitle}'s channel image`} 
                            /> 
                        </div>

                        <p>{video.snippet.channelTitle}</p>
                    </div>

                    <p className='hidden text-xs md:block lg:text-sm'>
                        {video.snippet.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SearchVideo;