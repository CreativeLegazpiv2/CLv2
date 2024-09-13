"use client";

import Image from 'next/image';
// import {useState, useEffect} from 'react';

const navbar = () => {
  return (
    <nav class="flex justify-between w-full h-20 mb-16 pt-3 bg-orange-200 ml-6 rounded-bl-2xl">
        <div class="w-auto h-15 mx-5 flex gap-2">
            <Image class="object-contain" src="/assets/images/Creative_Legazpi_LogoOutline-b.svg" 
            alt="Creative Legazpi Logo"
            width={100}
            height={50}/>
        </div>
        <div class="mr-5 text-black font-semibold ">
            <a href="#" class="mx-5">HOME</a>
            <a href="#" class="mx-5 my-2">DIRECTORY</a>
            <a href="#" class="mx-5 my-2">GALLERY</a>
            <a href="#" class="mx-5 my-2">FAQ</a>
            <a href="#" class="mx-5 my-2">LOG IN</a>
            <a href="#" class="mx-5 my-2 bg-green-300 rounded-xl px-5 py-1">Join Mukna</a>
        </div>
    </nav>
  )
}

export default navbar