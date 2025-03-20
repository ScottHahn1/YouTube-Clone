'use client';
import { usePathname } from "next/navigation";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import SearchBar from './components/search/searchBar';

const NavbarSidebarWrapper = () => {
    const pathname = usePathname();
    const isWatchPage = pathname?.startsWith('/watch');

    return (
        <div>
           <Navbar /> 
           
           <div className='w-full flex justify-center md:hidden'>
                <SearchBar />
            </div>
            
           { !isWatchPage && <Sidebar /> }
        </div>
    )
}

export default NavbarSidebarWrapper;