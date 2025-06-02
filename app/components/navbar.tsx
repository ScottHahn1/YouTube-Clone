'use client';
import Image from 'next/image';
import SearchBar from './search/searchBar';
import { useTheme } from '../contexts/themeContext';
import Button from './button';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className='h-16 flex justify-around items-center md:h-20'>
            <div className='relative w-1/3 h-40% md:w-1/4'>
                <Image
                    src={theme === 'light' ? '/images/yt_logo_rgb_light.png' : '/images/yt_logo_rgb_dark.png'}
                    alt='YouTube Logo'
                    fill
                    className='object-contain'
                    priority
                    sizes='(max-width: 768px) 50vw, 25vw'
                />
            </div>

            <div className='hidden w-40% md:block'>
                <SearchBar />
            </div>
            
            <Button 
                className='py-1.5 px-1.5 text-sm rounded-full bg-slate-800 dark:bg-white text-white dark:text-black md:p-2 md:text-base'
                handleClick={toggleTheme}
            >
                { theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode' }
            </Button>
        </nav>
    )
};

export default Navbar;