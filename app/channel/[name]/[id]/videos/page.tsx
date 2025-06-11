import Error from "@/app/components/Error";
import MoreVideos from "./more-videos";
import fetchData from "@/app/utils/fetchData";

export interface ChannelDetails {
  items: {
    id: string;
    brandingSettings: {
      channel: {
        description: string;
        unsubscribedTrailer: string;
      },
      image: {
        bannerExternalUrl: string;
      }
    },
    contentDetails: {
      relatedPlaylists: {
        uploads: string;
      }
    },
    snippet: {
      customUrl: string;
      description: string;
      thumbnails: {
        high: {
          url: string;
        }
      }
      title: string;
    },
    statistics: {
      subscriberCount: number;
      videoCount: number;
    }
  }[];
};

export interface PlaylistItems {
  items: {
    id: string;
    contentDetails: {
      videoId: string;
    },
    snippet: {
      channelTitle: string;
      publishedAt: string;
      resourceId: {
        videoId: string;
      }
      thumbnails: {
        medium: {
          url: string;
        }
        high: {
          url: string;
        }
      }
      title: string;
    }
  }[],
  nextPageToken: string;
};

interface Props {
  params: Promise<{ id: string }>
};

const ChannelVideos = async ({ params }: Props) => {
  const { id } = await params;

  let channelDetails: ChannelDetails | null = null;
  let videos: PlaylistItems | null = null;

  const channelsQueryParams = new URLSearchParams({
    'id': id,
    'maxResults': '1',
    'part': 'brandingSettings, contentDetails, snippet, statistics'
  }).toString();

  try {
    channelDetails = await fetchData<ChannelDetails>(
      `${process.env.API_URL}/api/channels?${channelsQueryParams}`,
      'Error loading videos!'
    );
  } catch(err) {
    return <Error divClassName='mt-40 md:mt-20 md:ml-36' message="Failed to load channel info!" />;
  };

  const videosPlaylistId = channelDetails?.items[0]?.contentDetails?.relatedPlaylists?.uploads;

  const videosQueryParams = new URLSearchParams({
    'maxResults': '12',
    'part': 'contentDetails, snippet',
    'playlistId': videosPlaylistId as string
  }).toString();
  
  try {
    videos = await fetchData<PlaylistItems>(
      `${process.env.API_URL}/api/playlists/items?${videosQueryParams}`,
      'No video data found!'
    );
  } catch(err) {
    return <Error divClassName='mt-40 md:mt-20 md:ml-36' message='Failed to load data for videos!' />;
  };

  if (!videos || !channelDetails || !videosPlaylistId) {
    return null;
  };

  return (
    <MoreVideos 
      channelId={id} 
      initialData={videos} 
      channelDetails={channelDetails} 
      queryKey='channelUploads'
      videosQueryParams={videosQueryParams}
    />
  );
};

export default ChannelVideos;