import React, { useEffect, useState, useRef } from 'react'
import FlexContainer from './FlexContainer'
import Spinner from './Spinner'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import LoginModal from './LoginModal'
import { editComment, postComment } from '../features/comments/commentsThunks'
import { toast } from 'react-toastify'
import customFetch from '../utils/axios/customFetch'
import { getLocalStorage } from '../utils/localStorage/localStorage'
import { MentionsInput, Mention } from 'react-mentions'
import defaultStyles from '../utils/defaultStyles'

const CommentFormNew = props => {
  const {
    isLoading,
    marginLeft,
    placeId,
    commentId,
    reply,
    updateReplies,
    edit,
    text,
    setShowEditCommentForm,
    handleEditReplies,
  } = props
  const dispatch = useDispatch()
  const commentFormRef = useRef()

  const { user, isLoading: isUserLoading } = useSelector(store => store.user)

  const [commentValue, setCommentValue] = useState('')
  const [replyValue, setReplyValue] = useState('')

  const [loginModal, setLoginModal] = useState(false)

  const searchUsers = async (name, callback) => {
    try {
      const { data } = await customFetch.get(`/authentication/search-users?name=${name}`)
      callback(data.users)
      return data.users
    } catch (error) {
      toast(error.response.data.message)
    }
  }

  const handleOnChange = e => {
    const { value } = e.target
    if (reply) return setReplyValue(value)
    setCommentValue(value)
  }

  const handleReplySubmit = async e => {
    e.preventDefault()

    if (!replyValue) return toast.error('Please enter a reply')
    const body = { reply: replyValue, commentId }

    const { token } = getLocalStorage('user')

    try {
      const { data } = await customFetch.post(`/reply`, body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      updateReplies(data.reply)
      setReplyValue('')
    } catch (error) {
      toast(error.response.data.message)
    }
  }

  const handleCommentSubmit = e => {
    e.preventDefault()

    if (!user) return setLoginModal(true)

    if (!commentValue) return toast.error('Please enter a comment')
    dispatch(postComment({ comment: commentValue, placeId }))
    setCommentValue('')
  }

  const handleCommentEditSubmit = e => {
    e.preventDefault()

    if (!commentValue) return toast.error('Please enter a comment')
    dispatch(editComment({ comment: commentValue, commentId }))
    setCommentValue('')
    setShowEditCommentForm(false)
  }

  const handleOnKeyDown = e => {
    if (e.key === 'Enter') handleOnSubmit(e)
  }

  useEffect(() => {
    if (edit && reply) setReplyValue(text)
    if (edit) setCommentValue(text)
  }, [edit])

  const handleOnSubmit = async e => {
    if (edit && reply) {
      await handleEditReplies(e, { replyId: reply, reply: replyValue })
      return setShowEditCommentForm(false)
    }
    if (reply) return handleReplySubmit(e)
    if (edit) return handleCommentEditSubmit(e)
    return handleCommentSubmit(e)
  }

  useEffect(() => {
    if (reply) commentFormRef.current.focus()
  }, [])

  const closeLoginModal = () => setLoginModal(false)

  const formClasses = classnames('border rounded-3xl  p-2', {
    'ml-10': marginLeft,
  })

  return (
    <form onSubmit={handleOnSubmit} className='w-full relative'>
      <FlexContainer justifyBetween className={formClasses}>
        <MentionsInput
          value={reply ? replyValue : commentValue}
          className='w-[94%]'
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          style={defaultStyles}
          inputRef={commentFormRef}
        >
          <Mention data={searchUsers} className='bg-accent' />
        </MentionsInput>
        <button className='text-accent capitalize'>{isLoading ? <Spinner /> : 'post'}</button>
      </FlexContainer>

      {/* login modal */}
      {loginModal && <LoginModal closeModal={closeLoginModal} isLoading={isUserLoading} />}
    </form>
  )
}

export default CommentFormNew
