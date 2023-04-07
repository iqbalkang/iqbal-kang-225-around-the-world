import React from 'react'
import { Link } from 'react-router-dom'
import { renderSmallImage } from '../utils/rendeImage'
import FlexContainer from './FlexContainer'

const CommentorDescription = ({ props, children }) => {
  const {
    image,
    first_name: commentorFirstName,
    last_name: commentorLastName,
    comment,
    user_id: userId,
    reply,
    mentions,
  } = props

  const renderMentions = mentions?.map(mention => (
    <Link key={mention.id} className='hover:underline capitalize text-xs text-blue-600' to={'/people/' + mention.id}>
      {mention.first_name} {mention.last_name}
    </Link>
  ))

  return (
    <FlexContainer gap>
      {/* commentor's image - left side */}
      <div className='h-10 w-10 shrink-0 rounded-full overflow-hidden mt-2'>
        {renderSmallImage(image, commentorFirstName, commentorLastName)}
      </div>

      {/* commentor's info - right side */}
      <div className='w-full'>
        <div className='bg-light-gray rounded-3xl p-2 px-4 mb-1'>
          <Link to={'/people/' + userId} className='hover:underline'>
            <p className='font-semibold capitalize'>
              {commentorFirstName} {commentorLastName}
            </p>
          </Link>
          <p>{comment || reply}</p>
          {/* tagged people (mentions) */}
          {mentions?.length > 0 && (
            <FlexContainer alignCenter gap>
              <p>Mentions: </p>
              <FlexContainer gap>{renderMentions}</FlexContainer>
            </FlexContainer>
          )}
        </div>

        {children}
      </div>
    </FlexContainer>
  )
}

export default CommentorDescription
