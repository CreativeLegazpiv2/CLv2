import Image from "next/image"

const Background = () => {
  return (
    // Background needs some fixing
    <div className="">
      <Image className="absolute overflow-hidden" src="/assets/images/temp-bg.jpg" alt="bg image"
      layout="fill"
      objectFit="cover"
      objectPosition="top"/>
    </div>
  )
}

export default Background