import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AuthorDetails from "../global/AuthorDetails";
import Topbar from "../global/Topbar";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faSearch);
const Authors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState();

  const handleSearch = async (e) => {
    if (searchTerm !== "") {
      try {
        axios
          .get(
            `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(
              searchTerm
            )}`
          )
          .then((res) => {
            setSearchResult(res.data);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        console.log("Error occurred while searching authors:", error);
      }
    }
  };

  return (
    <div>
      <Topbar title={"Authors"} />
      <div class="mx-auto p-2">
        <label for="authorSearch" className=" h5 p-2">
          Enter author name:
        </label>
        <input
          type="text"
          id="authorSearch"
          name="authorSearch"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for an author"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {searchResult !== undefined ? (
        <div className="card-container">
          {searchResult.docs.map((author) => (
            <>
              <AuthorDetails authorKey={author.key} />
            </>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default Authors;
