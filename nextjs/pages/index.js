import React, { useRef, useCallback } from 'react';
import {useSWRInfinite} from 'swr';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Grid from '@material-ui/core/Grid';
import { Button, Typography } from '@material-ui/core';

const GameCard = dynamic(() => import('../src/components/GameCard'));

const fetcher = url => axios.get(url, {
  headers : {'User-Agent': 'game-portal'}
}).then(res => res.data.results);

function Index(props) {
  const observer = useRef()
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

  if(error) return <p>Error occured</p>
  if(!data) return <p>Loading</p>

  let games = []

  for(let i = 0; i<data.length; i++){
    games = games.concat(data[i])
  }
  

  if(error) return <p>error</p>
  if(!data) return <p>loaading</p>

  //TODO handle INFINITE SCROLLING
  // const lastGameCardRef = useCallback(node => {
  //   if(observer.current) observer.current.disconnect()
  //   observer.current = new IntersectionObserver(entries => {
  //     if(entries[0].isIntersecting) {
  //       console.log('anan')
  //     }
  //   })
  //   if(node) observer.current.observe(node)
    
  // }, [size]);

  return (
    <div style={{ marginTop: '2em', padding: 20 }}>
      <Grid container direction='column'>
      <Grid item>
        <Typography align='left' style={{marginBottom: '1.250em'}} variant='h1'>All Games</Typography>
      </Grid>
        <Grid
          item

          container
          spacing={10}
          direction='row'
          justify='space-between'
        >
          {games.map((game, i) => {
            if (games.length === i + 1) {
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
  const res = await axios.get('https://api.rawg.io/api/games?page_size=40&ordering=popularity', {
    headers: { 'User-Agent': 'game-portal' },
  });

  return {
    props: { games: res.data.results },
  };
}

export default React.memo(Index);
