import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export function HeaderBrand() {

  const size = {
    width: "50px",
    height: "50px"
  }

 
  return (
    <>
      <Navbar>
        <Navbar.Brand>WeProtecc!&trade; </Navbar.Brand>
        <img style={size} src="https://media2.giphy.com/media/QKUtSlT6aSgB4eUBCG/source.gif" alt="ppg" />
        <Navbar.Text>
          Your password manager
        </Navbar.Text>
      </Navbar>
      <br />
    </>
  );
}
export default HeaderBrand