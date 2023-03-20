import React from 'react'
import classnames from 'classnames'

const FlexContainer = ({ children, center, col, alignCenter, justifyBetween, className = '' }) => {
  const classes = classnames(className, 'flex gap-2', {
    'justify-center items-center': center,
    'justify-between items-center': justifyBetween,
    'items-center': alignCenter,
    'flex-col': col,
  })

  return <div className={classes}>{children}</div>
}

export default FlexContainer
