'use client';
import { useFetchInfiniteWithInitialData } from "@/app/hooks/useFetch";
import { Playlists } from "./page";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";
import { Fragment, useEffect } from "react";
import Image from "next/image";
import { useNavbarVisibility } from "@/app/contexts/channelNavbarContext";
import Error from "@/app/components/Error";
import Loading from "@/app/components/Loading";

interface Props {
	channelId: string;
	initialData: Playlists;
};

const MorePlaylists = ({ channelId, initialData }: Props) => {
	 const playlistsQueryParams = new URLSearchParams({
        'channelId': channelId,
        'maxResults': '12',
        'part': 'contentDetails, id, snippet'
    }).toString();

    const { 
    	data: playlists, 
    	isLoading: playlistsLoading, 
    	isError: playlistsError,
    	fetchNextPage, 
		hasNextPage, 
		isFetchingNextPage 
    } = useFetchInfiniteWithInitialData<Playlists>(
		`/api/playlists?${playlistsQueryParams}`, 
		['channelPlaylists'], 
		initialData
	);

	const { setShowNavbar } = useNavbarVisibility();

	useEffect(() => {
	    if (initialData) {
	      setShowNavbar(true);
	    };
  	}, [initialData, setShowNavbar]);

  	const lastItemRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

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
        };
    };

	if (playlistsError || !playlists) {
		return <Error divClassName='mt-40 md:mt-20 md:ml-36' message='No playlists data found!' />;
	};

	if (playlistsLoading) {
		return <Loading wrapperClassName='min-h-screen md:ml-36' message='Loading playlists... '/>;
	};

	return (
	   <div className='grid gap-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
	        {
	        	playlists?.pages.map(page => page.items.map(playlist => (
		            <Fragment key={playlist.id}>
		                <div className='flex pt-4'>
		                    <div
		                        className='flex flex-col w-full cursor-pointer' 
		                        key={playlist.id} 
		                        onClick={() => handlePlaylistClick(playlist.id)}
		                    >
		                        <div className='relative w-full h-44 lg:h-40 xl:h-36'>
		                            <Image 
		                                className='object-cover md:rounded-3xl'
		                                fill
		                                src={playlist.snippet.thumbnails.high.url}
		                                alt={`${playlist.snippet.title}'s thumbnail`}
		                            />

		                            <span className='absolute bottom-2 right-2 bg-black/60 py-0.5 px-1 rounded-md text-white text-sm'>
		                                { 
		                                    playlist.contentDetails.itemCount > 1 ? 
		                                    `${playlist.contentDetails.itemCount} videos` :
		                                    `${playlist.contentDetails.itemCount} video`
		                                }
		                            </span>
		                        </div>
		                        
		                        <p className='line-clamp-1'>{playlist.snippet.title}</p>
		                        <p className='text-slate-500'>View Full Playlist</p>
		                    </div>
		                </div>
		            </Fragment>
	        	)))
	        };

	        <div ref={lastItemRef} /> 
	    </div>
    );
};

export default MorePlaylists;