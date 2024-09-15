'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();
  const [isOpened, setIsOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpened(true);
  };

  const handleConfirmInvitation = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      router.push('/register-form');
    }, 1000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1A1A1A]">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/assets/images/Clip%20path%20group.svg')` }}
      />

      {/* Black Overlay for Highlighting */}
      {isOpened && (
        <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-500"></div>
      )}

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <motion.div 
          className="relative w-full max-w-[600px] h-[80vh] max-h-[500px] flex items-center justify-center" 
          initial={{ y: 0 }} 
          animate={{ y: [-10, 10, -10] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Envelope Container */}
          <div 
            className="relative w-full h-full max-w-[600px] max-h-[350px] bg-[#695C5C] flex justify-center items-end z-10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Logo Positioned Above Lid One */}
            <motion.div 
              className="absolute top-4 sm:top-14 left-0 w-full h-full flex items-start justify-center z-40 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: isOpened ? 0 : 1 }}
              transition={{ duration: 1 }}
            >
              <div className="relative w-[120px] h-[50px] sm:w-[150px] sm:h-[60px]">
                <Image
                  src="/assets/images/logo.png"
                  alt="Envelope Logo"
                  layout="fill"
                  objectFit="contain"
                  priority={true}
                />
              </div>
            </motion.div>

            {/* Envelope Lid One */}
            <div
              className={`absolute top-0 left-0 w-full h-full border-r-[50vw] border-b-[25vw] border-l-[50vw] sm:border-r-[300px] sm:border-b-[175px] sm:border-l-[300px] border-transparent border-t-[25vw] sm:border-t-[175px] border-t-[#E0E0E0] transition-transform duration-250 ease-linear origin-top z-30 ${
                isOpened ? 'rotate-x-90 delay-[0ms]' : 'rotate-x-0 delay-[750ms]'
              }`}
            >
            </div>

            {/* Lid Two */}
            <div
              className={`absolute top-0 left-0 w-full h-full border-r-[50vw] border-b-[25vw] border-l-[50vw] sm:border-r-[300px] sm:border-b-[175px] sm:border-l-[300px] border-transparent border-t-[25vw] sm:border-t-[175px] border-t-[#E0E0E0] transition-transform duration-250 ease-linear origin-top z-10 ${
                isOpened ? 'rotate-x-180 delay-[250ms]' : 'rotate-x-90 delay-[500ms]'
              }`}
            ></div>

            {/* Envelope */}
            <div className="absolute top-0 left-0 w-full h-full border-t-[25vw] border-r-[50vw] border-b-[25vw] border-l-[50vw] sm:border-t-[175px] sm:border-r-[300px] sm:border-b-[175px] sm:border-l-[300px] border-transparent border-r-[#695C5C] border-b-[#695C5C] border-l-[#695C5C] z-30"></div>

            {/* Letter - Pop Out Effect */}
            <motion.div 
              className={`absolute top-[-15%] w-[90%] h-[80%] bg-white rounded-[15px] z-50 shadow-lg transition-transform duration-500 ease-linear flex flex-col items-center justify-start pt-4 pb-4 sm:pt-6 px-4 sm:px-6 overflow-y-auto`}
              animate={isOpened ? { y: -80, opacity: 1 } : { y: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Adjusted Logo Size */}
              <div className="relative w-[300px] h-[110px] sm:w-[350px] sm:h-[130px] mb-2 sm:mb-4">
                <Image
                  src="/assets/images/logo.png"
                  alt="Creative Legazpi Logo"
                  layout="fill"
                  objectFit="contain"
                  priority={true}
                />
              </div>
              {/* Invitation Text */}
              <p className="text-[#403737] font-bold text-sm sm:text-base text-center">
                You Are Invited!
              </p>
              <p className="text-[#403737] font-medium text-xs sm:text-xs text-center mt-2">
                We are thrilled to extend a special invitation to join the Creative Legazpi community. Unlock exclusive content, collaborate with creative minds, and be part of something extraordinary!
              </p>
              <p className="text-[#403737] text-xs sm:text-xs text-center mt-4 italic">
                Click the button below to accept your invitation and become a valued member of Creative Legazpi.
              </p>
              
              {/* Confirm Button */}
              <button
                className="bg-[#403737] font-bold text-white px-4 sm:px-6 py-2 mt-4 sm:mt-6 rounded-full shadow-md hover:bg-[#5b4d4d] transition-colors duration-300 text-xs sm:text-sm"
                onClick={handleConfirmInvitation}
              >
                Confirm and Proceed
              </button>
            </motion.div>

            {/* Register Button */}
            <div className="absolute -bottom-16 sm:bottom-10 w-full flex justify-center z-40">
              <motion.button
                className="bg-[#403737] font-bold text-white px-6 sm:px-10 py-2 sm:py-3 rounded-full shadow-md hover:bg-[#5b4d4d] transition-colors duration-300 text-xs sm:text-sm"
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenEnvelope}
              >
                Accept Invitation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LandingPage;
