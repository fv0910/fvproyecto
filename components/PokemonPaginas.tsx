"use client";

import { useRouter } from "next/navigation";

interface PokemonPaginasProps {
    pagina: number;
    totalPaginas: number;
}

export const PokemonPaginas = ({
    pagina,
    totalPaginas,
}: PokemonPaginasProps) => {

    const router = useRouter();

    const cambiarPagina = (nuevaPagina: number) => {
        router.push(`/pokemon?page=${nuevaPagina}`);
    };

    return (
        <div className="flex items-center justify-center gap-4 mt-10">

            <button
                onClick={() => cambiarPagina(pagina - 1)}
                disabled={pagina === 1}
                className="px-5 py-2
                    rounded-lg
                    bg-emerald-600
                    text-white
                    font-semibold
                    transition
                    hover:bg-emerald-500
                    disabled:opacity-40
                    disabled:cursor-not-allowed"
            >
                ← Anterior
            </button>

            <span
                className="px-5 py-2
                    rounded-lg
                    bg-[#151924]
                    text-emerald-300
                    border
                    border-emerald-500/30"
            >
                Página {pagina} de {totalPaginas}
            </span>

            <button
                onClick={() => cambiarPagina(pagina + 1)}
                disabled={pagina === totalPaginas}
                className="px-5 py-2
                    rounded-lg
                    bg-emerald-600
                    text-white
                    font-semibold
                    transition
                    hover:bg-emerald-500
                    disabled:opacity-40
                    disabled:cursor-not-allowed"
            >
                Siguiente →
            </button>

        </div>
    );
};