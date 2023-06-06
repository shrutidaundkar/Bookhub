import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import axios from "axios";

library.add(faSearch);

const Topbar = ({ setSearchResult }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    axios
      .get(`https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`)
      .then((res) => {
        const book = res.data.docs[0];
        setSearchResult({
          cover_id: book.cover_i,
          title: book.title,
          authors: book.author_name || [],
          first_publish_year: book.first_publish_year,
          subject: book.subject[1]
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
    </div>
  );
};

export default Topbar;
