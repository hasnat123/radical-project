
import { Suspense } from 'react';

import Searchbar from '@/app/components/Searchbar';
import BookList from '../../components/BookList';
import Loading from '@/app/loading';


const Page = ({ searchParams }: { searchParams: { query?: string } }): JSX.Element => {

    return (
      <div className='w-full max-w-[700px] lg:max-w-[949px]'>
        <Searchbar favourites/>

        <Suspense fallback={<Loading />}>
          <BookList searchParams={searchParams} favourites/>
        </Suspense>
      </div>
    );
  };

export default Page