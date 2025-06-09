'use client';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Video } from '@/app/search/[query]/type/video';
import { ChannelDetails } from '@/app/channel/[name]/[id]/videos/page';
import { formatDate, formatNumbers } from '@/app/utils/formatter';
import Button from '../button';
import { useState } from 'react';

interface Props {
  videoId: string;
  video: Video;
  channel: ChannelDetails;
};

const VideoUi = ({ videoId, video, channel }: Props) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className='w-full md:w-60% md:h-fit lg:w-65%'>
      <iframe
        className='h-48 w-full md:h-64 lg:h-96 lg:rounded-2xl'
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      >
      </iframe>

      <div className='px-2 mt-2'>
        <h1 className='font-extrabold md:text-lg xl:text-xl'>
          {video?.snippet.title}
        </h1>

        <div>
          <div className='flex items-end flex-wrap mt-2 md:justify-between lg:mt-0 xl:mt-3'>
            {
              <div className='flex items-center gap-2 flex-1'>
                <Image 
                  className='rounded-full w-8 h-8 md:w-10 md:h-10' 
                  src={channel.items[0].snippet.thumbnails.high.url} 
                  width={30} height={30} 
                  alt={`${channel.items[0].snippet.title}'s channel image`} 
                />

                <div className='xl:flex xl:flex-col'>
                  <h2 className='font-medium text-sm md:text-base'>
                    {video?.snippet.channelTitle}
                  </h2>

                  <div className='flex gap-1'>
                    <p className='text-sm'>
                      {formatNumbers(channel.items[0].statistics.subscriberCount)}
                    </p>

                    <p className='text-sm hidden lg:block xl:block'>
                      subscribers
                    </p>
                  </div>
                </div>
              </div>
            }

            <div>
              <Button
                className='rounded-full px-2 bg-charcoal text-white dark:bg-gray-700 md:mr-20 lg:py-1 xl:ml-20 xl:px-4'
                handleClick={() => console.log('Subscribed!')}
              >
                Subscribe
              </Button>
            </div>

            <div className='flex flex-1 basis-full mt-2 rounded-full md:basis-0'>
              <Button 
                className='px-2 flex items-center gap-3 bg-gray-200 dark:bg-gray-700 rounded-l-full border-black lg:py-1 xl:px-4' 
                handleClick={() => {}}
              >
                <FontAwesomeIcon 
                  icon={faThumbsUp} 
                  color='white' 
                  style={{ stroke: 'black', strokeWidth: '40' }}
                />
                {video && formatNumbers(video.statistics.likeCount)}
              </Button>

              <div className='cursor-pointer w-[1px] bg-gray-300 dark:bg-gray-500'>
              </div>

              <Button
                className='px-2 flex items-center bg-gray-200 dark:bg-gray-700 rounded-r-full border-black lg:py-1 xl:px-4' 
                handleClick={() => {}}
              >
                <FontAwesomeIcon 
                  icon={faThumbsDown} 
                  color='white' 
                  style={{ stroke: 'black', strokeWidth: '40' }}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-gray-300 dark:bg-darkGray rounded-lg py-1 px-3 mt-2 mx-2 lg:mx-0'>
        <div className='flex items-center gap-1'>
          <span className='text-sm'>
            {video && formatNumbers(video.statistics.viewCount)} views
          </span>
          <span className='text-3xl'>
            &#x00B7;
          </span>
          <span className='text-sm'>
            {video && formatDate(video.snippet.publishedAt)}
          </span>
        </div>

        <p 
          className={`
            ${isDescriptionExpanded ? '' : 'line-clamp-2'} 
            whitespace-pre-wrap text-sm`
          }
        >
          {video?.snippet.description}
        </p>

        <Button
          className='font-semibold'
          handleClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
        >
          { !isDescriptionExpanded ? '...show more' : '...show less' }
        </Button>
      </div>
    </div>
  );
};

export default VideoUi;