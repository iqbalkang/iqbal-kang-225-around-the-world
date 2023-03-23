import React from 'react'
import classnames from 'classnames'

const FlexContainer = ({ children, center, col, alignCenter, justifyBetween, gap, alignEnd, className = '' }) => {
  const classes = classnames(className, 'flex', {
    'justify-center items-center': center,
    'justify-between items-center': justifyBetween,
    'items-end': alignEnd,
    'items-center': alignCenter,
    'flex-col': col,
    'gap-2': gap,
  })

  return <div className={classes}>{children}</div>
}

export default FlexContainer
