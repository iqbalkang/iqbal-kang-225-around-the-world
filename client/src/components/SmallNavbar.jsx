import React from 'react'
import logo from '../images/logo.svg'

const SmallNavbar = () => {
  return (
    <nav className='bg-accent flex justify-between items-center p-2 md:hidden'>
      {/* hamburger menu */}
      <div className='h-8 w-8 bg-blue-300'></div>
      {/* logo */}
      <img src={logo} alt='around the world logo' className='w-28' />
    </nav>
  )
}

export default SmallNavbar
