import React from 'react'

const Image = ({ src, alt }) => {
  return <img src={src} alt={alt} className='w-full h-full object-cover' />
}

export default Image
