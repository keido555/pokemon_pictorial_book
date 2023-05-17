import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

type Pokemon = {
  name: string;
  url: string;
  image: string;
  japaneseName: string;
};

const PokemonPage = () => {
  const router = useRouter();
  const { name } = router.query;
  const pokemonName = typeof name === "string" ? name : "";
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

  useEffect(() => {
    const getPokemonData = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        const { sprites, species } = res.data;
        const image = sprites.front_default;
        const japaneseName = await getJapaneseName(species.url);
        setPokemonData({
          name: pokemonName,
          url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
          image,
          japaneseName,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (pokemonName) {
      getPokemonData();
    }
  }, [pokemonName]);

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

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{pokemonData.japaneseName}</h1>
      <Image
        src={pokemonData.image}
        alt={pokemonData.name}
        style={{ margin: "auto" }}
        width={108}
        height={108}
      />
      <p>{pokemonData.name}</p>
      <p>{pokemonData.url}</p>
    </div>
  );
};

export default PokemonPage;
