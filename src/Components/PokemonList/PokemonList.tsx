import { useState, useEffect } from 'react';
import { Spinner } from '../index';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import PokemonCardLayout from '../PokemonCardLayout/PokemonCardLayout';
import './PokemonList.scss';
import fetchPokemonData from '@/api/fetchData';
import { PokemonExtendedData } from '@/types/pokemonTypes';

export default function PokemonList() {
  const [data, setData] = useState<PokemonExtendedData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const fetchedData = await fetchPokemonData()
    .catch((error) => console.error(error));
    setData(fetchedData?.results || []);
    setTotalCount(fetchedData?.count || 0);
    setNextPage(fetchedData?.next || '');
    setPreviousPage(fetchedData?.previous || '');
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PaginationComponent totalCount={totalCount} setData={setData} setTotalCount={setTotalCount} setNextPage={setNextPage} setPreviousPage={setPreviousPage} nextPage={nextPage} previousPage={previousPage} />
      <div className="cardGrid">
        {loading ? <Spinner /> : data.map((data: PokemonExtendedData) => (
            <PokemonCardLayout key={data.id} data={data} />
        ))}
      </div>
      <PaginationComponent totalCount={totalCount} setData={setData} setTotalCount={setTotalCount} setNextPage={setNextPage} setPreviousPage={setPreviousPage} nextPage={nextPage} previousPage={previousPage} />
    </>
  );
}
