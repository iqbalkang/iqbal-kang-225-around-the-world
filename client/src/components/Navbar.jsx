import React from 'react'
import logo from '../images/logosmall.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/user/userSlice'
import Image from './Image'
import WebsiteContainer from './WebsiteContainer'

const navListItems = ['places', 'people', 'favorites', 'explore', 'settings', 'alerts']

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.user)

  const handleAuth = () => {
    if (!user) return navigate('/register')

    dispatch(logout())
    return navigate('/people')
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
