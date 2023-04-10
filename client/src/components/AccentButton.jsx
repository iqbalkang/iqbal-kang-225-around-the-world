import React from 'react'
import classnames from 'classnames'
import Spinner from './Spinner'

const AccentButton = ({ children, isLoading, big, primary, small, xs, full, outline, onClick }) => {
  const classes = classnames(
    `flex justify-center align-center gap-2 overflow-hidden relative capitalize shadow-accent/20 rounded-xl
    flex-container-center hover:shadow-none hover:scale-95 duration-200
    before:w-full before:bg-white before:h-4 before:absolute before:-translate-x-full before:rotate-45
    before:left-0 before:bottom-0 hover:before:translate-x-full before:duration-300 text-white`,
    {
      'min-w-[150px] px-6 py-4': big,
      'px-4 py-2 min-w-[110px]': small,
      'px-4 py-1 min-w-[110px]': xs,
      'bg-accent shadow-lg': primary,
      'text-accent border border-accent': outline,
      'w-full': full,
    }
  )

  return (
    <button className={classes} disabled={isLoading} onClick={onClick}>
      {isLoading && <Spinner />}
      {children}
    </button>
  )
}

export default AccentButton
