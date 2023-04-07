import React, { useEffect, useState, useRef } from 'react'
import FlexContainer from './FlexContainer'
import Spinner from './Spinner'
import classnames from 'classnames'
import { renderSmallImage } from '../utils/rendeImage'
import { searchUsers, getAllUsers } from '../features/user/userThunk'
import { useDispatch, useSelector } from 'react-redux'
import LoginModal from './LoginModal'
import { getComments, getCommentsForSignedInUsers, postComment } from '../features/comments/commentsThunks'
import { toast } from 'react-toastify'
import customFetch from '../utils/axios/customFetch'
import { getLocalStorage } from '../utils/localStorage/localStorage'

const CommentForm = React.forwardRef((props, ref) => {
  const { isLoading, marginLeft, placeId, commentId, reply, updateReplies } = props
  const dispatch = useDispatch()
  const inputRef = useRef()

  const { user, isLoading: isUserLoading } = useSelector(store => store.user)

  const [commentValue, setCommentValue] = useState('')
  const [replyValue, setReplyValue] = useState('')

  const [loginModal, setLoginModal] = useState(false)
  const [showSearchedUser, setShowSearchedUser] = useState(false)

  const [searchedUsers, setSearchedUsers] = useState([])
  const [taggedUsers, setTaggedUsers] = useState([])
  const [activateTagging, setActivateTagging] = useState(false)

  const searchUsers = async name => {
    const atIndex = name.indexOf('@')
    name = name.slice(atIndex + 1)

    if (!name) return

    try {
      const { data } = await customFetch.get(`/authentication/search-users?name=${name}`)
      setSearchedUsers(data.users)
      return data
    } catch (error) {
      toast(error.response.data.message)
    }
  }

  const handleInputChange = e => {
    if (reply) {
      setReplyValue(e.target.textContent)
      return searchUsers(e.target.textContent)
    }
    setCommentValue(e.target.textContent)
    if (activateTagging) searchUsers(e.target.textContent)
  }

  const handleOnKeyDown = e => {
    if (e.key === '@') setActivateTagging(true)
    if (e.key === 'Backspace') {
      if (commentValue || replyValue) return
      const remainingTags = taggedUsers.filter((tag, index) => index !== taggedUsers.length - 1)
      setTaggedUsers(remainingTags)
    }
  }

  const handleOnBlur = () => setShowSearchedUser(false)

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

  const handleTaggedUserClick = user => {
    setTaggedUsers([...taggedUsers, user])
    // setActivateTagging(false)
    setShowSearchedUser(false)
    setCommentValue('')
    inputRef.current.textContent = ''
    inputRef.current.focus()
  }

  const handleCommentSubmit = e => {
    e.preventDefault()

    if (!user) return setLoginModal(true)

    if (!commentValue) return toast.error('Please enter a comment')
    dispatch(postComment({ comment: commentValue, placeId, tags: taggedUsers }))
  }

  const handleOnSubmit = reply ? handleReplySubmit : handleCommentSubmit

  const closeLoginModal = () => setLoginModal(false)

  useEffect(() => {
    if (!isUserLoading) setLoginModal(false)
    if (searchedUsers.length > 0) setShowSearchedUser(true)
  }, [isUserLoading, searchedUsers])

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current.focus()
    }, 10)
    return () => clearTimeout(timer)
  }, [taggedUsers])

  // console.log(activateTagging, showSearchedUser)

  useEffect(() => {
    if (!commentValue || (!replyValue && reply)) {
      setShowSearchedUser(false)
      setActivateTagging(false)
    }
  }, [commentValue, replyValue])

  const renderUsersForTagging = searchedUsers?.map(user => {
    const { firstName, lastName, image, id } = user
    return (
      <FlexContainer alignCenter gap key={id} className='group hover:cursor-pointer'>
        <div
          className='h-8 w-8 shrink-0 rounded-full overflow-hidden'
          onMouseDown={handleTaggedUserClick.bind(null, user)}
        >
          {renderSmallImage(image, firstName, lastName)}
        </div>
        <p className='capitalize group-hover:underline' onMouseDown={handleTaggedUserClick.bind(null, user)}>
          {firstName} {lastName}
        </p>
      </FlexContainer>
    )
  })

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
          onBlur={handleOnBlur}
        ></div>
        <button className='text-accent capitalize'>{isLoading ? <Spinner /> : 'post'}</button>
      </FlexContainer>

      {searchedUsers.length > 0 && showSearchedUser && (
        <div className='absolute bottom-full mb-2 space-y-2 bg-black p-4 rounded-3xl min-w-[300px]'>
          {renderUsersForTagging}
        </div>
      )}

      {/* login modal */}
      {loginModal && <LoginModal closeModal={closeLoginModal} isLoading={isUserLoading} />}
    </form>
  )
})

export default CommentForm
