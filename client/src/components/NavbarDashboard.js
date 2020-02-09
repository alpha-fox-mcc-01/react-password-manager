import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestFilterPasswords, setQuery } from '../store/actions';
import { Navbar, Form, FormControl, InputGroup } from 'react-bootstrap';

const NavbarDashboard = () => {
  const dispatch = useDispatch();
  const userQuery = useSelector(state => state.userQuery);
  const onSearchChange = e => {
    dispatch(setQuery(e.target.value));
    dispatch(requestFilterPasswords(e.target.value));
  };

  return (
    <Navbar bg='dark' variant='dark' expand='sm' data-testid='dashboard-navbar'>
      <Navbar.Brand to='/'>Oasis</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Form inline>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id='basic-addon1'>
                <i className='fas fa-search'></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type='text'
              placeholder='Search by login or url'
              className='mr-sm-2'
              value={userQuery}
              onChange={onSearchChange}
              data-testid='search-input'
            />
          </InputGroup>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarDashboard;
