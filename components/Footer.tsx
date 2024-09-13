import Image from "next/image"

const Footer = () => {
  return (
    <div className="w-full">
    {/* Statistics? */}
      <div className="bg-stone-800 min-h-28 mt-20 relative">
        <div className="flex justify-between mx-20">
            <div className="text-white text-center my-10 w-1/2">
                <p>WITH OVER</p>
                <p className="text-3xl my-3 font-bold">101000</p>
                <p>CREATIVES ACROSS BICOL REGION</p>
            </div>
            <div className="text-white text-center my-10 w-1/2">
                <p>LISTED PRODUCTS AND SERVICES</p>
                <p className="text-3xl my-3 font-bold">1502</p>
            </div>
        </div>  
    </div>
    {/* Carousel Logos */}
    <div className="bg-orange-500 min-h-28 relative">
      <div className="flex justify-between mx-20">
          <div className="text-white text-center my-10 w-full">
              <p>carousel logos lol</p>
          </div>
      </div>  
    </div>
    {/* Bottommost Footer */}
    <div className="bg-stone-800 w-full min-h-28 relative">
      <div className="flex justify-between mx-20">
        <div className="text-white text-center my-10 w-1/2 mx-auto">
          <p>Stay in the loop with the latest news, special offers, and insider insights.</p>
            <div className="flex items-center justify-center my-5">
              <Image 
                src="/assets/icons/mail-w.svg" 
                alt="mail" 
                width={30} 
                height={30} 
              />
              <input                 className="ml-2 focus:outline-none border-b-2 border-b-white bg-transparent" 
                type="text" 
                placeholder="Sign up your email" 
                required
              />
            </div>
        </div>
        <div className="my-10 w-1/2">
            <Image src="/assets/images/Creative Legazpi_LogoOutline-w.svg" 
            alt="Creative Legazpi Logo"
            className="min-h-20 h-20 mx-auto"
            height={100}
            width={200}/>
        </div>
      </div>  
    </div> 
  </div>
  )
}

export default Footer