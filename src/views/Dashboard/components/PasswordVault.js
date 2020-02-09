import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { requestPasswords } from '../../../store/actions'
import PasswordCard from './PasswordCard'
import Loading from '../../../components/Loading'

export default function PasswordVault() {
  const userId = 'userid123'
  const dispatch = useDispatch()

  const isFetching = useSelector((state) => state.ui.isFetching)

  const myPasswords = useSelector((state) => state.password.myPasswords)

  useEffect(() => {
    dispatch(requestPasswords(userId))
  }, [dispatch])

  return (
    <>
      {isFetching ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className=''>
          <h4>Click the lock icon to reveal your password</h4>
          <div data-testid='passwordList' className='d-flex flex-wrap'>
            {myPasswords.map((password) => (
              <PasswordCard password={password} key={password.id} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
