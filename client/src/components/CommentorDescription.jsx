import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { renderSmallImage } from '../utils/rendeImage'
import FlexContainer from './FlexContainer'

import { useSelector, useDispatch } from 'react-redux'
import EditDeleteButtons from './EditDeleteButtons'
import { deleteComment, editComment } from '../features/comments/commentsThunks'
import CommentFormNew from './CommentFormNew'

const getUserName = tag => {
  const name = tag.split('@[')[1].split(']')[0]
  return name
}

const getUserLink = (name, id) => {
  return `<a href='/people/${id}' style='text-transform:capitalize; color:#3366CC'>${name}</a>`
}

const getTagedComment = comment => {
  const tags = comment.match(/\@\[[\w\s]+\]\(\d+\)/g)
  tags?.forEach(tag => {
    const name = getUserName(tag)
    const id = tag.split('(')[1].split(')')[0]
    const re = new RegExp(`\\@\\[${name}\\]\\(${id}\\)`)
    comment = comment.replace(re, getUserLink(name, id))
  })
  return comment
}

const CommentorDescription = ({ props, children, handleDeleteReplies, handleEditReplies }) => {
  const {
    image,
    first_name: commentorFirstName,
    last_name: commentorLastName,
    comment,
    user_id: userId,
    reply,
    reply_id: replyId,
    id: commentId,
  } = props

  const { user } = useSelector(store => store.user)
  const { id: signedInUserId } = user || {}
  const dispatch = useDispatch()

  const [showEditCommentForm, setShowEditCommentForm] = useState(false)

  function createMarkup() {
    if (comment) return { __html: getTagedComment(comment) }
    else return { __html: getTagedComment(reply) }
  }

  function MyComponent() {
    return <p dangerouslySetInnerHTML={createMarkup()}></p>
  }

  const handleCommentDeleteClick = id => {
    if (replyId) return handleDeleteReplies(id)
    else dispatch(deleteComment(id))
  }

  // const handleCommentDeleteClick = id => {
  //   if (replyId) return handleDeleteReplies, handleEditReplies(id)
  //   else dispatch(deleteComment(id))
  // }

  const handleCommentEditClick = () => setShowEditCommentForm(prevState => !prevState)

  return (
    <FlexContainer gap>
      {/* commentor's image - left side */}
      <div className='h-10 w-10 shrink-0 rounded-full overflow-hidden mt-2'>
        {renderSmallImage(image, commentorFirstName, commentorLastName)}
      </div>

      {/* commentor's info - right side */}
      <div className='w-full'>
        <div className='bg-light-gray rounded-3xl p-2 px-4 mb-1'>
          <FlexContainer justifyBetween>
            <Link to={'/people/' + userId} className='hover:underline'>
              <p className='font-semibold capitalize'>
                {commentorFirstName} {commentorLastName}
              </p>
            </Link>
            <EditDeleteButtons
              isLoading={false}
              addedByUserId={userId}
              signedInUserId={signedInUserId}
              onDelete={handleCommentDeleteClick}
              onEdit={handleCommentEditClick}
              id={commentId || replyId}
            />
          </FlexContainer>

          {showEditCommentForm ? (
            <div className='py-1'>
              <CommentFormNew
                commentId={commentId}
                edit
                reply={replyId}
                text={comment || reply}
                setShowEditCommentForm={setShowEditCommentForm}
                handleEditReplies={handleEditReplies}
              />
            </div>
          ) : (
            <MyComponent />
          )}
        </div>

        {children}
      </div>
    </FlexContainer>
  )
}

export default CommentorDescription
