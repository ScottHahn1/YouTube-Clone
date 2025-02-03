'use client';
import { useFetch } from "@/app/hooks/useFetch";
import { formatDate, formatNumbers } from "@/app/utils/formatter";
import Image from 'next/image';
import { Videos } from "../home/popular";
import useChannels from "@/app/hooks/useChannels";
import CommentThreads from "./commentThreads";
import RelatedVideos from "./relatedVideos";
import VideoPlaylist from "./playlist";

interface Props {
  playlistId: string;
  videoId: string;
}

const WatchVideo = ({ playlistId, videoId }: Props) => {
  const videoQueryParams = new URLSearchParams({
    'id': videoId,
    'part': 'snippet, statistics'
  }).toString();

  const { data: video } = useFetch<Videos>(`/api/videos?${videoQueryParams}`, ['video', videoQueryParams], !!videoId);
  
  const channel = useChannels(video ? video.items[0].snippet.channelId : '');

  return (
    <div className='flex'>
      <div className='flex flex-col w-11/12'>
          <iframe
            className='w-full h-96'
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          >
          </iframe>
          <div className='flex gap-3'>
            { 
              channel.length > 0 && 
              <Image 
                className='rounded-full w-10 h-10' 
                src={channel[0].snippet.thumbnails.high.url} 
                width={30} height={30} 
                alt={`${channel[0].snippet.title}'s channel image`} 
              />
            }
            <div>
              <p className='font-extrabold'>
                {video?.items[0].snippet.title}
              </p>
              <p>
                {video?.items[0].snippet.channelTitle}
              </p>
              <div className='flex gap-1 items-center'>
                <span>
                  {video && formatNumbers(video.items[0].statistics.viewCount)} views
                </span>
                <span className='text-4xl leading-none align-baseline mb-1'>
                  &#x00B7;
                </span>
                <span>
                  {video && formatDate(video.items[0].snippet.publishedAt)}
                </span>
              </div>
            </div>
          </div>
          <CommentThreads videoId={videoId} />
      </div>

      { 
        video &&
        <div className='flex flex-col'>
          <VideoPlaylist playlistId={playlistId} videoId={videoId} />
          <RelatedVideos videoCategoryId={video.items[0].snippet.categoryId} />
        </div>
      }
    </div>
  )
}

export default WatchVideo;