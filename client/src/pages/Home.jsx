import React from 'react'
import { Outlet } from 'react-router-dom'
import FlexContainer from '../components/FlexContainer'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <FlexContainer col className='h-screen text-white font-josefin'>
      <Navbar />

      <main className='h-[calc(100vh-57px)]'>
        <Outlet />
      </main>
    </FlexContainer>
  )
}

export default Home
