import { Suspense } from 'react';
import Searchbar from '@/app/components/Searchbar';
import BookList from '@/app/components/BookList';
import Loading from '@/app/loading';

const Page = ({ searchParams }: { searchParams: { query?: string } }): JSX.Element => {

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