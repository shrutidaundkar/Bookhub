const SearchResult = ({ searchResult }) => {
    return (
      <div className="search-results">
        {searchResult && (
          <div className="book-card">
            <img
              className="book-card-img"
              src={`https://covers.openlibrary.org/b/id/${searchResult.cover_id}-M.jpg`}
              alt={`${searchResult.title} by ${searchResult.authors[0]}`}
            />
            <div className="book-details">
              <h2 className="book-card-title">{searchResult.title}</h2>
              {searchResult.authors.map((author) => (
                <h3 className="book-card-author">{author}</h3>
              ))}
              <h3>First published in: {searchResult.first_publish_year}</h3>
              <h3>Subjects: {searchResult.subject}</h3>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default SearchResult;
  