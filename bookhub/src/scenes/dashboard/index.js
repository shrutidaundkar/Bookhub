// import { useEffect, useState } from "react";
// import axios from "axios";

// const Home = () => {
//   const [books, setBooks] = useState({});

//   useEffect(() => {
//     axios
//       .get("http://openlibrary.org/subjects/fantasy.json?limit=10")
//       .then((res) => {
//         setBooks(res.data);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Books by subjects</h1>
//       <h2>Subject: {books.name}</h2>
//       <h3>Total books:{books.work_count}</h3>
//       {books.works !== undefined ? (
//         <div class="book-container">
//           {books.works.map((work) => (
//             <div className="book-card">
//               <img
//                 class="book-card-img"
//                 src={`https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`}
//                 alt={`${work.title} by ${work.authors[0].name}`}
//               />
//               <h4 class="book-card-title">{work.title}</h4>
//             </div>
//           ))}
//         </div>
//       ) : null}
//     </div>
//   );
// };
// export default Home;

import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    axios
      .get("http://openlibrary.org/subjects/fantasy.json?limit=10")
      .then((res) => {
        setBooks(res.data.works);
      });
  }, []);

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
          authors: [{ name: book.author_name ? book.author_name[0] : "" }]
        });
      });
  };

  return (
    <div>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a book"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <h1>Search Result</h1>
      {searchResult !== null ? (
        <div className="book-card">
          <img
            className="book-card-img"
            src={`https://covers.openlibrary.org/b/id/${searchResult.cover_id}-M.jpg`}
            alt={`${searchResult.title} by ${searchResult.authors[0].name}`}
          />
          <h4 className="book-card-title">{searchResult.title}</h4>
          <div className="book-details">
            <h3 className="book-card-author">{searchResult.authors[0].name}</h3>
            </div>
        </div>
      ) : null}
      <h1>Books by subjects</h1>
      <div className="book-container">
        {books.map((book) => (
          <div className="book-card">
            <img
              className="book-card-img"
              src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
              alt={`${book.title} by ${book.authors[0].name}`}
            />
            <h4 className="book-card-title">{book.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
