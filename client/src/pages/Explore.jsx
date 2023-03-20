import React from 'react'
import ReactDOM from 'react-dom'
import ExploreFormRow from '../components/ExploreFormRow'
import Gmap from '../components/Gmap'
import exploreInputs from '../utils/data/explore-inputs'
import { HiChevronDown } from 'react-icons/hi'

import AccentButton from '../components/AccentButton'

import { useDispatch, useSelector } from 'react-redux'
import { postPlace } from '../features/places/PlacesThunks'
import { handleChange, openModal } from '../features/exploreInputsSlice/exploreInputsSlice'
import Stars from '../components/Stars'
import Modal from '../components/Modal'
import FormRow from '../components/FormRow'
import { useState } from 'react'
import Label from '../components/Label'
import { MdOutlineLocationSearching } from 'react-icons/md'
import FlexContainer from '../components/FlexContainer'
import ImageUploader from '../components/ImageUploader'
import PlacesAutoComplete from '../components/PlacesAutoComplete'

const initialState = {
  country: '',
  title: '',
  description: '',
  rating: 0,
  image: null,
}

const Explore = () => {
  const dispatch = useDispatch()
  // const inputState = useSelector(store => store.exploreInputs)
  const { user, isLoading } = useSelector(store => store.user)

  const [selectedImage, setSelectedImage] = useState('')
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState(null)
  const [values, setValues] = useState(initialState)

  const onChangeHandler = e => {
    const { name, value, files } = e.target

    if (name === 'image') {
      const image = files[0]
      setSelectedImage(URL.createObjectURL(image))
      return setValues({ ...values, image })
    }

    setValues({ ...values, [name]: value })
  }

  const updateRating = rating => {
    setValues({ ...values, rating })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('address', address)
    formData.append('lat', coordinates.lat)
    formData.append('lng', coordinates.lng)

    for (let key in values) {
      formData.append(key, values[key])
    }

    // if (!user) return dispatch(openModal())
    dispatch(postPlace(formData))
    setAddress('')
    setCoordinates(null)
    setValues(initialState)
  }

  const generatePropsObject = (index, input) => {
    return {
      index: index,
      input: input,
      onChange: onChangeHandler,
      value: values[input.label],
      inputClassName: 'p-1 text-dark-gray',
      flexClassName: 'gap-1',
    }
  }

  const renderExploreInputs = exploreInputs.map((input, index) => {
    const propsObj = generatePropsObject(index, input)
    return <FormRow key={index} {...propsObj} />
  })

  return (
    <section className='h-full grid grid-cols-[2fr,8fr]'>
      {/* left side form inputs */}
      <FlexContainer center className='bg-dark-gray px-4'>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <ImageUploader onChange={onChangeHandler} selectedImage={selectedImage} />

          <PlacesAutoComplete address={address} setAddress={setAddress} setCoordinates={setCoordinates} />

          {renderExploreInputs}

          <FlexContainer alignCenter>
            <p>How much would you rate this place?</p>
            <Stars handleRating={updateRating} />
          </FlexContainer>

          <AccentButton small full primary isLoading={isLoading}>
            add place
          </AccentButton>
        </form>
      </FlexContainer>

      {/* right side google map */}
      <Gmap coordinates={coordinates} />
    </section>
  )
}

export default Explore
