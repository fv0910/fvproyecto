import React from 'react'
import Image from 'next/image'

/// Declaración de interfaz
interface PokemonCardProps {
  name: string
  image: string
  types: string[]
}

export const PokemonCard = ({ name, image, types }: PokemonCardProps) => {
  return (
    <div
      className='bg-[#50C878] rounded-2xl p-6 flex flex-col
                 items-center
                 justify-center
                 transition-all
                 duration-300
                 hover:-translate-y-2
                 hover:shadow-amber-100
                 border
                 border-gray-800/50
                 min-h-[250px]'
    >

      {/* Imagen del Pokémon */}
      <div
        className='relative
                   w-32
                   h-32
                   mb-4
                   drop-shadow-[0_10px_10px_rgba(0,0,0,0.6)]'
      >
        <Image
          src={image}
          alt={name}
          fill
          className='object-contain'
          priority
        />
      </div>

      {/* Nombre del Pokémon */}
      <h3
        className='text-gray-200
                   text-lg
                   font-medium
                   capitalize
                   tracking-wide
                   mb-3'
      >
        {name}
      </h3>

      {/* Tipos del Pokémon */}
      <div className='flex gap-2 flex-wrap justify-center'>
        {types.map((type) => (
          <span
            key={type}
            className='text-xs
                       px-4
                       py-2
                       bg-white/50
                       text-black
                       rounded-full
                       font-semibold
                       shadow-[0_2px_8px_rgba(255,255,255,0.5)]
                       backdrop-blur-sm
                       border
                       border-white/70'
          >
            {type}
          </span>
        ))}
      </div>

    </div>
  )
}