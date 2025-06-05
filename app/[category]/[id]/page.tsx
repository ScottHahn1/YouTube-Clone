import Error from "@/app/components/Error";
import { Videos } from "@/app/page";
import fetchData from "@/app/utils/fetchData";
import Popular from "@/app/components/home/popular";

interface Props {
    params: Promise<{ category: string, id: string }>
};

const Category = async ({ params }: Props) => {
    const { category, id } = await params;

    let videos: Videos | null = null;

    const videosQueryParams = new URLSearchParams({
        'chart': 'mostPopular',
        'maxResults': '12',
        'part': 'contentDetails, snippet, statistics',
        'videoCategoryId': id
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
         <Popular 
            initialData={videos} 
            queryKey={category}
            videosQueryParams = {
                new URLSearchParams({
                'chart': 'mostPopular',
                'maxResults': '12',
                'part': 'contentDetails, snippet, statistics'
                }).toString()
            }
        />
    );
};

export default Category;