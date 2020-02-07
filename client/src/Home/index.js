import React, { useState } from "react";
import PasswordContainer from "./components/PasswordContainer";
import SearchPassword from "./components/SearchPassword";
import ListPassword from "./components/ListPasswords";
import useFetcher from "../hooks/useFetcher";
export function Home() {
  const { data, error } = useFetcher();
  const [result, setResult] = useState([]);

  const searchByKeyword = keyword => {
    const searchResult = data.filter(password => {
      return password.url.startsWith(`${keyword}`);
    });
    searchResult.length > 0 && setResult(searchResult);
  };

  let list = data
  if (result.length > 0) list = result
  return (
    <div data-testid="home-page">
      <PasswordContainer></PasswordContainer>
      <SearchPassword searchByKeyword= {searchByKeyword}></SearchPassword>
      <ListPassword data={ list }></ListPassword>
    </div>
  );
}

export default Home;
