import { ChannelsData } from "../components/home/popular";
import { useFetch } from "@/app/hooks/useFetch";
import { useEffect, useState } from "react";

interface Channels {
    id: string;
    snippet: {
        thumbnails: {
            default: {
                url: string;
            }
        }
        title: string;
    }
}

const useChannels = (channelIds: string[] | string) => {
    const [channels, setChannels] = useState<Channels[]>([]);

    const channelsQueryParams = new URLSearchParams({
        'id': Array.isArray(channelIds) ? channelIds?.join(',') : channelIds,
        'part': 'snippet',
        'maxResults': '30'
    }).toString();

    const apiUrl = `http://localhost:3000/api/channels?${channelsQueryParams}`;
    const { data: channelsData } = useFetch<ChannelsData>(apiUrl, ['channels', channelsQueryParams], !!channelIds.length);

    useEffect(() => {
        if (channelsData) {
            setChannels(prev => [...prev, ...channelsData.items]);
        }
    }, [channelsData])

    return channels;
}

export default useChannels;