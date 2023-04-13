import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPlaces } from '../features/places/PlacesThunks'
import ContentPageLayout from '../components/ContentPageLayout'
import EmptyPageLayout from '../components/EmptyPageLayout'

const MyPlaces = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(store => store.user)
  const { userPlaces } = useSelector(store => store.places)

  useEffect(() => {
    dispatch(getUserPlaces(user.id))
    
  }, [])

  if (userPlaces?.length === 0) {
    return <EmptyPageLayout user={user} />
  }

  return <ContentPageLayout userPlaces={userPlaces} user={user} />
}

export default MyPlaces
