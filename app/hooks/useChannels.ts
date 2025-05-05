'use client';
import { ChannelsData } from "../components/home/popular";
import { useFetch } from "@/app/hooks/useFetch";
import { useEffect, useState } from "react";

interface Channels {
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
}

const useChannels = (channelIds: string[] | string) => {
  const [channels, setChannels] = useState<Channels[]>([]);
  
  const channelsQueryParams = new URLSearchParams({
    'id': Array.isArray(channelIds) ? channelIds?.join(',') : channelIds,
    'part': 'brandingSettings, contentDetails, snippet, statistics',
    'maxResults': '30'
  }).toString();

  const { data: channelsData, isLoading, isError, error } = useFetch<ChannelsData>(`/api/channels?${channelsQueryParams}`, ['channels', channelsQueryParams], !!channelIds.length);
  
  useEffect(() => {
    if (channelsData) {
      setChannels(prev => [...prev, ...channelsData.items]);
    }
  }, [channelsData])

  return { channels, isLoading, isError, error };
}

export default useChannels;