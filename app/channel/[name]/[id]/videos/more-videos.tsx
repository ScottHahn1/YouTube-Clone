'use client';
import Card from "@/app/components/card";
import { useFetchInfiniteWithInitialData, useFetchWithState } from "@/app/hooks/useFetch";
import { Fragment, useEffect } from "react";
import { ChannelDetails, PlaylistItems } from "./page";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";
import Error from "@/app/components/Error";
import Loading from "@/app/components/Loading";
import { useNavbarVisibility } from "@/app/contexts/channelNavbarContext";

interface MetaData {
	items: {
	  contentDetails: {
	    duration: string;
	  };
	  id: string;
	  statistics: {
	    likeCount: number;
	    viewCount: number;
	  };
	}[];
};

interface Props {
	channelId: string;
	initialData: PlaylistItems;
	channelDetails: ChannelDetails;
	queryKey: string;
	videosQueryParams: string;
};

const MoreVideos = ({ channelId, initialData, channelDetails, queryKey, videosQueryParams}: Props) => {
	const { 
		data: videos, 
		isLoading: videosLoading, 
		isError: videosError,
		fetchNextPage, 
		hasNextPage, 
		isFetchingNextPage 
	} = useFetchInfiniteWithInitialData<PlaylistItems>(
		`/api/playlists/items?${videosQueryParams}`,
		[queryKey],
		initialData
	);

	const { setShowNavbar } = useNavbarVisibility();

	useEffect(() => {
    if (initialData) {
      setShowNavbar(true);
    };
  }, [initialData, setShowNavbar]);

	const videosIds = videos.pages[videos.pages.length - 1].items.map(
		video => video.snippet.resourceId.videoId
	);

	const viewsQueryParams = new URLSearchParams({
		'id': videosIds?.join(','),
		'maxResults': '12',
		'part': 'contentDetails, id, snippet, statistics'
	}).toString();

  	const [metaData] = useFetchWithState<MetaData>(
		`/api/videos?${viewsQueryParams}`, 
		['channelVideosMetaData', videos.pages.toString()],
		!!videosIds
	);

	const lastItemRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

	if (videosError || !videos || !channelDetails?.items?.length) {
		return <Error divClassName='mt-40 md:mt-20 md:ml-36' message='No videos data found!' />;
	};

	if (videosLoading) {
		return <Loading wrapperClassName='min-h-screen md:ml-36' message='Loading videos... '/>;
	};

	return (
		<div className='mx-2 pt-4 grid-cols-2 gap-4 md:mx-0 md:grid md:grid-cols-4 md:pr-4 md:ml-32 lg:grid-cols-3 xl:grid-cols-4 xl:ml-36'>
			{
				metaData && Array.isArray(metaData) &&
				videos.pages.map((page, pageIndex) => page.items.map((video, videoIndex) => (
				<Fragment key={video.id}>
				<Card 
					key={video.id}
					channelId={channelId}
					channelImage={channelDetails.items[0].snippet.thumbnails.high.url}
					channelTitle={channelDetails.items[0].snippet.title} 
					duration={
					metaData[pageIndex] &&
						metaData[pageIndex].items.find(item => item.id == video.snippet.resourceId.videoId)
						?.contentDetails.duration as string
					}
					index={videoIndex}
					publishedAt={video.snippet.publishedAt}
					title={video.snippet.title}
					thumbnail={video.snippet.thumbnails.high.url} 
					thumbnailSize='h-36'
					videoId={video.contentDetails.videoId}
					views={
						metaData[pageIndex] &&
						metaData[pageIndex].items.find(item => item.id == video.snippet.resourceId.videoId)
						?.statistics.viewCount as number
					}
				/>
				</Fragment>
				)))
			}

			<div ref={lastItemRef} />
		</div> 
  	);
};

export default MoreVideos;