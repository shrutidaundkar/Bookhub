import SubjectBooks from "../scenes/global/SubjectBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import SearchResult from "../scenes/global/SearchResult";
import Topbar from "../scenes/global/Topbar";
library.add(faSearch);
const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    axios
      .get(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(
          searchTerm
        )}`
      )
      .then((res) => {
        const book = res.data.docs[0];
        setSearchResult({
          cover_id: book.cover_i,
          title: book.title,
          authors: book.author_name || [],
          first_publish_year: book.first_publish_year,
          subject: book.subject[1],
          key: book.key,
        });
      });
  };
  return (
    <div>
      <Topbar title={"Books Dashboard"} />
      <div class="mx-auto p-2">
        <form onSubmit={handleSearch}>
          <label for="bookSearch" className=" h5 p-2">
            Enter book name:
          </label>
          <input
            className=""
            type="text"
            id="bookSearch"
            name="bookSearch"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a book"
          />
          <button type="submit" className="btn btn-primary">
            <FontAwesomeIcon icon={faSearch} /> Search
          </button>
        </form>
      </div>
      {searchResult !== undefined && (
        <SearchResult searchResult={searchResult} />
      )}
      <h1 className="text-left options p-3">Click to expand a subject Book:</h1>
      <SubjectBooks />
    </div>
  );
};
export default Home;
