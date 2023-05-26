import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

export default function PaginationFunction({ currentPage, setcurrentPage, totalPages }) {
  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  // This function returns back the render elements for both buttons and page numbers
  // It also holds the functions to change the state variables of the

  const handlePreviousClick = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    handlePageChange(currentPage + 1);
  };

  const handlePaClick = (page) => {
    handlePageChange(page);
  };

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handleLastPage = () => {
    handlePageChange(totalPages);
  };

  const PageRanges = () => {
    const items = [];
    let leftSide = currentPage - 3;
    let rightSide = currentPage + 3;

    if (leftSide <= 0) {
      leftSide = 1;
    }
    if (rightSide > totalPages) {
      rightSide = totalPages;
    }

    for (let n = leftSide; n <= rightSide; n += 1) {
      items.push(
        <Pagination.Item key={n} active={currentPage === n} onClick={() => { handlePaClick(n); }}>
          {n}
        </Pagination.Item>,
      );
    }
    return items;
  };

  return (
    <Pagination>
      <Pagination.First onClick={handleFirstPage} />
      <Pagination.Prev onClick={handlePreviousClick} />
      <PageRanges />
      <Pagination.Next onClick={handleNextClick} />
      <Pagination.Last onClick={handleLastPage} />
    </Pagination>
  );
}

PaginationFunction.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setcurrentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};
