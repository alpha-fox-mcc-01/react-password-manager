import React from 'react';

const Login = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-5'>
          <h1>Register Page</h1>
        </div>
        <div className='col-7'>
          <form action='POST'>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input type='name' />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <input type='email' />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input type='password' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
