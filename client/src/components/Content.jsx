import React, { useState, useEffect, useRef } from 'react'
import FlexContainer from './FlexContainer'
import Place from './Place'
import classnames from 'classnames'
import Heading from './Heading'

const Content = ({ title, data, updateCoordinates, className }) => {
  const containerRef = useRef()
  const placeRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(null)

  const placesContainerClasses = classnames(className, 'grid gap-4')

  const toggleDescriptionVisibility = id => {
    const newActiveId = activeIndex === id ? null : id
    setActiveIndex(newActiveId)
  }

  window.addEventListener('click', e => {
    if (!e.target.classList.contains('search')) setActiveIndex(null)
  })

  const [coordinates, setCoordinates] = useState({
    left: null,
    top: null,
  })

  const handleScroll = index => {
    const rect = placeRefs.current[index]?.getBoundingClientRect()
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
      <div className={placesContainerClasses}>
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
