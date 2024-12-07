'use client'
import { useParams } from "next/navigation";
import WatchVideo from "../../components/video/watchVideo";

const WatchVideoPage = () => {
    const { id } = useParams();

    return (
        <div>
            <WatchVideo videoId={id as string}/>
        </div>
    )
}

export default WatchVideoPage;