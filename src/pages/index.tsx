import { useState } from 'react'
import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [ids, updateIds] = useState(getOptionsForVote())

  const [first, second] = ids

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }])
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }])

  if(firstPokemon.isLoading || secondPokemon.isLoading) return <div>Loading...</div>

  const voteForRoundest = (selected: number) => {

    updateIds(getOptionsForVote())
  }

  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <div className='text-white text-2xl text-center pb-3'>Which pokemon is rounder?</div>
      <div className='border rounded p-8 flex justify-between items-center'>
        <div className='w-64 h-64 flex flex-col'>
          <img className='w-full' src={firstPokemon.data?.sprites.front_default ?? ''} />
          <div className='text-white text-center capitalize mt-[-2rem]'>{firstPokemon.data?.name}</div>
          <button className='bg-white rounded-full text-black py-1 w-2/3 self-center' onClick={() => voteForRoundest(first)}>Rounder</button>
        </div>
        <div className='px-9 text-white'>VS</div>
        <div className='w-64 h-64 flex flex-col'>
          <img className='w-full' src={secondPokemon.data?.sprites.front_default ?? ''} />
          <div className='text-white text-center capitalize mt-[-2rem]'>{secondPokemon.data?.name}</div>
          <button className='bg-white rounded-full text-black py-1 w-2/3 self-center' onClick={() => voteForRoundest(second)}>Rounder</button>
        </div>
        <div className='p-2' />
      </div>
    </div>
  )
}

export default Home
