'use client'

import React, { Suspense, useState, useEffect } from "react"
import Image from "next/image"

type Member = {
  title: string
  name: string
  id: number
  url: string
}

type Props = {
  members: Member[]
}

const ImagePlaceholder: React.FC = () => (
  <div role="status" className="animate-pulse flex items-center justify-center w-full h-full bg-gray-300 rounded-2xl dark:bg-gray-700">
    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
)

const DelayedImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }) // 2-second delay
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return <ImagePlaceholder />
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
      priority
    />
  )
}

const TeamCard: React.FC<Props> = ({ members }) => {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-x-14 gap-y-8 items-center justify-items-center md:px-8 md:pl-16 w-full">
      {members.map(({ name, title, url, id }) => (
        <div
          key={id}
          className="relative rounded-2xl md:h-[230px] md:w-[350px] h-[250px] w-[250px] my-4 bg-cover text-center flex content-center items-end bg-center text-white sm:saturate-0 hover:saturate-100 saturate-100 group transition-all ease-in-out duration-500 overflow-hidden"
        >
          <Suspense fallback={<ImagePlaceholder />}>
            <div className="absolute inset-0 rounded-xl">
              <DelayedImage src={url} alt={name} />
            </div>
          </Suspense>

          <div className="absolute inset-0 bg-gradient-to-tl from-redTheme from-15% via-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-2xl"></div>

          <div className="relative w-full py-6 bg-gradient-to-t from-blackTheme group-hover:from-blackTheme rounded-2xl transition duration-500">
            <h2 className="md:text-2xl text-lg font-black">{name}</h2>
            <p className="font-bold">{title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TeamCard

