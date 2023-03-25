import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPlaces, getUserFavorite, getUserFavorites } from '../features/places/PlacesThunks'
import ContentPageLayout from '../components/ContentPageLayout'
import EmptyPageLayout from '../components/EmptyPageLayout'
import Place from '../components/Place'
import FlexContainer from '../components/FlexContainer'
import Heading from '../components/Heading'
import Gmap from '../components/Gmap'

const Favorites = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(store => store.user)
  const { currentUserFavorites } = useSelector(store => store.places)

  // useEffect(() => {
  //   dispatch(getUserFavorite(user.id))
  // }, [JSON.stringify(currentUserFavorites)])

  // console.log('running')

  // useEffect(() => {
  //   dispatch(getAllPlaces())
  // }, [])

  // if (currentUserFavorites?.length === 0) {
  //   return <EmptyPageLayout user={user} />
  // }

  // return <ContentPageLayout userPlaces={currentUserFavorites} />

  useEffect(() => {
    dispatch(getUserFavorites())
  }, [])

  // const { places } = useSelector(store => store.places)
  const { id: userId } = useSelector(store => store.user.user) || {}
  // const [coordinates, setCoordinates] = useState(null)

  if (!userId) return <EmptyPageLayout user={user} />

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
    //     <BiRightArrow className='w-8 h-8 text-accent rotate-180' />
    //   </button> */}

    //       {/* places content container */}
    //       <div className='flex w-screen gap-4 overflow-scroll'>
    //         {currentUserFavorites.map((place, index) => (
    //           <Place key={index} {...place} userId={userId} updateCoordinates={setCoordinates} />
    //         ))}
    //       </div>
    //       {/* right arrow */}
    //       {/* <button className='hidden relative -top-5 md:block'>
    //     <BiRightArrow className='w-8 h-8 text-accent' />
    //   </button> */}
    //     </div>
    //   </FlexContainer>
    // </FlexContainer>
    <ContentPageLayout title='all places' data={currentUserFavorites} />
  )
}

export default Favorites
