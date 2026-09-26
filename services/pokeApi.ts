export interface Pokemon {
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


// pokemon individual
export const obtenerPokemon = async (
    nameOrId: string | number
): Promise<Pokemon | null> => {

    try {

        const respuesta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nameOrId}`
        );

        if (!respuesta.ok) {
            throw new Error(
                "Error al obtener el pokemon solicitado"
            );
        }

        return await respuesta.json();

    } catch (error) {

        console.error(
            `Error al obtener el pokemon: ${nameOrId}`
        );

        return null;
    }
};


//listado
export const obtenerListadoPokemon = async (
    limit: number = 20,
    offset: number = 0
): Promise<Pokemon[]> => {

    try {

        const respuesta = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        if (!respuesta.ok) {
            throw new Error(
                "Error al obtener el listado de pokemon"
            );
        }

        const data = await respuesta.json();

        const pokemon = await Promise.all(

            data.results.map(
                async (pokemon: { name: string }) => {

                    return await obtenerPokemon(
                        pokemon.name
                    );

                }
            )

        );

        return pokemon.filter(
            (pokemon): pokemon is Pokemon =>
                pokemon !== null
        );

    } catch (error) {

        console.error(
            "Error al obtener el listado de pokemon"
        );

        return [];
    }
};