import React from 'react'
import './PasswordStrIndicator.css'

export default function PasswordStrIndicator(props) {
  return (
    <div className='d-flex'>
      <div
        className={`password-block flex-grow-1 ${props.strength.point > 0 &&
          'password-block-active'}`}
      ></div>
      <div
        className={`password-block flex-grow-1 ${props.strength.point > 1 &&
          'password-block-active'}`}
      ></div>
      <div
        className={`password-block flex-grow-1 ${props.strength.point > 2 &&
          'password-block-active'}`}
      ></div>
      <div
        className={`password-block flex-grow-1 ${props.strength.point > 3 &&
          'password-block-active'}`}
      ></div>
      <div
        className={`password-block flex-grow-1 ${props.strength.point > 4 &&
          'password-block-active'}`}
      ></div>
    </div>
  )
}
