import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestAddPassword } from '../store/actions';
import { Modal, Button, Popover, OverlayTrigger } from 'react-bootstrap';
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
      return 'text-success';
    }
    return 'text-danger';
  };

  // Popover Bootstrap React
  const popover = (
    <Popover id='popover-basic'>
      <Popover.Title as='h3' className={textColor()}>
        Password Requirement
      </Popover.Title>
      <Popover.Content>
        <div className='container m-2'>
          <div className='row'>
            <div className='col-2'>
              {fullfilled(passwordStrength.minimumLength)}
              {fullfilled(passwordStrength.lowerCase)}
              {fullfilled(passwordStrength.upperCase)}
              {fullfilled(passwordStrength.number)}
              {fullfilled(passwordStrength.specialCharacter)}
            </div>
            <div className='col-10'>
              <p className='m-0'>Minimum Length 5</p>
              <p className='m-0'>At least one Lowercase</p>
              <p className='m-0'>At least one Uppercase</p>
              <p className='m-0'>At least one number</p>
              <p className='m-0'>At least one special character (!@#$%^&*)</p>
            </div>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );

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
      <Button variant='primary' onClick={handleShow}>
        Add New
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action='POST' onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='url'>URL</label>
              <input
                type='text'
                className='form-control'
                name='url'
                id='url'
                placeholder='http://oasisland.ivantjendra.xyz'
                value={url}
                onChange={onUrlChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='login'>Login</label>
              <input
                type='text'
                className='form-control'
                name='login'
                id='login'
                placeholder='Gaben'
                value={login}
                onChange={onLoginChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <OverlayTrigger
                trigger='focus'
                placement='right'
                overlay={popover}
              >
                <input
                  type='password'
                  className='form-control'
                  name='password'
                  id='password'
                  placeholder='*****'
                  value={password}
                  onChange={onPasswordChange}
                />
              </OverlayTrigger>
            </div>
            <input
              type='submit'
              value='Add Password'
              className='btn btn-success'
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddPassword;
