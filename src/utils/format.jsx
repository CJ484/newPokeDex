import axios from 'axios';

export default function dataFormatter(input) {
  const finalOutput = input.map(async (items) => {
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
  return finalOutput;
}
