import SearchUI from "./searchUI";
import Error from "@/app/components/Error";
import fetchData from "@/app/utils/fetchData";

export interface SearchResult {
    items: {
        id: {
            kind: string;
            channelId: string;
            videoId: string;
        };
        snippet: {
            categoryId: string;
            channelId: string;
            channelTitle: string;
            description: string;
            publishedAt: string;
            thumbnails: {
                high: {
                    url: string;
                }
            };
            title: string;
        };
        statistics: {
            commentCount: number;
            likeCount: number;
            viewCount: number;
        }
    }[],
    nextPageToken: string;
};

interface Props {
    params: Promise<{ query: string }>
};

const SearchPage = async ({ params }: Props) => {
    const { query } = await params;

    let searchResults: SearchResult | null = null;

    const searchQueryParams = new URLSearchParams({
        'maxResults': '30',
        'part': 'snippet',
        'q': query,
    }).toString();

    try {
        searchResults = await fetchData<SearchResult>(
            `${process.env.API_URL}/api/search?${searchQueryParams}`, 
            'Failed to fetch search data!'
        );
    } catch (err) {
        return <Error divClassName='mt-40 md:mt-20 md:ml-36' message='Error while searching!' />;
    };

    return (
        <div className='mt-4 mx-2 flex flex-col md:ml-32 md:gap-4 lg:ml-40 xl:w-4/5'>
            <SearchUI 
                initialData={searchResults}
                searchQueryParams={searchQueryParams}
                searchQuery={query}
            />
        </div>
    );
};

export default SearchPage;