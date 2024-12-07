'use client';
import { formatDate, formatNumbers } from '@/app/utils/formatter';
import Image from 'next/image'
import Link from 'next/link';

interface Props {
  channelImage?: string;
  channelTitle?: string;
  publishedAt: string;
  title: string;
  thumbnail: string;
  videoId: string;
  views: number;
}

const Card = ({ channelImage, channelTitle, publishedAt, title, thumbnail, videoId, views }: Props) => {

  return (
    <div className='w-1/3 flex flex-col border border-solid border-white'>
        <div className='relative w-full h-0 pb-56%'>
          <Link href={`/watch/${videoId}`}>
            <Image className='p-1 rounded-3xl object-cover' fill src={thumbnail} alt={`${title} video thumbnail`} />
          </Link>
        </div>
        <div className='flex gap-3'>
          { channelImage && <Image className='rounded-full w-10 h-10' src={channelImage} width={30} height={30} alt={`${channelTitle}'s channel image`} /> }
          <div>
            <p>
              {title}
            </p>
            <p>
              {channelTitle}
            </p>
            <div className='flex gap-1 items-center'>
              <span>
                {formatNumbers(views)} views
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