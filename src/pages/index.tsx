import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const [first, second] = getOptionsForVote()

  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center'>
      <div className='text-white text-2xl text-center pb-3'>Which pokemon is rounder?</div>
      <div className='border rounded p-8 flex justify-between items-center'>
        <div className='w-16 h-16'>{first}</div>
        <div className='px-9'>vs</div>
        <div className='w-16 h-16'>{second}</div>
      </div>
    </div>
  )
}

export default Home
