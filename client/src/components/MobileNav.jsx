import React, { useState, useEffect } from 'react'
import logo from '../images/logosmall.svg'
import menuLogo from '../images/menu.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/user/userSlice'
import Image from './Image'
import WebsiteContainer from './WebsiteContainer'
import Alerts from './Alerts'

import classnames from 'classnames'
import ListItem from './ListItem'
import navListItems from '../utils/data/navListItems'

const MobileNav = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.user)
  const [isNavOpen, setIsNavOpen] = useState(false)

  const handleAuth = () => {
    if (!user) return navigate('/register')

    handleNavToggle()
    dispatch(logout())
    return navigate('/')
  }

  const handleNavToggle = () => setIsNavOpen(prevState => !prevState)

  const listItems = navListItems.map(item => (
    <ListItem key={item} item={item} onClick={handleNavToggle} className='hov' />
  ))

  const menuButtonClasses = classnames('fixed right-2 bounce', {
    'bottom-2 bounce-inverted': isNavOpen,
  })

  const menuContainerClasses = classnames(
    'fixed inset-0 bg-accent gap-10 text-xl -translate-y-full duration-200 tracking-wider flex flex-col justify-center items-center',
    {
      'translate-y-0': isNavOpen,
    }
  )

  return (
    <div className='bg-accent z-30'>
      {/* Navbar inner container to wrap logo and navigation links */}

      <WebsiteContainer>
        <nav>
          <ul className='flex items-center justify-between capitalize py-1'>
            {/* logo */}
            <Link to='/'>
              <Image src={logo} alt='around the world logo' />
            </Link>

            <div className={menuContainerClasses}>
              {/* navigation links */}
              {listItems}
              {/* alerts button */}
              <Alerts />
              {/* auth button */}
              <button onClick={handleAuth}>{user ? 'Logout' : 'Login'}</button>
            </div>

            <button className={menuButtonClasses} onClick={handleNavToggle}>
              <Image src={menuLogo} alt='around the world logo' />
            </button>
          </ul>
        </nav>
      </WebsiteContainer>
    </div>
  )
}

export default MobileNav
