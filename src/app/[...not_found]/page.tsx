import Image from 'next/image'
import React from 'react'

function Page404() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <Image src="/404_img.png" alt="404" width={300} height={150} style={{ objectFit: "contain" }} />
        <h1 className='text-3xl font-bold text-white'>404 Not Found</h1>
        <p className='text-white text-xl'>The page you are looking for does not exist</p>
    </div>
  )
}

export default Page404