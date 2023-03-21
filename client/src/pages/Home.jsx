import React from 'react'
import { Outlet } from 'react-router-dom'
import FlexContainer from '../components/FlexContainer'
import Navbar from '../components/Navbar'

import SmallNavbar from '../components/SmallNavbar'

const Home = () => {
  return (
    <FlexContainer col className='h-screen min-h-screen text-white font-josefin'>
      <Navbar />

      <main className='flex-1'>
        {/* hamburger menu and logo nav for small screens, hides at medium */}
        {/* <SmallNavbar /> */}
        <Outlet />
      </main>
    </FlexContainer>
  )
}

export default Home
