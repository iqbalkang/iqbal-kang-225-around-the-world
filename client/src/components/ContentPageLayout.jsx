import React, { useState } from 'react'
import Gmap from '../components/Gmap'
import { BiRightArrow } from 'react-icons/bi'
import Place from '../components/Place'
import { motion } from 'framer-motion'

const ContentPageLayout = ({ userPlaces, user }) => {
  const [coordinates, setCoordinates] = useState()
  const updateMapCenter = coords => setCoordinates(coords)

  return (
    <motion.section
      className='h-full bg-slate-100 flex flex-col'
      initial={{ x: '100vw' }}
      animate={{ x: '0' }}
      transition={{ type: 'tween', duration: 0.15 }}
    >
      <Gmap coordinates={coordinates} />

      <div className=' flex-1 p-6 pb-0 flex flex-col'>
        {/* title */}
        <h2 className='capitalize text-3xl mb-2'>bala's places</h2>

        {/* container to wrap arrows and all places */}
        <div className='grid gap-4 flex-1 items-center md:grid-cols-[min-content,1fr,min-content]'>
          {/* left arrow */}
          <button className='hidden relative -top-5 md:block'>
            <BiRightArrow className='w-8 h-8 text-accent rotate-180' />
          </button>

          {/* places content container */}
          <div className='flex gap-4 flex-1 overflow-scroll'>
            {userPlaces.map((place, index) => (
              <Place key={index} {...place} {...user} updateMapCenter={updateMapCenter} />
            ))}
          </div>
          {/* right arrow */}
          <button className='hidden relative -top-5 md:block'>
            <BiRightArrow className='w-8 h-8 text-accent' />
          </button>
        </div>
      </div>
    </motion.section>
  )
}

export default ContentPageLayout
