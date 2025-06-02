import Error from "@/app/components/Error";
import MorePlaylists from "./more-playlists";

export interface Playlists {
    items: {
        id: string;
        contentDetails: { itemCount: number },
        snippet: {
            description: string;
            thumbnails: {
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

const ChannelPlaylists = async ({ params }: Props) => {
    const { id: channelId } = await params;

    let playlists: Playlists | null = null;

    const playlistsQueryParams = new URLSearchParams({
        'channelId': channelId,
        'maxResults': '12',
        'part': 'contentDetails, id, snippet'
    }).toString();

    try {
        const playlistsRes = await fetch(`${process.env.API_URL}/api/playlists?${playlistsQueryParams}`);

        if (!playlistsRes.ok) {
          return <Error divClassName='mt-40 md:mt-20 md:ml-36' message='Error loading playlists!'/>
        }

        playlists = await playlistsRes.json();

        if (!playlists) {
          return <Error divClassName='mt-40 md:mt-20 md:ml-36' message='No playlists data found!' />;
        }
    } catch(err) {
        return <Error divClassName="mt-40 md:mt-20 md:ml-36" message="Failed to load playlists!" />;
    };

    if (!playlists) {
        return null;
    };

    return (
        <div className='mx-1 mt-4 md:mx-0 md:ml-32 xl:ml-36'>
            <p className='text-lg'>Created Playlists</p>
            
            <MorePlaylists channelId={channelId} initialData={playlists} />
        </div>
    );
};

export default ChannelPlaylists;