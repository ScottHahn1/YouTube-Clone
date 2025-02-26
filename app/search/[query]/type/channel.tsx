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
            }
        }
    }
}

interface Props {
    channel: Channel;
}

const SearchChannel = ({ channel }: Props) => {
    return (
        <div className='flex w-9/12'>
            <div className='w-40% bg-orange-400'>
                <div className='relative w-40% h-40 m-auto'>
                    <Image 
                        className='p-1 rounded-2xl object-cover' 
                        layout='fill'
                        src={channel.snippet.thumbnails.high.url} 
                        alt={`${channel.snippet.channelTitle}'s thumbnail`} 
                    />
                </div>
            </div>

            <div className='w-40% bg-green-700'>
                <p>{channel.snippet.channelTitle}</p>
                <p></p>
                <p>{channel.snippet.description}</p>
            </div>

            <Button 
                children={
                    <p>Subscribe</p>
                } 
                className='rounded-md p-4' 
                handleClick={() => console.log('Subscribed!')} 
            />
        </div>
    )
}

export default SearchChannel;