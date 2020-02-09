import React from 'react'

export default function SearchResult(props) {
  const {
    name,
    fields: { value, type },
  } = props.detail
  return (
    <div className='result-row px-3 py-2 '>
      <strong className='mr-1'>{name}</strong>
      <span>
        ({type}: {value})
      </span>
    </div>
  )
}
