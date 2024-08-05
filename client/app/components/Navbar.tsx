'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import { ProfilePic } from '@/public/images/index'
import Link from 'next/link'
import { SharedNavProps } from '@/types'

const Navbar: React.FunctionComponent<SharedNavProps> = ({ navOpen, setNavOpen}): JSX.Element => {

    const pathname = usePathname()
    
    const navbarRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) setNavOpen(false);
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const homeIcon =
    (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.24507 18.5H5.6307V15H4.24507V18.5ZM6.6103 20.5H3.26548C2.72426 20.5 2.28589 20.055 2.28589 19.5V14C2.28589 13.45 2.72426 13 3.26548 13H6.6103C7.15103 13 7.58989 13.45 7.58989 14V19.5C7.58989 20.055 7.15103 20.5 6.6103 20.5Z" fill={pathname.includes('/bestsellers') ? '#ffffff' : '#B8C5D3'}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M11.3887 18.5H12.7744V8.5H11.3887V18.5ZM13.754 20.5H10.4092C9.86842 20.5 9.42957 20.055 9.42957 19.5V7.5C9.42957 6.95 9.86842 6.5 10.4092 6.5H13.754C14.2952 6.5 14.7336 6.95 14.7336 7.5V19.5C14.7336 20.055 14.2952 20.5 13.754 20.5Z" fill={pathname.includes('/bestsellers') ? '#ffffff' : '#B8C5D3'}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M18.5329 18.5H19.9185V2H18.5329V18.5ZM20.8981 20.5H17.5533C17.0126 20.5 16.5737 20.055 16.5737 19.5V1C16.5737 0.45 17.0126 0 17.5533 0H20.8981C21.4389 0 21.8777 0.45 21.8777 1V19.5C21.8777 20.055 21.4389 20.5 20.8981 20.5Z" fill={pathname.includes('/bestsellers') ? '#ffffff' : '#B8C5D3'}/>
            <path fillRule="evenodd" clipRule="evenodd" d="M22.8573 24H1.30625C0.765517 24 0.32666 23.555 0.32666 23C0.32666 22.45 0.765517 22 1.30625 22H22.8573C23.398 22 23.8369 22.45 23.8369 23C23.8369 23.555 23.398 24 22.8573 24Z" fill={pathname.includes('/bestsellers') ? '#ffffff' : '#B8C5D3'}/>
        </svg>
    )

    const favouritesIcon =
    (
        <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.44591 5.61617C2.7403 4.90546 3.17179 4.2597 3.71574 3.71575C4.2597 3.17179 4.90546 2.7403 5.61617 2.44591C6.32688 2.15152 7.08862 2 7.85789 2C8.62715 2 9.38889 2.15152 10.0996 2.44591C10.8103 2.7403 11.4561 3.17179 12 3.71575L13.7157 5.43144L15.4314 3.71575C16.53 2.61718 18.02 2.00001 19.5736 2.00001C21.1272 2.00001 22.6171 2.61718 23.7157 3.71575C24.8143 4.81431 25.4314 6.30428 25.4314 7.85789C25.4314 9.41149 24.8143 10.9015 23.7157 12L13.7157 22L3.71574 12C3.17179 11.4561 2.7403 10.8103 2.44591 10.0996C2.15152 9.38889 2 8.62715 2 7.85789C2 7.08862 2.15152 6.32688 2.44591 5.61617Z" stroke={pathname.includes('/favourites') ? '#ffffff' : '#B8C5D3'} strokeWidth="2.60348" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )

    const settingsIcon =
    (
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.09263 16.6318C3.09263 16.6318 3.09263 16.6318 3.09263 16.6322C3.09263 16.6318 3.09263 16.6318 3.09263 16.6318ZM3.11221 16.6602V16.6651C3.11221 16.6656 3.11221 16.6656 3.11221 16.6656C3.11221 16.6656 3.11221 16.6636 3.11221 16.6602ZM10.0954 21.4347C11.0692 21.5875 12.0969 21.5875 13.0707 21.4347V19.7635C13.0707 19.3335 13.3497 18.9539 13.7607 18.827C14.8031 18.5057 15.7524 17.9571 16.5794 17.197C16.8926 16.906 17.3624 16.8551 17.7343 17.0716L19.1828 17.9184C19.4667 17.5736 19.7211 17.2102 19.9511 16.8316C20.0099 16.7278 20.0735 16.6161 20.142 16.5039C20.3475 16.1327 20.5335 15.7447 20.6901 15.346L19.2367 14.4987C18.8697 14.2822 18.6788 13.8492 18.7767 13.4309C18.9088 12.8623 18.9773 12.298 18.9773 11.7534C18.9773 11.2215 18.9137 10.6709 18.7865 10.118C18.6935 9.69918 18.8843 9.26718 19.2563 9.05314L20.7097 8.21608C20.5433 7.77673 20.3377 7.34865 20.1028 6.93722C20.098 6.93037 20.0784 6.89167 20.0735 6.88482C20.0637 6.86816 20.0441 6.83633 20.0343 6.81869C19.7945 6.40824 19.5254 6.01249 19.222 5.63682L17.7686 6.47388C17.3967 6.68792 16.9269 6.63453 16.6137 6.34163C15.7916 5.57657 14.8031 5.00155 13.7607 4.67976C13.3497 4.5529 13.0707 4.17331 13.0707 3.74327V2.07257C12.0969 1.91976 11.0692 1.91976 10.0954 2.07257V3.74327C10.0954 4.17331 9.81157 4.5529 9.40051 4.67976C8.35817 5.00155 7.4088 5.55012 6.58668 6.31029C6.26859 6.60122 5.7988 6.65216 5.42689 6.43567L3.97838 5.58882C3.69944 5.93363 3.44497 6.29755 3.21497 6.67567C2.92136 7.14931 2.67668 7.64645 2.47604 8.16122L3.92455 9.00857C4.29646 9.22506 4.48242 9.65804 4.38455 10.0763C4.25242 10.645 4.1888 11.2092 4.1888 11.7534C4.1888 12.2858 4.25242 12.8363 4.37476 13.3893C4.46774 13.8081 4.28178 14.2401 3.90987 14.4541L2.45157 15.2912C2.59838 15.6639 2.76966 16.0367 2.9654 16.4055L3.10731 16.6543C3.11221 16.6656 3.122 16.6773 3.12689 16.6886C3.36668 17.099 3.64072 17.4948 3.93923 17.8704L5.39753 17.0334C5.76944 16.8193 6.23434 16.8727 6.55242 17.1656C7.36966 17.9307 8.35817 18.5057 9.40051 18.827C9.81157 18.9539 10.0954 19.3335 10.0954 19.7635V21.4347ZM11.5831 23.5085C10.6631 23.5085 9.75774 23.4012 8.88178 23.1891C8.44625 23.0824 8.13795 22.6896 8.13795 22.2375V20.4556C7.29136 20.1181 6.4937 19.6513 5.76944 19.0778L4.21817 19.9707C3.82668 20.197 3.32753 20.123 3.01923 19.7919C2.41731 19.1498 1.8888 18.446 1.45327 17.699C1.4288 17.6638 1.40434 17.6256 1.38476 17.5795L1.24285 17.339C0.851357 16.6029 0.543059 15.8584 0.32774 15.1168C0.200506 14.6824 0.391357 14.2185 0.782847 13.9932L2.32923 13.1018C2.26561 12.6482 2.23136 12.1971 2.23136 11.7534C2.23136 11.293 2.26561 10.8238 2.33902 10.3511L0.792634 9.44792C0.401145 9.21967 0.220081 8.75241 0.347315 8.31845C0.631144 7.38245 1.03242 6.48661 1.54136 5.65641C1.972 4.94424 2.48583 4.27176 3.06817 3.66098C3.38136 3.33233 3.87561 3.26082 4.2671 3.49004L5.81838 4.39322C6.52795 3.83045 7.30604 3.38082 8.13795 3.05069V1.2698C8.13795 0.817714 8.44625 0.424898 8.88178 0.318122C10.6288 -0.106041 12.5373 -0.106041 14.2794 0.318122C14.7199 0.424898 15.0282 0.817714 15.0282 1.2698V3.05167C15.8699 3.38914 16.6724 3.85543 17.3918 4.42947L18.9431 3.53657C19.3394 3.3098 19.8337 3.38424 20.1469 3.71535C20.7488 4.35894 21.2773 5.06424 21.7128 5.81265C21.7422 5.85869 21.7716 5.9062 21.796 5.95322C22.2414 6.732 22.5888 7.54751 22.8335 8.38898C22.9607 8.82343 22.7748 9.28825 22.3833 9.51404L20.832 10.4055C20.9005 10.859 20.9348 11.3101 20.9348 11.7534C20.9348 12.2143 20.8956 12.6835 20.8222 13.1562L22.3686 14.0593C22.7601 14.2876 22.946 14.7539 22.8139 15.1873C22.579 15.9774 22.2511 16.7459 21.8401 17.4727C21.7667 17.604 21.6982 17.7255 21.6248 17.8425C21.1892 18.563 20.6754 19.236 20.098 19.8458C19.7848 20.1749 19.2856 20.2455 18.8941 20.0167L17.3477 19.114C16.6333 19.6768 15.8601 20.1264 15.0282 20.4566V22.2375C15.0282 22.6896 14.7199 23.0824 14.2794 23.1891C13.4084 23.4012 12.4982 23.5085 11.5831 23.5085Z" fill="#B8C5D3"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M11.5831 9.32498C10.2422 9.32498 9.15583 10.4148 9.15583 11.7534C9.15583 13.0925 10.2422 14.1823 11.5831 14.1823C12.919 14.1823 14.0103 13.0925 14.0103 11.7534C14.0103 10.4148 12.919 9.32498 11.5831 9.32498ZM11.5831 15.6517C9.43477 15.6517 7.68774 13.9031 7.68774 11.7534C7.68774 9.60416 9.43477 7.85559 11.5831 7.85559C13.7314 7.85559 15.4784 9.60416 15.4784 11.7534C15.4784 13.9031 13.7314 15.6517 11.5831 15.6517Z" fill="#B8C5D3"/>
        </svg>
    )

    const navItems = [
      { icon: homeIcon, path: '/bestsellers' },
      { icon: favouritesIcon, path: '/favourites' },
      { icon: settingsIcon, path: '#' }
    ];
    
  return (
    <nav ref={navbarRef} className={`fixed z-20 right-0 lg:left-0 top-0 ${navOpen ? 'translate-x-[0%]' : 'translate-x-[100%] lg:translate-x-[0%]'} transition-transform duration-300 flex flex-col fixed w-[81px] h-screen bg-primary`}>
        <div className='flex items-center justify-center h-[74px] bg-secondary'>
            <Image src={ProfilePic} alt='profile-pic' />
        </div>
        <div className='relative flex flex-1 items-center justify-center h-full'>
            <div
                // className={`absolute z-[-1] bg-gradient-to-t from-[#4072EE] to-[#679CF6] w-full lg:w-[96px] h-[70px] lg:rounded-tr-md lg:rounded-br-md ${pathname === '/' ? 'hidden' : pathname.includes('/bestsellers') ? 'translate-y-[-70px]' : 'translate-y-0'} transition-transform duration-300`}
                className={`absolute z-[-1] bg-gradient-to-t from-[#4072EE] to-[#679CF6] w-full lg:w-[96px] h-[70px] lg:rounded-tr-md lg:rounded-br-md ${(!pathname.includes('/bestsellers') && !pathname.includes('/favourites')) ? 'hidden' : pathname.includes('/bestsellers') ? 'translate-y-[-70px]' : 'translate-y-0'} transition-transform duration-300`}
            >
            </div>
            <ul className='flex flex-col items-center w-full'>
                {navItems.map((item, index) =>
                (
                    <li key={index} className={`${!pathname.includes(item.path) && 'w-full hover:bg-[#505177]'} w-full`}>
                        <Link href={item.path} onClick={() => setNavOpen(false)}>
                            <div className='flex justify-center items-center h-[70px] w-full'>
                                {item.icon}
                            </div>
                            {index !== 2 && !pathname.includes(item.path) && !pathname.includes('/favourites') && <hr className='w-[20px] mx-auto'></hr>}

                        </Link>
                    </li>
                ))}
            </ul>
        </div>

    </nav>
  )
}

export default Navbar