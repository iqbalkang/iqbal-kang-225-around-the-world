import React from 'react'
import ReactDOM from 'react-dom'

const Notification = ({ text, bgColor, icon }) => {
  return ReactDOM.createPortal(
    <div className='flex justify-center relative z-20 gelatin'>
      <div className={`fixed flex items-center gap-2 top-20  rounded-full p-2 pr-8 gelatine bg-white`}>
        <div className={`${bgColor} rounded-full p-2`}>{icon}</div>
        <p className='first-letter:capitalize'>{text}</p>
      </div>
    </div>,
    document.getElementById('notification')
  )
}

export default Notification
