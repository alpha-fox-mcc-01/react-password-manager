import React, { useState, useEffect } from 'react'
import db from '../config/firestore'
import { deepStrictEqual } from 'assert'
import { fetchPasswords } from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'

export function useFetcher() {
  const data  = useSelector(state => state.passwords)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const currentUserId = 'test123'
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPasswords(currentUserId))
  }, [])

  
  
  return { data, error }
    
}

export default useFetcher
