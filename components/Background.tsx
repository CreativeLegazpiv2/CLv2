import Image from "next/image"

const Background = () => {
  return (
    <div className="overflow-hidden">
      <Image src="/assets/images/temp-bg.jpg" alt="bg image"
      layout="fill"
      objectFit="cover"/>
    </div>
  )
}

export default Background