import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RegisterFormRow from '../components/RegisterFormRow'
import { loginUser, registerUser } from '../features/user/userThunk'
import bgImage from '../images/bg.png'
import inputs from '../utils/data/register-inputs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AccentButton from '../components/AccentButton'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoading, user } = useSelector(store => store.user)
  const [isMember, setIsMember] = useState(true)

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const onChangeHandler = e =>
    setValues(prevValues => {
      const { name, value } = e.target
      return { ...prevValues, [name]: value }
    })

  const toggleIsMember = () => setIsMember(prevState => !prevState)

  const submitHandler = e => {
    e.preventDefault()

    !isMember ? dispatch(loginUser(values)) : dispatch(registerUser(values))
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  return (
    <section className='flex items-center h-screen'>
      <img
        src={bgImage}
        alt='background'
        className='absolute w-screen h-screen object-cover z-0'
      />
      {/* form */}
      <div className='relative z-10 text-white font-josefin px-6 min-w-[450px] w-full md:w-auto '>
        <h2 className='text-3xl font-bold md:text-6xl'>
          {!isMember ? 'Log In' : 'Create new account'}
        </h2>
        <p className='text-dark-white mb-4'>
          {isMember ? 'Already a member?' : 'Not a member yet?'}
          <button className='text-accent ml-2' onClick={toggleIsMember}>
            {isMember ? 'Log in' : 'Register'}
          </button>
        </p>
        {/* form inputs container */}
        <form className='grid grid-cols-2 gap-6' onSubmit={submitHandler}>
          {inputs.map((input, index) => {
            if (!isMember && index === 0) return null
            if (!isMember && index === 1) return null
            if (!isMember && index === inputs.length - 1) return null
            return (
              <RegisterFormRow
                key={index}
                input={input}
                index={index}
                onChange={onChangeHandler}
                value={values[input.label]}
              />
            )
          })}

          <AccentButton isLoading={isLoading}>
            {isLoading && (
              <div className='h-4 w-4 rounded-full border-2 border-b-accent animate-spin'></div>
            )}
            {isMember ? 'create account' : 'log in'}
          </AccentButton>
        </form>
      </div>
    </section>
  )
}

export default Register
