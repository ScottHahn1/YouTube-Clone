import ChannelSections from "./home/sections";
import Error from "@/app/components/Error";
import { Playlists } from "./playlists/page";
import fetchData from "@/app/utils/fetchData";

export interface ChannelSections {
  contentDetails: {
    channels: string[];
    playlists: string[];
  },
  snippet: {
    type: string;
  }
};

export interface PlaylistsItems {
  items: {
    id: string;
    contentDetails: {
      videoId: string;
    };
    snippet: {
      channelTitle: string;
      position: number;
      publishedAt: string;
      thumbnails: {
        high: {
          url: string;
        }
      };
      title: string;
    };
  }[];
  pageInfo: {
    totalResults: number;
  }
};

interface Props {
  params: Promise<{ id: string }>
};

const ChannelHome = async ({ params }: Props) => {
  const { id } = await params;

  let sections: ChannelSections[] | null = null;
  let playlistsIds = '';
  let playlists: Playlists | null = null;
  let playlistsItems: PlaylistsItems[] | null = null;

  const sectionQueryParams = new URLSearchParams({
    'channelId': id as string,
    'part': 'contentDetails, id, snippet'
  }).toString();
  
  try {
    sections = await fetchData<ChannelSections[]>(
      `${process.env.API_URL}/api/channelSections?${sectionQueryParams}`,
      'Error loading channel sections!'
    );
  } catch(err) {
    console.log(err);
    return <Error divClassName='mt-40 md:mt-20 md:ml-36' message='Error loading channel sections!' />;
  };

  playlistsIds = sections
  ?.map(section => section.contentDetails.playlists?.[0] || section.contentDetails.channels?.[0])
  .filter(Boolean)
  .join(',') as string;
  
  const playlistsQueryParams = new URLSearchParams({
    'id': playlistsIds as string,
    'part': 'snippet',
  }).toString();

  try {
    playlists = await fetchData<Playlists>(
      `${process.env.API_URL}/api/playlists?${playlistsQueryParams}`,
      'Error loading channel sections!'
    );
  }  catch(err) {
    console.log(err);
    return <Error divClassName='mt-40 md:mt-20 md:ml-36' message='Error loading channel sections!' />
  };

  try {
    playlistsItems = await fetchData<PlaylistsItems[]>(
      `${process.env.API_URL}/api/playlists/items?playlistId=${playlistsIds}`,
      'Error loading channel sections!'
    );
  } catch(err) {
    return <Error divClassName='mt-40 md:mt-20 md:ml-36' message='Error loading channel sections!' />
  };

  if (!playlists || !playlistsItems) {
    return null;
  };

  return (
    <ChannelSections
      playlists={playlists}
      playlistsItems={playlistsItems}
    />
  );
};

export default ChannelHome;