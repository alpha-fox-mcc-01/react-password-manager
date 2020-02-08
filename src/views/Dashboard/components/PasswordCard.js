import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './PasswordCard.css'

export default function PasswordCard(props) {
  const { id, name, fields, notes, url } = props.password

  let [isRevealed, setIsRevealed] = useState(false)

  const reveal = () => {
    setIsRevealed(true)
  }
  const conceal = () => {
    setIsRevealed(false)
  }

  return (
    <div className='card d-flex flex-row p-3 flex-grow-1 col-md-6'>
      <div className='mr-3 d-flex align-items-center flex-column'>
        <img
          src={
            url
              ? `http://logo.clearbit.com/${url.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '')}`
              : 'http://logo.clearbit.com/lastpass.com'
          }
          alt='logo'
          width='50'
        />
      </div>
      <div className='d-flex flex-column mr-auto'>
        <span className='h4'>
          <Link to={`${id}`} className='text-dark'>
            <strong>{name}</strong>
          </Link>
        </span>
        <small>{url.replace(/(http(s)?:\/\/)|(\/.*){1}/g, '')}</small>
        <small>{notes}</small>
      </div>
      <div className='d-flex flex-column align-items-end'>
        <span className=''>{isRevealed ? `${fields.value} (${fields.type})` : fields.type}</span>
        <div className='d-flex'>
          <div className='locked-password'>
            {isRevealed ? fields.password : '******'}
            {isRevealed ? (
              <i
                onClick={(event) => {
                  conceal()
                }}
                className='fa-btns fas fa-unlock text-muted ml-2'
              ></i>
            ) : (
              <i
                onClick={(event) => {
                  reveal()
                }}
                className='fa-btns fas fa-lock text-muted ml-2'
              ></i>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
