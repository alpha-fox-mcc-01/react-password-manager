import React from 'react'

export default function Notification() {
  return (
    <>
      <div className='container'>
        <div className='alert alert-info d-flex'>
          <span className='mr-auto d-flex flex-column'>
            <strong>Password Added Successfully</strong>
            <small>
              new password added for: <span>jelang@gmail.com</span>
              <br />
              strengh: weak
            </small>
          </span>
          <strong className='fa-btns'>x</strong>
        </div>
      </div>
    </>
  )
}
