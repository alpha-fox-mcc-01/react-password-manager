import React from 'react';
import AddPassword from '../components/AddPassword';
import ListPassword from '../components/ListPassword';
import SearchPassword from '../components/SearchPassword';

const Home = () => {
  return (
    <div className='container'>
      <div className='row'>
        <AddPassword />
        <SearchPassword />
      </div>
      <div className='row'>
        <ListPassword />
      </div>
    </div>
  );
};

export default Home;
