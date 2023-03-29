import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccentButton from '../components/AccentButton'
import FlexContainer from '../components/FlexContainer'
import FormRow from '../components/FormRow'
import Heading from '../components/Heading'
import ImageUploader from '../components/ImageUploader'
import Place from '../components/Place'
import Tags from '../components/Tags'
import profileInputs from '../utils/data/profileInputs'
import Gmap from '../components/Gmap'
import ContentPageLayout from '../components/ContentPageLayout'
import { getUserInfo, updateUser } from '../features/user/userThunk'
import { getUserPlaces } from '../features/places/PlacesThunks'

const initialState = {
  firstName: '',
  lastName: '',
  aboutMe: '',
  email: '',
  tags: [],
  image: null,
}

const Profile = () => {
  const dispatch = useDispatch()
  const { user, isLoading, currentUser } = useSelector(store => store.user)
  const { placesByCurrentUser } = useSelector(store => store.places)

  const { firstName, lastName, email, aboutMe, image, imageId } = currentUser || {}

  const [selectedImage, setSelectedImage] = useState('')
  const [coordinates, setCoordinates] = useState(null)
  const [values, setValues] = useState(initialState)
  const { id: userId } = user

  const onChangeHandler = e => {
    const { name, value, files } = e.target

    if (name === 'image') {
      const image = files[0]
      setSelectedImage(URL.createObjectURL(image))
      return setValues({ ...values, image })
    }

    setValues({ ...values, [name]: value })
  }

  const updateTags = tags => setValues({ ...values, tags })

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()

    for (let key in values) {
      if (key === 'tags') formData.append(key, JSON.stringify(values[key]))
      else formData.append(key, values[key])
    }

    dispatch(updateUser(formData))
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

  const renderProfileInputs = profileInputs.map((input, index) => {
    const propsObj = generatePropsObject(index, input)
    if (input.label === 'email') return <FormRow key={index} {...propsObj} disabled />
    return <FormRow key={index} {...propsObj} />
  })

  useEffect(() => {
    dispatch(getUserInfo(userId))
    dispatch(getUserPlaces(userId))
  }, [userId])

  useEffect(() => {
    if (currentUser) {
      setValues({ ...values, firstName, lastName, email, aboutMe })
      setSelectedImage(image)
    }
  }, [currentUser])

  return (
    <section className='h-full grid grid-cols-[2fr,8fr]'>
      {/* left side form inputs */}
      <FlexContainer center className='bg-dark-gray px-4 max-h-[calc(100vh-49px)] overflow-scroll'>
        <form className='space-y-3 w-full' onSubmit={handleSubmit}>
          <FlexContainer center>
            <ImageUploader rounded onChange={onChangeHandler} selectedImage={selectedImage} className='h-48 w-48' />
          </FlexContainer>

          {renderProfileInputs}

          {/* <Tags tags={values.tags} updateTags={updateTags} /> */}

          <AccentButton small full primary isLoading={isLoading}>
            update profile
          </AccentButton>
        </form>
      </FlexContainer>

      {/* right side google map */}

      <ContentPageLayout title={'places added by ' + firstName} data={placesByCurrentUser} />
    </section>
  )
}

export default Profile
