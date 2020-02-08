import React from 'react'
import { Link } from 'react-router-dom'
import './NavigationBar.css'

import NavigationProfile from './NavigationProfile'

export default function NavigationBar() {
  return (
    <div className='container-fluid d-flex align-items-strech text-white p-0  bg-danger stickynav'>
      <Link
        to='/'
        className='h3 p-2 fa-btns text-white'
        style={{ textDecoration: 'none' }}
      >
        <strong className='ml-2'>Whatpass</strong>|***
      </Link>
      <div className='align-items-center d-flex flex-grow-1'>
        {/* <input
          type='text'
          className='form-control mx-5 nav-search'
          placeholder='Search'
        /> */}
      </div>

      <div className='profile-section fa-btns d-flex align-items-center'>
        <Link to='/dashboard' className='text-white link-to-dashboard'>
          <NavigationProfile />
        </Link>
      </div>
    </div>
  )
}
