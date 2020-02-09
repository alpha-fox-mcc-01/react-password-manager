import React, { useState, useEffect } from "react";
import PasswordContainer from "./components/PasswordContainer";
import SearchPassword from "./components/SearchPassword";
import ListPasswords from "./components/ListPasswords";
import useFetcher from "../hooks/useFetcher";
import NavBar from './NavBar'
import { Nav } from "react-bootstrap";
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
    <>
    <HeaderBrand></HeaderBrand>
    <div style={styles} className="flex flex-wrap" data-testid="home-page">
      <NavBar></NavBar>
    </div>
    </>
  );
}

export default Home;
