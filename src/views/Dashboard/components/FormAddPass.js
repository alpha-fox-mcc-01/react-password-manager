import React, { useState, useEffect } from 'react'
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
  const [isVisible, setIsVisible] = useState(false)

  const [label, labelBinding] = useDataBinding('')
  const [url, urlBinding] = useDataBinding('')
  const [password, passwordBinding, passwordReset, setPassword] = useDataBinding('')
  const [field, fieldBinding] = useDataBinding('email')
  const [fieldvalue, fieldvalueBinding] = useDataBinding('')
  const [notes, notesBinding] = useDataBinding('')

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

  function handleToggleVisible() {
    setIsVisible(!isVisible)
  }

  function generatePassword() {
    const make = () => {
      const dictionary = `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*(),.?":{}|<>`

      let password = ''
      for (let i = 0; i < 12; i++) {
        password += dictionary.charAt(Math.floor(Math.random() * dictionary.length))
      }
      return password
    }

    let password = make()
    return password
  }

  function handleGeneratePassword() {
    const generatedPassword = generatePassword()
    // const isStrong =
    //   /([a-z])+/g.test(generatedPassword) &&
    //   /([A-Z])+/g.test(generatedPassword) &&
    //   /([0-9])+/g.test(generatedPassword) &&
    //   /([!@#$%^&*(),.?":{}|<>])+/g.test(generatedPassword)

    setPassword(generatedPassword)
  }

  return (
    <>
      <div data-testid='addForm' className='d-flex'>
        <h4 className='mr-auto'>Add new Password</h4>
        <span
          data-testid='closeFormBtn'
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
          <input
            data-testid='inputLabel'
            required
            disabled={isLoading}
            {...labelBinding}
            type='text'
            className='form-control'
          />
          <small className='form-text text-muted'>password label</small>
        </div>

        <label className='col-sm-2 col-form-label'>
          <strong>URL</strong>
        </label>
        <div className='col-sm-10 mb-4'>
          <input data-testid='inputUrl' disabled={isLoading} {...urlBinding} type='text' className='form-control' />
          <small className='form-text text-muted'>yourwebsite.com</small>
        </div>

        <label className='col-sm-2 col-form-label'>
          <strong>Fields</strong>
        </label>
        <div className='col-sm-10 mb-2'>
          <div className='d-flex'>
            <select
              data-testid='inputFieldOption'
              disabled={isLoading}
              {...fieldBinding}
              type='text'
              className='form-control col-4 col-sm-4'
            >
              <option value='email'>Email Address</option>
              <option value='username'>Username</option>
              <option value='phone'>Phone Number</option>
            </select>
            <input data-testid='inputFieldValue' {...fieldvalueBinding} type='text' className='form-control ml-2' />
          </div>
        </div>

        <span className='col-sm-2 col-form-span'></span>
        <div className='col-sm-10 d-flex mb-2'>
          <div className='input-group'>
            <div className='input-group-prepend fa-btns' onClick={handleToggleVisible}>
              <span className='input-group-text'>
                Password <i class={isVisible ? 'fas fa-eye-slash ml-3' : 'fas fa-eye ml-3'}></i>
              </span>
            </div>
            <input
              data-testid='inputPassword'
              disabled={isLoading}
              {...passwordBinding}
              type={isVisible ? 'text' : 'password'}
              className='form-control'
            />
            <span
              onClick={(event) => {
                handleGeneratePassword()
              }}
              className='btn btn-outline-danger'
            >
              Generate
            </span>
          </div>
        </div>

        <span className='col-sm-2 col-form-span'></span>
        <div className='col-sm-10 mb-3'>
          <div className='mt-2 d-flex justify-content-between'>
            <div className='ml-2'>
              <h5>Good password is atleast have:</h5>
              <div className={haveLowercase && 'text-success'}>
                <span>lowercase character</span>
                <i data-testid='checkLowercase' className={haveLowercase && 'fas fa-check ml-2'}></i>
              </div>
              <div className={haveUppercase && 'text-success'}>
                <span>uppercase character</span>
                <i data-testid='checkUppercase' className={haveUppercase && 'fas fa-check ml-2'}></i>
              </div>
              <div className={haveSpchar && 'text-success'}>
                <span>special character</span>
                <i data-testid='checkSpChar' className={haveSpchar && 'fas fa-check ml-2'}></i>
              </div>
              <div className={haveNumber && 'text-success'}>
                <span>number </span>
                <i data-testid='checkNumber' className={haveNumber && 'fas fa-check ml-2'}></i>
              </div>
              <div className={haveValidLength && 'text-success'}>
                <span>5 character long</span>
                <i data-testid='checkValidLength' className={haveValidLength && 'fas fa-check ml-2'}></i>
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
            data-testid='inputNotes'
            disabled={isLoading}
            {...notesBinding}
            name=''
            id=''
            rows='3'
            className='form-control mb-4'
          ></textarea>
          <button data-testid='btnSubmitAddForm' className='btn btn-danger badge-pill px-5' disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
      <br />
    </>
  )
}
