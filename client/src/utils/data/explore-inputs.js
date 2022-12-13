import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'

const inputs = [
  {
    label: 'search',
    type: 'text',
    required: true,
  },
  {
    label: 'title',
    type: 'text',
    required: true,
  },
  {
    label: 'country',
    type: 'text',
    required: true,
  },
  {
    label: 'description',
    type: 'textarea',
    required: true,
  },
  {
    label: 'upload an image',
    type: 'file',
    required: true,
  },
]

export default inputs
