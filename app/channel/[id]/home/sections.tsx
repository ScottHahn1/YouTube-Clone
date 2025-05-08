import Link from "next/link";
import { PlaylistsItems } from "../page";
import Image from "next/image";
import { formatDate } from "@/app/utils/formatter";
import { handleScroll } from "@/app/utils/scroll";
import Button from "@/app/components/button";
import useScrollHandler from "@/app/hooks/useScrollHandler";
import { useRef, useState } from "react";

interface Props {
    index: number,
    playlistsItems: PlaylistsItems[],
}

const ChannelSections = ({ index, playlistsItems }: Props) => {
    const scrollContainerRef = useRef<(HTMLDivElement | null)[]>([]);

    const [showNextButton, setShowNextButton] = useState<boolean[]>([]);
    const [showPrevButton, setShowPrevButton] = useState<boolean[]>([]);

    useScrollHandler(
        scrollContainerRef.current,
        playlistsItems!,
        setShowPrevButton,
        setShowNextButton
    );
    
    return (
        <div className='relative pt-4 md:ml-36'>
            { showPrevButton[index] &&
                <Button
                    className='absolute shadow-sm shadow-black h-10 w-10 left-0 lg:left-0 top-1/4 text-3xl z-10 rounded-full bg-white dark:bg-gray-700 dark:text-white'
                    handleClick={() => {
                        handleScroll(
                            scrollContainerRef.current[index] as HTMLDivElement, 
                            'left', 
                        ) 
                    }}
                >
                    &#8249;
                </Button>
            }

            <div 
                className='flex gap-1 overflow-x-auto scrollbar-hidden' 
                ref={(el) => { scrollContainerRef.current[index] = el; }} 
            >
                {
                    playlistsItems &&
                    playlistsItems[index] &&
                    playlistsItems[index].items &&
                    playlistsItems[index].items
                    .map(item => (
                        <div key={item.id} className='text-sm w-1/2 flex-shrink-0 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                            <div className='relative h-24 md:h-32'>
                                <Link href={`/watch/${item.contentDetails.videoId}`}>
                                    <Image
                                        className='rounded-lg object-cover' 
                                        fill
                                        src={item.snippet.thumbnails.high ? item.snippet.thumbnails.high.url : 'https://i.ytimg.com/vi/default.jpg'}
                                        alt={`${item.snippet.title}'s image`}
                                    />
                                </Link>
                            </div>

                            <Link href={`/watch/${item.contentDetails.videoId}`}> 
                                <p className='line-clamp-2 font-medium'>{item.snippet.title}</p>
                            </Link>

                            <div className='border-b text-xs md:text-sm border-gray-300 opacity-60 pb-4'>
                                <p>{item.snippet.channelTitle}</p>
                                <p>{formatDate(item.snippet.publishedAt)}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                showNextButton[index] &&
                <Button
                    className='absolute shadow-sm shadow-black h-10 w-10 right-0 lg:-right-4 top-1/4 text-3xl z-10 rounded-full bg-white dark:bg-gray-700 dark:text-white'
                    handleClick={() => {
                        handleScroll(
                            scrollContainerRef.current[index] as HTMLDivElement,
                            'right', 
                        ) 
                    }}
                >
                    &#8250;
                </Button>
            }
        </div>
    )
}

export default ChannelSections;