import React, { useEffect } from 'react'
import { BiLike } from 'react-icons/bi'
import { BsEmojiExpressionless } from 'react-icons/bs'
import FlexContainer from './FlexContainer'
import Heading from './Heading'
import Image from './Image'

const Comments = () => {
  return (
    <div className='max-w-2xl text-sm'>
      <Heading offWhite h4>
        Comments
      </Heading>

      {/* comments container */}
      <div className='space-y-6 mt-2 mb-6'>
        <Comment />
        <Comment />
        <Comment />
      </div>

      {/* comment form */}
      <form>
        <FlexContainer justifyBetween className='ml-10 border rounded-3xl bg-transparent p-2'>
          <div className='outline-none w-[94%]' contentEditable={true}></div>
          <button className='text-accent capitalize'>post</button>
        </FlexContainer>
      </form>
    </div>
  )
}

export default Comments

const Comment = () => {
  return (
    <FlexContainer gap>
      <div className='h-10 w-10 shrink-0 rounded-full overflow-hidden'>
        <img src='' className='h-full w-full' />
      </div>
      <div>
        <Heading bold h6 offWhite>
          iqbal kang
        </Heading>
        <p className='mb-2'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero voluptates fugit deserunt itaque illo vel
          animi expedita voluptas eveniet tenetur similique commodi reiciendis quisquam dolores, quo, repudiandae
          officia ab id doloremque cum dicta corrupti culpa doloribus adipisci. Ea quisquam, tenetur at ab sit minima
          explicabo dicta earum dolor suscipit velit.
        </p>
        <FlexContainer justifyBetween>
          <button className='flex items-center gap-2 capitalize'>
            <BiLike />
            like
          </button>

          <div className='flex items-center gap-2'>
            <BsEmojiExpressionless />
            <p>You and 85 others</p>
          </div>
        </FlexContainer>
      </div>
    </FlexContainer>
  )
}
