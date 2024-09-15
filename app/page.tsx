// pages/index.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NextPage } from 'next';

const LandingPage: NextPage = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Fixed background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/assets/images/Clip%20path%20group.svg')` }}
      />
      
      {/* Adjustable container for overlay and button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
         <div className="relative w-[1100px] h-[700px]"> {/* Explicit size here */}
            <Image
              src="/assets/images/image%201.svg"
              alt="Welcome to Creative Legazpi"
              layout="fill"
              objectFit="contain"
            />
          </div>
          
          {/* Image Button container */}
          <div className="absolute inset-x-0 bottom-12 flex justify-center pb-8">
            <Link href="/register-form">
            <div className="inline-block w-[1000px] h-[70px] relative hover:opacity-80 transition duration-300">
                <Image
                  src="/assets/images/image.svg"
                  alt="REGISTER HERE"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;