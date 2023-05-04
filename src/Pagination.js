import React from "react";

export default function Pagination({ getNextPage, getPrevPage }) {
  return (
    <div>
      {getPrevPage && <button onClick={getPrevPage}>Prev</button>}
      {getNextPage && <button onClick={getNextPage}>Next</button>}
    </div>
  );
}
