import React, { useEffect, useState, useRef } from 'react'

import FlexContainer from './FlexContainer'
import Heading from './Heading'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Image from './Image'

import { getComments, getCommentsForSignedInUsers, postComment } from '../features/comments/commentsThunks'
import { toast } from 'react-toastify'
import Spinner from './Spinner'
import Comment from './Comment'

const Comments = () => {
  const inputRef = useRef()
  const dispatch = useDispatch()
  const { placeId } = useParams()

  const { user } = useSelector(store => store.user)
  const { comments, isLoading } = useSelector(store => store.comments)

  const handleCommentSubmit = e => {
    e.preventDefault()
    const comment = inputRef.current.innerText

    if (!comment) return toast.error('Please enter a comment')
    dispatch(postComment({ comment, placeId }))
  }

  useEffect(() => {
    user ? dispatch(getCommentsForSignedInUsers(placeId)) : dispatch(getComments(placeId))
  }, [placeId])

  useEffect(() => {
    if (!isLoading) inputRef.current.innerText = ''
  }, [isLoading])

  const renderComments = comments.map((comment, index) => <Comment key={index} comment={comment} />)

  return (
    <div className='w-[42rem] text-sm'>
      <Heading offWhite h4>
        Comments
      </Heading>

      {/* comments container */}
      <div className='space-y-6 mt-2 mb-6'>{renderComments}</div>

      {/* comment form */}
      <form onSubmit={handleCommentSubmit}>
        <FlexContainer justifyBetween className='ml-10 border rounded-3xl bg-transparent p-2'>
          <div className='outline-none w-[94%]' contentEditable={true} ref={inputRef}></div>
          <button className='text-accent capitalize'>{isLoading ? <Spinner /> : 'post'}</button>
        </FlexContainer>
      </form>
    </div>
  )
}

export default Comments
