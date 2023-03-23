import React from 'react'
import { Link } from 'react-router-dom'

const CustomDescriptionLink = ({ text, to, value }) => {
  return (
    <div className='text-right text-xs'>
      <span>{text} </span>
      <Link to={to} className='uppercase text-accent font-bold hover:underline'>
        {value}
      </Link>
    </div>
  )
}

export default CustomDescriptionLink
