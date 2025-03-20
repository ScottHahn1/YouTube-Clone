'use client';
import { useFetchInfinite } from "@/app/hooks/useFetch";
import Card from "../card";
import useChannels from "../../hooks/useChannels";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";
import { Fragment } from 'react';

export interface Videos {
  items: {
    id: string;
    contentDetails: {
      duration: string;
    }
    snippet: {
      categoryId: string;
      channelId: string;
      channelTitle: string;
      publishedAt: string;
      thumbnails: {
        high: {
          url: string;
        }
      }
      title: string;
    }
    statistics: {
      viewCount: number;
    }
  }[],
  nextPageToken: string;
}

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
}

const Popular = () => {
  const videosQueryParams = new URLSearchParams({
    'part': 'contentDetails, snippet, statistics',
    'chart': 'mostPopular',
    'maxResults': '30'
  }).toString();

  const { data: videos, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchInfinite<Videos>(`/api/videos?${videosQueryParams}`, ['popular']);

  const channels = useChannels(videos?.pages.length ? videos?.pages[videos.pages.length - 1].items.map(page => page.snippet.channelId) : []);

  const lastItemRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

  return (
    <div className='grid gap-3 md:grid-cols-4 md:pr-1 md:ml-32 lg:ml-24 lg:grid-cols-3 xl:ml-36'>
      {
        videos?.pages.map(page => page.items.map((video, index) => (
          <Fragment key={video.id}>
            <Card 
              channelId={video.snippet.channelId}
              channelImage={channels.length > 0 && channels?.find(channel => channel.id == video.snippet.channelId)?.snippet.thumbnails.high.url as string || ''}
              channelTitle= {channels.length > 0 && channels?.find(channel => channel.id == video.snippet.channelId)?.snippet.title as string || ''} 
              duration={video.contentDetails.duration}
              index={index}
              publishedAt={video.snippet.publishedAt}
              title={video.snippet.title} 
              thumbnail={video.snippet.thumbnails.high.url} 
              videoId={video.id}
              views={video.statistics.viewCount}
            />
            { index === page.items.length - 1 && <div ref={lastItemRef} /> }
          </Fragment>
        )))
      }
    </div>
  )
}

export default Popular;