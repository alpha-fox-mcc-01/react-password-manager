import React from 'react'
import NavigationBar from '../../components/NavigationBar'
import { useHistory } from 'react-router-dom'
export default function LandingPage() {
  const history = useHistory()
  history.push('/dashboard')
  return (
    <>
      <NavigationBar />
      <br />
      <br />
      <br />
      <p>LANDING PAGE!</p>
    </>
  )
}
