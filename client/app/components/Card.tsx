'use client'

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';
import { Book } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CardProps {
  book: Book;
  favourites: Boolean;
}

interface ApiResponse
{
    message: string;
}


const Card: React.FunctionComponent<CardProps> = ({ book, favourites }): JSX.Element => {

    const [favourited, setFavourited] = useState(!(book.favourited === false))

    const HandleToggleFavourite = async (): Promise<void> =>
    {
        try {
            const res = await axios.post<ApiResponse>('http://localhost:3000/api/favourites', { id: book.id, title: book.title, author: book.author ?? 'Unknown author' })
            console.log('success:', res.data.message)
            setFavourited(!favourited)
        } catch (error) {
            console.log(error)
        }
    }

    const HandleDeleteFavourite = async (): Promise<void> =>
      {
          try {
              const res = await axios.delete<ApiResponse>(`http://localhost:3000/api/favourites/${book.id}`)
              console.log('success:', res.data.message)
              window.location.reload()
          } catch (error) {
              console.log(error)
          }
      }

  return (
    <div className='flex flex-col lg:flex-row justify-between items-center w-full gap-6 lg:gap-0 lg:h-[52px] mb-[17px] p-[18px] lg:py-0 bg-white'>
      <div className='flex justify-center lg:justify-start items-center w-full lg:w-[50%]'>
        <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg" className='hidden lg:inline-block'>
          <path d="M10 2.25278C11.1679 1.47686 12.7535 1 14.5 1C16.2465 1 17.8321 1.47686 19 2.25278V15.2528C17.8321 14.4769 16.2465 14 14.5 14C12.7535 14 11.1679 14.4769 10 15.2528M10 2.25278V15.2528V2.25278ZM10 2.25278C8.8321 1.47686 7.24649 1 5.5 1C3.75351 1 2.16789 1.47686 1 2.25278V15.2528C2.16789 14.4769 3.75351 14 5.5 14C7.24649 14 8.8321 14.4769 10 15.2528V2.25278Z" stroke="#93B4BC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3 className='flex flex-col lg:flex-row items-center lg:ml-[14px] truncate max-w-[325px] xl:max-w-[380px]'><span className='text-[16px] font-bold text-primary mr-1 uppercase truncate'>{book.title}</span><span className=''><span className='hidden lg:inline-block'>by</span> {book.author ? book.author : 'unknown author'}</span></h3>
      </div>
      <div className='flex flex-col lg:flex-row justify-between items-center gap-[20px] w-full lg:w-[50%]'>
          <div className='flex'>
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                  <span
                    key={index}
                    className='text-white mr-[3px]'
                  >
                      {starValue <= (book.rating ?? 0) ? 
                      (
                        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.29168 0.591437L6.02432 4.98754L0.951406 5.69476C0.0416832 5.82094 -0.3229 6.8934 0.336822 7.50766L4.00696 10.9276L3.13891 15.7586C2.98266 16.6319 3.94446 17.286 4.75002 16.8776L9.28821 14.5965L13.8264 16.8776C14.632 17.2827 15.5938 16.6319 15.4375 15.7586L14.5695 10.9276L18.2396 7.50766C18.8993 6.8934 18.5347 5.82094 17.625 5.69476L12.5521 4.98754L10.2847 0.591437C9.87849 -0.192157 8.70141 -0.202118 8.29168 0.591437Z" fill="#E08D3A"/>
                        </svg>

                      ) :
                      (
                        <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.29168 0.591437L6.02432 4.98754L0.951406 5.69476C0.0416832 5.82094 -0.3229 6.8934 0.336822 7.50766L4.00696 10.9276L3.13891 15.7586C2.98266 16.6319 3.94446 17.286 4.75002 16.8776L9.28821 14.5965L13.8264 16.8776C14.632 17.2827 15.5938 16.6319 15.4375 15.7586L14.5695 10.9276L18.2396 7.50766C18.8993 6.8934 18.5347 5.82094 17.625 5.69476L12.5521 4.98754L10.2847 0.591437C9.87849 -0.192157 8.70141 -0.202118 8.29168 0.591437Z" fill="#ffffff" stroke='#CCCCCC'/>
                        </svg>
                      )} 
                  </span>
                );
            })}
          </div>

        <span className='font-bold text-primary'>{book.price && `${book.price} GBP`}</span>
        
        <div className={`flex ${favourites ? 'justify-between' : 'justify-end'} lg:gap-[30px] self-start lg:self-center w-full lg:w-auto mt-4 lg:mt-0`}>
          {favourites &&
          (
            <div className='flex gap-[30px]'>
              <Link href={`/favourites/${book.id}/edit`}>
                <span>Edit</span>
              </Link>
              
              <span className='cursor-pointer' onClick={HandleDeleteFavourite}>Delete</span>
            </div>
          )}

          {favourites ?
          (
            <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {favourited ? 
                (<path d="M2.44591 5.61617C2.7403 4.90546 3.17179 4.2597 3.71574 3.71575C4.2597 3.17179 4.90546 2.7403 5.61617 2.44591C6.32688 2.15152 7.08862 2 7.85789 2C8.62715 2 9.38889 2.15152 10.0996 2.44591C10.8103 2.7403 11.4561 3.17179 12 3.71575L13.7157 5.43144L15.4314 3.71575C16.53 2.61718 18.02 2.00001 19.5736 2.00001C21.1272 2.00001 22.6171 2.61718 23.7157 3.71575C24.8143 4.81431 25.4314 6.30428 25.4314 7.85789C25.4314 9.41149 24.8143 10.9015 23.7157 12L13.7157 22L3.71574 12C3.17179 11.4561 2.7403 10.8103 2.44591 10.0996C2.15152 9.38889 2 8.62715 2 7.85789C2 7.08862 2.15152 6.32688 2.44591 5.61617Z" fill="#93B4BC" stroke="#93B4BC" strokeWidth="2.60348" strokeLinecap="round" strokeLinejoin="round"/>) :
                (<path d="M2.44591 5.61617C2.7403 4.90546 3.17179 4.2597 3.71574 3.71575C4.2597 3.17179 4.90546 2.7403 5.61617 2.44591C6.32688 2.15152 7.08862 2 7.85789 2C8.62715 2 9.38889 2.15152 10.0996 2.44591C10.8103 2.7403 11.4561 3.17179 12 3.71575L13.7157 5.43144L15.4314 3.71575C16.53 2.61718 18.02 2.00001 19.5736 2.00001C21.1272 2.00001 22.6171 2.61718 23.7157 3.71575C24.8143 4.81431 25.4314 6.30428 25.4314 7.85789C25.4314 9.41149 24.8143 10.9015 23.7157 12L13.7157 22L3.71574 12C3.17179 11.4561 2.7403 10.8103 2.44591 10.0996C2.15152 9.38889 2 8.62715 2 7.85789C2 7.08862 2.15152 6.32688 2.44591 5.61617Z" stroke="#B8C5D3" strokeWidth="2.60348" strokeLinecap="round" strokeLinejoin="round"/>)
              }
            </svg>
          ) :
          (
            <svg className='cursor-pointer' onClick={HandleToggleFavourite} width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {favourited ? 
                (<path d="M2.44591 5.61617C2.7403 4.90546 3.17179 4.2597 3.71574 3.71575C4.2597 3.17179 4.90546 2.7403 5.61617 2.44591C6.32688 2.15152 7.08862 2 7.85789 2C8.62715 2 9.38889 2.15152 10.0996 2.44591C10.8103 2.7403 11.4561 3.17179 12 3.71575L13.7157 5.43144L15.4314 3.71575C16.53 2.61718 18.02 2.00001 19.5736 2.00001C21.1272 2.00001 22.6171 2.61718 23.7157 3.71575C24.8143 4.81431 25.4314 6.30428 25.4314 7.85789C25.4314 9.41149 24.8143 10.9015 23.7157 12L13.7157 22L3.71574 12C3.17179 11.4561 2.7403 10.8103 2.44591 10.0996C2.15152 9.38889 2 8.62715 2 7.85789C2 7.08862 2.15152 6.32688 2.44591 5.61617Z" fill="#93B4BC" stroke="#93B4BC" strokeWidth="2.60348" strokeLinecap="round" strokeLinejoin="round"/>) :
                (<path d="M2.44591 5.61617C2.7403 4.90546 3.17179 4.2597 3.71574 3.71575C4.2597 3.17179 4.90546 2.7403 5.61617 2.44591C6.32688 2.15152 7.08862 2 7.85789 2C8.62715 2 9.38889 2.15152 10.0996 2.44591C10.8103 2.7403 11.4561 3.17179 12 3.71575L13.7157 5.43144L15.4314 3.71575C16.53 2.61718 18.02 2.00001 19.5736 2.00001C21.1272 2.00001 22.6171 2.61718 23.7157 3.71575C24.8143 4.81431 25.4314 6.30428 25.4314 7.85789C25.4314 9.41149 24.8143 10.9015 23.7157 12L13.7157 22L3.71574 12C3.17179 11.4561 2.7403 10.8103 2.44591 10.0996C2.15152 9.38889 2 8.62715 2 7.85789C2 7.08862 2.15152 6.32688 2.44591 5.61617Z" stroke="#B8C5D3" strokeWidth="2.60348" strokeLinecap="round" strokeLinejoin="round"/>)
              }
            </svg>
          )}
        </div>

      </div>
    </div>
  )
}

export default Card