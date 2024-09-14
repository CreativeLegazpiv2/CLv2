// pages/index.tsx

import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Creatives Legazpi!</h1>
      <h2 className="text-4xl font-bold mb-8">Sign Up Here</h2>
      <Link href="/register-form">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Sign Up
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
