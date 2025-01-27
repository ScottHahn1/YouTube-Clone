import { faClockRotateLeft, faFilm, faHouse, faPlayCircle, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
    return (
        <div className='w-28 h-full  flex flex-col fixed'>
            <button className='flex flex-col mb-4 pt-4'>
                <FontAwesomeIcon icon={faHouse} className=' transition-all duration-300' />
                <p>Home</p>
            </button>
            <button className='flex flex-col mb-4'>
                <FontAwesomeIcon icon={faFilm} className='transition-all duration-300' />
                <p>Shorts</p>
            </button>
            <button className='flex flex-col mb-4'>
                <FontAwesomeIcon icon={faPlayCircle} className=' transition-all duration-300' />
                <p>Subscriptions</p>
            </button>
            <button className='flex flex-col mb-4'>
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