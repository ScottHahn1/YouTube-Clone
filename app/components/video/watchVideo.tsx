import { useFetch } from "@/app/hooks/useFetch";
import { formatDate, formatNumbers } from "@/app/utils/formatter";
import Image from 'next/image';
import { Videos } from "../home/popular";
import useChannels from "@/app/hooks/useChannels";
import CommentThreads from "./comments";

interface Props {
  videoId: string;
}

const WatchVideo = ({ videoId }: Props) => {
  const videoQueryParams = new URLSearchParams({
    'id': videoId,
    'part': 'snippet, statistics'
  }).toString();

  const { data: video } = useFetch<Videos>(`http://localhost:3000/api/videos?${videoQueryParams}`, ['video', videoQueryParams], !!videoId);
  const channel = useChannels(video ? video.items[0].snippet.channelId : '');

  return (
    <>
      {
        video && (
          <div className='w-10/12 bg-zinc-500'>
            <iframe
              className='w-full'
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
                  src={channel[0].snippet.thumbnails.default.url} 
                  width={30} height={30} 
                  alt={`${channel[0].snippet.title}'s channel image`} 
                /> 
              }
              <div>
                <p className='font-extrabold'>
                  {video.items[0].snippet.title}
                </p>
                <p>
                  {video.items[0].snippet.channelTitle}
                </p>
                <div className='flex gap-1 items-center'>
                  <span>
                    {formatNumbers(video.items[0].statistics.viewCount)} views
                  </span>
                  <span className='text-4xl leading-none align-baseline mb-1'>
                    &#x00B7;
                  </span>
                  <span>
                    {formatDate(video.items[0].snippet.publishedAt)}
                  </span>
                </div>
              </div>
            </div>
            <CommentThreads videoId={videoId} />
          </div>
        )
      }
    </>
  )
}

export default WatchVideo;