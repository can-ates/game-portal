import React, { useState, useEffect, useCallback } from 'react';
import {useSWRInfinite} from 'swr';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from '../src/Link';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

const GameCard = dynamic(() => import('../src/components/GameCard'));

const fetcher = url => axios.get(url).then(res => res.data.results);

function Index(props) {
  const {
    data,
    error,
    size,
    setSize,

  } = useSWRInfinite(index =>
    `https://api.rawg.io/api/games?page_size=40&page=${index + 1}`,
    fetcher,
    { initialData: props.games,
    initialSize: 1,
      
    }
  );

  let games = []

  for(let i = 0; i<data.length; i++){
    games = games.concat(data[i])
  }
  
  const lastGameCardRef = useCallback(node => {
    // if(isLoadingMore) return
    // if(observer.current) observer.current.disconnect()
    // observer.current = new IntersectionObserver(entries => {
    //   if(entries[0].isIntersecting) {
    //     setSize(page + 1)
    //     setPage(pg => pg + 1)
    //   }
    // })
    // if(node) observer.current.observe(node)
    
  });

  const handleFetch = useCallback(() => {
    setSize(size + 1)
  })

  if(error) return <p>error</p>
  if(!data) return <p>loaading</p>

  return (
    <div style={{ marginTop: '4em', padding: 20 }}>
      <Grid container direction='column'>
        <Button onClick={handleFetch}>ADD</Button>
        <Grid
          item
          container
          spacing={10}
          direction='row'
          justify='space-between'
        >
          {games.map((game, i) => {
            if (data.length === i + 1) {
              return (
                <Grid
                  ref={lastGameCardRef}
                  item
                  md={3}
                  sm={6}
                  key={game.id}
                  style={{ padding: '2em' }}
                >
                  <GameCard info={game} key={i} />
                </Grid>
              );
            } else {
              return (
                <Grid
                  item
                  md={3}
                  sm={6}
                  key={game.id}
                  style={{ padding: '2em' }}
                >
                  <GameCard info={game} key={i} />
                </Grid>
              );
            }
          })}
        </Grid>
      </Grid>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get('https://api.rawg.io/api/games?page_size=40', {
    headers: { 'User-Agent': 'gameportal' },
  });

  return {
    props: { games: res.data.results },
  };
}

export default Index;
