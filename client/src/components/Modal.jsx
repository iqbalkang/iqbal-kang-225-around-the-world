import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

const Modal = ({ children, closeModal, className = '' }) => {
  const innerDivClasses = classnames(
    className,
    'fixed py-6 rounded bg-white shadow-md cursor-auto overflow-y-scroll p-4'
  )
  const backdropClasses =
    'fixed inset-0 bg-dark-gray bg-opacity-50 backdrop-blur-sm z-20 cursor-pointer flex flex-col justify-center items-center'

  const handleModal = e => {
    e.stopPropagation()
    if (e.target.id === 'backdrop') return closeModal ? closeModal() : null
  }

  return ReactDOM.createPortal(
    <div id='backdrop' className={backdropClasses} onMouseDown={handleModal}>
      <div className={innerDivClasses}>{children}</div>
    </div>,
    document.getElementById('modal')
  )
}

export default Modal
