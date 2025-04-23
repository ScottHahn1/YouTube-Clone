'use client';
import { useFetch } from "@/app/hooks/useFetch";
import { use } from "react";
import ChannelSections from "./home/sections";
  
interface ChannelSections {
  contentDetails: {
    channels: string[];
    playlists: string[];
  },
  snippet: {
    type: string;
  }
};
      
interface Playlists {
  items: {
    id: string;
    snippet: {
      title: string;
    }
  }[]
};

export interface PlaylistsItems {
  items: {
    id: string;
    contentDetails: {
      videoId: string;
    },
    snippet: {
      channelTitle: string;
      position: number;
      publishedAt: string;
      thumbnails: {
        high: {
          url: string;
        }
      }
      title: string;
    }
  }[],
  pageInfo: {
      totalResults: number;
  }
}

interface Props {
  params: Promise<{ id: string }>;
}

const ChannelHome = ({ params }: Props) => {
  const { id } = use(params); 
  const extractedId = id.split('-').slice(-1).toString();
    
  const sectionQueryParams = new URLSearchParams({
    'channelId': extractedId as string,
    'part': 'contentDetails, id, snippet'
  }).toString();
  
  const { data: sections } = useFetch<ChannelSections[]>(`/api/channelSections?${sectionQueryParams}`, ['channelSections', sectionQueryParams], !!extractedId);

  const playlistsIds = sections
  ?.map(section => section.contentDetails.playlists?.[0] || section.contentDetails.channels?.[0])
  .filter(Boolean)
  .join(',');
  
  const playlistsQueryParams = new URLSearchParams({
    'id': playlistsIds as string,
    'part': 'snippet',
  }).toString();

  const { data: playlists } = useFetch<Playlists>(`/api/playlists?${playlistsQueryParams}`, ['channelSectionsPlaylists', playlistsQueryParams as string], !!playlistsIds);

  const { data: playlistsItems } = useFetch<PlaylistsItems[]>(`/api/playlists/items?playlistId=${playlistsIds}`, ['playlistsItems', playlistsIds as string], !!playlistsIds);
      
  return (
    <div>
      {playlists?.items.map((playlist, index) => (
        <div key={`${playlist.id}-${index}`} className='md:w-full lg:w-[90%] pt-4 mx-1 md:mx-0 '>
          <p className='text-xl font-semibold md:ml-36'>{playlist.snippet.title}</p>

          {
            playlistsItems &&
            <ChannelSections 
              index={index}
              playlistsItems={playlistsItems}
            />
          }
        </div>
      ))} 
    </div>
  )
}

export default ChannelHome;