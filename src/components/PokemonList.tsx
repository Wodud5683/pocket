"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Pokemon } from "@/types/pokemon";

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = React.useState<Pokemon[]>([]);

  React.useEffect(() => {
    const fetchInittialData = async () => {
      const response = await fetch("/api/pokemons");
      const data = await response.json();
      setPokemons(data);
    };
    fetchInittialData();
  }, []);

  return (
    <div className="container mx-auto">
      {pokemons.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="loader esee-liner rounded-full border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <p className="text-xl font-semibold">불러오는 중입니다...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {pokemons.map((pokemons) => (
            <div key={pokemons.id} className="pokemon p-4 border rounded-lg">
              <Link href={`/pokemon/${pokemons.id}`}>
                <Image
                  src={pokemons.sprites.front_default}
                  alt={pokemons.korean_name}
                  width={96}
                  height={96}
                />
                <p>{pokemons.korean_name}</p>
                <p>도감번호: {pokemons.id}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
