"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Random = () => {
  const [randomPokemonList, setRandomPokemonList] = useState([]);

  useEffect(() => {
    const fetchRandomPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        const pokemonList = response.data.results;

        const randomPokemonList = await getRandomPokemonList(pokemonList, 6);
        setRandomPokemonList(randomPokemonList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRandomPokemonList();
  }, []);

  if (randomPokemonList.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-full">
      <h1 className="text-center">Random Pokemon List</h1>
      <div className="flex flex-wrap justify-center">
        {randomPokemonList.map((pokemon) => (
          <div key={pokemon.id} className="w-60">
            <p>Name: {pokemon.name}</p>
            <p>Japanese Name: {pokemon.japaneseName}</p>
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

const getRandomPokemonList = async (pokemonList, count) => {
  const randomIndexes = getRandomIndexes(pokemonList.length, count);
  const randomPokemonUrls = randomIndexes.map(
    (index) => pokemonList[index].url
  );

  const pokemonResponses = await Promise.all(
    randomPokemonUrls.map((url) => axios.get(url))
  );
  const randomPokemonList = pokemonResponses.map((pokemonResponse) => {
    const { name, sprites, species } = pokemonResponse.data;
    const image = sprites.front_default;
    const japaneseName = species.name; // ここは実際に日本語名を取得する処理に置き換える必要があります

    return {
      id: pokemonResponse.data.id,
      name: name,
      japaneseName: japaneseName,
      image: image,
    };
  });

  return randomPokemonList;
};

const getRandomIndexes = (range, count) => {
  const indexes = [];
  while (indexes.length < count) {
    const randomIndex = Math.floor(Math.random() * range);
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }
  return indexes;
};

export default Random;
