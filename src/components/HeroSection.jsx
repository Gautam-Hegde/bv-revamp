import React from 'react'
import nf1 from '../assets/nf1.png'

const HeroSection = ({ name }) => {
  return (

    <div className=" bg-heroColor container mx-auto flex px-5 py-24 md:flex-row flex-col items-center h-screen">
      <div className=" border-t border-b border-gray-950 p-5 lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <p className="font-Gothic sm:text-5xl   mb-4 font-bold text-gray-900  ">Decentralized Commerce <br /> for
          <br className="hidden lg:inline-block" />Digital Assets
        </p>
        <p className=" font-Roboto mb-8 leading-relaxed">Bleach Vault is the platform where you can sell, buy or share digital assets. Your ERC-1155 at your price!!</p>
        <div className="flex justify-center">
          <button className=" bg-darkColor px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Explore Now</button>
        </div>
      </div>
      <div className=" border-l-2  border-gray-950 lg:max-w-lg lg:w-full md:w-1/2 w-full">
        <img src={nf1} alt="test" />
      </div>
    </div>

  )
}

export default HeroSection