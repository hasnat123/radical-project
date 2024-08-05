import { Suspense} from 'react';
import BookList from '../components/BookList';
import Searchbar from '../components/Searchbar';
import Loading from '../loading';

const Page = ({ searchParams }: { searchParams: { query?: string } }): JSX.Element => {

    return (
      <div className='w-full max-w-[700px] lg:max-w-[949px]'>
        <h2 className='text-[22px] font-bold text-primary mb-[55px]'>Favourites</h2>

        <Searchbar favourites/>

        <Suspense fallback={<Loading />}>
          <BookList searchParams={searchParams} favourites/>
        </Suspense>

      </div>
    )
  }

export default Page