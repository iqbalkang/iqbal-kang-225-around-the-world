import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlaces } from '../features/user/userThunk'
import ContentPageLayout from '../components/ContentPageLayout'
import EmptyPageLayout from '../components/EmptyPageLayout'

const MyPlaces = () => {
  const dispatch = useDispatch()

  const { userPlaces, user } = useSelector(store => store.user)

  useEffect(() => {
    dispatch(getPlaces())
  }, [])

  if (userPlaces?.length === 0) {
    return <EmptyPageLayout user={user} />
  }

  return <ContentPageLayout userPlaces={userPlaces} />
}

export default Favourites
