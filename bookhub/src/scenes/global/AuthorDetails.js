import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthorDetails = (props) => {
  const [authorDetails, setAuthorDetails] = useState();

  useEffect(() => {
    axios
      .get(`https://openlibrary.org/authors/${props.authorKey}.json`)
      .then((res) => {
        setAuthorDetails(res.data);
      });
  }, [props]);

  return (
    <>
      {authorDetails !== undefined ? (
        <div className="card card-author w-25 d-inline-flex p-2 bg-secondary p-2 m-1 text-light">
          <img
            src={`https://covers.openlibrary.org/a/olid/${props.authorKey}-M.jpg`}
            alt={`${authorDetails.name} (${authorDetails.birth_date})`}
            className="card-container-img"
          />
          <h4 className="text-center p-2">
            <b>
              <i>{authorDetails.name}</i>
            </b>
          </h4>
        </div>
      ) : null}
    </>
  );
};

export default AuthorDetails;
