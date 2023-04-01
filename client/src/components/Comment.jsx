import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineFire as Fire, AiOutlineHeart as Heart, AiOutlineStop as Stop } from 'react-icons/ai'
import { FaRegSadCry as Sad } from 'react-icons/fa'
import { BiLike as Like, BiConfused as Think } from 'react-icons/bi'
import { BsEmojiLaughing as Haha } from 'react-icons/bs'
import { renderSmallImage } from '../utils/rendeImage'
import FlexContainer from './FlexContainer'
import Heading from './Heading'
import { BsEmojiExpressionless } from 'react-icons/bs'
import { CgMailReply } from 'react-icons/cg'
import Reactions from './Reactions'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCommentReaction } from '../features/comments/commentsThunks'
import CommentForm from './CommentForm'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { postReply } from '../features/replies/repliesThunks'

const buttonBaseClasses = 'flex items-center gap-1 capitalize hover:underline'

const Comment = ({ comment }) => {
  const inputRef = useRef()

  const { user } = useSelector(store => store.user)
  const [selectedReaction, setSelectedReaction] = useState(null)
  const [showCommentForm, setShowCommentForm] = useState(false)

  const { firstName, lastName, image } = user

  const toggleCommentForm = () => setShowCommentForm(prevState => !prevState)

  const {
    first_name: commentorFirstName,
    last_name: commentorLastName,
    commentorImage,
    comment: text,
    reaction,
    id: commentId,
    user_id: userId,
  } = comment

  const dispatch = useDispatch()

  const toggleReaction = () => {
    if (selectedReaction) {
      setSelectedReaction(null)
      dispatch(toggleCommentReaction({ commentId, type: selectedReaction }))
    } else {
      setSelectedReaction('like')
      dispatch(toggleCommentReaction({ commentId, type: 'like' }))
    }
  }

  const updateReaction = reaction => setSelectedReaction(reaction)

  const renderReaction = () => {
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

  const handleReplySubmit = e => {
    e.preventDefault()
    const reply = inputRef.current.innerText

    if (!reply) return toast.error('Please enter a reply')
    dispatch(postReply({ reply, commentId }))
  }

  useEffect(() => {
    setSelectedReaction(reaction)
  }, [reaction])

  return (
    <FlexContainer gap>
      <div className='h-10 w-10 shrink-0 rounded-full overflow-hidden'>
        {renderSmallImage(commentorImage, commentorFirstName, commentorLastName)}
      </div>
      <div className='w-full'>
        <Link to={'/people/' + userId} className='hover:underline'>
          <Heading bold h6 offWhite>
            {commentorFirstName} {commentorLastName}
          </Heading>
        </Link>
        <p className='mb-2'>{text}</p>
        <FlexContainer justifyBetween>
          <FlexContainer className='gap-4 mb-2'>
            <div className='relative group'>
              {renderReaction()}
              <Reactions updateReaction={updateReaction} commentId={commentId} />
            </div>
            <button className={buttonBaseClasses} onClick={toggleCommentForm}>
              reply
            </button>
            <p className='text-light-gray'>1h ago</p>
          </FlexContainer>

          <div className='flex items-center gap-2'>
            <BsEmojiExpressionless />
            <p>You and 85 others</p>
          </div>
        </FlexContainer>
        <button className={buttonBaseClasses + ' mb-2'}>
          <CgMailReply className='rotate-180' size={22} /> view all 5 replies
        </button>
        {showCommentForm && (
          <FlexContainer alignCenter gap>
            <div className='h-8 w-8 shrink-0 rounded-full overflow-hidden'>
              {renderSmallImage(image, firstName, lastName)}
            </div>
            <CommentForm ref={inputRef} onSubmit={handleReplySubmit} />
          </FlexContainer>
        )}
      </div>
    </FlexContainer>
  )
}
export default Comment
