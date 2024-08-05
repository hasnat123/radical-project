// 'use client'

// import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
// import axios from 'axios';
// import Card from '../../components/Card';
// import { ApiResponse, Book } from '@/types';
import Searchbar from '@/app/components/Searchbar';
import BookList from '@/app/components/BookList';
import Loading from '@/app/loading';

// export async function generateStaticParams()
// {
//   const res = await fetch('http://localhost:4000/tickets')
//   const tickets = await res.json()

//   return tickets.map((ticket) =>
//   ({
//     id: ticket.id
//   }))
// }

const Page = ({ searchParams }: { searchParams: { query?: string } }): JSX.Element => {
  
    // const searchParams = useSearchParams()
    // const query = searchParams.get('query')
    
    // const [books, setBooks] = useState<Book[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);
  
    // const [search, setSearch] = useState<string>('')

    // const router = useRouter()

    // useEffect(() => {
    //   if (query) {
    //     (async function(): Promise<void>
    //     { 
    //       try {
    //             setLoading(true)
    //             const res = await axios.get<Book[]>(`http://localhost:8000/api/search?query=${query}`)
    //             console.log(res)
    //             setBooks(res.data)
    //       } catch (error) {
    //             setError('Failed to load books.');
    //             console.log(error)
    //       } finally {
    //         setLoading(false)
    //       }
    //     })();

    //   }
    // }, [query]);

    // const HandleSubmit = (e: FormEvent<HTMLFormElement>) =>
    // {
    //   e.preventDefault();
    //   if (search.trim()) {
    //     router.push(`/bestsellers/search?query=${search}`);
    //   }
    // };

    // const HandleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //   setSearch(e.target.value);
    // };

    // if (loading) return <p>Loading...</p>;
  
    return (
      <div className='w-full max-w-[700px] lg:max-w-[949px]'>
        <Searchbar favourites={false}/>

        <Suspense fallback={<Loading />}>
          <BookList searchParams={searchParams} favourites={false}/>
        </Suspense>
      </div>
    );
  };

export default Page