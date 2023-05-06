export default function PaginationFuntion({ currentPage, setcurrentPage, totalPages }) {

    function handlePageChange(page) {
      setcurrentPage(page);
    }

    function Pagination ({currentPage, totalPages, onPageChange}) { //this function returns back the render elements for both buttons and page numbers
      const handlePreviousClick = () => {                           //It also holds the functions to change the state variables of the
        onPageChange(currentPage-1);
      }
      function handleNextClick() {
        onPageChange(currentPage + 1);
      }

      function handlePageClick(page) {
        onPageChange(page);
      }

      const pageButtons =[];

      for (let i =1; i <= totalPages; i++) {
        pageButtons.push(
          <button className="page-link" style={currentPage === i ? {fontWeight: 'bold', background: 'lightblue'} : {}} key={i} onClick={()=> handlePageClick(i)} disabled={i === currentPage}>{i}</button>
        );
      }

      return (
        <div className="d-flex">
          <button className="btn" onClick={handlePreviousClick} disabled={currentPage === 1}>
            <i className="fa-solid fa-circle-chevron-left fa-large"></i>
          </button>

          <div className="d-flex flex-wrap">{pageButtons}</div>

          <button className="btn" onClick={handleNextClick} disabled={currentPage === totalPages}>
            <i className="fa-solid fa-circle-chevron-right fa-large"></i>
          </button>
        </div>
      );

    }

  return (
    <div className="pageNation">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
    </div>
  );
}
