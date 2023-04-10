import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import AccentButton from '../components/AccentButton'
import ContentPageLayout from '../components/ContentPageLayout'
import FlexContainer from '../components/FlexContainer'
import FollowModal from '../components/FollowModal'
import Heading from '../components/Heading'
import Image from '../components/Image'
import LoginModal from '../components/LoginModal'
import { getFollowInfo, getFollowInfoForSignedInUsers, sendFollowRequest } from '../features/followers/followersThunks'
import { getUserPlaces } from '../features/places/PlacesThunks'
import { getUserInfo, getUserInfoForSignedInUsers } from '../features/user/userThunk'
import customFetch from '../utils/axios/customFetch'
import { getLocalStorage } from '../utils/localStorage/localStorage'
import { renderLargeImage } from '../utils/rendeImage'

const limit = 6

const initialState = {
  followers: [],
  following: [],
  isLoading: false,
}

const Person = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const { placesByCurrentUser } = useSelector(store => store.places)
  const { followInfo, isLoading: isFollowInfoLoading } = useSelector(store => store.followers)
  const { currentUser, user, isLoading } = useSelector(store => store.user)

  const [loginModal, setLoginModal] = useState(false)
  const [followModal, setFollowModal] = useState(false)
  const [selectedTab, setSelectedTab] = useState(null)

  const [currentPage, setCurrentPage] = useState(0)

  const handleGetPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }

  const handleGetNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const {
    firstName,
    lastName,
    email,
    aboutMe,
    image,
    imageId,
    status,
    followers,
    following,
    isPublic,
    isFollowedByCurrentUser,
    places,
  } = currentUser || {}

  const closeLoginModal = () => setLoginModal(false)
  const closeFollowModal = () => setFollowModal(false)

  const handleFollowRequestClick = async () => {
    if (!user) return setLoginModal(true)
    const body = { status: 'pending', followingId: userId }
    dispatch(sendFollowRequest(body))
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

  const handleGetFollowInfo = async () => {
    if (!user) return dispatch(getFollowInfo(userId))
    dispatch(getFollowInfoForSignedInUsers(userId))
  }

  const handleGetFollowersClick = () => {
    setFollowModal(true)
    setSelectedTab('followers')
    handleGetFollowInfo()
  }

  const handleGetFollowingClick = () => {
    setFollowModal(true)
    setSelectedTab('following')
    handleGetFollowInfo()
  }

  const updateTab = tab => setSelectedTab(tab)

  useEffect(() => {
    user ? dispatch(getUserInfoForSignedInUsers(userId)) : dispatch(getUserInfo(userId))
  }, [userId])

  useEffect(() => {
    if (!placesByCurrentUser.length && currentPage > 0) setCurrentPage(currentPage - 1)
  }, [placesByCurrentUser])

  useEffect(() => {
    if (isFollowedByCurrentUser || isPublic)
      dispatch(getUserPlaces({ userId, signedInUser: user?.id, currentPage, limit }))
  }, [currentUser, currentPage])

  useEffect(() => {
    if (!isLoading) setLoginModal(false)
  }, [isLoading])

  useEffect(() => {
    dispatch(getUserInfoForSignedInUsers(userId))
  }, [isFollowInfoLoading])

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
          <Button count={followers} onClick={handleGetFollowersClick}>
            {followers === 1 ? 'follower' : 'followers'}
          </Button>
          <Button count={following} onClick={handleGetFollowingClick}>
            following
          </Button>
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
          {/* <span className='text-8xl text-off-white'>{placesByCurrentUser.length}</span> */}
          <span className='text-8xl text-off-white'>{places}</span>
        </FlexContainer>

        {renderFollowButton()}
      </FlexContainer>

      {/* right side google map */}

      <ContentPageLayout
        title={'places added by ' + firstName}
        data={placesByCurrentUser}
        isPublic={isPublic}
        isFollowedByCurrentUser={isFollowedByCurrentUser}
        handleGetPrevPage={handleGetPrevPage}
        handleGetNextPage={handleGetNextPage}
      />

      {/* login modal */}
      {loginModal && <LoginModal closeModal={closeLoginModal} isLoading={isLoading} />}

      {/* follow modal */}
      {followModal && (
        <FollowModal
          closeModal={closeFollowModal}
          isLoading={isLoading}
          followInfo={followInfo}
          selectedTab={selectedTab}
          updateTab={updateTab}
        />
      )}
    </section>
  )
}

export default Person

const Button = ({ children, count, onClick }) => {
  return (
    <button className='hover:underline' onClick={onClick}>
      <FlexContainer className='gap-1'>
        <p>{count}</p>
        <p>{children}</p>
      </FlexContainer>
    </button>
  )
}
