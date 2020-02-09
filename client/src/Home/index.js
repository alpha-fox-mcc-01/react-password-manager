import React, { useState, useEffect } from "react";
import PasswordContainer from "./components/PasswordContainer";
import SearchPassword from "./components/SearchPassword";
import ListPasswords from "./components/ListPasswords";
import useFetcher from "../hooks/useFetcher";
export function Home() {
  const { data, error } = useFetcher();
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
  
  


  return (
    <div data-testid="home-page">
      <PasswordContainer></PasswordContainer>
      <SearchPassword searchByKeyword= {searchByKeyword}></SearchPassword>
      <ListPasswords data={ list }></ListPasswords>
    </div>
  );
}

export default Home;
