import SubjectBooks from "../global/SubjectBooks";

const Home = () => {
  // const [subjects, setSubjects] = useState([]);
  // setSubjects(["humor", "fantasy", "love", "magic", "romance"]);

  return (
    <div>
      <h1>Books by subjects</h1>
      <SubjectBooks subject={"humor"} />
      <SubjectBooks subject={"fantasy"} />
    </div>
  );
};
export default Home;
