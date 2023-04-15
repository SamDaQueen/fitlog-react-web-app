import { Pagination } from "react-bootstrap";

const PaginationComponent = ({ workouts, page, handlePageChange }) => {
  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => {
          handlePageChange(page - 1);
        }}
      />
      <Pagination.Item active>{page}</Pagination.Item>
      {workouts.length > 0 &&
        Array.from(
          { length: Math.ceil(workouts[0].count / 10) - 1 },
          (_, i) => (
            <Pagination.Item
              key={i + 2}
              active={page === i + 2}
              onClick={() => {
                handlePageChange(i + 2);
              }}
            >
              {i + 2}
            </Pagination.Item>
          )
        )}
      <Pagination.Next
        disabled={
          workouts.length === 0 || page === Math.ceil(workouts[0].count / 10)
        }
        onClick={() => {
          handlePageChange(page + 1);
        }}
      />
    </Pagination>
  );
};
export default PaginationComponent;
