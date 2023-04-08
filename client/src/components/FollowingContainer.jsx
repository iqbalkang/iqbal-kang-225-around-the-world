import React, { useState, useEffect } from 'react'
import FlexContainer from './FlexContainer'
import { renderSmallImage } from '../utils/rendeImage'
import AccentButton from './AccentButton'
import { useDispatch, useSelector } from 'react-redux'
import { getLocalStorage } from '../utils/localStorage/localStorage'
import customFetch from '../utils/axios/customFetch'
import { toast } from 'react-toastify'
import { getUserInfoForSignedInUsers } from '../features/user/userThunk'
import {
  sendFollowRequest,
  sendFollowRequestFromModal,
  sendFollowRequestFromSinglePlace,
} from '../features/followers/followersThunks'
import LoginModal from './LoginModal'
import { getSinglePlace } from '../features/places/PlacesThunks'

const FollowingContainer = ({ id, firstName, lastName, image, status, singlePage, placeId }) => {
  const dispatch = useDispatch()

  const [loginModal, setLoginModal] = useState(false)
  const { user, currentUser, isLoading } = useSelector(store => store.user)
  const { isLoading: isFollowInfoLoading } = useSelector(store => store.followers)
  const { id: signedInUserId } = user || {}

  const handleFollowRequestClick = async () => {
    if (!user) return setLoginModal(true)
    const body = { status: 'pending', followingId: id }
    if (singlePage) return dispatch(sendFollowRequestFromSinglePlace({ body, placeId }))
    dispatch(sendFollowRequest(body))
  }

  const renderFollowButton = () => {
    if (signedInUserId === id) return
    if (status === 'pending')
      return (
        <AccentButton xs outline onClick={handleFollowRequestClick}>
          requested
        </AccentButton>
      )
    else if (status === 'accepted')
      return (
        <AccentButton xs outline onClick={handleFollowRequestClick}>
          following
        </AccentButton>
      )
    else
      return (
        <AccentButton xs primary onClick={handleFollowRequestClick}>
          follow
        </AccentButton>
      )
  }

  const closeLoginModal = () => setLoginModal(false)

  useEffect(() => {
    if (!isLoading) setLoginModal(false)
  }, [isLoading])

  return (
    <FlexContainer gap alignCenter className='py-2'>
      <div className='h-10 w-10 overflow-hidden rounded-full border border-dark-gray'>
        {renderSmallImage(image, firstName, lastName)}
      </div>
      <p className='mr-auto capitalize font-semibold text-sm'>
        {firstName} {lastName}
      </p>
      {renderFollowButton()}

      {/* login modal */}
      {loginModal && <LoginModal closeModal={closeLoginModal} isLoading={isLoading} />}
    </FlexContainer>
  )
}

export default FollowingContainer
