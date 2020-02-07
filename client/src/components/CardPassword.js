import React from 'react';
import { useDispatch } from 'react-redux';
import { requestDeletePassword } from '../store/actions';
import Swal from 'sweetalert2';

const CardPassword = props => {
  const dispatch = useDispatch();
  const { id, url, login, password } = props.password;

  const deletePassword = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You can add this password again later!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete password!',
    }).then(result => {
      if (result.value) {
        Swal.fire('Deleted!', 'Your password has been deleted.', 'success');
        dispatch(requestDeletePassword(id));
      }
    });
  };

  return (
    <div className='card col-4'>
      <h5 className='card-title'>{url}</h5>
      <div className='card-body'>
        <h6>{login}</h6>
        <h6>{password}</h6>
      </div>
      <button className='btn btn-danger' onClick={() => deletePassword(id)}>
        Delete
      </button>
    </div>
  );
};

export default CardPassword;
