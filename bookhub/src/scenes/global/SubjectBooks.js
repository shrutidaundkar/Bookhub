import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../global/Bookcard";

const SubjectBooks = () => {
  const [subjectSelected, setSubjectSelected] = useState("humor");
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const keys = [
      "humor",
      "fantasy",
      "love",
      "magic",
      "romance",
      "horror",
      "cooking",
    ];
    const fetchData = async () => {
      try {
        const promises = keys.map((key) =>
          axios.get(`http://openlibrary.org/subjects/${key}.json?limit=5`)
        );

        const allResponses = await axios.all(promises);
        const responseData = allResponses.map((response) => response.data);
        setResponseData(responseData);
        console.log(responseData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="text-left bg-secondary p-3 mx-3">
      <h2 className="text-left text-light">
        <label for="options">Select a subject: </label>
        <select
          id="options"
          name="options"
          value={subjectSelected}
          className="p-2 mx-2 selectpicker form-control"
          onInput={(ev) => setSubjectSelected(ev.target.value)}
        >
          <option value="humor">humor</option>
          <option value="fantasy">fantasy</option>
          <option value="love">love</option>
          <option value="magic">magic</option>
          <option value="romance">romance</option>
          <option value="horror">horror</option>
          <option value="cooking">cooking</option>
        </select>
      </h2>

      {responseData !== undefined ? (
        <div class="book-container">
          {responseData
            .find((res) => res.key === `/subjects/${subjectSelected}`)
            ?.works?.map((work) => (
              <BookCard work={work} />
            ))}
        </div>
      ) : (
        <div>Data not found!</div>
      )}
    </div>
  );
};
export default SubjectBooks;
