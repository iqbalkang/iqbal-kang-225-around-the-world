import React, { useState, useEffect } from 'react'
import { loginUser, registerUser } from '../features/user/userThunk'
import bgImage from '../images/bg.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FlexContainer from '../components/FlexContainer'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const formContainerClasses = 'relative z-10 text-white font-josefin px-6 min-w-[450px] w-full md:w-auto'

const initialInputsState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, user } = useSelector(store => store.user)

  const [isMember, setIsMember] = useState(false)

  const [values, setValues] = useState(initialInputsState)

  const onChangeHandler = e =>
    setValues(prevValues => {
      const { name, value } = e.target
      return { ...prevValues, [name]: value }
    })

  const toggleIsMember = () => {
    setIsMember(prevState => !prevState)
    setValues(initialInputsState)
  }

  const submitHandler = e => {
    e.preventDefault()

    !isMember ? dispatch(loginUser(values)) : dispatch(registerUser(values))
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  const headingText = !isMember ? 'Log In' : 'Create new account'
  const paragraphText = isMember ? 'Already a member?' : 'Not a member yet?'
  const buttonText = isMember ? 'Log in' : 'Register'

  const authForm = () => {
    if (!isMember)
      return (
        <LoginForm
          onSubmit={submitHandler}
          isMember={isMember}
          isLoading={isLoading}
          onChange={onChangeHandler}
          isPrimary
        />
      )
    else
      return (
        <RegisterForm onSubmit={submitHandler} isMember={isMember} isLoading={isLoading} onChange={onChangeHandler} />
      )
  }

  return (
    <section className='flex items-center min-h-screen'>
      <img src={bgImage} alt='background' className='absolute w-screen h-screen object-cover z-0' />
      {/* form */}
      <div className={formContainerClasses}>
        <h2 className='text-3xl font-bold md:text-6xl'>{headingText}</h2>
        <FlexContainer gap className='mb-4'>
          <p className='text-light-gray'>{paragraphText}</p>
          <button className='text-accent' onClick={toggleIsMember}>
            {buttonText}
          </button>
        </FlexContainer>

        {/* auth form */}
        {authForm()}
      </div>
    </section>
  )
}

export default Register
