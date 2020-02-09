import React from 'react'
import { useHistory } from 'react-router-dom'

export default function SearchResult(props) {
  const {
    id,
    name,
    fields: { value, type },
  } = props.detail

  const history = useHistory()
  function handleResultClick() {
    history.push('/' + id)
  }

  return (
    <div
      className='result-row px-3 py-2'
      onClick={() => {
        handleResultClick()
      }}
    >
      <strong className='mr-1'>{name}</strong>
      <span>
        ({type}: {value})
      </span>
    </div>
  )
}
