import React, { useState } from "react";
import { useDispatch } from 'react-redux'

import PasswordForm from '../components/PasswordForm'
import Passwords from "../components/Passwords";

import { searchPasswords } from '../store/actions/'
export default function Home() {
  let dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')

  const handleSearchChange = (event) => {
    setKeyword(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    dispatch(searchPasswords(keyword))
    console.log('ok')
  }
  return (
    <div>
      <div className='row'>
        <div className='col-md-4'>
          <form onSubmit={ handleSearchSubmit }>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search here..."
                aria-label="Search here..."
                aria-describedby="basic-addon2"
                onChange={ handleSearchChange }
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">
                  Find
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className='col-md-2'>
          <PasswordForm />
        </div>
      </div>
      <Passwords />
    </div>
  );
}
