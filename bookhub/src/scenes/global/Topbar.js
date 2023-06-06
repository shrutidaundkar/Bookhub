import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import axios from "axios";

library.add(faSearch);

const Topbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    axios
      .get(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}`)
      .then((res) => {
        const book = res.data.docs[0];
        setSearchResult({
          cover_id: book.cover_i,
          title: book.title,
          authors: [{ name: book.author_name ? book.author_name[0] : "" }],
          first_publish_year: book.first_publish_year,
          // Include genre here if available in the API
        });
      });
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a book"
        />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      {searchResult !== null ? (
        <div className="book-card">
          <img
            className="book-card-img"
            src={`https://covers.openlibrary.org/b/id/${searchResult.cover_id}-M.jpg`}
            alt={`${searchResult.title} by ${searchResult.authors[0].name}`}
          />
          <div className="book-details">
            <h4 className="book-card-title">{searchResult.title}</h4>
            <h3 className="book-card-author">{searchResult.authors[0].name}</h3>
            <h5>First published in: {searchResult.first_publish_year}</h5>
            {/* Add genre here */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Topbar;
