import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import "./App.css";
import REACT_POKE from "./systemReact";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setloading] = useState(true);
  const [pageCurrent, setpageCurrent] = useState(REACT_POKE);
  const [nextpageCurrent, setnextpageCurrent] = useState();
  const [prevpageCurrent, setprevpageCurrent] = useState();

  useEffect(() => {
    setloading(true);
    let cancel;
     axios
      .get(pageCurrent, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setnextpageCurrent(res.data.next);
        setprevpageCurrent(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
        setloading(false);
      });
    return () => cancel();
  }, [pageCurrent]);

  function getNextPage() {
    setpageCurrent(nextpageCurrent);
  }

  function getPrevPage() {
    setpageCurrent(prevpageCurrent);
  }

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <PokemonList pokemon={pokemon} />
        </div>
      )}
      <Pagination
        getNextPage={nextpageCurrent ? getNextPage : null}
        getPrevPage={prevpageCurrent ? getPrevPage : null}
      />
    </div>
  );
}

export default App;
