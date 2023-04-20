import React from 'react'
import { motion } from 'framer-motion'
import parachuteBg from '../images/parachute-bg.svg'
import parachute from '../images/parachute.svg'
import AccentButton from '../components/AccentButton'
import { Link } from 'react-router-dom'
import FlexContainer from './FlexContainer'

const EmptyPageLayout = () => {
  // return <section className='h-full bg-green-200'></section>
  return (
    <FlexContainer col className='h-full  bg-off-white'>
      <div className='relative flex justify-center h-[calc(100%-57px)] '>
        <img src={parachuteBg} />
        <motion.img
          animate={{ rotate: [1, -1, 1], x: [10, -10, 10] }}
          transition={{ repeat: Infinity, duration: 8 }}
          src={parachute}
          alt=''
          className='absolute top-20 right-72 w-80'
        />
      </div>
      <FlexContainer center gap className='text-dark-gray relative bottom-10'>
        <p className='text-xl'>Please log in to continue</p>
        <Link to='/register' className='bg-accent px-8 text-white py-2 rounded-3xl'>
          Log in
        </Link>
      </FlexContainer>
    </FlexContainer>
  )
}

export default EmptyPageLayout
