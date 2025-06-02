'use client';
import Link from "next/link";
import { useNavbarVisibility } from "@/app/contexts/channelNavbarContext";

interface Props {
    id: string;
    title: string;
};

const ChannelNavbar = ({ id, title }: Props) => {
    const { showNavbar } = useNavbarVisibility();

    return (
        <nav className='ml-1 mt-2 mx-1 md:mx-0 md:ml-32 md:mt-4 lg:ml-36'>
            { 
                showNavbar && 
                <ul className='flex gap-4 text-xl'>
                    <li>
                        <Link href={`/channel/${title}/${id}`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href={`/channel/${title}/${id}/videos`}>
                            Videos
                        </Link>
                    </li>
                    <li>
                        <Link href={`/channel/${title}/${id}/playlists`}>
                            Playlists
                        </Link>
                    </li>
              </ul>
            }
        </nav>
    )
};

export default ChannelNavbar;