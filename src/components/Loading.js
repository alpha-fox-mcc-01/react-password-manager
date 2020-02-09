import React from 'react'
import './Loading.css'

import { SyncLoader as SpinnerAnimation } from 'react-spinners'

export default function Spinner(props) {
  return (
    <div className='loadingWrapper'>
      <SpinnerAnimation
        color='#8d222b'
        height='100px'
        margin='2px'
        width='10px'
      />
    </div>
  )
}
