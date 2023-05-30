"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import _ from "lodash";

import { Header } from "@/app/components/layout/header";

import { getStatStyle } from "./getStatStyle";
import { getTypeData } from "./getTypeData";
import { getPokemonJsonData } from "./getPokemonJsonData";

export type Pokemon = {
  name: string;
  url: string;
  image: string;
  japaneseName: string;
  stats: any[];
  types: any[];
};

/**
 * #### ポケモンの詳細
 * @returns
 */
const PokemonPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);

  // ポケモンの詳細データを取得する関数
  const getPokemonData = useCallback(async (pathname: string) => {
    getPokemonJsonData(pathname, setPokemonData, getJapaneseName);
  }, []);

  /**
   * 日本語化
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
    const fetchData = async () => {
      if (typeof pathname === "string") {
        await getPokemonData(pathname);
      }
    };
    fetchData();
  }, [pathname, getPokemonData]);

  if (!pokemonData) return <div>Loading...</div>;

  const HPStyle: React.CSSProperties = getStatStyle(0, pokemonData);
  const ATStyle: React.CSSProperties = getStatStyle(1, pokemonData);
  const DFStyle: React.CSSProperties = getStatStyle(2, pokemonData);
  const SAStyle: React.CSSProperties = getStatStyle(3, pokemonData);
  const SDStyle: React.CSSProperties = getStatStyle(4, pokemonData);
  const SPStyle: React.CSSProperties = getStatStyle(5, pokemonData);

  /** HOME画面へと戻る */
  const handleClickBack = () => router.push("/");

  const handleClickNumber = async (num: "back" | "next") => {
    console.log(pathname);

    const _pathname = _.cloneDeep(pathname);
    if (num === "back") {
      console.log(`/pokemon/${Number(_pathname.split("/")[2]) - 1}`);
      const Back = `/pokemon/${Number(_pathname.split("/")[2]) - 1}`;
      getPokemonJsonData(Back, setPokemonData, getJapaneseName);
      await axios;
    } else if (num === "next") {
      console.log(`/pokemon/${Number(_pathname.split("/")[2]) + 1}`);
      const Next = `/pokemon/${Number(_pathname.split("/")[2]) + 1}`;
      getPokemonJsonData(Next, setPokemonData, getJapaneseName);
    }
  };

  return (
    <main className="min-h-screen flex-col items-center justify-between p-24">
      <Header />
      <button onClick={() => handleClickBack()}>戻る</button>

      <div className="flex text-center justify-center">
        <div className="w-60">
          <h1>{pokemonData.japaneseName}</h1>
          <Image
            src={pokemonData.image}
            alt={pokemonData.name}
            style={{ margin: "auto" }}
            width={156}
            height={156}
          />
          <p>英語名：{pokemonData.name}</p>
          {pokemonData.types.map((type, index) => {
            const TYPE = getTypeData(type.type.name);
            return (
              <div key={type} className="text-left w-32 mx-auto">
                タイプ{index + 1}: {TYPE}
              </div>
            );
          })}
        </div>
        <div className="my-auto">
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
          <h3 className="text-left mt-4 font-bold">
            合計:{" "}
            {pokemonData.stats[0].base_stat +
              pokemonData.stats[1].base_stat +
              pokemonData.stats[2].base_stat +
              pokemonData.stats[3].base_stat +
              pokemonData.stats[4].base_stat +
              pokemonData.stats[5].base_stat}
          </h3>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button className="w-20" onClick={() => handleClickNumber("back")}>
          前へ
        </button>
        <button className="w-20" onClick={() => handleClickNumber("next")}>
          次へ
        </button>
      </div>
    </main>
  );
};

export default PokemonPage;
