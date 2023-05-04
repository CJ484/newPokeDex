import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import "./App.css";
import REACT_POKE from "./systemReact";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonURL, setpokemonURL] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [pageCurrent, setpageCurrent] = useState(REACT_POKE);
  const [nextpageCurrent, setnextpageCurrent] = useState();
  const [prevpageCurrent, setprevpageCurrent] = useState();

  useEffect(() => {
    fetchPokemonList();
  }, [pageCurrent]);

  const fetchPokemonList = async () => {
    setloading(true);
    let cancel;
    await axios
      .get(pageCurrent, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setnextpageCurrent(res.data.next);
        setprevpageCurrent(res.data.previous);

        setpokemonURL(res.data.results.map((u) => u.url));

        fetchPokemonData(pokemonURL);

        setloading(false);
      });

    return () => cancel();
  };

  const fetchPokemonData = async (u) => {
    const promise = u.map(async (items) => {
      const response = await axios.get(items);
      return {
        name: response.data.name,
        id: response.data.id,
        weight: response.data.weight,
        height: response.data.height,
        sprite: response.data.sprites.front_default,
      };
    });
    const results = await axios.all(promise);
    setData(results);
  };

  function getNextPage() {
    setpageCurrent(nextpageCurrent);
  }

  function getPrevPage() {
    setpageCurrent(prevpageCurrent);
  }

  return (
    <div>
      <h1>Pokedex</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <PokemonList data={data} />
          <Pagination
            getNextPage={nextpageCurrent ? getNextPage : null}
            getPrevPage={prevpageCurrent ? getPrevPage : null}
          />
        </div>
      )}
    </div>
  );
}

export default App;
