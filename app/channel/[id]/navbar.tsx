import Link from "next/link";

const ChannelNavbar = ({ id }: { id: string }) => {
    return (
        <nav className='ml-52'>
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