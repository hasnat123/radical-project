import { SharedNavProps } from '@/types'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const Header: React.FunctionComponent<SharedNavProps> = ({navOpen, setNavOpen}): JSX.Element => {
  return (
    <header className={`fixed z-20 flex justify-between items-center w-screen h-[74px] lg:ml-[81px] bg-white uppercase px-[43px] lg:pl-[43px] text-[23px] font-black text-black before:absolute ${navOpen ? 'before:inline-block lg:before:hidden' : 'before:hidden'} before:top-0 before:left-0 before:w-[100vw] before:h-[100vh] before:bg-black before:opacity-95`}>
        <Link href='/'><h1>RAD<span className='text-[#8b201d]'>ICAL</span></h1></Link>
        <FontAwesomeIcon icon={faBars} width={27} color='#454664' onClick={()=> setNavOpen(true)}/>
    </header>
  )
}

export default Header