import { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";

const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
  const [booksData, setBooksData] = useState([]);

  useEffect(() => {
    const keys = [
      "humor",
      "fantasy",
      "love",
      "magic",
      "romance",
      "horror",
      "cooking",
      "finance",
      "management",
    ];
    const fetchData = async () => {
      try {
        const promises = keys.map((key) =>
          axios.get(`http://openlibrary.org/subjects/${key}.json?limit=5`)
        );

        const allResponses = await axios.all(promises);
        const responseData = allResponses.map((response) => response.data);
        setBooksData(responseData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <BookContext.Provider
      value={{
        booksData,
        setBooksData,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
export const BooksData = () => {
  return useContext(BookContext);
};
