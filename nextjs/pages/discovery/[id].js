import React from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

const GameCard = dynamic(() => import('../../src/components/GameCard'));

const Similar = ({ details, game }) => {
  return (
    <div style={{ marginTop: '2em', padding: 20 }}>
      <Grid container direction='column'>
      <Grid item>
        <Typography align='center' style={{marginBottom: '1.250em'}} variant='h1'>Similar games to {game}</Typography>
      </Grid>
        <Grid
          item
          container
          spacing={10}
          direction='row'
          justify='space-between'
        >
          {details.map((game, i) => {
            if (details.length === i + 1) {
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
};

export async function getServerSideProps(context) {
  const slug = context.query.id.split('similar-to-')[1];
  const fullName = slug.split('-').join(' ').toUpperCase()

  const res = await axios.get(
    `https://api.rawg.io/api/games/${slug}/suggested?page_size=40`,
    {
      headers: { 'User-Agent': 'gameportal' },
    }
  );

  return {
    props: { details: res.data.results,
            game: fullName            
    },
  };
}

export default Similar;
