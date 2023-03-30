import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'

const registerInputs = [
  {
    labelText: 'first name',
    label: 'firstName',
    type: 'text',
    icon: <AiOutlineUser className='text-dark-white' size={20} />,
    required: true,
  },
  {
    labelText: 'last name',
    label: 'lastName',
    type: 'text',
    icon: <AiOutlineUser className='text-dark-white' size={20} />,
  },
  {
    label: 'email',
    type: 'email',
    icon: <AiOutlineMail className='text-dark-white' size={20} />,
    required: true,
  },
  {
    label: 'password',
    type: 'password',
    icon: <RiLockPasswordLine className='text-dark-white' size={20} />,
    required: true,
  },
  {
    labelText: 'confirm password',
    label: 'confirmPassword',
    type: 'password',
    icon: <RiLockPasswordLine className='text-dark-white' size={20} />,
    required: true,
  },
]

const loginInputs = [
  {
    label: 'email',
    type: 'email',
    placeholder: 'johndoe@gmail.com',
    icon: <AiOutlineMail className='text-dark-white' size={20} />,
    required: true,
  },
  {
    label: 'password',
    type: 'password',
    placeholder: '**********',
    icon: <RiLockPasswordLine className='text-dark-white' size={20} />,
    required: true,
  },
]

export { registerInputs, loginInputs }
