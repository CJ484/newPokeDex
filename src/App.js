import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import "./App.css";
import REACT_POKE from "./systemReact";
import PaginationFunction from "./Pagination";

function App() {
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
      console.log(response);
      let name = response.data.name;
      let formalName = name[0].toUpperCase()+name.substring(1)

      return {
        name: formalName,
        id: response.data.id,
        weight: response.data.weight,
        height: response.data.height,
        sprite: response.data.sprites.front_default,
        type: response.data.types.map((n) => {
          let hold = n.type.name
          return hold[0].toUpperCase()+hold.substring(1);
          
        }
        )
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
    <div className="body">
      <h1 className="display-1">Pokedex</h1>
      <h3 className="h3">Gotta Catch them all</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <PokemonList data={data} />
          <PaginationFunction
            getNextPage={nextpageCurrent ? getNextPage : null}
            getPrevPage={prevpageCurrent ? getPrevPage : null}
          />
        </div>
      )}
    </div>
  );
}

export default App;
