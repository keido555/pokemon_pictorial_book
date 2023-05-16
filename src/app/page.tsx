"use client";

import { Header } from "./components/layout/header";
import { PokeData } from "./components/pokeData";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />

      <PokeData />
    </main>
  );
};

export default Home;
