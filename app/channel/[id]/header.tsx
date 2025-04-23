'use client';
import Button from '@/app/components/button';
import useChannels from "@/app/hooks/useChannels";
import { formatNumbers } from "@/app/utils/formatter";
import Image from "next/image";

const ChannelHeader = ({ id }: { id: string }) => {
  const extractedId = id.split('-').slice(-1).toString();

  const channel = useChannels(extractedId);

  const bannerParams = '=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj';

  return (
    <header className='mx-1 mt-2 relative md:ml-32 xl:ml-36'>
      { channel.length > 0 &&
        <div className='flex flex-col gap-2 md:gap-4'>
          <div className='relative object-fill h-28 md:h-48 lg:w-90%'>
            <Image
              className='rounded-3xl' 
              fill
              src={channel[0].brandingSettings.image.bannerExternalUrl + bannerParams}
              alt={`${channel[0].snippet.title}'s banner image`}
            />
          </div>

          <div className='flex flex-col text-sm md:text-base md:flex-row md:gap-4 lg:w-90%'>
            <div className='flex gap-1'>
              <div className='relative object-cover w-16 h-16 md:w-32 md:h-32 lg:w-40 lg:h-40'>
                <Image
                  className='rounded-full'
                  fill
                  src={channel[0].snippet.thumbnails.high.url}
                  alt={`${channel[0].snippet.title}'s image`}
                />
              </div>
              
              <div className='md:hidden'>
                <h1 className='text-xl font-medium'>{channel[0].snippet.title}</h1>
                <h2>{channel[0].snippet.customUrl}</h2>
              </div>
            </div>

            <div className='flex flex-col ml-16 md:ml-0 md:gap-2 lg:justify-center'>
              <h1 className='hidden md:block md:font-bold text-4xl'>{channel[0].snippet.title}</h1>

              <div className='flex gap-4'>
                <p className='hidden md:block'>{channel[0].snippet.customUrl}</p>
                <p>{formatNumbers(channel[0].statistics.subscriberCount)} subscribers</p>
                <p>{formatNumbers(channel[0].statistics.videoCount)} videos</p>
              </div>

              <p className='line-clamp-1 text-xs md:text-base'>{channel[0].snippet.description}</p>

              <Button className='bg-charcoal text-white dark:bg-white dark:text-black mt-1 w-fit py-1 md:py-2 px-3 md:px-4 rounded-full' handleClick={() => {}}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      }
    </header>
  )
}

export default ChannelHeader;