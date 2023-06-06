import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState({});

  useEffect(() => {
    axios
      .get("http://openlibrary.org/subjects/fantasy.json?limit=10")
      .then((res) => {
        setBooks(res.data);
      });
  }, []);

  return (
    <div>
      <h1>Books by subjects</h1>
      <h2>Subject: {books.name}</h2>
      <h3>Total books:{books.work_count}</h3>
      {books.works !== undefined ? (
        <div class="book-container">
          {books.works.map((work) => (
            <div className="book-card">
              <img
                class="book-card-img"
                src={`https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`}
                alt={`${work.title} by ${work.authors[0].name}`}
              />
              <h4 class="book-card-title">{work.title}</h4>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default Home;

