import React from "react";
import NavBar from './NavBar';
import HeaderBrand from './components/HeaderBrand'
export function Home() {

  
  
 const styles = {
   justifyContent: "center",
   alignItems: "center"
 }
 const size = {
   width: "50px",
   height: "50px"
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
