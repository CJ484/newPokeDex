import Pagination from "react-bootstrap/Pagination";

export default function PaginationFunction({currentPage, setcurrentPage, totalPages }) {
  function handlePageChange(page) {
    setcurrentPage(page);
  }

  function PaginationFunction ({currentPage, totalPages, handlePageChange}) { //this function returns back the render elements for both buttons and page numbers
    const handlePreviousClick = () => {                           //It also holds the functions to change the state variables of the
      handlePageChange(currentPage-1);
    }
    function handleNextClick() {
      handlePageChange(currentPage + 1);
    }

    function handlePageClick(page) {
      handlePageChange(page);
    }
    
    function handleFirstPage() {
      handlePageChange(1)
    }

    function handleLastPage() {
      handlePageChange(totalPages)
    }

    function PageRanges() {
      const items = [];
      let leftSide = currentPage - 3;
      let rightSide = currentPage + 3;

      if(leftSide <= 0) {
        leftSide =1 
      }
      if (rightSide > totalPages) {
        rightSide = totalPages
      }



      for (let number = leftSide; number <= rightSide; number++) {
        items.push(
          <Pagination.Item key={number} active={currentPage === number} onClick={() => {handlePageClick(number)}}>
            {number}
          </Pagination.Item>
        );
      }
      return items
      
    }

    return(
      <Pagination>
        <Pagination.First onClick={handleFirstPage}/>
        <Pagination.Prev onClick={handlePreviousClick}/>
        <PageRanges />
        <Pagination.Next onClick={handleNextClick}/>
        <Pagination.Last onClick={handleLastPage}/>
      </Pagination>
    )
  }

  return (
    <div className="pageNation">
      <PaginationFunction currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}/>
    </div>
  );
}
