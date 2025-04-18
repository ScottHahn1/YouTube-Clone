'use client';
import { useFetch } from "@/app/hooks/useFetch";
import { formatDate, formatNumbers } from "@/app/utils/formatter";
import Image from 'next/image';
import useChannels from "@/app/hooks/useChannels";
import CommentThreads from "./commentThreads";
import RelatedVideos from "./relatedVideos";
import VideoPlaylist from "./playlist";
import { Video } from '@/app/search/[query]/type/video';
import { Fragment, useState } from 'react';
import Button from '../button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

interface Props {
  playlistId: string;
  videoId: string;
}

const WatchVideo = ({ playlistId, videoId }: Props) => {
  const videoQueryParams = new URLSearchParams({
    'id': videoId,
    'part': 'snippet, statistics'
  }).toString();

  const { data: video } = useFetch<Video>(`/api/video?${videoQueryParams}`, ['video', videoQueryParams], !!videoId);

  const channel = useChannels(video ? video.snippet.channelId : '');

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <>
      <div className='relative flex flex-col mt-8 md:mt-auto'>
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

            {/* channel info and like/subscribe buttons */}
            <div>
              <div className='flex items-end flex-wrap mt-2 md:justify-between lg:mt-0 xl:mt-3'>
                <div className='flex items-center gap-2 flex-1'>
                  { 
                    channel.length > 0 && 
                    <Image 
                      className='rounded-full w-8 h-8 md:w-10 md:h-10' 
                      src={channel[0].snippet.thumbnails.high.url} 
                      width={30} height={30} 
                      alt={`${channel[0].snippet.title}'s channel image`} 
                    />
                  }

                  <div className='xl:flex xl:flex-col'>
                    <h2 className='font-medium text-sm md:text-base'>
                      {video?.snippet.channelTitle}
                    </h2>

                    <div className='flex gap-1'>
                      <p className='text-sm'>
                        {channel.length > 0 && 
                          formatNumbers(channel[0].statistics.subscriberCount)
                        } 
                      </p>

                      <p className='text-sm hidden lg:block xl:block'>
                        subscribers
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    className='rounded-full px-2 bg-charcoal text-white dark:bg-gray-700 md:mr-20 lg:py-1 xl:ml-20 xl:px-4'
                    handleClick={() => {}}
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

          {/* video stats and description */}
          <div className='bg-gray-200 dark:bg-darkGray rounded-lg py-1 px-3 mt-2 mx-2 lg:mx-0'>
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
              ...more
            </Button>
          </div>
        </div>

        {
          video &&
          <div className='flex flex-col mt-4 md:mt-0 md:absolute right-0 -top-3 md:w-38% lg:w-1/3 xl:top-0'>
            {
              playlistId && <VideoPlaylist playlistId={playlistId} videoId={videoId} />
            }
            <div>
              <RelatedVideos videoCategoryId={video.snippet.categoryId} />
            </div>
          </div>
        }

      </div>

      <div className='px-2 md:w-60% lg:px-0 lg:w-65%'>
        <p className='mt-10 text-xl font-semibold'>{video?.statistics.commentCount} Comments</p>
        <CommentThreads videoId={videoId} />
      </div>
    </>
  )
}

export default WatchVideo;