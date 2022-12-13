import React from 'react'

const AccentButton = ({ children, isLoading }) => {
  return (
    <button
      className='overflow-hidden text-white relative capitalize bg-accent min-w-[150px] shadow-accent/20 shadow-lg px-6 py-4 rounded-xl col-span-2 justify-self-center flex gap-2 items-center justify-center hover:shadow-none hover:scale-95 duration-200 before:w-full before:bg-white before:h-4 before:absolute before:-translate-x-full before:rotate-45 before:left-0 before:bottom-0 hover:before:translate-x-full before:duration-300'
      disabled={isLoading}
    >
      {children}
    </button>
  )
}

export default AccentButton
