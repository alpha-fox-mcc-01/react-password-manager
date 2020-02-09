import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestDeletePassword, requestEditPassword } from '../store/actions';
import { Modal, Button } from 'react-bootstrap';

const CardPassword = props => {
  const dispatch = useDispatch();
  const { id, url, login, password } = props.password;

  const [urlForm, setUrlForm] = useState('');
  const [loginForm, setLoginForm] = useState('');
  const [passwordForm, setPasswordForm] = useState('');

  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const deletePassword = id => {
    dispatch(requestDeletePassword(id));
    handleCloseDelete();
  };

  const logo = () => {
    return 'https://logo.clearbit.com/' + url;
  };

  // Modal Bootstrap React
  const [show, setShow] = useState(false);
  const handleCloseAfterUpdate = () => setShow(false);
  const handleClose = () => {
    setUrlForm(url);
    setLoginForm(login);
    setPasswordForm(password);
    setShow(false);
  };
  const handleShow = () => {
    setUrlForm(url);
    setLoginForm(login);
    setPasswordForm(password);
    setShow(true);
  };

  const editPassword = password => {
    dispatch(requestEditPassword(password));
  };

  const onSubmit = e => {
    e.preventDefault();
    editPassword({
      id,
      url: urlForm,
      login: loginForm,
      password: passwordForm,
    });
    setUrlForm('');
    setLoginForm('');
    setPasswordForm('');
    handleCloseAfterUpdate();
  };

  const onUrlChange = e => setUrlForm(e.target.value);
  const onLoginChange = e => setLoginForm(e.target.value);
  const onPasswordChange = e => setPasswordForm(e.target.value);

  return (
    <div
      className='col-6 col-sm-4 col-md-3 col-xl-2 d-flex flex-column align-items-center contain-card'
      role='listitem'
    >
      <img src={logo()} className='logo-img mt-4' alt='urlLogo'></img>
      <h6 className='text-center mt-3 mb-0'>
        <strong>{url}</strong>
      </h6>
      <p className='text-center text-muted mb-2'>{login}</p>
      <Button
        className='mb-3'
        data-testid='edit-button'
        variant='outline-success'
        size='sm'
        onClick={handleShow}
      >
        <i className='fas fa-pen-square'></i>
      </Button>

      <Button
        className='mb-3'
        data-testid='delete-button'
        variant='outline-danger'
        size='sm'
        onClick={handleShowDelete}
      >
        <i className='fas fa-trash-alt'></i>
      </Button>

      {/* Modal Delete */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You can add this password later</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseDelete}>
            Close
          </Button>
          <Button
            variant='danger'
            onClick={() => deletePassword(id)}
            data-testid='delete-password-btn'
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Edit */}
      <Modal show={show} onHide={handleClose} data-testid='modal-addPassword'>
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={logo()} className='logo-img mt-4' alt='urlLogo'></img>
            <span className='pl-4'>{url}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action='POST' onSubmit={onSubmit} data-testid='edit-form'>
            <div className='form-group'>
              <label htmlFor='url'>URL</label>
              <input
                data-testid='url-input-edit'
                type='text'
                className='form-control'
                name='url'
                id='url'
                placeholder='google.com'
                value={urlForm}
                onChange={onUrlChange}
              />
              <small id='urllHelp' className='form-text text-muted'>
                Example: google.com
              </small>
            </div>
            <div className='form-group'>
              <label htmlFor='login'>Login</label>
              <input
                data-testid='login-input-edit'
                type='text'
                className='form-control'
                name='login'
                id='login'
                placeholder='gaben'
                value={loginForm}
                onChange={onLoginChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                data-testid='password-input-edit'
                type='text'
                className='form-control'
                name='password'
                id='password'
                placeholder='Ga8#n'
                value={passwordForm}
                onChange={onPasswordChange}
              />
            </div>
            <input
              type='submit'
              value='Edit Password'
              className='btn btn-success'
              data-testid='edit-btn'
            />
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CardPassword;
