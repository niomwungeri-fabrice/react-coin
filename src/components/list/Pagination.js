import React from "react";
import "./Pagination.css";
const Pagination = props => {
  const { page, totalPages, handlePaginationBtn, action, perPage } = props;

  return (
    <div>
      <select
        className="Pages"
        value={perPage}
        onChange={e => action(e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>

      <div className="Pagination">
        <button
          className="Pagination-button"
          onClick={() => handlePaginationBtn("prev")}
          disabled={page <= 1}
        >
          &larr;
        </button>
        <div className="Pagination-info">
          {page} of {totalPages}
        </div>
        <button
          className="Pagination-button"
          onClick={handlePaginationBtn.bind(this, "next")}
          disabled={page >= totalPages}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};
export default Pagination;
