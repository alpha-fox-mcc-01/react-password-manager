import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestAddPassword } from '../store/actions';
import { Modal, Button } from 'react-bootstrap';
import usePasswordStrength from '../hooks/usePassStr';

const AddPassword = () => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword, passwordStrength] = usePasswordStrength('');

  const fullfilled = value => {
    if (value) {
      return <i className='fas fa-check text-success'></i>;
    }
    return <i className='fas fa-times text-danger'></i>;
  };

  // Modal Bootstrap React
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const textColor = () => {
    if (
      passwordStrength.minimumLength &&
      passwordStrength.lowerCase &&
      passwordStrength.upperCase &&
      passwordStrength.number &&
      passwordStrength.specialCharacter
    ) {
      return 'text-success lead mb-1';
    }
    return 'text-danger lead mb-1';
  };

  const passwordWidget = (
    <div className='container m-2'>
      <div className='row'>
        <p className={textColor()}>Password Strength</p>
      </div>
      <div className='row mb-3'>
        <div className='col-1'>
          <p data-testid='minimum-length' className='m-0'>
            {fullfilled(passwordStrength.minimumLength)}
          </p>
          <p data-testid='lower-case' className='m-0'>
            {fullfilled(passwordStrength.lowerCase)}
          </p>
          <p data-testid='upper-case' className='m-0'>
            {fullfilled(passwordStrength.upperCase)}
          </p>
          <p data-testid='number' className='m-0'>
            {fullfilled(passwordStrength.number)}
          </p>
          <p data-testid='special-character' className='m-0'>
            {fullfilled(passwordStrength.specialCharacter)}
          </p>
        </div>
        <div className='col-11'>
          <p className='m-0'>Minimum Length 5</p>
          <p className='m-0'>At least one Lowercase</p>
          <p className='m-0'>At least one Uppercase</p>
          <p className='m-0'>At least one number</p>
          <p className='m-0'>At least one special character (!@#$%^&*)</p>
        </div>
      </div>
    </div>
  );

  // Popover Bootstrap React
  // const popover = (
  //   <Popover id='popover-basic'>
  //     <Popover.Title as='h3' className={textColor()}>
  //       Password Requirement
  //     </Popover.Title>
  //     <Popover.Content>
  //       <div className='container m-2'>
  //         <div className='row'>
  //           <div className='col-2'>
  //             {fullfilled(passwordStrength.minimumLength)}
  //             {fullfilled(passwordStrength.lowerCase)}
  //             {fullfilled(passwordStrength.upperCase)}
  //             {fullfilled(passwordStrength.number)}
  //             {fullfilled(passwordStrength.specialCharacter)}
  //           </div>
  //           <div className='col-10'>
  //             <p className='m-0'>Minimum Length 5</p>
  //             <p className='m-0'>At least one Lowercase</p>
  //             <p className='m-0'>At least one Uppercase</p>
  //             <p className='m-0'>At least one number</p>
  //             <p className='m-0'>At least one special character (!@#$%^&*)</p>
  //           </div>
  //         </div>
  //       </div>
  //     </Popover.Content>
  //   </Popover>
  // );

  const addPassword = password => {
    dispatch(requestAddPassword(password));
  };

  const onSubmit = e => {
    e.preventDefault();
    addPassword({
      url,
      login,
      password,
    });
    setUrl('');
    setLogin('');
    setPassword('');
    handleClose();
  };

  const onUrlChange = e => setUrl(e.target.value);
  const onLoginChange = e => setLogin(e.target.value);
  const onPasswordChange = e => setPassword(e.target.value);

  return (
    <>
      <Button
        className='m-3'
        data-testid='add-button'
        variant='dark'
        onClick={handleShow}
      >
        Add New
      </Button>

      <Modal show={show} onHide={handleClose} data-testid='modal-addPassword'>
        <Modal.Header closeButton>
          <Modal.Title>Add Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            action='POST'
            onSubmit={onSubmit}
            data-testid='new-password-form'
          >
            <div className='form-group'>
              <label htmlFor='url'>URL</label>
              <input
                data-testid='url-input'
                type='text'
                className='form-control'
                name='url'
                id='url'
                placeholder='google.com'
                value={url}
                onChange={onUrlChange}
              />
              <small id='urllHelp' className='form-text text-muted'>
                Example: google.com
              </small>
            </div>
            <div className='form-group'>
              <label htmlFor='login'>Login</label>
              <input
                data-testid='login-input'
                type='text'
                className='form-control'
                name='login'
                id='login'
                placeholder='gaben'
                value={login}
                onChange={onLoginChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                data-testid='password-input'
                type='password'
                className='form-control'
                name='password'
                id='password'
                placeholder='Ga8#n'
                value={password}
                onChange={onPasswordChange}
              />
            </div>
            {passwordWidget}
            <input
              type='submit'
              value='Add Password'
              className='btn btn-success'
              data-testid='add-password-btn'
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddPassword;
