import React, { useEffect, useState } from 'react'
import Gmap from '../components/Gmap'
import { BiRightArrow } from 'react-icons/bi'
import Place from '../components/Place'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPlaces } from '../features/places/PlacesThunks'
import Heading from '../components/Heading'
import FlexContainer from '../components/FlexContainer'
// import Modal from '../components/Modal'
import AccentButton from '../components/AccentButton'
import { loginInputs } from '../utils/data/authenticationInputs'
import FormRowContainerWithLogo from '../components/FormRowContainerWithLogo'
import ContentPageLayout from '../components/ContentPageLayout'
// import LoginForm from '../components/LoginForm'
// import { loginUser } from '../features/user/userThunk'

// const initialInputsState = {
//   email: '',
//   password: '',
// }

const Places = () => {
  const dispatch = useDispatch()
  const { places } = useSelector(store => store.places)
  const { id: userId } = useSelector(store => store.user.user) || {}

  const [coordinates, setCoordinates] = useState(null)

  useEffect(() => {
    dispatch(getAllPlaces(userId))
  }, [userId])

  return (
    // <FlexContainer col className='gap-0 h-full bg-off-white text-dark-gray'>
    //   <div className='h-96'>
    //     <Gmap coordinates={coordinates} />
    //   </div>

    //   <FlexContainer col className=''>
    //     {/* title */}
    //     <Heading h3>all places</Heading>

    //     {/* container to wrap arrows and all places */}
    //     <div className='grid gap-4 grid-cols-[min-content,1fr,min-content] flex-1 items-center'>
    //       {/* left arrow */}
    //       {/* <button className='hidden relative -top-5 md:block'>
    //         <BiRightArrow className='w-8 h-8 text-accent rotate-180' />
    //       </button> */}

    //       {/* places content container */}
    //       <div className='flex w-screen gap-4 overflow-scroll'>
    //         {places.map((place, index) => (
    //           <Place key={index} {...place} userId={userId} updateCoordinates={setCoordinates} />
    //         ))}
    //       </div>
    //       {/* right arrow */}
    //       {/* <button className='hidden relative -top-5 md:block'>
    //         <BiRightArrow className='w-8 h-8 text-accent' />
    //       </button> */}
    //     </div>
    //   </FlexContainer>
    // </FlexContainer>
    <ContentPageLayout title='all places' data={places} />
  )
}

export default Places
