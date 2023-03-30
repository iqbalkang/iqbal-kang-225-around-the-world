import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './Modal'
import LoginForm from '../components/LoginForm'
import { loginUser } from '../features/user/userThunk'
import Heading from '../components/Heading'

const initialInputsState = {
  email: '',
  password: '',
}

const LoginModal = ({ closeModal, isLoading }) => {
  const dispatch = useDispatch()
  const [values, setValues] = useState(initialInputsState)

  const submitHandler = e => {
    e.preventDefault()
    dispatch(loginUser(values))
  }

  const onChangeHandler = e =>
    setValues(prevValues => {
      const { name, value } = e.target
      return { ...prevValues, [name]: value }
    })

  return (
    <Modal closeModal={closeModal}>
      <Heading h3 className='mb-2'>
        log in to continue
      </Heading>
      <LoginForm
        onSubmit={submitHandler}
        isLoading={isLoading}
        onChange={onChangeHandler}
        className='w-[400px] '
        placeholderText='peer-focus:text-black'
      />
    </Modal>
  )
}

export default LoginModal
