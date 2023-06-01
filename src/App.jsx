import React, { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './globalStyles.scss';
import Spinner from 'react-bootstrap/Spinner';
import PokemonList from './Components/PokemonList/PokemonList';
import PaginationFunction from './Components/Pagination/Pagination';
import Limit from './Components/SearchLimit/SelectLimit';
import Languagelist from './Components/Laguagelist/Languagelist';
import pokeBall from './assets/Images/pokeBall.png';
import dataFormatter from './utils/format';
import imageGallery from './assets/Images/imageLinks';

function App() {
  const { t } = useTranslation();
  const [pageLimit, setPageLimit] = useState(20);
  const [currentPage, setcurrentPage] = useState(1);
  const offset = (currentPage - 1) * pageLimit;
  const [totalPages, settotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const [cache, setCache] = useState({});

  const fetchPokemonData = async (u) => {
    const promise = await axios.all(dataFormatter(u));
    setCache({ ...cache, [`${offset}-${pageLimit}`]: promise });
    setData(promise);
  };

  const fetchPokemonList = async () => {
    const cancel = new AbortController();
    if (cache[`${offset}-${pageLimit}`]) {
      setData(cache[`${offset}-${pageLimit}`]);
      return;
    }
    await axios
      .get(`${process.env.REACT_APP_POKE}?offset=${offset}&limit=${pageLimit}`)
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
        <img className="accent" src={pokeBall} alt="poke ball" />
        <img className="title" src={imageGallery.pokeTitle} alt="pokedex-font" />
        <img className="accent" src={pokeBall} alt="poke ball" />
        <h3 className="h3">{t('main.header')}</h3>
      </div>
      <div className="search d-flex justify-content-center align-items-center">
        <h2>
          {t('main.search')}
          {': '}
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
