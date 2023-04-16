import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { toggleCommentReaction } from '../features/comments/commentsThunks'

import sad from '../images/reactions/crying.gif'
import fire from '../images/reactions/fire.gif'
import heart from '../images/reactions/heart.gif'
import haha from '../images/reactions/laugh.gif'
import like from '../images/reactions/like.gif'
import stop from '../images/reactions/no.gif'
import think from '../images/reactions/thinking.gif'

const reactionsToggleClasses = [
  'delay-1000',
  'duration-200',
  'group-hover:visible',
  'group-hover:opacity-100',
  'group-hover:bottom-full',
]

const reactionsContainerClasses = `bg-white rounded-3xl text-dark-gray flex gap-2 p-2 text-lg absolute bottom-0 opacity-0 invisible 
group-hover:visible group-hover:opacity-100 group-hover:bottom-full duration-200 delay-1000`

const Reactions = ({ updateReaction, commentId, placeId }) => {
  const reactionsContainerRef = useRef()
  const dispatch = useDispatch()

  const allReactions = {
    like,
    heart,
    haha,
    sad,
    fire,
    think,
    stop,
  }

  // const [selectedReaction, setSelectedReaction] = useState(null)
  const [activeReaction, setActiveReaction] = useState(-1)

  const handleOnMouseEnter = index => setActiveReaction(index)

  const handleReactionSelection = selection => {
    dispatch(toggleCommentReaction({ commentId, type: selection, placeId }))
    // setSelectedReaction(selection)
    updateReaction(selection)
    setActiveReaction(-1)
    reactionsContainerRef.current.classList.remove(...reactionsToggleClasses)

    // if (reactionsContainerRef)
    const interval = setTimeout(() => reactionsContainerRef.current.classList.add(...reactionsToggleClasses), 1000)
    // clearInterval(interval)
  }

  const reactions = Object.entries(allReactions)

  const renderReactions = reactions.map((reaction, index) => {
    return (
      <button
        key={reaction[0]}
        className='h-8 w-8 relative group'
        onClick={handleReactionSelection.bind(null, reaction[0])}
      >
        <img
          src={reaction[1]}
          alt={reaction[0]}
          className='hover:scale-150 duration-200'
          onMouseEnter={handleOnMouseEnter.bind(null, index)}
        />
        {index === activeReaction && (
          <span className='text-xs capitalize absolute left-0 -top-8 bg-white px-2 rounded-3xl'>{reaction[0]}</span>
        )}
      </button>
    )
  })

  return (
    <div className={reactionsContainerClasses} ref={reactionsContainerRef}>
      {renderReactions}
    </div>
  )
}

export default Reactions
