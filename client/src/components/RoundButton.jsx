import React from 'react'
import classnames from 'classnames'

const RoundButton = ({ onClick, className, children, primary }) => {
  const classes = classnames(className, 'rounded-full w-6 h-6 flex items-center justify-center', {
    'bg-white': primary,
  })
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default RoundButton
