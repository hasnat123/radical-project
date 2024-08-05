import { Suspense} from "react";

//Components
import Searchbar from "../components/Searchbar";
import BookList from "../components/BookList";
import Loading from "../loading";

const Page = ({ searchParams }: { searchParams: { query?: string } }) => {

  return (
    <div className='w-full max-w-[700px] lg:max-w-[949px]'>
      <h2 className='text-[22px] font-bold text-primary mb-[55px]'>New York Times Bestsellers</h2>
      
      <Searchbar favourites={false}/>

      <Suspense fallback={<Loading />}>
          <BookList searchParams={searchParams} favourites={false}/>
      </Suspense>

    </div>

  );
}

export default Page
