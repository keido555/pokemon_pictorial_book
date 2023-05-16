import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

type Pokemon = {
  name: string;
  url: string;
  image: string;
  japaneseName: string;
};

export const PokeData = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  /**
   * #### ポケモン図鑑の日本語化
   * @param url
   * @returns
   */
  const getJapaneseName = async (url: string) => {
    try {
      const res = await axios.get(url);
      const japaneseName = res.data.names.find(
        (name: any) => name.language.name === "ja"
      ).name;
      return japaneseName;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  useEffect(() => {
    /**
     * #### 初期検索
     */
    const getPokemonData = async () => {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const pokemonList = res.data.results;

        const pokemonDataList: Pokemon[] = await Promise.all(
          pokemonList.map(async (poke: any) => {
            const response = await axios.get(poke.url);
            const { sprites, species } = response.data;
            const image = sprites.front_default;
            const japaneseName = await getJapaneseName(species.url);
            return {
              name: poke.name,
              url: poke.url,
              image: image,
              japaneseName: japaneseName,
            };
          })
        );
        console.log(pokemonDataList);

        setPokemonData(pokemonDataList);
      } catch (error) {
        console.log(error);
      }
    };

    getPokemonData();
  }, []);

  return pokemonData === [] ? (
    <></>
  ) : (
    <div>
      <h1>カントー図鑑</h1>
      <ul
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {pokemonData.map((poke, index) => {
          return (
            <li key={poke.name} style={{ textAlign: "center", width: "108px" }}>
              <Link href={`/pokemon/${poke.name}`}>
                <img
                  src={poke.image}
                  alt={poke.name}
                  style={{ margin: "auto" }}
                />
                No.{index + 1}
                <br />
                {poke.japaneseName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// curl https://pokeapi.co/api/v2/pokemon

// {"count":1118,"next":"https://pokeapi.co/api/v2/pokemon?offset=20&limit=20","previous":null,"results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},{"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},{"name":"charmander","url":"https://pokeapi.co/api/v2/pokemon/4/"},{"name":"charmeleon","url":"https://pokeapi.co/api/v2/pokemon/5/"},{"name":"charizard","url":"https://pokeapi.co/api/v2/pokemon/6/"},{"name":"squirtle","url":"https://pokeapi.co/api/v2/pokemon/7/"},{"name":"wartortle","url":"https://pokeapi.co/api/v2/pokemon/8/"},{"name":"blastoise","url":"https://pokeapi.co/api/v2/pokemon/9/"},{"name":"caterpie","url":"https://pokeapi.co/api/v2/pokemon/10/"},{"name":"metapod","url":"https://pokeapi.co/api/v2/pokemon/11/"},{"name":"butterfree","url":"https://pokeapi.co/api/v2/pokemon/12/"},{"name":"weedle","url":"https://pokeapi.co/api/v2/pokemon/13/"},{"name":"kakuna","url":"https://pokeapi.co/api/v2/pokemon/14/"},{"name":"beedrill","url":"https://pokeapi.co/api/v2/pokemon/15/"},{"name":"pidgey","url":"https://pokeapi.co/api/v2/pokemon/16/"},{"name":"pidgeotto","url":"https://pokeapi.co/api/v2/pokemon/17/"},{"name":"pidgeot","url":"https://pokeapi.co/api/v2/pokemon/18/"},{"name":"rattata","url":"https://pokeapi.co/api/v2/pokemon/19/"},{"name":"raticate","url":"https://pokeapi.co/api/v2/pokemon/20/"}]}