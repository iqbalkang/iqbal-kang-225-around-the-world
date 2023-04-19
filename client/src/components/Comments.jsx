import React, { useEffect } from 'react'

import Heading from './Heading'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getComments, getCommentsForSignedInUsers } from '../features/comments/commentsThunks'
import Comment from './Comment'
import CommentForm from './CommentForm'
import CommentFormNew from './CommentFormNew'

const Comments = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const { placeId } = useParams()

  const { comments, isLoading } = useSelector(store => store.comments)
  const { user, isLoading: isUserLoading, allUsers } = useSelector(store => store.user)

  useEffect(() => {
    user ? dispatch(getCommentsForSignedInUsers(placeId)) : dispatch(getComments(placeId))
  }, [placeId])

  const renderComments = comments.map((comment, index) => <Comment key={index} comment={comment} placeId={placeId} />)

  return (
    <div className='w-[42rem] text-sm' ref={ref}>
      <Heading offWhite h4>
        Comments
      </Heading>

      {/* comments container */}
      <div className='space-y-6 mt-2 mb-6 max-h-[600px] overflow-y-scroll'>{renderComments}</div>

      {/* comment form */}
      {/* <CommentForm marginLeft isLoading={isLoading} placeId={placeId} allUsers={allUsers} /> */}
      <CommentFormNew marginLeft isLoading={isLoading} placeId={placeId} allUsers={allUsers} />
    </div>
  )
})

export default Comments
