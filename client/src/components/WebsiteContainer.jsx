import React from 'react'
import classnames from 'classnames'

const WebsiteContainer = ({ children, className }) => {
  const containerClasses = classnames(className, 'w-full h-full max-w-7xl mx-auto')
  return <div className={containerClasses}>{children}</div>
}

export default WebsiteContainer
