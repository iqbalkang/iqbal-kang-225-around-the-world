import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from './Modal'
import LoginForm from '../components/LoginForm'
import { loginUser } from '../features/user/userThunk'

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
      <LoginForm onSubmit={submitHandler} isLoading={isLoading} onChange={onChangeHandler} className='w-[400px]' />
    </Modal>
  )
}

export default LoginModal
