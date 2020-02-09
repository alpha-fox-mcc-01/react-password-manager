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
      data-testid={'resultLink' + id}
      className='result-row px-3 py-2'
      onClick={() => {
        handleResultClick()
      }}
    >
      <strong data-testid={'resultName' + id} className='mr-1'>
        {name}
      </strong>
      <span>
        ({type}: {value})
      </span>
    </div>
  )
}
