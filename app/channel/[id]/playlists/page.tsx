'use client';
import { useFetchInfinite } from "@/app/hooks/useFetch";
import { Fragment, use } from "react";
import Image from "next/image";

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
}

interface Props {
    params: Promise<{ id: string }>;
}

const ChannelPlaylists = ({ params }: Props) => {
    const { id } = use(params);
    const extractedId = id.split('-').slice(-1);

    const playlistsQueryParams = new URLSearchParams({
        'channelId': extractedId.toString(),
        'maxResults': '20',
        'part': 'contentDetails, id, snippet'
    }).toString()
    
    const { data: playlists } = useFetchInfinite<Playlists>(`/api/playlists?${playlistsQueryParams}`, ['channelPlaylists'], !!extractedId);

    const handlePlaylistClick = async (playlistId: string) => {
        const videosQueryParams = new URLSearchParams({
            'playlistId': playlistId,
            'part': 'contentDetails, snippet'
        }).toString();

        const response = await fetch(`/api/playlists/items?${videosQueryParams}`);
        const data = await response.json();
        const videoId = data?.items[0].contentDetails.videoId;

        if (videoId) {
            window.location.href = `/watch/${videoId}/${playlistId}`;
        }
    }

    return (
        <div className='mx-1 mt-4 md:mx-0 md:ml-32 xl:ml-36'>
            <p className='text-lg'>Created Playlists</p>
            
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {
                    playlists?.pages.map(page => page.items.map(playlist => (
                    <Fragment key={playlist.id}>
                        <div className='flex pt-4'>
                            <div
                                className='flex flex-col w-full cursor-pointer' 
                                key={playlist.id} 
                                onClick={() => handlePlaylistClick(playlist.id)}
                            >
                                <div className='relative w-full h-44 lg:h-40 xl:h-52'>
                                    <Image 
                                        className='md:rounded-3xl object-cover'
                                        fill
                                        src={playlist.snippet.thumbnails.high.url}
                                        alt={`${playlist.snippet.title}'s thumbnail`}
                                    />
                                </div>
                                
                                <p>{playlist.snippet.title}</p>
                                <p className='text-slate-400'>View Full Playlist</p>
                            </div>
                        </div>
                    </Fragment>
                    )))
                }
            </div>
        </div>
    )
}

export default ChannelPlaylists;