import axios from 'axios';

/**
 * 
 * Fetches the pokemon data from the PokeAPI
 * the entire response returns an object with the following properties:
 * @returns {
 * - results: an array of pokemon objects
 *   count: the total number of pokemon
 *   next: the url of the next page
 *   previous: the url of the previous page
 * }
 */

type FetchPokemonDataProps = {
  offset?: number;
  pageLimit?: number;
}

type PokemonInput = {
  name: string;
  url: string;
}

export default async function fetchPokemonData({ offset = 1, pageLimit = 20 }: FetchPokemonDataProps) {
  const url = `${import.meta.env.VITE_POKE_API}?offset=${offset}&limit=${pageLimit}`;
  const listResponse = await axios.get(url);

  const fetchExtendedInformation = async (pokemon: PokemonInput) => {
    const extendedResponse = await axios.get(pokemon.url);
    return extendedResponse.data;
  }
  
  const extendedInformation = await Promise.all(listResponse.data.results.map(fetchExtendedInformation));
  return {
    results: extendedInformation,
    count: listResponse.data.count,
    next: listResponse.data.next,
    previous: listResponse.data.previous,
  };
}