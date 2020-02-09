import React from "react";
import NavBar from './NavBar';
import HeaderBrand from './components/HeaderBrand'
export function Home() {

  
  
 const styles = {
   justifyContent: "center",
   alignItems: "center"
 }
 

  return (
    <div data-testid="home-page">
    <div data-testid="header">
    <HeaderBrand></HeaderBrand>
    </div>
    <div style={styles} className="flex flex-wrap" data-testid="tabs">
      <NavBar></NavBar>
    </div>
    </div>
  );
}

export default Home;
