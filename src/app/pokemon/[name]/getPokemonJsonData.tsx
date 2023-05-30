import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Pokemon } from "./page";

export const getPokemonJsonData = async (
  pathname: string,
  setPokemonData: Dispatch<SetStateAction<Pokemon | null>>,
  getJapaneseName: (url: string) => Promise<any>
) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2${pathname}`);
    const { name, sprites, species, stats, types } = response.data;
    console.log(response.data);
    const image = sprites.front_default;
    const japaneseName = await getJapaneseName(species.url);
    const ability = stats;
    const pokemonTypes = types;
    const pokemon: Pokemon = {
      name: name,
      url: `https://pokeapi.co/api/v2${pathname}`,
      image: image,
      japaneseName: japaneseName,
      stats: ability,
      types: pokemonTypes,
    };
    setPokemonData(pokemon);
  } catch (error) {
    console.log(error);
    setPokemonData(null);
  }
};
