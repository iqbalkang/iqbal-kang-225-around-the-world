import React from 'react'
import { NavLink } from 'react-router-dom'

const ListItem = ({ item, onClick }) => {
  const linkURL = item === 'places' ? '' : item
  return (
    <li onClick={onClick}>
      <NavLink to={'/' + linkURL} end={true} className={({ isActive }) => (isActive ? `hov active` : 'hov')}>
        {item}
      </NavLink>
    </li>
  )
}

export default ListItem
