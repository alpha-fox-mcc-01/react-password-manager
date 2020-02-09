import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestPasswords } from '../store/actions';
import CardPassword from './CardPassword';

const ListPassword = () => {
  const dispatch = useDispatch();
  const passwords = useSelector(state => state.passwords);
  const [listPasswords, setListPasswords] = useState(passwords);
  const filteredPasswords = useSelector(state => state.filteredPasswords);
  const userQuery = useSelector(state => state.userQuery);

  useEffect(() => {
    dispatch(requestPasswords());
  }, [dispatch]);

  useEffect(() => {
    if (userQuery) {
      setListPasswords(filteredPasswords);
    } else {
      setListPasswords(passwords);
    }
  }, [userQuery, filteredPasswords, passwords]);

  return listPasswords.map(password => {
    return <CardPassword key={password.id} password={password} />;
  });
};

export default ListPassword;
