import React, { useState } from 'react'
import AddPassword from '../../helpers/AddPassword'

export function PasswordContainer() {
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleFormSubmit = (event) => {
    event.preventDefault()
    let payload = {
      url, username, password
    }
    AddPassword(payload)
    setUrl('')
    setUsername('')
    setPassword('')

  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const styles = {
    margin: "0 auto"
  }

  return (
    <>
      <div style={ styles } className="w-1/2 rounded px-6 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div style={ styles } className="md:w-1/2 -mx-3 md:flex mb-6">
          <div className="md:w-full px-3 mb-6 md:mb-0">
            <form onSubmit={ handleFormSubmit }>
              <label>URL</label>
              <input value={ url } onChange={ handleUrlChange } className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="e.g. Google.com, Facebook.com"/>
              <p className="text-red text-xs italic">Please fill out this field.</p>
              <label>Username</label>
              <input value={ username } onChange={ handleUsernameChange } className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Type in your handle"/>
              <label>Password</label>
              <input value={ password } onChange={ handlePasswordChange } className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Type in your password"/>
              <button type="Submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
    
}

export default PasswordContainer
