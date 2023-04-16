import React, { useState, useEffect } from 'react'
import { AiOutlineFire as Fire, AiOutlineHeart as Heart, AiOutlineStop as Stop } from 'react-icons/ai'
import { FaRegSadCry as Sad } from 'react-icons/fa'
import { BiLike as Like, BiConfused as Think } from 'react-icons/bi'
import { BsEmojiLaughing as Haha } from 'react-icons/bs'
import { renderSmallImage } from '../utils/rendeImage'
import FlexContainer from './FlexContainer'
import { CgMailReply } from 'react-icons/cg'
import Reactions from './Reactions'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCommentReaction } from '../features/comments/commentsThunks'
import { toast } from 'react-toastify'
import CommentorDescription from './CommentorDescription'
import customFetch from '../utils/axios/customFetch'
import LoginModal from './LoginModal'
import CommentFormNew from './CommentFormNew'
import moment from 'moment'

const buttonBaseClasses = 'flex items-center gap-1 capitalize hover:underline'

const Comment = ({ comment, placeId }) => {
  const dispatch = useDispatch()

  const { user, isLoading, allUsers } = useSelector(store => store.user)

  const [replies, setReplies] = useState([])
  const [selectedReaction, setSelectedReaction] = useState(null)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [replyCountButtonText, setReplyCountButtonText] = useState(null)
  const [showReplyButton, setShowReplyButton] = useState(true)
  const [loginModal, setLoginModal] = useState(false)

  const { firstName, lastName, image } = user || {}

  const toggleCommentForm = () => {
    if (!user) return setLoginModal(true)
    setShowCommentForm(prevState => !prevState)
  }

  const { reaction, id: commentId, reply_count: replyCount } = comment

  const closeLoginModal = () => setLoginModal(false)

  const toggleReaction = () => {
    if (!user) return setLoginModal(true)

    if (selectedReaction) {
      setSelectedReaction(null)
      dispatch(toggleCommentReaction({ commentId, type: selectedReaction, placeId }))
    } else {
      setSelectedReaction('like')
      dispatch(toggleCommentReaction({ commentId, type: 'like', placeId }))
    }
  }

  const updateReaction = reaction => {
    if (!user) return setLoginModal(true)
    setSelectedReaction(reaction)
  }

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

  const handleGetReplies = async () => {
    try {
      const { data } = await customFetch.get(`/reply/${commentId}`)
      setReplies(data.replies)
      setShowReplyButton(false)
    } catch (error) {
      toast(error.response.data.message)
    }
  }

  const updateReplies = reply => {
    reply.first_name = firstName
    reply.last_name = lastName
    reply.image = image

    setReplies([...replies, reply])
    setReplyCountButtonText('view other replies')
  }

  const renderReplies = replies.map((reply, index) => <CommentorDescription key={index} props={reply} />)

  const renderTime = time => moment(time).fromNow()

  useEffect(() => {
    setSelectedReaction(reaction)
  }, [reaction])

  useEffect(() => {
    if (!isLoading) setLoginModal(false)
  }, [isLoading])

  useEffect(() => {
    if (replyCount === 1) setReplyCountButtonText('view 1 reply')
    if (replyCount > 1) setReplyCountButtonText(`view ${replyCount} replies`)
  }, [replyCount])

  return (
    // single comment
    <CommentorDescription props={comment}>
      {/* reactions, timePassed and totalReactions container */}
      <FlexContainer justifyBetween>
        <FlexContainer className='gap-4 mb-2'>
          <div className='relative group'>
            {renderReaction()}
            <Reactions updateReaction={updateReaction} commentId={commentId} placeId={placeId} />
          </div>
          <button className={buttonBaseClasses} onClick={toggleCommentForm}>
            reply
          </button>
          <p className='text-light-gray'> {renderTime(comment.created_at)} </p>
        </FlexContainer>

        {comment.likes_count > 0 && (
          <div className='flex items-center gap-2'>
            <Like />
            <p>
              {comment.likes_count} {comment.likes_count > 1 ? 'likes' : 'like'}
            </p>
          </div>
        )}
      </FlexContainer>
      {/* button to display total number of replies */}
      {replyCount > 0 && showReplyButton && (
        <button className={buttonBaseClasses + ' mb-2'} onClick={handleGetReplies}>
          <CgMailReply className='rotate-180' size={22} /> {replyCountButtonText}
        </button>
      )}

      {/* // replies */}
      <div className='space-y-1 mb-1'>{renderReplies}</div>

      {/* reply to a comment form */}
      {showCommentForm && (
        <FlexContainer alignCenter gap>
          <div className='h-8 w-8 shrink-0 rounded-full overflow-hidden'>
            {renderSmallImage(image, firstName, lastName)}
          </div>
          <CommentFormNew commentId={commentId} updateReplies={updateReplies} allUsers={allUsers} reply />
        </FlexContainer>
      )}

      {/* login modal */}
      {loginModal && <LoginModal closeModal={closeLoginModal} isLoading={isLoading} />}
    </CommentorDescription>
  )
}
export default Comment
