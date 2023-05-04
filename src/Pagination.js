import React from "react";

export default function Pagination({ getNextPage, getPrevPage }) {
  return (
    <div className="pageNation">
      {getPrevPage && <button className="btn fa-solid fa-circle-chevron-left fa-2xl" onClick={getPrevPage}></button>}
      {getNextPage && <button className="btn fa-solid fa-circle-chevron-right fa-2xl" onClick={getNextPage}></button>}
    </div>
  );
}
