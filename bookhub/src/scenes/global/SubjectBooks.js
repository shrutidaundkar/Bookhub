import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../global/Bookcard";

const SubjectBooks = (props) => {
  const [books, setBooks] = useState({});

  useEffect(() => {
    axios
      .get(`http://openlibrary.org/subjects/${props.subject}.json?limit=10`)
      .then((res) => {
        setBooks(res.data);
      });
  }, [props]);

  return (
    <div className="text-left bg-secondary">
      <h2 className="text-left">Subject: {books.name}</h2>
      {books.works !== undefined ? (
        <div class="book-container">
          {books.works.map((work) => (
            <BookCard work={work} />
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default SubjectBooks;
