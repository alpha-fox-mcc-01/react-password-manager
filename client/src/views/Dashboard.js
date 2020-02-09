import React from 'react';
import AddPassword from '../components/AddPassword';
import ListPassword from '../components/ListPassword';
import NavbarDashboard from '../components/NavbarDashboard';

const Dashboard = () => {
  return (
    <>
      <NavbarDashboard />
      <div className='container'>
        <div className='row'>
          <AddPassword />
        </div>
        <div className='row' data-testid='password-list'>
          <ListPassword />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
