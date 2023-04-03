import React from 'react'
import logo from '../images/logosmall.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/user/userSlice'
import Image from './Image'
import WebsiteContainer from './WebsiteContainer'
import { getAlerts } from '../features/replies/alertsThunks'
import { renderSmallImage } from '../utils/rendeImage'
import FlexContainer from './FlexContainer'

const navListItems = ['places', 'people', 'favorites', 'explore', 'profile']

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.user)
  const { alerts } = useSelector(store => store.alerts)

  const renderAlerts = () =>
    alerts.map((alert, index) => {
      const { first_name: firstName, last_name: lastName, type, image, alert_from: alertFrom } = alert
      return (
        <FlexContainer gap alignCenter key={index} className='bg-accent p-2 text-xs'>
          <div className='h-8 w-8 shrink-0 rounded-full overflow-hidden'>
            {renderSmallImage(image, firstName, lastName)}
          </div>
          <p className='whitespace-nowrap'>
            <Link to={'/people/' + alertFrom} className='mr-1'>
              {firstName} {lastName}
            </Link>
            has requested to follow you
          </p>
        </FlexContainer>
      )
    })

  const handleAuth = () => {
    if (!user) return navigate('/register')

    dispatch(logout())
    return navigate('/people')
  }

  const handleGetAlertsClick = () => {
    dispatch(getAlerts())
  }

  const listItems = navListItems.map(item => <ListItem key={item} item={item} />)

  return (
    <div className='bg-accent'>
      {/* Navbar inner container to wrap logo and navigation links */}

      <WebsiteContainer>
        <nav>
          <ul className='flex-container-between capitalize'>
            {/* logo */}
            <Link to='/'>
              <Image src={logo} alt='around the world logo' />
            </Link>

            {/* navigation links */}
            {listItems}

            {/* alerts button */}
            <div className='relative'>
              <button className='capitalize' onClick={handleGetAlertsClick}>
                alerts
              </button>
              <div className='absolute top-[40px] -translate-x-1/2 z-50 left-1/2 shadow-md'>{renderAlerts()}</div>
            </div>

            {/* auth button */}
            <Link to='/register' onClick={handleAuth}>
              {user ? 'Logout' : 'Login'}
            </Link>
          </ul>
        </nav>
      </WebsiteContainer>
    </div>
  )
}

export default Navbar

const ListItem = ({ item }) => {
  const linkURL = item === 'places' ? '' : item
  return (
    <li>
      <NavLink to={'/' + linkURL} end={true} className={({ isActive }) => (isActive ? ` active` : '')}>
        {item}
      </NavLink>
    </li>
  )
}
