import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestFilterPasswords, setQuery } from '../store/actions';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const NavbarDashboard = () => {
  const dispatch = useDispatch();
  const userQuery = useSelector(state => state.userQuery);
  const onSearchChange = e => {
    dispatch(setQuery(e.target.value));
    dispatch(requestFilterPasswords(e.target.value));
  };

  return (
    <Navbar bg='dark' variant='dark'>
      <Navbar.Brand to='/'>Oasis</Navbar.Brand>
      <Nav className='mr-auto'>
        <Link className='nav-link' to='/'>
          Home
        </Link>
        <Link className='nav-link' to='/dashboard'>
          Dashboard
        </Link>
      </Nav>
      <Form inline>
        <FormControl
          type='text'
          placeholder='Search'
          className='mr-sm-2'
          value={userQuery}
          onChange={onSearchChange}
        />
        <Button variant='outline-info'>Search</Button>
      </Form>
    </Navbar>
  );
};

export default NavbarDashboard;
