import React, {  } from 'react'
import PasswordContainer from './components/PasswordContainer'
import SearchPassword from './components/SearchPassword'
import ListPassword from './components/ListPasswords'
import useFetcher from '../hooks/useFetcher'

export function Home() {
  const { data, error } = useFetcher()

  return (
      <div>
        <PasswordContainer></PasswordContainer>
        <SearchPassword></SearchPassword>
        <ListPassword data={ data } ></ListPassword>
      </div>
  )
  
}

export default Home
