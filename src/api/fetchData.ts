import axios from 'axios';
import { PokemonData } from '@/types/pokemonTypes';
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

export default async function fetchPokemonData(url?: string) {
  const defaultUrl = `${import.meta.env.VITE_POKE_API}?offset=0&limit=20`;
  const listResponse = await axios.get(url || defaultUrl);

  const fetchExtendedInformation = async (pokemon: PokemonData) => {
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