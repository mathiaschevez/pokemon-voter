import React, { useState } from 'react'
import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import { inferQueryResponse } from './api/trpc/[trpc]'
import Image from 'next/image'

const Home: NextPage = () => {
  const [ids, updateIds] = useState(getOptionsForVote())

  const [first, second] = ids

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }])
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }])

  const voteMutation = trpc.useMutation(["cast-vote"])

  if(firstPokemon.isLoading || secondPokemon.isLoading) return <div>Loading...</div>

  const voteForRoundest = (selected: number) => {
    if(selected === first) {
      voteMutation.mutate({votedFor: first, votedAgainst: second})
    } else {
      voteMutation.mutate({votedFor: second, votedAgainst: first})
    }
    
    updateIds(getOptionsForVote())
  }

  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <div className='text-white text-2xl text-center pb-3'>Which pokemon is rounder?</div>
      <div className='border rounded p-8 flex justify-between items-center'>
        {!firstPokemon.isLoading && firstPokemon.data && !secondPokemon.isLoading && secondPokemon.data && (
          <>
            <PokemonListing pokemon={firstPokemon.data} vote={() => voteForRoundest(first)} />
            <div className='px-9 text-white'>VS</div>
            <PokemonListing pokemon={secondPokemon.data} vote={() => voteForRoundest(second)} />
          </>
        )}
        <div className='p-2' />
      </div>
    </div>
  )
}

// gets the type of the pokemon coming from the api
type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">

const PokemonListing: React.FC<{pokemon: PokemonFromServer, vote: () => void}> = (props) => {

  return (
    <div className='flex flex-col'>
      <Image width={256} height={256} src={props.pokemon.sprites.front_default ?? ''} />
      <div className='text-white text-center capitalize mt-[-1rem]'>{props.pokemon.name}</div>
      <button className='bg-white rounded-full text-black py-1 w-2/3 self-center' onClick={() => props.vote()}>Rounder</button>
    </div>
  )
}

export default Home