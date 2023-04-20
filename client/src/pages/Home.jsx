import React from 'react'
import { Outlet } from 'react-router-dom'
import FlexContainer from '../components/FlexContainer'
import MobileNav from '../components/MobileNav'
import Navbar from '../components/Navbar'
import useBreakpoint from '../hooks/useBreakpoint'

const breakpoint = 756
const Home = () => {
  const width = useBreakpoint()

  return (
    <FlexContainer col className='h-screen text-white font-josefin'>
      {width > breakpoint ? <Navbar /> : <MobileNav />}

      <main className='flex-1 bg-dark-gray '>
        <Outlet />
      </main>
    </FlexContainer>
  )
}

export default Home

// h-[calc(100vh-57px)]
