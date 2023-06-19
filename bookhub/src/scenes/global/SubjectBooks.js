import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../global/Bookcard";
import { BooksData } from "../dashboard/BookContext";
const SubjectBooks = () => {
  const [responseData, setResponseData] = useState([]);
  const { booksData, setBooksData } = BooksData();

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
      if (booksData.length === 0) {
        try {
          const promises = keys.map((key) =>
            axios.get(`http://openlibrary.org/subjects/${key}.json?limit=5`)
          );

          const allResponses = await axios.all(promises);
          const responseData = allResponses.map((response) => response.data);
          setResponseData(responseData);
          console.log(responseData);
          setBooksData(responseData);
          console.log(booksData);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      } else {
        setResponseData(booksData);
        console.log(responseData);
      }
    };

    fetchData();
  }, [booksData, responseData, setBooksData]);

  const toggleContainer = (index) => {
    const updatedResponseData = [...responseData];
    updatedResponseData[index].expanded = !updatedResponseData[index].expanded;
    setResponseData(updatedResponseData);
  };
  return (
    <div className="text-left bg-secondary p-3 mx-3">
      {responseData !== undefined ? (
        <>
          {responseData.map((response, index) => {
            return (
              <>
                <h2
                  className="text-light option-click"
                  onClick={() => toggleContainer(index)}
                >
                  Subject: {response.name} {response.expanded ? "▼" : "►"}
                </h2>
                <div
                  className={`book-container ${
                    response.expanded ? "expanded" : ""
                  }`}
                >
                  {response.works?.map((work, key) => {
                    return <BookCard work={work} key={key} />;
                  })}
                </div>
              </>
            );
          })}
        </>
      ) : (
        <div>Data not found!</div>
      )}
    </div>
  );
};
export default SubjectBooks;
