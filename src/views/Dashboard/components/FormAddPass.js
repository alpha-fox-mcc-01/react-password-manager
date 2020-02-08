import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// hooks
import useDataBinding from '../../../hooks/useDataBinding'
import usePassCheck from '../../../hooks/usePassChecker'

// components
import './FormAddPass.css'
import PasswordStrIndicator from './PasswordStrIndicator'
// import Loading from '../../../components/Loading'

// actions
import { postPassword } from '../../../store/actions'
import { showAddForm } from '../../../store/actions'

export default function FormAddPass() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const [label, labelBinding, labelReset] = useDataBinding('')
  const [url, urlBinding, urlReset] = useDataBinding('')
  const [password, passwordBinding, passwordReset] = useDataBinding('')
  const [field, fieldBinding, fieldReset] = useDataBinding('email')
  const [fieldvalue, fieldvalueBinding, fieldvalueReset] = useDataBinding('')
  const [notes, notesBinding, notesReset] = useDataBinding('')
  const [passwordConfirm, passwordConfirmBinding, passwordConfirmReset] = useDataBinding('')

  function resetForm() {
    labelReset()
    urlReset()
    passwordReset()
    passwordConfirmReset()
    fieldReset()
    fieldvalueReset()
    notesReset()
  }

  const handleFormSubmit = (event) => {
    setIsLoading(true)
    event.preventDefault()

    // compose payload to match firebase's structure
    const newPasswordPayload = {
      name: label,
      fields: {
        password,
        type: field,
        value: fieldvalue,
      },
      url,
      owner: 'userid123',
      notes,
    }

    dispatch(postPassword(newPasswordPayload))
  }

  // watch changes on password field
  usePassCheck(password)
  const { haveLowercase, haveUppercase, haveNumber, haveSpchar, haveValidLength } = useSelector(
    (state) => state.password
  )

  const passwordStrPoint = haveLowercase + haveUppercase + haveNumber + haveSpchar + haveValidLength

  function handleCloseForm() {
    dispatch(showAddForm(false))
  }

  return (
    <>
      <div className='d-flex'>
        <h4 className='mr-auto'>Add new Password</h4>
        <span
          className='fa-btns'
          onClick={() => {
            handleCloseForm()
          }}
        >
          close [x]
        </span>
      </div>
      <hr className='my-3' />
      <form className='row' onSubmit={handleFormSubmit}>
        <label className='col-sm-2 col-form-label'>
          <strong>Label</strong>
        </label>
        <div className='col-sm-10 mb-4'>
          <input required disabled={isLoading} {...labelBinding} type='text' className='form-control' />
          <small className='form-text text-muted'>password label</small>
        </div>

        <label className='col-sm-2 col-form-label'>
          <strong>URL</strong>
        </label>
        <div className='col-sm-10 mb-4'>
          <input disabled={isLoading} {...urlBinding} type='text' className='form-control' />
          <small className='form-text text-muted'>yourwebsite.com</small>
        </div>

        <label className='col-sm-2 col-form-label'>
          <strong>Fields</strong>
        </label>
        <div className='col-sm-10 mb-2'>
          <div className='d-flex'>
            <select disabled={isLoading} {...fieldBinding} type='text' className='form-control col-4 col-sm-4'>
              <option value='email'>Email Address</option>
              <option value='username'>Username</option>
              <option value='phone'>Phone Number</option>
            </select>
            <input {...fieldvalueBinding} type='text' className='form-control ml-2' />
          </div>
        </div>

        <span className='col-sm-2 col-form-span'></span>
        <div className='col-sm-10 d-flex mb-2'>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Password</span>
            </div>
            <input disabled={isLoading} {...passwordBinding} type='password' className='form-control' />
          </div>
        </div>

        <span className='col-sm-2 col-form-span'></span>
        <div className='col-sm-10 d-flex'>
          <div className='input-group'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>Password</span>
            </div>
            <input disabled={isLoading} {...passwordConfirmBinding} type='password' className='form-control' />
          </div>
        </div>

        <span className='col-sm-2 col-form-span'></span>
        <div className='col-sm-10 mb-3'>
          <div className='mt-2 d-flex justify-content-between'>
            <div className='ml-2'>
              <h5>Good password is atleast have:</h5>
              <div className={haveLowercase && 'text-success'}>
                <span>lowercase character</span>
                <i className={haveLowercase && 'fas fa-check ml-2'}></i>
              </div>
              <div className={haveUppercase && 'text-success'}>
                <span>uppercase character</span>
                <i className={haveUppercase && 'fas fa-check ml-2'}></i>
              </div>
              <div className={haveSpchar && 'text-success'}>
                <span>special character</span>
                <i className={haveSpchar && 'fas fa-check ml-2'}></i>
              </div>
              <div className={haveNumber && 'text-success'}>
                <span>numbers </span>
                <i className={haveNumber && 'fas fa-check ml-2'}></i>
              </div>
              <div className={haveValidLength && 'text-success'}>
                <span>5 character long</span>
                <i className={haveValidLength && 'fas fa-check ml-2'}></i>
              </div>
            </div>
            <div className='d-flex'>
              <p className='mr-3'>password strength: </p>
              <PasswordStrIndicator strength={{ point: passwordStrPoint }} />
            </div>
          </div>
        </div>

        <label className='col-sm-2 col-form-label'>
          <strong>Notes</strong>
        </label>
        <div className='col-sm-10'>
          <textarea
            disabled={isLoading}
            {...notesBinding}
            name=''
            id=''
            rows='3'
            className='form-control mb-4'
          ></textarea>
          <button className='btn btn-danger badge-pill px-5' disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
      <br />
    </>
  )
}
