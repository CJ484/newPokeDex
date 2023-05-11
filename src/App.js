import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import "./App.css";
import PaginationFunction from "./Pagination";

function App() {
  const ITEMS_PER_PAGE = 20;
  const [currentPage, setcurrentPage] = useState(1);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const url = `${process.env.REACT_APP_POKE}?offset=${offset}&limit=${ITEMS_PER_PAGE}`;
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
    await axios
      .get(url, { cancelToken: new axios.CancelToken((c) => (cancel = c)) })
      .then((res) => {
        settotalPages(Math.ceil(res.data.count / ITEMS_PER_PAGE));
        let useData = (res.data.results.map((u)=> u.url));
        fetchPokemonData(useData);
      });

    return () => cancel();
  };

  const fetchPokemonData = async (u) => {
    const promise = u.map(async (items) => {
      const response = await axios.get(items);
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
    const results = await axios.all(promise);
    setData(results);
  };

  function handlePageChange(page) {
    setcurrentPage(page);
  }

  return (
    <div className="body">
      <h1 className="display-1">Pokedex</h1>
      <h3 className="h3">Gotta Catch them all</h3>
      {loading ? (
        <div>Loading...</div>
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
