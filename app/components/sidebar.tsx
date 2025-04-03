import { faClockRotateLeft, faFilm, faHouse, faPlayCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
    return (
        <div className='w-full text-xs flex items-center gap-2 bg-white z-10 justify-around bottom-0 fixed md:pt-10 md:w-28 md:h-full md:justify-normal md:flex-col md:text-base md:bottom-auto lg:text-sm lg:w-24 xl:text-base xl:w-28 xl:pl-4'>
            <button className='flex flex-col pb-2 pt-2'>
                <FontAwesomeIcon icon={faHouse} className=' transition-all duration-300' />
                <p>Home</p>
            </button>
            <button className='flex flex-col pb-2 pt-2'>
                <FontAwesomeIcon icon={faFilm} className='transition-all duration-300' />
                <p>Shorts</p>
            </button>
            <button className='flex flex-col pb-2 pt-2'>
                <FontAwesomeIcon icon={faPlayCircle} className=' transition-all duration-300' />
                <p>Subscriptions</p>
            </button>
            <button className='flex flex-col pb-2 pt-2'>
                <FontAwesomeIcon icon={faUser} className='transition-all duration-300' />
                <p>You</p>
            </button>
            <button className='flex flex-col'>
                <FontAwesomeIcon icon={faClockRotateLeft} className='transition-all duration-300' />
                <p>History</p>
            </button>
        </div>
    )
}

export default Sidebar;