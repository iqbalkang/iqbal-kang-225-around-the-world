import React, { useEffect, useState } from 'react'
import Gmap from '../components/Gmap'
import { BiRightArrow } from 'react-icons/bi'
import Place from '../components/Place'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPlaces } from '../features/places/PlacesThunks'
import Heading2 from '../components/Heading2'
import FlexContainer from '../components/FlexContainer'

const Places = () => {
  const dispatch = useDispatch()
  const { places } = useSelector(store => store.places)
  const { user } = useSelector(store => store.user)
  const [coordinates, setCoordinates] = useState(null)

  useEffect(() => {
    dispatch(getAllPlaces())
  }, [])

  return (
    <FlexContainer col className='gap-0 h-full bg-off-white text-dark-gray'>
      <div className='h-96'>
        <Gmap coordinates={coordinates} />
      </div>

      <FlexContainer col className=''>
        {/* title */}
        <Heading2>all places</Heading2>

        {/* container to wrap arrows and all places */}
        <div className='grid gap-4 grid-cols-[min-content,1fr,min-content] flex-1 items-center'>
          {/* left arrow */}
          {/* <button className='hidden relative -top-5 md:block'>
            <BiRightArrow className='w-8 h-8 text-accent rotate-180' />
          </button> */}

          {/* places content container */}
          <div className='flex gap-4 overflow-scroll'>
            {places.map((place, index) => (
              <Place key={index} {...place} updateCoordinates={setCoordinates} />
            ))}
          </div>
          {/* right arrow */}
          {/* <button className='hidden relative -top-5 md:block'>
            <BiRightArrow className='w-8 h-8 text-accent' />
          </button> */}
        </div>
      </FlexContainer>
    </FlexContainer>
  )
}

export default Places
