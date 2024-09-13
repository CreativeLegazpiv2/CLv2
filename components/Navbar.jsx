"use client";

import Image from 'next/image';
// import {useState, useEffect} from 'react';

const navbar = () => {
  return (
    <nav className="flex justify-between w-full h-20 mb-16 pt-5 pb-5 bg-orange-200 ml-6 rounded-bl-2xl">
        <div className="w-auto h-15 mx-5 flex gap-2">
            <Image className="object-contain min-h-10 min-w-20" src="/assets/images/Creative_Legazpi_LogoOutline-b.svg" 
            alt="Creative Legazpi Logo"
            width={100}
            height={50}/>
        </div>
    
        <div className="mr-5 text-black font-semibold">
            <a href="#" className="mx-5">HOME</a>
            <a href="#" className="mx-5 my-2">DIRECTORY</a>
            <a href="#" className="mx-5 my-2">GALLERY</a>
            <br className="md:hidden"/>
            <a href="#" className="mx-5 my-2">FAQ</a>
            <a href="#" className="mx-5 my-2">LOG IN</a>
            <a href="#" className="mx-5 my-2 bg-green-300 rounded-xl px-5 py-1">Join Mukna</a>
        </div>
    </nav>
  )
}

export default navbar