import React from 'react'
import classnames from 'classnames'

const Image = ({ src, alt, className }) => {
  const imageClasses = classnames(className, 'w-full h-full object-cover')

  return <img src={src} alt={alt} className={imageClasses} />
}

export default Image
