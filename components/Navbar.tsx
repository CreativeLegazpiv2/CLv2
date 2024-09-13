"use client";

import Image from 'next/image';
// import {useState, useEffect} from 'react';

const navbar = () => {
  return (
    <div className="flex justify-between max-w-screen h-20 mb-16 ml-6 pt-5 pb-5 bg-orange-200 rounded-bl-2xl z-10 relative overflow-x-hidden">
      <div className="w-auto h-15 mx-5 flex gap-2">
          <Image className="object-contain min-h-10 min-w-20" 
              src="/assets/images/Creative_Legazpi_LogoOutline-b.svg" 
              alt="Creative Legazpi Logo"
              width={100}
              height={50}/>
      </div>

      <div className="mr-5 text-black font-semibold">
          <a href="#" className="mx-5 my-3">HOME</a>
          <a href="#" className="mx-5 my-3">DIRECTORY</a>
          <a href="#" className="mx-5 my-3">GALLERY</a>
          <br className="md:hidden"/>
          <a href="#" className="mx-5 my-3">FAQ</a>
          <a href="#" className="mx-5 my-3">LOG IN</a>
          <a href="#" className="mx-5 my-3 bg-green-300 rounded-xl px-5 py-1">Join Mukna</a>
      </div>
  </div>
  )
}

export default navbar