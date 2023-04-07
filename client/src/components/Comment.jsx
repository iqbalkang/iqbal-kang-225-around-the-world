import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineFire as Fire, AiOutlineHeart as Heart, AiOutlineStop as Stop } from 'react-icons/ai'
import { FaRegSadCry as Sad } from 'react-icons/fa'
import { BiLike as Like, BiConfused as Think } from 'react-icons/bi'
import { BsEmojiLaughing as Haha } from 'react-icons/bs'
import { renderSmallImage } from '../utils/rendeImage'
import FlexContainer from './FlexContainer'
import { BsEmojiExpressionless } from 'react-icons/bs'
import { CgMailReply } from 'react-icons/cg'
import Reactions from './Reactions'
import { useDispatch, useSelector } from 'react-redux'
import { toggleCommentReaction } from '../features/comments/commentsThunks'
import CommentForm from './CommentForm'
import { toast } from 'react-toastify'
import CommentorDescription from './CommentorDescription'
import customFetch from '../utils/axios/customFetch'
import { getLocalStorage } from '../utils/localStorage/localStorage'
import LoginModal from './LoginModal'

const buttonBaseClasses = 'flex items-center gap-1 capitalize hover:underline'

const Comment = ({ comment }) => {
  const inputRef = useRef()
  const dispatch = useDispatch()

  // const { replies } = useSelector(store => store.replies)
  // const { user, isLoading } = useSelector(store => store.user)
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
      dispatch(toggleCommentReaction({ commentId, type: selectedReaction }))
    } else {
      setSelectedReaction('like')
      dispatch(toggleCommentReaction({ commentId, type: 'like' }))
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

  // const handleReplySubmit = async e => {
  //   e.preventDefault()
  //   const reply = inputRef.current.innerText

  //   if (!reply) return toast.error('Please enter a reply')
  //   const body = { reply, commentId }

  //   const { token, firstName, lastName, image } = getLocalStorage('user')

  //   try {
  //     const { data } = await customFetch.post(`/reply`, body, {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     })

  //     const reply = data.reply
  //     reply.first_name = firstName
  //     reply.last_name = lastName
  //     reply.image = image

  //     setReplies([...replies, reply])
  //     setReplyCountButtonText('view other replies')
  //     inputRef.current.innerText = ''
  //   } catch (error) {
  //     toast(error.response.data.message)
  //   }
  // }

  const updateReplies = reply => {
    setReplies([...replies, reply])
    setReplyCountButtonText('view other replies')
  }

  // console.log(replies)

  const renderReplies = replies.map((reply, index) => <CommentorDescription key={index} props={reply} />)

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
      {/* button to display total number of replies */}
      {/* {renderReplyCountButtonText(replyCount)} */}
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
          {/* <CommentForm ref={inputRef} onSubmit={handleReplySubmit} /> */}
          <CommentForm ref={inputRef} commentId={commentId} updateReplies={updateReplies} allUsers={allUsers} reply />
        </FlexContainer>
      )}

      {/* login modal */}
      {loginModal && <LoginModal closeModal={closeLoginModal} isLoading={isLoading} />}
    </CommentorDescription>
  )
}
export default Comment
