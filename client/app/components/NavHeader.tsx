"use client";

import { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Navbar from './Navbar';

const NavHeader: React.FunctionComponent = (): JSX.Element => {
    const [navOpen, setNavOpen] = useState<boolean>(false)

    return (
    <div>
        <Header navOpen={navOpen} setNavOpen={setNavOpen}/>
        <Navbar navOpen={navOpen} setNavOpen={setNavOpen}/>
    </div>
  );
};

export default NavHeader;