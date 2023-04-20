import React from 'react'
import logo from '../images/logosmall.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/user/userSlice'
import Image from './Image'
import WebsiteContainer from './WebsiteContainer'
import Alerts from './Alerts'
import ListItem from './ListItem'
import navListItems from '../utils/data/navListItems'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.user)

  const handleAuth = () => {
    if (!user) return navigate('/register')

    dispatch(logout())
    return navigate('/')
  }

  const listItems = navListItems.map(item => <ListItem key={item} item={item} className='hov' />)

  return (
    <div className='bg-accent relative z-30'>
      {/* Navbar inner container to wrap logo and navigation links */}

      <WebsiteContainer>
        <nav>
          <ul className='flex items-center justify-between capitalize py-1'>
            {/* logo */}
            <Link to='/'>
              <Image src={logo} alt='around the world logo' />
            </Link>

            {/* navigation links */}
            {listItems}

            {/* alerts button */}
            <Alerts />

            {/* auth button */}
            <button onClick={handleAuth}>{user ? 'Logout' : 'Login'}</button>
          </ul>
        </nav>
      </WebsiteContainer>
    </div>
  )
}

export default Navbar
