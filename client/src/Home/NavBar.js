import {Tabs, Tab} from 'react-bootstrap'
import PasswordContainer from './components/PasswordContainer'
import React, { useState, useEffect } from "react";
import SearchPassword from "./components/SearchPassword";
import useFetcher from "../hooks/useFetcher";
import './NavBar.css'
import ListAccordion from "./components/ListAccordion"
import PasswordGenerator from "./components/PasswordGenerator"
import { useSelector } from "react-redux"
export function NavBar() {
    const loading = useSelector(state => state.loading)
    const [key, setKey] = useState('home');
    const styles = {
        backgroundColor: "#A0A0A0"
    }
    const listStyle = {
        backgroundColor: "#ffe9a2"
    }
    const header = {
        marginTop: "0.5rem"
    }
    const { data } = useFetcher();
    const [result, setResult] = useState([]);
    const [list, setList] = useState([])
  
    const searchByKeyword = keyword => {
      console.log(keyword)
      const searchResult = data.filter(password => {
        return password.url.startsWith(`${keyword}`);
      });
      searchResult.length > 0 && setResult(searchResult);
    };
  
    useEffect(() => {
      if (result.length > 0) {
        setList(result)
      } else {
        setList(data)
      } 
      
    }, [result, data])

    const loadGif = {
      margin: "0 auto",
      width: "200px",
      height: "200px"
    };  

    if (loading) { 
      return (
        <img style={loadGif} src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" alt="loading"></img>
      )
    }

    return (
        <div className="w-1/2">
        <Tabs style={header} id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
            <Tab style={styles} eventKey="home" title="Insert New Password">
            <PasswordContainer></PasswordContainer>
            </Tab>
            <Tab style={listStyle} eventKey="profile" title="Your passwords">
            <SearchPassword searchByKeyword= {searchByKeyword}></SearchPassword>
            <ListAccordion data={ list }></ListAccordion>
            </Tab>
            <Tab style={listStyle} eventKey="other" title="Generate a password">
              <PasswordGenerator></PasswordGenerator>
            </Tab>
        </Tabs>
        </div>
    );
}

export default NavBar
