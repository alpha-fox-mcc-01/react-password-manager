import React from 'react'
import db from '../config/firebase'

export function AddPassword(payload) {

  db.collection('Passwords').add({
    url: payload.url,
    username: payload.username,
    password: payload.password,
    userId: 'test123',
    createdAt: new Date()
  })
    .then(ref => {
      console.log('masuk then')
      console.log(ref)
     
    })
    .catch(err => {
      console.log(err)
    })

}

export default AddPassword
