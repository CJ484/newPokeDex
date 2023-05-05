import React, { useEffect, useState } from "react";
import REACT_POKE from "./systemReact";
import axios from "axios";

const ITEMS_PER_PAGE = 20;

export default function PaginationFuntion({ getNextPage, getPrevPage }) {
    // const [totalPages, settotalPages] = useState(1);
    // const [currentPage, setcurrentPage] = useState(1);


    // useEffect(() => {

    //   async function fetchData() {
    //     const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    //     const url = `${REACT_POKE}?offset=${offset}&limit=${ITEMS_PER_PAGE}`
    //     await axios.get(url).then((res) => {
    //       settotalPages(Math.ceil(res.data.count / ITEMS_PER_PAGE));
    //     })
    //   }
    //   fetchData();
    // }, [currentPage]);

    // function handlePageChange(page) {
    //   setcurrentPage(page);
    // }

    // function Pagination ({currentPage, totalPages, onPageChange}) {
    //   const handlePreviousClick = () => {
    //     onPageChange(currentPage-1);
    //   }
    //   function handleNextClick() {
    //     onPageChange(currentPage + 1);
    //   }

    //   function handlePageClick(page) {
    //     onPageChange(page);
    //   }

    //   const pageButtons =[];

    //   for (let i =1; i <= totalPages; i++) {
    //     pageButtons.push(
    //       <button className="page-link" key={i} onClick={()=> handlePageClick(i)} disabled={i === currentPage}>{i}</button>
    //     );
    //   }

    //   return (
    //     <div className="d-flex">
    //       <button className="btn" onClick={handlePreviousClick} disabled={currentPage === 1}>
    //         <i className="fa-solid fa-circle-chevron-left fa-large"></i>
    //       </button>
    //       <div className="d-flex flex-wrap">{pageButtons}</div>
    //       <button
    //         className="btn"
    //         onClick={handleNextClick}
    //         disabled={currentPage === totalPages}
    //       >
    //         <i className="fa-solid fa-circle-chevron-right fa-large"></i>
    //       </button>
    //     </div>
    //   );

    // }

  return (
    <div className="pageNation">
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/> */}
      {getPrevPage && (<button className="btn fa-solid fa-circle-chevron-left fa-2xl" onClick={getPrevPage}></button>)}

      {getNextPage && (<button className="btn fa-solid fa-circle-chevron-right fa-2xl" onClick={getNextPage}></button>)}
    </div>
  );
}
