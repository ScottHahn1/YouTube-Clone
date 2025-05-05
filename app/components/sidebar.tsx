import { faClockRotateLeft, faFilm, faHouse, faPlayCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Sidebar = () => {
    return (
        <nav className='w-full text-xs flex items-center gap-2 bg-white dark:bg-charcoal z-10 justify-around bottom-0 fixed md:pt-10 md:w-28 md:h-full md:justify-normal md:flex-col md:text-base md:bottom-auto lg:text-sm lg:w-24 xl:text-base xl:w-28 xl:pl-4'>
            <Link href='/' className='flex flex-col pb-2 pt-2'>
                <FontAwesomeIcon icon={faHouse} />
                <span>Home</span>
            </Link>

            <Link href='/entertainment/24' className='flex flex-col pb-2 pt-2'>
                <FontAwesomeIcon icon={faFilm} />
                <span>Entertainment</span>
            </Link>

            <Link href='/gaming/20' className='flex flex-col pb-2 pt-2'>
                <FontAwesomeIcon icon={faClockRotateLeft} />
                <span>Gaming</span>
            </Link>

            <Link href='/music/10' className='flex flex-col pb-2 pt-2'>
                <FontAwesomeIcon icon={faPlayCircle} />
                <span>Music</span>
            </Link>
            
            <Link href='/sports/17' className='flex flex-col pb-2 pt-2'>
                <FontAwesomeIcon icon={faUser} />
                <span>Sports</span>
            </Link>
        </nav>
    )
}

export default Sidebar;