/**
 * #### タイプを日本語化
 * @param typeName
 * @returns
 */
export const getTypeData = (typeName: string) => {
  if (typeName === "normal") return "ノーマル";
  else if (typeName === "fighting") return "かくとう";
  else if (typeName === "flying") return "ひこう";
  else if (typeName === "poison") return "どく";
  else if (typeName === "ground") return "じめん";
  else if (typeName === "rock") return "いわ";
  else if (typeName === "bug") return "むし";
  else if (typeName === "ghost") return "ゴースト";
  else if (typeName === "steel") return "はがね";
  else if (typeName === "fire") return "ほのお";
  else if (typeName === "water") return "みず";
  else if (typeName === "grass") return "くさ";
  else if (typeName === "electric") return "でんき";
  else if (typeName === "psychic") return "エスパー";
  else if (typeName === "ice") return "こおり";
  else if (typeName === "dragon") return "ドラゴン";
  else if (typeName === "dark") return "あく";
  else if (typeName === "fairy") return "フェアリー";
};
