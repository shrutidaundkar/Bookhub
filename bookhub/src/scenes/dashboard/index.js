import SubjectBooks from "../global/SubjectBooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import SearchResult from "../global/SearchResult";
import Topbar from "../global/Topbar";
library.add(faSearch);
const Home = () => {
  // const [subjects, setSubjects] = useState([]);
  // setSubjects(["humor", "fantasy", "love", "magic", "romance"]);
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
        });
      });
  };
  return (
    <div>
      <Topbar title={"Books Dashboard"} />
      <form onSubmit={handleSearch}>
        <label for="bookSearch">Enter book name:</label>
        <input
          type="text"
          id="bookSearch"
          name="bookSearch"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a book"
        />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} /> Search
        </button>
      </form>
      {searchResult !== undefined && (
        <SearchResult searchResult={searchResult} />
      )}
      <h1 className="pull-left text-left">Books by subjects</h1>
      <SubjectBooks subject={"humor"} />
      <SubjectBooks subject={"fantasy"} />
    </div>
  );
};
export default Home;
