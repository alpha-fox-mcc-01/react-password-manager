import React from 'react';
import './App.css';
import './config/firebase'


import Home from './Home'
function App() {

  return (
   
    <React.StrictMode>
      <div className="App">
        <Home data-testid="home-page"></Home>
      </div>
    </React.StrictMode>
   
  );
}

export default App;
