'use client';
import { usePathname } from "next/navigation";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

const NavbarSidebarWrapper = () => {
    const pathname = usePathname();
    const isWatchPage = pathname?.startsWith('/watch');

    return (
        <div>
           <Navbar /> 
           { !isWatchPage && <Sidebar /> }
        </div>
    )
}

export default NavbarSidebarWrapper;