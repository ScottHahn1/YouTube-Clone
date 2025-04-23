import Link from "next/link";

const ChannelNavbar = ({ id }: { id: string }) => {
    return (
        <nav className='ml-1 mt-2 mx-1 md:mx-0 md:ml-32 md:mt-4 xl:ml-36'>
            <ul className='flex gap-4 text-xl'>
                <li>
                    <Link href={`/channel/${id}`}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href={`/channel/${id}/videos`}>
                        Videos
                    </Link>
                </li>
                <li>
                    <Link href={`/channel/${id}/playlists`}>
                        Playlists
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default ChannelNavbar;