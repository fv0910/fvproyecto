import React from 'react'
import Image from 'next/image'

///declaración de interfaz
interface PokemonCardProps{
    name: string, 
    image: string,
    types: string[]
}

export const PokemonCard = ({name, image, types}: PokemonCardProps) => {
  return (
    <div className='bg-[#50C878] rounded-2xl p-6 flex flex-col 
                items-center
                justify-center
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-amber-100
                border
                border-gray-800/50 min-h-[250px]'

            >
        <div className='relative 
                w-32
                h-32
                mb-4
                drop-shadow-[0_10px_10px_rgba(0,0,0,0.6)]'>
            <Image
            src={image}
            alt={name}
            fill
            className='object-contain'
            priority

            />

        </div>
        <h3 className='text-gray-200              
                    text-lg
                    font-medium
                    capitalize
                    tracking-wide mb-3'>{name}</h3>

        <div className='flex gap-2'>
            {types.map((type)=>(
                <span key={type}
                className='text-xs px-3 py-1 bg-[#151924]'>
                    {type}

                </span>
            )

            )

            }

        </div>
    </div>
  )
}
