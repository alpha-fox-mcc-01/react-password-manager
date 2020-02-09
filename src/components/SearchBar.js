import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import useDataBinding from '../hooks/useDataBinding'
import SearchResult from './SearchResult'

export default function SearchBar() {
  const [activeKeyword, activeKeywordBinding, activeKeywordReset] = useDataBinding('')
  const myPassword = useSelector((state) => state.password.myPasswords)
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    if (activeKeyword.length !== '') {
      setSearchResult(
        myPassword.filter((row) => {
          const name = row.name.toLowerCase()
          return name.includes(activeKeyword.toLowerCase())
        })
      )
    }
  }, [activeKeyword, myPassword])

  return (
    <div className='d-flex flex-column flex-grow-1 mx-3'>
      <input {...activeKeywordBinding} type='text' className='form-control nav-search' placeholder='Search' />
      {activeKeyword !== '' && (
        <div className='card search-result text-dark'>
          <span className='px-3 pt-2'>found ({searchResult.length}):</span>
          <div className='mb-1'>
            {searchResult.map((row) => (
              <SearchResult detail={row} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
