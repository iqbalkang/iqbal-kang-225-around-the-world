import React from 'react'
import FlexContainer from './FlexContainer'
import Place from './Place'
import classnames from 'classnames'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'
import Heading from './Heading'

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

export default Content
