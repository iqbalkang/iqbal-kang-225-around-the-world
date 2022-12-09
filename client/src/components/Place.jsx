import React from 'react'
import { BiMap, BiSearch } from 'react-icons/bi'
import { AiTwotoneStar, AiFillHeart } from 'react-icons/ai'
import taj from '../images/taj.jpg'

const Place = () => {
  return (
    <article className='w-48 flex-shrink-0'>
      {/* container for place image, favorite & search */}
      <div className='relative rounded-3xl shadow-md overflow-hidden'>
        <img src={taj} alt='place image' className='h-60 object-cover' />
        {/* favourite container */}
        <button className='absolute top-5 right-5 bg-white rounded-full w-6 h-6 flex items-center justify-center'>
          <AiFillHeart className='text-accent' />
        </button>

        {/* search icon */}
        <button className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <BiSearch className='text-dark-yellow w-6 h-6' />
        </button>
      </div>
      {/* container for place info */}
      <div className='p-2'>
        <h3 className='card-heading'>taj hotel</h3>
        <div className='flex gap-6 '>
          <div className='flex items-center'>
            <BiMap />
            <p className='capitalize'>india</p>
          </div>
          <div className='flex items-center'>
            <AiTwotoneStar className='text-dark-yellow' />
            <p className='capitalize'>4.0</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Place
