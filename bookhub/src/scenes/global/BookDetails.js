import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
const BookDetailsModal = (props) => {
  const [bookDetails, setBookDetails] = useState({});
  const { bookKey, closeModal, isModalOpen, coverId } = props;
  const modalClasses = isModalOpen
    ? "modal display-block"
    : " modal display-none";
  useEffect(() => {
    axios.get(`https://openlibrary.org${bookKey}.json`).then((res) => {
      setBookDetails(res.data);
    });
  }, [bookKey]);
  const { title, description, first_publish_date } = bookDetails;
  return (
    <>
      {title !== undefined &&
        description !== undefined &&
        first_publish_date !== undefined &&
        isModalOpen !== undefined &&
        first_publish_date !== undefined && (
          <div className={modalClasses}>
            <div className="modal-main ">
              <button
                type="button"
                className="btn btn-block btn-danger position-absolute top-0 end-0"
                onClick={closeModal}
              >
                X
              </button>
              <div class="row">
                <img
                  className="col-sm-12 col-md-4 "
                  src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
                  alt={`${title}`}
                />
                <div className="col-sm-12 col-md-8 modal-details">
                  {title !== undefined && <h2>{title}</h2>}
                  {description !== "" ? (
                    <p>
                      <b> Description:</b> {description}
                    </p>
                  ) : null}
                  <p>
                    <b>First Publish Year:</b> {first_publish_date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default BookDetailsModal;
