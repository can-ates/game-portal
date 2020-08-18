import React, {useState} from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import Link from '../src/Link';
import GameCard from '../src/components/GameCard'

function Index(props) {

  const games = props.games

  return (
      <div>
      {games.map((game, i) => (
        <GameCard name={game.name} key={i} />
      ))}
        
      </div>
  );
}

export async function getServerSideProps() {

  const res = await axios.get('https://api.rawg.io/api/games', {
    headers: {'User-Agent': 'gameportal'}
  })

  console.log('anan')

  return{
    props: {games: res.data.results,
                  
    }
  }
}

export default Index

