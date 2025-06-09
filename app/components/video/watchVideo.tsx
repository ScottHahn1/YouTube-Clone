import CommentThreads from "./commentThreads";
import RelatedVideos from "./relatedVideos";
import VideoPlaylist from "./playlist";
import { Video } from '@/app/search/[query]/type/video';
import Error from "../Error";
import { ChannelDetails } from "@/app/channel/[name]/[id]/videos/page";
import fetchData from "@/app/utils/fetchData";
import VideoUi from "./videoUi";

interface Props {
  playlistId: string;
  videoId: string;
};

const WatchVideo = async ({ playlistId, videoId }: Props) => {
  let video: Video | null = null;

  const videoQueryParams = new URLSearchParams({
    'id': videoId,
    'part': 'snippet, statistics'
  }).toString();

  try {
    video = await fetchData<Video>(
      `${process.env.API_URL}/api/video?${videoQueryParams}`,
      'No video data found!'
    );
  } catch(err) {
    return <Error divClassName='mt-40 md:mt-20' message='Failed to load data for video!' />;
  };

  let channel: ChannelDetails | null = null;

  const channelQueryParams = video?.snippet?.channelId ? new URLSearchParams({
    'id': video.snippet.channelId,
    'part': 'brandingSettings, contentDetails, snippet, statistics',
  }).toString() : '';

  try {
    channel = await fetchData<ChannelDetails>(
      `${process.env.API_URL}/api/channels?${channelQueryParams}`,
      'Error loading channel!'
    );
  } catch(err) {
    return <Error divClassName='mt-40 md:mt-20' message='Failed to load channel info!' />;
  };

  if (!video || !channel) {
    return null;
  };

  return (
    <>
      <div className='relative flex flex-col mt-8 md:mt-auto'>
        <VideoUi
           videoId={videoId}
           video={video}
           channel={channel}
        />

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
  );
};

export default WatchVideo;