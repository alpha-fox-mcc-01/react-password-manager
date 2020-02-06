import React, { useState, useEffect } from 'react'
import db from '../config/firebase'
import { deepStrictEqual } from 'assert'

export function useFetcher() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const currentUserId = 'test123'

  useEffect(() => {
    let query = db.collection('Passwords').where('userId', '==', currentUserId)
    query.get()
         .then( (result) => {
           let passwords = []
           result.forEach(doc => {
             let info = doc.data()
             let item = {
               id: doc.id,
               info
             }
             passwords.push(item)
             
            })
            setData(passwords)
           
         })
         .catch(err => {
           setError(err)
         })

  }, [data])

  
  
  return { data, error }
    
}

export default useFetcher
