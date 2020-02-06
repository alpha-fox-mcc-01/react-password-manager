import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Button, Modal } from "react-bootstrap";

import { requestAddPassword } from '../store/actions/'

export default function PasswordForm() {
  let dispatch = useDispatch()
  // Ini buat toggle modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // errors
  const [upperCase, setUpperCase] = useState(true)
  const [lowerCase, setLowerCase] = useState(true)
  const [special, setSpecial] = useState(true)
  const [number, setNumber] = useState(true)
  const [length, setLength] = useState(true)

  const handleUrlChange = event => {
    setUrl(event.target.value);
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    if (password.toLowerCase() !== password) {setUpperCase(false)} else setUpperCase(true)
    if (password.toUpperCase() !== password) {setLowerCase(false)} else setLowerCase(true)
    if (new RegExp('[^a-z0-9 ]').test(password)) {setSpecial(false)} else setSpecial(true)
    if (new RegExp('[0-9]').test(password)) {setNumber(false)} else setNumber(true)
    if (password.length > 5) {setLength(false)} else setLength(true)
  }, [password])

  const handleFormSubmit = event => {
    event.preventDefault();
    // console.log('masuk')
    dispatch(requestAddPassword({
      url,
      username,
      password
    }))
    handleClose()
  };
  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Add New
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Password Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ handleFormSubmit }>
            <div className="form-group">
              <label htmlFor="exampleInputURL1">URL</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputURL1"
                aria-describedby="URLHelp"
                placeholder="Enter URL"
                onChange={ handleUrlChange }
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your passwords with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputUsername1">Username</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputUsername1"
                placeholder="Username"
                onChange={ handleUsernameChange }
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={ handlePasswordChange }
              />
              <br />
              <p style={{ lineHeight: '60%'}}><b><u>Password Strength:&nbsp;</u>
                { (upperCase || lowerCase || special || number || length) && <span className='errors'>Not Recommended</span>}
                {!(upperCase || lowerCase || special || number || length) && <span className='proper'>Ok</span>}
              </b></p>
              { upperCase && <p className='errors'>&bull;&nbsp;Password should have at least one upper-case letter.</p>}
              { lowerCase && <p className='errors'>&bull;&nbsp;Password should have at least one lower-case letter.</p>}
              { special && <p className='errors'>&bull;&nbsp;Password should have at least one special character ( #$@!%).</p>}
              { number && <p className='errors'>&bull;&nbsp;Password should have at least one number.</p>}
              { length && <p className='errors'>&bull;&nbsp;Password should be longer than 5 characters.</p>}
            </div>
            <hr />
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
