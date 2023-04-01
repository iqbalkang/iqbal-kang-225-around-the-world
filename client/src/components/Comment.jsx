import React, { useState, useEffect } from 'react'
import { AiOutlineFire as Fire, AiOutlineHeart as Heart, AiOutlineStop as Stop } from 'react-icons/ai'
import { FaRegSadCry as Sad } from 'react-icons/fa'
import { BiLike as Like, BiConfused as Think } from 'react-icons/bi'
import { BsEmojiLaughing as Haha } from 'react-icons/bs'
import { renderSmallImage } from '../utils/rendeImage'
import FlexContainer from './FlexContainer'
import Heading from './Heading'
import { BsEmojiExpressionless } from 'react-icons/bs'
import Reactions from './Reactions'
import { useDispatch } from 'react-redux'
import { toggleCommentReaction } from '../features/comments/commentsThunks'

// const Comment = ({ updateReaction, selectedReaction, comment }) => {
const Comment = ({ comment }) => {
  const [selectedReaction, setSelectedReaction] = useState(null)

  const { first_name: firstName, last_name: lastName, image, comment: text, reaction, id: commentId } = comment

  const dispatch = useDispatch()

  const toggleReaction = () => {
    if (selectedReaction) setSelectedReaction(null)
    else setSelectedReaction('like')

    dispatch(toggleCommentReaction({ commentId, type: 'like' }))
  }

  const updateReaction = reaction => setSelectedReaction(reaction)

  const renderReaction = () => {
    const buttonBaseClasses = 'flex items-center gap-2 capitalize hover:underline'
    if (!selectedReaction)
      return (
        <button className={buttonBaseClasses} onClick={toggleReaction}>
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
      <button className={buttonBaseClasses + ' text-accent'} onClick={toggleReaction}>
        {output}
        {selectedReaction}
      </button>
    )
  }

  useEffect(() => {
    console.log(reaction)
    setSelectedReaction(reaction)
  }, [reaction])

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
export default Comment
