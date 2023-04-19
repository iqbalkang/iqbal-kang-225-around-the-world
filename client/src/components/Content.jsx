// import React from 'react'
// import FlexContainer from './FlexContainer'
// import Place from './Place'
// import classnames from 'classnames'
// import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'
// import Heading from './Heading'

// const Content = ({ title, data, updateCoordinates, handleGetPrevPage, handleGetNextPage }) => {
//   const contentCenterDivClasses = classnames('gap-4 overflow-x-auto')

//   return (
//     <FlexContainer col className='p-4 pb-0'>
//       {/* title */}
//       <Heading h4 className='ml-12'>
//         {title}
//       </Heading>

//       {/* container to wrap arrows and all places */}
//       <div className='grid gap-4 grid-cols-[min-content,1fr,min-content] flex-1 items-center'>
//         {/* left arrow */}
//         {/* <button className=' relative -top-5 ' onClick={handleGetPrevPage}>
//           <BsFillArrowLeftCircleFill className='w-6 h-6 text-accent ' />
//         </button> */}

//         {/* places content container */}
//         <FlexContainer className={contentCenterDivClasses}>
//           {data.map((place, index) => (
//             <Place key={index} {...place} updateCoordinates={updateCoordinates} />
//           ))}
//         </FlexContainer>
//         {/* right arrow */}
//         {/* <button className=' relative -top-5 ' onClick={handleGetNextPage}>
//           <BsFillArrowRightCircleFill className='w-6 h-6 text-accent' />
//         </button> */}
//       </div>
//     </FlexContainer>
//   )
// }

// export default Content

import React, { useState, useEffect, useRef } from 'react'
import FlexContainer from './FlexContainer'
import Place from './Place'
import classnames from 'classnames'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'
import Heading from './Heading'

const Content = ({ title, data, updateCoordinates, handleGetPrevPage, handleGetNextPage }) => {
  // const contentCenterDivClasses = classnames('gap-4 overflow-x-auto')
  const containerRef = useRef()
  const placeRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(null)

  const toggleDescriptionVisibility = id => {
    const newActiveId = activeIndex === id ? null : id
    setActiveIndex(newActiveId)
  }

  window.addEventListener('click', e => {
    if (!e.target.classList.contains('search')) setActiveIndex(null)
  })

  // placeRefs.current = data.map((ref, index) => (placeRefs.current[index] = ref))
  const [coordinates, setCoordinates] = useState({
    left: null,
    top: null,
  })

  const handleScroll = index => {
    const rect = placeRefs.current[index].getBoundingClientRect()
    setCoordinates({ left: rect?.right, top: rect?.top })
  }

  useEffect(() => {
    data.map((d, index) => containerRef.current.addEventListener('scroll', handleScroll.bind(null, index)))

    return () => {
      data.map((d, index) => containerRef.current?.removeEventListener('scroll', handleScroll))
    }
  }, [])

  const getCoords = i => {
    const rect = placeRefs.current[i]?.getBoundingClientRect()
    return { left: rect?.right, top: rect?.top }
  }

  return (
    <div className='p-4 pb-0 overflow-y-scroll' ref={containerRef}>
      {/* title */}
      <Heading h4>{title}</Heading>

      {/* container to wrap arrows and all places */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-2  gap-4'>
        {data.map((place, index) => (
          <Place
            key={index}
            index={index}
            {...place}
            updateCoordinates={updateCoordinates}
            ref={el => (placeRefs.current[index] = el)}
            coordinates={getCoords(index)}
            activeIndex={activeIndex}
            toggleDescriptionVisibility={toggleDescriptionVisibility}
          />
        ))}
      </div>
    </div>
  )
}

export default Content
