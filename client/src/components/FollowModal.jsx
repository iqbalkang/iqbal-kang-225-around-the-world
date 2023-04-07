import React, { useState, useRef, useEffect } from 'react'
import Modal from './Modal'
import FlexContainer from './FlexContainer'
import FollowingContainer from './FollowingContainer'

const FollowModal = ({ closeModal, followInfo, selectedTab, updateTab }) => {
  const { followers, following } = followInfo

  const followersRef = useRef()
  const followingRef = useRef()

  const renderFollowers = () => followers.map((follower, index) => <FollowingContainer key={index} {...follower} />)

  const renderFollowing = () => following.map((following, index) => <FollowingContainer key={index} {...following} />)

  const renderOutput = selectedTab === 'followers' ? renderFollowers() : renderFollowing()

  const handleFollowersClick = () => {
    updateTab('followers')
    followingRef.current.classList.remove('text-accent')
    followersRef.current.classList.add('text-accent')
  }

  const handleFollowingClick = () => {
    updateTab('following')
    followersRef.current.classList.remove('text-accent')
    followingRef.current.classList.add('text-accent')
  }

  useEffect(() => {
    selectedTab === 'followers'
      ? followersRef.current.classList.add('text-accent')
      : followingRef.current.classList.add('text-accent')
  }, [])

  return (
    <Modal closeModal={closeModal} className='w-[350px]'>
      <FlexContainer center className='gap-6'>
        <button className='capitalize' ref={followersRef} onClick={handleFollowersClick}>
          followers
        </button>
        <button className='capitalize' ref={followingRef} onClick={handleFollowingClick}>
          following
        </button>
      </FlexContainer>

      {renderOutput}
    </Modal>
  )
}

export default FollowModal
