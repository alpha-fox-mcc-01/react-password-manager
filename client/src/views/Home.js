import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import PasswordForm from '../components/PasswordForm'
import Passwords from "../components/Passwords";

import { searchPasswords, getPasswords } from '../store/actions/'
export default function Home() {
  let passwords = [] // Ini yang bakal di-display
  let allPasswords = useSelector(state => state.passwords)
  let searchResults = useSelector(state => state.searchResultPasswords)
  let dispatch = useDispatch()
  const [isSearching, setIsSearching] = useState(false)

  const handleSearchChange = (event) => {
    // setKeyword(event.target.value)
    if (event.target.value.length ) setIsSearching(true)
    else setIsSearching(false)
    dispatch(searchPasswords(allPasswords, event.target.value))
  }

  if (isSearching) {
    passwords = searchResults
  } else {
    passwords = allPasswords
  }
  return (
    <div>
      <div className='row'>
        <div className='col-md-4'>
          <form>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search here..."
                aria-label="Search here..."
                aria-describedby="basic-addon2"
                onChange={ handleSearchChange }
              />
            </div>
          </form>
        </div>
        <div className='col-md-8'>
          <PasswordForm />
        </div>
      </div>
      <Passwords passwords={ passwords }/>
    </div>
  );
}
