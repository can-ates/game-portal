import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

function Game({game}) {
    
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
      }

    return (
        <div>
            sdfsdfsdfsdf
        </div>
    )
}


export async function getStaticPaths(){
    const res = await axios.get('https://api.rawg.io/api/games?page_size=40', {
        headers: { 'User-Agent': 'GamePortal/0.8' },
      }
    )
    const games = await res.data.results

    const paths = games.map(game => ({
        params : {slug : game.slug}
    }))

    return {paths, fallback: true}
    
}

export async function getStaticProps({ params }) {
    
   const res = await axios.get(`https://api.rawg.io/api/games/${params.slug}`, {
        headers: { 'User-Agent': 'GamePortal/0.8' },
      }
    )
    const game = await res.data 
    
    return { props: { game } }    

}
  

export default Game
