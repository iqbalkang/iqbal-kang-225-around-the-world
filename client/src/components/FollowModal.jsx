import React, { useState, useRef, useEffect } from 'react'
import Modal from './Modal'
import FlexContainer from './FlexContainer'
import FollowingContainer from './FollowingContainer'
import Heading from './Heading'
import { HiOutlineUsers } from 'react-icons/hi2'

const FollowModal = ({ closeModal, followInfo, selectedTab, updateTab }) => {
  const { followers, following } = followInfo

  const followersRef = useRef()
  const followingRef = useRef()

  const renderFollowers = () => {
    if (!followers.length) return <NoUsers text='No followers' />
    return followers.map((follower, index) => <FollowingContainer key={index} {...follower} closeModal={closeModal} />)
  }

  const renderFollowing = () => {
    if (!following.length) return <NoUsers text='Not follwoing anyone' />
    return following.map((following, index) => (
      <FollowingContainer key={index} {...following} closeModal={closeModal} />
    ))
  }

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
    <Modal closeModal={closeModal} className='w-[350px] min-h-[300px] max-h-[500px] overflow-y-scroll flex flex-col'>
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

const NoUsers = ({ text }) => {
  return (
    <FlexContainer col center className='flex-1'>
      <HiOutlineUsers size={30} />
      <Heading h6> {text} </Heading>
    </FlexContainer>
  )
}
