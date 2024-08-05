import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col mt-[20vh] justify-center items-center w-full text-center sm:text-[20px]'>
      <h2 className="text-3xl sm:text-[40px] text-primary mb-4">There was a problem.</h2>
      <p>We could not find the page you were looking for.</p>
      <p>Go back to the <Link href='/'><span className='font-bold underline'>dashboard</span></Link></p>
    </div>
  )
}

export default NotFound