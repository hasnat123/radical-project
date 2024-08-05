'use client'

import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Book } from '@/types';

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';

interface ApiResponse
{
    message: string;
}

interface Errors {
    price?: string;
    rating?: string;
  }

const Page = ({ params }: { params: Params }): JSX.Element => {

    const [book, setBook] = useState<Book | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [inputErrors, setInputErrors] = useState<Errors>({});
    
    const [price, setPrice] = useState<number | string | null>(null)
    const [rating, setRating] = useState<number | null>(null)
    const [hover, setHover] = useState<number>(0)

    const router = useRouter()

      useEffect(() => {
        if (params.id) {
          (async function(): Promise<void>
          { 
            try {
                  setLoading(true)
                  const res = await axios.get<Book>(`http://localhost:3000/api/favourites/${params.id}`)
                  console.log(res)
                  setBook(res.data)
                  setPrice(res.data.price)
                  setRating(res.data.rating)
            } catch (error) {
                  setError('Failed to load book details.');
                  console.log(error)
            } finally {
                  setLoading(false)
            }
          })();
        }
      }, [params.id]);
    
      if (loading) return <Loading />;

      const HandleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
      
        try {
          const res = await axios.put<ApiResponse>(
            `/api/favourites/${params.id}`,
            { price, rating }
          );
          console.log('success:', res.data.message);
          router.push('/favourites');
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 422) {
              // Validation errors
              setInputErrors(error.response.data.errors);
            } else {
              // Other errors
              console.error('Error:', error.response.data);
              // You might want to set a general error message here
            }
          } else {
            console.error('An unexpected error occurred:', error);
          }
          setLoading(false);
        }
      };

  return (
    <div className='w-full max-w-[949px]'>

        {error && <p>{error}</p>}

        {book?.title ? (

            <>
                <div className='relative flex justify-center items-center w-full h-[221px] px-4 lg:px-6 bg-banner after:absolute after:left-0 after:top-0 after:right-0 after:bottom-0 after:bg-[#444444] after:opacity-60'>
                    <h2 className='flex flex-col lg:inline-block relative z-10 text-[30px] md:text-[36px] xl:text-[43px] text-white text-center truncate'><span className='uppercase font-bold'>{book.title}</span> <span className='hidden lg:inline-block'>by</span> <span className='truncate'>{book.author ?? 'unknown author'}</span></h2>
                </div>
                <h3 className='my-[52px] text-primary text-[22px] font-bold'>Edit</h3>
                <form onSubmit={HandleSubmit} className='flex flex-col items-center lg:items-start'>
                    <label className='flex items-center w-full max-w-[496px] h-[52px] bg-white'>
                        <span className='flex justify-center items-center min-w-[115px] h-full text-white text-center bg-secondary'>Cost</span>
                        <input
                        type="number"
                        placeholder='Enter a price'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price ?? ''}
                        className='w-full h-full outline-none px-[25px] font-bold text-primary'
                        />
                    </label>

                    <p className='mt-3 text-red-500'>{inputErrors.price}</p>

                    <label className='flex items-center w-full max-w-[496px] h-[52px] mt-[41px] bg-white'>
                        <span className='flex justify-center items-center min-w-[115px] h-full text-white text-center bg-secondary'>Rating</span>
                        <div className='flex pl-[25px]'>
                            {[...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                    <span
                                    key={index}
                                    className='text-white mr-[3px]'
                                    onClick={() => setRating(starValue)}
                                    onMouseEnter={() => setHover(starValue)}
                                    onMouseLeave={() => setHover(0)}
                                    >
                                        {starValue <= (hover || (rating ?? 0)) ?
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

                    </label>

                    <p className='mt-3 text-red-500'>{inputErrors.rating}</p>

                    <button type="submit" className='w-[218px] h-[52px] mt-[41px] font-bold text-white rounded-[41px] bg-gradient-to-t from-[#4072EE] to-[#679CF6] uppercase'>UPDATE</button>
                </form>

                <Link href="/favourites">
                    <div className='flex items-center mt-[75px]'>
                        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M23.169 6.1134C23.169 6.52762 22.8333 6.8634 22.419 6.8634L1.14789 6.86341C0.733673 6.86341 0.397886 6.52762 0.397886 6.11341C0.397886 5.69919 0.733673 5.36341 1.14789 5.36341L22.419 5.3634C22.8333 5.3634 23.169 5.69919 23.169 6.1134Z" fill="#454664"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.20323 11.5305C5.91034 11.8233 5.43547 11.8233 5.14257 11.5305L0.219662 6.60753C0.0790095 6.46688 -8.10795e-06 6.27611 -7.6485e-06 6.0772C-6.71222e-06 5.87829 0.0790119 5.68752 0.219665 5.54687L5.14262 0.623975C5.43551 0.331083 5.91038 0.331086 6.20328 0.623981C6.49617 0.916876 6.49616 1.39175 6.20327 1.68464L1.81066 6.07721L6.20323 10.4698C6.49613 10.7627 6.49613 11.2376 6.20323 11.5305Z" fill="#454664"/>
                        </svg>
                        <span className='text-primary ml-[15px] mr-[4px]'>Return to:</span><span className='text-secondary'>Favourites</span>
                    </div>
                </Link>
            </>

        ) : (
          <p>Book not added to favourites.</p>
        )}

    </div>
  )
}

export default Page