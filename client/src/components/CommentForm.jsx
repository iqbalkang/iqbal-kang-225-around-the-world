import React, { useEffect } from 'react'
import FlexContainer from './FlexContainer'
import Spinner from './Spinner'
import classnames from 'classnames'

const CommentForm = React.forwardRef((props, ref) => {
  const { isLoading, onSubmit, marginLeft } = props

  const formClasses = classnames('border rounded-3xl bg-transparent p-2', {
    'ml-10': marginLeft,
  })

  useEffect(() => {
    if (!isLoading) ref.current.innerText = ''
  }, [isLoading])

  return (
    <form onSubmit={onSubmit} className='w-full'>
      <FlexContainer justifyBetween className={formClasses}>
        <div className='outline-none w-[94%]' contentEditable={true} ref={ref}></div>
        <button className='text-accent capitalize'>{isLoading ? <Spinner /> : 'post'}</button>
      </FlexContainer>
    </form>
  )
})

export default CommentForm
