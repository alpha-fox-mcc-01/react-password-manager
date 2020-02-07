import React from 'react';
import AddPassword from '../components/AddPassword';
import ListPassword from '../components/ListPassword';
import NavbarDashboard from '../components/NavbarDashboard';

const Dashboard = () => {
  return (
    <div className='container' data-testid='dashboard-container'>
      <NavbarDashboard />
      <h1>Dashboard</h1>
      <div className='row'>
        <AddPassword />
      </div>
      <div className='row'>
        <ListPassword />
      </div>
    </div>
  );
};

export default Dashboard;
