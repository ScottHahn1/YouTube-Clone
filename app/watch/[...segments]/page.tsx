import WatchVideo from "@/app/components/video/watchVideo";

interface Props {
    params: Promise<{
        segments: string[];
    }>;
};

const WatchVideoPage = async ({ params }: Props) => {
    const { segments } = await params;

    const videoId = segments[0]; 
    const playlistId = segments[1] || null;

    return (
        <div className='md:ml-2'>
            <WatchVideo playlistId={playlistId as string} videoId={videoId as string} />
        </div>
    )
};

export default WatchVideoPage;