import { formatDate, formatNumbers } from '@/app/utils/formatter';
import Image from 'next/image'
import Link from 'next/link';

interface Props {
  channelId: string;
  channelImage: string;
  channelTitle: string;
  containerWidth: string;
  playlistId?: string;
  publishedAt: string;
  title: string;
  thumbnail: string;
  videoId: string;
  views?: number;
}

const Card = ({ channelId, channelImage, channelTitle, containerWidth, playlistId, publishedAt, title, thumbnail, videoId, views }: Props) => {
  const videoRoute = playlistId ? `/watch/${videoId}/${playlistId}` : `/watch/${videoId}`;

  return (
    <div className={`${containerWidth} flex flex-col`}>
      <div className='relative w-full h-56'>
        <Link href={videoRoute}>
          <Image 
            className='absolute p-1 rounded-3xl object-cover' 
            fill 
            src={thumbnail} 
            alt={`${title} video thumbnail`} />
        </Link>
      </div>

      <div className='flex gap-3 pt-4'>
        { 
          channelImage && 
          <Link href={`/channel/${channelTitle}-${channelId}`}>
            <Image 
              className='rounded-full' 
              src={channelImage} 
              width={50} height={50} 
              alt={`${channelTitle}'s channel image`} 
            /> 
          </Link>
        }

        <div className='min-w-0'>
          <p className='truncate w-full'>{title}</p>

          <Link href={`/channel/${channelTitle}-${channelId}`}>
            <p className='truncate w-48'>{channelTitle}</p>
          </Link>

          <div className='flex gap-1 items-center'>
            <span>
              {views && formatNumbers(views)} views
            </span>
            <span className='text-4xl leading-none align-baseline mb-1'>
              &#x00B7;
            </span>
            <span>
              {formatDate(publishedAt)}
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Card;