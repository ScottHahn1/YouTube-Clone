'use client';
import { useParams } from "next/navigation";
import WatchVideo from "../../components/video/watchVideo";

const WatchVideoPage = () => {
    const params = useParams();
    const segments = params.segments || [];

    const videoId = segments[0]; // First segment is the video ID
    const playlistId = segments[1] || null; // Second segment is the playlist ID

    return (
        <div>
            <WatchVideo videoId={videoId as string} playlistId={playlistId as string} />
        </div>
    )
}

export default WatchVideoPage;