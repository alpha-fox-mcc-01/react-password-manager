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
    const searchResult = data.filter(password => {
      return password.url.startsWith(`${keyword}`);
    });
    searchResult.length > 0 && setResult(searchResult);
  };

  useEffect(() => {
    console.log('use effect kepanggil')
    if (result.length > 0) {
      setList(result)
    } 
    setList(data)
  }, [result, data])
  
  


  return (
    <div data-testid="home-page">
      <PasswordContainer></PasswordContainer>
      <SearchPassword searchByKeyword= {searchByKeyword}></SearchPassword>
      <button role="button" data-testid="delete-button"
        className="px-2 py-2 bg-red-400 text-white rounded"
      >
        Delete
      </button>
      <ListPasswords data={ list }></ListPasswords>
    </div>
  );
}

export default Home;
