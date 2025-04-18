import { PlaylistsItems } from "@/app/channel/[id]/page";
import { useFetch } from "@/app/hooks/useFetch";
import Image from "next/image";
import { Playlists } from "@/app/channel/[id]/playlists/page";
import Link from "next/link";

interface Props {
    playlistId: string;
    videoId: string;
}

const VideoPlaylist = ({ playlistId, videoId }: Props) => {
    const playlistQueryParams = new URLSearchParams({
        'id': playlistId as string,
        'part': 'contentDetails, snippet'
    }).toString();
    
    const { data: playlist } = useFetch<Playlists>(`/api/playlists?${playlistQueryParams}`, ['playlist', playlistId], !!playlistId);

    const { data: playlistVideos } = useFetch<PlaylistsItems>(`/api/playlists/items?playlistId=${playlistId}`, ['playlistVideos', playlistId], !!playlistId);
   
    const getCurrentVideo = () => playlistVideos?.items.find(video => 
        video.contentDetails.videoId === videoId
    )?.snippet.position ?? 0;
    
    return (
        <div className='border pt-4 border-gray-300/60 rounded-lg '>
            <p className='pl-4'>{playlist?.items[0].snippet.title}</p>

            <div className='pl-4'>
                <p>{playlistVideos?.items[0].snippet.channelTitle}</p>
                <p>
                    { `${getCurrentVideo() + 1} / ${playlistVideos?.pageInfo.totalResults}` }
                </p>
            </div>

            {
                playlistVideos?.items.map(video => (
                    <Link href={`/watch/${video.contentDetails.videoId}/${playlistId}`} key={video.id}>
                        <div className='mt-4 mb-4 flex items-center gap-6 text-sm'>
                            <div className='relative w-1/3 h-20'>
                                <Image
                                    className='rounded-lg ml-3'
                                    src={video.snippet.thumbnails.high.url}
                                    objectFit='cover'
                                    fill
                                    alt={`${video.snippet.title}'s image`}
                                />
                            </div>
                            
                            <div className='flex flex-col w-60%'>
                                <p className='font-medium'>{video.snippet.title}</p>
                                <p>{video.snippet.channelTitle}</p>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default VideoPlaylist;