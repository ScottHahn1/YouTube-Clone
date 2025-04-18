import { formatDate, formatDuration, formatNumbers } from '@/app/utils/formatter';
import Image from 'next/image'
import Link from 'next/link';

interface Props {
  channelId: string;
  channelImage: string;
  channelTitle: string;
  duration: string;
  index: number;
  playlistId?: string;
  publishedAt: string;
  title: string;
  thumbnail: string;
  thumbnailSize: string;
  videoId: string;
  views: number;
}

const Card = ({ channelId, channelImage, channelTitle, duration, index, playlistId, publishedAt, title, thumbnail, thumbnailSize, videoId, views }: Props) => {
  const videoRoute = playlistId ? `/watch/${videoId}/${playlistId}` : `/watch/${videoId}`;

  return (
    <div className='md:col-span-2 lg:col-span-1'>
      <div className={`relative ${thumbnailSize}`}>
        <Link href={videoRoute}>
          <Image 
            className='object-cover md:rounded-xl'
            fill
            src={thumbnail} 
            priority={index <= 5}
            sizes='(max-width: 768px) 50vw, 25vw'
            alt={`${title} video thumbnail`} 
          />
          {
            duration &&
            <p className='absolute bottom-2 right-2 bg-black/60 py-0.5 px-1 rounded-md text-white text-sm'>
              {formatDuration(duration)}
            </p>
          }
        </Link>
      </div>

      <div className='flex gap-2 pt-2'>
        { 
          channelImage && 
          <Link href={`/channel/${channelTitle}-${channelId}`}>
            <div className='relative object-cover ml-1 w-10 h-10 md:w-8 md:h-8'>
              <Image 
                className='rounded-full' 
                fill
                src={channelImage} 
                alt={`${channelTitle}'s channel image`} 
              /> 
            </div>
          </Link>
        }

        <div className='min-w-0 text-gray-700 dark:text-gray-300'>
          <p className='truncate w-full font-medium text-gray-900 dark:text-white xl:text-lg'>
            {title}
          </p>

          <Link href={`/channel/${channelTitle}-${channelId}`}>
            <p className='truncate w-48'>{channelTitle}</p>
          </Link>

          <div className='flex gap-1 items-center'>
            <span>
              {views && formatNumbers(views)} views
            </span>
            
            <span className='text-3xl'>
              &#x00B7;
            </span>

            {
              publishedAt &&
              <span>
                {formatDate(publishedAt)}
              </span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card;