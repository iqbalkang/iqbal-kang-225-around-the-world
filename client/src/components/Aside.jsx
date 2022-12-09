import React from 'react'
import logo from '../images/logo.svg'
import plane from '../images/plane.svg'
import { Link } from 'react-router-dom'

const Aside = () => {
  return (
    <aside className='hidden absolute h-full bg-accent text-white md:block md:relative'>
      {/* aside inner container to wrap logo and navigation links */}
      <div className='h-full flex flex-col justify-between items-center p-6'>
        {/* logo */}
        <Link to='/'>
          <img src={logo} alt='around the world logo' />
        </Link>

        {/* navigation links */}
        <nav>
          <ul className='space-y-4'>
            <li>
              <Link to='/' className='inline-flex items-center group relative'>
                <span> Places </span>
                <span className='active-link'>
                  <img src={plane} alt='' />
                </span>
              </Link>
            </li>

            <li>
              <Link
                to='/people'
                className='inline-flex items-center group relative'
              >
                <span> People </span>
                <span className='active-link'>
                  <img src={plane} alt='' />
                </span>
              </Link>
            </li>

            <li>
              <Link to='/' className='inline-flex items-center group relative'>
                <span> Favourites </span>
                <span className='active-link'>
                  <img src={plane} alt='' />
                </span>
              </Link>
            </li>

            <li>
              <Link to='/' className='inline-flex items-center group relative'>
                <span> Explore </span>
                <span className='active-link'>
                  <img src={plane} alt='' />
                </span>
              </Link>
            </li>

            <li>
              <Link to='/' className='inline-flex items-center group relative'>
                <span> My Places </span>
                <span className='active-link'>
                  <img src={plane} alt='' />
                </span>
              </Link>
            </li>

            <li>
              <Link to='/' className='inline-flex items-center group relative'>
                <span> Settings </span>
                <span className='active-link'>
                  <img src={plane} alt='' />
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* auth button */}
        <Link to='/' className='mr-10 hover:tracking-widest duration-200'>
          Login
        </Link>
      </div>
    </aside>
  )
}

export default Aside
