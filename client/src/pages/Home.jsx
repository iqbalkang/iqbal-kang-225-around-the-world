import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from '../components/Aside'

import SmallNavbar from '../components/SmallNavbar'

const Home = () => {
  return (
    <div className='font-josefin bg-black relative h-screen w-screen md:grid md:grid-cols-[250px,1fr]'>
      <Aside />

      <main className='h-full text-dark-gray'>
        {/* hamburger menu and logo nav for small screens, hides at medium */}
        <SmallNavbar />

        <Outlet />
      </main>
    </div>
  )
}

export default Home
