import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import AuthorDetails from "../global/AuthorDetails";

const Authors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState();


  const handleSearch = async (e) => {
    // e.preventDefault();
    try {
    axios.get(
        `https://openlibrary.org/search/authors.json?q=j%20k%20rowling`
      ).then(res=> {
        // console.log(res.data);
        setSearchResult(res.data);
      })
      .catch(err => console.log(err));
      // setSearchResult(response.data);
    } catch (error) {
      console.log("Error occurred while searching authors:", error);
    }
    console.log(searchResult);
  };
  
  return (
  <div>
      <h1>Authors</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for an author"
        />
        <button onClick={handleSearch}>Search</button>
      {(searchResult !== undefined) ?
      <div>
        { searchResult.docs.map((author) => (
          <>
          {/* <AuthorDetails authorKey={author.key} /> */}
          <p>{author.name}</p>
          <p>{author.birth_date}</p>
          <p>{author.top_works}</p>
          <p>{author.work_count}</p>
          </>

          // <div key={author.key}>
          //   {/* <Link to={`/authors/${author.key}`}>{author.name}</Link> */}
          // </div>
        ))}
      </div> 
      :null}
    </div>
  );
};
export default Authors;
