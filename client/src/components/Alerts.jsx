import React, { useEffect, useState, useRef } from 'react'
import { renderSmallImage } from '../utils/rendeImage'
import FlexContainer from './FlexContainer'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAlerts, deleteSingleAlert, getAlerts } from '../features/replies/alertsThunks'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { getLocalStorage } from '../utils/localStorage/localStorage'
import customFetch from '../utils/axios/customFetch'
import { toast } from 'react-toastify'

const alertsContainerClasses =
  'absolute top-[40px] -translate-x-1/2 z-50 left-1/2 shadow-md min-w-[300px] bg-accent p-2 text-xs'

const Alerts = () => {
  const dispatch = useDispatch()
  const alertsRef = useRef()
  const alertsButtonRef = useRef()
  const { alerts } = useSelector(store => store.alerts)

  const [areAlertsShown, setAreAlertsShown] = useState(false)

  const handleGetAlertsClick = () => {
    setAreAlertsShown(true)
    dispatch(getAlerts())
  }

  const handleFollowResponseClick = async (alertFrom, status) => {
    const { token } = getLocalStorage('user')
    const body = { status, followerId: alertFrom }

    try {
      const { data } = await customFetch.post(`/follow/response`, body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      toast(error.response.data.message)
    }
  }

  const handleClearAlertsClick = () => {
    dispatch(deleteAlerts())
  }

  const handlePostAlertClick = placeId => dispatch(deleteSingleAlert(placeId))

  useEffect(() => {
    dispatch(getAlerts())
  }, [areAlertsShown])

  const renderAlerts = () =>
    alerts.map((alert, index) => {
      const {
        first_name: firstName,
        last_name: lastName,
        type,
        image,
        alert_from: alertFrom,
        place_id: placeId,
      } = alert

      if (type === 'follow') {
        return (
          <FollowAlert
            key={index}
            firstName={firstName}
            lastName={lastName}
            image={image}
            alertFrom={alertFrom}
            onClick={handleFollowResponseClick}
          />
        )
      }

      if (type === 'post') {
        return (
          <PostAlert
            key={index}
            firstName={firstName}
            lastName={lastName}
            image={image}
            alertFrom={alertFrom}
            onClick={handlePostAlertClick}
            placeId={placeId}
          />
        )
      }
    })

  const renderAlertsCount = () => {
    if (alerts.length > 0)
      return (
        <FlexContainer center className='absolute -top-2 -right-4 bg-white h-4 w-4 rounded-full text-dark-gray text-xs'>
          {alerts.length}
        </FlexContainer>
      )
  }

  const renderClearButtonOrText = () => {
    if (alerts.length > 0)
      return (
        <Button onClick={handleClearAlertsClick} className='text-off-white block w-full text-right'>
          clear all
        </Button>
      )
    else return <p className='text-center'>no notifications</p>
  }

  window.addEventListener('click', e => {
    if (e.target !== alertsButtonRef.current && e.target !== alertsRef.current) setAreAlertsShown(false)
  })

  return (
    <div className='relative'>
      <Button onClick={handleGetAlertsClick} ref={alertsButtonRef}>
        alerts
      </Button>
      {areAlertsShown && (
        <div ref={alertsRef} className={alertsContainerClasses}>
          {renderClearButtonOrText()}
          {renderAlerts()}
        </div>
      )}
      {renderAlertsCount()}
    </div>
  )
}

export default Alerts

const FollowAlert = ({ image, firstName, lastName, alertFrom, onClick }) => {
  return (
    <FlexContainer gap alignCenter className='bg-accent p-2'>
      <div className='h-8 w-8 shrink-0 rounded-full overflow-hidden'>
        {renderSmallImage(image, firstName, lastName)}
      </div>
      <p className='whitespace-nowrap flex-1'>
        <Link to={'/people/' + alertFrom} className='mr-1'>
          {firstName} {lastName}
        </Link>
        has requested to follow you
      </p>
      <Button responseButton onClick={onClick.bind(null, alertFrom, 'accepted')}>
        <AiOutlineCheckCircle />
      </Button>
      <Button responseButton onClick={onClick.bind(null, alertFrom, 'declined')}>
        <AiOutlineCloseCircle />
      </Button>
    </FlexContainer>
  )
}

const PostAlert = ({ image, firstName, lastName, alertFrom, placeId, onClick }) => {
  return (
    <FlexContainer gap alignCenter className='bg-accent p-2'>
      <div className='h-8 w-8 shrink-0 rounded-full overflow-hidden'>
        {renderSmallImage(image, firstName, lastName)}
      </div>
      <p className='whitespace-nowrap flex-1'>
        <Link to={'/people/' + alertFrom} className='mr-1 hover:underline'>
          {firstName} {lastName}
        </Link>
        <Link to={'places/' + placeId} onClick={onClick.bind(null, placeId)}>
          has added a new post
        </Link>
      </p>
    </FlexContainer>
  )
}

const Button = React.forwardRef((props, ref) => {
  const { onClick, responseButton, children, className } = props

  const buttonClasses = classnames(className, 'capitalize', {
    'hover:text-dark-gray duration-200 text-xl': responseButton,
  })

  return (
    <button ref={ref} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  )
})
