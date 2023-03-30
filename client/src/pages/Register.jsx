import React, { useState, useEffect } from 'react'
import FormRowContainerWithLogo from '../components/FormRowContainerWithLogo'
import { loginUser, registerUser } from '../features/user/userThunk'
import bgImage from '../images/bg.png'
import { loginInputs, registerInputs } from '../utils/data/authenticationInputs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AccentButton from '../components/AccentButton'
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
  // const accentButtonText = isMember ? 'create account' : 'log in'
  // const formRowContainerWithLogoClasses = index => (index === 0 || index === 1 ? 'col-span-1' : 'col-span-2')

  // const generateAuthPropsObject = (index, input) => {
  //   return {
  //     key: index,
  //     index: index,
  //     input: input,
  //     onChange: onChangeHandler,
  //     value: values[input.label],
  //   }
  // }

  // const formLoginInputs = loginInputs.map((input, index) => {
  //   const propsObj = generateAuthPropsObject(index, input)
  //   return <FormRowContainerWithLogo primary className='col-span-2' key={index} propsObj={propsObj} />
  // })

  // const formRegisterInputs = registerInputs.map((input, index) => {
  //   const propsObj = generateAuthPropsObject(index, input)
  //   return (
  //     <FormRowContainerWithLogo
  //       primary
  //       className={formRowContainerWithLogoClasses(index)}
  //       key={index}
  //       propsObj={propsObj}
  //     />
  //   )
  // })

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
        <FlexContainer className='mb-4'>
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
