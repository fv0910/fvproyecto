"use client";
import { useState } from "react";
import { PokemonCard } from "./PokemonCard";

interface Pokemon {
    id: number;

    name: string;

    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
            };
        };
    };

    types: {
        type: {
            name: string;
        };
    }[];
}

interface PokemonBuscadorProps {
    pokemon: Pokemon[];
}

export const PokemonBuscador = ({
    pokemon,
}: PokemonBuscadorProps) => {

    const [busqueda, setBusqueda] = useState("");

    const [resultado, setResultado] =
        useState<Pokemon | null>(null);

    const [cargando, setCargando] =
        useState(false);

    const [error, setError] =
        useState(false);


    const buscarPokemon = async (
        texto: string
    ) => {

        setBusqueda(texto);

        setResultado(null);
        setError(false);

        // Si el buscador está vacío,
        // mostramos nuevamente los 20 Pokémon
        if (texto.trim() === "") {
            return;
        }

        setCargando(true);

        try {

            const respuesta = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${texto
                    .trim()
                    .toLowerCase()}`
            );

            if (!respuesta.ok) {
                setError(true);
                setCargando(false);
                return;
            }

            const data = await respuesta.json();

            setResultado(data);

        } catch (error) {

            console.error(
                "Error al buscar Pokémon:",
                error
            );

            setError(true);

        } finally {

            setCargando(false);

        }
    };


    return (

        <div>
            <div className="mb-8">

                <input
                    type="text"
                    placeholder="Busca cualquier Pokémon..."
                    value={busqueda}
                    onChange={(e) =>
                        buscarPokemon(e.target.value)
                    }
                    className="w-full
                        rounded-xl
                        bg-[#151924]
                        border
                        border-emerald-500/40
                        px-5
                        py-4
                        text-white
                        outline-none
                        focus:border-emerald-400
                        placeholder:text-gray-400"
                />

            </div>

            {cargando && (

                <p className="text-center
                    text-emerald-300
                    mb-8">

                    Buscando Pokémon...

                </p>

            )}

            {resultado && !cargando && (

                <div className="grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-6">

                    <PokemonCard
                        name={resultado.name}
                        image={
                            resultado.sprites
                                .other[
                                    "official-artwork"
                                ]
                                .front_default
                        }
                        types={resultado.types.map(
                            (t) => t.type.name
                        )}
                    />

                </div>

            )}

            {error && !cargando && (

                <p className="text-center
                    text-red-400
                    mt-8">

                    No se encontró ningún Pokémon.

                </p>

            )}

            {busqueda.trim() === "" && (

                <div className="grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-6">

                    {pokemon.map((poke) => (

                        <PokemonCard
                            key={poke.id}
                            name={poke.name}
                            image={
                                poke.sprites
                                    .other[
                                        "official-artwork"
                                    ]
                                    .front_default
                            }
                            types={poke.types.map(
                                (t) => t.type.name
                            )}
                        />

                    ))}

                </div>

            )}

        </div>
    );
};