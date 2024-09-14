import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// import Navbar from '@components/Navbar';
// import Background from "@components/Background";
// import Footer from "@components/Footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Creative Legazpi",
  description: "Explore, connect and network with the creative minds of Legazpi City",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <div className="gradient"/> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >  
      <div className="relative w-full min-h-screen">
          {/* Made these comments for now - jaycel*/}
          {/* <Background />
          <Navbar /> */}
          {children}
          {/* <Footer /> */}
      </div>
      </body>
    </html>
  );
}
