import React from 'react';

const CardPassword = props => {
  const { url, login, password } = props.password;
  return (
    <div className='card col-4'>
      <h5 className='card-title'>{url}</h5>
      <div className='card-body'>
        <h6>{login}</h6>
        <h6>{password}</h6>
      </div>
    </div>
  );
};

export default CardPassword;
