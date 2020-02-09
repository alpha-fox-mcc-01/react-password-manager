import React from 'react'
import { useParams } from 'react-router-dom'

import NavigationBar from '../../components/NavigationBar'
// import Notification from '../../components/Notification'

import FormEditPass from './components/FormEditPass'

export default function Edit() {
  const { id } = useParams()
  return (
    <>
      <NavigationBar />
      <br />
      <br />
      <br />
      {/* <Notification /> */}
      <div className='container'>
        <FormEditPass id={id} />
      </div>
    </>
  )
}
