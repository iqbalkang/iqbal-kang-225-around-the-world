import React, { useState } from 'react'
import Gmap from '../components/Gmap'
import { TfiLock } from 'react-icons/tfi'
import { FiCamera } from 'react-icons/fi'
import Heading from '../components/Heading'
import FlexContainer from '../components/FlexContainer'
import Content from './Content'
import { useSelector } from 'react-redux'
import classnames from 'classnames'

const ContentPageLayout = ({
  title,
  data,
  isPublic,
  isFollowedByCurrentUser,
  handleGetNextPage,
  handleGetPrevPage,
  contentContainerClassName,
  mapClassName,
}) => {
  const [coordinates, setCoordinates] = useState(null)
  const { currentUser, user } = useSelector(store => store.user)

  const contentContainerClasses = classnames(
    'h-full bg-gradient-to-r from-slate-200 to-rose-50 text-dark-gray grid overflow-y-scroll',
    contentContainerClassName
  )
  const mapClasses = classnames('hidden', mapClassName)

  const renderPageContent = () => {
    if (!isPublic && !isFollowedByCurrentUser && currentUser?.id !== user?.id) return <LockedProfile />
    if (!data.length) return <NoContent />
    return (
      <Content
        updateCoordinates={setCoordinates}
        data={data}
        title={title}
        handleGetPrevPage={handleGetPrevPage}
        handleGetNextPage={handleGetNextPage}
        className='grid-cols-[repeat(auto-fit,minmax(170px,1fr))]'
      />
    )
  }

  return (
    <div className={contentContainerClasses}>
      {renderPageContent()}

      {/* <FlexContainer className='hidden md:block'> */}
      <FlexContainer className={mapClasses}>
        <Gmap coordinates={coordinates} />
      </FlexContainer>
    </div>
  )
}

export default ContentPageLayout

const LockedProfile = () => {
  return (
    <FlexContainer center gap className='flex-1'>
      <div className='border border-black p-2 rounded-full'>
        <TfiLock />
      </div>
      <div className='leading-3'>
        <Heading h6 bold>
          this account is private
        </Heading>
        <p>Follow this account to see their posts.</p>
      </div>
    </FlexContainer>
  )
}

const NoContent = () => {
  return (
    <FlexContainer col center gap className='flex-1'>
      <div className='border-2 border-black p-2 rounded-full'>
        <FiCamera size={30} />
      </div>
      <Heading h4>No posts yet</Heading>
    </FlexContainer>
  )
}
