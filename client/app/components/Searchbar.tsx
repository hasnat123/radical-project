'use client'

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'

const Searchbar = ({ favourites }: { favourites: boolean}): JSX.Element => {

    const [query, setQuery] = useState<string>('');

    const router = useRouter()

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        if (query.trim()) {
            favourites ? router.push(`/favourites/search?query=${query}`) : router.push(`/bestsellers/search?query=${query}`)
        }
    };
    
    const HandleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

  return (
    <form onSubmit={HandleSubmit} className="flex items-center bg-white overflow-hidden mt-0 mb-[37px] h-[52px] w-full max-w-[949px] rounded-[41px] text-[16px]">
        <div className="flex items-center w-full h-full overflow-hidden">
        <div className="flex items-center pl-3 xs:pl-4 pr-2 xs:pr-3">
            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8.06505 14.3489C11.5356 14.3489 14.3489 11.5356 14.3489 8.06505C14.3489 4.59455 11.5356 1.78116 8.06505 1.78116C4.59455 1.78116 1.78116 4.59455 1.78116 8.06505C1.78116 11.5356 4.59455 14.3489 8.06505 14.3489ZM8.06505 16.1301C12.5193 16.1301 16.1301 12.5193 16.1301 8.06505C16.1301 3.61085 12.5193 0 8.06505 0C3.61085 0 0 3.61085 0 8.06505C0 12.5193 3.61085 16.1301 8.06505 16.1301Z" fill="#1D4A87"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M16.7406 18.2182L12.7758 14.2533L14.0352 12.9938L18.0001 16.9587L16.7406 18.2182Z" fill="#1D4A87"/>
            </svg>

            </div>
            <input
                type="text"
                name="search"
                className="flex-1 h-full pr-2 xs:pr-4 outline-none"
                placeholder="What books would you like to find?"
                value={query}
                onChange={HandleInputChange}
                autoComplete="off"
            />
            <button
            type="submit"
            className="h-full w-[59px] hover:brightness-105 text-white bg-secondary font-bold"
            >
                GO
            </button>
        </div>
    </form>
  )
}

export default Searchbar