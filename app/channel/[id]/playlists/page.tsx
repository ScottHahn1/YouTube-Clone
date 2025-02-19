'use client';
import { useFetchInfinite } from "@/app/hooks/useFetch";
import { use } from "react";
import Image from "next/image";

export interface Playlists {
    items: {
        id: string;
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
    const extractedId = id.slice(id.indexOf('-') + 1).split('/')[0];

    const playlistsQueryParams = new URLSearchParams({
        'channelId': extractedId as string,
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
        <div className='ml-52 pt-4'>
            <p>Created Playlists</p>
            <div className='flex pt-4'>
                { 
                    playlists?.pages
                    .map(page => page.items
                    .map(playlist => (
                        <div
                            className='flex flex-col w-full cursor-pointer' 
                            key={playlist.id} 
                            onClick={() => handlePlaylistClick(playlist.id)}
                        >
                            <div className='relative w-full h-36'>
                                <Image 
                                    className='p-1 rounded-3xl object-cover'
                                    fill
                                    src={playlist.snippet.thumbnails.high.url}
                                    alt={`${playlist.snippet.title}'s thumbnail`}
                                />
                            </div>
                            
                            <p>{playlist.snippet.title}</p>
                            <p className='text-slate-400'>View Full Playlist</p>
                        </div>
                    )))
                }
            </div>
        </div>
    )
}

export default ChannelPlaylists;