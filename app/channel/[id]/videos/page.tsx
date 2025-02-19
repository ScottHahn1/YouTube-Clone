'use client';
import Card from "@/app/components/card";
import useChannels from "@/app/hooks/useChannels";
import { useFetch, useFetchInfinite } from "@/app/hooks/useFetch";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";
import { Fragment, use, useEffect, useState } from "react";

interface PlaylistItems {
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
}

interface MetaData {
  items: {
    statistics: {
      likeCount: number;
      viewCount: number;
    }
  }[]
}

interface Views {
  items: {
    statistics: {
      likeCount: number;
      viewCount: number;
    }
  }[]
}

interface Props {
    params: Promise<{ id: string }>;
}

const ChannelVideos = ({ params }: Props) => {
  const { id } = use(params); 
  const extractedId = id.slice(id.indexOf('-') + 1).split('/')[0];
  const channelDetails = useChannels(extractedId ? extractedId : '');
  const videosPlaylistId = channelDetails.length && channelDetails[0].contentDetails.relatedPlaylists.uploads;

  const videosQueryParams = new URLSearchParams({
    'playlistId': videosPlaylistId as string,
    'part': 'contentDetails, snippet'
  }).toString();
  
  const { data: videos, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchInfinite<PlaylistItems>(`/api/playlists/items?${videosQueryParams}`, ['channelUploads'], !!videosPlaylistId);

  const viewsQueryParams = new URLSearchParams({
    'id': videos ? videos.pages[videos.pages.length - 1].items.map(video => video.snippet.resourceId.videoId).join(',') : '',
    'part': 'statistics'
  }).toString();
  
  const [views, setViews] = useState<Views[]>([]);

  const videosIds = videos?.pages
  .flatMap(page => page.items)
  .map(video => video.snippet.resourceId.videoId)
  .join(',');

  const { data: videosMetaData } = useFetch<MetaData>(`/api/videos?${viewsQueryParams}`, ['channelVideosViews', videosIds as string], !!videos);

  useEffect(() => {
    if (videosMetaData) {
      setViews(prev => [...prev, videosMetaData]);
    }
  }, [videosMetaData])

  const lastItemRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

  return (
    <div className='w-80% flex flex-wrap ml-52 pt-4'>
      {
        channelDetails.length > 0 &&
        videos?.pages.map((page, pageIndex) => page.items.map((video, videoIndex) => (
          <Fragment key={video.id}>
            <Card 
              key={video.id}
              channelId={extractedId}
              channelImage={channelDetails[0].snippet.thumbnails.high.url}
              channelTitle= {channelDetails[0].snippet.title} 
              containerWidth='w-1/4'
              publishedAt={video.snippet.publishedAt}
              title={video.snippet.title}
              thumbnail={video.snippet.thumbnails.high.url} 
              videoId={video.id}
              views={views[pageIndex]?.items[videoIndex].statistics.viewCount}
            />
            { videoIndex === page.items.length - 1 && <div ref={lastItemRef} /> }
          </Fragment>
        )))
      }
    </div>
  )
}

export default ChannelVideos;