import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import AccentButton from '../components/AccentButton'
import ContentPageLayout from '../components/ContentPageLayout'
import FlexContainer from '../components/FlexContainer'
import Heading from '../components/Heading'
import Image from '../components/Image'
import LoginModal from '../components/LoginModal'
import { getUserPlaces } from '../features/places/PlacesThunks'
import { getUserInfo, getUserInfoForSignedInUsers } from '../features/user/userThunk'
import customFetch from '../utils/axios/customFetch'
import { getLocalStorage } from '../utils/localStorage/localStorage'
import { renderLargeImage } from '../utils/rendeImage'

const Person = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const { placesByCurrentUser } = useSelector(store => store.places)
  const { currentUser, user, isLoading } = useSelector(store => store.user)

  const [loginModal, setLoginModal] = useState(false)

  const { firstName, lastName, email, aboutMe, image, imageId, status } = currentUser || {}

  const closeLoginModal = () => setLoginModal(false)

  const handleFollowRequestClick = async () => {
    if (!user) return setLoginModal(true)

    const { token } = getLocalStorage('user')
    const body = { status: 'pending', followingId: userId }

    try {
      const { data } = await customFetch.post(`/follow`, body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      dispatch(getUserInfo(userId))
    } catch (error) {
      toast(error.response.data.message)
    }
  }

  const renderFollowButton = () => {
    if (currentUser?.id === user?.id) return

    if (status === 'pending')
      return (
        <AccentButton small full outline onClick={handleFollowRequestClick}>
          requested
        </AccentButton>
      )
    else if (status === 'accepted')
      return (
        <AccentButton small full outline onClick={handleFollowRequestClick}>
          following
        </AccentButton>
      )
    else
      return (
        <AccentButton small full primary onClick={handleFollowRequestClick}>
          follow
        </AccentButton>
      )
  }

  useEffect(() => {
    user ? dispatch(getUserInfoForSignedInUsers(userId)) : dispatch(getUserInfo(userId))
    dispatch(getUserPlaces({ userId, signedInUser: user?.id }))
  }, [userId])

  useEffect(() => {
    if (!isLoading) setLoginModal(false)
  }, [isLoading])

  return (
    <section className='h-full grid grid-cols-[2fr,8fr]'>
      {/* left side form inputs */}
      <FlexContainer center col className='bg-dark-gray px-4 max-h-[calc(100vh-49px)] overflow-scroll'>
        <FlexContainer center className='h-48 w-48 rounded-full mb-6 overflow-hidden'>
          {renderLargeImage(image, firstName, lastName)}
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
          <p className='text-center text-xs first-letter:capitalize'>{aboutMe ? aboutMe : 'no description added'}</p>
        </FlexContainer>

        <FlexContainer col center>
          <Heading offWhite h6>
            places added
          </Heading>
          <span className='text-8xl text-off-white'>{placesByCurrentUser.length}</span>
        </FlexContainer>

        {renderFollowButton()}
      </FlexContainer>

      {/* right side google map */}

      <ContentPageLayout title={'places added by ' + firstName} data={placesByCurrentUser} />

      {/* login modal */}
      {loginModal && <LoginModal closeModal={closeLoginModal} isLoading={isLoading} />}
    </section>
  )
}

export default Person
