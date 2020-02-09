import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import useDataBinding from '../hooks/useDataBinding'
import SearchResult from './SearchResult'

export default function SearchBar() {
  const [activeKeyword, activeKeywordBinding] = useDataBinding('')
  const myPassword = useSelector((state) => state.password.myPasswords)
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    if (activeKeyword.length !== '') {
      // console.log(searchResult)
      setSearchResult(
        myPassword.filter((row) => {
          let found = false
          const name = row.name.toLowerCase()

          if (name.includes(activeKeyword.toLowerCase())) {
            found = true
          }

          if (row.notes) {
            const notes = row.notes.toLowerCase()
            if (notes.includes(activeKeyword.toLowerCase())) {
              found = true
            }
          }

          return found
        })
      )
    }
  }, [activeKeyword, myPassword])

  return (
    <div className='d-flex flex-column flex-grow-1 mx-3'>
      <input
        data-testid='searchBar'
        {...activeKeywordBinding}
        type='text'
        className='form-control nav-search'
        placeholder='Search'
      />
      {activeKeyword !== '' && (
        <div className='card search-result text-dark'>
          <span className='px-3 pt-2'>found ({searchResult.length}):</span>
          <div data-testid='searchResults' className='mb-1'>
            {searchResult.map((row) => (
              <SearchResult detail={row} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
