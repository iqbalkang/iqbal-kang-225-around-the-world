import React from 'react'
import classnames from 'classnames'

const Label = ({ children, label, placeholderText }) => {
  console.log(placeholderText)
  const labelClasses = classnames(placeholderText, 'block text-light-gray text-sm capitalize peer-focus:text-white')
  return (
    <label htmlFor={label} className={labelClasses}>
      {children}
    </label>
  )
}

export default Label
