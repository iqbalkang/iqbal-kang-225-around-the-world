import React from 'react'
import classnames from 'classnames'

const AccentButton = ({ children, isLoading, big, primary, small, full, outline }) => {
  const classes = classnames(
    `overflow-hidden relative capitalize shadow-accent/20 shadow-lg rounded-xl
    flex-container-center hover:shadow-none hover:scale-95 duration-200
    before:w-full before:bg-white before:h-4 before:absolute before:-translate-x-full before:rotate-45
    before:left-0 before:bottom-0 hover:before:translate-x-full before:duration-300`,
    {
      'min-w-[150px] px-6 py-4': big,
      'px-4 py-2': small,
      'bg-accent': primary,
      'text-accent border border-accent': outline,
      'w-full': full,
    }
  )

  return (
    <button className={classes} disabled={isLoading}>
      {isLoading && <Spinner />}
      {children}
    </button>
  )
}

export default AccentButton

const Spinner = () => <div className='h-4 w-4 rounded-full border-2 border-b-accent animate-spin'></div>
