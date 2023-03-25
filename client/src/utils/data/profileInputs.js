import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'

const profileInputs = [
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
    labelText: 'about me',
    label: 'aboutMe',
    type: 'textarea',
    icon: <AiOutlineUser className='text-dark-white' size={20} />,
  },
]

export default profileInputs
