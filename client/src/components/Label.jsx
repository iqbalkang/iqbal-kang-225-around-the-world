import React from 'react'

const Label = ({ children, label }) => {
  return (
    <label htmlFor={label} className='block text-light-gray text-sm capitalize peer-focus:text-white'>
      {children}
    </label>
  )
}

export default Label
