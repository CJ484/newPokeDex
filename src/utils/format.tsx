import axios from 'axios';
import { PokemonData, PokemonExtendedData } from '@/types/pokemonTypes';

export default function dataFormatter(input: PokemonData[]) {
  const finalOutput = input.map(async (items) => {
    const response = await axios.get(items.url);
    const { name } = response.data;
    const formalName = name[0].toUpperCase() + name.substring(1);
    const height = response.data.height / 10; // Convert height to meters
    const weight = response.data.weight / 10; // Convert weight to kilograms

    return {
      name: formalName,
      id: response.data.id,
      weight: `${weight}`,
      height: `${height}`,
      sprite: response.data.sprites.front_default,
      types: response.data.types.map((type: PokemonExtendedData['types'][number]) => {
        const hold = type.type.name;
        return hold[0].toUpperCase() + hold.substring(1);
      }),
    };
  });
  return finalOutput;
}
