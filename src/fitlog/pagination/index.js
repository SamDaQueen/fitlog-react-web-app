import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";

const PaginationComponent = ({
  count,
  page,
  itemsPerPage,
  handlePageChange,
}) => {
  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    handlePageChange(selectedPage);
  };

  const totalPages = Math.ceil(count / itemsPerPage);

  return (
    <div className="pagination-container">
      <ReactPaginate
        forcePage={page - 1}
        previousLabel={
          <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: 18 }} />
        }
        nextLabel={
          <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: 18 }} />
        }
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
      />
    </div>
  );
};

export default PaginationComponent;
