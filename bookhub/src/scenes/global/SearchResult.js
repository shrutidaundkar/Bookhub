import { useState } from "react";
import BookDetailsModal from "./BookDetails";

const SearchResult = ({ searchResult }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="search-results ">
      {searchResult !== undefined && (
        <div className="book-card search-result-container-card">
          <img
            className="book-card-img"
            src={`https://covers.openlibrary.org/b/id/${searchResult.cover_id}-M.jpg`}
            alt={`${searchResult.title} by ${searchResult.authors[0]}`}
          />
          <div className="book-card-info">
            <h3 className="book-card-info-title">{searchResult.title}</h3>
            <p>
              <b>Author:</b>
              {searchResult.authors.map((author) => (
                <i> {author}</i>
              ))}
            </p>
            <BookDetailsModal
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              bookKey={searchResult.key}
              coverId={searchResult.cover_id}
            />
            <button onClick={openModal} class="btn btn-block btn-primary">
              More info
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
