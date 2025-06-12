'use client';
import { useFetchInfiniteWithInitialData, useFetchWithState } from "@/app/hooks/useFetch";
import { ChannelDetails } from "@/app/channel/[name]/[id]/videos/page";
import { Videos } from "@/app/page";
import { SearchResult } from "./page";
import SearchVideo from "./type/video";
import Error from "@/app/components/Error";
import Loading from "@/app/components/Loading";
import SearchChannel from "./type/channel";
import useInfiniteScroll from "@/app/hooks/useInfiniteScroll";

interface Props {
    initialData: SearchResult;
    searchQueryParams: string;
    searchQuery: string;
};

const SearchUI = ({ initialData, searchQueryParams, searchQuery }: Props) => {
	const { 
        data: searchResults, 
        isLoading: searchLoading, 
        isError: searchError,
        fetchNextPage, 
        hasNextPage, 
        isFetchingNextPage,
    } = useFetchInfiniteWithInitialData<SearchResult>(
        `/api/search?${searchQueryParams}`,
        ['search', searchQuery],
        initialData
    );

    const channelIds = searchResults?.pages[searchResults.pages.length - 1].items.map(
		result => result.snippet.channelId
	);

    const channelQueryParams = new URLSearchParams({
        'id': channelIds?.join(','),
        'part': 'brandingSettings, contentDetails, snippet, statistics'
    }).toString();
    

    const [channels, channelsLoading, channelsError] = useFetchWithState<ChannelDetails>(
        `/api/channels?${channelQueryParams}`,
        ['searchResultsChannels', channelIds.toString()],
        !!channelIds
    );

	const videosIds = searchResults?.pages[searchResults.pages.length - 1].items.filter(
		result => result.id.kind === 'youtube#video'
	).map(
		video => video.id.videoId
	);

    const videosQueryParams = new URLSearchParams({
        'id': videosIds?.join(','),
        'part': 'contentDetails, snippet, statistics'
    }).toString();

    const [videos, videosLoading, videosError] = useFetchWithState<Videos>(
        `/api/videos?${videosQueryParams}`,
        ['searchResultsVideos', videosIds.toString()],
        !!videosIds
    );

  	const lastItemRef = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

    if (searchError || channelsError || videosError) {
		return <Error divClassName='mt-40 md:mt-20 md:ml-36' message='No search data found!' />;
	};

	if (searchLoading || videosLoading || channelsLoading) {
		return <Loading wrapperClassName='min-h-screen md:ml-36' message='Searching...'/>;
	};

	return (
		<div className='flex flex-col gap-4'>
			{
        		channels && Array.isArray(channels) &&
        		videos && Array.isArray(videos) &&
				searchResults?.pages.map((page, pageIndex) => 
				page.items.map(result => (
					<div key={
						result.id.kind == 'youtube#video' ? result.id.videoId : result.id.channelId
					}>
						{
							result.id.kind == 'youtube#video'
							?
							<SearchVideo 
								channelImage={
									channels[pageIndex] &&
									channels[pageIndex].items.find(channel => (
										channel.id == result.snippet.channelId
									))?.snippet.thumbnails.high.url
								}
								video={
									result
								}
								views={
									videos[pageIndex] &&
									videos[pageIndex].items.find(video => (
										video.id == result.id.videoId
									))?.statistics.viewCount
								}
							/>
							:
							<SearchChannel channel={result} />
						}
					</div>
				)))
			}

			<div ref={lastItemRef} />
		</div>
	);
};

export default SearchUI;