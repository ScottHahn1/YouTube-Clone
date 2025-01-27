'use client';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

const SearchBar = () => {
    const [search, setSearch] = useState('');
    
    return (
        <div className='flex justify-center items-center gap-2 h-8 w-40% rounded-2xl bg-gray-700'>
            <input 
                className='w-full rounded-2xl rounded-r-none h-full pl-4' 
                value={search}
                type='text'
                onChange={e => setSearch(e.target.value)}
                placeholder='Search' 
            />
            {
                search ?
                <Link href={`/search/${search}`}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='pr-2' color='white' />
                </Link>
                :
                <div>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='pr-2' color='white' />
                </div>
            }
        </div>
    )
}

export default SearchBar;