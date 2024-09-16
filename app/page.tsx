'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Define a type for sparkles
type Sparkle = {
  id: number;
  x: number;
  y: number;
};

const LandingPage = () => {
  const router = useRouter();
  const [isOpened, setIsOpened] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State to manage sparkle effect on cursor
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<Sparkle[]>([]); // Initialize with the correct type

  useEffect(() => {
    // Create sparkle effect on cursor move
    const handleMouseMove = (e: MouseEvent) => { // Explicitly typed as MouseEvent
      setCursorPosition({ x: e.clientX, y: e.clientY });
      createSparkle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const createSparkle = (x: number, y: number) => { // Explicitly typed x and y as numbers
    const sparkleId = Date.now();
    setSparkles((prev: Sparkle[]) => [...prev, { id: sparkleId, x, y }]); // Correctly typed state update

    // Remove sparkle after 1 second
    setTimeout(() => {
      setSparkles((prev: Sparkle[]) => prev.filter((sparkle) => sparkle.id !== sparkleId)); // Correctly typed state update
    }, 1000);
  };

  const handleOpenEnvelope = () => {
    setIsOpened(true);
  };

  const handleConfirmInvitation = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsConfirmed(true);
      setIsLoading(false);
      router.push('/register-form');
    }, 2000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0D0D0D] cursor-none"> {/* Custom cursor */}
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/assets/images/Clip%20path%20group.svg')` }}
      />
      
      {/* Darker Black Overlay for Highlighting */}
      <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity duration-500"></div>

      {/* Top-Left Corner Images */}
      <div className="absolute top-4 left-4 flex space-x-4 z-50">
        <div className="w-16 h-16 md:w-24 md:h-24">
          <Image
            src="/assets/logo/malikhaingpinoy.png" // Replace with actual path
            alt="Malikhain Pinoy Logo"
            layout="responsive"
            width={200}
            height={200}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-16 h-16 md:w-24 md:h-24">
          <Image
            src="/assets/logo/lungsod.png" // Replace with actual path
            alt="Lungsod Logo"
            layout="responsive"
            width={100}
            height={100}
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      {/* Sparkle Effect Elements */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute w-2 h-2 bg-white rounded-full pointer-events-none"
          style={{
            top: sparkle.y,
            left: sparkle.x,
            boxShadow: '0 0 8px 4px #fff',
            animation: 'sparkle 1s linear infinite',
          }}
        />
      ))}

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <motion.div 
          className="relative w-full max-w-[600px] h-[80vh] max-h-[500px] flex items-center justify-center" 
          initial={{ y: 0 }} 
          animate={{ y: [-10, 10, -10] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Envelope Container with Glowing Effect */}
          <div 
            className="relative w-full h-full max-w-[600px] max-h-[350px] bg-[#695C5C] flex justify-center items-end z-10 shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Red Mark Image at the Center of the Envelope */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <Image
                src="/assets/images/redot.png"
                alt="Red Mark"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>

            {/* Logo Positioned Above Lid One */}
            <motion.div 
              className="absolute top-4 sm:top-14 left-0 w-full h-full flex items-start justify-center z-40 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: isOpened ? 0 : 1 }}
              transition={{ duration: 1 }}
            >
              <div className="relative w-[120px] h-[50px] sm:w-[150px] sm:h-[60px]">
                <Image
                  src="/assets/images/whitelogo.png"
                  alt="Envelope Logo"
                  layout="fill"
                  objectFit="contain"
                  priority={true}
                />
              </div>
            </motion.div>

            {/* Envelope Lid One */}
            <div
              className={`absolute top-0 left-0 w-full h-full border-r-[50vw] border-b-[25vw] border-l-[50vw] sm:border-r-[300px] sm:border-b-[175px] sm:border-l-[300px] border-transparent border-t-[25vw] sm:border-t-[175px] border-t-[#695C5C] transition-transform duration-250 ease-linear origin-top z-30 ${isOpened ? 'rotate-x-90 delay-[0ms]' : 'rotate-x-0 delay-[750ms]'}`
              }
            ></div>

            {/* Lid Two */}
            <div
              className={`absolute top-0 left-0 w-full h-full border-r-[50vw] border-b-[25vw] border-l-[50vw] sm:border-r-[300px] sm:border-b-[175px] sm:border-l-[300px] border-transparent border-t-[25vw] sm:border-t-[175px] border-t-[#ffffff] transition-transform duration-250 ease-linear origin-top z-10 ${isOpened ? 'rotate-x-180 delay-[250ms]' : 'rotate-x-90 delay-[500ms]'}`
              }
            ></div>

            {/* Envelope */}
            <div className="absolute top-0 left-0 w-full h-full border-t-[25vw] border-r-[50vw] border-b-[25vw] border-l-[50vw] sm:border-t-[175px] sm:border-r-[300px] sm:border-b-[175px] sm:border-l-[300px] border-transparent border-r-[#ffffff] border-b-[#ffffff] border-l-[#E0E0E0] z-30"></div>

            {/* Letter - Pop Out Effect */}
            <motion.div 
              className={`absolute top-[-15%] w-[90%] h-[80%] bg-white rounded-[15px] z-50 shadow-lg transition-transform duration-500 ease-linear flex flex-col items-center justify-start pt-4 pb-4 sm:pt-6 px-4 sm:px-6 overflow-y-auto ${isOpened ? 'block' : 'hidden'}`}
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
              
              {/* Confirm Button with Loading Animation */}
              <button
                className="bg-[#403737] font-bold text-white px-4 sm:px-6 py-2 mt-4 sm:mt-6 rounded-full shadow-md hover:bg-[#5b4d4d] transition-colors duration-300 text-xs sm:text-sm flex items-center justify-center"
                onClick={handleConfirmInvitation}
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? (
                  <div className="loader border-t-transparent border-solid border-white border-4 rounded-full w-4 h-4 animate-spin"></div> // Loading spinner
                ) : (
                  'Confirm and Proceed'
                )}
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

      {/* Footer with Partner Logos and Social Media Links */}
      <footer className="absolute bottom-0 left-0 right-0 text-white flex justify-between mr-10 ml-10 items-center p-4">
        {/* Partner Logos */}
        <div className="flex items-center space-x-6">
          <Image src="/assets/logo/dti.png" alt="DTI Logo" width={50} height={50} />
          <Image src="/assets/logo/lcci.png" alt="LCCI Logo" width={50} height={50} />
          <Image src="/assets/logo/legs.png" alt="City Logo" width={50} height={50} />
          <Image src="/assets/logo/qb.png" alt="Partner Logo" width={50} height={50} />
        </div>

        {/* Social Media Links */}
        <div className="flex items-center space-x-4">
          <a href="https://www.facebook.com/your-page" target="_blank" rel="noopener noreferrer">
            <Image src="/assets/icons/fb.svg" alt="Facebook" width={24} height={24} /> 
          </a>
          <a href="https://www.instagram.com/your-page" target="_blank" rel="noopener noreferrer">
            <Image src="/assets/icons/ig.svg" alt="Instagram" width={24} height={24} />
          </a>
          <p className="text-sm">@creativelegazpi</p>
        </div>
      </footer>

      {/* Custom Cursor Sparkle */}
      <div
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50"
        style={{
          top: cursorPosition.y - 8,
          left: cursorPosition.x - 8,
          boxShadow: '0 0 8px 4px #fff',
          animation: 'sparkle 1s linear infinite',
        }}
      />
    </div>
  );
}

export default LandingPage;
