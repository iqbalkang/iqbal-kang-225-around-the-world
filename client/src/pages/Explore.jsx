import React from 'react'
import ReactDOM from 'react-dom'
import ExploreFormRow from '../components/ExploreFormRow'
import Gmap from '../components/Gmap'
import inputs from '../utils/data/explore-inputs'
import { HiChevronDown } from 'react-icons/hi'
import AccentButton from '../components/AccentButton'

import { useDispatch, useSelector } from 'react-redux'
import { postPlace } from '../features/user/userThunk'
import {
  handleChange,
  openModal,
} from '../features/exploreInputsSlice/exploreInputsSlice'
import Stars from '../components/Stars'
import Modal from '../components/Modal'

const Explore = () => {
  const dispatch = useDispatch()
  const state = useSelector(store => store.exploreInputs)
  const { user, isLoading } = useSelector(store => store.user)

  const onChangeHandler = e => {
    const { name, value } = e.target
    dispatch(handleChange({ name, value }))
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!user) return dispatch(openModal())
    dispatch(postPlace(state))
  }

  return (
    <section className='h-full flex flex-col bg-slate-100 items-center'>
      {state.modalOpen &&
        ReactDOM.createPortal(<Modal />, document.getElementById('modal-root'))}
      <Gmap />

      {/* form container */}

      <form
        className='flex-1 space-y-2 w-full max-w-[900px] p-6'
        onSubmit={handleSubmit}
      >
        <button className='mx-auto block'>
          <HiChevronDown size={24} />
        </button>

        <div className='flex flex-col sm:grid grid-cols-2 gap-6'>
          {inputs.map((input, index) => {
            if (index === 0) return null
            return (
              <ExploreFormRow
                key={index}
                input={input}
                index={index}
                onChange={onChangeHandler}
                value={state[input.label]}
              />
            )
          })}

          <div className='row-start-2 col-start-2 sm:self-end flex gap-6 items-center'>
            <Stars />
            <AccentButton isLoading={isLoading}>
              {isLoading && (
                <div className='h-4 w-4 rounded-full border-2 border-b-accent animate-spin'></div>
              )}
              add place
            </AccentButton>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Explore
