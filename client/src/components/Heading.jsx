import React from 'react'
import classnames from 'classnames'

const Heading = ({ children, h2, h3, h4, h5, h6, className }) => {
  const headingClasses = classnames(className, 'font-semibold text-dark-gray capitalize font-josefin', {
    'text-4xl': h2,
    'text-3xl': h3,
    'text-2xl': h4,
    'text-xl': h5,
    'text-lg': h6,
  })

  return <h2 className={headingClasses}>{children}</h2>
}

export default Heading
