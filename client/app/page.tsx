import Link from "next/link";
import Image from "next/image";

import Searchbar from "./components/Searchbar";

import { HomePage1, HomePage2, HomePage3, HomePage4, HomePage5, HomePage6 } from '@/public/images/index'

export default function Home() {

  return (
    <>
      <Searchbar favourites={false}/>

      <div className="mt-[33px]">
        <Link href='/bestsellers'><h2 className="relative inline-block font-bold text-[22px] text-primary after:w-full after:h-[2px] after:bg-primary after:absolute after:hidden hover:after:block after:left-0 after:bottom-[-2px]">New York Times Bestsellers</h2></Link>
        <ul className="flex flex-col sm:flex-row gap-[20px] lg:gap-[43px] mt-[17px] mb-[47px]">
          <li><Image src={HomePage1} alt="homepage-pic-1" /></li>
          <li><Image src={HomePage2} alt="homepage-pic-2" /></li>
          <li><Image src={HomePage3} alt="homepage-pic-3" /></li>
        </ul>

        <Link href='/favourites'><h2 className="relative inline-block font-bold text-[22px] text-primary after:w-full after:h-[2px] after:bg-primary after:absolute after:hidden hover:after:block after:left-0 after:bottom-[-2px]">Favourites</h2></Link>
        <ul className="flex flex-col sm:flex-row gap-[20px] lg:gap-[43px] mt-[17px]">
          <li><Image src={HomePage4} alt="homepage-pic-4" /></li>
          <li><Image src={HomePage5} alt="homepage-pic-5" /></li>
          <li><Image src={HomePage6} alt="homepage-pic-6" /></li>
        </ul>
      </div>

    </>
  );
}
