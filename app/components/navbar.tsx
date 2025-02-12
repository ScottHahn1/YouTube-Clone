import Image from 'next/image';
import SearchBar from './search/searchBar';
import { useTheme } from '../contexts/themeContext';
import Button from './button';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className='h-20 flex justify-around items-center'>
            <div className="relative w-1/4 h-40%">
                <Image
                    src={theme === 'light' ? '/images/yt_logo_rgb_light.png' : '/images/yt_logo_rgb_dark.png'}
                    alt='YouTube Logo'
                    fill
                    className='object-contain'
                    priority
                />
            </div>
            <SearchBar />
            <Button 
                children={ theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode' } 
                className='p-2 rounded-full bg-slate-800 dark:bg-white text-white dark:text-black'
                handleClick={toggleTheme}
            />
        </nav>
    )
}

export default Navbar;