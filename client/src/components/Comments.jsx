import React, { useEffect, useState, useRef } from 'react'
import { BsEmojiExpressionless } from 'react-icons/bs'
import FlexContainer from './FlexContainer'
import Heading from './Heading'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Reactions from './Reactions'
import Image from './Image'

import { AiOutlineFire as Fire, AiOutlineHeart as Heart, AiOutlineStop as Stop } from 'react-icons/ai'
import { FaRegSadCry as Sad } from 'react-icons/fa'
import { BiLike as Like, BiConfused as Think } from 'react-icons/bi'
import { BsEmojiLaughing as Haha } from 'react-icons/bs'
import { getComments, postComment } from '../features/comments/commentsThunks'
import { toast } from 'react-toastify'
import { renderSmallImage } from '../utils/rendeImage'
import Spinner from './Spinner'

const Comments = () => {
  const inputRef = useRef()
  const dispatch = useDispatch()
  const { placeId } = useParams()

  const { comments, isLoading } = useSelector(store => store.comments)
  const [selectedReaction, setSelectedReaction] = useState(null)

  const updateSelectedReaction = reaction => setSelectedReaction(reaction)

  const handleCommentSubmit = e => {
    e.preventDefault()
    const comment = inputRef.current.innerText

    if (!comment) return toast.error('Please enter a comment')
    dispatch(postComment({ comment, placeId }))
  }

  useEffect(() => {
    dispatch(getComments(placeId))
  }, [placeId])

  useEffect(() => {
    if (!isLoading) inputRef.current.innerText = ''
  }, [isLoading])

  const renderComments = comments.map((comment, index) => (
    <Comment
      key={index}
      updateReaction={updateSelectedReaction}
      selectedReaction={selectedReaction}
      comment={comment}
    />
  ))

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

const Comment = ({ updateReaction, selectedReaction, comment }) => {
  const { first_name: firstName, last_name: lastName, image, comment: text } = comment
  const toggleReaction = () => {
    if (selectedReaction) updateReaction(null)
    else updateReaction('like')
  }

  const renderReaction = () => {
    if (!selectedReaction)
      return (
        <button className='flex items-center gap-2 capitalize hover:underline' onClick={toggleReaction}>
          <Like />
          like
        </button>
      )

    let output
    if (selectedReaction === 'like') output = <Like />
    if (selectedReaction === 'heart') output = <Heart />
    if (selectedReaction === 'sad') output = <Sad />
    if (selectedReaction === 'haha') output = <Haha />
    if (selectedReaction === 'fire') output = <Fire />
    if (selectedReaction === 'stop') output = <Stop />
    if (selectedReaction === 'think') output = <Think />

    return (
      <button className='flex items-center gap-2 capitalize text-accent hover:underline' onClick={toggleReaction}>
        {output}
        {selectedReaction}
      </button>
    )
  }

  return (
    <FlexContainer gap>
      <div className='h-10 w-10 shrink-0 rounded-full overflow-hidden'>
        {renderSmallImage(image, firstName, lastName)}
      </div>
      <div className='w-full'>
        <Heading bold h6 offWhite>
          {firstName} {lastName}
        </Heading>
        <p className='mb-2'>{text}</p>
        <FlexContainer justifyBetween>
          <div className='relative group'>
            {renderReaction()}
            <Reactions updateReaction={updateReaction} />
          </div>

          <div className='flex items-center gap-2'>
            <BsEmojiExpressionless />
            <p>You and 85 others</p>
          </div>
        </FlexContainer>
      </div>
    </FlexContainer>
  )
}
