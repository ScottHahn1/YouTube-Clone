'use client';
import useChannels from "@/app/hooks/useChannels";
import { formatNumbers } from "@/app/utils/formatter";
import Image from "next/image";

const ChannelHeader = ({ id }: { id: string }) => {
  const extractedId = id.slice(id.indexOf('-') + 1).split('/')[0];

  const channel = useChannels(extractedId);

  const bannerParams = '=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj';

  return (
    <header className='ml-52'>
      { channel.length > 0 &&
        <div className='flex flex-col gap-4'>
          <div className='h-48 w-10/12 relative object-fill'>
            <Image
              className='p-1 rounded-3xl' 
              fill
              src={channel[0].brandingSettings.image.bannerExternalUrl + bannerParams}
              alt={`${channel[0].snippet.title}'s banner image`}
            />
          </div>

          <div className='w-1/2 flex items-center gap-6'>
            <div>
              <Image
                className='p-1 rounded-full'
                width={150}
                height={20}
                src={channel[0].snippet.thumbnails.high.url}
                alt={`${channel[0].snippet.title}'s image`}
              />
            </div>

            <div>
              <p className='text-4xl'>{channel[0].snippet.title}</p>

              <div className='flex gap-4'>
                <p>{channel[0].snippet.customUrl}</p>
                <p>{formatNumbers(channel[0].statistics.subscriberCount)} subscribers</p>
                <p>{formatNumbers(channel[0].statistics.videoCount)} videos</p>
              </div>

              <p className='truncate w-96'>{channel[0].snippet.description}</p>
            </div>
          </div>
        </div>
      }
    </header>
  )
}

export default ChannelHeader;