'use client';
import Image from "next/image";
import { formatDate } from "@/app/utils/formatter";
import { useFetch } from "@/app/hooks/useFetch";
import { use, useRef, useState } from "react";
import { handleScroll } from "@/app/utils/scroll";
import Link from "next/link";
import Button from "@/app/components/button";

interface ChannelSections {
  contentDetails: {
    channels: string[];
    playlists: string[];
  },
  snippet: {
    type: string;
  }
}
  
interface Playlists {
  items: {
    id: string;
    snippet: {
      title: string;
    }
  }[]
}
  
export interface PlaylistsItems {
  items: {
    id: string;
    contentDetails: {
      videoId: string;
    },
    snippet: {
      channelTitle: string;
      position: number;
      publishedAt: string;
      thumbnails: {
        high: {
          url: string;
        }
      }
      title: string;
    }
  }[],
  pageInfo: {
      totalResults: number;
  }
}

interface Props {
  params: Promise<{ id: string }>;
}

const ChannelHome = ({ params }: Props) => {
    const { id } = use(params); 
    const extractedId = id.slice(id.indexOf('-') + 1).split('/')[0];

    const sectionQueryParams = new URLSearchParams({
        'channelId': extractedId as string,
        'part': 'contentDetails, id, snippet'
    }).toString()

    const { data: sections } = useFetch<ChannelSections[]>(`/api/channelSections?${sectionQueryParams}`, ['channelSections', sectionQueryParams], !!extractedId);
    
    const playlistsIds = sections?.map(section => {
        if (section.contentDetails.channels) {
            return section.contentDetails.channels[0]
        } else if (section.contentDetails.playlists) {
            return section.contentDetails.playlists[0]
        }
    }).join(',')
    
    const playlistsQueryParams = new URLSearchParams({
        'id': playlistsIds as string,
        'part': 'snippet',
    }).toString();

    const { data: playlists } = useFetch<Playlists>(`/api/playlists?${playlistsQueryParams}`, ['channelSectionsPlaylists', playlistsQueryParams as string], !!playlistsIds);

    const { data: playlistsItems } = useFetch<PlaylistsItems[]>(`/api/playlists/items?playlistId=${playlistsIds}`, ['playlistsItems', playlistsIds as string], !!playlistsIds);
 
    const [nextButtonPressed, setNextButtonPressed] = useState<boolean[]>(new Array(playlistsItems?.length).fill(false));

    const scrollContainerRef = useRef<(HTMLDivElement | null)[]>([]);

    return (
        <div className='w-80% ml-52'>
            {playlists?.items.map((playlist, index) => (
                <div key={`${playlist.id}-${index}`} className='pt-4'>
                    <p className='text-xl font-semibold'>{playlist.snippet.title}</p>

                    <div className='relative pt-4'>
                        { nextButtonPressed[index] &&
                            <Button
                                className='absolute h-10 w-10 left-0 top-1/2 transform -translate-y-1/2 rounded-full bg-gray-700 text-white text-xl leading-none z-10'
                                handleClick={() => {
                                    handleScroll({
                                        container: scrollContainerRef.current[index], 
                                        direction: 'left', 
                                        setNextButtonPressed: (value: boolean) => {
                                            const newState = [...nextButtonPressed];
                                            newState[index] = value;
                                            setNextButtonPressed(newState);
                                        }
                                    }) 
                                }}
                            >
                                &#8249;
                            </Button>
                        }
                        
                        <Button
                            className='absolute h-10 w-10 right-0 top-1/4 rounded-full bg-gray-700 text-white text-3xl font-extralight flex items-center justify-center leading-none z-10'
                            handleClick={() => {
                                handleScroll({
                                    container: scrollContainerRef.current[index], 
                                    direction: 'right', 
                                    setNextButtonPressed: (value: boolean) => {
                                        const newState = [...nextButtonPressed];
                                        newState[index] = value;
                                        setNextButtonPressed(newState);
                                    }
                                }) 
                            }}
                        >
                            &#8250;
                        </Button>

                        <div 
                            className='flex overflow-x-auto scrollbar-hidden' 
                            ref={(el) => { scrollContainerRef.current[index] = el; }} 
                        >
                            {
                                playlistsItems &&
                                playlistsItems[index] &&
                                playlistsItems[index].items &&
                                playlistsItems[index].items
                                .slice(0, 15)
                                .map(item => (
                                    <div key={item.id} className='w-1/5 flex-shrink-0'>
                                        <div className='relative w-full h-0 pb-56%'>
                                            <Link href={`/watch/${item.contentDetails.videoId}`}>
                                                <Image
                                                    className='p-1 rounded-3xl object-cover' 
                                                    fill
                                                    src={item.snippet.thumbnails.high ? item.snippet.thumbnails.high.url : 'https://i.ytimg.com/vi/default.jpg'}
                                                    alt={`${item.snippet.title}'s image`}
                                                />
                                            </Link>
                                        </div>
                                        <Link href={`/watch/${item.contentDetails.videoId}`}>
                                            <p className='truncate w-48'>{item.snippet.title}</p>
                                        </Link>
                                        <div className='border-b border-gray-300 opacity-60 pb-4'>
                                            <p>{item.snippet.channelTitle}</p>
                                            <p>{formatDate(item.snippet.publishedAt)}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        
                    </div>
                </div>
            ))} 
        </div>
    )
}

export default ChannelHome;