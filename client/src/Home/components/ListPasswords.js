import React, { Component } from 'react'
import db from '../../config/firebase'
export function ListPasswords(props) {
  const { data } = props

  const handleDelete = (id) => {
    console.log(id)
    db.collection('Passwords').doc(`${id}`).delete()
    console.log('selesai delete')
  }
  
  return (
    <div className="flex flex-wrap">
      {
          data.length > 0 && data.map( password => {
            return (
              <div className="sm:w-1/4 p-2">
              <div className="bg-white px-6 py-8 rounded-lg shadow-lg text-center">
              <div className="mb-3">
                <img
                  className="w-auto mx-auto rounded-full"
                  src=""
                  alt=""
                />
              </div>
              <h2 className="text-xl font-medium text-gray-700">url: {password.info.url} </h2>
                <span className="text-blue-500 block mb-2">username: {password.info.username} </span>
                <span className="text-blue-500 block mb-2">password: {password.info.password} </span>
              <button onClick={ () => handleDelete(password.id) } className="px-2 py-2 bg-red-400 text-white rounded">Delete</button>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >View Detail</button>
              </div>
            </div>  
            )
          })
      }
    </div>
  )
 
}

export default ListPasswords
