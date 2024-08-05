import Card from '@/app/components/Card'
import { Book, PaginatedBooks } from '@/types'
import axios from 'axios'
import React from 'react'

const GetBooks = async (searchParams: { query?: string }, favourites: boolean): Promise<Book[]> =>
    {
        // const url = favourites ? new URL('api/favourites', 'http://localhost:3000') : (searchParams.query ? new URL('api/bestsellers/search', 'http://localhost:3000/') : new URL('api/bestsellers', 'http://localhost:3000'))

        // if (searchParams.query) {
        //     if (typeof searchParams.query === 'string') {
        //         url.searchParams.set('query', searchParams.query);
        //     } else if (Array.isArray(searchParams.query)) {
        //         // If it's an array, use the first value
        //         url.searchParams.set('query', searchParams.query[0]);
        //     }
        // }

        const baseUrl = 'http://localhost:3000';
        const url = favourites ? `${baseUrl}/api/favourites` : (searchParams.query ? `${baseUrl}/api/bestsellers/search` : `${baseUrl}/api/bestsellers`);

        // if (searchParams.query) {
        //   url.searchParams.set('query', searchParams.query);
        // }

        // const res = await fetch(url,
        // {
        //     next:
        //     {
        //         revalidate: 0
        //     }
        // })

        // if (!res.ok) {
        //     throw new Error(`Failed to load ${favourites ? 'favourites' : 'bestsellers'}.`);
        // }

        // return res.json()

            try {
              const response = await axios.get(url, {
                  params: searchParams.query ? { query: searchParams.query } : {},
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });

              return response.data;
            } catch (error) {
                console.error(`Failed to load ${favourites ? 'favourites' : 'bestsellers'}:`, error);
                throw new Error(`Failed to load ${favourites ? 'favourites' : 'bestsellers'}.`);
            }
    }
  
  async function BookList({ searchParams, favourites }: { searchParams: { query?: string }, favourites: boolean }) {

    let books: Book[] = []

      try {
        const res: Book[] = await GetBooks(searchParams, favourites);
        books = res;
        console.log(res)
      } catch (error: any) {
        console.error(error);
        return (
          <div className='flex justify-center items-center h-[190px]'>
            <p className='text-[20px] font-bold text-primary'>Failed to load {favourites ? 'favourites' : 'bestsellers'}. Please try again later.</p>
          </div>
        );
      }

      return (
        <>
            {(books.length > 0 && searchParams.query) && <h2 className='text-[22px] font-bold text-primary mb-[55px]'>Showing results for &quot;{Array.isArray(searchParams.query) ? searchParams.query[0] : searchParams.query}&quot;</h2>}

            <ul className="w-full max-w-[949px]">
                {books.map((book: Book) =>
                (
                    <li key={book.id} >
                        <Card book={book} favourites={favourites}/>
                    </li>
                ))}
                {books.length === 0 &&
                (
                    searchParams.query ?
                        (<h2 className='text-[22px] font-bold text-primary mb-[55px]'>No results for &quot;{Array.isArray(searchParams.query) ? searchParams.query[0] : searchParams.query}&quot;</h2>) :
                        (<h2 className='text-[22px] font-bold text-primary mb-[55px]'>You haven&apos;t added any favourites</h2>)
                )}
            </ul>
        </>
      )
  }

export default BookList