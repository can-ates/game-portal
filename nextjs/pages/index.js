import React, { useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from '../src/Link';
import Grid from '@material-ui/core/Grid';
import GameCard from '../src/components/GameCard';

function Index(props) {
  const games = props.games;

  return (
    <div style={{marginTop: '4em', padding: 20}}>
      <Grid container direction='column'>
        <Grid  item container spacing={10} direction='row' justify='space-between' >
          {games.map((game, i) => (
            <Grid item md={3} sm={6} key={game.id} style={{ padding: '2em' }}>
              <GameCard info={game} key={i} />
            </Grid>
          ))}
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
