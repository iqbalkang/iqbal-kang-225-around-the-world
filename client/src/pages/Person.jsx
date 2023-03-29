import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AccentButton from '../components/AccentButton'
import ContentPageLayout from '../components/ContentPageLayout'
import FlexContainer from '../components/FlexContainer'
import Heading from '../components/Heading'
import Image from '../components/Image'
import { getUserPlaces } from '../features/places/PlacesThunks'
import { getUserInfo } from '../features/user/userThunk'

const Person = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const { placesByCurrentUser } = useSelector(store => store.places)

  const { currentUser } = useSelector(store => store.user)
  const { firstName, lastName, email, aboutMe, image, imageId, id: signedInUser } = currentUser || {}

  useEffect(() => {
    dispatch(getUserInfo(userId))
    dispatch(getUserPlaces({ userId, signedInUser }))
  }, [userId])

  const renderImage = () => {
    if (image) return <Image src={image} alt={firstName + 'image'} className='h-48 w-48' />
    else
      return (
        <FlexContainer center className='bg-off-white h-full w-full text-dark-gray'>
          <Heading h2>{firstName?.slice(0, 1)}</Heading>
          <Heading h2>{lastName?.slice(0, 1)}</Heading>
        </FlexContainer>
      )
  }

  return (
    <section className='h-full grid grid-cols-[2fr,8fr]'>
      {/* left side form inputs */}
      <FlexContainer center col className='bg-dark-gray px-4 max-h-[calc(100vh-49px)] overflow-scroll'>
        <FlexContainer center className='h-48 w-48 rounded-full mb-6 overflow-hidden'>
          {renderImage()}
        </FlexContainer>

        <Heading h4 offWhite bold>
          {firstName} {lastName}
        </Heading>

        <FlexContainer className='gap-8 mb-4'>
          <button>
            <FlexContainer className='gap-1'>
              <p>100</p>
              <p>following</p>
            </FlexContainer>
          </button>

          <button>
            <FlexContainer className='gap-1'>
              <p>100</p>
              <p>following</p>
            </FlexContainer>
          </button>
        </FlexContainer>

        <FlexContainer col center className='mb-4'>
          <Heading offWhite h6>
            about me
          </Heading>
          <p className='text-center text-xs'>{aboutMe}</p>
        </FlexContainer>

        <FlexContainer col center>
          <Heading offWhite h6>
            places added
          </Heading>
          <span className='text-8xl text-off-white'>{placesByCurrentUser.length}</span>
        </FlexContainer>

        <AccentButton small full primary isLoading={false}>
          follow
        </AccentButton>
      </FlexContainer>

      {/* right side google map */}

      <ContentPageLayout title={'places added by ' + firstName} data={placesByCurrentUser} />
    </section>
  )
}

export default Person
