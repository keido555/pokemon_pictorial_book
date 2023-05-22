"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import axios from "axios";

import { Header } from "@/app/components/layout/header";

type Pokemon = {
  name: string;
  url: string;
  image: string;
  japaneseName: string;
  stats: any[];
};

const PokemonPage = () => {
  const pathname = usePathname();

  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

  // ポケモンの詳細データを取得する関数
  const getPokemonData = useCallback(async (pathname: string) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2${pathname}`);
      const { name, sprites, species, stats } = response.data;
      console.log(response.data);
      const image = sprites.front_default;
      const japaneseName = await getJapaneseName(species.url);
      const ability = stats;
      const pokemon: Pokemon = {
        name: name,
        url: `https://pokeapi.co/api/v2${pathname}`,
        image: image,
        japaneseName: japaneseName,
        stats: ability,
      };
      setPokemonData(pokemon);
    } catch (error) {
      console.log(error);
      setPokemonData(null);
    }
  }, []);

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
    const fetchData = async () => {
      if (typeof pathname === "string") {
        await getPokemonData(pathname);
      }
    };
    fetchData();
  }, [pathname, getPokemonData]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const HPStyle: React.CSSProperties = {
    width: `${pokemonData.stats[0].base_stat}px`,
    height: "8px",
    margin: "auto 0",
    background: "pink",
  };
  const ATStyle: React.CSSProperties = {
    width: `${pokemonData.stats[1].base_stat}px`,
    height: "8px",
    margin: "auto 0",
    background: "red",
  };
  const DFStyle: React.CSSProperties = {
    width: `${pokemonData.stats[2].base_stat}px`,
    height: "8px",
    margin: "auto 0",
    background: "blue",
  };
  const SAStyle: React.CSSProperties = {
    width: `${pokemonData.stats[3].base_stat}px`,
    height: "8px",
    margin: "auto 0",
    background: "yellow",
  };
  const SDStyle: React.CSSProperties = {
    width: `${pokemonData.stats[4].base_stat}px`,
    height: "8px",
    margin: "auto 0",
    background: "green",
  };
  const SPStyle: React.CSSProperties = {
    width: `${pokemonData.stats[5].base_stat}px`,
    height: "8px",
    margin: "auto 0",
    background: "purple",
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />

      <div className="text-center justify-between">
        <h1>{pokemonData.japaneseName}</h1>
        <Image
          src={pokemonData.image}
          alt={pokemonData.name}
          style={{ margin: "auto" }}
          width={108}
          height={108}
        />
        <p>英語名：{pokemonData.name}</p>
        <p>{pokemonData.url}</p>
        <ul className="text-left">
          <li className="flex">
            <p className="w-20">HP:{pokemonData.stats[0].base_stat}</p>
            <div style={HPStyle}></div>
          </li>
          <li className="flex">
            <p className="w-20">AT:{pokemonData.stats[1].base_stat}</p>
            <div style={ATStyle}></div>
          </li>
          <li className="flex">
            <p className="w-20">DF:{pokemonData.stats[2].base_stat}</p>
            <div style={DFStyle}></div>
          </li>
          <li className="flex">
            <p className="w-20">SA:{pokemonData.stats[3].base_stat}</p>
            <div style={SAStyle}></div>
          </li>
          <li className="flex">
            <p className="w-20">SD:{pokemonData.stats[4].base_stat}</p>
            <div style={SDStyle}></div>
          </li>
          <li className="flex">
            <p className="w-20">SP:{pokemonData.stats[5].base_stat}</p>
            <div style={SPStyle}></div>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default PokemonPage;
