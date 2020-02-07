import React, { useState } from "react";

export function SearchPassword(props) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = event => {
    setKeyword(event.target.value);
    props.searchByKeyword(event.target.value);
  };
  return (
    <div data-testid="searchbar">
      <form className="w-full">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          value={keyword}
          onChange={event => handleSearch(event)}
          name="search"
          placeholder="Search.."
        ></input>
      </form>
    </div>
  );
}

export default SearchPassword;
