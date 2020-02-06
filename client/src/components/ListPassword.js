import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestPasswords } from '../store/actions';
import CardPassword from './CardPassword';

const ListPassword = () => {
  const dispatch = useDispatch();
  const passwords = useSelector(state => state.passwords);

  // useEffect(() => {
  //   dispatch(requestPasswords());
  // }, [dispatch]);

  return passwords.map(password => {
    return <CardPassword key={password.id} password={password} />;
  });
};

export default ListPassword;
