import Button from '@/app/components/button';
import Image from 'next/image';

interface Channel {
    snippet: {
        channelId: string;
        channelTitle: string;
        description: string;
        thumbnails: { 
            high: {
                url: string;
            };
        };
    };
};

interface Props {
    channel: Channel;
};

const SearchChannel = ({ channel }: Props) => {
    return (
        <div className='flex justify-end items-center md:justify-around my-8'>
            <div className='w-16 md:w-24'>
                <div className='relative h-16 md:h-24'>
                    <Image 
                        className='rounded-full object-cover'
                        fill
                        src={channel.snippet.thumbnails.high.url}
                        alt={`${channel.snippet.channelTitle}'s thumbnail`}
                    />
                </div>
            </div>

            <div className='w-2/5 text-center '>
                <p className='font-semibold line-clamp-2'>{channel.snippet.channelTitle}</p>
                <span className='hidden md:block'>
                    <p className='line-clamp-2 text-sm'>{channel.snippet.description}</p>
                </span>
            </div>

            <Button 
                className='rounded-full px-2 bg-charcoal dark:bg-white text-white dark:text-black h-10 xl:px-4' 
                handleClick={() => console.log('Subscribed!')} 
            >
                <p>Subscribe</p>
            </Button>
        </div>
    );
};

export default SearchChannel;