'use client';
import { useFetchInfiniteWithInitialData } from "@/app/hooks/useFetch";
import Card from "../card";
import useChannels from "@/app/hooks/useChannels";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";
import { Fragment } from 'react';
import Error from "../Error";
import Loading from "../Loading";
import { Videos } from "@/app/page";

export interface ChannelsData {
  items: {
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
  }[],
  nextPageToken: string;
};

interface Props {
  initialData: Videos;
};

const Popular = ({ initialData }: Props) => {
  const videosQueryParams = new URLSearchParams({
    'part': 'contentDetails, snippet, statistics',
    'chart': 'mostPopular',
    'maxResults': '12'
  }).toString();

  const { 
    data: videos, 
    isLoading: videosLoading, 
    isError: videosError, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useFetchInfiniteWithInitialData<Videos>(
    `/api/videos?${videosQueryParams}`, 
    ['popular'],
    initialData
  );

  const [channels, channelsLoading, channelsError] = useChannels(videos?.pages.length ? videos?.pages[videos.pages.length - 1].items.map(page => page.snippet.channelId) : []);

  const lastItemRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

  if (videosLoading || channelsLoading) {
    return <Loading wrapperClassName='min-h-screen md:ml-36' message='Loading videos... '/>;
  };

  if (videosError || !videos || channelsError || !channels ) {
    return <Error divClassName='mt-40 md:mt-20 md:ml-36' message='No videos data found!' />;
  };

  return (
    <div className='grid gap-4 md:grid-cols-4 md:pr-1 md:ml-32 lg:grid-cols-3 lg:ml-24 xl:ml-36 xl:pr-0 xl:mr-4'>
      {
        videos?.pages.map(page => page.items.map((video, index) => (
          <Fragment key={video.id}>
            <Card 
              channelId={video.snippet.channelId}
              channelImage={channels?.items.find(channel => channel.id == video.snippet.channelId)?.snippet.thumbnails.high.url as string || ''}
              channelTitle= {channels?.items.find(channel => channel.id == video.snippet.channelId)?.snippet.title as string || ''} 
              duration={video.contentDetails.duration}
              index={index}
              publishedAt={video.snippet.publishedAt}
              title={video.snippet.title} 
              thumbnail={video.snippet.thumbnails.high.url} 
              thumbnailSize='w-screen h-44 md:w-auto md:h-40 xl:h-56'
              videoId={video.id}
              views={video.statistics.viewCount}
            />
            { index === page.items.length - 1 && <div ref={lastItemRef} /> }
          </Fragment>
        )))
      };
    </div>
  );
};

export default Popular;