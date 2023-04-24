import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import UserContext from './auth/UserContext'

const Nav = ({ logout }) => {
  const { currentUser } = useContext(UserContext)

  const loggedIn = () => {
    return (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/companies'>
            Companies
          </NavLink>
        </li>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/jobs'>
            Jobs
          </NavLink>
        </li>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/profile'>
            Profile
          </NavLink>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/' onClick={logout}>
            Log out {currentUser.first_name || currentUser.username}
          </Link>
        </li>
      </ul>
    )
  }

  const loggedOut = () => {
    return (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/login'>
            Login
          </NavLink>
        </li>
        <li className='nav-item mr-4'>
          <NavLink className='nav-link' to='/signup'>
            Sign Up
          </NavLink>
        </li>
      </ul>
    )
  }

  return (
    <nav className='Navigation navbar navbar-expand-md'>
      <Link className='navbar-brand' to='/'>
        Jobly
      </Link>
      {currentUser ? loggedIn() : loggedOut()}
    </nav>
  )
}

export default Nav
