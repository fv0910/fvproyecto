import { obtenerListadoPokemon } from "@/services/pokeApi";
import { PokemonBuscador } from "@/components/PokemonBuscador";
import { PokemonPaginas } from "@/components/PokemonPaginas";

interface PokemonPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function PokemonPage({
    searchParams,
}: PokemonPageProps) {

    const parametros = await searchParams;

    const pagina = Number(parametros.page) || 1;

    const limite = 20;

    const offset = (pagina - 1) * limite;

    const pokemon = await obtenerListadoPokemon(
        limite,
        offset
    );

    const totalPokemon = 1351;

    const totalPaginas = Math.ceil(
        totalPokemon / limite
    );

    return (
        <main
            className="min-h-screen
                p-8
                font-sans
                bg-cover
                bg-center
                bg-fixed"
            style={{
                backgroundImage: "url('/bola.png')"
            }}
        >

            <div className="min-h-screen
                bg-black/55
                -m-8
                p-8"
            >

                <div className="max-w-6xl mx-auto">

                    <header className="mb-10 text-center">

                        <h1
                            className="text-3xl
                                font-bold
                                mb-2
                                text-white"
                        >
                            Pokedex API V1
                        </h1>

                        <p
                            className="text-sm
                                text-emerald-300"
                        >
                            Explora y busca tus Pokémon favoritos
                        </p>

                    </header>

                    <PokemonBuscador
                        pokemon={pokemon}
                    />

                    <PokemonPaginas
                        pagina={pagina}
                        totalPaginas={totalPaginas}
                    />

                </div>

            </div>

        </main>
    );
}