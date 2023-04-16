import React, { useEffect, useState, useRef } from 'react'
import FlexContainer from './FlexContainer'
import Spinner from './Spinner'
import classnames from 'classnames'
import { renderSmallImage } from '../utils/rendeImage'
import { useDispatch, useSelector } from 'react-redux'
import LoginModal from './LoginModal'
import { postComment } from '../features/comments/commentsThunks'
import { toast } from 'react-toastify'
import customFetch from '../utils/axios/customFetch'
import { getLocalStorage } from '../utils/localStorage/localStorage'

const CommentForm = props => {
  const { isLoading, marginLeft, placeId, commentId, reply, updateReplies } = props
  const dispatch = useDispatch()
  const inputRef = useRef()

  const { user, isLoading: isUserLoading } = useSelector(store => store.user)

  const [commentValue, setCommentValue] = useState('')
  const [replyValue, setReplyValue] = useState('')

  const [loginModal, setLoginModal] = useState(false)

  const [taggedUsers, setTaggedUsers] = useState([])

  // console.log(commentValue)

  const handleInputChange = e => {
    setCommentValue(e.target.textContent)
  }

  const handleOnKeyDown = e => {
    console.log(e.key)
    if (e.key === 'Enter') handleOnSubmit()
  }

  const handleReplySubmit = async e => {
    e.preventDefault()
    if (!replyValue) return toast.error('Please enter a reply')
    const body = { reply: replyValue, commentId }

    const { token, firstName, lastName, image } = getLocalStorage('user')

    try {
      const { data } = await customFetch.post(`/reply`, body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      const reply = data.reply
      reply.first_name = firstName
      reply.last_name = lastName
      reply.image = image

      updateReplies(reply)

      inputRef.current.textContent = ''
      setReplyValue('')
    } catch (error) {
      toast(error.response.data.message)
    }
  }

  const handleCommentSubmit = e => {
    e.preventDefault()

    if (!user) return setLoginModal(true)

    if (!commentValue) return toast.error('Please enter a comment')
    dispatch(postComment({ comment: commentValue, placeId, tags: taggedUsers }))
  }

  const handleOnSubmit = reply ? handleReplySubmit : handleCommentSubmit

  const closeLoginModal = () => setLoginModal(false)

  const formClasses = classnames('border rounded-3xl bg-transparent p-2', {
    'ml-10': marginLeft,
  })

  useEffect(() => {
    if (!isLoading) {
      inputRef.current.textContent = ''
      setCommentValue('')
      setTaggedUsers([])
    }
  }, [isLoading])

  return (
    <form onSubmit={handleOnSubmit} className='w-full relative'>
      <FlexContainer justifyBetween className={formClasses}>
        {taggedUsers.length > 0 &&
          taggedUsers.map(user => (
            <span key={user.id} className='text-blue-300 mr-1'>
              {user.firstName}
            </span>
          ))}
        <div
          className='outline-none w-[94%]'
          contentEditable={true}
          ref={inputRef}
          onInput={handleInputChange}
          onKeyDown={handleOnKeyDown}
        ></div>
        <button className='text-accent capitalize'>{isLoading ? <Spinner /> : 'post'}</button>
      </FlexContainer>

      {/* login modal */}
      {loginModal && <LoginModal closeModal={closeLoginModal} isLoading={isUserLoading} />}
    </form>
  )
}

export default CommentForm
