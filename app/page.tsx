import Popular from "./components/home/popular";
import fetchData from "./utils/fetchData";
import Error from "./components/Error";

export interface Videos {
  items: {
    id: string;
    contentDetails: {
      duration: string;
    };
    snippet: {
      categoryId: string;
      channelId: string;
      channelTitle: string;
      publishedAt: string;
      thumbnails: {
        high: {
          url: string;
        }
      }
      title: string;
    };
    statistics: {
      viewCount: number;
    };
  }[],
  nextPageToken: string;
};

export default async function Home() {
  let videos: Videos | null = null;

  const videosQueryParams = new URLSearchParams({
    'chart': 'mostPopular',
    'maxResults': '12',
    'part': 'contentDetails, snippet, statistics'
  }).toString();

  try {
    videos = await fetchData<Videos>(
      `${process.env.API_URL}/api/videos?${videosQueryParams}`, 
      'Error loading videos!'
    );
  } catch (err) {
    return <Error divClassName='mt-40 md:mt-20 md:ml-36' message='Error loading videos!' />;
  };

  return (
    <main className='mt-4'>
      <Popular 
        initialData={videos} 
        queryKey='popular'
        videosQueryParams={videosQueryParams}
      />
    </main>
  );
};