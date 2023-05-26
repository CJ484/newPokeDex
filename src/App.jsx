import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './App.css';
import Spinner from 'react-bootstrap/Spinner';
import PokemonList from './PokemonList';
import PaginationFunction from './Pagination';
import Limit from './SelectLimit';
import Languagelist from './Components/Languagelist';
import pokeBall from './assets/Images/pokeBall.png';

function App() {
  const { t } = useTranslation();
  const [pageLimit, setPageLimit] = useState(20);
  const [currentPage, setcurrentPage] = useState(1);
  const offset = (currentPage - 1) * pageLimit;
  const url = `${process.env.REACT_APP_POKE}?offset=${offset}&limit=${pageLimit}`;
  const [totalPages, settotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [cache, setCache] = useState({});

  const fetchPokemonData = async (u) => {
    const promise = u.map(async (items) => {
      const response = await axios.get(items);
      const { name } = response.data;
      const formalName = name[0].toUpperCase() + name.substring(1);
      const height = response.data.height * 3.9;
      const heightConvert = Math.round(height * 10) / 10;
      const weight = response.data.weight / 4.5;
      const weightConvert = Math.round(weight * 10) / 10;

      return {
        name: formalName,
        id: response.data.id,
        weight: `${weightConvert} lbs`,
        height: `${heightConvert} Inches`,
        sprite: response.data.sprites.front_default,
        type: response.data.types.map((n) => {
          const hold = n.type.name;
          return hold[0].toUpperCase() + hold.substring(1);
        }),
      };
    });
    const results = await axios.all(promise);
    setCache({ ...cache, [`${offset}-${pageLimit}`]: results });
    setData(results);
  };

  const fetchPokemonList = async () => {
    const cancel = new AbortController();
    if (cache[`${offset}-${pageLimit}`]) {
      setData(cache[`${offset}-${pageLimit}`]);
      return;
    }
    await axios.get(url)
      .then((res) => {
        settotalPages(Math.ceil(res.data.count / pageLimit));
        const useData = res.data.results.map((u) => u.url);
        fetchPokemonData(useData);
      });
    cancel.abort();
  };
  useEffect(() => {
    setloading(true);
    fetchPokemonList();
    setloading(false);
  }, [currentPage, pageLimit]);
  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  return (
    <div className="body">
      <Languagelist />
      <div className="header">
        <img src={pokeBall} alt="poke ball" />
        <h1 className="display-1">POKEDEX</h1>
        <h3 className="h3">{t('main.header')}</h3>
      </div>
      <div className="search d-flex justify-content-center align-items-center">
        <h2>
          {t('main.search')}
          {' '}
        </h2>
        <Limit setPageLimit={setPageLimit} pageLimit={pageLimit} />
      </div>
      {loading ? (
        <Spinner className="loader" animation="border" role="status" variant="warning" />
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

export default function WrappedApp() {
  return (
    <Suspense fallback="...Loading">
      <App />
    </Suspense>
  );
}
