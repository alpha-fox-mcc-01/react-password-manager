import React from 'react'

import NavigationBar from '../../components/NavigationBar'
// import Notification from '../../components/Notification'
import FormAddPass from './components/FormAddPass'
import AddPasswordFloatingButton from './components/AddPasswordFAB'
import PasswordVault from './components/PasswordVault'

import './index.css'
import { useSelector } from 'react-redux'

export default function Dashboard() {
  const isShowingAddForm = useSelector((state) => state.ui.isShowingAddForm)

  return (
    <>
      <div className=''>
        <NavigationBar />
        <br />
        <br />
        <br />
        {/* <Notification /> */}
      </div>
      <div className='container'>
        {isShowingAddForm && (
          <div className='card add-new-password'>
            <div className='card-body'>
              <br></br>
              <FormAddPass />
            </div>
          </div>
        )}
        <br />
        <br />
        <PasswordVault />
        <br />
      </div>
      {!isShowingAddForm && <AddPasswordFloatingButton />}
    </>
  )
}
