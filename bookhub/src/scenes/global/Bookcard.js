import React, { useState } from "react";
import BookDetailsModal from "./BookDetails";

const BookCard = (props) => {
  const { title, authors, first_publish_year, cover_id, key } = props.work;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="book-card">
        <img
          class="book-card-img"
          src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`}
          alt={`Cover of ${title} by ${authors[0].name} in ${first_publish_year}`}
        />
        <div class="book-card-info">
          <h3 class="book-card-info-title">{title}</h3>
          <p>
            <b>Author:</b>
            <i> {authors[0].name}</i>
          </p>
          {key !== undefined &&
            cover_id !== undefined &&
            isModalOpen !== undefined && (
              <BookDetailsModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                bookKey={key}
                coverId={cover_id}
              />
            )}
          <button onClick={openModal} class="btn btn-block btn-primary">
            More info
          </button>
        </div>
      </div>
    </>
  );
};

export default BookCard;
