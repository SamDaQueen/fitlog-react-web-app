import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ count, page, handlePageChange }) => {
  console.log("page and count", page, count);

  const itemsPerPage = 20;
  const startPage = Math.floor((page - 1) / itemsPerPage) * itemsPerPage + 1;

  const totalPages = Math.ceil(count / itemsPerPage);

  const pageNumbers = Array.from(
    { length: Math.min(itemsPerPage, totalPages) },
    (_, i) => startPage + i
  );

  console.log("pageNumbers", pageNumbers);

  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => {
          handlePageChange(page - 1);
        }}
      />
      <Pagination.Item active>{page}</Pagination.Item>

      {pageNumbers.map((pageNumber) => (
        <Pagination.Item
          key={pageNumber}
          active={page === pageNumber}
          onClick={() => {
            handlePageChange(pageNumber);
          }}
        >
          {pageNumber}
        </Pagination.Item>
      ))}

      <Pagination.Next
        disabled={count === 0 || page === totalPages}
        onClick={() => {
          handlePageChange(page + 1);
        }}
      />
    </Pagination>
  );
};
export default PaginationComponent;
