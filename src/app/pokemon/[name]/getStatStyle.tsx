import React from "react";
import { Pokemon } from "./page";

/**
 * #### css
 * @param baseStat
 * @returns
 */
export const getStatStyle = (
  baseStat: number,
  pokemonData: Pokemon
): React.CSSProperties => {
  switch (baseStat) {
    case 0:
      return {
        width: `${pokemonData.stats[baseStat].base_stat}px`,
        height: "8px",
        margin: "auto 0",
        background: "pink",
      };
    case 1:
      return {
        width: `${pokemonData.stats[baseStat].base_stat}px`,
        height: "8px",
        margin: "auto 0",
        background: "red",
      };
    case 2:
      return {
        width: `${pokemonData.stats[baseStat].base_stat}px`,
        height: "8px",
        margin: "auto 0",
        background: "blue",
      };
    case 3:
      return {
        width: `${pokemonData.stats[baseStat].base_stat}px`,
        height: "8px",
        margin: "auto 0",
        background: "yellow",
      };
    case 4:
      return {
        width: `${pokemonData.stats[baseStat].base_stat}px`,
        height: "8px",
        margin: "auto 0",
        background: "green",
      };
    case 5:
      return {
        width: `${pokemonData.stats[baseStat].base_stat}px`,
        height: "8px",
        margin: "auto 0",
        background: "purple",
      };
    default:
      return {
        width: `${baseStat}px`,
        height: "8px",
        margin: "auto 0",
        background: "skyblue",
      };
  }
};
