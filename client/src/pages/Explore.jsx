import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Gmap from '../components/Gmap'
import exploreInputs from '../utils/data/explore-inputs'
import { HiChevronDown } from 'react-icons/hi'

import AccentButton from '../components/AccentButton'

import { useDispatch, useSelector } from 'react-redux'
import { postPlace } from '../features/places/PlacesThunks'
import Stars from '../components/Stars'
import Modal from '../components/Modal'
import FormRow from '../components/FormRow'
import Label from '../components/Label'
import { MdOutlineLocationSearching } from 'react-icons/md'
import FlexContainer from '../components/FlexContainer'
import ImageUploader from '../components/ImageUploader'
import PlacesAutoComplete from '../components/PlacesAutoComplete'
import Tags from '../components/Tags'
import LoginModal from '../components/LoginModal'

const initialState = {
  country: '',
  title: '',
  description: '',
  rating: 0,
  tags: [],
  image: null,
}

const Explore = () => {
  const dispatch = useDispatch()
  const { user, isLoading: isUserLoading } = useSelector(store => store.user)
  const { isLoading: isPlaceLoading } = useSelector(store => store.places)

  const [selectedImage, setSelectedImage] = useState('')
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState(null)
  const [values, setValues] = useState(initialState)
  const [loginModal, setLoginModal] = useState(false)

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

  const updateTags = tags => setValues({ ...values, tags })

  const closeLoginModal = () => setLoginModal(false)

  const handleSubmit = e => {
    e.preventDefault()

    if (!user) return setLoginModal(true)

    const formData = new FormData()

    formData.append('address', address)
    formData.append('lat', coordinates.lat)
    formData.append('lng', coordinates.lng)

    for (let key in values) {
      if (key === 'tags') formData.append(key, JSON.stringify(values[key]))
      else formData.append(key, values[key])
    }

    dispatch(postPlace(formData))
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

  useEffect(() => {
    if (!isUserLoading) setLoginModal(false)
  }, [isUserLoading])

  useEffect(() => {
    if (!isPlaceLoading && user) {
      setAddress('')
      setSelectedImage('')
      setCoordinates(null)
      setValues(initialState)
    }
  }, [isPlaceLoading])

  const renderExploreInputs = exploreInputs.map((input, index) => {
    const propsObj = generatePropsObject(index, input)
    return <FormRow key={index} {...propsObj} />
  })

  return (
    <section className='h-full grid grid-cols-[2fr,8fr]'>
      {/* left side form inputs */}
      <FlexContainer center className='bg-dark-gray px-4 max-h-[calc(100vh-49px)] overflow-scroll'>
        <form className='space-y-3' onSubmit={handleSubmit}>
          <ImageUploader square onChange={onChangeHandler} selectedImage={selectedImage} />

          <PlacesAutoComplete address={address} setAddress={setAddress} setCoordinates={setCoordinates} />

          {renderExploreInputs}

          <Tags tags={values.tags} updateTags={updateTags} />

          <FlexContainer alignCenter>
            <p>How much would you rate this place?</p>
            <Stars handleRating={updateRating} rating={values.rating} />
          </FlexContainer>

          <AccentButton small full primary isLoading={isPlaceLoading}>
            add place
          </AccentButton>
        </form>
      </FlexContainer>

      {/* right side google map */}
      <Gmap coordinates={coordinates} />

      {loginModal && <LoginModal closeModal={closeLoginModal} isLoading={isUserLoading} />}
    </section>
  )
}

export default Explore
