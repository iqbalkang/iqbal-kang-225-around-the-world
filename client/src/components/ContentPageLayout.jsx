import React, { useEffect, useState } from 'react'
import Gmap from '../components/Gmap'
import { TfiLock } from 'react-icons/tfi'
import { FiCamera } from 'react-icons/fi'
import Place from '../components/Place'
import Heading from '../components/Heading'
import FlexContainer from '../components/FlexContainer'
import classnames from 'classnames'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'

const ContentPageLayout = ({
  title,
  data,
  isPublic,
  isFollowedByCurrentUser,
  handleGetNextPage,
  handleGetPrevPage,
}) => {
  const [coordinates, setCoordinates] = useState(null)

  const renderPageContent = () => {
    if (!isPublic && !isFollowedByCurrentUser) return <LockedProfile />
    if (!data.length) return <NoContent />
    return (
      <Content
        updateCoordinates={setCoordinates}
        data={data}
        title={title}
        handleGetPrevPage={handleGetPrevPage}
        handleGetNextPage={handleGetNextPage}
      />
    )
  }

  return (
    <FlexContainer col className='h-full bg-off-white text-dark-gray'>
      <div className='h-96'>
        <Gmap coordinates={coordinates} />
      </div>

      {renderPageContent()}
    </FlexContainer>
  )
}

export default ContentPageLayout

const Content = ({ title, data, updateCoordinates, handleGetPrevPage, handleGetNextPage }) => {
  const contentCenterDivClasses = classnames('gap-4 overflow-x-auto')

  return (
    <FlexContainer col className='p-4 pb-0'>
      {/* title */}
      <Heading h4 className='ml-12'>
        {title}
      </Heading>

      {/* container to wrap arrows and all places */}
      <div className='grid gap-4 grid-cols-[min-content,1fr,min-content] flex-1 items-center'>
        {/* left arrow */}
        <button className=' relative -top-5 ' onClick={handleGetPrevPage}>
          <BsFillArrowLeftCircleFill className='w-6 h-6 text-accent ' />
        </button>

        {/* places content container */}
        <FlexContainer className={contentCenterDivClasses}>
          {data.map((place, index) => (
            <Place key={index} {...place} updateCoordinates={updateCoordinates} />
          ))}
        </FlexContainer>
        {/* right arrow */}
        <button className=' relative -top-5 ' onClick={handleGetNextPage}>
          <BsFillArrowRightCircleFill className='w-6 h-6 text-accent' />
        </button>
      </div>
    </FlexContainer>
  )
}

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
