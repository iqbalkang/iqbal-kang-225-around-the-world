import React from 'react'
import { MdModeEdit, MdDeleteForever } from 'react-icons/md'
import FlexContainer from './FlexContainer'
import Spinner from './Spinner'

const EditDeleteButtons = ({ signedInUserId, addedByUserId, isLoading, id, onDelete, onEdit }) => {
  const buttonClasses = 'hover:text-accent duration-200'
  if (signedInUserId === addedByUserId)
    return (
      <FlexContainer gap className='mr-4'>
        <button onClick={onEdit.bind(null, id)}>
          <MdModeEdit size={16} className={buttonClasses} />
        </button>
        <button onClick={onDelete.bind(null, id)}>
          {isLoading ? <Spinner /> : <MdDeleteForever size={16} className={buttonClasses} />}
        </button>
      </FlexContainer>
    )
}

export default EditDeleteButtons
