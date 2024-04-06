import React from 'react'

const bleachOnClick = () => {
  // navigate('/');
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const Footer = () => {
  return (
<footer className="bg-darkColor text-gray-600 body-font">
  <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white-900">
      <span className=" font-Roboto ml-3 text-xl" onClick={bleachOnClick}>Web3 Ecommerce </span>
    </a>
    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2024 ISE Major project
    </p>

  </div>
</footer>
  )
}

export default Footer