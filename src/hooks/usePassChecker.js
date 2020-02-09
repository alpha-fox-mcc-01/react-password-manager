import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setLowercase, setUppercase, setSpChar, setNumber, setValidLength } from '../store/actions/'

// check inputted password and return points based on requirement.
// 0 = weakest, ++
export default function usePassCheck(password) {
  const dispatch = useDispatch()

  useEffect(() => {
    password.match(/([a-z])+/g) ? dispatch(setLowercase(true)) : dispatch(setLowercase(false))
    password.match(/([A-Z])+/g) ? dispatch(setUppercase(true)) : dispatch(setUppercase(false))
    password.match(/([0-9])+/g) ? dispatch(setNumber(true)) : dispatch(setNumber(false))
    password.match(/([!@#$%^&*(),.?":{}|<>])+/g) ? dispatch(setSpChar(true)) : dispatch(setSpChar(false))
    password.length >= 5 ? dispatch(setValidLength(true)) : dispatch(setValidLength(false))
  }, [password, dispatch])
}
