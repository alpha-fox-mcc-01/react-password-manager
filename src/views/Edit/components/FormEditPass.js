import db from '../../../configs/firestore'

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { reqDeletePassword } from '../../../store/actions'

import PasswordStrIndicator from '../../Dashboard/components/PasswordStrIndicator'
import Loading from '../../../components/Loading'

import useDataBinding from '../../../hooks/useDataBinding'
import usePasswordCheck from '../../../hooks/usePassChecker'

export default function FormEditPass() {
  const dispatch = useDispatch()
  const history = useHistory()

  const [isFetching, setIsFetching] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const { id } = useParams()
  const { haveLowercase, haveUppercase, haveNumber, haveSpchar, haveValidLength } = useSelector(
    (state) => state.password
  )

  const [label, labelBinding, labelReset, setLabel] = useDataBinding('')
  const [url, urlBinding, urlReset, setUrl] = useDataBinding('')
  const [password, passwordBinding, passwordReset, setPassword] = useDataBinding('')
  const [field, fieldBinding, fieldReset, setField] = useDataBinding('email')
  const [fieldvalue, fieldvalueBinding, fieldvalueReset, setFieldvalue] = useDataBinding('')
  const [notes, notesBinding, notesReset, setNotes] = useDataBinding('')
  const [passwordConfirm, passwordConfirmBinding, passwordConfirmReset, setPasswordConfirm] = useDataBinding('')

  useEffect(() => {
    db.collection('passwords')
      .doc(id)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.data()
        setLabel(data.name)
        setUrl(data.url)
        setNotes(data.notes)
        setField(data.fields.type)
        setFieldvalue(data.fields.value)
        setPassword(data.fields.password)
        setPasswordConfirm(data.fields.password)
        setIsFetching(false)
      })
  }, [id, setLabel, setUrl, setNotes, setField, setFieldvalue, setPassword, setPasswordConfirm, setIsFetching])

  function resetForm() {
    labelReset()
    urlReset()
    passwordReset()
    passwordConfirmReset()
    fieldReset()
    fieldvalueReset()
    notesReset()
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    const editedPayload = {
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

    db.collection('passwords')
      .doc(id)
      .update(editedPayload)
      .then(() => {
        resetForm()
        history.push('/dashboard')
      })
      .catch(console.log)
  }

  function showConfirmDelete(value) {
    setShowConfirm(value)
  }

  function handleDelete() {
    setIsFetching(true)
    dispatch(reqDeletePassword(id))
    history.push('/dashboard')
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
  function handleToggleVisible() {
    setIsVisible(!isVisible)
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

  usePasswordCheck(password)

  const passwordStrPoint = haveLowercase + haveUppercase + haveNumber + haveSpchar + haveValidLength

  return (
    <div className=''>
      {isFetching ? (
        <Loading />
      ) : (
        <div>
          <div className='d-flex'>
            <button
              className='btn btn-danger mr-3 btn-sm'
              onClick={(event) => {
                showConfirmDelete(!showConfirm)
              }}
            >
              <i className='fas fa-trash mx-2'></i>
            </button>
            <h4>Edit Password</h4>
          </div>
          {showConfirm && (
            <div className='d-flex align-items-center'>
              <div className=''>
                <span className='mr-4'>are you sure to delete this password?</span>
                <span
                  className='mr-4 fa-btns'
                  onClick={(event) => {
                    showConfirmDelete(false)
                  }}
                >
                  <u>
                    <b>No</b>
                  </u>
                </span>
                <span
                  className='text-danger fa-btns'
                  onClick={(event) => {
                    handleDelete()
                  }}
                >
                  <u>
                    <b>Yes</b>
                  </u>
                </span>
              </div>
            </div>
          )}
          <hr className='my-3' />
          <form className='row' onSubmit={handleFormSubmit}>
            <label className='col-sm-2 col-form-label'>
              <strong>Label</strong>
            </label>
            <div className='col-sm-10 mb-4'>
              <input data-testid='inputLabel' {...labelBinding} type='text' className='form-control' />
              <small className='form-text text-muted'>password label</small>
            </div>

            <label className='col-sm-2 col-form-label'>
              <strong>URL</strong>
            </label>
            <div className='col-sm-10 mb-4'>
              <input data-testid='inputUrl' {...urlBinding} type='text' className='form-control' />
              <small className='form-text text-muted'>yourwebsite.com</small>
            </div>

            <label className='col-sm-2 col-form-label'>
              <strong>Fields</strong>
            </label>
            <div className='col-sm-10 mb-2'>
              <div className='d-flex'>
                <select
                  data-testid='inputFieldOption'
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
                  {...passwordBinding}
                  type={isVisible ? 'text' : 'password'}
                  className='form-control'
                />
                <div
                  onClick={() => {
                    handleGeneratePassword()
                  }}
                  className='btn btn-outline-danger'
                >
                  Generate
                </div>
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
              <textarea {...notesBinding} name='' id='' rows='3' className='form-control mb-4'></textarea>
              <div className=''>
                <button disabled={isSaving} className='btn btn-danger badge-pill px-5'>
                  {isSaving ? 'saving...' : 'Save'}
                </button>
                <Link to='/dashboard' className='ml-3'>
                  abort
                </Link>
              </div>
            </div>
          </form>
          <br />
        </div>
      )}
    </div>
  )
}
