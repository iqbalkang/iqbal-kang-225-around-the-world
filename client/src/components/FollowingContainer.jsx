import React from 'react'
import FlexContainer from './FlexContainer'
import { renderSmallImage } from '../utils/rendeImage'
import AccentButton from './AccentButton'

const FollowingContainer = ({ id, firstName, lastName, image, status }) => {
  const renderFollowButton = () => {
    // if (currentUser?.id === user?.id) return

    if (status === 'pending')
      return (
        <AccentButton small outline>
          requested
        </AccentButton>
      )
    else if (status === 'accepted')
      return (
        <AccentButton small outline>
          following
        </AccentButton>
      )
    else
      return (
        <AccentButton small primary>
          follow
        </AccentButton>
      )
  }

  return (
    <FlexContainer gap alignCenter className='py-2'>
      <div className='h-10 w-10 overflow-hidden rounded-full border border-dark-gray'>
        {renderSmallImage(image, firstName, lastName)}
      </div>
      <p className='mr-auto capitalize font-semibold text-sm'>
        {firstName} {lastName}
      </p>
      {/* <FollowButton> follow</FollowButton> */}
      {renderFollowButton()}
    </FlexContainer>
  )
}

export default FollowingContainer

// const FollowButton = ({ onClick, children }) => {
//   return (
//     <button className='bg-accent p-1 text-sm min-w-[80px] rounded-lg capitalize text-white' onClick={onClick}>
//       {children}
//     </button>
//   )
// }
