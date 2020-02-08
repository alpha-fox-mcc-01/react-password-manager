import React from 'react'
import { useDispatch } from 'react-redux'
import { showAddForm } from '../../../store/actions'

export default function AddPasswordFAB() {
  const dispatch = useDispatch()

  const handleShowAddForm = () => {
    dispatch(showAddForm(true))
  }
  return (
    <button
      className='btn btn-danger btn fab'
      onClick={() => {
        handleShowAddForm()
      }}
    >
      <i className='fas fa-plus'></i> Add new password
    </button>
  )
}
