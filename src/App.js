import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import Axios from "axios";
import "./App.css";
import PaginationFunction from "./Pagination";
import Spinner from 'react-bootstrap/Spinner'
import Limit from "./selectLimit";

function App() {
  const [pageLimit, setPageLimit] = useState(20);
  const [currentPage, setcurrentPage] = useState(1);
  const offset = (currentPage - 1) * pageLimit;
  const url = `${process.env.REACT_APP_POKE}?offset=${offset}&limit=${pageLimit}`;
  const [totalPages, settotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setloading(true);
    fetchPokemonList();
    setloading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchPokemonList = async () => {
    let cancel;
    await Axios
      .get(url, { cancelToken: new Axios.CancelToken((c) => (cancel = c)) })
      .then((res) => {
        settotalPages(Math.ceil(res.data.count / pageLimit));
        let useData = (res.data.results.map((u)=> u.url));
        fetchPokemonData(useData);
      });

    return () => cancel();
  };

  const fetchPokemonData = async (u) => {
    const promise = u.map(async (items) => {
      const response = await Axios.get(items);
      let name = response.data.name;
      let formalName = name[0].toUpperCase() + name.substring(1);

      return {
        name: formalName,
        id: response.data.id,
        weight: response.data.weight,
        height: response.data.height,
        sprite: response.data.sprites.front_default,
        type: response.data.types.map((n) => {
          let hold = n.type.name;
          return hold[0].toUpperCase() + hold.substring(1);
        }),
      };
    });
    const results = await Axios.all(promise);
    setData(results);
  };

  function handlePageChange(page) {
    setcurrentPage(page);
  }

  const LoadingIndicatior = () => {
    return(
      <Spinner class="loader" animation="border" role="status" variant="warning">
      </Spinner>
    )
  }

  return (
    <div className="body">
      <h1 className="display-1">Pokedex</h1>
      <h3 className="h3">Gotta Catch them all</h3>
      <div className="d-flex justify-content-center align-items-center">
        <h2 style={{ marginRight: "15px", color: "#D1DACC" }}>Search Limit</h2>
        <Limit setPageLimit={setPageLimit} pageLimit={pageLimit} />
      </div>
      {loading ? (
        LoadingIndicatior()
      ) : (
        <div>
          <PokemonList data={data} />
          <PaginationFunction
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default App;
