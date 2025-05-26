'use client';
import { useFetchInfiniteWithInitialData, useFetchWithState } from "@/app/hooks/useFetch";
import Card from "../card";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";
import { Fragment } from 'react';
import Error from "../Error";
import Loading from "../Loading";
import { Videos } from "@/app/page";

interface Channels {
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
  id: string;
};

interface ChannelsData {
  items: Channels[];
};

interface Props {
  initialData: Videos;
  queryKey: string;
  videosQueryParams: string;
};

const Popular = ({ initialData, queryKey, videosQueryParams }: Props) => {
  const { 
    data: videos, 
    isLoading: videosLoading, 
    isError: videosError, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useFetchInfiniteWithInitialData<Videos>(
    `/api/videos?${videosQueryParams}`, 
    [queryKey],
    initialData
  );
  
  const channelIds = videos.pages[videos.pages.length - 1].items.map(
    video => video.snippet.channelId
  ); 

  const channelsQueryParams = new URLSearchParams({
    'id': channelIds?.join(','),
    'maxResults': '12',
    'part': 'brandingSettings, contentDetails, snippet, statistics'
  }).toString();

  const [channels] = useFetchWithState<Channels, ChannelsData>(
    `/api/channels?${channelsQueryParams}`,
    ['popularChannels', channelsQueryParams],
    !!channelIds
  );

  const lastItemRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

  if (videosLoading) {
    return <Loading wrapperClassName='min-h-screen md:ml-36' message='Loading videos... '/>;
  };

  if (videosError || !videos) {
    return <Error divClassName='mt-40 md:mt-20 md:ml-36' message='No videos data found!' />;
  };

  return (
    <div className='grid gap-4 md:grid-cols-4 md:pr-1 md:ml-32 lg:grid-cols-3 lg:ml-24 xl:ml-36 xl:pr-0 xl:mr-4'>
      {
        channels && Array.isArray(channels) &&
        videos?.pages.map(page => page.items.map((video, index) => (
          <Fragment key={video.id}>
            <Card 
              channelId={video.snippet.channelId}
              channelImage={channels.find(channel => channel.id == video.snippet.channelId)?.snippet.thumbnails.high.url as string || ''}
              channelTitle= {channels.find(channel => channel.id == video.snippet.channelId)?.snippet.title as string || ''} 
              duration={video.contentDetails.duration}
              index={index}
              publishedAt={video.snippet.publishedAt}
              title={video.snippet.title} 
              thumbnail={video.snippet.thumbnails.high.url} 
              thumbnailSize='w-screen h-44 md:w-auto md:h-40 xl:h-52'
              videoId={video.id}
              views={video.statistics.viewCount}
            />
          </Fragment>
        )))
      }

      <div ref={lastItemRef} /> 
    </div>
  );
};

export default Popular;