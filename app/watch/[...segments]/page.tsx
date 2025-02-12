import WatchVideo from "../../components/video/watchVideo";

interface Props {
    params: {
        segments: string[];
    };
}

const WatchVideoPage = async ({ params }: Props ) => {
    const resolvedParams = await params;
    const segments = resolvedParams?.segments;

    const videoId = segments[0]; 
    const playlistId = segments[1] || null;

    return (
        <div className='pl-4'>
            <WatchVideo playlistId={playlistId as string} videoId={videoId as string} />
        </div>
    )
}

export default WatchVideoPage;