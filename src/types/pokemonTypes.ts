export type PokemonData = {
  name: string;
  url: string;
}

export type PokemonExtendedData = {
    name: string;
    id: number;
    weight: number;
    height: number;
    sprites: {
        front_default: string;
        back_default: string;
        front_shiny: string;
        back_shiny: string;
    };
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        }
    }[];
}
