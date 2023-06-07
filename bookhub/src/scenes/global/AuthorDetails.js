import React, { useEffect, useState } from "react";
import axios from "axios";


const AuthorDetails = (props) => {
  const [authorDetails, setAuthorDetails] = useState(null);
  const {authorKey} = props;
  useEffect(() => {
      axios.get(`https://openlibrary.org/authors/OL23919A.json`).then((res)=> {
        setAuthorDetails(res.data);
        console.log(res.data);
      });
    },[authorKey]);
    const { name, birth_date, top_work, work_count } = authorDetails;

    return(
      <>{(authorDetails !== undefined) ?
      <div>
        {/* <img src={`https://ia800603.us.archive.org/view_archive.php?archive=/15/items/olcovers554/olcovers554-L.zip&file=${authorKey}-L.jpg`} */}
        <h2>{name}</h2>
        <h2>{birth_date}</h2>
        <h2>{top_work}</h2>
        <h2>{work_count}</h2>
        </div>
        :null}
        </>
    );
};

export default AuthorDetails;
        //check .then()
        //if you see data then do setAuthorDetails
        //check if it is undefined if not show html divs
//         setAuthorDetails(response.data);
//       } catch (error) {
//         console.log("Error occurred while fetching author details:", error);
//       }
//     };

//     fetchAuthorDetails();
//   }, [props]);

//   if (!authorDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{authorDetails.name}</h2>
//     </div>
//   );
// };

// export default AuthorDetails;

