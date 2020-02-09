import React, { useState, useDispatch } from 'react';
import { registerUser } from '../store/actions';

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = user => {
    dispatch(registerUser(user));
  };

  const onSubmit = e => {
    e.preventDefault();
    register({
      name,
      email,
      password,
    });
    setName('');
    setEmail('');
    setPassword('');
  };

  const onNameChange = e => setName(e.target.value);
  const onEmailChange = e => setEmail(e.target.value);
  const onPasswordChange = e => setPassword(e.target.value);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-5'>
          <h1>Register Page</h1>
        </div>
        <div className='col-7'>
          <form action='POST' onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                name='name'
                id='name'
                type='name'
                className='form-control'
                onChange={onNameChange}
                value={name}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <input
                name='email'
                id='email'
                type='email'
                className='form-control'
                onChange={onEmailChange}
                value={email}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                id='password'
                type='password'
                className='form-control'
                onChange={onPasswordChange}
                value={password}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
