import React from 'react'
import classnames from 'classnames'

const FlexContainer = ({
  children,
  center,
  col,
  alignCenter,
  justifyBetween,
  gap,
  alignEnd,
  colReverse,
  justifyCenter,
  className = '',
}) => {
  const classes = classnames(className, 'flex', {
    'justify-center items-center': center,
    'flex-col-reverse': colReverse,
    'justify-between': justifyBetween,
    'items-end': alignEnd,
    'items-center': alignCenter,
    'justify-center': justifyCenter,
    'flex-col': col,
    'gap-2': gap,
  })

  return <div className={classes}>{children}</div>
}

export default FlexContainer
