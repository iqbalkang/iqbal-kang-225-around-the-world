import React, { useState, useEffect } from 'react'
import Gmap from '../components/Gmap'
import exploreInputs from '../utils/data/explore-inputs'

import AccentButton from '../components/AccentButton'

import { useDispatch, useSelector } from 'react-redux'
import { editPlace, postPlace } from '../features/places/PlacesThunks'
import Stars from '../components/Stars'
import FormRow from '../components/FormRow'
import FlexContainer from '../components/FlexContainer'
import ImageUploader from '../components/ImageUploader'
import PlacesAutoComplete from '../components/PlacesAutoComplete'
import Tags from '../components/Tags'
import LoginModal from '../components/LoginModal'
import { toast } from 'react-toastify'

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
  const { isLoading: isPlaceLoading, singlePlace, isEditing } = useSelector(store => store.places)
  const { address: placeAddress, lat, lng, country, title, image, rating, description, tags, id } = singlePlace || {}
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

    for (let key in values) {
      if (!values[key] && key !== 'rating') return toast.error('missing inputs')
      if (key === 'tags') formData.append(key, JSON.stringify(values[key]))
      else formData.append(key, values[key])
    }

    formData.append('address', address)
    formData.append('lat', coordinates.lat)
    formData.append('lng', coordinates.lng)

    if (isEditing) formData.append('id', id)

    isEditing ? dispatch(editPlace(formData)) : dispatch(postPlace(formData))
  }

  const generatePropsObject = (index, input) => {
    if (!values) return
    if (!input) return
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
    if (isEditing) {
      setValues({ ...initialState, title, country, description, rating, tags })
      setAddress(placeAddress)
      setSelectedImage(image)
      setCoordinates({ lat, lng })
    }
  }, [isEditing, isPlaceLoading])

  useEffect(() => {
    if (!isPlaceLoading && user && !isEditing) {
      setAddress('')
      setSelectedImage('')
      setCoordinates(null)
      setValues(initialState)
    }
  }, [isPlaceLoading])

  const renderExploreInputs = exploreInputs.map((input, index) => {
    if (!input) return
    const propsObj = generatePropsObject(index, input)
    return <FormRow key={index} {...propsObj} />
  })

  return (
    <section className='h-full grid sm:grid-cols-[1fr,2fr] md:grid-cols-[4fr,8fr] lg:grid-cols-[2fr,8fr]'>
      {/* left side form inputs */}
      <FlexContainer center className='bg-dark-gray p-4 overflow-scroll'>
        <form
          className='space-y-3 w-64'
          onSubmit={handleSubmit}
          onKeyPress={e => {
            e.key === 'Enter' && e.preventDefault()
          }}
        >
          <ImageUploader square onChange={onChangeHandler} selectedImage={selectedImage} />

          <PlacesAutoComplete address={address} setAddress={setAddress} setCoordinates={setCoordinates} />

          {renderExploreInputs}

          <Tags tags={values?.tags} updateTags={updateTags} />

          <FlexContainer alignCenter gap>
            <p>How much would you rate this place?</p>
            <Stars handleRating={updateRating} rating={values?.rating} />
          </FlexContainer>

          <AccentButton small full primary isLoading={isPlaceLoading}>
            {isEditing ? 'update place' : 'add place'}
          </AccentButton>
        </form>
      </FlexContainer>

      {/* right side google map */}
      <div className='hidden sm:block'>
        <Gmap coordinates={coordinates} />
      </div>

      {loginModal && <LoginModal closeModal={closeLoginModal} isLoading={isUserLoading} />}
    </section>
  )
}

export default Explore
